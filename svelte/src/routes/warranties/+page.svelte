<script>
    import Hero from '$lib/components/Hero.svelte';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import WarrantyStatus from '$lib/components/warranty/WarrantyStatus.svelte';

    // eslint-disable-next-line init-declarations
    export let data;
    $: ({ warranties } = data);
</script>

<Hero>View Warranties</Hero>
<div class="space-y-4 p-4">
    {#await warranties}
        <ProgressBar />
    {:then warranties}
        <div
            class="grid place-items-center items-center justify-center gap-4 md:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]"
        >
            {#each warranties as { store, product, startDate, endDate, status }}
                {@const start = new Date(Number(startDate) * 1000)}
                {@const end = new Date(Number(endDate) * 1000)}
                <div class="card card-hover variant-ghost-surface p-6 py-4">
                    <div class="aspect-[3.370/2.125] h-fit sm:h-48">
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <h5 class="h5 text-xs opacity-40">Store</h5>
                                <p>{store}</p>
                            </div>
                            <div>
                                <h5 class="h5 text-xs opacity-40">Product</h5>
                                <p>{product}</p>
                            </div>
                            <div>
                                <h5 class="h5 text-xs opacity-40">Date Issued</h5>
                                <p><time datetime={start.toISOString()}>{start.toLocaleString()}</time></p>
                            </div>
                            <div>
                                <h5 class="h5 text-xs opacity-40">Valid Until</h5>
                                <p><time datetime={end.toISOString()}>{end.toLocaleString()}</time></p>
                            </div>
                            <div><WarrantyStatus {status} /></div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/await}
</div>
