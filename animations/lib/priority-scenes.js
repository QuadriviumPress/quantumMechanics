/** Interactive scenes for the textbook's ten high-priority animated figures. */
import { startLoop, makeMapper, plotCurve, plotPoint, drawZeroLine, COLORS, linspace } from './animlib.js';

const canvas = document.getElementById( 'canvas' );
const controls = document.getElementById( 'controls' );
const note = document.getElementById( 'note' );
const TAU = 2 * Math.PI;

function clamp( value, min = 0, max = 1 ) { return Math.max( min, Math.min( max, value ) ); }
function mix( a, b, p ) { return a + ( b - a ) * p; }
function pingPong( t, period ) { return 1 - Math.abs( 2 * ( ( t / period ) % 1 ) - 1 ); }
function rgba( hex, alpha ) {
  const n = Number.parseInt( hex.slice( 1 ), 16 );
  return `rgba(${ n >> 16 },${ ( n >> 8 ) & 255 },${ n & 255 },${ alpha })`;
}
function text( ctx, value, x, y, color = COLORS.gray, font = '11px sans-serif', align = 'left' ) {
  ctx.save(); ctx.fillStyle = color; ctx.font = font; ctx.textAlign = align; ctx.fillText( value, x, y ); ctx.restore();
}
function line( ctx, x0, y0, x1, y1, color = COLORS.gray, width = 1.5, dash = [] ) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash( dash );
  ctx.beginPath(); ctx.moveTo( x0, y0 ); ctx.lineTo( x1, y1 ); ctx.stroke(); ctx.restore();
}
function arrow( ctx, x0, y0, x1, y1, color = COLORS.blue, width = 2 ) {
  line( ctx, x0, y0, x1, y1, color, width );
  const a = Math.atan2( y1 - y0, x1 - x0 );
  ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo( x1, y1 );
  ctx.lineTo( x1 - 8 * Math.cos( a - 0.42 ), y1 - 8 * Math.sin( a - 0.42 ) );
  ctx.lineTo( x1 - 8 * Math.cos( a + 0.42 ), y1 - 8 * Math.sin( a + 0.42 ) ); ctx.closePath(); ctx.fill(); ctx.restore();
}
function polyline( ctx, points, color, width = 2, progress = 1, dash = [] ) {
  if ( points.length < 2 || progress <= 0 ) return;
  const lengths = points.slice( 1 ).map( ( point, i ) => Math.hypot( point[ 0 ] - points[ i ][ 0 ], point[ 1 ] - points[ i ][ 1 ] ) );
  const target = lengths.reduce( ( a, b ) => a + b, 0 ) * clamp( progress );
  let used = 0;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash( dash ); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo( ...points[ 0 ] );
  for ( let i = 0; i < lengths.length; i++ ) {
    if ( used + lengths[ i ] <= target ) { ctx.lineTo( ...points[ i + 1 ] ); used += lengths[ i ]; continue; }
    const p = clamp( ( target - used ) / lengths[ i ] );
    ctx.lineTo( mix( points[ i ][ 0 ], points[ i + 1 ][ 0 ], p ), mix( points[ i ][ 1 ], points[ i + 1 ][ 1 ], p ) ); break;
  }
  ctx.stroke(); ctx.restore();
}
function rangeControl( labelText, min, max, value, step, onInput ) {
  const label = document.createElement( 'label' ); label.className = 'anim-control'; label.append( `${ labelText } ` );
  const input = document.createElement( 'input' ); input.type = 'range'; input.min = min; input.max = max; input.value = value; input.step = step;
  const output = document.createElement( 'output' ); output.textContent = value;
  input.addEventListener( 'input', () => { output.textContent = input.value; onInput( Number( input.value ) ); } );
  label.append( input, output ); controls.appendChild( label ); return input;
}
function selectControl( labelText, choices, value, onChange ) {
  const label = document.createElement( 'label' ); label.className = 'anim-control'; label.append( `${ labelText } ` );
  const select = document.createElement( 'select' );
  for ( const [ optionValue, optionText ] of choices ) { const option = document.createElement( 'option' ); option.value = optionValue; option.textContent = optionText; select.appendChild( option ); }
  select.value = value; select.addEventListener( 'change', () => onChange( select.value ) ); label.appendChild( select ); controls.appendChild( label );
}
function drawAxes( ctx, mapper, xMin, xMax, yMin, yMax, xLabel = '', yLabel = '' ) {
  line( ctx, mapper.x( xMin ), mapper.y( yMin ), mapper.x( xMax ), mapper.y( yMin ), COLORS.gray, 1 );
  line( ctx, mapper.x( xMin ), mapper.y( yMin ), mapper.x( xMin ), mapper.y( yMax ), COLORS.gray, 1 );
  if ( xLabel ) text( ctx, xLabel, mapper.x( ( xMin + xMax ) / 2 ), mapper.y( yMin ) + 18, COLORS.gray, '10px sans-serif', 'center' );
  if ( yLabel ) text( ctx, yLabel, mapper.x( xMin ) + 4, mapper.y( yMax ) + 11, COLORS.gray, '10px sans-serif' );
}

