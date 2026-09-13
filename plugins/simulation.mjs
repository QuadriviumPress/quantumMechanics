/**
 * @fileoverview MyST plugin for embedding interactive simulations.
 *
 * A simulation is a JavaScript application, so it can only ever *run* on the
 * website. MyST's `iframe` node reflects that: the site theme renders it, and
 * `myst-to-typst` renders a placeholder for it, but `myst-to-tex` and
 * `myst-to-docx` have no handler for it at all and drop it on the floor.
 *
 * MyST plugins cannot supply renderers for export formats (that part of the
 * plugin API is documented as planned, not implemented), and transforms run at
 * the `document`/`project` stage — before any format-specific rendering — so a
 * plugin cannot branch on the output format either. The fallback therefore has
 * to be structural: every directive here emits an `iframe` node *and* a plain
 * `image` node as siblings of one `figure` container, and each renderer keeps
 * whichever of the two it understands.
 *
 *   HTML site   live iframe; the image is hidden by plugins/simulation.css
 *   print       simulation.css flips it: iframe hidden, screenshot shown
 *   PDF (tex)   iframe dropped, \includegraphics of the screenshot
 *   PDF (typst) iframe handler returns early, #image of the screenshot
 *   DOCX        iframe unsupported, the image lands
 *   Markdown    the screenshot becomes the {figure} argument
 *
 * The caption always ends with a link to the live simulation, which is the one
 * piece of the fallback that survives in every format.
 *
 * @module plugins/simulation
 * @see {@link https://mystmd.org/guide/javascript-plugins}
 */

/**
 * Where the built-in fallback card lives, for simulations with no provider
 * screenshot and no explicit `:placeholder:`.
 *
 * The leading slash matters: MyST resolves a `/`-prefixed image URL against the
 * project root rather than the directory of the source file, and the directive
 * has no way to know which file it was written in.
 *
 * @type {string}
 */
const DEFAULT_PLACEHOLDER = '/images/simulation-placeholder.png';

/**
 * The theme hard-codes `padding-bottom: 60%` on the iframe wrapper, which is
 * within a hair of the SceneryStack 1024x618 frame. Anything else needs a CSS
 * class from simulation.css to override it.
 *
 * @type {string}
 */
const DEFAULT_ASPECT = '1024:618';

/**
 * Simulation hosts this plugin knows how to address by name.
 *
 * Each entry maps a short id to the URL of the running simulation and to a
 * screenshot for static exports. Screenshots must be PNG or JPEG: LaTeX accepts
 * `.pdf .png .jpg .jpeg` and DOCX only `.png .jpg .jpeg`, so a `.webp` or `.svg`
 * placeholder silently needs Inkscape or ImageMagick to survive an export.
 *
 * Adding a host is three lines. `label` is used for the caption link text and
 * the iframe's accessible title when the author does not supply one.
 *
 * @type {Object<string, {label: string, aspect?: string, resolve: function(string, Object): {url: string, placeholder: string}}>}
 */
