<script>
  import { onMount } from 'svelte';
  import PatientVitalForm from '../../components/PatientForm.svelte';
  import PatientVitalDataTable from '../../components/PatientDataTable.svelte';
  import Navigation from '../../components/Navigation.svelte';

  // State variables
  let vitalData = [];
  let showConfirmation = false;
  let showDeleteConfirmation = false;
  let errorMessage = '';
  let isLoading = true;

  // Fetch vital data from the API
  async function fetchVitalData() {
    try {
      const response = await fetch('https://hello.adeycustom.com/api.php?type=vital');
      if (response.ok) {
        vitalData = await response.json();
      } else {
        const errorText = await response.text();
        errorMessage = `Error fetching data: ${response.statusText} - ${errorText}`;
      }
    } catch (error) {
      errorMessage = `Error fetching data: ${error.message}`;
    } finally {
      isLoading = false;
    }
  }

  // Submit vital data to the API
  async function handleSubmit(newData) {
    try {
      const response = await fetch('https://hello.adeycustom.com/api.php?type=vital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });

      if (response.ok) {
        await fetchVitalData();
        showConfirmation = true;
        setTimeout(() => {
          showConfirmation = false;
        }, 4000);
      } else {
        errorMessage = `Error submitting data: ${response.statusText}`;
      }
    } catch (error) {
      errorMessage = `Error submitting data: ${error.message}`;
    }
  }

  // Delete vital data from the API
  async function handleDelete(id) {
    try {
      const response = await fetch('https://hello.adeycustom.com/api.php?type=vital', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        await fetchVitalData();
        showDeleteConfirmation = true;
        setTimeout(() => {
          showDeleteConfirmation = false;
        }, 4000);
      } else {
        errorMessage = `Error deleting data: ${response.statusText}`;
      }
    } catch (error) {
      errorMessage = `Error deleting data: ${error.message}`;
    }
  }

  onMount(() => {
    fetchVitalData();
  });
</script>

<!-- Success/Error Messages -->
{#if showConfirmation}
  <div class="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg opacity-100 transition-opacity duration-1000 text-center w-full max-w-xs z-50">
    <div class="flex items-center justify-center">
      <i class="fas fa-check-circle mr-2"></i>
      Data submitted successfully!
    </div>
  </div>
{/if}

{#if showDeleteConfirmation}
  <div class="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg opacity-100 transition-opacity duration-1000 text-center w-full max-w-xs z-50">
    <div class="flex items-center justify-center">
      <i class="fas fa-trash-alt mr-2"></i>
      Data deleted successfully!
    </div>
  </div>
{/if}

{#if errorMessage}
  <div class="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg opacity-100 transition-opacity duration-1000 text-center w-full max-w-xs z-50">
    <div class="flex items-center justify-center">
      <i class="fas fa-exclamation-triangle mr-2"></i>
      {errorMessage}
    </div>
  </div>
{/if}

<!-- Main Content with Home Page Style -->
<div class="min-h-screen flex flex-col p-0 sm:p-2 md:p-4 overflow-y-auto">
  <div class="relative w-full flex-1">
    <!-- Beautiful Love Frame Container -->
    <div class="relative bg-gradient-to-br from-pink-100 via-white to-purple-100 rounded-none sm:rounded-3xl p-2 sm:p-4 md:p-8 shadow-2xl border-0 sm:border-4 border-pink-300 transition-transform duration-500">
      <!-- Navigation Component Inside Container -->
      <div class="mb-4 sm:mb-6">
        <Navigation />
      </div>

      <!-- Decorative Corner Hearts - Hidden on mobile -->
      <div class="hidden sm:block absolute -top-4 -left-4 w-6 h-6 md:w-8 md:h-8 text-pink-400 animate-bounce">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div class="hidden sm:block absolute -top-4 -right-4 w-6 h-6 md:w-8 md:h-8 text-purple-400 animate-bounce" style="animation-delay: 0.5s;">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div class="hidden sm:block absolute -bottom-4 -left-4 w-6 h-6 md:w-8 md:h-8 text-purple-400 animate-bounce" style="animation-delay: 1s;">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div class="hidden sm:block absolute -bottom-4 -right-4 w-6 h-6 md:w-8 md:h-8 text-pink-400 animate-bounce" style="animation-delay: 1.5s;">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

                   <!-- Page Header -->
             <div class="text-center mb-4 sm:mb-6 px-2">
               <h1 class="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                 ❤️ Avi's Vital Signs ❤️
               </h1>
               <p class="text-sm sm:text-base md:text-lg text-gray-600">
                 Monitor and track health metrics with love and care
               </p>
             </div>

      <!-- Loading State -->
      {#if isLoading}
        <div class="flex justify-center items-center py-8 sm:py-12">
          <div class="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-pink-500"></div>
          <span class="ml-3 text-pink-600 font-semibold text-sm sm:text-base">Loading vital signs...</span>
        </div>
      {:else}
        <!-- Form and Table Section -->
        <div class="relative overflow-visible rounded-none sm:rounded-2xl shadow-xl bg-white/50 backdrop-blur-sm p-2 sm:p-4 md:p-6">
          <div class="flex flex-col xl:flex-row gap-4 sm:gap-6">
            <!-- Form Section (Left Column) -->
            <div class="w-full xl:w-1/3">
              <div class="bg-white/80 rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-pink-200">
                <h2 class="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-center text-gray-800 flex items-center justify-center">
                  <i class="fas fa-heartbeat text-pink-500 mr-2"></i>
                  Add Vital Signs
                </h2>
                <PatientVitalForm onSubmit={handleSubmit} />
              </div>
            </div>

            <!-- Data Table Section (Right Column) -->
            <div class="w-full xl:w-2/3">
              <div class="bg-white/80 rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-pink-200">
                <PatientVitalDataTable data={vitalData} onDelete={handleDelete} />
              </div>
            </div>
          </div>
        </div>
      {/if}

      <!-- Decorative Border - Hidden on mobile -->
      <div class="hidden sm:block absolute inset-0 rounded-3xl border-2 border-pink-200 pointer-events-none"></div>
    </div>
  </div>
</div>

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
    animation: fadeIn 1s ease-in-out;
  }

  /* Enable scrolling on mobile */
  :global(body) {
    overflow-y: auto;
    height: auto;
  }
</style>