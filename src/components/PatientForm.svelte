<script>
  import { onMount } from 'svelte';

  // State variables
  let formData = {
    name: 'Aviela Michael Taye',
    dob: '2024-03-03',
    weight: '7.5',
    age: '1/8',
    temperature: '36.5',
    bp: '125/65',
    oxygenRate: '98',
    nurseName: 'Nr-Lidya'
  };
  let errorMessage = '';
  let successMessage = '';
  let isSubmitting = false; // Track if the form is submitting

  // Submit feeding data to the API
  async function handleSubmit(event) {
    event.preventDefault();
    isSubmitting = true; // Set isSubmitting to true when submission starts

    // Add current date and time to the form data
    const currentDateTime = new Date().toISOString();
    const formDataWithDateTime = {
      ...formData,
      submittedDate: currentDateTime
    };

    // Log the form data
    console.log("Submitting form data:", formDataWithDateTime);

    try {
        const response = await fetch('https://hello.adeycustom.com/api.php?type=vital', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataWithDateTime)
        });

        if (response.ok) {
            const result = await response.json();
            successMessage = result.message || 'Data submitted successfully!';
            resetForm(); // Reset the form fields
        } else {
            const errorResult = await response.json();
            errorMessage = errorResult.error || 'Error submitting data.';
        }
    } catch (error) {
        errorMessage = `Error submitting data: ${error.message}`;
    } finally {
        isSubmitting = false; // Set isSubmitting to false after submission is complete
    }
  }

  // Reset the form fields
  function resetForm() {
    formData = {
      name: '',
      dob: '',
      weight: '',
      age: '',
      temperature: '',
      bp: '',
      oxygenRate: '',
      nurseName: ''
    };
  }
</script>

<div class="w-full max-w-lg mx-auto">
  <form on:submit={handleSubmit} class="space-y-4">
         <!-- Name Field -->
     <div class="relative group">
       <label class="block text-sm font-semibold text-gray-700 mb-2" for="name">
         Avi's Name:
       </label>
       <div class="relative">
         <input
           type="text"
           id="name"
           bind:value={formData.name}
           required
           disabled
           placeholder="Enter Avi's name"
           class="w-full px-4 py-3 pl-12 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-gray-100 cursor-not-allowed"
         />
         <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
       </div>
     </div>

         <!-- Date of Birth Field -->
     <div class="relative group">
       <label class="block text-sm font-semibold text-gray-700 mb-2" for="dob">
         Date of Birth:
       </label>
       <div class="relative">
         <input
           type="date"
           id="dob"
           value="2024-03-03"
           disabled
           class="w-full px-4 py-3 pl-12 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-100 cursor-not-allowed"
         />
         <i class="fas fa-calendar-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
       </div>
     </div>

    <!-- Weight Field -->
    <div class="relative group">
      <label class="block text-sm font-semibold text-gray-700 mb-2" for="weight">
        Weight (kg):
      </label>
      <div class="relative">
        <input
          type="number"
          id="weight"
          bind:value={formData.weight}
          step="0.1"
          required
          placeholder="Enter weight in kg"
          class="w-full px-4 py-3 pl-12 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/90 backdrop-blur-sm"
        />
        <i class="fas fa-weight absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"></i>
      </div>
    </div>

         <!-- Age Field -->
     <div class="relative group">
       <label class="block text-sm font-semibold text-gray-700 mb-2" for="age">
         Age:
       </label>
       <div class="relative">
         <input
           type="text"
           id="age"
           value="1 Year and 8 Months"
           disabled
           class="w-full px-4 py-3 pl-12 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-100 cursor-not-allowed"
         />
         <i class="fas fa-birthday-cake absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
       </div>
     </div>

    <!-- Temperature Field -->
    <div class="relative group">
      <label class="block text-sm font-semibold text-gray-700 mb-2" for="temperature">
        Temperature (°C):
      </label>
      <div class="relative">
        <input
          type="number"
          id="temperature"
          bind:value={formData.temperature}
          step="0.1"
          required
          placeholder="Enter temperature"
          class="w-full px-4 py-3 pl-12 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/90 backdrop-blur-sm"
        />
        <i class="fas fa-thermometer-half absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400"></i>
      </div>
    </div>

    <!-- Blood Pressure Field -->
    <div class="relative group">
      <label class="block text-sm font-semibold text-gray-700 mb-2" for="bp">
        Blood Pressure:
      </label>
      <div class="relative">
        <input
          type="text"
          id="bp"
          bind:value={formData.bp}
          required
          placeholder="e.g., 127/90"
          class="w-full px-4 py-3 pl-12 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 bg-white/90 backdrop-blur-sm"
        />
        <i class="fas fa-heartbeat absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400"></i>
      </div>
    </div>

    <!-- Oxygen Rate Field -->
    <div class="relative group">
      <label class="block text-sm font-semibold text-gray-700 mb-2" for="oxygenRate">
        Oxygen Rate (%):
      </label>
      <div class="relative">
        <input
          type="number"
          id="oxygenRate"
          bind:value={formData.oxygenRate}
          step="0.1"
          required
          placeholder="Enter oxygen rate"
          class="w-full px-4 py-3 pl-12 border-2 border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-white/90 backdrop-blur-sm"
        />
        <i class="fas fa-lungs absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400"></i>
      </div>
    </div>

         <!-- Nurse Name Field -->
     <div class="relative group">
       <label class="block text-sm font-semibold text-gray-700 mb-2" for="nurseName">
         Nurse Name:
       </label>
       <div class="relative">
         <select
           id="nurseName"
           bind:value={formData.nurseName}
           required
           class="w-full px-4 py-3 pl-12 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/90 backdrop-blur-sm"
         >
           <option value="Nr-Lidya">Nr-Lidya</option>
           <option value="Nr-Beza">Nr-Beza</option>
           <option value="Nr-Jerry">Nr-Jerry</option>
           <option value="Nr-Werke">Nr-Werke</option>
         </select>
         <i class="fas fa-user-nurse absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400"></i>
       </div>
     </div>

    <!-- Submit Button -->
    <button
      type="submit"
      class="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold shadow-lg"
      disabled={isSubmitting} 
    >
      {#if isSubmitting}
        <i class="fas fa-spinner fa-spin mr-2"></i>
        <span>Submitting...</span>
      {:else}
        <i class="fas fa-heart mr-2"></i>
        <span>Submit Vital Signs</span>
      {/if}
    </button>

    <!-- Error Message -->
    {#if errorMessage}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
        <i class="fas fa-exclamation-triangle mr-2"></i>
        {errorMessage}
      </div>
    {/if}

    <!-- Success Message -->
    {#if successMessage}
      <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center">
        <i class="fas fa-check-circle mr-2"></i>
        {successMessage}
      </div>
    {/if}
  </form>
</div>
