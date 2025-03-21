<script>
  let bp = '';
  let temperature = '';

  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission, e.g., send data to a server
    console.log('Blood Pressure:', bp);
    console.log('Temperature:', temperature);
    // Reset form fields
    bp = '';
    temperature = '';
  }
</script>

<form on:submit={handleSubmit}>
  <div>
    <label for="bp">Blood Pressure (e.g., 120/80):</label>
    <input type="text" id="bp" bind:value={bp} required />
  </div>
  <div>
    <label for="temperature">Temperature (e.g., 36.6°C):</label>
    <input type="text" id="temperature" bind:value={temperature} required />
  </div>
  <button type="submit">Submit</button>
</form>
