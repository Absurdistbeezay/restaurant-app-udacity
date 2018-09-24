let cacheUrls = [
  "./",
  "./index.html",
  "./restaurant.html",
  "./css/styles.css",
  "./js/main.js",
  "./js/restaurant_info.js",
  "./js/dbhelper.js",
  "./js/sw_registration.js",
  "./data/restaurants.json",
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("restaurant").then(cache => {
      return cache
        .addAll(cacheUrls)
        .then(() => console.log("Caching finished!"))
        .catch(err => console.log(err));
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Service worker activate");
});

self.addEventListener("fetch", event => {
  // For Google maps API, don't use service worker
  if (event.request.url.indexOf("maps.googleapis.com") !== -1) return;

  event.respondWith(
    caches.open("restaurant").then(cache => {
      return cache.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          })
        );
      });
    })
  );
});