function simultaneityScene() {
  let frame = 'ground';
  selectControl( 'Frame:', [ [ 'ground', 'Ground frame' ], [ 'train', 'Train frame' ] ], frame, value => { frame = value; } );
  return { speed: 0.65, draw( ctx, t, w, h ) {
    const phase = t % 5.6; const localT = Math.max( 0, phase - 0.7 ); const v = 0.43; const c = 1; const half = 1.7;
    const hitBack = frame === 'ground' ? half / ( c + v ) : half; const hitFront = frame === 'ground' ? half / ( c - v ) : half;
    const scale = Math.min( w / 8.5, h / 3.8 ); const ox = w / 2; const railY = h * 0.73;
    const carCenter = frame === 'ground' ? v * localT : 0; const observer = frame === 'ground' ? 0 : -v * localT;
    const px = x => ox + x * scale;
    line( ctx, 10, railY + 24, w - 10, railY + 24, COLORS.gray, 2 );
    for ( let x = 15; x < w; x += 28 ) line( ctx, x, railY + 18, x + 12, railY + 30, COLORS.light, 2 );
    ctx.fillStyle = rgba( COLORS.blue, 0.11 ); ctx.strokeStyle = COLORS.blue; ctx.lineWidth = 2;
    ctx.fillRect( px( carCenter - half ), railY - 75, 2 * half * scale, 66 ); ctx.strokeRect( px( carCenter - half ), railY - 75, 2 * half * scale, 66 );
    line( ctx, px( carCenter ), railY - 75, px( carCenter ), railY - 9, COLORS.light, 1.5, [ 4, 3 ] );
    for ( const s of [ -1, 1 ] ) { ctx.beginPath(); ctx.fillStyle = COLORS.gray; ctx.arc( px( carCenter + s * 1.05 ), railY - 4, 9, 0, TAU ); ctx.fill(); }
    if ( phase < 0.7 ) {
      const a = 1 - phase / 0.7; ctx.beginPath(); ctx.fillStyle = `rgba(217,119,6,${ a })`; ctx.arc( px( carCenter ), railY - 43, 7 + 20 * ( 1 - a ), 0, TAU ); ctx.fill();
      text( ctx, 'source flashes', px( carCenter ), railY - 87, COLORS.orange, 'bold 11px sans-serif', 'center' );
    } else {
      const emissionX = frame === 'ground' ? 0 : 0; const radius = c * localT * scale;
      ctx.save(); ctx.strokeStyle = COLORS.orange; ctx.lineWidth = 2.5; ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.arc( px( emissionX ), railY - 43, radius, 0, TAU ); ctx.stroke(); ctx.restore();
    }
    const glow = ( hit, wallX, label ) => { const d = Math.abs( localT - hit ); if ( d < 0.3 ) { ctx.beginPath(); ctx.fillStyle = `rgba(179,58,58,${ 1 - d / 0.3 })`; ctx.arc( px( wallX ), railY - 43, 13, 0, TAU ); ctx.fill(); text( ctx, label, px( wallX ), railY - 91, COLORS.red, 'bold 10px sans-serif', 'center' ); } };
    glow( hitBack, carCenter - half, 'BACK arrival' ); glow( hitFront, carCenter + half, 'FRONT arrival' );
    ctx.beginPath(); ctx.fillStyle = COLORS.green; ctx.arc( px( observer ), railY + 4, 6, 0, TAU ); ctx.fill();
    text( ctx, frame === 'ground' ? 'ground observer' : 'ground moves left', px( observer ), railY + 48, COLORS.green, '10px sans-serif', 'center' );
    const status = localT < Math.min( hitBack, hitFront ) ? 'pulses are in flight' : frame === 'train' ? 'both walls are reached together' : localT < hitFront ? 'back wall reached first' : 'front wall reached later';
    text( ctx, `${ frame === 'train' ? 'TRAIN' : 'GROUND' } FRAME: ${ status }`, w / 2, 18, frame === 'train' ? COLORS.blue : COLORS.green, 'bold 12px sans-serif', 'center' );
  } };
}

