<!-- src/components/ui/LeaveEditDialog.vue -->
<template>
  <v-dialog v-model="open" max-width="640">
    <v-card v-if="form">
      <v-card-title class="d-flex align-center justify-space-between">
        <span>Edit Leave — {{ form.name }}</span>
        <v-btn icon="mdi-close" variant="text" size="small" @click="open = false" />
      </v-card-title>

      <v-card-text>
        <div v-for="t in types" :key="t.key" class="mb-4">
          <div class="text-subtitle-2 mb-2">{{ t.label }}</div>
          <v-row dense>
            <v-col cols="4">
              <v-text-field
                label="Total"
                type="number"
                density="comfortable"
                v-model.number="form[t.key].total"
                :min="0"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Used"
                type="number"
                density="comfortable"
                v-model.number="form[t.key].used"
                :min="0"
                :max="form[t.key].total"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Balance"
                density="comfortable"
                :model-value="form[t.key].total - form[t.key].used"
                readonly
              />
            </v-col>
          </v-row>
        </div>

        <div class="d-flex justify-space-between text-subtitle-1 font-weight-medium">
          <span>Total Remaining</span>
          <span class="text-primary">{{ totalRemaining }}</span>
        </div>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="open = false">Cancel</v-btn>
        <v-btn color="primary" :disabled="!valid" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  record: { type: Object, default: null },
});
const emit = defineEmits(["update:modelValue", "save"]);

const types = [
  { key: "casual", label: "Casual Leaves" },
  { key: "sick", label: "Sick Leaves" },
  { key: "annual", label: "Annual Leaves" },
];

const form = ref(null);

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

// Clone the record into a local editable copy whenever the dialog opens
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.record) {
      form.value = JSON.parse(JSON.stringify(props.record));
    }
  },
  { immediate: true }
);

const totalRemaining = computed(() => {
  if (!form.value) return 0;
  return types.reduce(
    (acc, t) => acc + (form.value[t.key].total - form.value[t.key].used),
    0
  );
});

// Used must not exceed Total for any type
const valid = computed(() => {
  if (!form.value) return false;
  return types.every(
    (t) => Number(form.value[t.key].used) <= Number(form.value[t.key].total)
  );
});

const save = () => {
  if (!form.value || !valid.value) return;
  // recompute balances + remaining before emitting
  types.forEach((t) => {
    const b = form.value[t.key];
    b.balance = Number(b.total) - Number(b.used);
  });
  form.value.totalRemaining = totalRemaining.value;
  emit("save", form.value);
};
</script>
