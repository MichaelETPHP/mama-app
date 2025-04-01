<script>
    // Import the Products component
    import Products from '../../components/Products.svelte';
      let propertyType = "Buy Apartments";
  let location = "Dhanmondi, Dhaka";
  let priceRange = "$10,000 - $200,000";
</script>

<div class="container">
    <header class="header flex justify-between items-center mb-8">
        <div class="title-section">
            <h1 class="text-4xl font-bold">New Listings</h1>
            <p class="text-lg text-gray-600 mt-2">
                Explore latest & featured properties for sale.
            </p>
        </div>
        <button class="explore-all-button bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300">
            Explore All
        </button>
    </header>
    <div class="products-section grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-light-beige p-4 rounded-lg">
        <Products />
    </div>
</div>
<style>
    .hero {
    @apply flex flex-col items-center text-center py-20 px-6 bg-[#fef7f4];
  }
  .search-bar {
    @apply flex bg-white shadow-lg rounded-xl p-4 mt-6;
  }
  .search-input {
    @apply flex-1 px-4 py-2 border rounded-md;
  }
  .search-button {
    @apply bg-black text-white px-6 py-2 rounded-md;
  }
  .menu {
    @apply flex justify-between w-full px-10 py-4 bg-white shadow-md;
  }
  .menu a {
    @apply text-gray-600 hover:text-black font-semibold px-4;
  }
     /* Global Styles */
    body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9; /* Light beige background */
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    .bg-light-beige {
        background-color: #f9f9f9; /* Light beige background for the product section */
    }
</style>