<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div class="d-flex align-center ga-2 justify-space-between">
            <h1 class="text-title-large font-weight-bold">Leave Request</h1>
            <div>
              <v-btn
                class="rounded-0"
                @click="goBack"
                prepend-icon="mdi-arrow-left"
                color="grey-lighten-1"
                >Back</v-btn
              >
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goBack = () => {
  router.back();
};
</script>

<style scoped></style>
