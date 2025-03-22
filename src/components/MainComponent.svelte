<script>
  import { onMount } from 'svelte';
  import PatientForm from './PatientForm.svelte';
  import PatientDataTable from './PatientDataTable.svelte';
  import PatientProfile from './PatientProfile.svelte';

  let patientData = [];
  let showConfirmation = false;
  let showDeleteConfirmation = false;
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
      const response = await fetch('https://hello.adeycustom.com/api.php', {
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
        }, 4000); // Hide confirmation after 4 seconds
      } else {
        errorMessage = `Error submitting data: ${response.statusText}`;
      }
    } catch (error) {
      errorMessage = `Error submitting data: ${error.message}`;
    }
  }

  async function fetchPatientData() {
    try {
      const response = await fetch('https://hello.adeycustom.com/api.php');
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

  async function deletePatient(id) {
    try {
      const response = await fetch('https://hello.adeycustom.com/api.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        await fetchPatientData();
        showDeleteConfirmation = true;
        setTimeout(() => {
          showDeleteConfirmation = false;
        }, 4000); // Hide confirmation after 4 seconds
      } else {
        errorMessage = `Error deleting data: ${response.statusText}`;
      }
    } catch (error) {
      errorMessage = `Error deleting data: ${error.message}`;
    }
  }

  onMount(() => {
    fetchPatientData();
  });
</script>

<div class="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4 md:p-6">
  <div class="container mx-auto w-full max-w-7xl flex flex-col space-y-6">
    <!-- Patient Profile Card -->
    <PatientProfile {patientProfile} />

    <!-- Form and Data Display Section -->
    <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-6 w-full">
      <!-- Form Card -->
      <PatientForm onSubmit={handleSubmit} class="w-full md:w-1/2" />

      <!-- Data Display Card -->
      <PatientDataTable data={patientData} onDelete={deletePatient} class="w-full md:w-1/2" />
    </div>

    {#if showConfirmation}
      <div class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg opacity-100 transform transition-opacity duration-1000">
        Data submitted successfully!
      </div>
    {/if}

    {#if showDeleteConfirmation}
      <div class="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg opacity-100 transform transition-opacity duration-1000">
        Data deleted successfully!
      </div>
    {/if}

    {#if errorMessage}
      <div class="text-red-500 text-center mt-4">{errorMessage}</div>
    {/if}
  </div>
</div>
