const CACHE = 'liriano-app-v4';
const ASSETS = [
  '/app/',
  '/app/index.html',
  '/app/jobs.html',
  '/app/record.html',
  '/app/style.css',
  '/app/common.js',
  '/app/index.js',
  '/app/jobs.js',
  '/app/record.js',
  '/app/manifest.json',
  '/app/plantilla.js',
  '/app/assets/PlayfairDisplay-Bold.ttf',
  '/images/logo.webp',
  '/images/icon-192.png',
  '/images/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
