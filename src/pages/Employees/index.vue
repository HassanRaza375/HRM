<template>
  <div>
    <DataTables :headers="headers" :items="employees" :itemsPerPageOptions="itemsPerPageOptions" @delete="onDelete"
      @edit="onEdit" @view="onView" @addNew="onAddNew" PageName="Employees" />
    <ConfirmDialog v-model="deleteDialog" title="Confirm Delete" message="Are you sure you want to delete this item?"
      @confirm="confirmDelete" />
    <!-- View Dialog -->
    <ViewDetails v-model="dialog" :selectedRow="selectedRow" />
  </div>
</template>

<script setup>
import DataTables from "../../components/ui/DataTables.vue";
import ConfirmDialog from "../../components/ui/ConfirmDialog.vue";
import ViewDetails from "../../components/ui/ViewDetails.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const itemsPerPageOptions = [10, 20, 30];
const headers = [
  { title: "Employee ID", key: "employeeId" },
  { title: "Name", key: "name" },
  { title: "Designation", key: "designation" },
  { title: "Reporting Line", key: "reportingLine" },
  { title: "Phone", key: "phone" },
  { title: "Official Email", key: "officialEmail" },
  { title: "DOJ", key: "doj" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions", sortable: false },
];

const employees = ref([
  { employeeId: 1, name: "Ali", email: "ali@test.com", role: "Admin", status: "Active" },
  { employeeId: 2, name: "Ahmed", email: "ahmed@test.com", role: "User", status: "Inactive" },
]);

const router = useRouter();
const dialog = ref(false);
const deleteDialog = ref(false);
const selectedRow = ref({});

const onEdit = (e) => {
  router.push("/employees/create?id=" + e.employeeId);
}
const onDelete = (e) => {
  selectedRow.value = e;
  deleteDialog.value = true;
}
const confirmDelete = () => {
  employees.value = employees.value.filter(
    (item) => item !== selectedRow.value
  );
  deleteDialog.value = false;
};
const onView = (e) => {
  selectedRow.value = e;
  dialog.value = true;
}
const onAddNew = () => {
  router.push("/employees/create");
}
</script>

<style></style>
