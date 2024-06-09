import Resib from '$lib/resib';
import { browser } from '$app/environment';

async function getStores() {
    return browser ? await Resib.getStores() : [];
}

export function load() {
    return { stores: getStores() };
}
