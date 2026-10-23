/* =====================================================================
   Service worker: lets the sites install as an app and keep working in
   the stands on a bad connection. Pages, scripts and data always come
   from the network first (so scores are never stale) and fall back to
   the saved copy; images and fonts come from the saved copy first.
   Bump VERSION to clear old saved copies.
   ===================================================================== */
const VERSION = "dfa-v1";
const CORE = [
  "/", "/offline.html", "/css/home.css", "/js/home.js", "/js/common.js",
  "/images/falcons-logo.png", "/images/icons/icon-192.png", "/manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const save = (req, res) => {
  if (res && (res.ok || res.type === "opaque")) {
    const copy = res.clone();
    caches.open(VERSION).then((c) => c.put(req, copy));
  }
  return res;
};

/* Network first, with a time limit so a weak signal falls back to the saved copy quickly */
function fresh(req, fallback) {
  const net = fetch(req).then((res) => save(req, res));
  const timer = new Promise((resolve) => setTimeout(resolve, 4000));
  return Promise.race([net, timer.then(() => caches.match(req).then((hit) => hit || net))])
    .catch(() => caches.match(req))
    .then((res) => res || (fallback ? caches.match(fallback) : undefined) || net);
}

/* Saved copy first, refreshed in the background */
function saved(req) {
  return caches.match(req).then((hit) => {
    const net = fetch(req).then((res) => save(req, res)).catch(() => hit);
    return hit || net;
  });
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !fonts) return;   // other sites: leave alone
  if (req.mode === "navigate") return e.respondWith(fresh(req, "/offline.html"));
  if (fonts || /\.(png|jpe?g|webp|svg|gif|woff2?)$/.test(url.pathname)) return e.respondWith(saved(req));
  e.respondWith(fresh(req));
});
