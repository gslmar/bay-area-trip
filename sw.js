// Offline copy of the itinerary for patchy mainland connections.
// Pages come from the network when it answers and from the cache when it doesn't; the cache refreshes on every successful load.
const CACHE="bay-trip-v3";
const FILES=["./","index.html","style.css","app.js","manifest.webmanifest","icon-192.png",
  "fonts/baloo-2.woff2","fonts/jetbrains-mono.woff2","fonts/noto-sans.woff2","fonts/noto-sans-sc.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy))}return res})
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("index.html"):Response.error()))));
});
