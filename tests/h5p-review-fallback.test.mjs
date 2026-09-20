import assert from 'node:assert/strict';
import test from 'node:test';
import { renderReview, replaceReview } from '../scripts/h5p-review-fallback.mjs';

const questions = [
  { library: 'H5P.MultiChoice 1.16', params: {
    question: '<p>Which path?</p>',
    media: { type: { params: { alt: 'Two paths.' } } },
    answers: [ { text: '<div>Left.</div>' }, { text: '<div>Right.</div>' } ]
  } },
  { library: 'H5P.TrueFalse 1.8', params: { question: '<p>Energy is ℏω.</p>' } },
  { library: 'H5P.DragText 1.10', params: {
    taskDescription: '<p>Complete the rule.</p>', textField: 'A *wave* has $γ$.', distractors: '*ray*'
  } },
  { library: 'H5P.Blanks 1.14', params: {
    text: '<p>Complete the result.</p>', questions: [ '<p>The answer is *42/forty-two*.</p>' ]
  } },
  { library: 'H5P.MarkTheWords 1.11', params: {
    taskDescription: '<p>Mark the correct phrase.</p>', textField: 'A *bright fringe* forms.'
  } }
];

test('renderReview retains questions and choices while hiding marked answers', () => {
  const review = renderReview( questions );
  assert.match( review, /Which path\? Figure description: Two paths\. Choices: \(A\) Left\. \(B\) Right\./ );
  assert.match( review, /Energy is \$\\hbar \\omega\$\./ );
  assert.match( review, /A ___ has \$\\gamma\$\./ );
  assert.match( review, /The answer is ___\./ );
  assert.match( review, /A bright fringe forms\./ );
  assert.doesNotMatch( review, /forty-two|\*bright fringe\*/ );
});

test('replaceReview updates only the requested directive body', () => {
  const source = 'Before\n\n:::{h5p} ch01-chapter-review\n:label: review\n\nOld fallback\n:::\n\nAfter\n';
  const result = replaceReview( source, 'ch01-chapter-review', questions );
  assert.match( result, /^Before\n\n:::\{h5p\} ch01-chapter-review\n:label: review\n\n1\. / );
  assert.match( result, /\n:::\n\nAfter\n$/ );
  assert.doesNotMatch( result, /Old fallback/ );
  assert.throws( () => replaceReview( source, 'missing', questions ), /expected one H5P directive/ );
  assert.throws( () => renderReview( questions.slice( 1 ) ), /Expected five review questions/ );
});
