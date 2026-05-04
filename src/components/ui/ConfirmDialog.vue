<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-card-title class="text-h6">
                {{ title }}
            </v-card-title>

            <v-card-text>
                {{ message }}
            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn variant="text" @click="onCancel">
                    {{ cancelText }}
                </v-btn>

                <v-btn color="error" @click="onConfirm">
                    {{ confirmText }}
                </v-btn>
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
        default: "Confirm Delete",
    },
    message: {
        type: String,
        default: "Are you sure you want to delete this item?",
    },
    confirmText: {
        type: String,
        default: "Delete",
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

// Confirm
const onConfirm = () => {
    emit("confirm");
    dialog.value = false;
};
</script>