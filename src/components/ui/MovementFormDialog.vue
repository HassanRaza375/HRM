<!-- src/components/ui/MovementFormDialog.vue -->
<template>
  <v-dialog v-model="open" max-width="640">
    <v-card v-if="form">
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ form.id ? "Edit" : "Add" }} Movement</span>
        <v-btn icon="mdi-close" variant="text" size="small" @click="open = false" />
      </v-card-title>

      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-select
              label="Asset *"
              v-model="form.assettag"
              :items="assetOptions"
              item-title="title"
              item-value="value"
              density="comfortable"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              label="Employee *"
              v-model="form.employeeid"
              :items="employeeOptions"
              item-title="title"
              item-value="value"
              density="comfortable"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select label="Action *" v-model="form.action" :items="actionOptions" density="comfortable" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Date" type="date" v-model="form.date" density="comfortable" />
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
import { useEmployeeStore } from "../../stores/employeeStore";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  movement: { type: Object, default: null },
});
const emit = defineEmits(["update:modelValue", "save"]);

const assetStore = useAssetStore();
const employeeStore = useEmployeeStore();

const actionOptions = ["Assigned", "Returned", "Transferred", "Sent for Repair"];
const conditionOptions = ["new", "good", "fair", "damaged"];

const assetOptions = computed(() =>
  assetStore.assets.map((a) => ({
    title: `${a.assettag} — ${a.brand || ""} ${a.model || a.type || ""}`.trim(),
    value: a.assettag,
  }))
);
const employeeOptions = computed(() =>
  employeeStore.employees.map((e) => ({
    title: `${e.name} (${e.employeeid})`,
    value: e.employeeid,
  }))
);

const blank = () => ({
  id: null,
  assettag: "",
  assetname: "",
  employeeid: "",
  employeename: "",
  action: "Assigned",
  date: new Date().toISOString().slice(0, 10),
  condition: "good",
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
    if (isOpen) form.value = props.movement ? { ...props.movement } : blank();
  },
  { immediate: true }
);

const valid = computed(
  () => !!form.value.assettag && !!form.value.employeeid && !!form.value.action
);

const save = () => {
  if (!valid.value) return;
  // enrich with readable names so the table doesn't need a join
  const asset = assetStore.assets.find((a) => a.assettag === form.value.assettag);
  const emp = employeeStore.employees.find((e) => e.employeeid === form.value.employeeid);
  emit("save", {
    ...form.value,
    assetname: asset ? `${asset.brand || ""} ${asset.model || asset.type || ""}`.trim() : "",
    employeename: emp ? emp.name : "",
  });
};
</script>