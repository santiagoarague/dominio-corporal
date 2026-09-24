// Plantilla: vite.config.js la copia a dist/sw.js al compilar, cambia el nombre
// de CACHE en cada version y agrega a ASSETS los archivos del bundle, que
// llevan un hash en el nombre y no se conocen hasta ese momento.
const CACHE = 'dominio-corporal-v4';
const ASSETS = [
  /* __BUNDLE__ */
  './',
  './index.html',
  './storage.js',
  './manifest.webmanifest',
  './privacidad.html',
  './fuentes/chakra-400.woff2',
  './fuentes/chakra-500.woff2',
  './fuentes/chakra-600.woff2',
  './fuentes/chakra-700.woff2',
  './fuentes/inter-var.woff2',
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

// El HTML y el manifiesto son lo unico que cambia en cada despliegue.
function esDocumento(req, url) {
  if (req.mode === 'navigate') return true;
  const p = url.pathname;
  return p.endsWith('/') || p.endsWith('.html') || p.endsWith('.webmanifest');
}

// Red primero: con internet siempre se ve la version recien publicada,
// sin internet se sirve la ultima copia guardada.
//
// El HTML se pide con cache:'reload', que salta el cache HTTP del navegador.
// Sin eso, "red primero" no servia de nada: fetch() devolvia la copia que el
// navegador ya tenia guardada — GitHub Pages manda max-age=600 — y se veia una
// version vieja durante minutos. Peor: el service worker guardaba esa copia
// vieja como si fuera la buena.
//
// Solo se guarda una respuesta si es 200 y del mismo origen: si no, un 404
// o un error del servidor quedaba guardado y se servia como "la copia offline".
//
// Sin red se busca con ignoreVary: el bundle y las fuentes se piden con CORS,
// y si el servidor manda "Vary: Origin" (el de Vite lo hace) la copia guardada
// por el install, que no llevaba Origin, no coincidia. El respaldo de
// index.html es solo para paginas: servirlo en lugar de un script daba un
// error de tipo MIME y la app se quedaba en la pantalla de carga.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const propio = url.origin === self.location.origin;
  const recargar = propio && esDocumento(req, url);

  const red = recargar
    ? fetch(url.href, { cache: 'reload', credentials: 'same-origin' })
        .then((r) => (r.redirected
          // No se puede responder a una navegacion con una respuesta redirigida.
          ? new Response(r.body, { status: r.status, statusText: r.statusText, headers: r.headers })
          : r))
    : fetch(req);

  event.respondWith(
    red
      .then((response) => {
        if (propio && response.ok) {
          const copia = response.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copia)).catch(() => {});
        }
        return response;
      })
      .catch(() =>
        caches.match(req, { ignoreVary: true }).then((hit) => {
          if (hit) return hit;
          if (recargar) return caches.match('./index.html', { ignoreVary: true });
          return Response.error();
        })
      )
  );
});
