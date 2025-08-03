<script>
  // Props
  export let data = [];
  export let onDelete = () => {};

  // State variables
  let searchQuery = '';
  let expandedRecords = new Set();

  // Filter data based on search query
  $: filteredData = searchQuery 
    ? data.filter(record => 
        record.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.nurseName?.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => new Date(b.submittedDate || b.created_at) - new Date(a.submittedDate || a.created_at))
    : data.sort((a, b) => new Date(b.submittedDate || b.created_at) - new Date(a.submittedDate || a.created_at));

  // Open first accordion by default
  $: if (filteredData.length > 0 && expandedRecords.size === 0) {
    expandedRecords.add(filteredData[0].id);
    expandedRecords = expandedRecords;
  }

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).replace(",", "");
  }

  function handleDelete(id) {
    if (confirm('Are you sure you want to delete this record?')) {
      onDelete(id);
    }
  }

  function toggleRecord(id) {
    if (expandedRecords.has(id)) {
      expandedRecords.delete(id);
    } else {
      // Close all other records and open only the clicked one
      expandedRecords.clear();
      expandedRecords.add(id);
    }
    expandedRecords = expandedRecords; // Trigger reactivity
  }
</script>

<!-- Main Container -->
<div class="w-full bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-4 md:p-6">
  <h3 class="text-xl md:text-2xl font-bold mb-4 text-gray-800 text-center">
    <i class="fas fa-clipboard-list text-purple-500 mr-2"></i>
    Vital Signs Records
  </h3>

     <!-- Search Input -->
   <div class="relative mb-6">
     <input
       type="text"
       placeholder="Search by Avi's name or nurse..."
       class="w-full px-4 py-3 pl-12 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/90 backdrop-blur-sm"
       bind:value={searchQuery}
     />
     <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400"></i>
   </div>

  <!-- Accordion List -->
  <div class="space-y-3">
    {#if filteredData.length > 0}
      {#each filteredData as record}
        <div class="bg-white rounded-lg border border-pink-200 overflow-hidden">
          <!-- Accordion Header -->
          <div 
            class="flex justify-between items-center p-4 cursor-pointer bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all duration-300"
            on:click={() => toggleRecord(record.id)}
          >
                         <div class="flex items-center space-x-3">
               <i class="fas fa-user text-pink-500 text-lg"></i>
               <div>
                 <div class="font-bold text-gray-800">{formatDateTime(record.submittedDate || record.created_at)}</div>
               </div>
             </div>
            <div class="flex items-center space-x-3">
              <i class="fas fa-chevron-down text-pink-500 transition-transform duration-300 {expandedRecords.has(record.id) ? 'rotate-180' : ''}"></i>
            </div>
          </div>

          <!-- Accordion Content -->
          {#if expandedRecords.has(record.id)}
            <div class="p-4 bg-gray-50 border-t border-pink-200 animate-fade-in">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                 <!-- Avi's Name -->
                 <div class="flex items-center space-x-2 p-2 bg-pink-50 rounded">
                   <i class="fas fa-user text-pink-500"></i>
                   <span class="text-sm text-gray-600">Avi:</span>
                   <span class="font-medium text-gray-800">[{record.name || 'N/A'}]</span>
                 </div>

                <!-- Nurse Name -->
                <div class="flex items-center space-x-2 p-2 bg-purple-50 rounded">
                  <i class="fas fa-user-nurse text-purple-500"></i>
                  <span class="text-sm text-gray-600">Nurse:</span>
                  <span class="font-medium text-gray-800">[{record.nurseName || 'N/A'}]</span>
                </div>

                <!-- Temperature -->
                <div class="flex items-center space-x-2 p-2 bg-red-50 rounded">
                  <i class="fas fa-thermometer-half text-red-500"></i>
                  <span class="text-sm text-gray-600">Temp:</span>
                  <span class="font-medium text-gray-800">[{record.temperature || 'N/A'} °C]</span>
                </div>

                <!-- Blood Pressure -->
                <div class="flex items-center space-x-2 p-2 bg-pink-50 rounded">
                  <i class="fas fa-heartbeat text-pink-500"></i>
                  <span class="text-sm text-gray-600">BP:</span>
                  <span class="font-medium text-gray-800">[{record.bp || 'N/A'}]</span>
                </div>

                <!-- Oxygen Rate -->
                <div class="flex items-center space-x-2 p-2 bg-cyan-50 rounded">
                  <i class="fas fa-lungs text-cyan-500"></i>
                  <span class="text-sm text-gray-600">O2:</span>
                  <span class="font-medium text-gray-800">[{record.oxygenRate || 'N/A'} %]</span>
                </div>

                <!-- Weight -->
                <div class="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                  <i class="fas fa-weight text-blue-500"></i>
                  <span class="text-sm text-gray-600">Weight:</span>
                  <span class="font-medium text-gray-800">[{record.weight || 'N/A'} kg]</span>
                </div>

                
              </div>

              <!-- Delete Button Inside Accordion -->
              <div class="mt-4 flex justify-end">
                <button
                  on:click={() => handleDelete(record.id)}
                  class="bg-red-500 text-white px-4 py-2 rounded text-sm flex items-center space-x-2 hover:bg-red-600 transition-colors"
                >
                  <i class="fas fa-trash-alt"></i>
                  <span>Delete Record</span>
                </button>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    {:else}
             <div class="text-center py-8">
         <i class="fas fa-inbox text-gray-400 text-4xl mb-4"></i>
         <div class="text-gray-600 font-medium">No vital signs records found</div>
         <div class="text-gray-500 text-sm mt-2">
           {searchQuery ? 'Try adjusting your search terms' : 'Add some vital signs data for Avi to get started'}
         </div>
       </div>
    {/if}
  </div>
</div>

<style>
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>