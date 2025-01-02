<template>
  <Menubar :model="menuItems" class="menubar-custom">
    <template #start>
      <!-- Contenu à gauche -->
      <Button label="Dashboard" icon="pi pi-home" class="p-button-text" @click="goToDashboard" />
      <Button label="ChatBot" icon="pi pi-comment" class="p-button-text" @click="goToChatBot" />

    </template>
    <template #end>
      <!-- Contenu à droite -->
      <Button label="Logout" icon="pi pi-sign-out" class="p-button-text" @click="handleLogout" />
    </template>
  </Menubar>
</template>

<script>
import { useAuthStore } from "@/components/common/useAuthStore"; // Ajustez le chemin vers votre store
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import { useRouter } from "vue-router";

export default {
  components: {
    Menubar,
    Button,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const menuItems = []; // Menu principal vide car nous utilisons les slots `start` et `end`.

    const goToDashboard = () => {
      router.push("/dashboard");
    };
    const goToChatBot = () => {
      router.push("/chatbot");
    };

    const handleLogout=() => {
      authStore.logout(router); 

    }
    return { menuItems, authStore, goToDashboard, goToChatBot, handleLogout };
  },
};

</script>

<style>
.menubar-custom {
  background-color: #f8f9fa; /* Couleur de fond */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Ombre */
  border-radius: 0; /* Sans bordures */
}

.menubar-custom .p-button-text {
  font-size: 1rem;
  margin: 0 0.5rem; /* Ajuste l'espacement */
}
</style>
