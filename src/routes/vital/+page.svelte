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

  // Define navigation links
  const navLinks = [
    {
      title: 'Home',
      description: 'Go to the home page for an overview.',
      href: '/',
      bgColor: 'bg-blue-600',
      hoverBgColor: 'bg-blue-700'
    },
    {
      title: 'Feeding',
      description: 'Manage feeding schedules and records.',
      href: '/feeding',
      bgColor: 'bg-green-600',
      hoverBgColor: 'bg-green-700'
    },
    {
      title: 'Vital',
      description: 'Track vital signs and health metrics.',
      href: '/vital',
      bgColor: 'bg-red-600',
      hoverBgColor: 'bg-red-700'
    }
  ];

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

<div class="min-h-screen bg-gray-100">
  <!-- Success/Error Messages -->
  {#if showConfirmation}
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg opacity-100 transition-opacity duration-1000 text-center w-full max-w-xs">
      Data submitted successfully!
    </div>
  {/if}

  {#if showDeleteConfirmation}
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg opacity-100 transition-opacity duration-1000 text-center w-full max-w-xs">
      Data deleted successfully!
    </div>
  {/if}

  {#if errorMessage}
    <div class="text-red-500 text-center mt-4">{errorMessage}</div>
  {/if}

  <!-- Navigation Component -->
  <Navigation {navLinks} />

  <!-- Full Page Layout -->
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Patient Vital Signs Management</h1>

    <!-- Form and Table Side by Side -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Form Section (Left Column) -->
      <div class="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Add Vital Signs</h2>
        <PatientVitalForm onSubmit={handleSubmit} />
      </div>

      <!-- Data Table Section (Right Column) -->
      <div class="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Vital Signs Records</h2>
        <PatientVitalDataTable data={vitalData} onDelete={handleDelete} />
      </div>
    </div>
  </div>
</div>