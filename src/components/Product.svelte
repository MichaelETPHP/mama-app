<script>
    // Import CSS
    import './css/Product.css';

    // Define props for the product
    export let title;
    export let location;
    export let price;
    export let type; // 'FOR RENT' or 'FOR SELL'
    export let area;
    export let beds;
    export let baths;
    export let imageUrl; // Placeholder image URL
</script>

<div class="product-card">
    <div class="image-container relative overflow-hidden">
        <img src={imageUrl} alt={title} class="property-image w-full h-full object-cover" />
        <div class="type-badge absolute top-2 left-2 bg-white text-black px-2 py-1 rounded-full">{type}</div>
    </div>
    <div class="details p-4">
        <h3 class="title text-xl font-bold">{title}</h3>
        <p class="location text-gray-600 mt-2">{location}</p>
        <div class="specs flex justify-between mt-4 text-sm text-gray-600">
            <span><i class="fas fa-ruler"></i> {area} sqft</span>
            <span><i class="fas fa-bed"></i> {beds} bed</span>
            <span><i class="fas fa-bath"></i> {baths} bath</span>
        </div>
        <div class="price flex justify-between items-center mt-4 font-bold text-xl">
            <span>${price}</span>
            <button class="upvote-button bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                <i class="fas fa-arrow-up text-white"></i>
            </button>
        </div>
    </div>
</div>