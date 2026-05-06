<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center bg-grey-lighten-4"
  >
    <v-card class="pa-10 text-center rounded-xl" max-width="500" elevation="8">
      <!-- Icon -->
      <v-icon size="100" color="warning" class="mb-4"> mdi-tools </v-icon>

      <!-- Title -->
      <h1 class="text-h4 font-weight-bold mb-3">Under Construction</h1>

      <!-- Description -->
      <p class="text-body-1 text-grey-darken-1 mb-6">
        This dashboard page is currently being built. Please check back later.
      </p>

      <!-- Button -->
      <v-btn color="primary" size="large" rounded="lg" to="/"> Go Back </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
// Optional logic here
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
