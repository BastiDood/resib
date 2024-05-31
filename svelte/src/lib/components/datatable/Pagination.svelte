<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables';
    import type data from '$lib/datatable/data';

    type Data = (typeof data)[number];
    // eslint-disable-next-line init-declarations
    export let handler: DataHandler<Data>;

    const pageNumber = handler.getPageNumber();
    const pageCount = handler.getPageCount();
    const pages = handler.getPages({ ellipsis: true });
</script>

<!-- Desktop buttons -->
<section class="btn-group variant-ghost-surface [&>*+*]:border-surface-500 hidden h-10 lg:block">
    <button
        type="button"
        class="hover:variant-soft-primary"
        class:disabled={$pageNumber === 1}
        on:click={() => handler.setPage('previous')}
    >
        ←
    </button>
    {#each $pages as page}
        <button
            type="button"
            class="hover:variant-soft-primary"
            class:active={$pageNumber === page}
            class:ellipse={page === null}
            on:click={() => handler.setPage(page)}
        >
            {page}
        </button>
    {:else}
        <div>...</div>
    {/each}
    <button
        type="button"
        class="hover:variant-soft-primary"
        class:disabled={$pageNumber === $pageCount}
        on:click={() => handler.setPage('next')}
    >
        →
    </button>
</section>

<!-- Mobile buttons -->
<section class="lg:hidden">
    <button
        type="button"
        class="btn variant-ghost-surface hover:variant-soft-primary mb-2 mr-2"
        class:disabled={$pageNumber === 1}
        on:click={() => handler.setPage('previous')}
    >
        ←
    </button>
    <button
        type="button"
        class="btn variant-ghost-surface hover:variant-soft-primary mb-2"
        class:disabled={$pageNumber === $pageCount}
        on:click={() => handler.setPage('next')}
    >
        →
    </button>
</section>
