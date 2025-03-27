<script>
  // Define static navigation links with icons
  const navLinks = [
    {
      title: 'Home',
      description: 'Go to the home page for an overview.',
      href: '/',
      bgColor: 'bg-blue-600',
      hoverBgColor: 'bg-blue-700',
      icon: 'home-icon'
    },
    {
      title: 'Feeding',
      description: 'Manage feeding schedules and records.',
      href: '/feeding',
      bgColor: 'bg-green-600',
      hoverBgColor: 'bg-green-700',
      icon: 'feeding-icon'
    },
    {
      title: 'Vital',
      description: 'Track vital signs and health metrics.',
      href: '/vital',
      bgColor: 'bg-red-600',
      hoverBgColor: 'bg-red-700',
      icon: 'vital-icon'
    }
  ];
</script>

<!-- Navigation Cards -->
<div class="container mx-auto p-6">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {#each navLinks as link}
      <a
        href={link.href}
        class={`block ${link.bgColor} text-white p-6 rounded-lg shadow-md hover:${link.hoverBgColor} transition-all duration-300 transform hover:-translate-y-1`}
      >
        <!-- Icon -->
        <div class="flex justify-center mb-4">
          {#if link.icon === 'home-icon'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l-2-2m2 2V4a1 1 0 011-1h3m-6 9l2-2 2 2M7 7h10"
              />
            </svg>
          {:else if link.icon === 'feeding-icon'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h6a2 2 0 012 2v2"
              />
            </svg>
          {:else if link.icon === 'vital-icon'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 animate-spin-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          {/if}
        </div>

        <!-- Title and Description -->
        <h2 class="text-xl font-bold mb-2 text-center">{link.title}</h2>
        <p class="text-sm text-center">{link.description}</p>
      </a>
    {/each}
  </div>
</div>

<style>
  /* Custom animation for slow spin */
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin-slow {
    animation: spin-slow 4s linear infinite;
  }
</style>