importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js")

workbox.routing.registerRoute(
    ({ request }) => request.destination === "image",
    new workbox.strategies.CacheFirst()
);

const CACHE_VERSION = 'cache-v0.0.0'
const CACHED_URLS = [
    '/',
    '/manifest.json',
    '/images/favicon.ico',
    '/images/logo192.png',
    '/images/logo512.png',
    '/style.css'
]

// Open cache on install.
self.addEventListener('install', event => {
    event.waitUntil(async () => {
        return caches.open(CACHE_VERSION).then(cache => {
            return Promise.all(
                CACHED_URLS.map(url => {
                    return cache.add(url).catch(reason => {
                        console.log(`Failed to cache '${url}' Reason: ${reason}`);
                    });
                })
            );
        });
    })
});

// Cache and update with stale-while-revalidate policy.
self.addEventListener('fetch', event => {
    const { request } = event

    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
        return
    }

    event.respondWith(async function () {
        const cache = await caches.open(CACHE_NAME)

        const cachedResponse = await cache.match(request)
        const networkResponse = fetch(request)

        if (request.url.startsWith(self.location.origin)) {
            event.waitUntil(async function () {
                const response = await networkResponse
                await cache.put(request, response.clone())
            }())
        }

        return cachedResponse || networkResponse
    }())
})

// Clean up caches other than current.
self.addEventListener('activate', event => {
    event.waitUntil(async function () {
        const cacheNames = await caches.keys()

        await Promise.all(
            cacheNames.filter((cacheName) => {
                return cacheName !== CACHE_NAME
            }).map(cacheName => caches.delete(cacheName))
        )
    }())
})