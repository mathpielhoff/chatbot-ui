import { defineStore } from 'pinia';
import api from '@/pluggins/axios';
import { useRouter } from "vue-router";


export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token, // Retourne `true` si un token est présent
  },
  actions: {
    async login(username, password) {
      try {
        const response = await api.post("/auth/login", { username, password });
        this.token = response.data.access_token;
        localStorage.setItem('access_token', this.token);
        return true; // Succès
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw new Error('Connexion échouée');
      }
    },
    logout(router) {
      this.token = null;
      localStorage.removeItem('access_token');
      // Redirection après déconnexion
      if(router){
        router.push('/'); // Redirige vers la page d'accueil
      }
    },
  },
});
