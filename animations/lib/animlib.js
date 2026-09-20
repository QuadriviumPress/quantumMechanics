/**
 * @fileoverview Shared runtime for the book's looping figure animations.
 *
 * Each animation is a small standalone HTML page under `animations/`, embedded
 * on the website by the `{animation}` directive (`plugins/animation.mjs`) and
 * replaced by the matching static SVG everywhere else (PDF, DOCX, print). This
 * module supplies the pieces every one of those pages needs: canvas setup at
 * device pixel ratio, a play/pause animation loop that starts paused for
 * readers who asked for reduced motion, a data-to-pixel coordinate mapper, and
 * curve-drawing helpers using the same palette as the static figures.
 *
 * @module animations/lib/animlib
 */

/**
 * Palette shared with `scripts/figures/figstyle.py`, so a live animation and
 * its static-figure fallback read as the same figure family.
 *
 * @type {Object<string, string>}
 */
export const COLORS = {
  blue: '#1769aa',
  red: '#b33a3a',
  green: '#2e7d5b',
  purple: '#6a4c93',
  orange: '#d97706',
  gray: '#555555',
  light: '#c9d6e0'
};

/** @type {Array<string>} Series color order, matching `figstyle.CYCLE`. */
export const CYCLE = [ COLORS.blue, COLORS.red, COLORS.green, COLORS.purple, COLORS.orange ];

/**
 * True when the reader's OS/browser asks for reduced motion.
 *
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
}

/**
 * Sizes a canvas's backing store to its CSS size at the device pixel ratio,
 * so strokes stay crisp on high-DPI screens, and keeps it in sync on resize.
 *
 * @param {HTMLCanvasElement} canvas
 * @returns {CanvasRenderingContext2D}
 */
export function setupCanvas( canvas ) {
  const ctx = canvas.getContext( '2d' );
  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max( 1, Math.round( rect.width * dpr ) );
    canvas.height = Math.max( 1, Math.round( rect.height * dpr ) );
    ctx.setTransform( dpr, 0, 0, dpr, 0, 0 );
  };
  resize();
  window.addEventListener( 'resize', resize );
  return ctx;
}

/**
 * Starts a `requestAnimationFrame` loop calling `draw(ctx, t, width, height)`
 * every frame, with a play/pause toggle appended to `controls` (when given).
 *
 * The loop starts paused when the reader has asked for reduced motion, and the
 * toggle always lets them override that either way.
 *
 * @param {Object} opts
 * @param {HTMLCanvasElement} opts.canvas
 * @param {function(CanvasRenderingContext2D, number, number, number): void} opts.draw -
 *   Called each frame with the drawing context, elapsed seconds, and the
 *   canvas's CSS width/height.
 * @param {HTMLElement} [opts.controls] - Element to receive the play/pause button.
 * @param {number} [opts.speed] - Multiplier on elapsed time (default 1).
 * @returns {{setPlaying: function(boolean): void, isPlaying: function(): boolean}}
 */
export function startLoop( { canvas, draw, controls, speed = 1 } ) {
  const ctx = setupCanvas( canvas );
  let playing = !prefersReducedMotion();
  let t = 0;
  let last = null;

  function frame( now ) {
    if ( last === null ) {
      last = now;
    }
    const dt = ( now - last ) / 1000;
    last = now;
    if ( playing ) {
      t += dt * speed;
    }
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect( 0, 0, rect.width, rect.height );
    draw( ctx, t, rect.width, rect.height );
    requestAnimationFrame( frame );
  }
  requestAnimationFrame( frame );

  function setPlaying( value ) {
    playing = value;
    last = null;
    if ( button ) {
      button.textContent = playing ? 'Pause' : 'Play';
      button.setAttribute( 'aria-pressed', String( !playing ) );
    }
  }

  let button = null;
  if ( controls ) {
    button = document.createElement( 'button' );
    button.type = 'button';
    button.className = 'anim-toggle';
    button.setAttribute( 'aria-pressed', String( !playing ) );
    button.textContent = playing ? 'Pause' : 'Play';
    button.addEventListener( 'click', () => setPlaying( !playing ) );
    controls.appendChild( button );
  }

  return { setPlaying, isPlaying: () => playing };
}

/**
 * Builds a linear data-to-pixel mapper for a single canvas panel.
 *
 * @param {Object} opts
 * @param {number} opts.width - Canvas CSS width in pixels.
 * @param {number} opts.height - Canvas CSS height in pixels.
 * @param {number} opts.xMin
 * @param {number} opts.xMax
 * @param {number} opts.yMin
 * @param {number} opts.yMax
 * @param {number} [opts.margin] - Pixel margin on all four sides (default 28).
 * @returns {{x: function(number): number, y: function(number): number, margin: number}}
 */
