<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';

  onMount(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Enhanced cache management for mobile navigation
    if ('serviceWorker' in navigator) {
      // Unregister any existing service workers to prevent cache issues
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
        }
      });
      
      // Register new service worker with cache-busting
      setTimeout(() => {
        navigator.serviceWorker.register('/sw.js?v=' + Date.now())
          .then((registration) => {
            console.log('Service Worker registered successfully:', registration);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      }, 1000);
    }

    // Clear browser cache for navigation
    if ('caches' in window) {
      caches.keys().then(function(names) {
        for (let name of names) {
          caches.delete(name);
        }
      });
    }
  });

  let { children } = $props();
</script>

<!-- Global Layout with Home Page Style -->
<div class="bg-gradient-to-br from-pink-50 via-white to-purple-50">
  {@render children()}
</div>

<style>
  /* Global styles for consistent theming */
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-y: auto;
    height: auto;
  }

  /* Ensure consistent background across all pages */
  :global(.page-container) {
    background: linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #e1bee7 100%);
  }

  /* Enable proper scrolling on mobile */
  :global(html) {
    overflow-y: auto;
    height: auto;
  }
</style>
