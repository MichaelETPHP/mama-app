<script>
  import PatientProfile from './PatientProfile.svelte';
  import Navigation from './Navigation.svelte'; // Adjust the path as needed

  // Patient Profile Data
  let patientProfile = {
    image: '/profile.jpg', // Using local profile image from static directory
    patientName: 'Aviela Michael Taye',
    cardNumber: '121347',
    admissionDate: '11-3-2025',
    motherName: 'Biruktawit T',
    address: 'Addis Ababa - Sub City - Akaki Kality',
    dob: '11-05-2013',
    createdDate: '2024-03-21',
    age: "1 Year and 8 Months" // This will be calculated dynamically

  };

  // Hospital Details
  const hospitalLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKmEzWkCLrxkMYGRRQRPqELEoC9v3L90hIA&s'; // Replace with your actual hospital logo URL
  const hospitalName = 'Betezata Hospital';

  // Developer Contact Information
  const developerPhone = '+251-916-182-957'; // Replace with the actual developer phone number

  // Modal state
  let showModal = false;

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

  // Function to open modal
  function openModal() {
    showModal = true;
  }

  // Function to close modal
  function closeModal() {
    showModal = false;
  }

  // Close modal when clicking outside
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

<!-- Beautiful Love-Themed Profile Page -->
<div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
  <!-- Animated Background Hearts -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-20 left-10 w-6 h-6 text-pink-200 animate-bounce">
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
    <div class="absolute top-40 right-20 w-4 h-4 text-purple-200 animate-bounce" style="animation-delay: 0.5s;">
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
    <div class="absolute bottom-40 left-20 w-5 h-5 text-pink-200 animate-bounce" style="animation-delay: 1s;">
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
    <div class="absolute bottom-20 right-10 w-7 h-7 text-purple-200 animate-bounce" style="animation-delay: 1.5s;">
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
  </div>

  <!-- Navigation Component -->
  <Navigation />

  <!-- Main Content with Beautiful Frame -->
  <div class="relative z-10 flex items-center justify-center min-h-screen p-4">
    <div class="relative max-w-6xl w-full">
      <!-- Beautiful Love Frame Container -->
      <div class="relative bg-gradient-to-br from-pink-100 via-white to-purple-100 rounded-3xl p-4 md:p-8 shadow-2xl border-4 border-pink-300 transform scale-95 hover:scale-100 transition-transform duration-500">
        <!-- Decorative Corner Hearts -->
        <div class="absolute -top-4 -left-4 w-6 h-6 md:w-8 md:h-8 text-pink-400 animate-bounce">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div class="absolute -top-4 -right-4 w-6 h-6 md:w-8 md:h-8 text-purple-400 animate-bounce" style="animation-delay: 0.5s;">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div class="absolute -bottom-4 -left-4 w-6 h-6 md:w-8 md:h-8 text-purple-400 animate-bounce" style="animation-delay: 1s;">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div class="absolute -bottom-4 -right-4 w-6 h-6 md:w-8 md:h-8 text-pink-400 animate-bounce" style="animation-delay: 1.5s;">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

                <!-- Patient Profile Section -->
        <div class="relative overflow-hidden rounded-2xl shadow-xl bg-white/50 backdrop-blur-sm p-4 md:p-6">
          <!-- Hospital Name and Logo -->
          <div class="flex flex-col md:flex-row items-center justify-center mb-6 space-y-2 md:space-y-0 md:space-x-4">
            <img
              src={hospitalLogo}
              alt="Hospital Logo"
              class="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shadow-md animate-fade-in"
            />
            <h1 class="text-xl md:text-3xl font-bold text-gray-800 text-center">{hospitalName}</h1>
          </div>

          <h1 class="text-lg md:text-2xl font-semibold text-center text-gray-700 mb-4 md:mb-6">Patient Information</h1>

              <!-- Profile Card -->
          <div class="flex flex-col md:flex-row gap-4 md:gap-6">
            <!-- Profile Image -->
            <div class="flex-shrink-0 w-full md:w-1/3 flex justify-center">
              <div class="relative w-32 h-32 md:w-40 md:h-40">
                <img
                  src={patientProfile.image}
                  alt="Patient Profile"
                  class="w-full h-full rounded-full object-cover shadow-md border-4 border-pink-200 animate-fade-in cursor-pointer hover:scale-105 transition-transform duration-300"
                  on:click={openModal}
                />
              </div>
            </div>

            <!-- Profile Details Table -->
            <div class="flex-grow w-full md:w-2/3">
              <div class="border border-pink-200 rounded-lg overflow-hidden bg-white/80">
                <table class="min-w-full border-collapse">
                  <tbody class="divide-y divide-pink-100">
                    <!-- Card Number -->
                    <tr class="hover:bg-pink-50 transition duration-300">
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-base font-semibold text-gray-600">Card Number:</td>
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-lg font-bold text-gray-800">{patientProfile.cardNumber}</td>
                    </tr>

                    <!-- Name -->
                    <tr class="hover:bg-pink-50 transition duration-300">
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-base font-semibold text-gray-600">Name:</td>
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-lg font-bold text-gray-800">{patientProfile.patientName}</td>
                    </tr>

                    <!-- Date of Admission -->
                    <tr class="hover:bg-pink-50 transition duration-300">
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-base font-semibold text-gray-600">Date of Admission:</td>
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-lg font-bold text-gray-800">{patientProfile.admissionDate}</td>
                    </tr>

                    <!-- Age -->
                    <tr class="hover:bg-pink-50 transition duration-300">
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-base font-semibold text-gray-600">Age:</td>
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-lg font-bold text-gray-800">{patientProfile.age}</td>
                    </tr>

                    <!-- Mother's Name -->
                    <tr class="hover:bg-pink-50 transition duration-300">
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-base font-semibold text-gray-600">Mother's Name:</td>
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-lg font-bold text-gray-800">{patientProfile.motherName}</td>
                    </tr>

                    <!-- Address -->
                    <tr class="hover:bg-pink-50 transition duration-300">
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-base font-semibold text-gray-600">Address:</td>
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-lg font-bold text-gray-800">{patientProfile.address}</td>
                    </tr>

                    <!-- Date of Birth -->
                    <tr class="hover:bg-pink-50 transition duration-300">
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-base font-semibold text-gray-600">Date of Birth:</td>
                      <td class="px-3 py-2 md:px-4 md:py-3 text-sm md:text-lg font-bold text-gray-800">{patientProfile.dob}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Developer Phone Footer -->
          <div class="mt-4 md:mt-6 p-3 md:p-4 bg-pink-50 rounded-lg text-center text-xs md:text-sm text-gray-600 border-t border-pink-200">
            <span>Developed by Michael | Contact: {developerPhone}</span>
          </div>
        </div>

        <!-- Decorative Border -->
        <div class="absolute inset-0 rounded-3xl border-2 border-pink-200 pointer-events-none"></div>
      </div>
    </div>
  </div>
