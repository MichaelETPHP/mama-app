<script>
  export let data = [];
  export let onDelete;
  let searchQuery = '';

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options).replace(",", "");
  }

  // Filter data based on search query
  $: filteredData = data.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination variables
  let currentPage = 1;
  const itemsPerPage = 7;

  // Calculate paginated data
  $: paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate total pages
  $: totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Function to change page
  function changePage(newPage) {
    currentPage = newPage;
  }
</script>

<div class="w-full bg-white shadow-lg rounded-lg p-4 md:p-6 overflow-x-auto">
  <h3 class="text-xl md:text-2xl font-bold mb-4 text-gray-800">Submitted Patient Data</h3>

  <!-- Search Input -->
  <input
    type="text"
    placeholder="Search by name..."
    class="w-full px-4 py-2 mb-4 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
    bind:value={searchQuery}
  />

  <table class="w-full text-left border-collapse table-auto">
    <thead>
      <tr class="bg-gray-200">
        <th class="px-4 py-2 border text-gray-700">Name</th>
        <th class="px-4 py-2 border text-gray-700">Weight (kg)</th>
        <th class="px-4 py-2 border text-gray-700">Temperature (°C)</th>
        <th class="px-4 py-2 border text-gray-700">BP</th>
        <th class="px-4 py-2 border text-gray-700">Oxygen (%)</th>
        <th class="px-4 py-2 border text-gray-700">Submitted Date</th>
        <th class="px-4 py-2 border text-gray-700">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#if paginatedData.length > 0}
        {#each paginatedData as patient}
          <tr class="hover:bg-gray-100">
            <td class="px-4 py-2 border">{patient.name}</td>
            <td class="px-4 py-2 border">{patient.weight}</td>
            <td class="px-4 py-2 border">{patient.temperature}</td>
            <td class="px-4 py-2 border">{patient.bp}</td>
            <td class="px-4 py-2 border">{patient.oxygenRate}</td>
            <td class="px-4 py-2 border">{formatDateTime(patient.submittedDate)}</td>
            <td class="px-4 py-2 border text-center">
              <button
                class="text-red-500 hover:text-red-700"
                on:click={() => onDelete(patient.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
        {/each}
      {:else}
        <tr>
          <td colspan="7" class="text-center py-4">No data available</td>
        </tr>
      {/if}
    </tbody>
  </table>

  <!-- Pagination Controls -->
  <div class="flex justify-center mt-4 space-x-2">
    <button
      class="px-3 py-1 border rounded hover:bg-gray-100"
      on:click={() => changePage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span class="px-3 py-1">Page {currentPage} of {totalPages}</span>
    <button
      class="px-3 py-1 border rounded hover:bg-gray-100"
      on:click={() => changePage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
</div>
