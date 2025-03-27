<script>
  import PatientProfile from './PatientProfile.svelte';
  import Navigation from './Navigation.svelte'; // Adjust the path as needed

  // Patient Profile Data
  let patientProfile = {
    image: 'https://i.postimg.cc/fRGQhT16/2B0A0912.jpg', // Ensure the image URL is correct
    patientName: 'B. Biruktawit T',
    cardNumber: '121347',
    admissionDate: '11-3-2025',
    motherName: 'Biruktawit T',
    address: 'Addis Ababa - Sub City - Akaki Kality',
    dob: '11-05-2013',
    createdDate: '2024-03-21'
  };

  // Hospital Details
  const hospitalLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKmEzWkCLrxkMYGRRQRPqELEoC9v3L90hIA&s'; // Replace with your actual hospital logo URL
  const hospitalName = 'Betezata Hospital';

  // Developer Contact Information
  const developerPhone = '+251-916-182-957'; // Replace with the actual developer phone number

  // Helper function to calculate age
  function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }

    return `${years} Year${years > 1 ? 's' : ''} and ${months} Month${months > 1 ? 's' : ''}`;
  }
</script>

<!-- Entrance Animation -->
<div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
  <!-- Navigation Component -->
  <Navigation />

  <!-- Patient Profile Section -->
  <div class="container mx-auto p-6 mt-8 w-full max-w-5xl bg-white rounded-lg shadow-lg transform transition duration-700 hover:scale-[1.01]">
    <!-- Hospital Name and Logo -->
    <div class="flex items-center justify-center mb-6 space-x-4">
      <img
        src={hospitalLogo}
        alt="Hospital Logo"
        class="w-16 h-16 rounded-full object-cover shadow-md animate-fade-in"
      />
      <h1 class="text-3xl font-bold text-gray-800">{hospitalName}</h1>
    </div>

    <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">Patient Information</h1>

    <!-- Profile Card -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Profile Image -->
      <div class="flex-shrink-0 w-full md:w-1/3 flex justify-center">
        <div class="relative w-40 h-40">
          <img
            src={patientProfile.image}
            alt="Patient Profile"
            class="w-full h-full rounded-full object-cover shadow-md border-4 border-gray-200 animate-fade-in"
          />
        </div>
      </div>

      <!-- Profile Details Table -->
      <div class="flex-grow w-full md:w-2/3">
        <div class="border border-gray-300 rounded-lg overflow-hidden">
          <table class="min-w-full border-collapse border border-gray-300">
            <tbody class="divide-y divide-dotted divide-gray-300">
              <!-- Card Number -->
              <tr class="hover:bg-gray-50 transition duration-300">
                <td class="px-4 py-3 font-semibold text-gray-600">Card Number:</td>
                <td class="px-4 py-3 text-lg font-bold text-gray-800">{patientProfile.cardNumber}</td>
              </tr>

              <!-- Name -->
              <tr class="hover:bg-gray-50 transition duration-300">
                <td class="px-4 py-3 font-semibold text-gray-600">Name:</td>
                <td class="px-4 py-3 text-lg font-bold text-gray-800">{patientProfile.patientName}</td>
              </tr>

              <!-- Date of Admission -->
              <tr class="hover:bg-gray-50 transition duration-300">
                <td class="px-4 py-3 font-semibold text-gray-600">Date of Admission:</td>
                <td class="px-4 py-3 text-lg font-bold text-gray-800">{patientProfile.admissionDate}</td>
              </tr>

              <!-- Age -->
              <tr class="hover:bg-gray-50 transition duration-300">
                <td class="px-4 py-3 font-semibold text-gray-600">Age:</td>
                <td class="px-4 py-3 text-lg font-bold text-gray-800">{calculateAge(patientProfile.dob)}</td>
              </tr>

              <!-- Mother's Name -->
              <tr class="hover:bg-gray-50 transition duration-300 border-b border-dotted border-gray-300">
                <td class="px-4 py-3 font-semibold text-gray-600">Mother's Name:</td>
                <td class="px-4 py-3 text-lg font-bold text-gray-800">{patientProfile.motherName}</td>
              </tr>

              <!-- Address -->
              <tr class="hover:bg-gray-50 transition duration-300 border-b border-dotted border-gray-300">
                <td class="px-4 py-3 font-semibold text-gray-600">Address:</td>
                <td class="px-4 py-3 text-lg font-bold text-gray-800">{patientProfile.address}</td>
              </tr>

              <!-- Date of Birth -->
              <tr class="hover:bg-gray-50 transition duration-300 border-b border-dotted border-gray-300">
                <td class="px-4 py-3 font-semibold text-gray-600">Date of Birth:</td>
                <td class="px-4 py-3 text-lg font-bold text-gray-800">{patientProfile.dob}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Developer Phone Footer -->
    <div class="mt-6 p-4 bg-gray-100 rounded-b-lg text-center text-sm text-gray-600 border-t border-gray-300">
      <span>Developed by Michael | Contact: {developerPhone}</span>
    </div>
  </div>
</div>

<style>
  /* Custom Fade-In Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 1s ease-in-out;
  }
</style>