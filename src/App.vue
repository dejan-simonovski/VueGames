<template>
  <div class="logo-container" >
    <router-link to="/" class="logo-link">
      <img style="margin-bottom: -4rem" src="./assets/logo.png" alt="VueGames" class="logo">
    </router-link>
  </div>
  <router-view style="margin-top: 4rem;"></router-view>
</template>

<style>

.logo-container {
  display: flex;
  max-width: 100%;
  margin: 0 auto;
  justify-content: center;
  margin-top: -7%;
  
}

.logo {
  transform: scale(0.3);
  transition: transform 0.3s ease;
}

.logo-link {
  text-decoration: none;
  cursor: pointer; 
}
</style>
