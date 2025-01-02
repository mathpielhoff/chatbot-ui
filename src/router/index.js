import { createRouter, createWebHistory } from 'vue-router';
import Login from '../modules/auth/pages/Login.vue';
import Dashboard from '../modules/dashboard/pages/Dashboard.vue'; // Page après connexion
import Chatbot from '@/modules/chatbot/pages/Chatbot.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { 
    path: '/dashboard', 
    component: Dashboard, 
    meta: { requiresAuth: true }, // Protège la route
  }, 
  { 
    path: '/chatbot', 
    component: Chatbot, 
    meta: { requiresAuth: true }, // Protège la route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Vérifie l'authentification pour les routes protégées
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');

  if (to.path === '/login' && token) {
    // Si l'utilisateur est authentifié et essaie d'accéder à /login, redirige vers /dashboard
    next('/dashboard');
  } else if (to.meta.requiresAuth && !token) {
    // Si la route nécessite une authentification mais qu'il n'y a pas de token, redirige vers /login
    next('/login');
  } else {
    // Continue la navigation
    next();
  }
});

export default router;
