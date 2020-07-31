if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let s = Promise.resolve();
      return (
        a[e] ||
          (s = new Promise(async (s) => {
            if ("document" in self) {
              const a = document.createElement("script");
              (a.src = e), document.head.appendChild(a), (a.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!a[e]) throw new Error(`Module ${e} didn’t register its module`);
          return a[e];
        })
      );
    },
    s = (s, a) => {
      Promise.all(s.map(e)).then((e) => a(1 === e.length ? e[0] : e));
    },
    a = { require: Promise.resolve(s) };
  self.define = (s, c, t) => {
    a[s] ||
      (a[s] = Promise.resolve().then(() => {
        let a = {};
        const i = { uri: location.origin + s.slice(1) };
        return Promise.all(
          c.map((s) => {
            switch (s) {
              case "exports":
                return a;
              case "module":
                return i;
              default:
                return e(s);
            }
          })
        ).then((e) => {
          const s = t(...e);
          return a.default || (a.default = s), a;
        });
      }));
  };
}
define("./sw.js", ["./workbox-4d0bff02"], function (e) {
  "use strict";
  importScripts(),
    e.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/", revision: "gP5J6ckylAg9d-h_V8WEb" },
        {
          url:
            "/_next/static/chunks/13c36533b8520d39adb372abb27cf71b3e035621.0f89f76c2f7af0b9d729.js",
          revision: "912edeeb6babe76ebc7f1b29231ed4db",
        },
        {
          url: "/_next/static/chunks/75fc9c18.a44e5298d9595a719b2f.js",
          revision: "d85f25cd444da030a4283049b174e5e1",
        },
        {
          url:
            "/_next/static/chunks/7d91aacc23e80f506ce215f16189bb016fe4832f.d14120358a9cec7bb7f3.js",
          revision: "d88f99c52f9ef400ce139337700657a0",
        },
        {
          url:
            "/_next/static/chunks/8c6836b8577ae7a5eb5ab02d9f1852350ac8da42.874659c39531e89d23f8.js",
          revision: "ad54e3004491dab7926672330958b173",
        },
        {
          url: "/_next/static/chunks/b637e9a5.0ef89d2cd86f4921c1e7.js",
          revision: "99d2f3802e442e6f19dcd8cca1b3a339",
        },
        {
          url: "/_next/static/chunks/commons.81670384df224998fa55.js",
          revision: "582735701035130f5a892c531747c32c",
        },
        {
          url:
            "/_next/static/chunks/e0aeba6c25bdac8089646cf6f61da61f12ddd286.96481406c9a129c30d4b.js",
          revision: "77722b3eedc6f2c0626cfa45dafd8107",
        },
        {
          url:
            "/_next/static/chunks/f74f310c924bc9d57a0dc6ef0af314847e84ddc2.5b241da6d1da6a14bbf9.js",
          revision: "5a93e65253dd065842443fa16fb4345e",
        },
        {
          url: "/_next/static/chunks/framework.619a4f70c1d4d3a29cbc.js",
          revision: "8e6204793e3d11a8bedf359bfb6e110d",
        },
        {
          url: "/_next/static/css/0d99c403cad8a67d254b.css",
          revision: "c2d5e051c7d2271fb5bb6cdf9c95ca60",
        },
        {
          url: "/_next/static/css/19fe0c0b555fa12d7b85.css",
          revision: "f16d52af6c131d477fbf65fafa3ab347",
        },
        {
          url: "/_next/static/css/317e09171482beee61ee.css",
          revision: "61989e2074f192a41b1a14356ccc5f96",
        },
        {
          url: "/_next/static/css/458ea0e5bf68061f8bb7.css",
          revision: "bf2c404bfa15e909d6e83d865eafd2ac",
        },
        {
          url: "/_next/static/css/5e3e0736a53c7f91901d.css",
          revision: "23810812ed6dfea6c1e2d95b945ab26a",
        },
        {
          url: "/_next/static/css/604a1c15c4ea30a88376.css",
          revision: "e11ce61fbc0a68ce9393a1f547a32724",
        },
        {
          url: "/_next/static/css/64b9c904b3df49ca2a15.css",
          revision: "bd2195d3d324e4c3c817333d4996aa6e",
        },
        {
          url: "/_next/static/css/6ab75f929f6aaffde295.css",
          revision: "e964839a3f1d9e0e5ebdd3ee3467c969",
        },
        {
          url: "/_next/static/css/d5a44b8378320f977747.css",
          revision: "116538d43e01df6aa3cd2933d7cb2e4e",
        },
        {
          url: "/_next/static/css/d645cc3a33591c31db6a.css",
          revision: "52f8058d9628668ab553e8abb2ea2a2d",
        },
        {
          url: "/_next/static/css/f0517e1a5c71018e7414.css",
          revision: "cfc112f243688e94a91d9f7226ce5b36",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/_buildManifest.js",
          revision: "5ca5056332a115b45bd13a376406ef20",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/_ssgManifest.js",
          revision: "abee47769bf307639ace4945f9cfd4ff",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/_app.js",
          revision: "4d1c1ab750b4c469b5ba687787228981",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/_error.js",
          revision: "11f4e86bb3f7d73c316c860f31541321",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/create-new-desire.js",
          revision: "0d86079d6188ef05397f9f2545565959",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/addOffer/%5Bid%5D.js",
          revision: "5a36075824dfad511e327cc04b46b2ee",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/admin.js",
          revision: "d9e94cdc59f744e1ad108f8c5332a851",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/desire/%5Bid%5D.js",
          revision: "ccf7bd1ca77818806cdec28746a5ea90",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/favorites.js",
          revision: "6325e84ded08ca125ec7c7b9faf2ea1d",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/index.js",
          revision: "87d7d0e1abf6cf5b30bac87f5d521099",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/login.js",
          revision: "cfea5537620fdde5766860340a821786",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/myDesires.js",
          revision: "11906fb824183d0c3dc62942cddf2eea",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/myOffers.js",
          revision: "640e090dfac0c1d3ca8d3a427648abb2",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/updateDesire.js",
          revision: "0647e7b755cd555ad62b17d3dd525c75",
        },
        {
          url: "/_next/static/gP5J6ckylAg9d-h_V8WEb/pages/updateOffer.js",
          revision: "2263d673a2e88cdc7474ab3e32dbb64f",
        },
        {
          url: "/_next/static/images/chat-e27bbe3e9346fb0bf3aac62d507fa248.png",
          revision: "4a14646a1e697bfc017937eb401cc663",
        },
        {
          url: "/_next/static/runtime/main-748e5016394c795a1803.js",
          revision: "23b744a2a44cb51ae010fb6812fdf607",
        },
        {
          url: "/_next/static/runtime/polyfills-979172ebaa81101d572a.js",
          revision: "51f1c2955c0eb41a9ac8a371d9787a1f",
        },
        {
          url: "/_next/static/runtime/webpack-1c5199ff66550d26e499.js",
          revision: "40b4095b5b68a142c856f388ccb756f2",
        },
        { url: "/favicon.ico", revision: "21b739d43fcb9bbb83d8541fe4fe88fa" },
        { url: "/vercel.svg", revision: "4b4f1876502eb6721764637fe5c41702" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/use\.fontawesome\.com\/releases\/.*/i,
      new e.CacheFirst({
        cacheName: "font-awesome",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "POST"
    ),
    e.registerRoute(
      /.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "others",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    );
});
