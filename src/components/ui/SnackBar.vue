<template>
  <div class="snackbar-wrapper">
    <v-snackbar
      v-for="(item, index) in messages"
      :key="index"
      v-model="item.show"
      :color="item.color"
      :timeout="item.timeout"
      location="top right"
      class="mb-2"
    >
      {{ item.text }}

      <template #actions>
        <v-btn icon="mdi-close" variant="text" @click="closeSnackbar(index)" />
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useEmployeeStore } from "../../stores/employeeStore";

const employeeStore = useEmployeeStore();

const messages = computed(() => employeeStore.notification);

watch(
  () => employeeStore.notification.length,
  () => {
    employeeStore.notification.forEach((item) => {
      if (item.show === undefined) {
        item.show = true;
      }
    });
  },
  { deep: true },
);

const closeSnackbar = (index) => {
  employeeStore.removeNotification(index);
};
</script>

<style scoped>
.snackbar-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
