/**
 * @fileoverview MyST directive for YouTube and Vimeo videos.
 *
 * The website receives a privacy-conscious iframe embed. Static outputs cannot
 * render an iframe, so the directive also emits a plain poster image and a
 * caption link to the original video. CSS hides the poster on screen and swaps
 * the iframe for it when a reader prints the web page; MyST's PDF and DOCX
 * paths naturally keep the image after plugins/export.mjs removes the iframe.
 *
 * YouTube publishes thumbnails at a stable URL, so its poster can be derived
 * from the video id. Vimeo thumbnails are returned by oEmbed and are not
 * derivable without a network request, so Vimeo directives require `:poster:`.
 * Keeping the poster explicit also makes unlisted Vimeo videos usable.
 *
 * @module plugins/video
 * @see {@link https://mystmd.org/guide/javascript-plugins}
 */

const YOUTUBE_HOSTS = new Set( [
  'youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'www.youtube.com',
  'www.youtube-nocookie.com',
  'youtube-nocookie.com',
  'youtu.be'
] );

const VIMEO_HOSTS = new Set( [
  'vimeo.com',
  'www.vimeo.com',
  'player.vimeo.com'
] );

/** @param {string} value */
function parseTime( value ) {
  const input = String( value || '' ).trim().toLowerCase();
  if ( /^\d+$/.test( input ) ) return Number( input );
  const match = input.match( /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/ );
  if ( !match || !match[0] ) return null;
  return Number( match[1] || 0 ) * 3600 + Number( match[2] || 0 ) * 60 + Number( match[3] || 0 );
}

/**
 * Parse a supported video URL into the URLs used by the iframe, poster, and
 * durable caption link.
 *
 * @param {string} input
 * @returns {{provider: 'YouTube'|'Vimeo', id: string, embedUrl: string,
 *   linkUrl: string, defaultPoster: string|null}}
 */
