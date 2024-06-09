import { browser } from '$app/environment';
import { resib } from '$lib/resib';

/** @param {string} store */
async function getProductsByStoreId(store) {
    return browser ? await resib.getProductsByStoreId(store) : [];
}

export function load({ params: { store } }) {
    return { storeId: parseInt(store, 10), products: getProductsByStoreId(store) };
}
