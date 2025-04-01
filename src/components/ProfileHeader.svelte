<script>
  export let profileData = {
    name: 'Duran Clayton',
    title: 'UI/UX Designer',
    location: 'London, England',
    avatarUrl: 'https://via.placeholder.com/150',
  };
</script>

<div class="profile-header">
  <img src={profileData.avatarUrl} alt="Profile Avatar" class="avatar" />
  <div class="profile-info">
    <h2>{profileData.name}</h2>
    <p>{profileData.title}</p>
    <p><span class="location-icon">📍</span> {profileData.location}</p>
    <div class="actions">
      <button class="message-btn">Message</button>
      <button class="follow-btn">Follow</button>
    </div>
  </div>
</div>

<style>
  /* Styles for ProfileHeader */
</style>