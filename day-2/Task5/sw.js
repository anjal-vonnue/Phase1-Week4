//link: https://googlechrome.github.io/samples/service-worker/basic/
//link: https://web.dev/learn/pwa/service-workers
//link: https://medium.com/paypal-tech/intro-to-javascript-service-workers-43298c365549
//link: https://dev.to/hongster85/service-workers-understand-in-3-minutes-2m7m
//link: https://pwa-workshop.js.org/2-service-worker/#service-worker-life-cycle

let CACHE_NAME = "sw-cache-v1";
let filesToCache = [
  "./",
  "./index.html",
  "./main.js",
  "./style.css",
  "./image_one.jpg",
  "./image_two.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened Cache");
      return cache.addAll(filesToCache);
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter((cacheName) => cacheName !== CACHE_NAME);
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          }),
        );
      }),
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(fetch(request));
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error("network request failed:", error);
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error("api network request failed:", error);

    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }
  }
}
