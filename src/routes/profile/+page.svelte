<script>
  import Profile from '../../components/MyProfile.svelte'; // Corrected path to the Profile component

  // Sample profile data (you can replace this with dynamic data fetching later)
  const profileData = {
    name: 'Duran Clayton',
    title: 'UI/UX Designer',
    location: 'London, England',
    avatarUrl: 'https://via.placeholder.com/150',
    totalRevenue: '$72,573',
    orders: '3,257',
    products: '74',
    coverImageUrl: 'https://via.placeholder.com/1920x500',
  };
</script>

<div class="profile-page">
  <h1>Profile</h1>
  <Profile {profileData} />
</div>

<style>
  .profile-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    font-size: 28px;
    margin-bottom: 20px;
  }
</style>