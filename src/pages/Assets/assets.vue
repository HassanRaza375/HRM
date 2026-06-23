<!-- src/pages/Assets/register.vue   (route: /assets/create) -->
<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div class="d-flex align-center justify-space-between flex-wrap ga-2">
            <h1 class="text-h5 font-weight-bold">Assets</h1>
            <div class="d-flex ga-2 flex-wrap">
              <v-btn color="primary" prepend-icon="mdi-plus" @click="openAdd">Add Asset</v-btn>
              <v-btn color="primary" variant="tonal" prepend-icon="mdi-upload" @click="router.push('/assets/upload')">Upload</v-btn>
              <v-btn variant="tonal" @click="router.push('/assets/types')">Types</v-btn>
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
        <v-data-table :headers="headers" :items="assetStore.assets" :items-per-page="10" class="elevation-1">
          <template #item.status="{ item }">
            <v-chip size="small" :color="statusColor(item.status)" variant="flat">{{ item.status }}</v-chip>
          </template>
          <template #item.actions="{ item }">
            <v-btn size="small" variant="text" @click="openView(item)">View</v-btn>
            <v-btn size="small" variant="text" color="info" @click="openEdit(item)">Edit</v-btn>
            <v-btn size="small" variant="text" color="error" @click="openDelete(item)">Delete</v-btn>
          </template>
          <template #no-data>
            <div class="pa-6 text-center text-medium-emphasis">
              No assets yet. Click <strong>Add Asset</strong> or <strong>Upload</strong>.
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>

  <AssetFormDialog v-model="formDialog" :asset="selected" @save="onSave" />
  <ViewDetails v-model="viewDialog" :selectedRow="selected" />
  <ConfirmDialog
    v-model="deleteDialog"
    title="Confirm Delete"
    message="Delete this asset?"
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
import AssetFormDialog from "../../components/ui/AssetFormDialog.vue";
import ViewDetails from "../../components/ui/ViewDetails.vue";
import ConfirmDialog from "../../components/ui/ConfirmDialog.vue";

const router = useRouter();
const assetStore = useAssetStore();
const employeeStore = useEmployeeStore();

const headers = [
  { title: "Asset Tag", key: "assettag" },
  { title: "Type", key: "type" },
  { title: "Brand", key: "brand" },
  { title: "Model", key: "model" },
  { title: "Serial", key: "serialnumber" },
  { title: "Status", key: "status" },
  { title: "Condition", key: "condition" },
  { title: "Cost", key: "cost" },
  { title: "Actions", key: "actions", sortable: false },
];

const formDialog = ref(false);
const viewDialog = ref(false);
const deleteDialog = ref(false);
const selected = ref(null);

const statusColor = (s) =>
  ({ available: "green", assigned: "blue", repair: "orange", retired: "grey" }[s] || "grey");

const openAdd = () => { selected.value = null; formDialog.value = true; };
const openEdit = (item) => { selected.value = { ...item }; formDialog.value = true; };
const openView = (item) => { selected.value = item; viewDialog.value = true; };
const openDelete = (item) => { selected.value = item; deleteDialog.value = true; };

const onSave = (asset) => {
  asset.id ? assetStore.updateAsset(asset) : assetStore.addAsset(asset);
  formDialog.value = false;
  employeeStore.callNotification({ text: "Asset saved", color: "success" });
};
const onDelete = () => {
  if (selected.value) assetStore.deleteAsset(selected.value.id);
  deleteDialog.value = false;
  employeeStore.callNotification({ text: "Asset deleted", color: "success" });
};

onMounted(() => assetStore.load());
</script>

<style scoped>
.ga-2 { gap: 8px; }
</style>