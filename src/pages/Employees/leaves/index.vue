<!-- src/pages/leaves/LeavesList.vue -->
<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div class="d-flex align-center ga-2 justify-space-between">
            <h1 class="text-h5 font-weight-bold">Employee Leaves</h1>
            <div class="d-flex ga-2">
              <v-btn
                class="rounded-0"
                color="primary"
                prepend-icon="mdi-upload"
                @click="router.push('/employees/leaves/upload')"
              >
                Upload
              </v-btn>
              <v-btn
                class="rounded-0"
                prepend-icon="mdi-arrow-left"
                color="grey-lighten-1"
                @click="goBack"
              >
                Back
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Summary cards (org-wide totals) -->
  <v-row>
    <v-col v-for="card in summaryCards" :key="card.key" cols="12" md="4">
      <v-card>
        <v-card-text>
          <div class="text-overline">{{ card.label }}</div>
          <div class="d-flex justify-space-between mt-2">
            <div>
              <div class="text-caption">Total</div>
              <div class="text-h6">{{ card.total }}</div>
            </div>
            <div>
              <div class="text-caption">Used</div>
              <div class="text-h6">{{ card.used }}</div>
            </div>
            <div>
              <div class="text-caption">Balance</div>
              <div class="text-h6 text-primary">{{ card.balance }}</div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Table -->
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="leaves"
          :items-per-page="10"
          class="elevation-1"
        >
          <template #item.casualBalance="{ item }">{{ item.casual.balance }}</template>
          <template #item.sickBalance="{ item }">{{ item.sick.balance }}</template>
          <template #item.annualBalance="{ item }">{{ item.annual.balance }}</template>

          <template #item.actions="{ item }">
            <v-btn size="small" variant="text" @click="viewRow(item)">View</v-btn>
            <v-btn size="small" variant="text" color="info" @click="editRow(item)">Edit</v-btn>
            <v-btn size="small" variant="text" color="error" @click="openDeleteDialog(item)">Delete</v-btn>
          </template>

          <template #no-data>
            <div class="pa-6 text-center text-medium-emphasis">
              No leave records yet. Click <strong>Upload</strong> to import an Excel file.
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>

  <!-- Edit dialog -->
  <LeaveEditDialog v-model="editDialog" :record="selectedRow" @save="onSaveEdit" />

  <!-- Delete confirm -->
  <ConfirmDialog
    v-model="deleteDialog"
    title="Confirm Delete"
    message="Delete this employee's leave record?"
    cancelText="Cancel"
    confirmText="Delete"
    @confirm="confirmDelete"
  />
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useEmployeeStore } from "../../../stores/employeeStore.js";
import ConfirmDialog from "../../../components/ui/ConfirmDialog.vue";
import LeaveEditDialog from "../../../components/ui/LeaveEditDialog.vue";

const router = useRouter();
const employeeStore = useEmployeeStore();

const leaves = ref([]);
const selectedRow = ref(null);
const editDialog = ref(false);
const deleteDialog = ref(false);

const headers = [
  { title: "Employee ID", key: "employeeid" },
  { title: "Name", key: "name" },
  { title: "Department", key: "department" },
  { title: "Year", key: "year" },
  { title: "Casual Bal", key: "casualBalance", sortable: false },
  { title: "Sick Bal", key: "sickBalance", sortable: false },
  { title: "Annual Bal", key: "annualBalance", sortable: false },
  { title: "Total Remaining", key: "totalRemaining" },
  { title: "Actions", key: "actions", sortable: false },
];

const loadData = () => {
  employeeStore.loadLeaves();
  leaves.value = employeeStore.leaves;
};

// Org-wide totals for the three cards
const summaryCards = computed(() => {
  const sum = (type, field) =>
    leaves.value.reduce((acc, l) => acc + (l[type]?.[field] || 0), 0);
  return [
    { key: "annual", label: "Annual Leaves", total: sum("annual", "total"), used: sum("annual", "used"), balance: sum("annual", "balance") },
    { key: "casual", label: "Casual Leaves", total: sum("casual", "total"), used: sum("casual", "used"), balance: sum("casual", "balance") },
    { key: "sick", label: "Sick Leaves", total: sum("sick", "total"), used: sum("sick", "used"), balance: sum("sick", "balance") },
  ];
});

const viewRow = (item) => router.push(`/employees/leaves/${item.employeeid}`);

const editRow = (item) => {
  selectedRow.value = { ...item };
  editDialog.value = true;
};
const onSaveEdit = (record) => {
  employeeStore.updateLeave(record);
  loadData();
  editDialog.value = false;
  employeeStore.callNotification({ text: "Leave record updated", color: "success" });
};

const openDeleteDialog = (item) => {
  selectedRow.value = item;
  deleteDialog.value = true;
};
const confirmDelete = () => {
  if (selectedRow.value) employeeStore.deleteLeave(selectedRow.value.employeeid);
  loadData();
  deleteDialog.value = false;
  employeeStore.callNotification({ text: "Leave record deleted", color: "success" });
};

const goBack = () => router.back();

onMounted(loadData);
</script>

<style scoped>
.ga-2 {
  gap: 8px;
}
</style>