<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Bienvenue dans le tableau de bord</h1>
    </header>
    <main class="dashboard-content">
      <!-- Contenu principal -->
      <Button label="Se déconnecter" @click="getUserInfo" class="p-button-danger" />
      <div v-if="userInfo" class="user-info">
        <p><strong>Utilisateur :</strong> {{ userInfo.username }}</p>
        <p><strong>Role :</strong> {{ userInfo.role }}</p>
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </main>
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
        // Appel GET à /auth/whoami
        const response = await api.get('/auth/whoami');
        this.userInfo = response.data;
        console.info(this.userInfo);
      } catch (error) {
        this.errorMessage = 'Une erreur est survenue lors de la récupération des informations.';
        console.error(error);
      }
    },
  },
};
</script>

<style>
/* Conteneur principal */
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
  background-color: #f4f6f8; /* Couleur de fond */
  padding: 1rem;
}

/* Titre en haut à gauche */
.dashboard-header h1 {
  color: #28a745; /* Vert */
  font-weight: bold;
  margin-bottom: 1rem;
}

/* Contenu principal */
.dashboard-content {
  flex: 1; /* Prend l'espace disponible */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Aligne les éléments en haut */
  gap: 1rem; /* Espacement entre les éléments */
}

/* Style des informations utilisateur */
.user-info {
  background: #ffffff;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
}

/* Style des messages d'erreur */
.error-message {
  color: #d9534f; /* Rouge pour les erreurs */
  font-weight: bold;
}
</style>
