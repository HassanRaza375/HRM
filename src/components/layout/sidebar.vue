<template>
  <v-navigation-drawer
    color="sidebar"
    class="sidebar"
    :model-value="drawer"
    @update:modelValue="(val) => emit('update:drawer', val)"
    :rail="rail"
    app
  >
    <v-list>
      <v-toolbar-title class="d-flex align-center justify-center">
        <div>Sat</div>
      </v-toolbar-title>
      <v-divider class="my-2" />

      <!-- Menu Items -->
      <v-tooltip
        v-for="item in menuItems"
        :key="item.path"
        location="right"
        :disabled="!rail"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="item.icon"
            :title="rail ? '' : item.title"
            :to="item.path"
            rounded="lg"
            active-class="bg-active text-white font-weight-bold hover:bg-grey-lighten-3"
            exact
          />
        </template>

        <span>{{ item.title }}</span>
      </v-tooltip>

      <!-- Logout -->
      <v-tooltip location="right" :disabled="!rail">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-logout"
            :title="rail ? '' : 'Logout'"
            rounded="lg"
            active-class="bg-active text-white font-weight-bold hover:bg-grey-lighten-3 cursor-pointer"
            exact
            @click="logoutAuth"
          />
        </template>

        <span>Logout</span>
      </v-tooltip>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useEmployeeStore } from "../../stores/employeeStore";
const props = defineProps({
  drawer: Boolean,
  rail: Boolean,
});
const emit = defineEmits(["update:drawer", "update:rail"]);

const employeeStore = useEmployeeStore();

const menuItems = [
  { title: "Dashboard", icon: "mdi-view-dashboard", path: "/" },
  { title: "HCM", icon: "mdi-account", path: "/hrm" },
  { title: "Reports", icon: "mdi-file-chart-outline", path: "/report" },
  { title: "Setting", icon: "mdi-cog", path: "/settings" },
  // { title: "Employees", icon: "mdi-account-group", path: "/employees" },
  // { title: "Templates", icon: "mdi-file-document", path: "/templates" },
];

const logoutAuth = () => {
  employeeStore.logout();
};
</script>