function resolveVideo( input ) {
  const value = String( input || '' ).trim();
  let source;
  try {
    source = new URL( value );
  }
  catch {
    throw new Error( 'a complete YouTube or Vimeo URL is required' );
  }

  if ( ![ 'http:', 'https:' ].includes( source.protocol ) ) {
    throw new Error( 'the video URL must use HTTP or HTTPS' );
  }

  const host = source.hostname.toLowerCase();
  if ( YOUTUBE_HOSTS.has( host ) ) {
    const parts = source.pathname.split( '/' ).filter( Boolean );
    let id = null;
    if ( host === 'youtu.be' ) {
      [ id ] = parts;
    }
    else if ( parts[0] === 'watch' ) {
      id = source.searchParams.get( 'v' );
    }
    else if ( [ 'embed', 'shorts', 'live' ].includes( parts[0] ) ) {
      id = parts[1];
    }

    if ( !id || !/^[A-Za-z0-9_-]{11}$/.test( id ) ) {
      throw new Error( 'the YouTube URL does not contain a valid video id' );
    }

    const embed = new URL( `https://www.youtube-nocookie.com/embed/${ id }` );
    const hashTime = new URLSearchParams( source.hash.replace( /^#/, '' ) ).get( 't' );
    const start = parseTime(
      source.searchParams.get( 'start' ) || source.searchParams.get( 't' ) || hashTime
    );
    if ( start ) embed.searchParams.set( 'start', String( start ) );

    return {
      provider: 'YouTube',
      id,
      embedUrl: embed.toString(),
      linkUrl: value,
      defaultPoster: `https://i.ytimg.com/vi/${ id }/hqdefault.jpg`
    };
  }

  if ( VIMEO_HOSTS.has( host ) ) {
    const parts = source.pathname.split( '/' ).filter( Boolean );
    const id = [ ...parts ].reverse().find( part => /^\d+$/.test( part ) );
    if ( !id ) {
      throw new Error( 'the Vimeo URL does not contain a numeric video id' );
    }

    const embed = new URL( `https://player.vimeo.com/video/${ id }` );
    // Vimeo uses this parameter for unlisted videos. Preserve it without
    // carrying unrelated tracking or autoplay parameters into the embed.
    const idIndex = parts.indexOf( id );
    const pathHash = parts[idIndex + 1] && /^[A-Za-z0-9]+$/.test( parts[idIndex + 1] )
      ? parts[idIndex + 1]
      : null;
    const privacyHash = source.searchParams.get( 'h' ) || pathHash;
    if ( privacyHash ) embed.searchParams.set( 'h', privacyHash );
    if ( source.hash ) embed.hash = source.hash;

    return {
      provider: 'Vimeo',
      id,
      embedUrl: embed.toString(),
      linkUrl: value,
      defaultPoster: null
    };
  }

  throw new Error( `unsupported video host "${ host }"; use a YouTube or Vimeo URL` );
}

/** @param {string} aspect */
function aspectClass( aspect ) {
  return `video-aspect-${ String( aspect ).trim().replace( /[:\s]+/g, 'x' ) }`;
}

/**
 * @param {string} message
 * @param {Object} [vfile]
 * @returns {Array<Object>}
 */
function directiveError( message, vfile ) {
  if ( vfile && typeof vfile.message === 'function' ) {
    const reported = vfile.message( message );
    reported.fatal = false;
    reported.source = 'plugins/video.mjs';
  }
  return [ {
    type: 'paragraph',
    children: [ { type: 'strong', children: [ { type: 'text', value: `Video error: ${ message }` } ] } ]
  } ];
}

/**
 * @param {Object} data
 * @param {Object} vfile
 * @returns {Array<Object>}
 */
function runVideo( data, vfile ) {
  const options = data.options ?? {};
  let video;
  try {
    video = resolveVideo( data.arg );
  }
  catch ( error ) {
    return directiveError( error.message, vfile );
  }

  const poster = options.poster || video.defaultPoster;
  if ( !poster ) {
    return directiveError(
      'Vimeo videos require a `:poster:` image for PDF, Word, Markdown, and print',
      vfile
    );
  }

  const name = String( options[ 'video-title' ] || `${ video.provider } video` ).trim();
  const width = options.width || '100%';
  const align = options.align || 'center';
  const aspect = options.aspect || '16:9';
  const children = [
    {
      type: 'iframe',
      src: video.embedUrl,
      width,
      align,
      title: options.title || name,
      class: [ 'video-frame', aspectClass( aspect ), options.class ].filter( Boolean ).join( ' ' )
    },
    {
      type: 'image',
      url: poster,
      alt: options.alt || `Poster image for ${ name }`,
      width,
      align,
      class: 'video-placeholder'
    }
  ];

  const captionChildren = [ ...( data.body ?? [] ) ];
  captionChildren.push( {
    type: 'paragraph',
    class: 'video-link',
    children: [
      { type: 'text', value: `Watch on ${ video.provider }: ` },
      {
        type: 'link',
        url: video.linkUrl,
        children: [ { type: 'text', value: options[ 'link-text' ] || name } ]
      }
    ]
  } );
  children.push( { type: 'caption', children: captionChildren } );

  const container = {
    type: 'container',
    kind: 'figure',
    class: 'video',
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

const videoDirective = {
  name: 'video',
  doc: 'Embed a YouTube or Vimeo video, with a poster image and source link for ' +
       'PDF, DOCX, Markdown, and print.',
  arg: {
    type: String,
    required: true,
    doc: 'A complete YouTube or Vimeo video URL.'
  },
  options: {
    poster: {
      type: String,
      doc: 'Poster image for static outputs. Optional for YouTube; required for Vimeo.'
    },
    'video-title': {
      type: String,
      doc: 'Human-readable video title used in the link and default accessibility text.'
    },
    alt: {
      type: String,
      doc: 'Alternative text for the poster image.'
    },
    title: {
      type: String,
      doc: 'Accessible title for the iframe. Defaults to `video-title`.'
    },
    'link-text': {
      type: String,
      doc: 'Text of the caption link. Defaults to `video-title`.'
    },
    width: {
      type: String,
      doc: 'Width as a percentage (default `100%`).'
    },
    aspect: {
      type: String,
      doc: 'Aspect ratio as `w:h` (default `16:9`). Other ratios need matching CSS.'
    },
    align: {
      type: String,
      doc: 'One of `left`, `center` (default), or `right`.'
    },
    label: {
      type: String,
      doc: 'Label the figure so it can be cross-referenced.'
    },
    class: {
      type: String,
      doc: 'Extra space-delimited CSS classes for the video frame.'
    },
    enumerated: {
      type: Boolean,
      doc: 'Whether the figure is numbered.'
    }
  },
  body: { type: 'myst', doc: 'Caption for the video.' },
  run( data, vfile ) {
    return runVideo( data, vfile );
  }
};

const plugin = {
  name: 'YouTube and Vimeo videos',
  directives: [ videoDirective ]
};

export { aspectClass, parseTime, resolveVideo, runVideo };
export default plugin;
