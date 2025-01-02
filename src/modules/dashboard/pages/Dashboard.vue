<template>
  <div class="page-container">
    <header class="page-header">
      <h1>Bienvenue dans le tableau de bord</h1>
    </header>
    <main class="page-content">
      <!-- Contenu principal -->
      <Button icon="pi pi-user" iconPos="right" label="Infos utilisateurs" @click="getUserInfo" />
      <div v-if="userInfo" class="user-info">
        <p><strong>Utilisateur :</strong> {{ userInfo.username }}</p>
        <p><strong>Role :</strong> {{ userInfo.role }}</p>
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <Button icon="pi pi-comment" iconPos="right" label="ChatBot"/>
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
