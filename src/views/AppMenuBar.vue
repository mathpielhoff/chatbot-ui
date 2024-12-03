<template>
  <Menubar :model="menuItems" />
</template>

<script>
import { useAuthStore } from "@/components/common/useAuthStore"; // Ajustez le chemin vers votre store
import Menubar from "primevue/menubar";

export default {
  components: {
    Menubar,
  },
  setup() {
    const authStore = useAuthStore();

    const menuItems = [
      {
        label: "Dashboard",
        icon: "pi pi-home",
        url: "/dashboard", // Lien vers la route dashboard
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        command: () => {
          authStore.logout();
        },
      },
    ];

    return { menuItems };
  },
};
</script>

<style>
.menubar-custom {
  background-color: #f8f9fa; /* Couleur de fond */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Ombre */
  border-radius: 0; /* Sans bordures */
}
</style>
