<script>
	//Import local datatable components
	import ThSort from '$lib/components/client/ThSort.svelte';
	import ThFilter from '$lib/components/client/ThFilter.svelte';
	import Search from '$lib/components/client/Search.svelte';
	import RowsPerPage from '$lib/components/client/RowsPerPage.svelte';
	import RowCount from '$lib/components/client/RowCount.svelte';
	import Pagination from '$lib/components/client/Pagination.svelte';

	//Load local data
	import data from '$lib/datatable/data';

	//Import handler from SSD
	import { DataHandler } from '@vincjo/datatables';

	//Init data handler - CLIENT
	const handler = new DataHandler(data, { rowsPerPage: 5 });
	const rows = handler.getRows();
</script>

<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<ThSort {handler} orderBy="id">Warranty ID</ThSort>
				<ThSort {handler} orderBy="productId">Product ID</ThSort>
				<ThSort {handler} orderBy="customer">Customer Name</ThSort>
                <ThSort {handler} orderBy="startDate">Date Issued</ThSort>
                <ThSort {handler} orderBy="endDate">Valid Until</ThSort>
			</tr>
			<!-- <tr>
                <ThFilter {handler} orderBy="id">Warranty ID</ThFilter>
				<ThFilter {handler} orderBy="productId">Product ID</ThFilter>
				<ThFilter {handler} orderBy="customer">Customer Name</ThFilter>
                <ThFilter {handler} orderBy="startDate">Date Issued</ThFilter>
                <ThFilter {handler} orderBy="endDate">Valid Until</ThFilter>
			</tr> -->
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
                    <td>{row.id}</td>
					<td>{row.productId}</td>
					<td>{row.customer}</td>
					<td>{row.startDate}</td>
                    <td>{row.endDate}</td>
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