<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables';
    import type data from '$lib/datatable/data';

    type Data = (typeof data)[number];
    // eslint-disable-next-line init-declarations
    export let handler: DataHandler<Data>;
</script>

<input
    class="input w-36 sm:w-64"
    type="search"
    placeholder="Search..."
    on:input={({ currentTarget }) => handler.search(currentTarget.value)}
/>
