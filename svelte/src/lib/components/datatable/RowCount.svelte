<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables';
    import type data from '$lib/datatable/data';

    type Data = (typeof data)[number];
    // eslint-disable-next-line init-declarations
    export let handler: DataHandler<Data>;

    const rowCount = handler.getRowCount();
    $: ({ total, start, end } = $rowCount);
</script>

<aside class="mr-6 text-sm leading-8">
    {#if total > 0}
        <b>{start}</b> - <b>{end}</b> / <b>{total}</b>
    {:else}
        No entries found.
    {/if}
</aside>
