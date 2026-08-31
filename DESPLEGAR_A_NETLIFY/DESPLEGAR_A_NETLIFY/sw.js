// Vrde Club Service Worker (PWA v1.0)
const CACHE_NAME = 'vrde-lunar-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './tienda.html',
  './lunar.html',
  './admin.html',
  './superadmin.html',
  './lunar-engine.js',
  './lunar-style.css',
  './manifest.json',
  './assets/favicon.svg',
  './assets/favicon.png',
  './assets/apple-touch-icon.png'
];

// Instalación: Pre-cacheados de recursos esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[VRDE SW] Cacheando recursos estáticos de Vrde Club...');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[VRDE SW] Advertencia al cachear algunos recursos:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activación: Limpieza de cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[VRDE SW] Limpiando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia de Fetch: Network-first con fallback a Caché para datos dinámicos, y Cache-first para estáticos
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignorar peticiones que no sean GET o que sean de APIs externas/Firebase en tiempo real
  if (req.method !== 'GET' || url.protocol === 'chrome-extension:' || url.hostname.includes('firestore.googleapis.com') || url.hostname.includes('gstatic.com')) {
    return;
  }

  // Network-First para páginas HTML (siempre intenta traer la última versión web, si está offline usa la caché)
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
          return res;
        })
        .catch(() => {
          return caches.match(req).then(cached => {
            return cached || caches.match('./tienda.html');
          });
        })
    );
    return;
  }

  // Cache-First para recursos estáticos (CSS, JS, imágenes locales, fuentes)
  event.respondWith(
    caches.match(req).then(cachedRes => {
      if (cachedRes) {
        // En segundo plano busca actualizar la caché si hay internet
        fetch(req).then(networkRes => {
          if (networkRes && networkRes.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(req, networkRes));
          }
        }).catch(() => {});
        return cachedRes;
      }

      return fetch(req).then(networkRes => {
        if (networkRes && networkRes.status === 200) {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
        }
        return networkRes;
      });
    })
  );
});

// Listener para notificaciones Push
self.addEventListener('push', event => {
  let data = { title: 'Vrde Club 🌿', body: '¡Hay novedades en el ciclo lunar!' };
  if (event.data) {
    try { data = event.data.json(); } catch(e) { data.body = event.data.text(); }
  }
  const options = {
    body: data.body,
    icon: './assets/favicon.png',
    badge: './assets/favicon.svg',
    vibrate: [100, 50, 100],
    data: { url: data.url || './tienda.html' }
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Clic en notificación: abrir o enfocar la app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || './tienda.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
