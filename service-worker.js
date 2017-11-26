/* eslint-disable */
const APPSHELL_CACHE_NAME = 'dailyRusk-appshell-v1';

const urlsToCache = [
    '/',
    '/app.js',
    '/style.bundle.css',
    '/images/rusk_logo.png',
    'https://fonts.googleapis.com/css?family=Inconsolata|Montserrat',    
  ];

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(APPSHELL_CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('dailyRusk') && key !== APPSHELL_CACHE_NAME).map(key => caches.delete(key))))
    );
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
      );   
  });