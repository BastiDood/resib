<script>
    import { DataHandler } from '@vincjo/datatables';
    import Pagination from '$lib/components/datatable/Pagination.svelte';
    import RowCount from '$lib/components/datatable/RowCount.svelte';
    import RowsPerPage from '$lib/components/datatable/RowsPerPage.svelte';
    import Search from '$lib/components/datatable/Search.svelte';
    import ThSort from '$lib/components/datatable/ThSort.svelte';
    import data from '$lib/datatable/data';

    const handler = new DataHandler(data, { rowsPerPage: 5 });
    const rows = handler.getRows();
</script>

<div class="space-y-4 overflow-x-auto">
    <!-- Header -->
    <header class="flex justify-between gap-4">
        <Search {handler} />
        <RowsPerPage {handler} />
    </header>
    <!-- Table -->
    <table class="table-hover table-compact table w-full table-auto">
        <thead>
            <tr>
                <ThSort {handler} orderBy="id">Warranty ID</ThSort>
                <ThSort {handler} orderBy="productId">Product ID</ThSort>
                <ThSort {handler} orderBy="customer">Customer Name</ThSort>
                <ThSort {handler} orderBy="startDate">Date Issued</ThSort>
                <ThSort {handler} orderBy="endDate">Valid Until</ThSort>
            </tr>
        </thead>
        <tbody>
            {#each $rows as { id, productId, customer, startDate, endDate }}
                <tr>
                    <td>{id}</td>
                    <td>{productId}</td>
                    <td>{customer}</td>
                    <td>{startDate}</td>
                    <td>{endDate}</td>
                </tr>
            {/each}
        </tbody>
    </table>
    <!-- Footer -->
    <footer class="flex justify-between">
        <RowCount {handler} />
        <Pagination {handler} />
    </footer>
</div>
