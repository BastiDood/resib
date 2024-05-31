<script>
    import Hero from '$lib/components/Hero.svelte';
    import data from '$lib/datatable/data';
</script>

<Hero>View Warranties</Hero>
<div class="p-4">
    <a href="/" class="btn variant-filled">Go Back</a>
</div>
<div class="flex w-full items-center justify-center">
    <h3 class="h6 md:h3 py-4 font-bold">Your Active Warranty Cards</h3>
</div>
<div class="mx-auto my-auto grid">
    <div
        class="grid place-items-center items-center justify-center gap-4 py-4 md:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] md:p-4"
    >
        {#each data as { customer, productId, startDate, endDate }}
            <div class="card card-hover variant-ghost-surface p-6 py-4">
                <div class="aspect-[3.370/2.125] h-fit sm:h-48">
                    <div class="pb-4">
                        <h3 class="h3 pb-10 font-bold">WARRANTY</h3>
                    </div>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <h5 class="h5 text-xs opacity-40">Customer Name</h5>
                            <p>{customer}</p>
                        </div>
                        <div>
                            <h5 class="h5 text-xs opacity-40">Product ID</h5>
                            <p>{productId}</p>
                        </div>
                        <div>
                            <h5 class="h5 text-xs opacity-40">Date Issued</h5>
                            <p>{startDate}</p>
                        </div>
                        <div>
                            <h5 class="h5 text-xs opacity-40">Valid Until</h5>
                            <p>{endDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
