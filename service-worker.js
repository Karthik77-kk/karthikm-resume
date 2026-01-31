// Service Worker for Karthik M Portfolio ULTRA+
// Version 6.0.0

const CACHE_NAME = 'km-portfolio-ultra-v6.0';
const STATIC_CACHE = 'km-static-v6.0';
const DYNAMIC_CACHE = 'km-dynamic-v6.0';

const urlsToCache = [
  '/',
  '/index.html',
  '/404.html',
  '/robots.txt',
  '/sitemap.xml',
  '/assets/css/new-features.css',
  '/assets/css/ai-chatbot.css',
  '/assets/css/immersive-effects.css',
  '/assets/css/advanced-features.css',
  '/assets/css/ultra-advanced.css',
  '/assets/css/responsive-design.css',
  '/assets/js/utils.js',
  '/assets/js/portfolio.js',
  '/assets/js/game.js',
  '/assets/js/ai-chatbot.js',
  '/assets/js/immersive-effects.js',
  '/assets/js/advanced-features.js',
  '/assets/js/ultra-advanced.js'
];

const fontUrls = [
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;700&display=swap'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(urlsToCache);
      }),
      caches.open(CACHE_NAME).then(cache => {
        console.log('Caching fonts');
        return Promise.all(
          fontUrls.map(url => 
            cache.add(url).catch(err => console.log('Font cache failed:', url, err))
          )
        );
      })
    ]).catch(err => {
      console.log('Cache install failed:', err);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

// Fetch event - Network first for HTML, Cache first for assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // HTML - Network first, fallback to cache
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(request).then(response => response || caches.match('/index.html')))
    );
    return;
  }

  // Static assets - Cache first, fallback to network
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        // Update cache in background (stale-while-revalidate)
        fetch(request).then(response => {
          if (response && response.status === 200) {
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, response);
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(request).then(response => {
        if (!response || response.status !== 200) {
          return response;
        }

        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(() => {
        // Return offline fallback for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        // Return 404 page for missing pages
        if (url.pathname.endsWith('.html')) {
          return caches.match('/404.html');
        }
      });
    })
  );
});

// Background sync for form submissions (if needed)
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  // Handle background form sync if needed
  console.log('Background sync for contact form');
}

// Push notifications (for future use)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update from Karthik M Portfolio',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('KM Portfolio', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
