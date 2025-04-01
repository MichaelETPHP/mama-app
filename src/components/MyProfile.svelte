<script>
  import ProfileHeader from '../components/ProfileHeader.svelte';
  import CoverImage from '../components/CoverImage.svelte';
//   import Tabs from './components/Tabs.svelte';
//   import StatsCard from './components/StatsCard.svelte';

  const profileData = {
    name: 'Duran Clayton',
    title: 'UI/UX Designer',
    location: 'London, England',
    avatarUrl: 'https://via.placeholder.com/150',
    coverImageUrl: 'https://via.placeholder.com/1920x500',
  };

  const statsData = [
    { label: 'Orders', value: '3,245' },
    { label: 'Total Revenue', value: '$72,482' },
    { label: 'Product Sold', value: '1,341' },
  ];
</script>

<div class="profile-container">
  <ProfileHeader {profileData} />
  <CoverImage {coverImageUrl} />
  <!-- <Tabs /> -->
  <div class="stats-container">
    {#each statsData as stat}
      <!-- <StatsCard {stat} /> -->
    {/each}
  </div>
</div>

<style>
  /* Global styles for Profile */
</style>