<script>
    import { ExclamationCircle } from '@steeze-ui/heroicons';
    import { Icon } from '@steeze-ui/svelte-icon';
</script>

<div class="alert variant-soft-error flex flex-row items-center gap-x-2">
    <Icon src={ExclamationCircle} class="size-8" />
    <div class="!mt-0 contents">
        <slot />
    </div>
</div>
