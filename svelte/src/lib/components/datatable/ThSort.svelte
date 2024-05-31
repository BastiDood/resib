<script lang="ts">
    import { ArrowsUpDown, BarsArrowDown, BarsArrowUp } from '@steeze-ui/heroicons';
    import type { DataHandler } from '@vincjo/datatables';
    import { Icon } from '@steeze-ui/svelte-icon';
    import type data from '$lib/datatable/data';

    type Data = (typeof data)[number];
    // eslint-disable-next-line init-declarations
    export let handler: DataHandler<Data>;
    // eslint-disable-next-line init-declarations
    export let orderBy: keyof Data;

    const sorted = handler.getSort();
    $: ({ direction, identifier } = $sorted);
</script>

<th on:click={() => handler.sort(orderBy)} class="cursor-pointer select-none">
    <div class="flex h-full items-center justify-start gap-x-2">
        <slot />
        <span>
            {#if identifier === orderBy}
                {#if direction === 'asc'}
                    <Icon src={BarsArrowDown} theme="micro" class="size-4" />
                {:else if direction === 'desc'}
                    <Icon src={BarsArrowUp} theme="micro" class="size-4" />
                {/if}
            {:else}
                <Icon src={ArrowsUpDown} theme="micro" class="size-4" />
            {/if}
        </span>
    </div>
</th>
