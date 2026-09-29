import assert from 'node:assert/strict';
import test from 'node:test';
import { chapterLists, figuresWithoutAlt } from '../scripts/validate-project.mjs';

test('chapter lists accept quoted paths, reordered keys, and nested navigation', () => {
  const result = chapterLists(`project:
    exports:
      - articles: [{file: "chapters/ch-01-test.md", level: 0}]
        id: book
    toc:
      - title: Part one
        children:
          - file: 'chapters/ch-01-test.md' # chapter
`);
  assert.deepEqual(result, { toc: ['chapters/ch-01-test.md'], exports: ['chapters/ch-01-test.md'] });
});

test('figure alt checks support all fences and nested directives', () => {
  for (const fence of ['```', '````', '~~~', '::::']) {
    assert.deepEqual(figuresWithoutAlt(`${fence}{figure} image.png\n:alt: A plot\n${fence}`), []);
    assert.deepEqual(figuresWithoutAlt(`${fence}{figure} image.png\n${fence}`), ['image.png']);
  }
  assert.deepEqual(figuresWithoutAlt('::::{solution}\n:::{figure} nested.png\n:::\n::::'), ['nested.png']);
  assert.deepEqual(figuresWithoutAlt('````markdown\n```{figure} example.png\n```\n````'), []);
  assert.deepEqual(figuresWithoutAlt('````\n```{figure} example.png\n```\n````'), []);
});
