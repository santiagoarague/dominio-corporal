const CACHE = 'dominio-corporal-v2';
const ASSETS = [
  './',
  './index.html',
  './storage.js',
  './manifest.webmanifest',
  './privacidad.html',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Red primero: con internet siempre se ve la version recien publicada,
// sin internet se sirve la ultima copia guardada.
// Solo se guarda una respuesta si es 200 y del mismo origen: si no, un 404
// o un error del servidor quedaba guardado y se servia como "la copia offline".
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const sameOrigin = new URL(req.url).origin === self.location.origin;
  event.respondWith(
    fetch(req)
      .then((response) => {
        if (sameOrigin && response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
  );
});
