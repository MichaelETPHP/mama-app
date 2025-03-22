<script>
  export let data = [];
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
      </tr>
    </thead>
    <tbody>
      {#if filteredData.length > 0}
        {#each filteredData as patient}
          <tr class="hover:bg-gray-100">
            <td class="px-4 py-2 border">{patient.name}</td>
            <td class="px-4 py-2 border">{patient.weight}</td>
            <td class="px-4 py-2 border">{patient.temperature}</td>
            <td class="px-4 py-2 border">{patient.bp}</td>
            <td class="px-4 py-2 border">{patient.oxygenRate}</td>
            <td class="px-4 py-2 border">{formatDateTime(patient.submittedDate)}</td>
          </tr>
        {/each}
      {:else}
        <tr>
          <td colspan="6" class="text-center py-4">No data available</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
