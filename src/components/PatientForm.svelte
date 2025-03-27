<script>
  import { format } from 'date-fns';

  export let onSubmit;

  let name = 'B.Biruktawit T';
  let dob = '2023-11-05';
  let weight = '8';
  let age = '1';
  let temperature = '36.5';
  let bp = '120/70';
  let oxygenRate = '90.6';
  let nurseName = 'Lidya';
  let isSubmitting = false;

  async function handleSubmit(event) {
    event.preventDefault();
    isSubmitting = true;

    const newData = {
      name,
      dob,
      weight: parseFloat(weight), // Ensure weight is parsed as a float
      age: parseInt(age), // Ensure age is parsed as an integer
      temperature: parseFloat(temperature), // Ensure temperature is parsed as a float
      bp,
      oxygenRate: parseFloat(oxygenRate), // Ensure oxygenRate is parsed as a float
      nurseName,
      submittedDate: format(new Date(), 'MMMM d, yyyy HH:mm:ss')
    };

    console.log("Data being submitted:", newData); // Log the data

    try {
      await onSubmit(newData);
      resetForm();
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function resetForm() {
    name = 'B.Biruktawit T';
    dob = '2023-11-05';
    weight = '';
    age = '1';
    temperature = '';
    bp = '';
    oxygenRate = '';
    nurseName = '';
  }
</script>

<div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
  <h2 class="text-2xl font-bold text-center mb-4">Patient Vital Signs</h2>
  <form on:submit={handleSubmit} class="space-y-4">
    <div class="relative">
      <label class="block text-gray-700" for="name">Patient Name:</label>
      <input type="text" id="name" bind:value={name} required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="dob">Date of Birth:</label>
      <input type="date" id="dob" bind:value={dob} required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-calendar-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="weight">Weight (kg):</label>
      <input type="number" id="weight" bind:value={weight} step="0.1" required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-weight absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="age">Age:</label>
      <input type="number" id="age" bind:value={age} required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-birthday-cake absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="temperature">Temperature (°C):</label>
      <input type="number" id="temperature" bind:value={temperature} step="0.1" required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-thermometer-half absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="bp">Blood Pressure (e.g., 120/80):</label>
      <input type="text" id="bp" bind:value={bp} required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-heartbeat absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="oxygenRate">Oxygen Rate (%):</label>
      <input type="number" id="oxygenRate" bind:value={oxygenRate} step="0.1" required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-lungs absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="nurseName">Nurse Name:</label>
      <input type="text" id="nurseName" bind:value={nurseName} required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-user-nurse absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center" disabled={isSubmitting}>
      {#if isSubmitting}
        <i class="fas fa-spinner animate-spin"></i>
      {/if}
      <span>Submit</span>
    </button>
  </form>
</div>
