var CACHE_NAME = 'covid19-pwa'
var urlstoCache = [
    '/'
];

self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response){
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activete', event => {
    var cacheWhitelist = ['pwa-task-manager'];
    event.waitUntil(
        caches.keys().then(cachesNames =>{
            return Promise.all(
                cachesNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1){
                        return caches.delete(cacheName)
                    }
                })
            );
        })
    );
});