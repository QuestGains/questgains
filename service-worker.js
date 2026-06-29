// Firebase Cloud Messaging support
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

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
const CACHE_NAME = 'questgains-v25';  // bumped for build 77 — forces SW reinstall + full cache purge
const PRECACHE_URLS = [
  './index.html',
  './firebase-config.js',
  './auth.js',
  './db.js',
  './style.css',
  './app.js',
  './data.js',
  './manifest.json',
  './logo.png',
  './favicon.png',
  './apple-touch-icon.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-aegis-ward.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-astravault.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-brookeflame.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-crownvolt.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-dreadvane.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-duskrender.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-emberveil.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-fangshade.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-freelash.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-goliath-rift.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-gravebulk.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-hexara.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-inevitor.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-iron-vanguard.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-ironwraith.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-lunabelle.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-mad-crown.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-magnetar-reign.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-mimicrow-2.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-mimicrow.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-mythara.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-nightwarden.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-onyx-koro.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-plainstrike.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-razorfen.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-red-mirth.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-riftmage.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-riftron.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-sagebloom.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-solaris-prime.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-stormforged.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-sunscarab.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-threadstrike.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-thunderion.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-tideshard.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-umbrafang.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-valorgiant.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-voidmonk.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-voltflare.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-willlume.png',
  'https://raw.githubusercontent.com/QuestGains/questgains/main/sprites/sprite-wyrmvolt.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        console.log('[SW] activate — caches found:', cacheNames);
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log('[SW] deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] old caches purged, claiming clients');
        return self.clients.claim();
      })
  );
});

// App shell files — always try network first, fall back to cache
const APP_SHELL = [
  './index.html', './app.js', './data.js', './style.css',
  './auth.js', './db.js', './firebase-config.js', './manifest.json',
  './logo.png', './favicon.png', './apple-touch-icon.png', './service-worker.js',
  './subscription.js', './username.js', './notifications.js', './social.js'
];

function isAppShell(url) {
  // Strip query string before matching so versioned URLs (e.g. subscription.js?v=73)
  // are treated as app shell and fetched network-first.
  const urlWithoutQuery = url.split('?')[0];
  return APP_SHELL.some(file => urlWithoutQuery.endsWith(file.replace('./', '/'))) ||
    url.endsWith('/questgains/') || url.endsWith('/questgains');
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // Network-first for app shell — always get latest version
  if (isAppShell(url)) {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for sprites and other assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        return networkResponse;
      });
    })
  );
});