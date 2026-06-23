<!-- src/pages/Assets/movement.vue   (route: /assets/movement) -->
<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div class="d-flex align-center justify-space-between flex-wrap ga-2">
            <h1 class="text-h5 font-weight-bold">Assets Movement</h1>
            <div class="d-flex ga-2 flex-wrap">
              <v-btn color="primary" prepend-icon="mdi-plus" @click="openAdd">Add Movement</v-btn>
              <v-btn variant="tonal" @click="router.push('/assets')">Types</v-btn>
              <v-btn variant="tonal" @click="router.push('/assets/create')">Assets</v-btn>
              <v-btn prepend-icon="mdi-arrow-left" color="grey-lighten-1" @click="router.back()">Back</v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-card>
        <v-data-table :headers="headers" :items="assetStore.movements" :items-per-page="10" class="elevation-1">
          <template #item.actions="{ item }">
            <v-btn size="small" variant="text" color="info" @click="openEdit(item)">Edit</v-btn>
            <v-btn size="small" variant="text" color="error" @click="openDelete(item)">Delete</v-btn>
          </template>
          <template #no-data>
            <div class="pa-6 text-center text-medium-emphasis">No movement entries yet. Click <strong>Add Movement</strong>.</div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>

  <MovementFormDialog v-model="formDialog" :movement="selected" @save="onSave" />
  <ConfirmDialog
    v-model="deleteDialog"
    title="Confirm Delete"
    message="Delete this movement entry?"
    cancelText="Cancel"
    confirmText="Delete"
    @confirm="onDelete"
  />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAssetStore } from "../../stores/assetStore";
import { useEmployeeStore } from "../../stores/employeeStore";
import MovementFormDialog from "../../components/ui/MovementFormDialog.vue";
import ConfirmDialog from "../../components/ui/ConfirmDialog.vue";

const router = useRouter();
const assetStore = useAssetStore();
const employeeStore = useEmployeeStore();

const headers = [
  { title: "Date", key: "date" },
  { title: "Asset Tag", key: "assettag" },
  { title: "Asset", key: "assetname" },
  { title: "Employee", key: "employeename" },
  { title: "Action", key: "action" },
  { title: "Condition", key: "condition" },
  { title: "Notes", key: "notes" },
  { title: "Actions", key: "actions", sortable: false },
];

const formDialog = ref(false);
const deleteDialog = ref(false);
const selected = ref(null);

const openAdd = () => { selected.value = null; formDialog.value = true; };
const openEdit = (item) => { selected.value = { ...item }; formDialog.value = true; };
const openDelete = (item) => { selected.value = item; deleteDialog.value = true; };

const onSave = (movement) => {
  movement.id ? assetStore.updateMovement(movement) : assetStore.addMovement(movement);
  formDialog.value = false;
  employeeStore.callNotification({ text: "Movement saved", color: "success" });
};
const onDelete = () => {
  if (selected.value) assetStore.deleteMovement(selected.value.id);
  deleteDialog.value = false;
  employeeStore.callNotification({ text: "Movement deleted", color: "success" });
};

onMounted(() => {
  assetStore.load();
  employeeStore.load(); // needed for the employee dropdown in the dialog
});
</script>

<style scoped>
.ga-2 { gap: 8px; }
</style>