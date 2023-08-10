const CACHE_NAME = "v3.11";

//installs the service worker which then saves the files used by the game into the cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                './favicon.ico',
                './index.html',
                './script.js',
                './style.css',
				'./icon-512x512.png'
            ])
        })
    )
});

//The service worker listens to all the fetch calls and returns the files if they're present in cache or fetches it from repository
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(resp => {
            return resp || fetch(event.request).then(response => {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
        })
    )
});

//Following cleans up old cache in case if there's any upgrade in the app
self.addEventListener('activate', event => {
    const whiteList = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if(whiteList.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    )
});