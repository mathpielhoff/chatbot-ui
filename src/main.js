import './assets/main.css'
import './assets/styles.scss'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'; // Import des icônes
import Button from 'primevue/button';

import DataView from 'primevue/dataview';

import router from './router'; // Import du routeur

import axios from 'axios';
import api from './pluggins/axios';
import { useAuthStore } from './components/common/useAuthStore';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});


api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const pinia = createPinia();
app.use(pinia);

app.component('Toast', Toast); // Enregistrement du composant Toast
app.component('Button', Button);
app.component('DataView', DataView)
app.use(ToastService); // Utilisation du service Toast
app.use(router); // Utilisation du routeur

app.mount('#app');
