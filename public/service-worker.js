// BearBang Service Worker
// Provides offline-first functionality with cache-first strategy

const CACHE_NAME = "bearbang-v7";

// Base path for GitHub Pages (important!)
const BASE = "/bearbang101902";

// We use only the local audio file for offline support
const REAL_AUDIO = `${BASE}/audio/repeat_bang.mp3`;

// All assets to precache for offline use
// Paths with spaces are URL-encoded for safety
const PRECACHE_URLS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.webmanifest`,
  `${BASE}/src/style.css`, // optional; Vite may hash it
  `${BASE}/images/bear%20logo.png`,
  `${BASE}/icons/bear%20icon.png`,
  `${BASE}/audio/repeat_bang.mp3`,
  REAL_AUDIO
].filter(Boolean);

/**
 * Install event — precache all required assets
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.error("Failed to cache some assets:", err);
      });
    })
  );
});

/**
 * Activate event — clean up old caches
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
});

/**
 * Fetch event — serve from cache first, then network fallback
 */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // Optionally cache new GET requests
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => {
          // Fallback to index.html for navigation requests
          if (req.mode === "navigate") return caches.match(`${BASE}/index.html`);
        });
    })
  );
});