export function makeMapper( { width, height, xMin, xMax, yMin, yMax, margin = 28 } ) {
  const xScale = ( width - 2 * margin ) / ( xMax - xMin );
  const yScale = ( height - 2 * margin ) / ( yMax - yMin );
  return {
    x: x => margin + ( x - xMin ) * xScale,
    y: y => height - margin - ( y - yMin ) * yScale,
    margin
  };
}

/**
 * Strokes a polyline through `(xs[i], ys[i])` in data coordinates.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x: function(number): number, y: function(number): number}} mapper
 * @param {Array<number>} xs
 * @param {Array<number>} ys
 * @param {Object} [style]
 * @param {string} [style.color]
 * @param {number} [style.lineWidth]
 * @param {Array<number>} [style.dash]
 * @param {number} [style.alpha]
 */
export function plotCurve( ctx, mapper, xs, ys, style = {} ) {
  const { color = COLORS.blue, lineWidth = 1.8, dash = [], alpha = 1 } = style;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.setLineDash( dash );
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  for ( let i = 0; i < xs.length; i++ ) {
    const px = mapper.x( xs[ i ] );
    const py = mapper.y( ys[ i ] );
    if ( i === 0 ) {
      ctx.moveTo( px, py );
    }
    else {
      ctx.lineTo( px, py );
    }
  }
  ctx.stroke();
  ctx.restore();
}

/**
 * Fills the band between two curves over the same `xs`, the way the static
 * mode-shape figures shade the envelope a standing wave oscillates within
 * (matplotlib's `fill_between`).
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x: function(number): number, y: function(number): number}} mapper
 * @param {Array<number>} xs
 * @param {Array<number>} ysTop
 * @param {Array<number>} ysBottom
 * @param {Object} [style]
 * @param {string} [style.color]
 * @param {number} [style.alpha]
 */
export function fillBetween( ctx, mapper, xs, ysTop, ysBottom, style = {} ) {
  const { color = COLORS.blue, alpha = 0.1 } = style;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  for ( let i = 0; i < xs.length; i++ ) {
    const px = mapper.x( xs[ i ] );
    const py = mapper.y( ysTop[ i ] );
    if ( i === 0 ) {
      ctx.moveTo( px, py );
    }
    else {
      ctx.lineTo( px, py );
    }
  }
  for ( let i = xs.length - 1; i >= 0; i-- ) {
    ctx.lineTo( mapper.x( xs[ i ] ), mapper.y( ysBottom[ i ] ) );
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Draws a light horizontal zero line across the data domain, the way the
 * static figures mark it (`figstyle.waveform`'s `axhline`).
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x: function(number): number, y: function(number): number}} mapper
 * @param {number} xMin
 * @param {number} xMax
 */
export function drawZeroLine( ctx, mapper, xMin, xMax ) {
  ctx.save();
  ctx.strokeStyle = COLORS.gray;
  ctx.globalAlpha = 0.6;
  ctx.lineWidth = 0.6;
  ctx.setLineDash( [] );
  ctx.beginPath();
  ctx.moveTo( mapper.x( xMin ), mapper.y( 0 ) );
  ctx.lineTo( mapper.x( xMax ), mapper.y( 0 ) );
  ctx.stroke();
  ctx.restore();
}

/**
 * Fills a small dot at a data point, used to mark fixed features such as
 * standing-wave nodes.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x: function(number): number, y: function(number): number}} mapper
 * @param {number} x
 * @param {number} y
 * @param {Object} [style]
 * @param {string} [style.color]
 * @param {number} [style.radius]
 */
export function plotPoint( ctx, mapper, x, y, style = {} ) {
  const { color = COLORS.red, radius = 3.5 } = style;
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc( mapper.x( x ), mapper.y( y ), radius, 0, 2 * Math.PI );
  ctx.fill();
  ctx.restore();
}

/**
 * Builds an evenly spaced array of `n` samples from `min` to `max` inclusive.
 *
 * @param {number} min
 * @param {number} max
 * @param {number} n
 * @returns {Array<number>}
 */
export function linspace( min, max, n ) {
  if ( n <= 1 ) {
    return [ min ];
  }
  const step = ( max - min ) / ( n - 1 );
  return Array.from( { length: n }, ( _, i ) => min + i * step );
}
