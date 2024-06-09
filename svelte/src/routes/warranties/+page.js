import { browser } from '$app/environment';
import { resib } from '$lib/resib';

async function getOwnedWarranties() {
    return browser ? await resib.getOwnedWarranties() : [];
}

export function load() {
    return { warranties: getOwnedWarranties() };
}
