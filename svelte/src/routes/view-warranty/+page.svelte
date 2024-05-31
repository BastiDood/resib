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

<div class="flex justify-center items-center gap-4 flex-col">
    <h3 class="h3 font-bold text-center py-4">
    Your Active Warranty Cards
    </h3>

    <div class="w-full md:w-3/5 lg:w-4/5 card px-4 py-8 mb-4 bg-[#E5E5E5] grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
        {#each data as item}
            <div class="grid grid-cols-1 card card-hover p-4 sm:p-6 sm:max-w-96 justify-center variant-ghost-surface">
                <div class="aspect-[3.370/2.125]">
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