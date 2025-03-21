<!-- PatientDataTable.svelte -->
<script>
  export let data;
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

const isoString = "2024-03-21T11:30:00.000Z";
const formattedDateTime = formatDateTime(isoString);
console.log(formattedDateTime); // Output: "March 21, 2024: 11:30 AM"

</script>

<div class="w-full bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
  <h3 class="text-xl font-bold mb-4">Submitted Patient Data</h3>
  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="bg-gray-200">
        <th class="px-4 py-2 border">Name</th>
    
        <th class="px-4 py-2 border">Weight (kg)</th>
     
        <th class="px-4 py-2 border">Temperature (°C)</th>
        <th class="px-4 py-2 border">BP</th>
        <th class="px-4 py-2 border">Oxygen (%)</th>
        
        <th class="px-4 py-2 border">Submitted Date</th>
      </tr>
    </thead>
    <tbody>
      {#each data as patient}
        <tr>
          <td class="px-4 py-2 border">{patient.name}</td>
        
          <td class="px-4 py-2 border">{patient.weight}</td>
        
          <td class="px-4 py-2 border">{patient.temperature}</td>
          <td class="px-4 py-2 border">{patient.bp}</td>
          <td class="px-4 py-2 border">{patient.oxygenRate}</td>
          
           <td class="px-4 py-2 border">{formatDateTime(patient.submittedDate)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
