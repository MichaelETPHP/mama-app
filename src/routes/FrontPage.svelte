<script>
  import Loader from '../components/Loader.svelte';
  import PatientForm from '../components/MainComponent.svelte';
  import { onMount } from 'svelte';

  let isLoading = true;

  onMount(async () => {
    // Simulate a delay (e.g., fetching data)
    await new Promise((resolve) => setTimeout(resolve, 3000));
    isLoading = false; // Hide loader after data is loaded
  });
</script>

{#if isLoading}
  <Loader />
{:else}
   <PatientForm />
{/if}