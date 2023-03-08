'use strict'
// Use the install event to pre-cache all initial resources.
// source == https://learn.microsoft.com/de-de/microsoft-edge/progressive-web-apps-chromium/how-to/
const CACHE_NAME = `TAGEBUCHTEST_V1`;
// self TEST:
console.log("SELF_sw:",self);
// servicWorker registrieren:
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(a => document.getElementById("anzeige").innerHTML = "Service worker registriert!!\n" + a);
    console.log(navigator);
}


self.addEventListener('install', event => {
    console.log("sw Install EVENT: ",event);
    event.waitUntil((async () => { 
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',      
    ]);
    console.log("Install EVENT done, cache opend: ", cache);
  })());
});

self.addEventListener('fetch', event => {
    console.log("sw fetch EVENT: ",event);

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        // Get the resource from the cache.
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                // If the resource was not in the cache, try the network.
                const fetchResponse = await fetch(event.request);

                // Save the resource in the cache and return it.
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                console.error("SW FEHLER:",e);
            }
        }
    })());
});

self.addEventListener('activate', event => {
    console.log("sw activate EVENT: ",event);
    // clients.claim().then(...) --> damit der sw beim ersten pageload schon richtig arbeitet! 
});

self.addEventListener('message', event => {
    console.log("sw message EVENT: ", event);

});
self.addEventListener('install',event=>{
    console.log("sw install EVENT: ", event);
})

