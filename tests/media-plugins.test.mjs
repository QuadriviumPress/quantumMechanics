import assert from 'node:assert/strict';
import test from 'node:test';

const savedBaseUrl = process.env.BASE_URL;
delete process.env.BASE_URL;
const { default: animationPlugin } = await import(`../plugins/animation.mjs?root=${Date.now()}`);
if (savedBaseUrl === undefined) delete process.env.BASE_URL;
else process.env.BASE_URL = savedBaseUrl;

const { default: videoPlugin, parseTime, resolveVideo } = await import('../plugins/video.mjs');

test('animation emits a local live frame and explicit static fallback', () => {
  const directive = animationPlugin.directives.find(item => item.name === 'animation');
  const [figure] = directive.run({
    arg: 'ch03-string-modes',
    body: [],
    options: { figure: '/images/ch08-box-modes.svg', label: 'fig:box-modes' },
  });
  assert.equal(figure.kind, 'figure');
  assert.equal(figure.noSubcontainers, true);
  assert.equal(figure.children[0].src, '/animations/ch03-string-modes.html');
  assert.match(figure.children[0].class, /animation-frame/);
  assert.equal(figure.children[1].url, '/images/ch08-box-modes.svg');
  assert.equal(figure.children[1].class, 'animation-placeholder');
  assert.equal(figure.label, 'fig:box-modes');
});

test('animation frame honors a deployment base path', async () => {
  const original = process.env.BASE_URL;
  process.env.BASE_URL = '/modernPhysics';
  try {
    const { default: based } = await import(`../plugins/animation.mjs?base=${Date.now()}`);
    const directive = based.directives.find(item => item.name === 'animation');
    const [figure] = directive.run({ arg: 'ch08-beats', body: [], options: { 'no-figure': true } });
    assert.equal(figure.children[0].src, '/modernPhysics/animations/ch08-beats.html');
  } finally {
    if (original === undefined) delete process.env.BASE_URL;
    else process.env.BASE_URL = original;
  }
});

test('YouTube video uses a privacy-conscious embed, poster, and durable link', () => {
  const directive = videoPlugin.directives.find(item => item.name === 'video');
  const source = 'https://www.youtube.com/watch?v=uva6gBEpfDY&t=1m15s';
  const [figure] = directive.run({
    arg: source,
    body: [],
    options: { 'video-title': 'Double slit' },
  });
  assert.equal(figure.children[0].src, 'https://www.youtube-nocookie.com/embed/uva6gBEpfDY?start=75');
  assert.equal(figure.children[1].url, 'https://i.ytimg.com/vi/uva6gBEpfDY/hqdefault.jpg');
  assert.equal(figure.children[2].children[0].children[1].url, source);
  assert.equal(parseTime('1m15s'), 75);
  assert.equal(resolveVideo('https://youtu.be/uva6gBEpfDY').id, 'uva6gBEpfDY');
});
