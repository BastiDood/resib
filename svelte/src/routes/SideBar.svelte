<script>
    import { AppRail, AppRailAnchor, LightSwitch } from '@skeletonlabs/skeleton';
    import { Home } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { page } from '$app/stores';

    import logoWithText from '$lib/logo/logo-with-text.svg';

    $: ({ pathname } = $page.url);
</script>

<AppRail width="w-20">
    <div slot="lead" class="my-4 flex items-center justify-center">
        <LightSwitch />
    </div>
    <AppRailAnchor href="/" selected={pathname === '/'}>
        <Icon src={Home} slot="lead" class="size-8" />
        <span>Home</span>
    </AppRailAnchor>
    <img src={logoWithText} alt="Resib Shield Logo" slot="trail" class="block bg-transparent p-4 dark:bg-white" />
</AppRail>
