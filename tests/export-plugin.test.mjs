import assert from 'node:assert/strict';
import test from 'node:test';

// EDITION is intentionally read when the plugin module loads. A query string
// gives each edition an independent module instance in this test process.
async function edition(name) {
  process.env.MYST_PRINT = name;
  return import(`../plugins/export.mjs?edition=${name}`);
}

test('student edition removes solutions but retains exercises', async () => {
  const { rewrite } = await edition('student');
  assert.deepEqual(rewrite({ type: 'solution', children: [] }), []);
  const [exercise] = rewrite({
    type: 'exercise', identifier: 'ex-test', enumerator: '2.3', children: []
  });
  assert.equal(exercise.type, 'div');
  assert.match(exercise.children[0].tex, /mystexercisestart/);
  assert.match(exercise.children[2].tex, /label\{ex-test\}/);
});

test('full edition retains solutions and opens dropdowns', async () => {
  const { rewrite } = await edition('full');
  assert.equal(rewrite({
    type: 'solution', children: [{ type: 'admonitionTitle', children: [] }]
  })[0].type, 'div');
  const opened = rewrite({
    type: 'details',
    children: [
      { type: 'summary', children: [{ type: 'text', value: 'Why?' }] },
      { type: 'paragraph', children: [{ type: 'text', value: 'Because.' }] }
    ]
  });
  assert.equal(opened[0].children[0].type, 'strong');
  assert.equal(opened[1].type, 'paragraph');
});

test('print rewrite removes iframes, flattens captions, and converts asides', async () => {
  const { rewrite } = await edition('full');
  assert.deepEqual(rewrite({ type: 'iframe' }), []);
  assert.equal(rewrite({ type: 'aside', children: [] })[0].type, 'blockquote');
  const [caption] = rewrite({
    type: 'caption',
    children: [
      { type: 'paragraph', children: [{ type: 'text', value: 'One.' }] },
      { type: 'paragraph', children: [{ type: 'text', value: 'Two.' }] }
    ]
  });
  assert.equal(caption.children.length, 1);
  assert.equal(caption.children[0].children[1].value, ' ');
});

test('offprint links become absolute website links', async () => {
  process.env.MYST_PRINT = 'full';
  process.env.MYST_SITE_URL = 'https://example.test/book/';
  const { rewrite } = await import('../plugins/export.mjs?offprint=true');
  const output = rewrite({
    type: 'link', internal: true, identifier: 'ch-two', dataUrl: true,
    url: '/chapter-two', children: [{ type: 'text', value: 'Chapter 2' }]
  });
  assert.match(output[0].tex, /https:\/\/example\.test\/book\/chapter-two/);
});
