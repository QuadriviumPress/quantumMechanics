/**
 * @fileoverview MyST plugin that makes the book survive a static export.
 *
 * `myst-to-tex` renders a fixed set of node types and reports anything else as
 * `Unhandled LaTeX conversion for node of "<type>"` -- then drops it. Five of
 * the types this book leans on are not in that set:
 *
 *   exercise          the entire Problems section of every chapter
 *   solution          every worked solution
 *   aside             every `{margin}` note
 *   details           every `{dropdown}`
 *   iframe            every simulation (intentional; see plugins/simulation.mjs)
 *
 * Without this plugin a PDF of the book is missing all of them, silently apart
 * from a wall of build errors.
 *
 * MyST plugins cannot supply renderers for export formats -- that half of the
 * plugin API is documented as planned, not implemented, and the 1.10 plugin
 * loader reads only `directives`, `roles`, and `transforms`. So instead of
 * teaching the renderer about these nodes, this transform rewrites them into
 * nodes the renderer already understands, and does so only when an export is
 * being built.
 *
 * Two details make that safe:
 *
 * - **`stage: 'project'`.** Project-stage transforms run *after*
 *   `resolveReferencesTransform`, so by the time this sees the tree every
 *   `enumerator` is assigned ("4.1") and every cross-reference's link text is
 *   resolved. Rewriting node types at document stage would lose both.
 * - **`MYST_PRINT` gates it.** The variable is unset for `myst build --html`
 *   and `myst start`, so the website is byte-for-byte unaffected. Set it to
 *   `full` or `student` for an export; `student` additionally drops all
 *   solutions, which is the only difference between the two printed editions.
 *
 * Two things a naive rewrite gets wrong, and this one does not:
 *
 * - **Nothing may be boxed.** About a quarter of the worked solutions contain a
 *   `{figure}`, and LaTeX cannot open a float inside `framed`, `minipage`, or
 *   any other box -- it fails with "Not in outer par mode" and loses the figure,
 *   its caption, and every `{numref}` that points at it.
 * - **Cross-references need their own label.** A plain block carries no
 *   `\label`, so the 25 in-text links to `#ex-...` would dangle. Each rewritten
 *   exercise therefore opens with a raw-TeX node that pins `\@currentlabel` to
 *   MyST's own enumerator before emitting `\label`, so the printed number is
 *   the website's number rather than whatever counter LaTeX happens to hold.
 *
 * @module plugins/export
 * @see {@link https://mystmd.org/guide/javascript-plugins}
 */

import fs from 'node:fs';

/**
 * Which edition is being built, or `undefined` for the website.
 *
 * Read once at module scope: the value cannot change within a build, and a
 * per-node lookup would only obscure that.
 *
 * @type {('full'|'student'|undefined)}
 */
const EDITION = ( () => {
  const value = ( process.env.MYST_PRINT ?? '' ).trim().toLowerCase();
  if ( value === '' ) {
    return undefined;
  }
  if ( value === 'full' || value === 'student' ) {
    return value;
  }
  // A typo here would silently produce a book with no exercises in it.
  throw new Error(
    `MYST_PRINT must be "full" or "student", not "${ process.env.MYST_PRINT }"`
  );
} )();

/**
 * Base URL of the website, when one is being built that cannot reach the rest
 * of the book internally.
 *
 * A single-chapter offprint contains one chapter, but its prose still says "see
 * Chapter 7" 20-odd times. There is no Chapter 7 in the document to jump to, so
 * those references point outward at the website instead, which is where a reader
 * holding one chapter would want to go. Unset for the whole book, where every
 * chapter is present and the jump should stay inside the PDF.
 *
 * @type {(string|undefined)}
 */
const SITE_URL = ( () => {
  const value = ( process.env.MYST_SITE_URL ?? '' ).trim().replace( /\/+$/, '' );
  return value === '' ? undefined : value;
} )();

