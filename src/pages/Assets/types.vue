<!-- src/pages/Assets/index.vue   (route: /assets) -->
<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div class="d-flex align-center justify-space-between flex-wrap ga-2">
            <h1 class="text-h5 font-weight-bold">Asset Types</h1>
            <div class="d-flex ga-2 flex-wrap">
              <v-btn color="primary" prepend-icon="mdi-plus" @click="openAdd">Add Type</v-btn>
              <v-btn variant="tonal" @click="router.push('/assets/')">Assets</v-btn>
              <v-btn variant="tonal" @click="router.push('/assets/movement')">Movement</v-btn>
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
        <v-data-table :headers="headers" :items="assetStore.assetTypes" :items-per-page="10" class="elevation-1">
          <template #item.actions="{ item }">
            <v-btn size="small" variant="text" color="info" @click="openEdit(item)">Edit</v-btn>
            <v-btn size="small" variant="text" color="error" @click="openDelete(item)">Delete</v-btn>
          </template>
          <template #no-data>
            <div class="pa-6 text-center text-medium-emphasis">No asset types yet. Click <strong>Add Type</strong>.</div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>

  <AssetTypeFormDialog v-model="formDialog" :type="selected" @save="onSave" />
  <ConfirmDialog
    v-model="deleteDialog"
    title="Confirm Delete"
    message="Delete this asset type?"
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
import AssetTypeFormDialog from "../../components/ui/AssetTypeFormDialog.vue";
import ConfirmDialog from "../../components/ui/ConfirmDialog.vue";

const router = useRouter();
const assetStore = useAssetStore();
const employeeStore = useEmployeeStore();

const headers = [
  { title: "Name", key: "name" },
  { title: "Description", key: "description" },
  { title: "Actions", key: "actions", sortable: false },
];

const formDialog = ref(false);
const deleteDialog = ref(false);
const selected = ref(null);

const openAdd = () => { selected.value = null; formDialog.value = true; };
const openEdit = (item) => { selected.value = { ...item }; formDialog.value = true; };
const openDelete = (item) => { selected.value = item; deleteDialog.value = true; };

const onSave = (type) => {
  type.id ? assetStore.updateAssetType(type) : assetStore.addAssetType(type);
  formDialog.value = false;
  employeeStore.callNotification({ text: "Asset type saved", color: "success" });
};
const onDelete = () => {
  if (selected.value) assetStore.deleteAssetType(selected.value.id);
  deleteDialog.value = false;
  employeeStore.callNotification({ text: "Asset type deleted", color: "success" });
};

onMounted(() => assetStore.load());
</script>

<style scoped>
.ga-2 { gap: 8px; }
</style>