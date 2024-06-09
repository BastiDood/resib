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
    import type { BigNumberish } from 'ethers';
    import { Icon } from '@steeze-ui/svelte-icon';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { resib } from '$lib/resib';

    function resolveAction(mode: Mode) {
        switch (mode) {
            case Mode.Void:
                return { action: resib.voidWarrantyStatus.bind(resib), icon: XMark, style: 'variant-filled-error' };
            case Mode.Reset:
                return {
                    action: resib.resetWarrantyStatus.bind(resib),
                    icon: ArrowPath,
                    style: 'variant-filled-primary',
                };
            case Mode.Process:
                return {
                    action: resib.processWarrantyStatus.bind(resib),
                    icon: Clipboard,
                    style: 'variant-filled-warning',
                };
            case Mode.Avail:
                return {
                    action: resib.availWarrantyStatus.bind(resib),
                    icon: CheckCircle,
                    style: 'variant-filled-success',
                };
            default:
                throw new AssertionError('unexpected warranty update mode');
        }
    }

    // eslint-disable-next-line init-declarations
    export let disabled: boolean;
    // eslint-disable-next-line init-declarations
    export let warranty: BigNumberish;
    // eslint-disable-next-line init-declarations
    export let mode: Mode;
    $: ({ action, style, icon } = resolveAction(mode));

    const toast = getToastStore();
    async function click() {
        disabled = true;
        try {
            const response = await action(warranty);
            const receipt = await response.wait();
            assert(receipt !== null, 'receipt is null when performing an action');
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
