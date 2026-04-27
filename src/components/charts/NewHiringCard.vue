<template>
    <v-card class="pa-4">
        <div class="text-subtitle-2 text-grey">
            New Hiring (This Month)
        </div>
        <div class="text-h5 font-weight-bold">
            {{ count }}
        </div>
    </v-card>
</template>

<script setup>
defineProps({
    count: Number,
});
</script>