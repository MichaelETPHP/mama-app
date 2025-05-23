<script>
  import { onMount } from 'svelte';
  import Navigation from '../../components/Navigation.svelte'; // Adjust the path as needed

  // Define navigation links
  const navLinks = [
    {
      title: 'Home',
      description: 'Go to the home page for an overview.',
      href: '/',
      bgColor: 'bg-blue-600',
      hoverBgColor: 'bg-blue-700'
    },
    {
      title: 'Feeding',
      description: 'Manage feeding schedules and records.',
      href: '/feeding',
      bgColor: 'bg-green-600',
      hoverBgColor: 'bg-green-700'
    },
    {
      title: 'Vital',
      description: 'Track vital signs and health metrics.',
      href: '/vital',
      bgColor: 'bg-red-600',
      hoverBgColor: 'bg-red-700'
    }
  ];

  // State variables
  let feedingData = [];
  let formData = {
    feeding_time: '',
    feed_by: '',
    feeding_item: '',
    ml_drink: 0,
  };
  let errorMessage = '';
  let successMessage = '';
  let expandedRecordId = null; // Track the expanded record ID
  let timerActive = false;
  let remainingTime = 0; // Remaining time in seconds
  let intervalId;

  // Fetch feeding data from the API
  async function fetchFeedingData() {
    try {
      const response = await fetch('https://hello.adeycustom.com/feeding_api.php');
      if (response.ok) {
        feedingData = await response.json();
        // Ensure ml_drink is parsed as a number for each record
        feedingData = feedingData.map(record => ({
          ...record,
          ml_drink: parseFloat(record.ml_drink) || 0 // Default to 0 if invalid
        }));
      } else {
        errorMessage = `Error fetching data: ${response.statusText}`;
        console.error(errorMessage);
      }
    } catch (error) {
      errorMessage = `Error fetching data: ${error.message}`;
      console.error(errorMessage);
    }
  }

  // Submit feeding data to the API
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('https://hello.adeycustom.com/feeding_api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ml_drink: parseFloat(formData.ml_drink) || 0 // Ensure ml_drink is a number
        }),
      });
      if (response.ok) {
        const result = await response.json();
        successMessage = result.message;
        await fetchFeedingData(); // Refresh the data after submission
        resetForm(); // Reset the form fields
        setupTimer(); // Initialize the timer based on the latest data
      } else {
        const errorResult = await response.json();
        errorMessage = errorResult.error || 'Error submitting data.';
      }
    } catch (error) {
      errorMessage = `Error submitting data: ${error.message}`;
    }
  }

  // Delete feeding data from the API
  async function handleDelete(id) {
    try {
      const response = await fetch('https://hello.adeycustom.com/feeding_api.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        await fetchFeedingData(); // Refresh the data after deletion
        setupTimer(); // Reset the timer after deletion
      } else {
        const errorResult = await response.json();
        errorMessage = errorResult.error || 'Error deleting data.';
      }
    } catch (error) {
      errorMessage = `Error deleting data: ${error.message}`;
    }
  }

  // Reset the form fields
  function resetForm() {
    formData = {
      feeding_time: '',
      feed_by: '',
      feeding_item: '',
      ml_drink: 0,
    };
  }

  // Toggle accordion expansion
  function toggleAccordion(id) {
    expandedRecordId = expandedRecordId === id ? null : id;
  }

  // Initialize timer based on the latest feeding time
  function setupTimer() {
    clearInterval(intervalId); // Clear existing timer
    if (feedingData.length === 0) {
      timerActive = false;
      return;
    }
    // Get the latest feeding time
    const latestFeedingTime = new Date(feedingData[0].feeding_time).getTime();
    const nextFeedingTime = latestFeedingTime + 3600 * 1000; // 1 hour later
    const now = Date.now();
    if (nextFeedingTime > now) {
      remainingTime = Math.floor((nextFeedingTime - now) / 1000); // Convert to seconds
      timerActive = true;
      intervalId = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
          clearInterval(intervalId);
          timerActive = false;
          alert('Feeding time is up!');
        }
      }, 1000);
    } else {
      timerActive = false;
    }
  }

  // Format remaining time for display
  function formatRemainingTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  }

  // Format the feeding time to a more readable format
  function formatFeedingTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  // Fetch data and set up timer on component mount
  onMount(async () => {
    await fetchFeedingData();
    setupTimer(); // Initialize the timer based on the latest data
    return () => clearInterval(intervalId); // Cleanup on unmount
  });
