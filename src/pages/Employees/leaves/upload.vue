<!-- src/pages/leaves/LeaveUpload.vue -->
<template>
  <v-container>
    <v-card class="pa-4">
      <div class="d-flex align-center justify-space-between mb-3">
        <h2 class="text-h6 font-weight-bold">Upload Leaves</h2>
        <v-btn
          variant="text"
          prepend-icon="mdi-arrow-left"
          @click="router.push('/employees/leaves')"
        >
          Back
        </v-btn>
      </div>

      <!-- Upload -->
      <v-file-input
        label="Upload Leaves Excel (.xlsx / .csv)"
        accept=".xlsx, .csv"
        :multiple="false"
        @update:modelValue="handleFile"
      />

      <!-- Actions -->
      <div class="d-flex ga-2 my-3">
        <v-btn
          color="error"
          @click="openClearDialog"
          :disabled="!tableData.length"
        >
          Clear
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!tableData.length"
          :loading="loading"
          @click="saveData"
        >
          Save
        </v-btn>
      </div>

      <!-- Preview Table -->
      <v-data-table
        v-if="tableData.length"
        :headers="headers"
        :items="tableData"
        class="elevation-1"
        :items-per-page="10"
      >
        <template #item.casualBalance="{ item }">{{ item.casual.balance }}</template>
        <template #item.sickBalance="{ item }">{{ item.sick.balance }}</template>
        <template #item.annualBalance="{ item }">{{ item.annual.balance }}</template>
      </v-data-table>
    </v-card>

    <ConfirmDialog
      v-model="confirmDialog"
      :title="dialogSetting.title"
      :message="dialogSetting.message"
      :cancelText="dialogSetting.cancelText"
      :confirmText="dialogSetting.confirmText"
      @confirm="confirmClear"
    />
  </v-container>
</template>

<script setup>
import ConfirmDialog from "../../../components/ui/ConfirmDialog.vue";
import { useEmployeeStore } from "../../../stores/employeeStore.js";
import * as XLSX from "xlsx";
import { ref } from "vue";
import { useRouter } from "vue-router";

const employeeStore = useEmployeeStore();
const router = useRouter();

const tableData = ref([]);
const loading = ref(false);
const confirmDialog = ref(false);
const dialogSetting = ref({
  title: "",
  message: "",
  cancelText: "",
  confirmText: "",
});

const headers = ref([
  { title: "Employee ID", key: "employeeid" },
  { title: "Name", key: "name" },
  { title: "Department", key: "department" },
  { title: "Year", key: "year" },
  { title: "Casual Bal", key: "casualBalance", sortable: false },
  { title: "Sick Bal", key: "sickBalance", sortable: false },
  { title: "Annual Bal", key: "annualBalance", sortable: false },
  { title: "Total Remaining", key: "totalRemaining" },
]);

// --- helpers ---
const num = (v) => (v === "" || v == null ? 0 : Number(v));

// Map raw Excel rows -> normalized leave records (balance auto-computed)
const normalizeLeaveRows = (rows) =>
  rows
    .filter((r) => r["Employee ID"]) // skip blank/total rows
    .map((r) => {
      const cT = num(r["Casual Total"]);
      const cU = num(r["Casual Used"]);
      const sT = num(r["Sick Total"]);
      const sU = num(r["Sick Used"]);
      const aT = num(r["Annual Total"]);
      const aU = num(r["Annual Used"]);
      return {
        employeeid: r["Employee ID"],
        name: r["Employee Name"],
        department: r["Department"],
        year: r["Year (Duration)"],
        casual: { total: cT, used: cU, balance: cT - cU },
        sick: { total: sT, used: sU, balance: sT - sU },
        annual: { total: aT, used: aU, balance: aT - aU },
        totalRemaining: cT - cU + (sT - sU) + (aT - aU),
      };
    });

// --- file upload ---
const handleFile = (files) => {
  if (!files) return;
  const file = Array.isArray(files) ? files[0] : files;
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // IMPORTANT: the sheet has a merged title row at row 1, real headers at row 2.
    // range: 1 tells SheetJS to start at the second row.
    const jsonData = XLSX.utils.sheet_to_json(sheet, { range: 1 });

    tableData.value = normalizeLeaveRows(jsonData);

    if (!tableData.value.length) {
      employeeStore.callNotification({
        text: "No valid rows found. Check the file headers.",
        color: "error",
      });
    }
  };
  reader.readAsArrayBuffer(file);
};

// --- save ---
const saveData = () => {
  loading.value = true;
  try {
    employeeStore.setLeaves(tableData.value);
    tableData.value = [];
    employeeStore.callNotification({
      text: "Leave records updated successfully",
      color: "success",
    });
    router.push("/employees/leaves");
  } catch (err) {
    employeeStore.callNotification({ text: `${err}`, color: "error" });
  } finally {
    loading.value = false;
  }
};

// --- clear ---
const openClearDialog = () => {
  dialogSetting.value = {
    title: "Confirm Clear",
    message: "Are you sure you want to clear the uploaded preview?",
    cancelText: "Cancel",
    confirmText: "Clear",
  };
  confirmDialog.value = true;
};
const confirmClear = () => {
  tableData.value = [];
  confirmDialog.value = false;
};
</script>

<style scoped>
.ga-2 {
  gap: 10px;
}
</style>
