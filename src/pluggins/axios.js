// src/axios.js
import axios from 'axios';

// Créer une instance axios avec la base URL
const api = axios.create({
  baseURL: 'http://localhost:8000', // Ton URL de base pour les API
});

export default api;
