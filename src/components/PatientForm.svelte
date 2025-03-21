<script>
  import { format } from 'date-fns';
  import { onMount } from 'svelte';

  // Initialize variables with default values
  let name = 'B.Biruktawit T';
  let dob = '2023-11-05'; // Date of Birth: November 5, 2023
  let weight = '';
  let age = '1'; // Age: 1 year
  let temperature = '';
  let bp = '';
  let oxygenRate = '';
  let nurseName = '';
  let submittedDate = '';
  let patientData = [];
  let isSubmitting = false;
  let showConfirmation = false;

  // Patient Profile Data
  let patientProfile = {
    image: 'https://via.placeholder.com/150', // Placeholder image URL
    cardNumber: '1234567890',
    admissionDate: '2024-03-21',
    motherName: 'Mother Name',
    address: 'Address of the patient',
    createdDate: '2024-03-21'
  };

  async function handleSubmit(event) {
    event.preventDefault();
    isSubmitting = true;

    const newData = {
      name,
      dob,
      weight,
      age,
      temperature,
      bp,
      oxygenRate,
      nurseName,
      submittedDate: format(new Date(), 'MMMM d, yyyy HH:mm:ss')
    };

    try {
      const response = await fetch('http://localhost:3001/submit-patient-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });

      if (response.ok) {
        await fetchPatientData();
        resetForm();
        showConfirmation = true;
        setTimeout(() => {
          showConfirmation = false;
        }, 3000); // Hide confirmation after 3 seconds
      } else {
        console.error('Error submitting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      isSubmitting = false;
    }
  }

  async function fetchPatientData() {
    try {
      const response = await fetch('http://localhost:3001/get-patient-data');
      if (response.ok) {
        const data = await response.json();
        patientData = data;
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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

  onMount(() => {
    fetchPatientData();
  });
</script>

<div class="container mx-auto p-6 border rounded-lg shadow-lg flex flex-col space-y-6">
  <!-- Patient Profile Card -->
  <div class="w-full bg-white shadow-lg rounded-lg p-6 flex-1">
    <h2 class="text-2xl font-bold text-center mb-4">Patient Profile</h2>
    <div class="flex items-center space-x-4">
      <img src={patientProfile.image} alt="Patient Image" class="w-20 h-20 rounded-full object-cover"/>
      <div>
        <p class="text-lg font-semibold">Card Number: {patientProfile.cardNumber}</p>
        <p class="text-lg font-semibold">Date of Admission: {patientProfile.admissionDate}</p>
        <p class="text-lg font-semibold">Age: {age} years</p>
        <p class="text-lg font-semibold">Mother's Name: {patientProfile.motherName}</p>
        <p class="text-lg font-semibold">Address: {patientProfile.address}</p>
        <p class="text-lg font-semibold">Date of Birth: {dob}</p>
        <p class="text-lg font-semibold">Created Date: {patientProfile.createdDate}</p>
      </div>
    </div>
  </div>

  <!-- Form Card -->
  <div class="w-full flex-1 p-6 border-t">
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
        <input type="number" id="weight" bind:value={weight} required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <i class="fas fa-weight absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
      </div>
      <div class="relative">
        <label class="block text-gray-700" for="age">Age:</label>
        <input type="number" id="age" bind:value={age} required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <i class="fas fa-birthday-cake absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
      </div>
      <div class="relative">
        <label class="block text-gray-700" for="temperature">Temperature (°C):</label>
        <input type="text" id="temperature" bind:value={temperature} required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <i class="fas fa-thermometer-half absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
      </div>
      <div class="relative">
        <label class="block text-gray-700" for="bp">Blood Pressure (e.g., 120/80):</label>
        <input type="text" id="bp" bind:value={bp} required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <i class="fas fa-heartbeat absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
      </div>
      <div class="relative">
        <label class="block text-gray-700" for="oxygenRate">Oxygen Rate (%):</label>
        <input type="text" id="oxygenRate" bind:value={oxygenRate} required class="w-full px-4 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
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
    {#if showConfirmation}
      <div class="text-green-500 text-center mt-4">Data submitted successfully!</div>
    {/if}
  </div>

  <!-- Data Display Card -->
  {#if patientData.length > 0}
    <div class="w-full flex-1 p-6">
      <h3 class="text-xl font-bold mb-4">Submitted Patient Data</h3>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Date of Birth</th>
            <th class="px-4 py-2 border">Weight (kg)</th>
            <th class="px-4 py-2 border">Age</th>
            <th class="px-4 py-2 border">Temperature (°C)</th>
            <th class="px-4 py-2 border">Blood Pressure</th>
            <th class="px-4 py-2 border">Oxygen Rate (%)</th>
            <th class="px-4 py-2 border">Nurse Name</th>
            <th class="px-4 py-2 border">Submitted Date</th>
          </tr>
        </thead>
        <tbody>
          {#each patientData as data}
            <tr>
              <td class="px-4 py-2 border">{data.name}</td>
              <td class="px-4 py-2 border">{data.dob}</td>
              <td class="px-4 py-2 border">{data.weight}</td>
              <td class="px-4 py-2 border">{data.age}</td>
              <td class="px-4 py-2 border">{data.temperature}</td>
              <td class="px-4 py-2 border">{data.bp}</td>
              <td class="px-4 py-2 border">{data.oxygenRate}</td>
              <td class="px-4 py-2 border">{data.nurseName}</td>
              <td class="px-4 py-2 border">{data.submittedDate}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
