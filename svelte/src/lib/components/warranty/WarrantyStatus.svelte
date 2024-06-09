<script lang="ts">
    // eslint-disable-next-line init-declarations
    export let status: bigint;
</script>

{#if status === 0n}
    <span class="badge variant-ghost-error">Void</span>
{:else if status === 1n}
    <span class="badge variant-ghost-success">Active</span>
{:else if status === 2n}
    <span class="badge variant-ghost-warning">Pending</span>
{:else if status === 3n}
    <span class="badge variant-ghost-primary">Availed</span>
{:else}
    <span class="badge">Unknown</span>
{/if}
