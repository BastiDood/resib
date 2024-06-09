<script>
    import { ProgressBar, getToastStore } from '@skeletonlabs/skeleton';
    import Hero from '$lib/components/Hero.svelte';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { Plus } from '@steeze-ui/heroicons';
    import { assert } from '$lib/assert';
    import { invalidateAll } from '$app/navigation';
    import { resib } from '$lib/resib';

    import ErrorAlert from '$lib/alerts/ErrorAlert.svelte';
    import WarningAlert from '$lib/alerts/WarningAlert.svelte';

    // eslint-disable-next-line init-declarations
    export let data;
    $: ({ signer, stores, storeId, products } = data);

    const toast = getToastStore();
    let disabled = false;

    /** * @param {HTMLFormElement} form */
    async function createProduct(form) {
        const data = new FormData(form);
        const name = data.get('product');
        assert(typeof name === 'string', 'store name is not a string');
        const warranty = data.get('warranty');
        assert(typeof warranty === 'string', 'store name is not a string');
        const warrantyPeriod = parseInt(warranty, 10);
        disabled = true;
        try {
            const response = await resib.connect(signer).createProduct(storeId, name, warrantyPeriod);
            const receipt = await response.wait();
            assert(receipt !== null, 'transaction receipt is null');
            const [log, ...logsRest] = receipt.logs;
            assert(logsRest.length === 0, 'unexpected extra logs when creating product');
            assert(typeof log !== 'undefined', 'no logs emitted when creating product');
            assert('eventName' in log && 'args' in log, 'present log is not an event log');
            assert(log.eventName === 'ProductCreated', 'unexpected event name when creating product');
            const [id, productId, ...argsRest] = log.args;
            assert(argsRest.length === 0, 'unexpected extra event arguments when creating product');
            assert(typeof id === 'bigint', 'no store id emitted when creating product');
            assert(id === BigInt(storeId), 'store id must be equal');
            assert(typeof productId === 'bigint', 'no product id emitted when creating product');
            await invalidateAll();
            toast.trigger({
                message: `Created product ${productId}.`,
                background: 'variant-filled-success',
            });
        } catch (err) {
            toast.trigger({
                message: err instanceof Error ? `[${err.name}]: ${err.message}` : `${err}`,
                background: 'variant-filled-error',
                autohide: false,
            });
            throw err;
        } finally {
            disabled = false;
        }
    }

    /** @param {EventTarget | null} target */
    async function createWarranty(target) {
        assert(target !== null, 'target is null');
        assert(target instanceof HTMLFormElement, 'target is not a form');

        const data = new FormData(target);
        const product = data.get('product');
        assert(typeof product === 'string', 'product id is not a string');
        const inputProductId = BigInt(product);
        const customer = data.get('customer');
        assert(typeof customer === 'string', 'customer address is not a string');

        disabled = true;
        try {
            const response = await resib.connect(signer).createWarranty(inputProductId, customer);
            const receipt = await response.wait();
            assert(receipt !== null, 'transaction receipt is null');
            const [log, ...logsRest] = receipt.logs;
            assert(logsRest.length === 0, 'unexpected extra logs when creating warranty');
            assert(typeof log !== 'undefined', 'no logs emitted when creating warranty');
            assert('eventName' in log && 'args' in log, 'present log is not an event log');
            assert(log.eventName === 'WarrantyCreated', 'unexpected event name when creating warranty');
            const [id, productId, warrantyId, ...argsRest] = log.args;
            assert(argsRest.length === 0, 'unexpected extra event arguments when creating product');
            assert(typeof id === 'bigint', 'no store id emitted when creating product');
            assert(id === BigInt(storeId), 'store id must be equal');
            assert(typeof productId === 'bigint', 'no store id emitted when creating product');
            assert(productId === inputProductId, 'store id must be equal');
            toast.trigger({
                message: `Issued warranty ${warrantyId}.`,
                background: 'variant-filled-success',
            });
        } catch (err) {
            toast.trigger({
                message: err instanceof Error ? `[${err.name}]: ${err.message}` : `${err}`,
                background: 'variant-filled-error',
                autohide: false,
            });
            throw err;
        } finally {
            disabled = false;
        }
    }
</script>

<Hero>View Products</Hero>
<div class="space-y-4 p-4">
    {#await stores}
        <ProgressBar />
    {:then stores}
        {@const store = stores[storeId]}
        {#if typeof store === 'undefined'}
            <ErrorAlert>Store not found.</ErrorAlert>
        {:else}
            {@const isOwner = signer !== null && signer.address === store.owner}
            <h1 class="h1">{store.name}</h1>
            {#if isOwner}
                <form
                    on:submit|preventDefault|stopPropagation={({ currentTarget }) => createProduct(currentTarget)}
                    class="space-y-2"
                >
                    <label>
                        <span>Product Name</span>
                        <input type="text" required name="product" placeholder="Resib" class="input px-3 py-2" />
                    </label>
                    <label>
                        <span>Warranty Period</span>
                        <div class="input-group input-group-divider grid-cols-[1fr_auto] items-center">
                            <input
                                type="number"
                                min="0"
                                required
                                name="warranty"
                                placeholder="0"
                                class="input px-3 py-2"
                            />
                            <div class="input-group-shim h-full">DAYS</div>
                        </div>
                    </label>
                    <button type="submit" {disabled} class="btn variant-filled-secondary h-full">Create Product</button>
                </form>
            {:else}
                <WarningAlert>You are viewing the store as a customer. Owner tools have been disabled.</WarningAlert>
            {/if}
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
                                {#if isOwner}
                                    <th>Issue Warranty for Customer</th>
                                {/if}
                            </tr>
                        </thead>
                        <tbody on:submit|preventDefault|stopPropagation={({ target }) => createWarranty(target)}>
                            {#each products as { product, name, warrantyPeriod } (product)}
                                <tr>
                                    <td>{product}</td>
                                    <td>{name}</td>
                                    <td>{warrantyPeriod} Days</td>
                                    {#if isOwner}
                                        <td>
                                            <form class="input-group input-group-divider grid-cols-[1fr_auto]">
                                                <input type="hidden" name="product" value={product} />
                                                <input
                                                    type="text"
                                                    required
                                                    name="customer"
                                                    placeholder="0x..."
                                                    class="px-3 py-2"
                                                />
                                                <button type="submit" class="variant-filled-tertiary h-full" {disabled}
                                                    ><Icon src={Plus} theme="mini" class="size-4" /></button
                                                >
                                            </form>
                                        </td>
                                    {/if}
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/await}
        {/if}
    {/await}
</div>
