<template>
    <div class="page-container">
      <header class="page-header">
      <h1>Se connecter</h1>
    </header>
    <main class="page-content">
    <div class="form-wrapper">

      <form @submit.prevent="handleLogin" class="form">
      <div class="field">
        <InputText id="username" v-model="username" placeholder="Nom d'utilisateur" />
      </div>
      <div class="field">
        <Password id="password" v-model="password" :feedback="false" placeholder="Mot de passe" />
      </div>
      <Button type="submit" severity="secondary" label="Se connecter" class="submit-btn" />
    </form>
      <Message v-if="error" :key="1" severity="error" class="mt-4">Nom d'utilisateur ou mot de passe incorrect</Message>
    </div>
  </main>
    </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";
import { useAuthStore } from '@/components/common/useAuthStore'; // Vérifie que le chemin est correct

// Configuration de l'URL de l'API

export default {
  components: {
    InputText,
    Password,
    Button,
    Message,
  },
  data() {
    return {
      username: "",
      password: "",
      error: false,
    };
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore(); // Récupération du store d'authentification
      try {
        // Appeler la méthode `login` du store pour enregistrer le token
        authStore.login(this.username,this.password );

        // Réinitialiser l'erreur et rediriger
        this.error = false;
        this.$router.push('/dashboard'); // Redirection vers la page "dashboard"
      } catch (err) {
        // En cas d'erreur, afficher le message
        this.error = true;
        console.error('Erreur lors de la connexion:', err);
      }
    },
  },
};
</script>


<style>
/* Conteneur principal */
.login-container {
  min-width: 500px;
  margin-top: 10px auto;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding:5px
}

/* Wrapper pour aligner les éléments */

/* Espacement des messages d'erreur */
.mt-4 {
  margin-top: 1rem;
}

.form-wrapper {
  width: 100%;
  text-align: center;
  padding:1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; /* Espacement entre le titre et le formulaire */
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Espacement uniforme entre les champs */
  padding: 2rem;
  border: 1px solid #ddd; /* Bordure optionnelle */
  border-radius: 8px; /* Coins arrondis */
  background-color: #fff; /* Couleur de fond */
}


.submit-btn {
  margin-top: 1rem; /* Espacement au-dessus du bouton */
}
</style>
