<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables';
    export let handler: DataHandler;
    const rowCount = handler.getRowCount();
</script>

<aside class="mr-6 text-sm leading-8">
    {#if $rowCount.total > 0}
        <b>{$rowCount.start}</b>
        - <b>{$rowCount.end}</b>
        / <b>{$rowCount.total}</b>
    {:else}
        No entries found
    {/if}
</aside>
