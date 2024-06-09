<script>
    import { LockClosed, Plus, Squares2x2 } from '@steeze-ui/heroicons';
    import { ProgressBar, getToastStore } from '@skeletonlabs/skeleton';
    import Hero from '$lib/components/Hero.svelte';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { assert } from '$lib/assert';
    import { goto } from '$app/navigation';
    import { resib } from '$lib/resib';

    // eslint-disable-next-line init-declarations
    export let data;
    $: ({ signer, stores } = data);

    const toast = getToastStore();

    /**
     * @param {HTMLFormElement} form
     * @param {HTMLElement | null} button
     */
    async function submit(form, button) {
        assert(button !== null, 'submitter is null');
        assert(button instanceof HTMLButtonElement, 'submitter is not a button');

        const data = new FormData(form);
        const store = data.get('store');
        assert(store !== null, 'store name is null');
        assert(typeof store === 'string', 'store name is not a string');

        button.disabled = true;
        try {
            const response = await resib.connect(signer).createStore(store);
            const receipt = await response.wait(10);
            assert(receipt !== null, 'transaction receipt is null');
            const [log, ...logsRest] = receipt.logs;
            assert(logsRest.length === 0, 'unexpected extra logs when creating store');
            assert(typeof log !== 'undefined', 'no logs emitted when creating store');
            assert('eventName' in log && 'args' in log, 'present log is not an event log');
            assert(log.eventName === 'StoreCreated', 'unexpected event name when creating store');
            const [id, ...argsRest] = log.args;
            assert(argsRest.length === 0, 'unexpected extra event arguments when creating store');
            assert(typeof id === 'bigint', 'no store id emitted when creating store');
            await goto(`/stores/${id}/products/`);
        } catch (err) {
            toast.trigger({
                message: err instanceof Error ? `[${err.name}]: ${err.message}` : `${err}`,
                background: 'variant-filled-error',
                autohide: false,
            });
            throw err;
        } finally {
            // eslint-disable-next-line require-atomic-updates
            button.disabled = false;
        }
    }
</script>

<Hero>View Stores</Hero>
<div class="table-container space-y-4 p-4">
    {#await stores}
        <ProgressBar />
    {:then stores}
        <form
            on:submit|preventDefault|stopPropagation={({ currentTarget, submitter }) =>
                submit(currentTarget, submitter)}
        >
            <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] items-center">
                <div class="input-group-shim h-full"><Icon src={Plus} theme="mini" class="size-8" /></div>
                <input type="text" required name="store" placeholder="Resib" class="px-3 py-2" />
                <button type="submit" class="variant-filled-primary h-full">Create Store</button>
            </div>
        </form>
        <table class="table-hover table">
            <thead>
                <tr>
                    <th>&num;</th>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each stores as { name, owner }, id}
                    <tr>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td><code class="code">{owner}</code></td>
                        <td>
                            <a href="/stores/{id}/products/" class="btn btn-sm variant-filled-secondary">
                                <Icon src={Squares2x2} theme="micro" class="size-4" />
                                <span>Products</span>
                            </a>
                            {#if signer !== null && signer.address === owner}
                                <a href="/stores/{id}/warranties/" class="btn btn-sm variant-filled-tertiary">
                                    <Icon src={LockClosed} theme="micro" class="size-4" />
                                    <span>Warranties</span>
                                </a>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/await}
</div>
