<!-- src/components/ui/AssetFormDialog.vue -->
<template>
  <v-dialog v-model="open" max-width="720">
    <v-card v-if="form">
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ form.id ? "Edit" : "Add" }} Asset</span>
        <v-btn icon="mdi-close" variant="text" size="small" @click="open = false" />
      </v-card-title>

      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field label="Asset Tag *" v-model="form.assettag" density="comfortable" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              label="Type *"
              v-model="form.type"
              :items="typeOptions"
              density="comfortable"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Brand" v-model="form.brand" density="comfortable" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Model" v-model="form.model" density="comfortable" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Serial Number" v-model="form.serialnumber" density="comfortable" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Purchase Date" type="date" v-model="form.purchasedate" density="comfortable" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Cost" type="number" v-model.number="form.cost" density="comfortable" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Location" v-model="form.location" density="comfortable" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select label="Status" v-model="form.status" :items="statusOptions" density="comfortable" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select label="Condition" v-model="form.condition" :items="conditionOptions" density="comfortable" />
          </v-col>
          <v-col cols="12">
            <v-textarea label="Notes" v-model="form.notes" rows="2" density="comfortable" />
          </v-col>
        </v-row>
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
import { useAssetStore } from "../../stores/assetStore";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  asset: { type: Object, default: null },
});
const emit = defineEmits(["update:modelValue", "save"]);

const assetStore = useAssetStore();

const statusOptions = ["available", "assigned", "repair", "retired"];
const conditionOptions = ["new", "good", "fair", "damaged"];
const typeOptions = computed(() => assetStore.assetTypes.map((t) => t.name));

const blank = () => ({
  id: null,
  assettag: "",
  type: "",
  brand: "",
  model: "",
  serialnumber: "",
  purchasedate: "",
  cost: null,
  status: "available",
  condition: "good",
  location: "",
  notes: "",
});
const form = ref(blank());

const open = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) form.value = props.asset ? { ...props.asset } : blank();
  },
  { immediate: true }
);

const valid = computed(() => !!form.value.assettag && !!form.value.type);

const save = () => {
  if (!valid.value) return;
  emit("save", { ...form.value });
};
</script>