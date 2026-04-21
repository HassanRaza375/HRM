<template>
  <v-app-bar app color="header" dark>
    <v-app-bar-nav-icon @click="handleDrawer" />
    <v-btn icon @click="emit('toggleRail')">
      <v-icon>mdi-dock-left</v-icon>
    </v-btn>
    <v-toolbar-title>HRM</v-toolbar-title>

    <v-spacer />

    <v-tooltip text="Toggle Theme">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" @click="toggleTheme">
          <v-icon>
            {{ isDark() ? "mdi-weather-sunny" : "mdi-weather-night" }}
          </v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </v-app-bar>
</template>
<script setup>
defineProps({
  toggleTheme: Function,
  isDark: Function,
});
const emit = defineEmits(["toggleDrawer", "toggleRail"]);
const handleDrawer = () => {
  emit("toggleDrawer");
};
</script>