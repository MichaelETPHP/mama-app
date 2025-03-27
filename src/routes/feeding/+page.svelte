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
    next_feeding_time: ''
  };
  let errorMessage = '';
  let successMessage = '';

  // Fetch feeding data from the API
  async function fetchFeedingData() {
    try {
      const response = await fetch('https://hello.adeycustom.com/feeding_api.php');
      if (response.ok) {
        feedingData = await response.json();
      } else {
        errorMessage = `Error fetching data: ${response.statusText}`;
        console.error(errorMessage); // Log the error for debugging
      }
    } catch (error) {
      errorMessage = `Error fetching data: ${error.message}`;
      console.error(errorMessage); // Log the error for debugging
    }
  }

  // Submit feeding data to the API
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('https://hello.adeycustom.com/feeding_api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        successMessage = result.message;
        fetchFeedingData(); // Refresh the data after submission
        resetForm(); // Reset the form fields
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        fetchFeedingData(); // Refresh the data after deletion
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
      next_feeding_time: ''
    };
  }

  // Format countdown time
  function formatCountdown(nextFeedingTime) {
    const now = new Date();
    const nextTime = new Date(nextFeedingTime);
    const diffMs = nextTime - now;

    if (diffMs <= 0) {
      return 'Feeding Time!';
    }

    const diffSec = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffSec / 3600);
    const minutes = Math.floor((diffSec % 3600) / 60);
    const seconds = diffSec % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  // Show browser notifications
  function showNotification(message) {
    if (!('Notification' in window)) {
      alert(message); // Fallback for browsers that don't support notifications
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(message);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(message);
        }
      });
    }
  }

  // Add a notification counter for each record
  let notificationCounters = {};

  // Check countdown and trigger notifications
  function checkNotifications() {
    const now = new Date();
    feedingData.forEach((record) => {
      const nextTime = new Date(record.next_feeding_time);

      // Initialize notification counter for the record if not already set
      if (!notificationCounters[record.id]) {
        notificationCounters[record.id] = 0;
      }

      // Trigger notification only if the counter is less than 5
      if (nextTime <= now && notificationCounters[record.id] < 5) {
        showNotification(`It's time to feed "${record.feeding_item}"!`);
        notificationCounters[record.id]++; // Increment the counter
      }
    });
  }

  // Fetch data and set up interval for notifications
  onMount(() => {
    fetchFeedingData();
    setInterval(() => {
      fetchFeedingData(); // Refresh data periodically
      checkNotifications(); // Check for notifications
    }, 1000); // Check every second
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

  <!-- Form and Table Layout -->
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
        <label class="block text-sm font-medium mb-2" for="next_feeding_time">Next Feeding Time</label>
        <input
          type="datetime-local"
          id="next_feeding_time"
          bind:value={formData.next_feeding_time}
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>

    <!-- Feeding Data Table -->
    <div class="flex-1 bg-white p-6 border rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Feeding Records</h2>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feeding Time</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feed By</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feeding Item</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Feeding Time</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Countdown</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each feedingData as record}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">{record.feeding_time}</td>
              <td class="px-6 py-4 whitespace-nowrap">{record.feed_by}</td>
              <td class="px-6 py-4 whitespace-nowrap">{record.feeding_item}</td>
              <td class="px-6 py-4 whitespace-nowrap">{record.next_feeding_time}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {#if new Date(record.next_feeding_time) > new Date()}
                  <span>{formatCountdown(record.next_feeding_time)}</span>
                {:else}
                  <span class="text-red-500">Feeding Time!</span>
                {/if}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  on:click={() => handleDelete(record.id)}
                  class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>