/**
 * Wraps a string of LaTeX in a node the renderer writes out verbatim.
 *
 * `myst-to-tex`'s `raw` handler emits `node.tex` unchanged, which is the only
 * way a plugin can reach LaTeX at all. Other renderers look for their own key
 * (`node.typst`) and emit nothing, which is the right fallback.
 *
 * @param {string} source - LaTeX source.
 * @returns {Object} A `raw` node.
 */
function tex( source ) {
  return { type: 'raw', tex: source };
}

/**
 * Raw LaTeX that labels the enclosing block with MyST's own enumerator.
 *
 * `\label` normally records whatever counter LaTeX last stepped -- here that is
 * the enclosing section, so `\ref{ex-...}` would print "4.2" for Exercise 4.1.
 * Redefining `\@currentlabel` first pins it to the number the website shows, so
 * the two editions cannot drift apart. The `\def` is confined to a group, so it
 * does not leak into the surrounding text.
 *
 * `\phantomsection` moves the hyperref anchor from the last section heading down
 * to the exercise itself, which is what makes a link land on the right thing
 * rather than several pages above it. It is a hyperref command, so it is
 * guarded: the package arrives via the `link` handler, and a chapter with no
 * links at all would not have it.
 *
 * @param {string} identifier - The node's normalized identifier.
 * @param {string} [enumerator] - The number MyST assigned, e.g. `4.1`.
 * @returns {Object} A `raw` node.
 */
function labelNode( identifier, enumerator ) {
  const pin = enumerator
    ? `\\begingroup\\makeatletter\\def\\@currentlabel{${ enumerator }}\\makeatother\\label{${ identifier }}\\endgroup`
    : `\\label{${ identifier }}`;
  return tex( `\\ifdefined\\phantomsection\\phantomsection\\fi${ pin }\n` );
}

/**
 * Builds the bold run-in title of a rewritten block.
 *
 * `myst-to-tex` renders `admonitionTitle` as `\textbf{...}\`, and pandoc reads
 * that back as bold text, so the title survives into Word as well. An exercise
 * written with a directive argument already carries its own title node, which is
 * kept and parenthesized after the number.
 *
 * @param {string} prefix - Leading words, e.g. `Exercise`.
 * @param {string} [enumerator] - The number MyST assigned.
 * @param {Object} [existing] - The node's own `admonitionTitle`, if it has one.
 * @returns {Object} An `admonitionTitle` node.
 */
function titleNode( prefix, enumerator, existing ) {
  const children = [ { type: 'text', value: enumerator ? `${ prefix } ${ enumerator }` : prefix } ];
  if ( existing?.children?.length ) {
    children.push( { type: 'text', value: ' (' }, ...existing.children, { type: 'text', value: ')' } );
  }
  return { type: 'admonitionTitle', children };
}

/**
 * Rewrites an `exercise` or `solution` into a titled, labelled run of blocks.
 *
 * Deliberately *not* a box and *not* a custom environment. A quarter of the
 * worked solutions contain a `{figure}`, and LaTeX cannot open a float inside a
 * box; and pandoc, which turns this same `.tex` into the DOCX edition, discards
 * the entire body of any environment it does not recognize. A `div` renders its
 * children with no wrapper at all, so the spacing commands from
 * `templates/book/template.tex` bracket the content without enclosing it.
 *
 * @param {Object} node - The node to rewrite.
 * @param {string} prefix - `Exercise`, or `''` to keep the node's own title.
 * @param {string} macro - The template command pair to bracket it with.
 * @returns {Object} A `div` node.
 */
function toBlock( node, prefix, macro ) {
  const children = node.children ?? [];
  const own = children.find( child => child.type === 'admonitionTitle' );
  const body = children.filter( child => child !== own );

  // A solution's own title is already "Solution to Exercise 4.1", complete with
  // a resolved crossReference; an exercise has none and needs one built.
  const title = prefix ? titleNode( prefix, node.enumerator, own ) : own;

  return {
    type: 'div',
    class: node.type,
    children: [
      tex( `\\${ macro }start ` ),
      ...( title ? [ title ] : [] ),
      ...( node.identifier ? [ labelNode( node.identifier, node.enumerator ) ] : [] ),
      ...body,
      tex( `\\${ macro }end\n` )
    ]
  };
}

