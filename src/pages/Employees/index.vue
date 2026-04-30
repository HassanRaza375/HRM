<template>
  <div>
    <DataTables
      :headers="headers"
      :items="employees"
      :itemsPerPageOptions="itemsPerPageOptions"
    />
  </div>
</template>

<script setup>
import DataTables from "../../components/ui/DataTables.vue";
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

const employees = [
  { name: "Ali", email: "ali@test.com", role: "Admin", status: "Active" },
  { name: "Ahmed", email: "ahmed@test.com", role: "User", status: "Inactive" },
];
</script>

<style></style>
