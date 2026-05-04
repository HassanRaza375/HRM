<template>
    <div class="fill-height d-flex align-center justify-center">
        <v-row class="text-center">
            <v-col cols="12">
                <h1 class="error-code">404</h1>
                <h2 class="mb-2">Page Not Found</h2>
                <p class="text-grey mb-6">
                    The page you are looking for doesn’t exist or has been moved.
                </p>

                <v-btn color="primary" size="large" @click="goHome">
                    Go to Dashboard
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
    router.push("/"); // or your dashboard route
};
</script>

<style scoped>
.error-code {
    font-size: 120px;
    font-weight: bold;
    color: #2a9fe8;
    line-height: 1;
}
</style>