/**
 * Flattens a `{dropdown}` into its summary and its body.
 *
 * Collapsing is a screen affordance; on paper the content is simply there. The
 * summary becomes a bold lead-in paragraph so the two still read as a unit.
 *
 * @param {Object} node - A `details` node.
 * @returns {Array<Object>} The nodes that replace it.
 */
function openDetails( node ) {
  const children = node.children ?? [];
  const summary = children.find( child => child.type === 'summary' );
  const body = children.filter( child => child !== summary );
  if ( !summary ) {
    return body;
  }
  return [
    { type: 'paragraph', children: [ { type: 'strong', children: summary.children ?? [] } ] },
    ...body
  ];
}

/**
 * Rewrites one node, returning what should stand in its place.
 *
 * Returning an empty array deletes the node.
 *
 * @param {Object} node - The node to consider.
 * @returns {(Array<Object>|null)} Replacement nodes, or null to keep the node.
 */
function rewrite( node ) {
  switch ( node.type ) {

    // The live simulation. plugins/simulation.mjs already emitted a screenshot
    // and a caption link beside it, so dropping this loses nothing -- and it
    // spares every export 41 `tex-renders` errors.
    case 'iframe':
      return [];

    case 'exercise':
      return [ toBlock( node, 'Exercise', 'mystexercise' ) ];

    case 'solution':
      return EDITION === 'student' ? [] : [ toBlock( node, '', 'mystsolution' ) ];

    // A `{margin}` note. The web theme floats it beside the text; a printed page
    // has no margin to float into, so it becomes an aside in the flow where it
    // was written. `blockquote` because the template styles it as a tinted rule
    // and pandoc reads it natively -- an admonition would be `\begin{framed}`,
    // which pandoc drops whole.
    case 'aside':
      return [ { type: 'blockquote', children: node.children ?? [] } ];

    // A link to another page of the book: `[Chapter 7](#ch-wave-properties-...)`.
    // MyST resolves these to a `link` carrying both the target's identifier and
    // its *website* URL, and the tex renderer writes the URL --
    // `\href{/ch-07-wave-properties-of-particles}{Chapter 7}` -- which in a PDF
    // is a dead relative path. Rewrite it to an internal jump instead. This is
    // a frequently used cross-reference in the book, one for
    // every "see Chapter N" in the prose.
    //
    // A `{numref}` or `{eq}` reference is a `crossReference` rather than a
    // `link`; MyST already writes those as `\ref{...}`, which hyperref makes
    // clickable on its own. Only the cross-chapter ones need help -- see below.
    case 'link': {
      if ( !node.internal || !node.identifier ) {
        return null;
      }
      // `dataUrl` is set only on a link into *another* page. In a single-chapter
      // offprint those targets are absent from the document, so send them to the
      // website rather than leaving 20-odd dangling `??` references behind.
      const offsite = SITE_URL && node.dataUrl && node.url;
      if ( offsite ) {
        return [
          tex( `\\href{${ SITE_URL }${ node.url }}{` ),
          ...( node.children ?? [] ),
          tex( '}' )
        ];
      }
      return [
        tex( `\\hyperref[${ node.identifier }]{` ),
        ...( node.children ?? [] ),
        tex( '}' )
      ];
    }

    // A simulation's caption is two paragraphs: the author's text, then the
    // "Interactive simulation: <link>" line that plugins/simulation.mjs appends.
    // LaTeX tolerates the blank line between them inside `\caption{...}`; pandoc,
    // which reads the same .tex to build the DOCX, treats it as an unterminated
    // argument and refuses the file. Merge them into one paragraph, which reads
    // the same on paper and parses everywhere.
    case 'caption': {
      const children = node.children ?? [];
      if ( children.length < 2 || children.some( child => child.type !== 'paragraph' ) ) {
        return null;
      }
      const merged = [];
      children.forEach( ( paragraph, index ) => {
        if ( index > 0 ) {
          merged.push( { type: 'text', value: ' ' } );
        }
        merged.push( ...( paragraph.children ?? [] ) );
      } );
      return [ { ...node, children: [ { type: 'paragraph', children: merged } ] } ];
    }

    // A `{numref}`-style reference into another chapter -- there are five in the
    // book, all of them to an exercise, e.g. "Exercise 3.6" cited from Chapter 6.
    // These are `crossReference` nodes, and MyST leaves them as `\ref{...}`, which
    // is right for the whole book and dangling in an offprint that does not
    // contain Chapter 3. `remote` marks exactly this case.
    case 'crossReference': {
      if ( !SITE_URL || !node.remote || !node.url ) {
        return null;
      }
      const anchor = node.html_id ? `#${ node.html_id }` : '';
      return [
        tex( `\\href{${ SITE_URL }${ node.url }${ anchor }}{` ),
        ...( node.children ?? [] ),
        tex( '}' )
      ];
    }

    case 'details':
      return openDetails( node );

    default:
      return null;
  }
}

