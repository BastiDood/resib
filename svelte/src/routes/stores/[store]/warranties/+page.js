import { browser } from '$app/environment';
import { resib } from '$lib/resib';

/** @param {string} store */
async function getWarrantiesByStoreId(store) {
    return browser ? await resib.getWarrantiesByStoreId(store) : [];
}

export function load({ params: { store } }) {
    return { warranties: getWarrantiesByStoreId(store) };
}
