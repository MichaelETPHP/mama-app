<script>
  import { onMount } from 'svelte';

  // State variables
  let formData = {
    name: 'Baby Bruktawit',
    dob: '2024-03-03',
    weight: '8',
    age: '1',
    temperature: '36.5',
    bp: '125/65',
    oxygenRate: '98',
    nurseName: 'Michael'
  };
  let errorMessage = '';
  let successMessage = '';
  let isSubmitting = false; // Track if the form is submitting

  // Submit feeding data to the API
  async function handleSubmit(event) {
    event.preventDefault();
    isSubmitting = true; // Set isSubmitting to true when submission starts

    // Log the form data
    console.log("Submitting form data:", formData);

    try {
        const response = await fetch('https://hello.adeycustom.com/api.php?type=vital', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
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

<div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
  <h2 class="text-2xl font-bold text-center mb-4">Patient Vital Signs</h2>
  <form on:submit={handleSubmit} class="space-y-4">
    <!-- Name Field -->
    <div class="relative">
      <label class="block text-gray-700" for="name">Patient Name:</label>
      <input
        type="text"
        id="name"
        bind:value={formData.name}
        required
        class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>

    <!-- Date of Birth Field -->
    <div class="relative">
      <label class="block text-gray-700" for="dob">Date of Birth:</label>
      <input
        type="date"
        id="dob"
        bind:value={formData.dob}
        required
        class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <i class="fas fa-calendar-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>

    <!-- Weight Field -->
    <div class="relative">
      <label class="block text-gray-700" for="weight">Weight (kg):</label>
      <input
        type="number"
        id="weight"
        bind:value={formData.weight}
        step="0.1"
        required
        class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <i class="fas fa-weight absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>

    <!-- Age Field -->
    <div class="relative">
      <label class="block text-gray-700" for="age">Age:</label>
      <input
        type="number"
        id="age"
        bind:value={formData.age}
        required
        class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <i class="fas fa-birthday-cake absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>

    <!-- Temperature Field -->
    <div class="relative">
      <label class="block text-gray-700" for="temperature">Temperature (°C):</label>
      <input
        type="number"
        id="temperature"
        bind:value={formData.temperature}
        step="0.1"
        required
        class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <i class="fas fa-thermometer-half absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>

    <!-- Blood Pressure Field -->
    <div class="relative">
      <label class="block text-gray-700" for="bp">Blood Pressure (e.g., 127/90):</label>
      <input
        type="text"
        id="bp"
        bind:value={formData.bp}
        required
        class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <i class="fas fa-heartbeat absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>

    <!-- Oxygen Rate Field -->
    <div class="relative">
      <label class="block text-gray-700" for="oxygenRate">Oxygen Rate (%):</label>
      <input
        type="number"
        id="oxygenRate"
        bind:value={formData.oxygenRate}
        step="0.1"
        required
        class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <i class="fas fa-lungs absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>

    <!-- Nurse Name Field -->
    <div class="relative">
      <label class="block text-gray-700" for="nurseName">Nurse Name:</label>
      <input
        type="text"
        id="nurseName"
        bind:value={formData.nurseName}
        required
        class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <i class="fas fa-user-nurse absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
      disabled={isSubmitting} 
    >
      {#if isSubmitting}
        <span>Submitting...</span>
      {:else}
        <span>Submit</span>
      {/if}
    </button>

    <!-- Error Message -->
    {#if errorMessage}
      <div class="bg-red-100 text-red-700 p-4 rounded">{errorMessage}</div>
    {/if}

    <!-- Success Message -->
    {#if successMessage}
      <div class="bg-green-100 text-green-700 p-4 rounded">{successMessage}</div>
    {/if}
  </form>
</div>
