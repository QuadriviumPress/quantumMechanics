/** Interactive scenes for the textbook's ten priority animated figures. */
import { startLoop, makeMapper, plotCurve, plotPoint, fillBetween, COLORS, linspace } from './animlib.js';

const canvas = document.getElementById( 'canvas' );
const controls = document.getElementById( 'controls' );
const note = document.getElementById( 'note' );
const TAU = 2 * Math.PI;

function clamp( value, min = 0, max = 1 ) { return Math.max( min, Math.min( max, value ) ); }
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
function polyline( ctx, points, color, width = 2, progress = 1 ) {
  if ( points.length < 2 || progress <= 0 ) return;
  const lengths = points.slice( 1 ).map( ( point, i ) => Math.hypot( point[ 0 ] - points[ i ][ 0 ], point[ 1 ] - points[ i ][ 1 ] ) );
  const target = lengths.reduce( ( a, b ) => a + b, 0 ) * clamp( progress );
  let used = 0;
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo( ...points[ 0 ] );
  for ( let i = 0; i < lengths.length; i++ ) {
    if ( used + lengths[ i ] <= target ) { ctx.lineTo( ...points[ i + 1 ] ); used += lengths[ i ]; continue; }
    const p = clamp( ( target - used ) / lengths[ i ] );
    ctx.lineTo( points[ i ][ 0 ] + ( points[ i + 1 ][ 0 ] - points[ i ][ 0 ] ) * p, points[ i ][ 1 ] + ( points[ i + 1 ][ 1 ] - points[ i ][ 1 ] ) * p ); break;
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
function blochOutline( ctx, cx, cy, R, tilt, latitudeSin = 1 ) {
  ctx.save(); ctx.strokeStyle = COLORS.light; ctx.lineWidth = 1.3;
  ctx.beginPath(); ctx.ellipse( cx, cy, R, R, 0, 0, TAU ); ctx.stroke();
  ctx.beginPath(); ctx.ellipse( cx, cy, R * latitudeSin, R * tilt * latitudeSin, 0, 0, TAU ); ctx.stroke();
  line( ctx, cx, cy - R * 1.15, cx, cy + R * 1.15, COLORS.gray, 1.2 );
  ctx.restore();
}

// ch04: a Bloch vector precessing at fixed rate around a z-directed field,
// beside the resulting x-basis probability oscillation.
function larmorScene() {
  const omega = 1.1;
  return { speed: 1, draw( ctx, t, w, h ) {
    const leftW = w * 0.46, cx = leftW / 2, cy = h * 0.52, R = Math.min( leftW, h ) * 0.34, tilt = 0.34, theta = omega * t;
    blochOutline( ctx, cx, cy, R, tilt );
    text( ctx, 'B, z', cx + 8, cy - R * 1.2, COLORS.gray, '11px sans-serif' );
    arrow( ctx, cx, cy, cx + R * Math.cos( theta ), cy + R * tilt * Math.sin( theta ), COLORS.blue, 2.6 );
    text( ctx, 'Bloch vector precesses on the equator', cx, cy + R * 1.5, COLORS.blue, 'bold 11px sans-serif', 'center' );
    const px0 = leftW + 14, panelW = w - px0 - 10;
    const mapper = makeMapper( { width: panelW, height: h, xMin: 0, xMax: TAU, yMin: 0, yMax: 1.08, margin: 26 } );
    ctx.save(); ctx.translate( px0, 0 );
    drawAxes( ctx, mapper, 0, TAU, 0, 1, 'ω₀t (one period)', 'probability' );
    const xs = linspace( 0, TAU, 200 );
    plotCurve( ctx, mapper, xs, xs.map( () => 0.5 ), { color: COLORS.gray, dash: [ 4, 3 ], lineWidth: 1.2 } );
    plotCurve( ctx, mapper, xs, xs.map( x => Math.cos( x / 2 ) ** 2 ), { color: COLORS.blue, lineWidth: 2.2 } );
    plotCurve( ctx, mapper, xs, xs.map( x => Math.sin( x / 2 ) ** 2 ), { color: COLORS.red, lineWidth: 2.2 } );
    const phase = theta % TAU;
    plotPoint( ctx, mapper, phase, Math.cos( phase / 2 ) ** 2, { color: COLORS.blue, radius: 5 } );
    plotPoint( ctx, mapper, phase, Math.sin( phase / 2 ) ** 2, { color: COLORS.red, radius: 5 } );
    text( ctx, 'P(x+)', panelW - 6, mapper.y( 0.92 ), COLORS.blue, 'bold 10px sans-serif', 'right' );
    text( ctx, 'P(x-)', panelW - 6, mapper.y( 0.08 ) + 4, COLORS.red, 'bold 10px sans-serif', 'right' );
    text( ctx, 'P(z±) = 1/2 always', panelW / 2, mapper.y( 0.5 ) - 8, COLORS.gray, '10px sans-serif', 'center' );
    ctx.restore();
  } };
}

// ch07: a traveling wave decaying across a barrier of adjustable width, with
// the resulting transmission plotted against width on a log scale.
function tunnelingScene() {
  let L = 1.4;
  rangeControl( 'Barrier width L:', 0.4, 3, 1.4, 0.1, v => { L = v; } );
  const kappa = 1.1, k = 5;
  return { speed: 1, draw( ctx, t, w, h ) {
    const T = Math.exp( -2 * kappa * L ), topH = h * 0.62;
    const mapper = makeMapper( { width: w, height: topH, xMin: -5, xMax: 7, yMin: -1.2, yMax: 1.2, margin: 26 } );
    ctx.save(); ctx.fillStyle = rgba( COLORS.gray, 0.14 ); ctx.fillRect( mapper.x( 0 ), 6, mapper.x( L ) - mapper.x( 0 ), topH - 30 ); ctx.restore();
    text( ctx, 'barrier', ( mapper.x( 0 ) + mapper.x( L ) ) / 2, 18, COLORS.gray, '10px sans-serif', 'center' );
    drawAxes( ctx, mapper, -5, 7, -1.1, 1.1, 'position', '' );
    const amp = x => x < 0 ? 1 : x <= L ? Math.exp( -kappa * x ) : Math.sqrt( T );
    const xs = linspace( -5, 7, 400 ), env = xs.map( amp ), ys = xs.map( x => amp( x ) * Math.cos( k * x - 2.4 * t ) );
    plotCurve( ctx, mapper, xs, env, { color: rgba( COLORS.orange, 0.55 ), lineWidth: 1.2, dash: [ 3, 3 ] } );
    plotCurve( ctx, mapper, xs, env.map( v => -v ), { color: rgba( COLORS.orange, 0.55 ), lineWidth: 1.2, dash: [ 3, 3 ] } );
    plotCurve( ctx, mapper, xs, ys, { color: COLORS.blue, lineWidth: 2 } );
    text( ctx, `T = e^(-2κL) = ${ T.toExponential( 2 ) }`, 10, 18, COLORS.red, 'bold 12px sans-serif' );
    ctx.save(); ctx.translate( 0, topH + 6 );
    const mapper2 = makeMapper( { width: w, height: h - topH - 10, xMin: 0.4, xMax: 3, yMin: -8, yMax: 0, margin: 24 } );
    drawAxes( ctx, mapper2, 0.4, 3, -7.6, 0, 'barrier width L', 'ln T' );
    const Ls = linspace( 0.4, 3, 100 );
    plotCurve( ctx, mapper2, Ls, Ls.map( l => -2 * kappa * l ), { color: COLORS.green, lineWidth: 2 } );
    plotPoint( ctx, mapper2, L, -2 * kappa * L, { color: COLORS.red, radius: 5 } );
    ctx.restore();
  } };
}

// ch06: a free Gaussian packet drifting at constant velocity while its width
// grows, since its fixed momentum spread becomes a growing position spread.
function packetSpreadingScene() {
  const sigma0 = 0.5, v = 1.3, tau = 1.6;
  return { speed: 1, draw( ctx, time, w, h ) {
    const t = time % 8, sigma = sigma0 * Math.sqrt( 1 + ( t / tau ) ** 2 ), center = -4 + v * t, peak = sigma0 / sigma;
    const mapper = makeMapper( { width: w, height: h, xMin: -5, xMax: 9, yMin: 0, yMax: 1.05, margin: 30 } );
    drawAxes( ctx, mapper, -5, 9, 0, 1, 'position x', '|ψ(x,t)|²' );
    const xs = linspace( -5, 9, 300 ), ys = xs.map( x => peak * Math.exp( -( ( x - center ) ** 2 ) / ( 2 * sigma * sigma ) ) );
    fillBetween( ctx, mapper, xs, ys, xs.map( () => 0 ), { color: COLORS.blue, alpha: 0.16 } );
    plotCurve( ctx, mapper, xs, ys, { color: COLORS.blue, lineWidth: 2.4 } );
    plotPoint( ctx, mapper, center, peak, { color: COLORS.red, radius: 4 } );
    line( ctx, mapper.x( center ), mapper.y( 0 ), mapper.x( center ), mapper.y( peak ), COLORS.red, 1, [ 3, 3 ] );
    text( ctx, `⟨x⟩ moves at constant v; σ(t) = σ₀√(1+(t/τ)²) = ${ sigma.toFixed( 2 ) }`, 10, 18, COLORS.gray, 'bold 11px sans-serif' );
    text( ctx, 'fixed momentum spread Δp → growing position spread', w / 2, h - 8, COLORS.gray, '10px sans-serif', 'center' );
  } };
}

// ch12: a Bloch vector whose transverse component decays faster (T2) than
// its population relaxes toward equilibrium (T1).
function decoherenceScene() {
  const T1 = 3.2, T2 = 1.1, omega = 4;
  return { speed: 0.6, draw( ctx, time, w, h ) {
    const t = time % 9, z = 1 - Math.exp( -t / T1 ), r = Math.exp( -t / T2 ), phi = omega * t;
    const leftW = w * 0.5, cx = leftW / 2, cy = h * 0.54, R = Math.min( leftW, h ) * 0.36, tilt = 0.34;
    blochOutline( ctx, cx, cy, R, tilt );
    text( ctx, '|0⟩', cx + 6, cy - R * 1.05, COLORS.gray, '10px sans-serif' );
    text( ctx, '|1⟩', cx + 6, cy + R * 1.15, COLORS.gray, '10px sans-serif' );
    const x = r * Math.cos( phi ), y = r * Math.sin( phi );
    arrow( ctx, cx, cy, cx + R * x, cy - R * z - R * tilt * y, COLORS.purple, 2.6 );
    text( ctx, `T₂ = ${ T2 } ≪ T₁ = ${ T1 }: coherence dies first`, 10, h - 10, COLORS.purple, 'bold 11px sans-serif' );
    const px0 = leftW + 14, panelW = w - px0 - 10;
    const mapper = makeMapper( { width: panelW, height: h, xMin: 0, xMax: 9, yMin: 0, yMax: 1.05, margin: 26 } );
    ctx.save(); ctx.translate( px0, 0 );
    drawAxes( ctx, mapper, 0, 9, 0, 1, 'time', 'amplitude' );
    const ts = linspace( 0, 9, 200 );
    plotCurve( ctx, mapper, ts, ts.map( tt => Math.exp( -tt / T2 ) ), { color: COLORS.red, lineWidth: 2.2 } );
    plotCurve( ctx, mapper, ts, ts.map( tt => 1 - Math.exp( -tt / T1 ) ), { color: COLORS.blue, lineWidth: 2.2 } );
    plotPoint( ctx, mapper, t, r, { color: COLORS.red, radius: 5 } );
    plotPoint( ctx, mapper, t, z, { color: COLORS.blue, radius: 5 } );
    text( ctx, 'transverse coherence e^(-t/T₂)', panelW - 6, mapper.y( 0.95 ), COLORS.red, '10px sans-serif', 'right' );
    text( ctx, 'population relaxation 1-e^(-t/T₁)', panelW - 6, mapper.y( 0.15 ) + 12, COLORS.blue, '10px sans-serif', 'right' );
    ctx.restore();
  } };
}

// ch04: the four-stage Ramsey sequence (prepare, pulse, free evolution,
// pulse) sweeping accumulated phase to trace out the interference fringe.
function ramseyScene() {
  const cycle = 6, stages = [ 'prepare |z+⟩', 'π/2 pulse', 'free evolution (accumulate φ)', 'π/2 pulse', 'measure S_z' ];
  const bounds = [ 0, 0.9, 1.9, 4.4, 5.4, 6 ];
  return { speed: 1, draw( ctx, time, w, h ) {
    const pass = Math.floor( time / cycle ), phi = ( pass * Math.PI / 5 ) % TAU, local = time % cycle;
    let stage = 0; for ( let i = 0; i < bounds.length - 1; i++ ) if ( local >= bounds[ i ] ) stage = i;
    const topH = h * 0.42, x0 = 20, x1 = w - 20, axisY = topH * 0.7;
    line( ctx, x0, axisY, x1, axisY, COLORS.gray, 1.4 );
    for ( let i = 1; i < bounds.length - 1; i++ ) { const x = x0 + ( x1 - x0 ) * bounds[ i ] / cycle; line( ctx, x, axisY - 10, x, axisY + 10, COLORS.light, 1.2 ); }
    for ( let i = 0; i < stages.length; i++ ) {
      const xa = x0 + ( x1 - x0 ) * bounds[ i ] / cycle, xb = x0 + ( x1 - x0 ) * bounds[ i + 1 ] / cycle;
      text( ctx, stages[ i ], ( xa + xb ) / 2, axisY - 16, i === stage ? COLORS.blue : COLORS.gray, i === stage ? 'bold 10px sans-serif' : '10px sans-serif', 'center' );
    }
    line( ctx, x0 + ( x1 - x0 ) * local / cycle, axisY - 22, x0 + ( x1 - x0 ) * local / cycle, axisY + 22, COLORS.red, 2 );
    text( ctx, `accumulated phase this pass: φ = ${ phi.toFixed( 2 ) } rad`, w / 2, topH - 6, COLORS.blue, 'bold 11px sans-serif', 'center' );
    const mapper = makeMapper( { width: w, height: h - topH - 8, xMin: 0, xMax: TAU, yMin: 0, yMax: 1.05, margin: 28 } );
    ctx.save(); ctx.translate( 0, topH + 8 );
    drawAxes( ctx, mapper, 0, TAU, 0, 1, 'accumulated phase φ', 'P(z)' );
    const xs = linspace( 0, TAU, 200 );
    plotCurve( ctx, mapper, xs, xs.map( x => ( 1 + Math.sin( x ) ) / 2 ), { color: COLORS.blue, lineWidth: 2.2 } );
    plotCurve( ctx, mapper, xs, xs.map( x => ( 1 - Math.sin( x ) ) / 2 ), { color: COLORS.red, lineWidth: 2.2 } );
    if ( stage >= 3 ) plotPoint( ctx, mapper, phi, ( 1 + Math.sin( phi ) ) / 2, { color: COLORS.blue, radius: 5 } );
    text( ctx, 'P(z+)', w - 6, mapper.y( 0.95 ), COLORS.blue, 'bold 10px sans-serif', 'right' );
    text( ctx, 'P(z-)', w - 6, mapper.y( 0.05 ) + 4, COLORS.red, 'bold 10px sans-serif', 'right' );
    ctx.restore();
  } };
}

// ch01: two paths recombining coherently versus with a which-path record,
// toggled by the reader, ending in certainty versus a coin-flip probability.
function recombinationScene() {
  let recorded = false;
  selectControl( 'Path record:', [ [ 'off', 'No record (coherent)' ], [ 'on', 'Path recorded' ] ], 'off', v => { recorded = v === 'on'; } );
  return { speed: 0.6, draw( ctx, t, w, h ) {
    const phase = ( t % 4 ) / 4, splitX = w * 0.22, joinX = w * 0.7, yTop = h * 0.3, yBot = h * 0.7, yMid = h * 0.5;
    text( ctx, 'source', splitX - 40, yMid + 4, COLORS.gray, '10px sans-serif', 'right' );
    line( ctx, splitX - 35, yMid, splitX, yMid, COLORS.gray, 2 );
    const reveal = Math.min( 1, phase * 2 );
    polyline( ctx, [ [ splitX, yMid ], [ w * 0.46, yTop ], [ joinX, yMid ] ], COLORS.blue, 2.4, reveal );
    polyline( ctx, [ [ splitX, yMid ], [ w * 0.46, yBot ], [ joinX, yMid ] ], COLORS.red, 2.4, reveal );
    text( ctx, '+x path', w * 0.46, yTop - 10, COLORS.blue, '10px sans-serif', 'center' );
    text( ctx, '-x path', w * 0.46, yBot + 18, COLORS.red, '10px sans-serif', 'center' );
    if ( recorded ) {
      ctx.save(); ctx.fillStyle = COLORS.orange;
      ctx.beginPath(); ctx.arc( w * 0.46, yTop, 5, 0, TAU ); ctx.fill();
      ctx.beginPath(); ctx.arc( w * 0.46, yBot, 5, 0, TAU ); ctx.fill(); ctx.restore();
      text( ctx, 'which-path detectors click', w * 0.46, ( yTop + yBot ) / 2, COLORS.orange, 'bold 10px sans-serif', 'center' );
    }
    const arrive = clamp( ( phase - 0.5 ) * 2 );
    if ( arrive > 0 ) { ctx.save(); ctx.globalAlpha = arrive; ctx.fillStyle = recorded ? COLORS.gray : COLORS.green; ctx.beginPath(); ctx.arc( joinX + 16, yMid, 7, 0, TAU ); ctx.fill(); ctx.restore(); }
    const P = recorded ? 0.5 : 1;
    const barX = joinX + 40, barW = 46;
    ctx.fillStyle = '#e8ecef'; ctx.fillRect( barX, yMid - 60, barW, 120 );
    ctx.fillStyle = recorded ? COLORS.gray : COLORS.green; ctx.fillRect( barX, yMid + 60 - 120 * P, barW, 120 * P );
    text( ctx, `P(z+) = ${ P.toFixed( 2 ) }`, barX + barW / 2, yMid + 78, COLORS.gray, 'bold 11px sans-serif', 'center' );
    text( ctx, recorded ? 'probabilities add: interference lost' : 'amplitudes add: full coherent recombination', w / 2, 20, recorded ? COLORS.gray : COLORS.green, 'bold 11px sans-serif', 'center' );
  } };
}

// ch07: an equal superposition of the n=0 and n=1 oscillator eigenstates,
// whose probability density sloshes back and forth like a classical particle.
function oscillatorScene() {
  const potentialScale = 0.05, omega = 1.4;
  const phi0 = x => Math.pow( Math.PI, -0.25 ) * Math.exp( -x * x / 2 );
  const phi1 = x => Math.pow( Math.PI, -0.25 ) * Math.SQRT2 * x * Math.exp( -x * x / 2 );
  return { speed: 1, draw( ctx, t, w, h ) {
    const mapper = makeMapper( { width: w, height: h, xMin: -4, xMax: 4, yMin: 0, yMax: 0.85, margin: 32 } );
    drawAxes( ctx, mapper, -4, 4, 0, 0.8, 'position x (oscillator lengths)', '|ψ|² and V(x)' );
    const xs = linspace( -4, 4, 300 );
    const psi2 = xs.map( x => { const p0 = phi0( x ), p1 = phi1( x ); return 0.5 * ( p0 * p0 + p1 * p1 + 2 * p0 * p1 * Math.cos( omega * t ) ); } );
    plotCurve( ctx, mapper, xs, xs.map( x => potentialScale * x * x + 0.05 ), { color: COLORS.light, lineWidth: 1.6 } );
    fillBetween( ctx, mapper, xs, psi2, xs.map( () => 0 ), { color: COLORS.blue, alpha: 0.18 } );
    plotCurve( ctx, mapper, xs, psi2, { color: COLORS.blue, lineWidth: 2.4 } );
    const xExp = Math.cos( omega * t ) / Math.SQRT2;
    plotPoint( ctx, mapper, xExp, 0.02, { color: COLORS.red, radius: 6 } );
    text( ctx, `⟨x⟩(t) = cos(ωt)/√2 = ${ xExp.toFixed( 2 ) }`, 10, 18, COLORS.red, 'bold 11px sans-serif' );
    text( ctx, 'n=0 + n=1 superposition: probability sloshes like a classical oscillator', w / 2, h - 8, COLORS.gray, 'bold 10px sans-serif', 'center' );
  } };
}

// ch02: a slider sets the polar angle (relative magnitudes) while an
// automatic azimuthal sweep shows relative phase; overall phase moves neither.
function blochPhaseScene() {
  let theta = 70;
  rangeControl( 'Polar angle θ (relative magnitude):', 0, 180, 70, 5, v => { theta = v; } );
  return { speed: 0.8, draw( ctx, t, w, h ) {
    const leftW = w * 0.55, cx = leftW / 2, cy = h * 0.52, R = Math.min( leftW, h ) * 0.36, tilt = 0.34;
    const th = theta * Math.PI / 180, phi = t % TAU;
    blochOutline( ctx, cx, cy, R, tilt, Math.sin( th ) );
    text( ctx, '|+z⟩', cx + 6, cy - R * 1.05, COLORS.gray, '10px sans-serif' );
    text( ctx, '|-z⟩', cx + 6, cy + R * 1.15, COLORS.gray, '10px sans-serif' );
    const x = Math.sin( th ) * Math.cos( phi ), y = Math.sin( th ) * Math.sin( phi ), z = Math.cos( th );
    arrow( ctx, cx, cy, cx + R * x, cy - R * z - R * tilt * y, COLORS.blue, 2.6 );
    text( ctx, `azimuth φ sweeps automatically (relative phase) = ${ ( phi * 180 / Math.PI ).toFixed( 0 ) }°`, 10, 18, COLORS.blue, 'bold 11px sans-serif' );
    const px0 = leftW + 12;
    ctx.save(); ctx.translate( px0, 0 );
    text( ctx, 'ket coefficients:', 0, 46, COLORS.gray, 'bold 11px sans-serif' );
    text( ctx, `cos(θ/2) = ${ Math.cos( th / 2 ).toFixed( 2 ) }`, 0, 68, COLORS.gray, '11px sans-serif' );
    text( ctx, `|e^(iφ)sin(θ/2)| = ${ Math.sin( th / 2 ).toFixed( 2 ) }`, 0, 88, COLORS.gray, '11px sans-serif' );
    text( ctx, 'a global phase multiplying both', 0, 118, COLORS.green, '10px sans-serif' );
    text( ctx, 'coefficients leaves this point fixed —', 0, 134, COLORS.green, '10px sans-serif' );
    text( ctx, 'only the point, not the ket, is physical.', 0, 150, COLORS.green, '10px sans-serif' );
    ctx.restore();
  } };
}

// ch11: joint two-particle detection probability, bunching for bosons and
// carrying an exchange hole for fermions as the toggle changes statistics.
function exchangeScene() {
  let stat = 'boson';
  selectControl( 'Statistics:', [ [ 'boson', 'Bosons (+)' ], [ 'fermion', 'Fermions (−)' ], [ 'distinct', 'Distinguishable' ] ], stat, v => { stat = v; } );
  const N = 64, off = document.createElement( 'canvas' );
  off.width = N; off.height = N;
  const octx = off.getContext( '2d' ), img = octx.createImageData( N, N ), sigma = 0.9;
  const psi = ( x, c ) => Math.exp( -( ( x - c ) ** 2 ) / ( 2 * sigma * sigma ) );
  return { speed: 0.5, draw( ctx, t, w, h ) {
    const d = 1.3 + 0.9 * Math.sin( t * 0.6 );
    let maxV = 1e-9;
    const vals = new Float64Array( N * N );
    for ( let i = 0; i < N; i++ ) for ( let j = 0; j < N; j++ ) {
      const x1 = -3 + 6 * i / ( N - 1 ), x2 = -3 + 6 * j / ( N - 1 );
      const direct = psi( x1, -d / 2 ) * psi( x2, d / 2 ), exch = psi( x2, -d / 2 ) * psi( x1, d / 2 );
      const amp = stat === 'distinct' ? Math.hypot( direct, exch ) : direct + ( stat === 'boson' ? 1 : -1 ) * exch;
      const v = amp * amp; vals[ j * N + i ] = v; if ( v > maxV ) maxV = v;
    }
    for ( let k = 0; k < N * N; k++ ) {
      const v = vals[ k ] / maxV, idx = k * 4;
      img.data[ idx ] = Math.round( 255 - 232 * v ); img.data[ idx + 1 ] = Math.round( 255 - 150 * v ); img.data[ idx + 2 ] = Math.round( 255 - 85 * v ); img.data[ idx + 3 ] = 255;
    }
    octx.putImageData( img, 0, 0 );
    const gridSize = Math.min( w * 0.62, h * 0.86 ), x0 = 20, y0 = ( h - gridSize ) / 2;
    ctx.save(); ctx.imageSmoothingEnabled = true; ctx.drawImage( off, x0, y0, gridSize, gridSize );
    ctx.strokeStyle = COLORS.gray; ctx.strokeRect( x0, y0, gridSize, gridSize );
    ctx.globalAlpha = 0.5; ctx.setLineDash( [ 4, 3 ] ); ctx.beginPath(); ctx.moveTo( x0, y0 + gridSize ); ctx.lineTo( x0 + gridSize, y0 ); ctx.stroke(); ctx.restore();
    text( ctx, 'detector 1 position →', x0 + gridSize / 2, y0 + gridSize + 16, COLORS.gray, '10px sans-serif', 'center' );
    ctx.save(); ctx.translate( x0 - 12, y0 + gridSize / 2 ); ctx.rotate( -Math.PI / 2 ); text( ctx, 'detector 2 position →', 0, 0, COLORS.gray, '10px sans-serif', 'center' ); ctx.restore();
    const caption = stat === 'boson' ? 'bosons: bunch on the equal-position diagonal' : stat === 'fermion' ? 'fermions: exchange hole on the diagonal' : 'distinguishable: no interference term';
    text( ctx, caption, x0 + gridSize + 12, 24, COLORS.blue, 'bold 11px sans-serif' );
    text( ctx, `separation d = ${ d.toFixed( 2 ) }`, x0 + gridSize + 12, 46, COLORS.gray, '11px sans-serif' );
  } };
}

// ch04: two energy-eigenstate phase clocks advancing at rates set by their
// energies; only a mixing-basis probability reveals their relative angle.
function phaseClocksScene() {
  const omega1 = 0.8, omega2 = 2.1;
  return { speed: 1, draw( ctx, t, w, h ) {
    const leftW = w * 0.42, r = Math.min( leftW / 2, h * 0.28 ) * 0.8;
    const clock = ( cx, cy, omega, label, color ) => {
      ctx.save(); ctx.strokeStyle = COLORS.light; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc( cx, cy, r, 0, TAU ); ctx.stroke(); ctx.restore();
      const a = omega * t; arrow( ctx, cx, cy, cx + r * Math.cos( a ), cy - r * Math.sin( a ), color, 2.4 );
      text( ctx, label, cx, cy + r + 16, color, 'bold 11px sans-serif', 'center' );
    };
    clock( leftW * 0.28, h * 0.36, omega1, `E₁ clock (ω₁=${ omega1 })`, COLORS.blue );
    clock( leftW * 0.72, h * 0.36, omega2, `E₂ clock (ω₂=${ omega2 })`, COLORS.red );
    text( ctx, `relative angle grows at ω₂-ω₁ = ${ ( omega2 - omega1 ).toFixed( 2 ) }`, leftW / 2, h * 0.7, COLORS.gray, 'bold 10px sans-serif', 'center' );
    const px0 = leftW + 14, panelW = w - px0 - 10;
    const mapper = makeMapper( { width: panelW, height: h, xMin: 0, xMax: 12, yMin: 0, yMax: 1.05, margin: 26 } );
    ctx.save(); ctx.translate( px0, 0 );
    drawAxes( ctx, mapper, 0, 12, 0, 1, 'time', 'probability' );
    const ts = linspace( 0, 12, 300 );
    plotCurve( ctx, mapper, ts, ts.map( () => 0.5 ), { color: COLORS.gray, dash: [ 4, 3 ], lineWidth: 1.2 } );
    plotCurve( ctx, mapper, ts, ts.map( tt => Math.cos( ( omega2 - omega1 ) * tt / 2 ) ** 2 ), { color: COLORS.green, lineWidth: 2.2 } );
    const tm = t % 12;
    plotPoint( ctx, mapper, tm, Math.cos( ( omega2 - omega1 ) * tm / 2 ) ** 2, { color: COLORS.green, radius: 5 } );
    text( ctx, 'energy-basis P: flat', panelW - 6, mapper.y( 0.55 ), COLORS.gray, '10px sans-serif', 'right' );
    text( ctx, 'mixing-basis P: oscillates', panelW - 6, mapper.y( 1 ) + 14, COLORS.green, '10px sans-serif', 'right' );
    ctx.restore();
  } };
}

const scenes = {
  larmor: larmorScene,
  tunneling: tunnelingScene,
  'packet-spreading': packetSpreadingScene,
  decoherence: decoherenceScene,
  ramsey: ramseyScene,
  recombination: recombinationScene,
  oscillator: oscillatorScene,
  'bloch-phase': blochPhaseScene,
  exchange: exchangeScene,
  'phase-clocks': phaseClocksScene
};

const factory = scenes[ document.body.dataset.scene ];
if ( !factory ) throw new Error( `Unknown animation scene: ${ document.body.dataset.scene }` );
const scene = factory();
if ( note && scene.note ) note.textContent = scene.note;
startLoop( { canvas, controls, draw: scene.draw, speed: scene.speed ?? 1 } );
