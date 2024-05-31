<script>
    let keys = ['productId', 'customer'];

    import { enhance } from '$app/forms';
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    import Datatable from '$lib/components/Datatable.svelte';

    let formLoading = false;
</script>

<div class="flex items-center justify-center bg-gradient-to-r from-slate-600 to-slate-800 p-[80px]">
    <h1 class="h1 text-center font-bold drop-shadow">
        <span class="bg-gradient-to-br from-blue-500 to-cyan-300 box-decoration-clone bg-clip-text text-transparent">
            Issue Warranty
        </span>
    </h1>
</div>

{#if formLoading}
    <div class="flex h-screen flex-col items-center justify-center">
        <ProgressRadial />
        <span class="p-5"> Loading... </span>
    </div>
{:else}
    <div class="p-4">
        <button type="button" class="btn variant-filled">
            <span>
                <a href="/" class="hover:underline">Go Back</a>
            </span>
        </button>
    </div>

    <div class="flex flex-col justify-center gap-4 md:flex-row">
        <form
            method="POST"
            action=""
            class="card mb-4 flex w-full flex-col gap-2 bg-[#E5E5E5] p-4 md:w-2/5 md:gap-4 lg:w-1/5"
            use:enhance={() => {
                formLoading = true;
                return async ({ update }) => {
                    formLoading = false;
                    update();
                    window.history.back();
                };
            }}
        >
            <h3 class="h3 py-4 text-center font-bold">Create Warranty Card</h3>
            {#each keys as key}
                <label>
                    {#if key == 'productId'}
                        <span>Product ID</span>
                        <input
                            name={key}
                            class="input variant-form-material"
                            placeholder="Enter Product ID"
                            type="number"
                            required
                        />
                    {:else if key == 'customer'}
                        <span>{key}</span>
                        <input
                            name={key}
                            class="input variant-form-material"
                            placeholder="Enter Customer Name"
                            type="text"
                            required
                        />
                    {/if}
                </label>
            {/each}
            <div class="col-span-1 flex justify-center md:col-span-2">
                <input type="submit" class="btn variant-filled mt-5 text-white" value="Create Warranty" />
            </div>
        </form>

        <div class="card mb-4 w-full bg-[#E5E5E5] p-4 md:w-3/5 lg:w-3/5">
            <Datatable />
        </div>
    </div>
{/if}
