<script>
    import Datatable from '$lib/components/datatable/Datatable.svelte';
    import Hero from '$lib/components/Hero.svelte';
</script>

<Hero>Create Warranty</Hero>
<div class="p-4">
    <a href="/" class="btn variant-filled hover:underline">Go Back</a>
</div>
<div class="flex flex-col justify-center gap-4 md:flex-row">
    <div class="card mb-4 flex w-full flex-col gap-2 bg-[#E5E5E5] p-4 md:w-2/5 md:gap-4 lg:w-1/5">
        <h3 class="h3 py-4 text-center font-bold">Create Warranty Card</h3>
        <label>
            <span>Product ID</span>
            <input
                name="productId"
                class="input variant-form-material"
                placeholder="Enter Product ID"
                type="number"
                required
            />
        </label>
        <label>
            <span>Customer Name</span>
            <input
                name="customer"
                class="input variant-form-material"
                placeholder="Enter Customer Name"
                type="text"
                required
            />
        </label>
        <div class="col-span-1 flex justify-center md:col-span-2">
            <button type="submit" class="btn variant-filled mt-5 text-white">Create Warranty</button>
        </div>
    </div>
    <div class="card mb-4 w-full bg-[#E5E5E5] p-4 md:w-3/5 lg:w-3/5">
        <Datatable />
    </div>
</div>
