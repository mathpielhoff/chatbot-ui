<template>
  <div class="card flex justify-center p-4 login-container">
    <div class="form-wrapper">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4 w-full sm:w-56">
        <div class="flex flex-col gap-2">
          <InputText 
            id="username" 
            v-model="username" 
            placeholder="Nom d'utilisateur" 
            class="p-inputtext-lg" 
          />
        </div>
        <div class="flex flex-col gap-2">
        <Password id="password" v-model="password" :feedback="false"  placeholder="Password" class="p-inputtext-lg"/>
        </div>
        <Button 
          type="submit" 
          severity="secondary" 
          label="Se connecter" 
          class="p-button-lg" 
        />
      </form>
      <Message v-if="error" :key="1" severity="error" class="mt-4">Nom d'utilisateur ou mot de passe incorrect</Message>
    </div>
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
.form-wrapper {
  width: 100%;
  text-align: center;
}

/* Espacement des messages d'erreur */
.mt-4 {
  margin-top: 1rem;
}
</style>
