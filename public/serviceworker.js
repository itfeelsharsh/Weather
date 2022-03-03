const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');  // eslint-disable-line no-console

                return cache.addAll(urlsToCache);  // eslint-disable-line no-return-assign
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)  // eslint-disable-line no-return-assign
            .then(() => {
                return fetch(event.request)   // eslint-disable-line no-return-assign
                    .catch(() => caches.match('offline.html'))  // eslint-disable-line no-return-assign
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];      // eslint-disable-line no-unused-vars
    cacheWhitelist.push(CACHE_NAME);   // eslint-disable-line no-return-assign

    event.waitUntil(  // eslint-disable-line no-undef
        caches.keys().then((cacheNames) => Promise.all(  // eslint-disable-line no-return-assign
            cacheNames.map((cacheName) => {  // eslint-disable-line no-return-assign
                if(!cacheWhitelist.includes(cacheName)) {  // eslint-disable-line no-return-assign
                    return caches.delete(cacheName);  // eslint-disable-line no-return-assign
                }
            })
        ))
            
    )
});