import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import { join } from 'node:path';
import { skeleton } from '@skeletonlabs/tw-plugin';


export default {
    darkMode: 'selector',
    plugins: [skeleton({ themes: { preset: ['wintry'] } }), forms],
    content: [
        './src/**/*.{css,html,js,svelte,ts}',
        // eslint-disable-next-line no-undef
        join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
    ],
} satisfies Config;
