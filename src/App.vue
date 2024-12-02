<script setup>
import HelloWorld from './views/HelloWorld.vue';
import Login from './modules/auth/pages/Login.vue';
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="wrapper">
        <HelloWorld />
      </div>
    </header>

    <main class="main-content">
      <Login />
    </main>
  </div>
</template>

<style>
/* Conteneur principal */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
}

/* Header fixe en haut */
.header {
  background-color: #f8f9fa; /* Couleur de fond du header */
  padding: 1rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Légère ombre */
  z-index: 1000;
}

/* Main centré */
.main-content {
  flex: 1; /* Prend l'espace restant sous le header */
  display: flex;
  align-items: center; /* Centre verticalement */
  justify-content: center; /* Centre horizontalement */
  padding: 1rem;
  background-color: #f4f6f8; /* Couleur de fond pour différencier le contenu */
}

/* Optionnel : Wrapper */
.wrapper {
  max-width: 1200px; /* Largeur maximale du contenu */
  margin: 0 auto;
}
</style>
