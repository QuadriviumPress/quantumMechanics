const base = new URL(self.registration.scope);
const VERSION = 'v2';
// CacheStorage is shared by every application on this origin, including books
// installed under other paths. Never read or remove another scope's caches.
const CACHE_PREFIX = `quantum-mechanics:${encodeURIComponent(base.href)}:`;
const STATIC_CACHE = `${CACHE_PREFIX}static-${VERSION}`;
const PAGE_CACHE = `${CACHE_PREFIX}pages-${VERSION}`;
const scoped = (path = '') => new URL(path, base).toString();

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll([scoped(''), scoped('offline.html'), scoped('manifest.webmanifest')]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith(CACHE_PREFIX) && ![STATIC_CACHE, PAGE_CACHE].includes(key))
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const target = new URL(request.url);
  if (request.method !== 'GET' || target.origin !== base.origin || !target.pathname.startsWith(base.pathname)) return;

  // Chapter JSON, configuration, and CSS use stable URLs. Revalidate online so
  // a deployment reaches returning readers; retain successful responses offline.
  event.respondWith((async () => {
    try {
      const response = await fetch(request, { cache: 'no-cache' });
      if (response.status === 200) {
        const copy = response.clone();
        event.waitUntil(caches.open(PAGE_CACHE)
          .then((cache) => cache.put(request, copy))
          .catch(() => {})); // Storage limits must not prevent online reading.
      }
      return response;
    } catch {
      const pages = await caches.open(PAGE_CACHE);
      const staticAssets = await caches.open(STATIC_CACHE);
      const cached = (await pages.match(request)) || (await staticAssets.match(request));
      if (cached) return cached;
      if (request.mode === 'navigate') return staticAssets.match(scoped('offline.html'));
      return Response.error();
    }
  })());
});
