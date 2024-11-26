<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  // Configuration de l'URL de l'API
  const API_URL = "http://127.0.0.1:2121/auth/login"; // Remplace cette URL par celle de ton API
  
  export default {
    data() {
      return {
        username: "",
        password: "",
        error: "",
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post(API_URL, {
            username: this.username,
            password: this.password,
          });
          // On récupère le token
          const token = response.data.access_token;
          localStorage.setItem("access_token", token); // Stocker le token dans le localStorage ou autre
          console.log(token); // L'API renverra le token ici
  } catch (error) {
    this.error = "Username ou password incorrect";
  }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    margin: 10px 0;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
  }
  .error {
    color: red;
  }
  </style>
  