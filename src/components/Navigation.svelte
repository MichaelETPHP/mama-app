<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  
  // Define static navigation links with icons
  const navLinks = [
    {
      title: 'Home',
      description: 'Go to the home page for an overview.',
      href: '/',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      hoverBgColor: 'from-blue-600 to-blue-700',
      icon: 'fas fa-home'
    },
    {
      title: 'Feeding',
      description: 'Manage feeding schedules and records.',
      href: '/feeding',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      hoverBgColor: 'from-green-600 to-green-700',
      icon: 'fas fa-baby'
    },
    {
      title: 'Vital',
      description: 'Track vital signs and health metrics.',
      href: '/vital',
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
      hoverBgColor: 'from-red-600 to-red-700',
      icon: 'fas fa-heartbeat'
    }
  ];

  // Patient Profile Image from static folder
  const profileImage = '/profile.jpg';
  
  let isMenuOpen = false;
  let isMobile = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  // Enhanced navigation function with cache busting
  async function navigateToPage(href) {
    try {
      // Close menu first
      closeMenu();
      
      // Add cache-busting parameter
      const cacheBuster = Date.now();
      const url = href === '/' ? `/?cb=${cacheBuster}` : `${href}?cb=${cacheBuster}`;
      
      // Use SvelteKit's goto for better navigation
      await goto(url, { replaceState: false });
      
      // Force page reload if needed (fallback)
      setTimeout(() => {
        if (window.location.pathname !== href) {
          window.location.href = url;
        }
      }, 500);
      
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to direct navigation
      window.location.href = href;
    }
  }

  onMount(() => {
    // Check if mobile on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clear any existing cache issues
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
        }
      });
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  });

  function checkMobile() {
    isMobile = window.innerWidth < 768;
  }
</script>

<!-- Mobile Hamburger Menu -->
<div class="fixed top-4 left-4 md:hidden" style="z-index: 9999;">
  <!-- Hamburger Button -->
  <button
    on:click={toggleMenu}
    class="bg-white/95 backdrop-blur-md shadow-lg rounded-full p-3 border-2 border-pink-200 transition-all duration-300 hover:shadow-xl"
    aria-label="Toggle menu"
  >
    <div class="w-6 h-6 flex flex-col justify-center items-center">
      <span class="block w-5 h-0.5 bg-pink-500 transition-all duration-300 {isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}"></span>
      <span class="block w-5 h-0.5 bg-pink-500 mt-1 transition-all duration-300 {isMenuOpen ? 'opacity-0' : ''}"></span>
      <span class="block w-5 h-0.5 bg-pink-500 mt-1 transition-all duration-300 {isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}"></span>
    </div>
  </button>

     <!-- Mobile Menu Overlay -->
   {#if isMenuOpen}
     <div class="fixed inset-0 bg-black/50" style="z-index: 9998;" on:click={closeMenu}></div>
   {/if}

   <!-- Mobile Menu Panel -->
   <div class="absolute top-16 left-0 bg-white shadow-2xl rounded-2xl border-2 border-pink-200 p-4 min-w-64 transition-all duration-300 {isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}" style="z-index: 9999;">
    <div class="space-y-3">
             {#each navLinks as link}
         <button
           on:click={() => navigateToPage(link.href)}
           class="w-full text-left block {link.bgColor} text-white rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer"
         >
           <div class="flex items-center space-x-3">
             <div class="flex-shrink-0">
               <i class="{link.icon} text-xl animate-pulse group-hover:animate-bounce"></i>
             </div>
             <div class="flex-1">
               <h3 class="font-bold text-sm">{link.title}</h3>
               <p class="text-xs opacity-90 mt-1">{link.description}</p>
             </div>
             <div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <i class="fas fa-arrow-right text-xs"></i>
             </div>
           </div>
         </button>
       {/each}
    </div>
  </div>
</div>

<!-- Desktop Navigation (Hidden on Mobile) -->
<div class="hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
  <div class="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border-2 border-pink-200 px-6 py-4">
    <nav class="flex items-center justify-center space-x-8">
      {#each navLinks as link}
        <button
          on:click={() => navigateToPage(link.href)}
          class="flex items-center space-x-2 {link.bgColor} text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group cursor-pointer"
        >
          <i class="{link.icon} text-lg animate-pulse group-hover:animate-bounce"></i>
          <span class="font-bold text-sm">{link.title}</span>
          <i class="fas fa-arrow-right text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
        </button>
      {/each}
    </nav>
  </div>
</div>



<style>
  /* Custom animations */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Responsive text adjustments */
  @media (max-width: 640px) {
    .text-sm {
      font-size: 0.875rem;
    }
    .text-base {
      font-size: 1rem;
    }
  }
</style>