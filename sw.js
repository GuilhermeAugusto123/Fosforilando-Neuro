const CACHE_NAME = 'neurocalc-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './calculadoras/asrs18.js',
  './calculadoras/cdr.js',
  './calculadoras/chads.js',
  './calculadoras/corticoides.js',
  './calculadoras/funcao_renal.js',
  './calculadoras/hasbled.js',
  './calculadoras/hipernatremia.js',
  './calculadoras/hiponatremia.js',
  './calculadoras/relogio.js',
  './calculadoras/sodio.js', // (Se ainda estiver usando)
  './calculadoras/meen.js',  // (Se tiver)
  './calculadoras/nihss.js'  // (Se tiver)
  // Adicione aqui outros arquivos se criar (ex: dva.js)
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});