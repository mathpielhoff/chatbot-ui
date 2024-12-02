import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';



const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Toast', Toast); // Enregistrement du composant Toast
app.use(ToastService); // Utilisation du service Toast

app.mount('#app');