function huygensScene() {
  let aperture = 5;
  rangeControl( 'Aperture a/λ:', 1, 10, 5, 0.5, value => { aperture = value; } );
  return { speed: 0.55, draw( ctx, t, w, h ) {
    const gateX = w * 0.34, center = h * 0.48, gap = mix( 32, h * 0.68, ( aperture - 1 ) / 9 );
    const phase = ( t % 2.5 ) / 2.5, radius = phase * w * 0.34;
    ctx.fillStyle = '#e8ecef'; ctx.fillRect( gateX - 6, 10, 12, center - gap / 2 - 10 ); ctx.fillRect( gateX - 6, center + gap / 2, 12, h - center - gap / 2 - 12 );
    for ( let k = 0; k < 4; k++ ) line( ctx, gateX - 38 - k * 34 + phase * 34, center - gap / 2, gateX - 38 - k * 34 + phase * 34, center + gap / 2, COLORS.blue, 1.4, [ 4, 3 ] );
    const count = Math.max( 1, Math.round( aperture * 1.5 ) );
    for ( let i = 0; i < count; i++ ) {
      const y = count === 1 ? center : center - gap / 2 + gap * i / ( count - 1 );
      ctx.save(); ctx.beginPath(); ctx.rect( gateX, 0, w - gateX, h ); ctx.clip(); ctx.strokeStyle = rgba( COLORS.blue, 0.22 ); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc( gateX, y, radius, -Math.PI / 2, Math.PI / 2 ); ctx.stroke(); ctx.restore();
      ctx.beginPath(); ctx.fillStyle = COLORS.red; ctx.arc( gateX, y, 2.2, 0, TAU ); ctx.fill();
    }
    const spread = clamp( 2.3 / aperture, 0.14, 1.15 );
    ctx.save(); ctx.strokeStyle = COLORS.orange; ctx.lineWidth = 2.5; ctx.beginPath();
    for ( let i = 0; i <= 60; i++ ) { const q = i / 60; const angle = mix( -spread, spread, q ); const x = gateX + radius * Math.cos( angle ); const y = center + radius * Math.sin( angle ); if ( i === 0 ) ctx.moveTo( x, y ); else ctx.lineTo( x, y ); } ctx.stroke(); ctx.restore();
    line( ctx, gateX, center, w - 15, center, COLORS.gray, 1, [ 5, 5 ] );
    text( ctx, 'incident wavefronts', 12, 18, COLORS.blue, '11px sans-serif' );
    text( ctx, 'secondary wavelets', gateX + 12, 18, COLORS.red, '11px sans-serif' );
    text( ctx, 'next wavefront = envelope', w - 12, 34, COLORS.orange, 'bold 11px sans-serif', 'right' );
    text( ctx, aperture > 5 ? 'a ≫ λ: nearly ray-like' : aperture < 2.5 ? 'a ≈ λ: strong diffraction' : 'edge wavelets spread into the shadow', w / 2, h - 8, COLORS.gray, 'bold 11px sans-serif', 'center' );
  } };
}

function phasorScene() {
  let phi = 60; const N = 6;
  rangeControl( 'Phase φ:', 0, 360, 60, 5, value => { phi = value; } );
  return { speed: 0.8, draw( ctx, t, w, h ) {
    const leftW = w * 0.54, unit = Math.min( 42, leftW / 8 ); const base = 0.35 * t; const rel = phi * Math.PI / 180;
    const shown = Math.min( N, Math.floor( ( t % 7 ) / 0.85 ) + 1 ); let x = leftW * 0.18, y = h * 0.62; const start = [ x, y ];
    text( ctx, `adding phasor ${ shown } of ${ N }`, 10, 17, COLORS.blue, 'bold 11px sans-serif' );
    for ( let i = 0; i < shown; i++ ) { const a = base + i * rel; const nx = x + unit * Math.cos( a ), ny = y - unit * Math.sin( a ); arrow( ctx, x, y, nx, ny, COLORS.blue, 2 ); x = nx; y = ny; }
    arrow( ctx, start[ 0 ], start[ 1 ], x, y, COLORS.red, 2.8 );
    const amp = Math.hypot( x - start[ 0 ], y - start[ 1 ] ) / unit; const intensity = amp * amp;
    text( ctx, `resultant E = ${ amp.toFixed( 2 ) } E₀`, 10, h - 30, COLORS.red, 'bold 11px sans-serif' );
    text( ctx, `intensity I = ${ intensity.toFixed( 1 ) } I₁`, 10, h - 14, COLORS.red, '11px sans-serif' );
    ctx.save(); ctx.translate( leftW, 0 ); const xs = linspace( 0, TAU, 360 );
    const ys = xs.map( p => { const d = Math.sin( p / 2 ); return d === 0 ? 1 : ( Math.sin( N * p / 2 ) / ( N * d ) ) ** 2; } );
    const mapper = makeMapper( { width: w - leftW, height: h, xMin: 0, xMax: TAU, yMin: 0, yMax: 1.12, margin: 28 } );
    drawAxes( ctx, mapper, 0, TAU, 0, 1.05, 'relative phase φ (0 → 2π)', 'I / N²I₁' ); plotCurve( ctx, mapper, xs, ys, { color: COLORS.green, lineWidth: 2.2 } );
    const p = rel; const d = Math.sin( p / 2 ); const normI = d === 0 ? 1 : ( Math.sin( N * p / 2 ) / ( N * d ) ) ** 2;
    plotPoint( ctx, mapper, p, normI, { color: COLORS.red, radius: 5 } ); ctx.restore();
  } };
}

