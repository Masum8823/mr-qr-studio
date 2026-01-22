
const CACHE_NAME = 'mr-qr-v1';
const assets = ['./', './index.html', './App.tsx', './index.tsx', './types.ts', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
