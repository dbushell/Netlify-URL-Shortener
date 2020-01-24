importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);

workbox.core.setCacheNameDetails({
  runtime: 'runtime',
  precache: 'precache',
  prefix: 'eavesdrop',
  suffix: 'v0.1.0'
});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([
  {
    url: 'index.html',
    revision: 'v0.1.1'
  },
  {
    url: 'assets/app.css?v=0.1.0'
  },
  {
    url: 'assets/app.min.js?v=0.1.0'
  }
]);

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(
  /^\/$/,
  new workbox.strategies.StaleWhileRevalidate(),
  'GET'
);

workbox.routing.registerRoute(
  /.(css|js)(\?v=([\d]+\.[\d]+\.[\d]+))?$/,
  new workbox.strategies.StaleWhileRevalidate(),
  'GET'
);

workbox.routing.registerRoute(
  /.(?:gif|jpeg|jpg|png|svg)(\?v=([\d]+\.[\d]+\.[\d]+))?$/,
  new workbox.strategies.CacheFirst(),
  'GET'
);

workbox.routing.registerRoute(
  /https:\/\/(.*?).?(typekit|unpkg).[a-z]{3}\/(.*)/,
  new workbox.strategies.CacheFirst({
    plugins: [new workbox.cacheableResponse.Plugin({statuses: [0, 200]})]
  }),
  'GET'
);
