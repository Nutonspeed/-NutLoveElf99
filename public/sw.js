self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  const { title, options } = event.data || {};
  if (title) {
    self.registration.showNotification(title, options || {});
  }
});
