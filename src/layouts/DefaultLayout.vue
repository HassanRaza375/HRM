<template>
  <v-app>
    <!-- Sidebar -->
    <Sidebar v-model:drawer="drawer" v-model:rail="rail" />
    <!-- Header -->
    <Header
      @toggleDrawer="toggleDrawer"
      @toggleRail="toggleRail"
      :toggleTheme="toggleTheme"
      :isDark="isDark"
    />

    <!-- Content -->
    <v-main>
      <v-container> <router-view /> </v-container>
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>


<script setup>
import { ref } from "vue";
import { useAppTheme } from "../composables/useTheme";
import Header from "../components/layout/header.vue";
import Footer from "../components/layout/footer.vue";
import Sidebar from "../components/layout/sidebar.vue";

const drawer = ref(true);
const rail = ref(false);
const toggleRail = () => {
  rail.value = !rail.value;
};
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const { toggleTheme, isDark } = useAppTheme();
</script>