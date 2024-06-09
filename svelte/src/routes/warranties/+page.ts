import type { PageLoadEvent } from './$types';
import { resib } from '$lib/resib';

async function getOwnedWarranties(parent: PageLoadEvent['parent']) {
    const { signer } = await parent();
    return signer === null ? [] : await resib.getOwnedWarranties(signer.address);
}

export async function load({ parent }) {
    return { warranties: getOwnedWarranties(parent) };
}
