/* ARQUIVO: sw.js */

// Toda vez que você mudar o código da calculadora, mude esse número (ex: v4, v5...)
const CACHE_NAME = 'neurocalc-v4';

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json'
];

// 1. INSTALAÇÃO: Baixa os arquivos e força a atualização
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting()) 
  );
});

// 2. ATIVAÇÃO: Limpa caches antigos (V1, V2, V3) e assume o controle
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Limpando cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. BUSCA: Tenta carregar do cache, se não conseguir, busca na rede
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
