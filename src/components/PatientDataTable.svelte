<script>
  import { onMount } from 'svelte';

  // State variables
  let data = [];
  let searchQuery = '';
  let expandedRecordId = null;

  async function fetchData() {
    try {
      const res = await fetch('https://hello.adeycustom.com/api.php');
      data = await res.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  onMount(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  });

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(",", "");
  }

  async function onDelete(id) {
    try {
      console.log("Deleting patient with ID:", id);

      const response = await fetch('https://hello.adeycustom.com/api.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);

      alertSuccessNotification("Patient record deleted successfully.");
      fetchData();
    } catch (error) {
      console.error("Error deleting patient:", error);
      alertErrorNotification("Failed to delete patient record. Please try again.");
    }
  }

  $: sortedData = data.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate));
  $: filteredData = sortedData.filter(patient => patient.name.toLowerCase().includes(searchQuery.toLowerCase()));

  function toggleAccordion(id) {
    expandedRecordId = expandedRecordId === id ? null : id;
  }

  function alertSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  function alertErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
</script>

<!-- Main Container -->
<div class="w-full bg-white shadow-lg rounded-lg p-4 md:p-6 overflow-x-auto">
  <h3 class="text-xl md:text-2xl font-bold mb-4 text-gray-800">Submitted Patient Data</h3>

  <!-- Search Input -->
  <input
    type="text"
    placeholder="Search by name..."
    class="w-full px-4 py-2 mb-4 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
    bind:value={searchQuery}
  />

  <!-- Accordion List -->
  <div class="space-y-4">
    {#if filteredData.length > 0}
      {#each filteredData as patient}
        <div class="border rounded-lg overflow-hidden">
          <!-- Accordion Header -->
          <button
            on:click={() => toggleAccordion(patient.id)}
            class="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
          >
            <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-medium">{formatDateTime(patient.submittedDate)}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500 transition-transform transform {expandedRecordId === patient.id ? 'rotate-180' : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <!-- Accordion Content -->
          {#if expandedRecordId === patient.id}
            <div class="p-4 bg-white space-y-2">
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span><strong>Name:</strong> {patient.name}</span>
              </div>
              <hr />
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span><strong>Temperature:</strong> {patient.temperature} °C</span>
              </div>
              <hr />
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span><strong>Blood Pressure:</strong> {patient.bp}</span>
              </div>
              <hr />
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span><strong>Weight:</strong> {patient.weight} kg</span>
              </div>
              <hr />
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                </svg>
                <span><strong>Oxygen Rate:</strong> {patient.oxygenRate} %</span>
              </div>
              <hr />
              <button
                on:click={() => onDelete(patient.id)}
                class="mt-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          {/if}
        </div>
      {/each}
    {:else}
      <div class="text-center py-4">No data available</div>
    {/if}
  </div>
</div>