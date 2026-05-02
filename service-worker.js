/*
 * QuestGains service worker
 * Cache-first app shell and sprite assets for offline support.
 */
const CACHE_NAME = 'questgains-v14';
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
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

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
