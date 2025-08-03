<script>
  import { onMount } from 'svelte';
  import FrontPage from '../routes/FrontPage.svelte';
  import Navigation from '../components/Navigation.svelte';

  let showTreatmentModal = false;
  let timeRemaining = 10;

  onMount(() => {
    // Show treatment promotion modal after page loads
    setTimeout(() => {
      showTreatmentModal = true;
      startCountdown();
    }, 1000);
  });

  function startCountdown() {
    const countdown = setInterval(() => {
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(countdown);
        closeModal();
      }
    }, 1000);
  }

  function closeModal() {
    showTreatmentModal = false;
  }
</script>

<!-- Navigation Component -->
<Navigation />

<!-- Main Content - Full Screen Mobile-First Layout -->
<div class="h-screen w-full flex items-center justify-center p-0 overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
  <FrontPage />
</div>

<!-- Simple GoFundMe Modal -->
{#if showTreatmentModal}
  <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
    <div class="relative max-w-2xl mx-4">
      <!-- Simple Modal Container -->
      <div class="bg-white rounded-2xl shadow-2xl p-6 relative">
        <!-- Close Button -->
        <button
          on:click={closeModal}
          class="absolute -top-4 -right-4 w-8 h-8 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center z-10"
        >
          <i class="fas fa-times"></i>
        </button>

        <!-- GoFundMe Widget - Original Styling -->
        <div class="gfm-embed" data-url="https://www.gofundme.com/f/help-avi-get-lifesaving-cancer-treatment/widget/medium?sharesheet=undefined&attribution_id=sl:199fb9b9-9364-4cc0-b55c-8f0e54ad9324"></div>
        <script defer src="https://www.gofundme.com/static/js/embed.js"></script>

        <!-- Auto-close notice -->
        <div class="text-center mt-4 text-sm text-gray-500">
          <i class="fas fa-clock mr-1"></i>
          This will close automatically in {timeRemaining} seconds
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Custom animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  /* Smooth hover effects */
  .hover\:scale-100:hover {
    transform: scale(1);
  }

  /* Prevent body scroll */
  :global(body) {
    overflow: hidden;
    height: 100vh;
  }
</style>