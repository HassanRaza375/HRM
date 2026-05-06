<template>
  <v-container>
    <v-card class="pa-4">
      <!-- Upload -->
      <v-file-input
        label="Upload Excel"
        accept=".xlsx, .csv"
        :multiple="false"
        @update:modelValue="handleFile"
      />

      <!-- Actions -->
      <div class="d-flex gap-2 my-3">
        <v-btn color="error" @click="clearData">Clear</v-btn>
        <v-btn
          color="primary"
          :disabled="!tableData.length"
          :loading="Loading"
          @click="saveData"
        >
          Save
        </v-btn>
      </div>

      <!-- Table -->
      <v-data-table
        v-if="tableData.length"
        :headers="headers"
        :items="tableData"
        class="elevation-1"
        :items-per-page="10"
      >
        <!-- Actions -->
        <template #item.actions="{ item }">
          <v-btn size="small" @click="viewRow(item)">View</v-btn>
          <v-btn size="small" color="error" @click="openDeleteDialog(item)">
            Delete
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <ConfirmDialog
      v-model="deleteDialog"
      title="Confirm Delete"
      message="Are you sure you want to delete this item?"
      @confirm="confirmDelete"
    />
    <ViewDetails v-model="dialog" :selectedRow="selectedRow" />
  </v-container>
</template>
<script setup>
import ConfirmDialog from "../../components/ui/ConfirmDialog.vue";
import ViewDetails from "../../components/ui/ViewDetails.vue";
import { useEmployeeStore } from "../../stores/employeeStore";
import formatKey from "../../utils/formatekey";
import * as XLSX from "xlsx";
import { ref } from "vue";

const employeeStore = useEmployeeStore();
const tableData = ref([]);
const headers = ref([]);
const Loading = ref(false);
const dialog = ref(false);
const deleteDialog = ref(false);
const selectedRow = ref({});

//  Handle File Upload
const handleFile = (files) => {
  if (!files) return;

  //  Get first file from array
  const file = Array.isArray(files) ? files[0] : files;

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(sheet);

    tableData.value = jsonData;

    headers.value = [
      ...Object.keys(jsonData[0] || {}).map((key) => ({
        title: key,
        key: key,
      })),
      { title: "Actions", key: "actions" },
    ];
  };

  reader.readAsArrayBuffer(file); //  now correct
};

//  Clear
const clearData = () => {
  openDeleteDialog(null);
};

//  Save to localStorage
const saveData = () => {
  Loading.value = true;

  try {
    // Transform keys here
    const formattedData = tableData.value.map((row) => {
      const newRow = {};

      Object.keys(row).forEach((key) => {
        const formattedKey = formatKey(key);
        newRow[formattedKey] = row[key];
      });

      return newRow;
    });

    // Save formatted data
    employeeStore.$state.employees = formattedData;

    employeeStore.save();
    employeeStore.load();
    employeeStore.showMainContent = true;

    alert("Saved successfully!");
  } catch (err) {
    console.log(err);
  } finally {
    Loading.value = false;
  }
};
//  View Row
const viewRow = (row) => {
  selectedRow.value = row;
  dialog.value = true;
};
//  Delete Row
const openDeleteDialog = (row) => {
  selectedRow.value = row;
  deleteDialog.value = true;
};
const confirmDelete = () => {
  if (selectedRow.value) {
    tableData.value = tableData.value.filter(
      (item) => item !== selectedRow.value,
    );
  } else {
    tableData.value = [];
    headers.value = [];
  }
  deleteDialog.value = false;
};
</script>
<style scoped>
.gap-2 {
  gap: 10px;
}
</style>
