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
import axios from "axios";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";


// Configuration de l'URL de l'API
const API_URL = "http://127.0.0.1:8000/auth/login"; // Remplace cette URL par celle de ton API

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
      try {
        const response = await axios.post(API_URL, {
          username: this.username,
          password: this.password,
        });
        const token = response.data.access_token;
        localStorage.setItem("access_token", token); // Stocker le token
        this.error = false;
      } catch (err) {
        this.error= true;
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