</script>

<!-- Navigation Component -->
<Navigation {navLinks} />
<div class="container mx-auto p-6 border rounded-lg shadow-lg w-full max-w-7xl">
  <h1 class="text-2xl font-bold mb-4">Feeding Data Management</h1>

  <!-- Success/Error Messages -->
  {#if successMessage}
    <div class="bg-green-100 text-green-700 p-4 rounded mb-4">{successMessage}</div>
  {/if}
  {#if errorMessage}
    <div class="bg-red-100 text-red-700 p-4 rounded mb-4">{errorMessage}</div>
  {/if}

  <!-- Countdown Timer Section -->
  <div class="mb-6 bg-white p-4 border rounded-lg shadow-md flex items-center space-x-4">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
      <h2 class="text-xl font-semibold">Next Feeding Countdown</h2>
      <p class="text-lg">
        {#if timerActive}
          Time Remaining: {formatRemainingTime(remainingTime)}
        {:else}
          {#if feedingData.length > 0}
            <span class="text-red-500">Feeding Time!</span>
          {:else}
            No feeding data submitted yet.
          {/if}
        {/if}
      </p>
    </div>
  </div>

  <!-- Form and Accordion Layout -->
  <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
    <!-- Feeding Data Form -->
    <form on:submit={handleSubmit} class="flex-1 bg-white p-6 border rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Add Feeding Data</h2>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2" for="feeding_time">Feeding Time</label>
        <input
          type="datetime-local"
          id="feeding_time"
          bind:value={formData.feeding_time}
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2" for="feed_by">Feed By</label>
        <input
          type="text"
          id="feed_by"
          bind:value={formData.feed_by}
          class="w-full p-2 border rounded"
          placeholder="Enter name"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2" for="feeding_item">Feeding Item</label>
        <input
          type="text"
          id="feeding_item"
          bind:value={formData.feeding_item}
          class="w-full p-2 border rounded"
          placeholder="Enter item"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2" for="ml_drink">How much ml Drink</label>
        <input
          type="number"
          id="ml_drink"
          bind:value={formData.ml_drink}
          step="0.01"
          class="w-full p-2 border rounded"
          placeholder="Enter ml consumed"
          required
        />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>

    <!-- Feeding Data Accordion -->
    <div class="flex-1 bg-white p-6 border rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Feeding Records</h2>
      {#each feedingData as record}
        <div class="border rounded-lg mb-4 overflow-hidden">
          <!-- Accordion Header -->
          <button
            on:click={() => toggleAccordion(record.id)}
            class="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
          >
            <span class="font-medium">{formatFeedingTime(record.feeding_time)}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 transition-transform transform {expandedRecordId === record.id ? 'rotate-180' : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <!-- Accordion Content -->
          {#if expandedRecordId === record.id}
            <div class="p-4 bg-white space-y-2">
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm0 0v10a2 2 0 002 2h4a2 2 0 002-2V7m-6 4h-2" />
                </svg>
                <span><strong>Feed By:</strong> {record.feed_by}</span>
              </div>
              <hr />
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span><strong>Feeding Item:</strong> {record.feeding_item}</span>
              </div>
              <hr />
              <div class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span><strong>How much ml Drink:</strong> {record.ml_drink.toFixed(2)} ml</span>
              </div>
              <hr />
              <button
                on:click={() => handleDelete(record.id)}
                class="mt-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-2 14H7L5 7M3 7h18M10 4h4a1 1 0 011 1v1H9V5a1 1 0 011-1z" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>