<script>
    import data from '$lib/datatable/data';

    /** @type {import('./$types').PageData} */
</script>

<div class="flex items-center justify-center p-[80px] bg-gradient-to-r from-slate-600 to-slate-800">
    <h1 class="h1 text-center font-bold drop-shadow">
        <span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
            View Warranties
        </span>
    </h1>
</div>

<div class="p-4">
    <button type="button" class="btn variant-filled">
        <span>
            <a href="/" class="hover:underline">Go Back</a>
        </span>
    </button>
</div>

<div class="flex justify-center items-center w-full">
    <h3 class="h6 md:h3 font-bold py-4">
        Your Active Warranty Cards
    </h3>
</div>

<div class="mx-auto my-auto grid">
    <div class="grid md:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 py-4 md:p-4 place-items-center justify-center items-center">
        {#each data as item}
            <div class="card card-hover py-4 p-6 variant-ghost-surface">
                <div class="aspect-[3.370/2.125] h-fit sm:h-48">
                    <div class="pb-4">
                        <h3 class="h3 font-bold pb-10">
                            WARRANTY
                        </h3>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h5 class="h5 text-xs opacity-40">Customer Name</h5>
                            <p>{item.customer}</p>
                        </div>
                        <div>
                            <h5 class="h5 text-xs opacity-40">Product ID</h5>
                            <p>{item.productId}</p>
                        </div>
                        <div>
                            <h5 class="h5 text-xs opacity-40">Date Issued</h5>
                            <p>{item.startDate}</p>
                        </div>
                        <div>
                            <h5 class="h5 text-xs opacity-40">Valid Until</h5>
                            <p>{item.endDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>