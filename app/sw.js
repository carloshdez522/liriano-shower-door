const CACHE = 'liriano-app-v13';
const ASSETS = [
  '/app/',
  '/app/index.html',
  '/app/jobs.html',
  '/app/record.html',
  '/app/reviews.html',
  '/app/dashboard.html',
  '/app/dashboard.js',
  '/app/style.css',
  '/app/common.js',
  '/app/index.js',
  '/app/jobs.js',
  '/app/record.js',
  '/app/reviews.js',
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
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.pathname.startsWith('/app/api/')) {
    e.respondWith(fetch(e.request).catch(() => new Response(null, { status: 503 })));
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
