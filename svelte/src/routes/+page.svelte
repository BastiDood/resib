<script>
    import Hero from '$lib/components/Hero.svelte';
    import card1header from '$lib/cards/pexels-kampus-8815843.jpeg?url';
    import card2header from '$lib/cards/pexels-adonyi-foto-1409215.jpeg?url';
</script>

<Hero>Welcome to Resib</Hero>
<div class="flex flex-col items-center justify-center gap-4 p-10 lg:flex-row">
    <div class="card card-hover block max-w-96">
        <header class="card-header">
            <img src={card1header} alt="Store Owner" class="aspect-video object-cover" />
        </header>
        <section class="p-4">
            <div class="grid">
                <h3 class="h3 font-semibold">Store Owner</h3>
                <p>
                    Issues warranties, must repair/replace/refund items provided that they are still under warranty
                    according to agreed upon specifications.
                </p>
            </div>
        </section>
        <footer class="card-footer">
            <a href="/issue-warranty" class="btn variant-filled">Issue Warranty</a>
        </footer>
    </div>
    <div class="card card-hover block max-w-96">
        <header class="card-header">
            <img src={card2header} alt="Customer" class="aspect-video object-cover" />
        </header>
        <section class="p-4">
            <div class="grid">
                <h3 class="h3 font-semibold">Customer</h3>
                <p>
                    Here's an easy way to view the warranties you have for damaged/unusable/needs to be replaced
                    purchased items.
                </p>
            </div>
        </section>
        <footer class="card-footer">
            <a href="/view-warranty" class="btn variant-filled">View Warranties</a>
        </footer>
    </div>
</div>
