<script>
    import UpdateStatusButton, { Mode } from '$lib/components/warranty/UpdateStatusButton.svelte';
    import ErrorAlert from '$lib/alerts/ErrorAlert.svelte';
    import Hero from '$lib/components/Hero.svelte';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import WarrantyStatus from '$lib/components/warranty/WarrantyStatus.svelte';

    // eslint-disable-next-line init-declarations
    export let data;
    $: ({ signer, stores, storeId, warranties } = data);

    let disabled = false;
</script>

<Hero>Manage Warranties</Hero>
<div class="space-y-4 p-4">
    {#await stores}
        <ProgressBar />
    {:then stores}
        {@const store = stores[storeId]}
        {#if typeof store === 'undefined'}
            <ErrorAlert>Store not found.</ErrorAlert>
        {:else if signer !== null && signer.address === store.owner}
            <h1 class="h1">{store.name}</h1>
            {#await warranties}
                <ProgressBar />
            {:then warranties}
                <div class="table-container">
                    <table class="table-hover table">
                        <thead>
                            <tr>
                                <th>&num;</th>
                                <th>Name</th>
                                <th>Customer</th>
                                <th>Date Issued</th>
                                <th>Valid Until</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each warranties as { warranty, customer, startDate, endDate, status, product } (warranty)}
                                {@const start = new Date(Number(startDate) * 1000)}
                                {@const end = new Date(Number(endDate) * 1000)}
                                <tr>
                                    <td>{warranty}</td>
                                    <td>{product}</td>
                                    <td><code class="code">{customer}</code></td>
                                    <td><time datetime={start.toISOString()}>{start.toLocaleString()}</time></td>
                                    <td><time datetime={end.toISOString()}>{end.toLocaleString()}</time></td>
                                    <td><WarrantyStatus {status} /></td>
                                    <td>
                                        {#if status === 1n}
                                            <!-- ACTIVE -->
                                            <UpdateStatusButton {signer} {warranty} mode={Mode.Void} bind:disabled />
                                            <UpdateStatusButton {signer} {warranty} mode={Mode.Process} bind:disabled />
                                        {:else if status === 2n}
                                            <!-- PENDING -->
                                            <UpdateStatusButton {signer} {warranty} mode={Mode.Void} bind:disabled />
                                            <UpdateStatusButton {signer} {warranty} mode={Mode.Reset} bind:disabled />
                                            <UpdateStatusButton {signer} {warranty} mode={Mode.Avail} bind:disabled />
                                        {:else}
                                            None
                                        {/if}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/await}
        {/if}
    {/await}
</div>
