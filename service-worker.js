const CACHE_NAME = "pwaawp-v1";
let urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/portfolio.html",
  "/pages/contact.html",
  "/css/style.css",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/script.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
  "/assets/font/poppins/Poppins-Medium.ttf",
  "/assets/font/poppins/Poppins-Regular.ttf",
  "/assets/img/icon/apple-touch-icon.png",
  "/assets/img/icon/fa.jpg",
  "/assets/img/icon/icon192.png",
  "/assets/img/icon/icon2192.png",
  "/assets/img/icon/icon512.png",
  "/assets/img/icon/icon2512.png",
  "/assets/img/courses/bwa.png",
  "/assets/img/courses/cisco.png",
  "/assets/img/courses/dicoding.png",
  "/assets/img/courses/sk.png",
  "/assets/img/project/movie-sap.png",
  "/assets/img/project/socah.png",
  "/assets/img/project/bangkalan.png",
  "/assets/img/bg-img3.jpg",
  "/assets/img/profil.jpg",
  "/assets/img/setyo.jpg",
  "/assets/img/utm-min.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
    .match(event.request, {
      cacheName: CACHE_NAME
    })
    .then(function (response) {
      if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});