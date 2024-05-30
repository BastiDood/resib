<script>
    import './app.css';
    import { AppShell, setInitialClassState } from '@skeletonlabs/skeleton';
    import SideBar from './SideBar.svelte';
    import { browser } from '$app/environment';

    // HACK: Workaround for Skeleton not setting the dark mode for SPAs.
    if (browser) setInitialClassState();
</script>

<AppShell>
    <SideBar slot="sidebarLeft" />
    <slot />
</AppShell>
