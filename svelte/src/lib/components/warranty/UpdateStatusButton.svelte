<script lang="ts" context="module">
    export const enum Mode {
        Void = 'Void',
        Reset = 'Reset',
        Process = 'Process',
        Avail = 'Avail',
    }
</script>

<script lang="ts">
    import { ArrowPath, CheckCircle, Clipboard, XMark } from '@steeze-ui/heroicons';
    import { AssertionError, assert } from '$lib/assert';
    import type { BigNumberish, Signer } from 'ethers';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { invalidateAll } from '$app/navigation';
    import { resib } from '$lib/resib';

    // eslint-disable-next-line init-declarations
    export let disabled: boolean;
    // eslint-disable-next-line init-declarations
    export let signer: Signer;
    // eslint-disable-next-line init-declarations
    export let warranty: BigNumberish;
    // eslint-disable-next-line init-declarations
    export let mode: Mode;

    function resolveAction(signer: Signer, mode: Mode) {
        const runner = resib.connect(signer);
        switch (mode) {
            case Mode.Void:
                return { action: runner.voidWarrantyStatus.bind(runner), icon: XMark, style: 'variant-filled-error' };
            case Mode.Reset:
                return {
                    action: runner.resetWarrantyStatus.bind(runner),
                    icon: ArrowPath,
                    style: 'variant-filled-primary',
                };
            case Mode.Process:
                return {
                    action: runner.processWarrantyStatus.bind(runner),
                    icon: Clipboard,
                    style: 'variant-filled-warning',
                };
            case Mode.Avail:
                return {
                    action: runner.availWarrantyStatus.bind(runner),
                    icon: CheckCircle,
                    style: 'variant-filled-success',
                };
            default:
                throw new AssertionError('unexpected warranty update mode');
        }
    }

    $: ({ action, style, icon } = resolveAction(signer, mode));

    const toast = getToastStore();
    async function click() {
        disabled = true;
        try {
            const response = await action(warranty);
            const receipt = await response.wait();
            assert(receipt !== null, 'receipt is null when performing an action');
            await invalidateAll();
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

<button type="button" {disabled} class="btn btn-sm {style}" on:click={click}>
    <Icon src={icon} theme="mini" class="size-4" />
    <span>{mode}</span>
</button>
