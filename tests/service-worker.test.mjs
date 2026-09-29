import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source = fs.readFileSync(new URL('../pwa/service-worker.js', import.meta.url), 'utf8');
const scope = 'https://example.test/quantumMechanics/';
const prefix = `quantum-mechanics:${encodeURIComponent(scope)}:`;

function worker({ base = scope, storage = new Map() } = {}) {
  const listeners = {};
  const calls = [];
  let network = async request => new Response(`Online: ${request.url ?? request}`);
  const key = request => request.url ?? request;
  const caches = {
    keys: async () => [...storage.keys()],
    delete: async name => storage.delete(name),
    async open(name) {
      if (!storage.has(name)) storage.set(name, new Map());
      const entries = storage.get(name);
      return {
        async addAll(urls) {
          for (const url of urls) entries.set(url, await network(url));
        },
        async put(request, response) { entries.set(key(request), response.clone()); },
        async match(request) { return entries.get(key(request))?.clone(); },
      };
    },
  };
  vm.runInNewContext(source, {
    URL, Response, caches,
    self: {
      registration: { scope: base },
      skipWaiting() {}, clients: { claim() {} },
      addEventListener(name, listener) { listeners[name] = listener; },
    },
    fetch(request, options) { calls.push({ request, options }); return network(request); },
  });
  return {
    storage, calls,
    online(handler) { network = handler; },
    offline() { network = async () => { throw new Error('Offline'); }; },
    async dispatch(type, request) {
      const pending = [];
      let response;
      listeners[type]({
        request,
        waitUntil(promise) { pending.push(promise); },
        respondWith(promise) { response = promise; },
      });
      const result = await response;
      await Promise.all(pending);
      return result;
    },
  };
}

const request = (file, mode = 'cors') => ({ url: `${scope}${file}`, method: 'GET', mode });

test('activation removes only obsolete caches belonging to this book and scope', async () => {
  const book = worker();
  await book.dispatch('install');
  await book.dispatch('fetch', request('index.json'));
  const current = [...book.storage.keys()];
  const other = worker({ base: 'https://example.test/another-book/', storage: book.storage });
  await other.dispatch('install');
  book.storage.set('other-app-cache', new Map());
  book.storage.set('book-pages-v1', new Map()); // Old shared caches have ambiguous ownership.
  const preserved = [...book.storage.keys()];
  book.storage.set(`${prefix}pages-obsolete`, new Map());
  await book.dispatch('activate');
  assert.deepEqual([...book.storage.keys()], preserved);
  assert.equal(current.length, 2);
});

test('stable chapter URLs refresh online and the latest response remains available offline', async () => {
  const book = worker();
  await book.dispatch('install');
  const chapter = request('ch-01-stern-gerlach.json');
  book.online(async () => new Response('First edition'));
  assert.equal(await (await book.dispatch('fetch', chapter)).text(), 'First edition');
  book.online(async () => new Response('Corrected edition'));
  assert.equal(await (await book.dispatch('fetch', chapter)).text(), 'Corrected edition');
  assert.equal(book.calls.length, 2);
  assert.ok(book.calls.every(call => call.options.cache === 'no-cache'));
  book.offline();
  assert.equal(await (await book.dispatch('fetch', chapter)).text(), 'Corrected edition');
});

test('offline navigation uses cached pages, the installed home page, or the fallback', async () => {
  const book = worker();
  await book.dispatch('install');
  const visited = request('chapter-one', 'navigate');
  await book.dispatch('fetch', visited);
  book.offline();
  assert.equal(await (await book.dispatch('fetch', visited)).text(), `Online: ${visited.url}`);
  assert.equal(await (await book.dispatch('fetch', request('', 'navigate'))).text(), `Online: ${scope}`);
  assert.equal(await (await book.dispatch('fetch', request('unvisited', 'navigate'))).text(), `Online: ${scope}offline.html`);
  assert.equal((await book.dispatch('fetch', request('missing.json'))).type, 'error');
});

test('failed HTTP responses cannot replace a successful offline copy', async () => {
  const book = worker();
  const chapter = request('index.json');
  book.online(async () => new Response('Good chapter'));
  await book.dispatch('fetch', chapter);
  book.online(async () => new Response('Server error', { status: 503 }));
  assert.equal((await book.dispatch('fetch', chapter)).status, 503);
  book.offline();
  assert.equal(await (await book.dispatch('fetch', chapter)).text(), 'Good chapter');
});

test('requests outside the book and non-GET requests are left to the browser', async () => {
  const book = worker();
  for (const req of [
    { ...request('index.json'), method: 'POST' },
    { ...request('index.json'), url: 'https://example.test/another-book/index.json' },
    { ...request('index.json'), url: 'https://example.test/quantumMechanics-other/index.json' },
    { ...request('index.json'), url: 'https://elsewhere.test/index.json' },
  ]) assert.equal(await book.dispatch('fetch', req), undefined);
  assert.equal(book.calls.length, 0);
});
