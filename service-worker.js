// Firebase Cloud Messaging support
// Self-hosted, same version as the page (was 10.8.0 from gstatic)
importScripts('./vendor/firebase-10.14.1/firebase-app-compat.js');
importScripts('./vendor/firebase-10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB4B4WY32oMm39_W_Nm67_Lvklf27g423w",
  authDomain: "questgains.firebaseapp.com",
  projectId: "questgains",
  storageBucket: "questgains.firebasestorage.app",
  messagingSenderId: "830471147283",
  appId: "1:830471147283:web:d70dfd9b177c1de31e54e6"
});

const messaging = firebase.messaging();

// Background message handler (when app is not in foreground)
messaging.onBackgroundMessage(function(payload) {
  const n = payload.notification || {};
  const title = n.title || 'QuestGains';
  const options = {
    body: n.body || '',
    icon: '/questgains/logo.png',
    badge: '/questgains/favicon.png',
    vibrate: [200, 100, 200],
    tag: payload.data?.tag || 'questgains',
    data: { url: payload.data?.url || '/questgains/' }
  };
  return self.registration.showNotification(title, options);
});


/*
 * QuestGains service worker
 * Cache-first app shell and sprite assets for offline support.
 */
const CACHE_NAME = 'questgains-v29';          // core shell (bump on every release)
const RUNTIME_CACHE = 'questgains-runtime-v1';  // sprites / images / CDN — survives shell bumps
const KEEP_CACHES = [CACHE_NAME, RUNTIME_CACHE];

// Core shell only. Everything here is same-origin, so one flaky third-party
// host can no longer fail the whole install.
const PRECACHE_URLS = [
  './', './index.html', './style.css', './manifest.json',
  './escape.js', './firebase-config.js', './db.js', './username.js', './subscription.js',
  './notifications.js', './social.js', './auth.js', './data.js', './app.js',
  './logo.png', './favicon.png', './apple-touch-icon.png',
  './vendor/firebase-10.14.1/firebase-app-compat.js',
  './vendor/firebase-10.14.1/firebase-auth-compat.js',
  './vendor/firebase-10.14.1/firebase-firestore-compat.js',
  './vendor/firebase-10.14.1/firebase-messaging-compat.js',
  './vendor/chartjs-4.4.1/chart.umd.min.js',
  './vendor/zxing-0.21.3/index.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Cache each URL independently: a single 404 is logged, not fatal.
    const results = await Promise.allSettled(
      PRECACHE_URLS.map((u) => cache.add(new Request(u, { cache: 'reload' })))
    );
    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error('[SW] precache failed:', PRECACHE_URLS[i], r.reason);
    });
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((n) => !KEEP_CACHES.includes(n)).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

// App shell: network-first, fall back to cache.
const APP_SHELL = PRECACHE_URLS.filter((u) => u !== './').concat(['./service-worker.js']);

function isAppShell(url) {
  const u = new URL(url);
  if (u.origin !== self.location.origin) return false;
  const path = u.pathname;
  return APP_SHELL.some((f) => path.endsWith(f.replace('./', '/'))) ||
    path.endsWith('/questgains/') || path.endsWith('/questgains');
}

// Sprites / exercise images / fonts: cache on first use, stale-while-revalidate.
function isRuntimeAsset(url) {
  const u = new URL(url);
  return /\/sprites\/[^/]+\.png$/.test(u.pathname) ||
    /\.(png|jpe?g|webp|gif|svg|woff2?)$/i.test(u.pathname) ||
    u.hostname === 'raw.githubusercontent.com';
}

function staleWhileRevalidate(event) {
  return caches.open(RUNTIME_CACHE).then((cache) =>
    cache.match(event.request).then((cached) => {
      const network = fetch(event.request).then((res) => {
        if (res && (res.status === 200 || res.type === 'opaque')) cache.put(event.request, res.clone());
        return res;
      }).catch(() => cached);
      if (cached) { event.waitUntil(network); return cached; }
      return network;
    })
  );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = req.url;
  if (!url.startsWith('http')) return;
  // Never cache Firebase/Firestore/Functions/Stripe API traffic.
  if (/googleapis\.com|firebaseio\.com|cloudfunctions\.net|stripe\.com|identitytoolkit/.test(url)) return;

  if (req.mode === 'navigate' || isAppShell(url)) {
    event.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, clone));
        }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true })
        .then((r) => r || (req.mode === 'navigate' ? caches.match('./index.html') : undefined)))
    );
    return;
  }

  if (isRuntimeAsset(url)) {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }
  // Everything else: straight to network (browser HTTP cache applies).
});
