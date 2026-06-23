<!-- src/pages/Assets/upload.vue   (route: /assets/upload) -->
<template>
  <v-container>
    <v-card class="pa-4">
      <div class="d-flex align-center justify-space-between mb-3">
        <h2 class="text-h6 font-weight-bold">Upload Assets</h2>
        <v-btn variant="text" prepend-icon="mdi-arrow-left" @click="router.push('/assets/create')">Back</v-btn>
      </div>

      <p class="text-caption text-medium-emphasis mb-2">
        Expected columns: Asset Tag, Type, Brand, Model, Serial Number, Purchase Date, Cost, Status, Condition, Location, Notes
      </p>

      <v-file-input
        label="Upload Assets Excel (.xlsx / .csv)"
        accept=".xlsx, .csv"
        :multiple="false"
        @update:modelValue="handleFile"
      />

      <div class="d-flex ga-2 my-3">
        <v-btn color="error" :disabled="!tableData.length" @click="tableData = []">Clear</v-btn>
        <v-btn color="primary" :disabled="!tableData.length" :loading="loading" @click="saveData">Save</v-btn>
      </div>

      <v-data-table
        v-if="tableData.length"
        :headers="headers"
        :items="tableData"
        class="elevation-1"
        :items-per-page="10"
      />
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as XLSX from "xlsx";
import { useAssetStore } from "../../stores/assetStore";
import { useEmployeeStore } from "../../stores/employeeStore";

const router = useRouter();
const assetStore = useAssetStore();
const employeeStore = useEmployeeStore();

const tableData = ref([]);
const loading = ref(false);

const headers = ref([
  { title: "Asset Tag", key: "assettag" },
  { title: "Type", key: "type" },
  { title: "Brand", key: "brand" },
  { title: "Model", key: "model" },
  { title: "Serial", key: "serialnumber" },
  { title: "Status", key: "status" },
  { title: "Condition", key: "condition" },
  { title: "Cost", key: "cost" },
]);

const str = (v) => (v == null ? "" : String(v).trim());

const normalizeRows = (rows) =>
  rows
    .filter((r) => r["Asset Tag"])
    .map((r) => ({
      assettag: str(r["Asset Tag"]),
      type: str(r["Type"]),
      brand: str(r["Brand"]),
      model: str(r["Model"]),
      serialnumber: str(r["Serial Number"]),
      purchasedate: str(r["Purchase Date"]),
      cost: r["Cost"] == null || r["Cost"] === "" ? null : Number(r["Cost"]),
      status: str(r["Status"]).toLowerCase() || "available",
      condition: str(r["Condition"]).toLowerCase() || "good",
      location: str(r["Location"]),
      notes: str(r["Notes"]),
    }));

const handleFile = (files) => {
  if (!files) return;
  const file = Array.isArray(files) ? files[0] : files;
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // If your file has a merged title row above the headers, use { range: 1 } here.
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    tableData.value = normalizeRows(jsonData);
    if (!tableData.value.length) {
      employeeStore.callNotification({ text: "No valid rows found. Check headers.", color: "error" });
    }
  };
  reader.readAsArrayBuffer(file);
};

const saveData = () => {
  loading.value = true;
  try {
    assetStore.setAssets(tableData.value);
    tableData.value = [];
    employeeStore.callNotification({ text: "Assets uploaded successfully", color: "success" });
    router.push("/assets/create");
  } catch (err) {
    employeeStore.callNotification({ text: `${err}`, color: "error" });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.ga-2 { gap: 10px; }
</style>