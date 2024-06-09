<script>
    import { ProgressBar } from '@skeletonlabs/skeleton';

    // eslint-disable-next-line init-declarations
    export let data;
    $: ({ stores, storeId, products } = data);
</script>

<div class="space-y-4 p-4">
    {#await stores}
        <ProgressBar />
    {:then stores}
        {@const store = stores[storeId]}
        {#if typeof store !== 'undefined'}
            <h1 class="h1">{store.name}</h1>
        {/if}
    {/await}
    {#await products}
        <ProgressBar />
    {:then products}
        <div class="table-container">
            <table class="table-hover table">
                <thead>
                    <tr>
                        <th>&num;</th>
                        <th>Name</th>
                        <th>Warranty</th>
                    </tr>
                </thead>
                <tbody>
                    {#each products as { product, name, warrantyPeriod } (product)}
                        <tr>
                            <td>{product}</td>
                            <td><a href="/stores/{storeId}/products/{product}" class="anchor">{name}</a></td>
                            <td>{warrantyPeriod} Days</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/await}
</div>
