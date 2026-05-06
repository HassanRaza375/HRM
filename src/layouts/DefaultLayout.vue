<template>
  <v-app v-if="employeeStore.showMainContent === true">
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
      <v-container fluid> <router-view /> </v-container>
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
  <LoadingLayout v-if="employeeStore.showMainContent === false" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAppTheme } from "../composables/useTheme";
import Header from "../components/layout/header.vue";
import Footer from "../components/layout/footer.vue";
import LoadingLayout from "../layouts/LoadingLayout.vue";
import Sidebar from "../components/layout/sidebar.vue";
import { useEmployeeStore } from "../stores/employeeStore";

const router = useRouter();
const employeeStore = useEmployeeStore();
onMounted(() => {
  employeeStore.load();
  employeeStore.showMainContent = false;
  if (employeeStore.employees.length === 0) {
    setTimeout(() => {
      employeeStore.showMainContent = true;
    }, 2500);
    router.push("/employees/bulk-upload");
  } else {
    setTimeout(() => {
      employeeStore.showMainContent = true;
    }, 2500);
  }
});

const drawer = ref(true);
const rail = ref(true);
const toggleRail = () => {
  rail.value = !rail.value;
};
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const { toggleTheme, isDark } = useAppTheme();
</script>
