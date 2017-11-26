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