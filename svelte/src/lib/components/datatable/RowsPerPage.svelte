<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables';
    import type data from '$lib/datatable/data';

    type Data = (typeof data)[number];
    // eslint-disable-next-line init-declarations
    export let handler: DataHandler<Data>;
    const rowsPerPage = handler.getRowsPerPage();

    const options = [5, 10, 20, 50, 100];
</script>

<aside class="flex place-items-center space-x-2">
    <span>Show</span>
    <select class="select" bind:value={$rowsPerPage}>
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>
</aside>
