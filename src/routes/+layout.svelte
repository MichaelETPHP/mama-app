<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';

  onMount(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });

  let { children } = $props();
</script>

{@render children()}
