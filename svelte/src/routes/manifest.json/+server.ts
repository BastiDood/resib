import type { WebAppManifest } from 'web-app-manifest';
import { json } from '@sveltejs/kit';

import icon192 from '$lib/favicon/android-chrome-192x192.png?url';
import icon512 from '$lib/favicon/android-chrome-512x512.png?url';

export const prerender = true;

export function GET() {
    return json({
        name: 'Resib',
        display: 'standalone',
        theme_color: '#2f2d32',
        background_color: '#ffffff',
        start_url: '/',
        icons: [
            { type: 'image/png', sizes: '192x192', src: icon192 },
            { type: 'image/png', sizes: '512x512', src: icon512 },
        ],
    } satisfies WebAppManifest);
}