/**
 * Walks the tree, rewriting children in place.
 *
 * Hand-rolled rather than `unist-util-visit` because a plugin `.mjs` is loaded
 * bare, with no bundler and no access to MyST's own dependencies, and because
 * the rewrites replace one node with zero, one, or several -- which is
 * awkward to express as a visitor.
 *
 * @param {Object} node - The node whose children are rewritten.
 */
function walk( node ) {
  if ( !Array.isArray( node.children ) ) {
    return;
  }
  const rewritten = [];
  node.children.forEach( child => {
    const replacement = rewrite( child );
    if ( replacement === null ) {
      walk( child );
      rewritten.push( child );
      return;
    }
    // Descend into the replacements: a solution nested in a dropdown, or a
    // simulation inside a margin note, still has to be rewritten.
    replacement.forEach( item => walk( item ) );
    rewritten.push( ...replacement );
  } );
  node.children = rewritten;
}

/**
 * The label a chapter file declares in its own frontmatter, e.g.
 * `ch-interference-of-light`.
 *
 * Every "see Chapter N" in the book points at one of these, but nothing in the
 * tree carries it: the chapter's title heading is synthesized by the export
 * renderer from frontmatter, after this transform has run, and MyST does not
 * attach the page label to it. So the label has to be read back off the source
 * file, which the vfile names.
 *
 * @param {Object} vfile - The vfile MyST passes to the transformer.
 * @returns {(string|undefined)} The label, if the file declares one.
 */
function pageLabel( vfile ) {
  const path = vfile?.path;
  if ( typeof path !== 'string' || !path.endsWith( '.md' ) ) {
    return undefined;
  }
  let source;
  try {
    source = fs.readFileSync( path, 'utf8' );
  }
  catch {
    return undefined;
  }
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec( source );
  return frontmatter ? /^label:[ \t]*(\S+)[ \t]*$/m.exec( frontmatter[ 1 ] )?.[ 1 ] : undefined;
}

/**
 * @type {Object}
 */
const exportTransform = {
  name: 'print-edition',
  doc: 'Rewrites nodes that no export renderer handles into ones that every ' +
       'renderer handles. Inert unless MYST_PRINT is set to "full" or "student".',
  stage: 'project',
  /**
   * @returns {function(Object): void} A unified transformer.
   */
  plugin: () => ( node, vfile ) => {
    if ( !EDITION ) {
      return;
    }
    walk( node );

    // Anchor the chapter. The renderer emits `\chapter{...}` immediately before
    // this content, so a `\label` at the very top of the body records the
    // chapter number and puts the hyperref anchor on the chapter's first page --
    // which is where the rewritten `link` nodes above expect to land.
    const label = pageLabel( vfile );
    if ( label && Array.isArray( node.children ) ) {
      node.children.unshift( tex( `\\label{${ label }}\n` ) );
    }
  }
};

/**
 * @type {{name: string, transforms: Array<Object>}}
 */
const plugin = {
  name: 'Print and office exports',
  transforms: [ exportTransform ]
};

export default plugin;

// Named exports keep the transformation logic independently testable. MyST
// continues to consume only the default plugin export.
export { openDetails, rewrite, walk, pageLabel, tex, toBlock };