function phasorArcScene() {
  return { speed: 0.55, draw( ctx, t, w, h ) {
    const beta = TAU * pingPong( t, 8 ); const N = 26; const seg = Math.min( 13, w * 0.018 ); const origin = [ w * 0.08, h * 0.62 ]; let x = origin[ 0 ], y = origin[ 1 ]; const points = [ [ x, y ] ];
    for ( let i = 0; i < N; i++ ) { const a = -beta / 2 + beta * i / Math.max( 1, N - 1 ); x += seg * Math.cos( a ); y -= seg * Math.sin( a ); points.push( [ x, y ] ); }
    polyline( ctx, points, COLORS.blue, 2 ); for ( let i = 1; i < points.length; i += 3 ) arrow( ctx, ...points[ i - 1 ], ...points[ i ], COLORS.blue, 1 );
    arrow( ctx, ...origin, x, y, COLORS.red, 2.8 );
    const sinc = beta < 1e-6 ? 1 : Math.sin( beta / 2 ) / ( beta / 2 );
    text( ctx, `β = ${ ( beta / Math.PI ).toFixed( 2 ) }π`, 10, 18, COLORS.blue, 'bold 12px sans-serif' );
    text( ctx, `E/E₀ = |sinc(β/2)| = ${ Math.abs( sinc ).toFixed( 2 ) }`, 10, 36, COLORS.red, 'bold 11px sans-serif' );
    const barX = w * 0.68, barY = h * 0.42, barW = w * 0.25; text( ctx, 'resultant amplitude', barX, barY - 13, COLORS.gray, '11px sans-serif' );
    ctx.fillStyle = '#e8ecef'; ctx.fillRect( barX, barY, barW, 18 ); ctx.fillStyle = COLORS.red; ctx.fillRect( barX, barY, barW * Math.abs( sinc ), 18 );
    text( ctx, beta < 0.35 ? 'straight chain: central maximum' : beta > 6.05 ? 'closed circle: first minimum' : 'chain curls; its chord shrinks', w / 2, h - 10, COLORS.gray, 'bold 11px sans-serif', 'center' );
  } };
}

function wavelengthRgb( wavelength ) {
  if ( wavelength < 500 ) return [ 55, 90, 255 ]; if ( wavelength < 590 ) return [ 40, 205, 90 ]; return [ 255, 65, 45 ];
}
function thinFilmScene() {
  const wavelengths = [ 450, 540, 650 ]; const colors = [ '#315efb', '#24a148', '#d9342b' ]; const n = 1.33;
  return { speed: 0.42, draw( ctx, time, w, h ) {
    const cycle = ( time % 12 ) / 12; const thickness = 320 * ( 1 - cycle ); const leftW = w * 0.55; const top = h * 0.43; const filmPx = 12 + thickness / 9;
    const intensities = wavelengths.map( lambda => Math.sin( TAU * n * thickness / lambda ) ** 2 );
    const rgb = intensities.reduce( ( acc, value, i ) => { const c = wavelengthRgb( wavelengths[ i ] ); return acc.map( ( v, j ) => v + value * c[ j ] ); }, [ 0, 0, 0 ] ).map( v => Math.min( 255, Math.round( v / 1.4 ) ) );
    ctx.fillStyle = `rgb(${ rgb.join( ',' ) })`; ctx.globalAlpha = 0.28; ctx.fillRect( 18, top, leftW - 35, filmPx ); ctx.globalAlpha = 1; line( ctx, 18, top, leftW - 17, top, COLORS.blue, 2 ); line( ctx, 18, top + filmPx, leftW - 17, top + filmPx, COLORS.blue, 2 );
    const p0 = [ leftW * 0.16, 12 ], p1 = [ leftW * 0.35, top ], p2 = [ leftW * 0.55, top + filmPx ], p3 = [ leftW * 0.75, top ], p4 = [ leftW * 0.92, 15 ];
    const r1 = [ p0, p1, [ leftW * 0.58, 12 ] ]; const r2 = [ p0, p1, p2, p3, p4 ]; const trace = clamp( ( time % 3.4 ) / 3.0 );
    polyline( ctx, r1, COLORS.red, 2.4, trace ); polyline( ctx, r2, COLORS.orange, 2.4, trace );
    text( ctx, 'ray 1: reflection adds π', leftW * 0.32, 17, COLORS.red, '10px sans-serif' ); text( ctx, 'ray 2: extra path 2nt', leftW * 0.48, top + filmPx + 17, COLORS.orange, '10px sans-serif' );
    text( ctx, `film drains: t = ${ thickness.toFixed( 0 ) } nm`, 10, h - 12, COLORS.blue, 'bold 11px sans-serif' );
    ctx.save(); ctx.translate( leftW, 0 ); const panelW = w - leftW; const mapper = makeMapper( { width: panelW, height: h * 0.72, xMin: 0, xMax: 320, yMin: 0, yMax: 1.12, margin: 25 } );
    drawAxes( ctx, mapper, 0, 320, 0, 1.05, 'film thickness (nm)', 'reflectance' ); const xs = linspace( 0, 320, 240 );
    wavelengths.forEach( ( lambda, i ) => plotCurve( ctx, mapper, xs, xs.map( value => Math.sin( TAU * n * value / lambda ) ** 2 ), { color: colors[ i ], lineWidth: 1.8 } ) );
    intensities.forEach( ( value, i ) => plotPoint( ctx, mapper, thickness, value, { color: colors[ i ], radius: 4 } ) );
    const swatchX = 25, swatchY = h * 0.77; ctx.fillStyle = `rgb(${ rgb.join( ',' ) })`; ctx.fillRect( swatchX, swatchY, panelW - 50, 27 ); ctx.strokeStyle = COLORS.gray; ctx.strokeRect( swatchX, swatchY, panelW - 50, 27 );
    text( ctx, thickness < 20 ? 'all wavelengths cancel → black film' : 'predicted reflected color', panelW / 2, swatchY + 44, COLORS.gray, 'bold 10px sans-serif', 'center' ); ctx.restore();
  } };
}

