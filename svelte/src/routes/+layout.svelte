<script>
    import './app.css';
    import { AppShell, setInitialClassState } from '@skeletonlabs/skeleton';
    import SideBar from './SideBar.svelte';
    import { browser } from '$app/environment';

    import favicon from '$lib/favicon/favicon.ico?url';
    import favicon16 from '$lib/favicon/favicon-16x16.png?url';
    import favicon32 from '$lib/favicon/favicon-32x32.png?url';
    import favicon180 from '$lib/favicon/apple-touch-icon.png?url';

    // HACK: Workaround for Skeleton not setting the dark mode for SPAs.
    if (browser) setInitialClassState();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
    <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
    <link rel="apple-touch-icon" sizes="180x180" href={favicon180} />
</svelte:head>

<AppShell>
    <SideBar slot="sidebarLeft" />
    <slot />
</AppShell>
