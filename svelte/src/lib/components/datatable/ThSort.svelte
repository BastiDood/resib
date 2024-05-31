<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables';
    import type data from '$lib/datatable/data';

    type Data = (typeof data)[number];
    // eslint-disable-next-line init-declarations
    export let handler: DataHandler<Data>;
    // eslint-disable-next-line init-declarations
    export let orderBy: keyof Data;

    const sorted = handler.getSort();
</script>

<th on:click={() => handler.sort(row => row[orderBy])} class="cursor-pointer select-none">
    <div class="flex h-full items-center justify-start gap-x-2">
        <slot />
        {#if $sorted.identifier === orderBy}
            {#if $sorted.direction === 'asc'}
                &darr;
            {:else if $sorted.direction === 'desc'}
                &uarr;
            {/if}
        {:else}
            &updownarrow;
        {/if}
    </div>
</th>