function michelsonScene() {
  return { speed: 0.5, draw( ctx, t, w, h ) {
    const center = [ w * 0.42, h * 0.58 ], source = [ w * 0.08, center[ 1 ] ], mirrorX = [ w * 0.78, center[ 1 ] ], baseY = h * 0.16;
    const fringes = ( t % 10 ) * 0.65; const mirrorY = baseY - 10 * ( fringes / 6.5 ); const detector = [ center[ 0 ], h * 0.9 ];
    line( ctx, center[ 0 ] - 18, center[ 1 ] + 18, center[ 0 ] + 18, center[ 1 ] - 18, '#99aabb', 5 );
    line( ctx, mirrorX[ 0 ], mirrorX[ 1 ] - 24, mirrorX[ 0 ], mirrorX[ 1 ] + 24, COLORS.gray, 5 ); line( ctx, center[ 0 ] - 24, mirrorY, center[ 0 ] + 24, mirrorY, COLORS.gray, 5 );
    const armA = [ source, center, mirrorX, center, detector ]; const armB = [ source, center, [ center[ 0 ], mirrorY ], center, detector ]; const pulse = ( t % 3.5 ) / 3.1;
    polyline( ctx, armA, rgba( COLORS.red, 0.18 ), 1.2, 1, [ 4, 4 ] ); polyline( ctx, armB, rgba( COLORS.blue, 0.18 ), 1.2, 1, [ 4, 4 ] );
    polyline( ctx, armA, COLORS.red, 2.2, pulse ); polyline( ctx, armB, COLORS.blue, 2.2, pulse );
    text( ctx, 'source', source[ 0 ], source[ 1 ] - 12, COLORS.orange, '10px sans-serif', 'center' ); text( ctx, 'beam splitter', center[ 0 ] + 22, center[ 1 ] + 20, COLORS.gray, '10px sans-serif' );
    text( ctx, 'movable mirror', center[ 0 ], mirrorY - 10, COLORS.blue, '10px sans-serif', 'center' ); text( ctx, 'fixed mirror', mirrorX[ 0 ], mirrorX[ 1 ] - 34, COLORS.red, '10px sans-serif', 'center' );
    const radius = 35; ctx.save(); ctx.translate( w * 0.88, h * 0.25 ); for ( let i = 0; i < 5; i++ ) { ctx.beginPath(); ctx.strokeStyle = i % 2 ? COLORS.gray : COLORS.blue; ctx.globalAlpha = 0.55; ctx.arc( 0, 0, ( ( i * 11 + fringes * 11 ) % 55 ), 0, TAU ); ctx.stroke(); } ctx.restore();
    text( ctx, 'detector fringes', w * 0.88, h * 0.25 + radius + 31, COLORS.gray, '10px sans-serif', 'center' );
    text( ctx, `mirror shift δ = ${ ( fringes / 2 ).toFixed( 2 ) } λ`, 10, 18, COLORS.blue, 'bold 11px sans-serif' ); text( ctx, `${ Math.floor( fringes ) } fringe${ Math.floor( fringes ) === 1 ? '' : 's' } swept past`, 10, 35, COLORS.red, 'bold 11px sans-serif' );
  } };
}

