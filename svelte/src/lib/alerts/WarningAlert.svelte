<script>
    import { ExclamationTriangle } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
</script>

<div class="alert variant-soft-warning flex flex-row items-center gap-x-2">
    <Icon src={ExclamationTriangle} class="size-8" />
    <div class="!mt-0 contents">
        <slot />
    </div>
</div>
