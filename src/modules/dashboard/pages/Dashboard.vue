<template>
    <div>
      <h1>Bienvenue dans le tableau de bord</h1>
      <Button label="Se déconnecter" @click="getUserInfo" class="p-button-danger" />
    </div>
  </template>
  
  <script>
  import api from '@/pluggins/axios';
export default {
  data() {
    return {
      userInfo: null,
      errorMessage: null,
    };
  },
  methods: {
    async getUserInfo() {
      try {
        // Effectue un appel GET à /whoiam sans avoir besoin de spécifier le token
        const response = await api.get('/auth/whoami');
        this.userInfo = response.data; // Assurez-vous que la réponse contient les informations que vous attendez
        console.info(this.userInfo)
      } catch (error) {
        // Gère l'erreur si la requête échoue
        this.errorMessage = 'Une erreur est survenue lors de la récupération des informations.';
        console.error(error);
      }
    },
  },
};
  </script>