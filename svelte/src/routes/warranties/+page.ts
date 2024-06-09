import type { PageLoadEvent } from './$types';
import { resib } from '$lib/resib';

async function getOwnedWarranties(parent: PageLoadEvent['parent']) {
    const { signer } = await parent();
    if (signer === null) return [];
    return await resib.getOwnedWarranties(signer.address);
}

export async function load({ parent }) {
    return { warranties: getOwnedWarranties(parent) };
}
