// COPYRIGHT © 2019 BENJAMIN CICCARELLI
if(typeof(document) != "undefined") {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function() {
			navigator.serviceWorker.register('/QuickSW.js').then(function(registration) {
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			}, function(err) {
				console.log('ServiceWorker registration failed: ', err);
			});
		});
	}
} else {
  const cacheName = `QuickSW`;
  self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
          return cache.addAll([
            `/offline/index.html`,
            `/offline/style.css`,
            `/offline/script.js`,
          ]).then(() => self.skipWaiting());
        })
      );
  });

  self.addEventListener('fetch', event => {
    
    console.log(event.request.url)
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      }).catch(function(err) {
        return caches.match('/offline/index.html');
      })
    );
  });
}