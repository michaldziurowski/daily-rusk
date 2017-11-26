self.addEventListener('install', (event) => {
    /*
    open cache with choosen name (caches.open) in the promise it returns add all necessary urls to cache
    this will give you Promise
    use that promise as a parameter in event.waitUntil
    */
});

self.addEventListener('fetch', (event) => {
    /*
    match in caaches request (event.request) if request is found return it if not fetch for request (fetch(event.request))
    this will give you Promise
    use that promise as a paramenter in event.respondWith 
    */
});
