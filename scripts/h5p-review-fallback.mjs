/** Render the print equivalent of the five H5P chapter-review questions. */

function plainText( value ) {
  return String( value ).replace( /<\/?(?:p|div)>/g, '' ).trim();
}

function markedTerms( value ) {
  return [ ...String( value ).matchAll( /\*([^*]+)\*/g ) ].map( match => match[ 1 ] );
}

// H5P accepts Unicode math that the book's Latin Modern PDF font does not.
function printMath( value ) {
  const symbols = {
    'γ': '\\gamma ', 'π': '\\pi ', 'Δ': '\\Delta ', 'λ': '\\lambda ',
    'θ': '\\theta ', 'φ': '\\phi ', 'Ψ': '\\Psi ', 'ℓ': '\\ell ', 'ω': '\\omega ',
    'ℏ': '\\hbar ', '²': '^2', '±': '\\pm ', '−': '-'
  };
  const toTeX = token => [ ...token ].map( char => symbols[ char ] ?? char ).join( '' ).trim();
  return value.split( '$' ).map( ( part, index ) => {
    if ( index % 2 ) return toTeX( part );
    return part.replaceAll( 'u′x', "$u'_x$" )
      .replaceAll( 'ux − v', '$u_x-v$' ).replaceAll( 'ux + v', '$u_x+v$' )
      .replace( /[A-Za-z0-9γπΔλθφΨℓωℏ²±−/+*=()]+/g, token => {
        if ( !/[γπΔλθφΨℓωℏ²±]/.test( token ) ) return token;
        return `$${toTeX( token )}$`;
      } );
  } ).join( '$' );
}

function renderQuestion( question, number ) {
  const { library, params } = question;
  let description;
  if ( library.startsWith( 'H5P.MultiChoice ' ) ) {
    const figure = params.media?.type?.params?.alt;
    const choices = params.answers.map( ( answer, index ) =>
      `(${String.fromCharCode( 65 + index )}) ${plainText( answer.text )}`
    ).join( ' ' );
    description = `**Multiple choice${figure ? ', from a figure' : ''}.** ` +
      `${plainText( params.question )}${figure ? ` Figure description: ${figure}` : ''} Choices: ${choices}`;
  }
  else if ( library.startsWith( 'H5P.TrueFalse ' ) ) {
    description = `**True or false.** ${plainText( params.question )}`;
  }
  else if ( library.startsWith( 'H5P.DragText ' ) ) {
    const terms = [ ...markedTerms( params.textField ), ...markedTerms( params.distractors ) ];
    description = `**Drag the words.** ${plainText( params.taskDescription )} ` +
      `${params.textField.replace( /\*[^*]+\*/g, '___' )} (Terms: ${terms.join( '; ' )}.)`;
  }
  else if ( library.startsWith( 'H5P.Blanks ' ) ) {
    const prompt = params.questions.map( item => plainText( item ).replace( /\*[^*]+\*/g, '___' ) ).join( ' ' );
    description = `**Fill in the blanks.** ${plainText( params.text )} ${prompt}`;
  }
  else if ( library.startsWith( 'H5P.MarkTheWords ' ) ) {
    description = `**Mark the words.** ${plainText( params.taskDescription )} ` +
      `“${params.textField.replaceAll( '*', '' )}”`;
  }
  else {
    throw new Error( `Unsupported chapter-review question type: ${library}` );
  }
  return `${number}. ${printMath( description )}`;
}

export function renderReview( questions ) {
  if ( questions.length !== 5 ) throw new Error( `Expected five review questions, found ${questions.length}` );
  return questions.map( ( question, index ) => renderQuestion( question, index + 1 ) ).join( '\n' );
}

export function replaceReview( source, id, questions ) {
  const lines = source.split( '\n' );
  const starts = lines.flatMap( ( line, index ) => line === `:::{h5p} ${id}` ? [ index ] : [] );
  if ( starts.length !== 1 ) throw new Error( `${id}: expected one H5P directive, found ${starts.length}` );
  let bodyStart = starts[ 0 ] + 1;
  while ( lines[ bodyStart ]?.startsWith( ':' ) ) bodyStart += 1;
  if ( lines[ bodyStart ] !== '' ) throw new Error( `${id}: expected a blank line before the fallback` );
  bodyStart += 1;
  const end = lines.indexOf( ':::', bodyStart );
  if ( end < 0 ) throw new Error( `${id}: missing closing directive fence` );
  lines.splice( bodyStart, end - bodyStart, ...renderReview( questions ).split( '\n' ) );
  return lines.join( '\n' );
}
