

<script>
  export let profile;

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

  // Format the admissionDate and createdDate
  let formattedAdmissionDate = profile?.admissionDate ? formatDateTime(profile.admissionDate) : '';
  let formattedCreatedDate = profile?.createdDate ? formatDateTime(profile.createdDate) : '';
</script>

<div class="w-full bg-white shadow-xl rounded-lg p-8 overflow-hidden">
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-3xl font-bold text-gray-800">Patient Profile</h2>
    <div class="flex items-center space-x-2">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKmEzWkCLrxkMYGRRQRPqELEoC9v3L90hIA&s" alt="Hospital Logo" class="w-12 h-12 rounded-full"/>
      <span class="text-lg font-semibold text-gray-700">Betezata Hospital</span>
    </div>
  </div>
  <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
    <img src="https://i.postimg.cc/fRGQhT16/2B0A0912.jpg" alt="Patient Image" class="w-32 h-32 rounded-full object-cover shadow-lg"/>
    <div class="space-y-2 md:space-y-3">
      <p class="text-lg md:text-xl font-semibold text-gray-700">Card Number: 121347</p>
      <hr class="border-gray-300 my-2 md:my-3">
     <p class="text-lg font-semibold">Name : B-Biruktawit T</p>
     <hr>
      <p class="text-lg font-semibold">Date of Admission: 11-3-2025</p>
      <p class="text-lg font-semibold">Age: 1 Year and 5 Monthes</p>
      <p class="text-lg font-semibold">Mother's Name: Biruktawit T</p>
      <p class="text-lg font-semibold">Address: Addis Ababa - Sub City - Akaki Kality</p>
      <p class="text-lg font-semibold">Date of Birth: 11-05-2013</p>
    </div>
  </div>
</div>
