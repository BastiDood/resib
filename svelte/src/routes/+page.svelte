<script>
    import Hero from '$lib/components/Hero.svelte';
</script>

<Hero>Welcome to Resib</Hero>
<div class="flex flex-col justify-center gap-4 p-10 lg:flex-row">
    <div class="card card-hover block max-w-96">
        <header class="card-header">
            <enhanced:img
                src="$lib/cards/pexels-kampus-8815843.jpeg"
                alt="Store Owner"
                class="aspect-video object-cover"
            />
        </header>
        <section class="p-4">
            <div class="grid">
                <h3 class="h3 font-semibold">For Owners &amp; Customers</h3>
                <p>See all the available stores.</p>
            </div>
        </section>
        <footer class="card-footer">
            <a href="/stores/" class="btn variant-filled">View Stores</a>
        </footer>
    </div>
    <div class="card card-hover block max-w-96">
        <header class="card-header">
            <enhanced:img
                src="$lib/cards/pexels-kampus-8815843.jpeg"
                alt="Store Owner"
                class="aspect-video object-cover"
            />
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
            <a href="/issue-warranty/" class="btn variant-filled">Issue Warranty</a>
        </footer>
    </div>
    <div class="card card-hover block max-w-96">
        <header class="card-header">
            <enhanced:img
                src="$lib/cards/pexels-adonyi-foto-1409215.jpeg"
                alt="Customer"
                class="aspect-video object-cover"
            />
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
            <a href="/warranties/" class="btn variant-filled">View Warranties</a>
        </footer>
    </div>
</div>
