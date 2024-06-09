<script>
    import { ProgressBar } from '@skeletonlabs/skeleton';
    // eslint-disable-next-line init-declarations
    export let data;
    $: ({ stores } = data);
</script>

<div class="p-4">
    {#await stores}
        <ProgressBar />
    {:then stores}
        {#each stores as { name, owner }}
            <p>{name} by <code class="code">{owner}</code></p>
        {/each}
    {/await}
</div>
