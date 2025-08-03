<script>
  import Loader from '../components/Loader.svelte';
  import PatientForm from '../components/MainComponent.svelte';
  import { onMount } from 'svelte';

  let isLoading = true;

  onMount(() => {
    // Simulate a delay (e.g., fetching data)
    setTimeout(() => {
      isLoading = false; // Hide loader after data is loaded
    }, 3000);
  });
</script>

{#if isLoading}
  <Loader />
{:else}
   <PatientForm />
{/if}