function gratingScene() {
  return { speed: 0.33, draw( ctx, t, w, h ) {
    const N = Math.round( mix( 250, 3000, pingPong( t, 12 ) ) ); const xs = linspace( 587.8, 590.8, 600 );
    const sinc2 = ( x, lambda ) => { const z = Math.PI * ( x - lambda ) / ( lambda / N ); return Math.abs( z ) < 1e-8 ? 1 : ( Math.sin( z ) / z ) ** 2; };
    const y1 = xs.map( x => sinc2( x, 589.0 ) ); const y2 = xs.map( x => sinc2( x, 589.6 ) ); const sum = y1.map( ( y, i ) => y + y2[ i ] );
    const mapper = makeMapper( { width: w, height: h, xMin: 587.8, xMax: 590.8, yMin: 0, yMax: 2.15, margin: 34 } ); drawAxes( ctx, mapper, 587.8, 590.8, 0, 2.05, 'wavelength (nm)', 'intensity' );
    plotCurve( ctx, mapper, xs, y1, { color: rgba( COLORS.orange, 0.42 ), lineWidth: 1.2 } ); plotCurve( ctx, mapper, xs, y2, { color: rgba( COLORS.red, 0.42 ), lineWidth: 1.2 } ); plotCurve( ctx, mapper, xs, sum, { color: COLORS.orange, lineWidth: 2.5 } );
    const state = N < 800 ? 'unresolved: one blur' : N < 1200 ? 'Rayleigh threshold: just resolved' : 'resolved: two distinct peaks';
    text( ctx, `illuminated lines N = ${ N }`, w / 2, 18, COLORS.blue, 'bold 12px sans-serif', 'center' ); text( ctx, `R = N; ${ state }`, w / 2, 35, N < 800 ? COLORS.red : COLORS.green, 'bold 11px sans-serif', 'center' );
    line( ctx, mapper.x( 589.0 ), mapper.y( 0 ), mapper.x( 589.0 ), mapper.y( 1 ), COLORS.light, 1, [ 3, 3 ] ); line( ctx, mapper.x( 589.6 ), mapper.y( 0 ), mapper.x( 589.6 ), mapper.y( 1 ), COLORS.light, 1, [ 3, 3 ] );
  } };
}

function hydrogenScene() {
  const transitions = [ [ 2, 1, 'Lyman', '#6a4c93' ], [ 3, 1, 'Lyman', '#6a4c93' ], [ 3, 2, 'Balmer', '#2e7d5b' ], [ 4, 2, 'Balmer', '#2e7d5b' ], [ 4, 3, 'Paschen', '#b33a3a' ], [ 5, 3, 'Paschen', '#b33a3a' ] ];
  return { speed: 0.55, draw( ctx, t, w, h ) {
    const duration = 2.5, step = Math.floor( t / duration ) % transitions.length, p = ( t % duration ) / duration; const [ ni, nf, series, color ] = transitions[ step ];
    const leftW = w * 0.58, top = 28, bottom = h - 25; const levelY = n => bottom - ( 1 - 1 / n ) * ( bottom - top );
    for ( let n = 1; n <= 5; n++ ) { const y = levelY( n ); line( ctx, 38, y, leftW - 28, y, n === ni || n === nf ? color : COLORS.light, n === ni || n === nf ? 2.5 : 1.4 ); text( ctx, `n=${ n }  ${ ( -13.6 / n ** 2 ).toFixed( 2 ) } eV`, 5, y + 4, COLORS.gray, '10px sans-serif' ); }
    const x = leftW * 0.72, y0 = levelY( ni ), y1 = levelY( nf ); arrow( ctx, x, y0, x, mix( y0, y1, clamp( p * 1.5 ) ), color, 2.8 );
    const energy = 13.6 * ( 1 / nf ** 2 - 1 / ni ** 2 ), wavelength = 1240 / energy; const photonP = clamp( ( p - 0.55 ) / 0.4 );
    if ( photonP > 0 ) { const sx = x + 12, ex = mix( sx, leftW - 2, photonP ); ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath(); for ( let xx = sx; xx <= ex; xx += 3 ) { const yy = y1 + 5 * Math.sin( ( xx - sx ) * 0.35 ); if ( xx === sx ) ctx.moveTo( xx, yy ); else ctx.lineTo( xx, yy ); } ctx.stroke(); ctx.restore(); }
    text( ctx, `${ series }: ${ ni } → ${ nf }`, leftW * 0.72, 17, color, 'bold 12px sans-serif', 'center' ); text( ctx, `photon λ = ${ wavelength.toFixed( 0 ) } nm (${ series === 'Lyman' ? 'UV' : series === 'Balmer' ? 'visible' : 'IR' })`, leftW + 8, 20, color, 'bold 11px sans-serif' );
    const panelX = leftW + 16, panelW = w - panelX - 12; const bands = [ [ 'Lyman', 0.18, '#6a4c93' ], [ 'Balmer', 0.5, '#2e7d5b' ], [ 'Paschen', 0.82, '#b33a3a' ] ];
    for ( const [ name, frac, c ] of bands ) { const y = h * frac; text( ctx, name, panelX, y - 8, c, 'bold 10px sans-serif' ); line( ctx, panelX, y, panelX + panelW, y, COLORS.light, 1 ); if ( name === series ) { ctx.fillStyle = rgba( c, 0.18 ); ctx.fillRect( panelX, y - 20, panelW, 30 ); for ( let i = 0; i < 5; i++ ) line( ctx, panelX + panelW * ( 0.2 + 0.14 * i ), y - 18, panelX + panelW * ( 0.2 + 0.14 * i ), y + 8, c, i === ni - nf - 1 ? 4 : 1.2 ); } }
  } };
}

