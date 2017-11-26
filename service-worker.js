/* eslint-disable */
const APPSHELL_CACHE_NAME = 'dailyRusk-appshell-v1';
const MEDIA_CACHE_NAME = 'dailyRusk-media';

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
        caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('dailyRusk') && key !== APPSHELL_CACHE_NAME && key !== MEDIA_CACHE_NAME).map(key => caches.delete(key))))
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.url.endsWith('.jpg')) {
        event.respondWith(
            caches.open(MEDIA_CACHE_NAME).then((cache) =>
                cache.match(request).then((imgresponse) => {
                    if (imgresponse) return imgresponse;

                    return fetch(request).then((img) => {
                        cache.put(request, img.clone());
                        return img;
                    })
                })
            )
        )
    } else {
        event.respondWith(
            caches.match(event.request).then((response) => {
                if (response) return response;
                return fetch(event.request);
            })
        );
    }
});

self.addEventListener('message', (event) => {
    if (event.data.skipWaiting) {
        self.skipWaiting();
    }
});