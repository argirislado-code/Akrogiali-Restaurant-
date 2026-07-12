// This service worker intentionally does nothing and removes itself.
// An earlier version cached the app aggressively, which caused users
// to keep seeing outdated versions after updates. This file exists only
// so any already-registered service worker unregisters itself.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  await self.registration.unregister();
  const clientsList = await self.clients.matchAll();
  clientsList.forEach(client => client.navigate(client.url));
});
