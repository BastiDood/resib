import { browser } from '$app/environment';
import { resib } from '$lib/resib';

async function getStores() {
    return browser ? await resib.getStores() : [];
}

export function load() {
    return { stores: getStores() };
}
