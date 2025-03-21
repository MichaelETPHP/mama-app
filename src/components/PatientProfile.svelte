<!-- PatientProfile.svelte -->
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
  <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Patient Profile</h2>
  <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
    <img src="https://i.postimg.cc/fRGQhT16/2B0A0912.jpg" alt="Patient Image" class="w-32 h-32 rounded-full object-cover shadow-lg"/>
    <div class="space-y-2">
     <p class="text-lg font-semibold">Card Number: B-Biruktawit T</p>
     <hr>
      <p class="text-lg font-semibold">Date of Admission: 11-3-2025</p>
      <p class="text-lg font-semibold">Age: 1 Year and 5 Monthes</p>
      <p class="text-lg font-semibold">Mother's Name: Biruktawit T</p>
      <p class="text-lg font-semibold">Address: Addis Ababa - Sub City - Akaki Kality</p>
      <p class="text-lg font-semibold">Date of Birth: 11-05-2013</p>
    </div>
  </div>
</div>
