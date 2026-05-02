<template>
  <div>
    <DataTables :headers="headers" :items="employees" :itemsPerPageOptions="itemsPerPageOptions" @delete="onDelete"
      @edit="onEdit" @view="onView" @addNew="onAddNew" PageName="Employees" />
  </div>
</template>

<script setup>
import DataTables from "../../components/ui/DataTables.vue";
const itemsPerPageOptions = [10, 20, 30];
import { useRouter } from "vue-router";
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
  { employeeId: 1, name: "Ali", email: "ali@test.com", role: "Admin", status: "Active" },
  { employeeId: 2, name: "Ahmed", email: "ahmed@test.com", role: "User", status: "Inactive" },
];

const router = useRouter();


const onEdit = (e) => {
  router.push("/employees/create?id=" + e.employeeId);
}
const onDelete = (e) => {
  console.log(e)
}
const onView = (e) => {
  console.log(e)
}
const onAddNew = () => {
  router.push("/employees/create");
}
</script>

<style></style>
