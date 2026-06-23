<!-- src/components/ui/AssetTypeFormDialog.vue -->
<template>
  <v-dialog v-model="open" max-width="520">
    <v-card v-if="form">
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ form.id ? "Edit" : "Add" }} Asset Type</span>
        <v-btn icon="mdi-close" variant="text" size="small" @click="open = false" />
      </v-card-title>

      <v-card-text>
        <v-text-field label="Name *" v-model="form.name" density="comfortable" />
        <v-textarea
          label="Description"
          v-model="form.description"
          rows="2"
          density="comfortable"
        />
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="open = false">Cancel</v-btn>
        <v-btn color="primary" :disabled="!form.name" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  type: { type: Object, default: null },
});
const emit = defineEmits(["update:modelValue", "save"]);

const blank = () => ({ id: null, name: "", description: "" });
const form = ref(blank());

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      form.value = props.type ? { ...props.type } : blank();
    }
  },
  { immediate: true }
);

const save = () => {
  if (!form.value.name) return;
  emit("save", { ...form.value });
};
</script>