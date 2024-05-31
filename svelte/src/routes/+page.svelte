<script>
    import card1header from '$lib/cards/pexels-kampus-8815843.jpeg?url';
    import card2header from '$lib/cards/pexels-adonyi-foto-1409215.jpeg?url';
</script>

<div class="flex items-center justify-center p-[80px] bg-gradient-to-r from-slate-600 to-slate-800">
    <h1 class="h1 text-center font-bold drop-shadow">
        <span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
            Welcome to Resib.
        </span>
    </h1>
</div>

<div class="flex items-center justify-center flex-col lg:flex-row p-10 gap-4">
    <div class="block card card-hover max-w-96">
        <header class="card-header">
            <img src={card1header} alt="Store Owner" class="aspect-video object-cover">
        </header>
        <section class="p-4">
            <div class="grid">
                <h3 class="h3 font-semibold">Store Owner</h3>
                <p>
                    Issues warranties, must repair/replace/refund items provided that they are still under warranty according to agreed upon specifications.
                </p>
            </div>
        </section>
        <footer class="card-footer">
            <button type="button" class="btn variant-filled">
                <a href="/issue-warranty">
                    Issue Warranty
                </a>
            </button>
        </footer>
    </div>

    <div class="block card card-hover max-w-96">
        <header class="card-header">
            <img src={card2header} alt="Customer" class="aspect-video object-cover">
        </header>
        <section class="p-4">
            <div class="grid">
                <h3 class="h3 font-semibold">Customer</h3>
                <p>
                    Here's an easy way to view the warranties you have for damaged/unusable/needs to be replaced purchased items.
                </p>
            </div>
        </section>
        <footer class="card-footer">
            <button type="button" class="btn variant-filled">View Warranties</button>
        </footer>
    </div>
</div>