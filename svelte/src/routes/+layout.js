import { provider } from '$lib/resib';

export const prerender = true;
export const trailingSlash = 'always';

export async function load() {
    const signer = provider === null ? null : await provider.getSigner();
    return { signer };
}
