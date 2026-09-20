/**
 * @fileoverview MyST plugin for embedding the book's own short animations.
 *
 * A handful of figures show something that is inherently time-varying --
 * a traveling wave, a standing wave forming, two tones beating -- and a static
 * snapshot (or a strip of snapshots) is a weaker explanation than watching it
 * happen. This directive embeds a small, locally authored, looping animation
 * on the website and falls back to the book's existing static SVG figure
 * everywhere else.
 *
 * The fallback works exactly like `plugins/simulation.mjs`: MyST's `iframe`
 * node is rendered by the site theme and nothing else, so each directive
 * emits an `iframe` *and* a plain `image` as siblings of one `figure`
 * container, and `plugins/simulation.css` / `plugins/export.mjs` pick whichever of the
 * two survives in a given output.
 *
 *   HTML site   the live animation; the fallback image is hidden by custom.css
 *   print       custom.css flips it: iframe hidden, static figure shown
 *   PDF (tex)   iframe dropped by export.mjs, \includegraphics of the figure
 *   PDF (typst) iframe handler returns early, #image of the figure
 *   DOCX        iframe unsupported, the image lands
 *   Markdown    the figure becomes the {figure} argument
 *
 * Unlike `{simulation}`, there is no external provider and no screenshot to
 * fetch: the fallback is a local static SVG, either supplied with `:figure:`
 * or found by convention at `images/<id>.svg`. An iframe `src` needs special
 * handling because MyST does not
 * resolve a relative path written into an `iframe` node the way it resolves
 * one in a `link` or `image` node, so a bare id resolves to a root-relative
 * URL under `/animations/`, which `project.static_files` in `myst.yml`
 * declares to keep stable and unhashed.
 *
 * @module plugins/animation
 * @see {@link https://mystmd.org/guide/javascript-plugins}
 */

/**
 * Root the animation pages are served from. `project.static_files` in
 * `myst.yml` copies `animations/` there verbatim.
 *
 * The leading slash matters: MyST resolves a `/`-prefixed image URL against
 * the project root rather than the directory of the source file, and the
 * directive has no way to know which file it was written in.
 *
 * @type {string}
 */
const rawBaseUrl = process.env.BASE_URL || '/';
const SITE_ROOT = rawBaseUrl === '/'
  ? ''
  : `/${ rawBaseUrl.replace( /^\/+|\/+$/g, '' ) }`;
const ANIMATION_ROOT = `${ SITE_ROOT }/animations`;

/** Directory holding the static figure that stands in for an animation everywhere but the website. */
const IMAGE_ROOT = '/images';

/**
 * The MyST theme's default iframe aspect ratio (`padding-bottom: 60%`) is
 * close to 16:10. The animations here are single wide plot panels, closer to
 * 2:1; other ratios need a matching rule in `plugins/simulation.css`.
 *
 * @type {string}
 */
const DEFAULT_ASPECT = '2:1';

/**
 * Resolves one directive argument to an animation page URL and a matching id.
 *
 * A bare id names a page in `/animations` (e.g. `ch03-standing-wave-formation`
 * resolves to `/animations/ch03-standing-wave-formation.html`); anything that
 * looks like a path or a URL is passed through untouched.
 *
 * @param {string} arg - The directive argument.
 * @returns {{url: string, id: string, isBare: boolean}}
 */
function resolveAnimation( arg ) {
  const value = String( arg ).trim();
  if ( /^https?:\/\//i.test( value ) || value.startsWith( '/' ) || value.startsWith( '.' ) ) {
    const id = value.split( '/' ).pop().replace( /\.[a-z0-9]+$/i, '' );
    return { url: value, id, isBare: false };
  }
  const id = value.replace( /\.[a-z0-9]+$/i, '' );
  return { url: `${ ANIMATION_ROOT }/${ id }.html`, id, isBare: true };
}

/**
 * Turns an `:aspect:` option into the CSS class `plugins/simulation.css` keys on.
 *
 * @param {string} aspect - A `w:h` or `wxh` ratio.
 * @returns {string}
 */
function aspectClass( aspect ) {
  return `animation-aspect-${ String( aspect ).trim().replace( /[:\s]+/g, 'x' ) }`;
}

/**
 * Words left lowercase when title-casing a slug, unless they lead the name.
 *
 * @type {Set<string>}
 */
