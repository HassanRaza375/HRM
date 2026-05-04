<template>
    <v-dialog v-model="dialog" width="600">
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>
                <div v-for="(value, key) in selectedRow" :key="key">
                    <strong>{{ key }}:</strong> {{ value || '-' }}
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    modelValue: Boolean,
    title: {
        type: String,
        default: "Employee Details",
    },
    selectedRow: {
        type: Object,
        default: () => ({}),
    },
    cancelText: {
        type: String,
        default: "Cancel",
    },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const dialog = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

// Cancel
const onCancel = () => {
    dialog.value = false;
};
</script>