</div>

<!-- Beautiful Modal with Love Frame -->
{#if showModal}
  <div 
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in"
    on:click={handleBackdropClick}
  >
    <div class="relative max-w-4xl max-h-[90vh] mx-4">
      <!-- Beautiful Love Frame -->
      <div class="relative bg-gradient-to-br from-pink-100 via-white to-purple-100 rounded-3xl p-8 shadow-2xl border-4 border-pink-300 transform scale-95 hover:scale-100 transition-transform duration-500">
        <!-- Decorative Hearts -->
        <div class="absolute -top-4 -left-4 w-8 h-8 text-pink-400 animate-bounce">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div class="absolute -top-4 -right-4 w-8 h-8 text-purple-400 animate-bounce" style="animation-delay: 0.5s;">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div class="absolute -bottom-4 -left-4 w-8 h-8 text-purple-400 animate-bounce" style="animation-delay: 1s;">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div class="absolute -bottom-4 -right-4 w-8 h-8 text-pink-400 animate-bounce" style="animation-delay: 1.5s;">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <!-- Close Button -->
        <button 
          on:click={closeModal}
          class="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Image Container -->
        <div class="relative overflow-hidden rounded-2xl shadow-xl">
          <img 
            src={patientProfile.image} 
            alt="Patient Profile" 
            class="w-full h-auto max-h-[70vh] object-contain"
          />
          
          <!-- Patient Name Overlay -->
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 class="text-white text-2xl font-bold text-center">
              {patientProfile.patientName}
            </h3>
            <p class="text-pink-200 text-center mt-1">
              ❤️ Beautiful Patient ❤️
            </p>
          </div>
        </div>

        <!-- Decorative Border -->
        <div class="absolute inset-0 rounded-3xl border-2 border-pink-200 pointer-events-none"></div>
      </div>
    </div>
  </div>
{/if}

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