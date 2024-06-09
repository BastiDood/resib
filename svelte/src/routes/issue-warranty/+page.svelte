<script lang="ts">
    import Datatable from '$lib/components/datatable/Datatable.svelte';
    import Hero from '$lib/components/Hero.svelte';

    function submit(form: HTMLFormElement, submitter: HTMLElement | null) {
        if (submitter === null) return;
        if (submitter instanceof HTMLButtonElement) {
            const data = new FormData(form);
            const id = data.get('product-id');
            const name = data.get('customer-name');
            submitter.disabled = true;
            try {
                // TODO: Invoke the smart contract here.
                alert(`Submitted Product ${id} by ${name}.`);
            } finally {
                submitter.disabled = false;
            }
        }
    }
</script>

<Hero>Create Warranty</Hero>
<div class="p-4">
    <a href="/" class="btn variant-filled hover:underline">Go Back</a>
</div>
<div class="flex flex-col justify-center gap-4 md:flex-row">
    <form
        method="post"
        class="card mb-4 flex w-full flex-col gap-2 bg-[#E5E5E5] p-4 md:w-2/5 md:gap-4 lg:w-1/5"
        on:submit|preventDefault|stopPropagation={({ currentTarget, submitter }) => submit(currentTarget, submitter)}
    >
        <h3 class="h3 py-4 text-center font-bold">Create Warranty Card</h3>
        <label>
            <span>Product ID</span>
            <input
                type="number"
                required
                name="product"
                placeholder="Enter Product ID"
                class="input variant-form-material"
            />
        </label>
        <label>
            <span>Customer Name</span>
            <input
                type="text"
                required
                name="customer-name"
                placeholder="Enter Customer Name"
                class="input variant-form-material"
            />
        </label>
        <div class="col-span-1 flex justify-center md:col-span-2">
            <button type="submit" class="btn variant-filled mt-5 text-white">Create Warranty</button>
        </div>
    </form>
    <div class="card mb-4 w-full bg-[#E5E5E5] p-4 md:w-3/5 lg:w-3/5">
        <Datatable />
    </div>
</div>