function rovibrationalScene() {
  const lines = [ [ 'P', 1, -2 ], [ 'R', 0, 2 ], [ 'P', 2, -4 ], [ 'R', 1, 4 ], [ 'P', 3, -6 ], [ 'R', 2, 6 ], [ 'P', 4, -8 ], [ 'R', 3, 8 ], [ 'P', 5, -10 ], [ 'R', 4, 10 ] ];
  return { speed: 0.65, draw( ctx, t, w, h ) {
    const stepDuration = 1.15, shown = Math.floor( t / stepDuration ) % ( lines.length + 2 ); const p = ( t % stepDuration ) / stepDuration; const leftW = w * 0.28, levelsW = w * 0.29;
    const angle = t * 1.3, bond = 42 + 8 * Math.sin( t * 5.2 ), cx = leftW / 2, cy = h * 0.46; const dx = Math.cos( angle ) * bond / 2, dy = Math.sin( angle ) * bond / 2;
    line( ctx, cx - dx, cy - dy, cx + dx, cy + dy, COLORS.gray, 5 ); for ( const [ x, y, r, c ] of [ [ cx - dx, cy - dy, 13, COLORS.blue ], [ cx + dx, cy + dy, 17, COLORS.red ] ] ) { ctx.beginPath(); ctx.fillStyle = c; ctx.arc( x, y, r, 0, TAU ); ctx.fill(); }
    text( ctx, 'molecule rotates and vibrates', cx, 18, COLORS.gray, 'bold 10px sans-serif', 'center' ); text( ctx, 'bond stretch', cx, h - 14, COLORS.blue, '10px sans-serif', 'center' );
    ctx.save(); ctx.translate( leftW, 0 ); const x0 = 24, x1 = levelsW - 18; for ( let v = 0; v <= 1; v++ ) for ( let j = 0; j <= 5; j++ ) { const y = h - 30 - v * h * 0.43 - j * 8; line( ctx, x0, y, x1, y, v ? COLORS.red : COLORS.blue, 1 ); if ( j === 0 ) text( ctx, `v=${ v }`, x0, y - 5, v ? COLORS.red : COLORS.blue, 'bold 10px sans-serif' ); }
    if ( shown > 0 && shown <= lines.length ) { const [ branch, j ] = lines[ shown - 1 ]; const jp = branch === 'R' ? j + 1 : j - 1; const y0 = h - 30 - j * 8, y1 = h - 30 - h * 0.43 - jp * 8; arrow( ctx, levelsW * 0.62, y0, levelsW * 0.62, mix( y0, y1, p ), branch === 'R' ? COLORS.red : COLORS.blue, 2.4 ); text( ctx, `${ branch }: J=${ j }→${ jp }`, levelsW / 2, 18, branch === 'R' ? COLORS.red : COLORS.blue, 'bold 11px sans-serif', 'center' ); } ctx.restore();
    const plotX = leftW + levelsW, plotW = w - plotX; const origin = plotX + plotW / 2; line( ctx, plotX + 10, h - 28, w - 12, h - 28, COLORS.gray, 1.2 ); line( ctx, origin, 32, origin, h - 25, COLORS.gray, 1, [ 4, 3 ] ); text( ctx, 'P branch', origin - 55, 18, COLORS.blue, 'bold 11px sans-serif', 'center' ); text( ctx, 'R branch', origin + 55, 18, COLORS.red, 'bold 11px sans-serif', 'center' ); text( ctx, 'forbidden Q branch', origin, h - 8, COLORS.gray, '10px sans-serif', 'center' );
    const count = Math.min( shown, lines.length ); for ( let i = 0; i < count; i++ ) { const [ branch, j, offset ] = lines[ i ]; const population = Math.exp( -0.18 * j * ( j + 1 ) ) * ( 2 * j + 1 ); const height = 30 + 35 * Math.min( 1, population / 2.5 ); const x = origin + offset * plotW / 25; line( ctx, x, h - 28, x, h - 28 - height, branch === 'R' ? COLORS.red : COLORS.blue, i === count - 1 ? 3.5 : 2 ); }
  } };
}

