<script>
    let keys = ['productId', 'customer'];

    import { enhance } from '$app/forms';
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    /** @type {import('./$types').PageData} */

    let formLoading = false;
</script>

<div class="flex items-center justify-center p-[80px] bg-gradient-to-r from-slate-600 to-slate-800">
    <h1 class="h1 text-center font-bold drop-shadow">
        <span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
            Issue Warranty
        </span>
    </h1>
</div>

{#if formLoading}
	<div class="h-screen flex flex-col items-center justify-center">
		<ProgressRadial />
		<span class="p-5">
			Loading...
		</span>
	</div>
{:else}
	<div class="p-4">
		<button type="button" class="btn variant-filled">
			<span>
				<a href="/" class="hover:underline">Go Back</a>
			</span>
		</button>
	</div>

	<div class="flex justify-center gap-4 flex-col md:flex-row">
		<form method="POST" action="" class="flex flex-col gap-2 md:gap-4 w-full md:w-2/5 lg:w-1/5 card p-4 mb-4 bg-[#E5E5E5]" 
		use:enhance={() => {
			formLoading = true;
			return async ({ update }) => {
				formLoading = false;
				update();
				window.history.back();
			};
		}} 
		>

        <h3 class="h3 font-bold text-center">
            Create Warranty Card
        </h3>
			{#each keys as key}
                <label>
                    {#if key == "productId"}
                        <span>Product ID</span>
                        <input name={key} class="input variant-form-material" placeholder="Enter Product ID" type="number" required>
                    {:else if key == "customer"}
                        <span>{key}</span> 
                        <input name={key} class="input variant-form-material" placeholder="Enter Customer Name" type="text" required>
                    {/if}
                </label>
			{/each}
			<div class="col-span-1 md:col-span-2 flex justify-center">
				<input type="submit" class="btn variant-filled text-white mt-5" value="Create Warranty"/>
			</div>
		</form>

        <div class="w-full md:w-3/5 lg:w-3/5 card p-4 mb-4 bg-[#E5E5E5]">

        </div>
	</div>
{/if}