const MINOR_WORDS = new Set( [ 'a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'vs' ] );

/**
 * Turns `ch03-standing-wave-formation` into `Standing Wave Formation`.
 *
 * The chapter prefix is dropped: it disambiguates the file on disk, not the
 * animation on the page.
 *
 * @param {string} id
 * @returns {string}
 */
function humanize( id ) {
  const words = String( id )
    .replace( /^ch\d{2}[-_]/, '' )
    .replace( /[-_]+/g, ' ' )
    .trim()
    .split( ' ' );
  return words
    .map( ( word, index ) => {
      if ( index > 0 && MINOR_WORDS.has( word.toLowerCase() ) ) {
        return word.toLowerCase();
      }
      return word.charAt( 0 ).toUpperCase() + word.slice( 1 );
    } )
    .join( ' ' );
}

/**
 * Builds a paragraph node reporting a directive error.
 *
 * @param {string} message
 * @param {Object} [vfile]
 * @returns {Array<Object>}
 */
function directiveError( message, vfile ) {
  if ( vfile && typeof vfile.message === 'function' ) {
    const reported = vfile.message( message );
    reported.fatal = false;
    reported.source = 'plugins/animation.mjs';
  }
  return [ {
    type: 'paragraph',
    children: [ { type: 'strong', children: [ { type: 'text', value: `Animation error: ${ message }` } ] } ]
  } ];
}

/**
 * Implementation behind `{animation}`.
 *
 * @param {Object} data - Directive data supplied by MyST.
 * @param {Object} vfile - The vfile for the source document.
 * @returns {Array<Object>} The AST nodes to insert.
 */
function runAnimation( data, vfile ) {
  const options = data.options ?? {};

  if ( !data.arg ) {
    return directiveError( 'an animation id, path, or URL is required', vfile );
  }

  const { url, id, isBare } = resolveAnimation( data.arg );
  const name = humanize( id );

  let figureUrl = options.figure;
  if ( !figureUrl && !options[ 'no-figure' ] ) {
    if ( isBare ) {
      figureUrl = `${ IMAGE_ROOT }/${ id }.svg`;
    }
    else {
      return directiveError(
        'a path or URL argument needs an explicit `:figure:` for the static fallback ' +
        '(or pass `:no-figure:`)',
        vfile
      );
    }
  }

  const width = options.width || '100%';
  const aspect = options.aspect || DEFAULT_ASPECT;
  const title = options.title || `${ name } — animation`;
  const align = options.align || 'center';

  const children = [];

  // The live animation. Rendered by the site theme and by nothing else; see
  // the fallback table at the top of this file.
  children.push( {
    type: 'iframe',
    src: url,
    width,
    align,
    title,
    class: [ 'animation-frame', aspectClass( aspect ), options.class ].filter( Boolean ).join( ' ' )
  } );

  // The static fallback, for PDF, DOCX, Markdown, and print. Deliberately not
  // marked `placeholder: true`; see plugins/simulation.mjs for why.
  if ( figureUrl ) {
    children.push( {
      type: 'image',
      url: figureUrl,
      alt: options.alt || `Static rendering of the ${ name } animation`,
      width,
      align,
      class: 'animation-placeholder'
    } );
  }

  const captionChildren = [ ...( data.body ?? [] ) ];
  if ( captionChildren.length ) {
    children.push( { type: 'caption', children: captionChildren } );
  }

  const container = {
    type: 'container',
    kind: 'figure',
    class: 'animation',
    // Without this, the iframe and the fallback image are lettered (a) and (b)
    // as subfigures.
    noSubcontainers: true,
    children
  };

  if ( options.label ) {
    const label = String( options.label ).trim();
    container.label = label;
    container.identifier = label.toLowerCase();
  }
  if ( typeof options.enumerated === 'boolean' ) {
    container.enumerated = options.enumerated;
  }

  return [ container ];
}

const animationDirective = {
  name: 'animation',
  alias: [ 'anim' ],
  doc: 'Embed one of the book\'s own looping animations from `animations/`, with the ' +
       'matching static SVG figure as the fallback for print, PDF, DOCX, and Markdown.',
  arg: {
    type: String,
    required: true,
    doc: 'The animation id (e.g. `ch03-standing-wave-formation`, resolving to ' +
         '`animations/ch03-standing-wave-formation.html`), or a path or URL.'
  },
  options: {
    figure: {
      type: String,
      doc: 'Static fallback image. Defaults to `/images/<id>.svg`; required when the ' +
           'argument is a path or URL rather than a bare id.'
    },
    'no-figure': {
      type: Boolean,
      doc: 'Omit the static fallback entirely. Leaves nothing to show in print, PDF, ' +
           'DOCX, or Markdown -- only for animations with no matching static figure.'
    },
    alt: {
      type: String,
      doc: 'Alternative text for the fallback image. Reuse the wording of the static ' +
           'figure it replaces where one already exists.'
    },
    title: {
      type: String,
      doc: 'Accessible title for the iframe.'
    },
    width: {
      type: String,
      doc: 'Width of the animation as a percentage, e.g. `80%` (default `100%`).'
    },
    aspect: {
      type: String,
      doc: 'Aspect ratio as `w:h` (default `2:1`). Other ratios need a matching rule ' +
           'in `plugins/simulation.css`.'
    },
    align: {
      type: String,
      doc: 'One of `left`, `center` (default), or `right`.'
    },
    label: {
      type: String,
      doc: 'Label the figure so it can be cross-referenced, e.g. `fig:ch03-standing-wave-formation`.'
    },
    class: {
      type: String,
      doc: 'Extra space-delimited CSS classes for the animation frame.'
    },
    enumerated: {
      type: Boolean,
      doc: 'Whether the figure is numbered.'
    }
  },
  body: { type: 'myst', doc: 'Caption for the animation.' },
  /**
   * @param {Object} data - Directive data supplied by MyST.
   * @param {Object} vfile - The vfile for the source document.
   * @returns {Array<Object>} The AST nodes to insert.
   */
  run( data, vfile ) {
    return runAnimation( data, vfile );
  }
};

/**
 * @type {{name: string, directives: Array<Object>}}
 */
const plugin = {
  name: 'Figure animations',
  directives: [ animationDirective ]
};

export default plugin;