function wavy( ctx, x0, y0, x1, y1, color, progress ) {
  const p = clamp( progress ), dx = x1 - x0, dy = y1 - y0, length = Math.hypot( dx, dy ), nx = -dy / length, ny = dx / length; ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
  for ( let i = 0; i <= 60 * p; i++ ) { const q = i / 60, x = x0 + dx * q + nx * 4 * Math.sin( q * 12 * Math.PI ), y = y0 + dy * q + ny * 4 * Math.sin( q * 12 * Math.PI ); if ( i === 0 ) ctx.moveTo( x, y ); else ctx.lineTo( x, y ); } ctx.stroke(); ctx.restore();
}
function feynmanScene() {
  return { speed: 0.48, draw( ctx, t, w, h ) {
    const phase = t % 10;
    // Reveal for 0.8 s, then hold for 1.2 s at each of four vertices so the
    // local conservation statement can actually be read before proceeding.
    const stage = Math.min( 4, Math.floor( phase / 2 ) );
    const reveal = Math.min( 1, stage * 0.25 + clamp( ( phase % 2 ) / 0.8 ) * 0.25 );
    const mid = w / 2; text( ctx, 'DIAGRAMMATIC BOOKKEEPING — not a literal movie of trajectories', w / 2, 16, COLORS.red, 'bold 11px sans-serif', 'center' );
    line( ctx, 22, h - 22, 22, 36, COLORS.gray, 1.5 ); arrow( ctx, 22, h - 22, 22, 34, COLORS.gray, 1.5 ); text( ctx, 'time', 28, 40, COLORS.gray, '10px sans-serif' ); line( ctx, mid, 26, mid, h - 12, COLORS.light, 1 );
    const yBottom = h - 28, yV1 = h * 0.61, yV2 = h * 0.36, yTop = 38;
    const l = [ [ 65, yBottom ], [ mid * 0.39, yV1 ], [ 65, yTop ] ], r = [ [ mid - 38, yBottom ], [ mid * 0.67, yV2 ], [ mid - 38, yTop ] ];
    polyline( ctx, l, COLORS.blue, 2.2, reveal * 1.25 ); polyline( ctx, r, COLORS.blue, 2.2, reveal * 1.25 ); wavy( ctx, l[ 1 ][ 0 ], l[ 1 ][ 1 ], r[ 1 ][ 0 ], r[ 1 ][ 1 ], COLORS.orange, clamp( ( reveal - 0.25 ) / 0.35 ) );
    text( ctx, 'e⁻', 57, yBottom - 5, COLORS.blue, '11px sans-serif' ); text( ctx, 'e⁻', mid - 31, yBottom - 5, COLORS.blue, '11px sans-serif' ); text( ctx, 'virtual γ', mid * 0.52, h * 0.48, COLORS.orange, '10px sans-serif', 'center' ); text( ctx, 'electron scattering', mid / 2, h - 8, COLORS.gray, 'bold 10px sans-serif', 'center' );
    const bx = mid + 40, vertex1 = [ mid + 135, yV1 ], vertex2 = [ mid + 225, yV2 ]; polyline( ctx, [ [ bx, yBottom ], vertex1, [ mid + 95, yTop ] ], COLORS.green, 2.2, reveal * 1.25 ); wavy( ctx, ...vertex1, ...vertex2, COLORS.orange, clamp( ( reveal - 0.25 ) / 0.35 ) ); polyline( ctx, [ vertex2, [ w - 48, yTop ] ], COLORS.red, 2.2, clamp( ( reveal - 0.55 ) / 0.35 ) ); polyline( ctx, [ vertex2, [ mid + 180, yTop ] ], COLORS.purple, 2.2, clamp( ( reveal - 0.55 ) / 0.35 ) );
    text( ctx, 'n', bx - 7, yBottom - 5, COLORS.green, '11px sans-serif' ); text( ctx, 'p', mid + 87, yTop + 10, COLORS.green, '11px sans-serif' ); text( ctx, 'W⁻', mid + 176, h * 0.48, COLORS.orange, '10px sans-serif' ); text( ctx, 'e⁻', w - 44, yTop + 8, COLORS.red, '11px sans-serif' ); text( ctx, 'ν̄ₑ', mid + 167, yTop + 8, COLORS.purple, '11px sans-serif' ); text( ctx, 'beta decay', mid + ( w - mid ) / 2, h - 8, COLORS.gray, 'bold 10px sans-serif', 'center' );
    const checks = [ [ 0.18, 'vertex 1: e⁻ → e⁻ + γ   charge −1 = −1 + 0' ], [ 0.43, 'vertex 2: e⁻ + γ → e⁻   charge −1 + 0 = −1' ], [ 0.64, 'vertex 3: n → p + W⁻   charge 0 = +1 − 1' ], [ 0.82, 'vertex 4: W⁻ → e⁻ + ν̄ₑ   charge −1 = −1 + 0' ] ];
    let message = 'follow the diagram upward in time'; for ( const [ threshold, value ] of checks ) if ( reveal >= threshold ) message = value; text( ctx, message, w / 2, 32, COLORS.green, 'bold 10px sans-serif', 'center' );
  } };
}

const scenes = {
  simultaneity: simultaneityScene,
  huygens: huygensScene,
  phasors: phasorScene,
  'phasor-arc': phasorArcScene,
  'thin-film': thinFilmScene,
  michelson: michelsonScene,
  grating: gratingScene,
  hydrogen: hydrogenScene,
  rovibrational: rovibrationalScene,
  feynman: feynmanScene
};

const factory = scenes[ document.body.dataset.scene ];
if ( !factory ) throw new Error( `Unknown animation scene: ${ document.body.dataset.scene }` );
const scene = factory();
if ( note && scene.note ) note.textContent = scene.note;
startLoop( { canvas, controls, draw: scene.draw, speed: scene.speed ?? 1 } );
