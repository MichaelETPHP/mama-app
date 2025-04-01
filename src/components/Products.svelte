<script>
    // Import the Product component
    import Product from './Product.svelte';
    

    // Sample product data
    const products = [
        {
            title: "Blueberry villa",
            location: "Mirpur 10, Stadium dhaka 1208",
            price: "$3,280/m",
            type: "FOR RENT",
            area: "1370",
            beds: "03",
            baths: "02",
            imageUrl: "https://homy-svelte.vercel.app/assets/images/listing/img_01.jpg"
        },
        {
            title: "White House villa",
            location: "Muza link road, ca, usa",
            price: "$28,100.00",
            type: "FOR SELL",
            area: "1270",
            beds: "02",
            baths: "02",
            imageUrl: "https://homy-svelte.vercel.app/assets/images/listing/img_02.jpg"
        },
        {
            title: "Luxury villa in Dal lake.",
            location: "Mirpur 10, Stadium",
            price: "$42,500.00",
            type: "FOR SELL",
            area: "1270",
            beds: "02",
            baths: "02",
            imageUrl: "https://homy-svelte.vercel.app/assets/images/listing/img_03.jpg"
        }
    ];
</script>

<div class="products-grid grid grid-cols-3 gap-4">
    {#each products as product}
        <Product
            title={product.title}
            location={product.location}
            price={product.price}
            type={product.type}
            area={product.area}
            beds={product.beds}
            baths={product.baths}
            imageUrl={product.imageUrl}
        />
    {/each}
</div>