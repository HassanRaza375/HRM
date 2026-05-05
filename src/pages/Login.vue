<template>
  <v-row>
    <v-col cols="12">
      <div class="text-white">
        <h3 class="white--text font-weight-regular mt-3 mb-2">Sat Japan HRM</h3>
        <small class="grey--text">
          <v-icon icon="mdi-copyright" class="grey--text"></v-icon>
          Copyright
          <a href="https://www.satjapan.com" style="color: rgb(189, 187, 187)">
            SAT HRM
          </a>
          {{ new Date().getFullYear() }} - All Rights Reserved
        </small>
      </div>
    </v-col>

    <v-col cols="12">
      <div class="d-flex justify-center align-center">
        <div
          class="w-100 d-flex align-center justify-center"
          style="height: 80vh; max-width: 500px"
        >
          <div class="w-100">
            <div class="d-flex align-center justify-center mb-5 pb-4">
              <img
                src="https://frontjp.shineauto.info/_ipx/s_136x45/assets/images/header-logo.svg"
                width="140"
                height="47"
                loading="lazy"
                alt="icon"
              />
            </div>

            <v-text-field
              label="Username"
              variant="solo"
              class="mb-2"
              v-model="credentials.username"
            />

            <v-text-field
              v-model="credentials.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              variant="solo"
              class="mb-2 cursor-pointer"
              @click:append-inner="showPassword = !showPassword"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            />

            <div class="d-flex align-center justify-center">
              <v-btn color="primary" block size="x-large" @click="handleLogin">
                Login
              </v-btn>
            </div>

            <div v-if="error" class="text-red mt-2 text-center">
              {{ error }}
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useEmployeeStore } from "../stores/employeeStore";
import { storageService } from "../services/storageService";

const router = useRouter();
const employeeStore = useEmployeeStore();

const showPassword = ref(false);

const credentials = ref({
  username: "",
  password: "",
});

const error = ref("");

const allowedCredentials = [
  { username: "admin", password: "admin" },
  { username: "hrsat", password: "satjapan123" },
];

const handleLogin = () => {
  const isValid = allowedCredentials.some(
    (user) =>
      user.username === credentials.value.username &&
      user.password === credentials.value.password,
  );

  if (isValid) {
    error.value = "";
    storageService.set("isAuthenticated", "true");
    router.push("/");
  } else {
    error.value = "Invalid username or password";
  }
};
</script>
