<!-- MainComponent.svelte -->
<script>
  import { onMount } from 'svelte';
  import PatientForm from './PatientForm.svelte';
  import PatientDataTable from './PatientDataTable.svelte';
  import PatientProfile from './PatientProfile.svelte';

  let patientData = [];
  let showConfirmation = false;
  let errorMessage = '';

  // Patient Profile Data
  let patientProfile = {
    image: 'https://via.placeholder.com/150', // Ensure the image URL is correct
    cardNumber: '1234567890',
    admissionDate: '2024-03-21',
    motherName: 'Mother Name',
    address: 'Address of the patient',
    dob: '2023-11-05',
    createdDate: '2024-03-21'
  };

  async function handleSubmit(newData) {
    try {
      const response = await fetch('http://localhost:3001/api/submit-patient-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });

      if (response.ok) {
        await fetchPatientData();
        showConfirmation = true;
        setTimeout(() => {
          showConfirmation = false;
        }, 3000); // Hide confirmation after 3 seconds
      } else {
        errorMessage = `Error submitting data: ${response.statusText}`;
      }
    } catch (error) {
      errorMessage = `Error submitting data: ${error.message}`;
    }
  }

  async function fetchPatientData() {
    try {
      const response = await fetch('http://localhost:3001/api/get-patient-data');
      if (response.ok) {
        const data = await response.json();
        patientData = data;
      } else {
        errorMessage = `Error fetching data: ${response.statusText}`;
      }
    } catch (error) {
      errorMessage = `Error fetching data: ${error.message}`;
    }
  }

  onMount(() => {
    fetchPatientData();
  });
</script>

<div class="container mx-auto p-6 border rounded-lg shadow-lg w-full max-w-30xl flex flex-col space-y-6">
  <!-- Patient Profile Card -->
  <PatientProfile {patientProfile} />

  <!-- Form and Data Display Section -->
  <div class="flex space-x-6 mt-6">
    
    <!-- Form Card -->
    <PatientForm onSubmit={handleSubmit} />

    <!-- Data Display Card -->
    <PatientDataTable data={patientData} />
  </div>

  {#if showConfirmation}
    <div class="text-green-500 text-center mt-4">Data submitted successfully!</div>
  {/if}

  {#if errorMessage}
    <div class="text-red-500 text-center mt-4">{errorMessage}</div>
  {/if}
</div>