const PROVIDERS = {
  openlyceum: {
    label: 'OpenLyceum',
    aspect: DEFAULT_ASPECT,
    /**
     * Screenshots come from the Baton repository rather than from the
     * simulation's own Pages site. Each simulation does publish
     * `screenshots/wide.png`, but that is the PWA manifest asset -- a generic
     * splash screen, byte-identical across most of the fleet. Baton's
     * `screenshots/<Repo>.png` are captures of the running simulation, kept
     * current by its refresh-screenshots workflow.
     *
     * @param {string} id - Repository name, e.g. `SpecialRelativity`.
     * @param {Object} opts - Resolved directive options.
     * @returns {{url: string, placeholder: string}}
     */
    resolve( id, opts ) {
      const query = buildQuery( {
        screens: opts.screens,
        initialScreen: opts.screen,
        locale: opts.locale
      }, opts.params );
      return {
        url: `https://openlyceum.github.io/${ id }/${ query }`,
        placeholder: `https://raw.githubusercontent.com/OpenLyceum/Baton/main/screenshots/${ id }.png`
      };
    }
  },

  phet: {
    label: 'PhET Interactive Simulations',
    // PhET frames are 768x504.
    aspect: '768:504',
    /**
     * @param {string} id - Simulation name, e.g. `blackbody-spectrum`.
     * @param {Object} opts - Resolved directive options.
     * @returns {{url: string, placeholder: string}}
     */
    resolve( id, opts ) {
      // PhET encodes the locale in the filename rather than the query string.
      const locale = opts.locale || 'en';
      const query = buildQuery( {
        screens: opts.screens,
        initialScreen: opts.screen
      }, opts.params );
      return {
        url: `https://phet.colorado.edu/sims/html/${ id }/latest/${ id }_${ locale }.html${ query }`,
        placeholder: `https://phet.colorado.edu/sims/html/${ id }/latest/${ id }-600.png`
      };
    }
  },

  'phet-legacy': {
    label: 'PhET Interactive Simulations',
    // The Java sims fill whatever frame they are given (the launcher sets
    // 100vw/100vh) but were laid out for a 4:3 window, so give them one.
    aspect: '4:3',
    /**
     * PhET's pre-HTML5 catalogue -- Photoelectric Effect, Quantum Bound
     * States, Quantum Tunneling, Lasers, the nuclear-physics family -- is
     * still the best interactive treatment of several topics in this book and
     * has no HTML5 replacement. Those sims are Java, run in the browser by
     * CheerpJ, and are served from a launcher that takes the *project* in the
     * path and the *simulation* in the query string. The two usually coincide;
     * where they do not, write them as `project/sim`, e.g.
     * `nuclear-physics/alpha-decay`.
     *
     * Two consequences worth knowing before using this provider. A CheerpJ sim
     * downloads a JVM before it starts, so the first paint takes tens of
     * seconds on a cold cache, and it is mouse-driven -- neither touch nor
     * keyboard navigation works the way it does in an HTML5 sim. Prefer `phet`
     * or `openlyceum` when either has something equivalent.
     *
     * `screens`/`screen` are joist query parameters and mean nothing here; the
     * flavor of a multi-sim project is chosen by the `sim` half of the id.
     *
     * @param {string} id - `sim`, or `project/sim` when they differ.
     * @param {Object} opts - Resolved directive options.
     * @returns {{url: string, placeholder: string, name: string}}
     */
    resolve( id, opts ) {
      const [ project, sim ] = id.includes( '/' ) ? id.split( '/', 2 ) : [ id, id ];
      const query = buildQuery( {
        simulation: sim,
        locale: opts.locale
      }, opts.params );
      return {
        url: `https://phet.colorado.edu/sims/cheerpj/${ project }/latest/${ project }.html${ query }`,
        // Legacy screenshots live beside the project, not under `sims/html`.
        placeholder: `https://phet.colorado.edu/sims/${ project }/${ sim }-600.png`,
        // Without this the caption link would read "Nuclear Physics/alpha Decay".
        name: humanize( sim )
      };
    }
  }
};

/**
 * Assembles a query string from named parameters plus a raw `:params:` string.
 *
 * Undefined and empty values are dropped, so a directive with no options
 * produces no trailing `?`.
 *
 * @param {Object<string, (string|undefined)>} named - Parameters this plugin knows by name.
 * @param {string} [raw] - Additional parameters supplied verbatim by the author.
 * @returns {string} Either the empty string or a string beginning with `?`.
 */
function buildQuery( named, raw ) {
  const parts = [];
  Object.entries( named ).forEach( ( [ key, value ] ) => {
    if ( value === undefined || value === null || value === '' ) {
      return;
    }
    parts.push( `${ key }=${ encodeURIComponent( String( value ) ) }` );
  } );
  if ( raw ) {
    parts.push( String( raw ).replace( /^[?&]/, '' ) );
  }
  return parts.length ? `?${ parts.join( '&' ) }` : '';
}

/**
 * Turns an `:aspect:` option into the CSS class that simulation.css keys on.
 *
 * `16:9` becomes `simulation-aspect-16x9`; the ratio itself lives in the
 * stylesheet, which must use `!important` because the theme sets
 * `padding-bottom` as an inline style.
 *
 * @param {string} aspect - A `w:h` or `wxh` ratio.
 * @returns {string} A class name.
 */
function aspectClass( aspect ) {
  return `simulation-aspect-${ String( aspect ).trim().replace( /[:\s]+/g, 'x' ) }`;
}

/**
 * Splits a directive argument into a provider id and a simulation id.
 *
 * Accepts a bare URL, a `provider:id` shorthand, or (when the calling directive
 * fixes the provider) a bare simulation id.
 *
 * @param {string} arg - The directive argument.
 * @param {string} [fixedProvider] - Provider imposed by the directive name.
 * @returns {{provider: (string|undefined), id: string, isUrl: boolean}}
 */
