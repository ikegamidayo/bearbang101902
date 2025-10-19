// BearBang Service Worker
// Provides offline-first functionality with cache-first strategy

const CACHE_NAME = "bearbang-v1";

// Replace this with your actual GitHub raw audio file URL
const REAL_AUDIO = "https://https://github.com/ikegamidayo/bearbang101902/raw/refs/heads/main/public/audio/repeat_bang.mp3";

// All assets to precache for offline use
// Paths with spaces are URL-encoded for safety
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/src/style.css",
  "/images/bear%20logo.png",
  "/icons/bear%20icon.png",
  "/audio/repeat_bang.mp3",
  REAL_AUDIO
].filter(Boolean);

/**
 * Install event - precache all required assets
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.error("Failed to cache some assets:", err);
        // Continue even if some assets fail to cache
      });
    })
  );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k)))
      )
    )
  );
});

/**
 * Fetch event - cache-first strategy with network fallback
 * Caches GET requests dynamically for offline use
 */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  event.respondWith(
    caches.match(req).then((cached) => {
      // Return cached response if available
      if (cached) {
        return cached;
      }

      // Otherwise fetch from network
      return fetch(req)
        .then((res) => {
          // Cache successful GET requests for future offline use
          if (req.method === "GET" && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, copy);
            });
          }
          return res;
        })
        .catch(() => {
          // For navigation requests, return index.html as fallback
          if (req.mode === "navigate") {
            return caches.match("/index.html");
          }
          // For other requests, throw error (no fallback available)
          throw new Error("Network request failed and no cache available");
        });
    })
  );
});
