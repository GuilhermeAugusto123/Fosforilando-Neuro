/* ARQUIVO: sw.js */

// Mudei para v2 para forçar seu celular a atualizar o cache antigo
const CACHE_NAME = 'neurocalc-v2';

// Aqui só colocamos o que TEM CERTEZA que existe.
// Se faltar um arquivo aqui, o app não instala.
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json'
  // Removi os .js individuais para evitar erros de arquivo não encontrado.
  // O navegador vai fazer cache deles automaticamente quando você usar.
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting()) // Força o SW a ativar imediatamente
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim()); // Controla a página imediatamente
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