function parseTarget( arg, fixedProvider ) {
  const value = String( arg ).trim();
  if ( /^https?:\/\//i.test( value ) || value.startsWith( '/' ) || value.startsWith( '.' ) ) {
    return { provider: undefined, id: value, isUrl: true };
  }
  if ( fixedProvider ) {
    return { provider: fixedProvider, id: value, isUrl: false };
  }
  const match = value.match( /^([A-Za-z][A-Za-z0-9_-]*):(.+)$/ );
  if ( match ) {
    return { provider: match[ 1 ].toLowerCase(), id: match[ 2 ], isUrl: false };
  }
  return { provider: undefined, id: value, isUrl: false };
}

/**
 * Words left lowercase when title-casing a slug, unless they lead the name.
 *
 * @type {Set<string>}
 */
const MINOR_WORDS = new Set( [ 'a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'vs' ] );

/**
 * Splits `SpecialRelativity` or `blackbody-spectrum` into readable words, for
 * the caption link and the iframe title.
 *
 * @param {string} id - A simulation id.
 * @returns {string} A human-readable name.
 */
function humanize( id ) {
  const words = String( id )
    .replace( /[-_]+/g, ' ' )
    .replace( /([a-z0-9])([A-Z])/g, '$1 $2' )
    // Split a trailing word off a run of capitals: `ACPhasor` -> `AC Phasor`.
    .replace( /([A-Z]+)([A-Z][a-z])/g, '$1 $2' )
    .replace( /\s+/g, ' ' )
    .trim()
    .split( ' ' );
  return words
    .map( ( word, index ) => {
      if ( index > 0 && MINOR_WORDS.has( word.toLowerCase() ) ) {
        return word.toLowerCase();
      }
      // Leave names that already carry capitals alone, so `RLC` stays `RLC`.
      return /[A-Z]/.test( word ) ? word : word.charAt( 0 ).toUpperCase() + word.slice( 1 );
    } )
    .join( ' ' );
}

/**
 * Builds a paragraph node reporting a directive error.
 *
 * The message is also pushed onto the vfile so it appears in the build log
 * rather than only in the rendered output.
 *
 * MyST does not hand the directive node to `run`, so the message carries no
 * source position; the file name in the build log is enough to find it.
 *
 * @param {string} message - What went wrong.
 * @param {Object} [vfile] - The vfile MyST passes to `run`.
 * @returns {Array<Object>} A single-paragraph AST.
 */
function directiveError( message, vfile ) {
  if ( vfile && typeof vfile.message === 'function' ) {
    const reported = vfile.message( message );
    reported.fatal = false;
    reported.source = 'plugins/simulation.mjs';
  }
  return [ {
    type: 'paragraph',
    children: [ { type: 'strong', children: [ { type: 'text', value: `Simulation error: ${ message }` } ] } ]
  } ];
}

/**
 * Shared implementation behind `{simulation}`, `{openlyceum}`, and `{phet}`.
 *
 * @param {Object} data - Directive data supplied by MyST.
 * @param {Object} vfile - The vfile for the source document.
 * @param {string} [fixedProvider] - Provider imposed by the directive name.
 * @returns {Array<Object>} The AST nodes to insert.
 */
function runSimulation( data, vfile, fixedProvider ) {
  const options = data.options ?? {};

  if ( !data.arg ) {
    return directiveError( 'a simulation URL or name is required', vfile );
  }

  const { provider: providerName, id, isUrl } = parseTarget( data.arg, fixedProvider );

  let url;
  let defaultPlaceholder = DEFAULT_PLACEHOLDER;
  let defaultAspect = DEFAULT_ASPECT;
  let name = humanize( id );
  let defaultAlt = `Screenshot of the ${ name } simulation`;

  if ( isUrl ) {
    url = `${ id }${ buildQuery( { locale: options.locale }, options.params ) }`;
    // A bare URL has no name to speak of; fall back to the host.
    try {
      name = new URL( id, 'https://example.invalid' ).hostname.replace( /^www\./, '' );
    }
    catch {
      name = 'the simulation';
    }
    defaultAlt = `Screenshot of the simulation at ${ name }`;
  }
  else if ( providerName ) {
    const provider = PROVIDERS[ providerName ];
    if ( !provider ) {
      const known = Object.keys( PROVIDERS ).join( ', ' );
      return directiveError(
        `unknown simulation provider "${ providerName }" (known providers: ${ known })`,
        vfile
      );
    }
    const resolved = provider.resolve( id, options );
    url = resolved.url;
    defaultPlaceholder = resolved.placeholder;
    defaultAspect = provider.aspect ?? DEFAULT_ASPECT;
    // A provider whose id carries more than the simulation's name -- as
    // `phet-legacy`'s `project/sim` does -- names the simulation itself.
    if ( resolved.name ) {
      name = resolved.name;
      defaultAlt = `Screenshot of the ${ name } simulation`;
    }
  }
  else {
    return directiveError(
      `"${ data.arg }" is neither a URL nor a "provider:name" reference ` +
      `(known providers: ${ Object.keys( PROVIDERS ).join( ', ' ) })`,
      vfile
    );
  }

  // An explicit name overrides both the humanized id and anything a provider
  // derived, and feeds the caption link and the iframe title alike.
  if ( options[ 'sim-name' ] ) {
    name = String( options[ 'sim-name' ] ).trim();
    defaultAlt = `Screenshot of the ${ name } simulation`;
  }

  const width = options.width || '100%';
  const aspect = options.aspect || defaultAspect;
  const title = options.title || `${ name } — interactive simulation`;

  const children = [];

  // The live simulation. Rendered by the site theme and by nothing else; the
  // theme applies `class` to the wrapper div, which is how simulation.css
  // reaches the aspect ratio and the print rules.
  children.push( {
    type: 'iframe',
    src: url,
    width,
    align: options.align || 'center',
    title,
    class: [ 'simulation-frame', aspectClass( aspect ), options.class ].filter( Boolean ).join( ' ' )
  } );

  // The static fallback. Deliberately *not* marked `placeholder: true`: MyST's
  // placeholder promotion only runs for tex/typst/docx, depends on the URL
  // extension being valid for that format, and leaves myst-to-md's figure
  // handler dereferencing an undefined `node.source`. A plain image needs none
  // of that and renders in every export.
  if ( !options[ 'no-placeholder' ] ) {
    children.push( {
      type: 'image',
      url: options.placeholder || defaultPlaceholder,
      alt: options.alt || defaultAlt,
      width,
      align: options.align || 'center',
      class: 'simulation-placeholder'
    } );
  }

  // The caption: the author's body, then the link that survives every format.
  const captionChildren = [ ...( data.body ?? [] ) ];
  if ( !options[ 'no-link' ] ) {
    captionChildren.push( {
      type: 'paragraph',
      class: 'simulation-link',
      children: [
        { type: 'text', value: 'Interactive simulation: ' },
        {
          type: 'link',
          url,
          children: [ { type: 'text', value: options[ 'link-text' ] || name } ]
        }
      ]
    } );
  }
  if ( captionChildren.length ) {
    children.push( { type: 'caption', children: captionChildren } );
  }

  const container = {
    type: 'container',
    kind: 'figure',
    class: 'simulation',
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

/**
 * Options accepted by all three directives.
 *
 * @returns {Object} A MyST directive options object.
 */
function simulationOptions() {
  return {
    width: {
      type: String,
      doc: 'Width of the simulation as a percentage, e.g. `80%` (default `100%`). ' +
           'Pixel widths are not supported by the MyST theme.'
    },
    aspect: {
      type: String,
      doc: 'Aspect ratio as `w:h`, e.g. `16:9`. Defaults to the provider frame ' +
           '(`1024:618` for OpenLyceum, `768:504` for PhET). Ratios other than ' +
           'those need a matching rule in `plugins/simulation.css`.'
    },
    placeholder: {
      type: String,
      doc: 'Screenshot to use in PDF, DOCX, Markdown, and print. Relative to the ' +
           'source file, or `/`-prefixed for the project root, or a URL. Use PNG ' +
           'or JPEG. Defaults to the provider screenshot.'
    },
    'no-placeholder': {
      type: Boolean,
      doc: 'Omit the static fallback image entirely.'
    },
    alt: {
      type: String,
      doc: 'Alternative text for the fallback image.'
    },
    title: {
      type: String,
      doc: 'Accessible title for the iframe.'
    },
    align: {
      type: String,
      doc: 'One of `left`, `center` (default), or `right`.'
    },
    label: {
      type: String,
      doc: 'Label the figure so it can be cross-referenced, e.g. `fig:ch04-michelson-sim`.'
    },
    class: {
      type: String,
      doc: 'Extra space-delimited CSS classes for the simulation frame.'
    },
    enumerated: {
      type: Boolean,
      doc: 'Whether the figure is numbered.'
    },
    params: {
      type: String,
      doc: 'Extra query-string parameters passed to the simulation, e.g. ' +
           '`snapToGrid=true&gridSpacing=2`.'
    },
    screens: {
      type: String,
      doc: 'Restrict the simulation to particular screens, e.g. `2` or `1,3` ' +
           '(SceneryStack and PhET `?screens=`).'
    },
    screen: {
      type: String,
      doc: 'Screen to open on (SceneryStack and PhET `?initialScreen=`).'
    },
    locale: {
      type: String,
      doc: 'Language code, e.g. `fr`. Defaults to `en`.'
    },
    'sim-name': {
      type: String,
      doc: 'Display name of the simulation, used for the caption link, the iframe ' +
           'title, and the fallback alt text. Defaults to the id made readable, ' +
           'which is wrong whenever the publisher\'s title is not its URL slug ' +
           '(`mri` is "Simplified MRI").'
    },
    'link-text': {
      type: String,
      doc: 'Text of the caption link to the live simulation. Defaults to the simulation name.'
    },
    'no-link': {
      type: Boolean,
      doc: 'Suppress the caption link to the live simulation.'
    }
  };
}

/**
 * Builds a directive spec. `{openlyceum}` and `{phet}` are the generic
 * `{simulation}` directive with the provider fixed.
 *
 * @param {Object} spec - Directive identity.
 * @param {string} spec.name - Directive name.
 * @param {string} spec.doc - Directive documentation.
 * @param {string} spec.argDoc - Documentation for the argument.
 * @param {Array<string>} [spec.alias] - Alternative directive names.
 * @param {string} [spec.provider] - Provider imposed by this directive.
 * @returns {Object} A MyST directive spec.
 */
function makeDirective( { name, doc, argDoc, alias, provider } ) {
  return {
    name,
    doc,
    alias,
    arg: { type: String, doc: argDoc, required: true },
    options: simulationOptions(),
    body: { type: 'myst', doc: 'Caption for the simulation.' },
    /**
     * @param {Object} data - Directive data supplied by MyST.
     * @param {Object} vfile - The vfile for the source document.
     * @returns {Array<Object>} The AST nodes to insert.
     */
    run( data, vfile ) {
      return runSimulation( data, vfile, provider );
    }
  };
}

const simulationDirective = makeDirective( {
  name: 'simulation',
  alias: [ 'sim' ],
  doc: 'Embed an interactive simulation, with a static screenshot for PDF, DOCX, ' +
       'Markdown, and print.',
  argDoc: 'The simulation URL, or a `provider:name` reference such as ' +
          '`openlyceum:SpecialRelativity` or `phet:blackbody-spectrum`.'
} );

const openLyceumDirective = makeDirective( {
  name: 'openlyceum',
  provider: 'openlyceum',
  doc: 'Embed a simulation published by the OpenLyceum organization.',
  argDoc: 'The OpenLyceum repository name, e.g. `SpecialRelativity`.'
} );

const phetDirective = makeDirective( {
  name: 'phet',
  provider: 'phet',
  doc: 'Embed a PhET Interactive Simulation from phet.colorado.edu.',
  argDoc: 'The PhET simulation name, e.g. `blackbody-spectrum`.'
} );

const phetLegacyDirective = makeDirective( {
  name: 'phet-legacy',
  provider: 'phet-legacy',
  doc: 'Embed one of PhET\'s pre-HTML5 Java simulations, run in the browser by ' +
       'CheerpJ. Slow to start and mouse-only; use `{phet}` where an HTML5 ' +
       'version exists.',
  argDoc: 'The PhET simulation name, or `project/name` when the two differ, ' +
          'e.g. `photoelectric` or `nuclear-physics/alpha-decay`.'
} );

/**
 * @type {{name: string, directives: Array<Object>}}
 */
const plugin = {
  name: 'Interactive simulations',
  directives: [ simulationDirective, openLyceumDirective, phetDirective, phetLegacyDirective ]
};

export default plugin;
