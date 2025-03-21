<script>
  import { format } from 'date-fns';

  let name = '';
  let dob = '';
  let weight = '';
  let age = '';
  let temperature = '';
  let bp = '';
  let oxygenRate = '';
  let submittedDate = '';
  let patientData = [];

  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission
    const newData = { name, dob, weight, age, temperature, bp, oxygenRate, submittedDate: format(new Date(), 'MMMM d, yyyy HH:mm:ss') };
    patientData = [...patientData, newData];
    // Reset form fields
    name = '';
    dob = '';
    weight = '';
    age = '';
    temperature = '';
    bp = '';
    oxygenRate = '';
  }
</script>

<div class="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKmEzWkCLrxkMYGRRQRPqELEoC9v3L90hIA&s" alt="Logo" class="mx-auto mb-6 rounded-full"/>
  <h2 class="text-3xl font-bold text-center mb-6">Patient Vital Signs</h2>
  <form on:submit={handleSubmit} class="space-y-6 mb-8">
    <div class="relative">
      <label class="block text-gray-700" for="name">Patient Name:</label>
      <input type="text" id="name" bind:value={name} required class="w-full px-4 py-3 pl-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="dob">Date of Birth:</label>
      <input type="date" id="dob" bind:value={dob} required class="w-full px-4 py-3 pl-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-calendar-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="weight">Weight (kg):</label>
      <input type="number" id="weight" bind:value={weight} required class="w-full px-4 py-3 pl-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-weight absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="age">Age:</label>
      <input type="number" id="age" bind:value={age} required class="w-full px-4 py-3 pl-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-birthday-cake absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="temperature">Temperature (°C):</label>
      <input type="text" id="temperature" bind:value={temperature} required class="w-full px-4 py-3 pl-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-thermometer-half absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="bp">Blood Pressure (e.g., 120/80):</label>
      <input type="text" id="bp" bind:value={bp} required class="w-full px-4 py-3 pl-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-heartbeat absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <div class="relative">
      <label class="block text-gray-700" for="oxygenRate">Oxygen Rate (%):</label>
      <input type="text" id="oxygenRate" bind:value={oxygenRate} required class="w-full px-4 py-3 pl-12 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <i class="fas fa-lungs absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
    </div>
    <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
  </form>

  {#if patientData.length > 0}
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
            <td class="px-4 py-2 border">{data.submittedDate}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
