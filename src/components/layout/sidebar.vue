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

      <v-list-item
        v-for="item in menuItems"
        :key="item.path"
        :prepend-icon="item.icon"
        :title="rail ? '' : item.title"
        :to="item.path"
        rounded="lg"
        active-class="bg-active text-white font-weight-bold hover:bg-grey-lighten-3"
        exact
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const props = defineProps({
  drawer: Boolean,
  rail: Boolean,
});

const emit = defineEmits(["update:drawer", "update:rail"]);

const menuItems = [
  { title: "Dashboard", icon: "mdi-view-dashboard", path: "/" },
  { title: "Employees", icon: "mdi-account-group", path: "/employees" },
  { title: "Templates", icon: "mdi-file-document", path: "/templates" },
];
</script>