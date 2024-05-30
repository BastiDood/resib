/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, prerendered, version } from '$service-worker';

/** @see https://kit.svelte.dev/docs/service-workers */
const sw = self as unknown as ServiceWorkerGlobalScope;

async function addFilesToCache() {
    const cache = await caches.open(version);
    await cache.addAll(build.concat(files).concat(prerendered));
    await sw.skipWaiting();
}

async function deleteOldCache() {
    const keys = new Set(await caches.keys());
    if (keys.delete(version)) console.log(`deleting existing at ${version}`);
    const promises = Array.from(keys, k => caches.delete(k));
    const results = await Promise.all(promises);
    if (results.every(x => x)) return;
    console.warn('cannot delete all of the old caches');
}

async function fetchCacheFirst(req: Request) {
    const cache = await caches.open(version);
    const res = await cache.match(req);
    return res ?? fetch(req);
}

sw.addEventListener('install', evt => evt.waitUntil(addFilesToCache()));
sw.addEventListener('activate', evt => evt.waitUntil(deleteOldCache()));
sw.addEventListener('fetch', evt => evt.respondWith(fetchCacheFirst(evt.request)));
