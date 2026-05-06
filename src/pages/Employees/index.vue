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
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "../../stores/employeeStore";

const itemsPerPageOptions = [10, 20, 30];
const headers = [
  { title: "Employee ID", key: "employeeid" },
  { title: "Name", key: "name" },
  { title: "Designation", key: "designation" },
  { title: "Current Salary", key: "currentsalary" },
  { title: "Salary at Hiring", key: "salaryathiring" },
  { title: "After Probation", key: "afterprobation(ifapplicable)" },
  { title: "Reporting Line", key: "reportingline" },
  { title: "DOJ", key: "doj" },
  { title: "CNIC", key: "cnic" },
  { title: "Marital Status", key: "maritalstatus" },
  { title: "Religion", key: "religion" },
  { title: "DOB", key: "dob" },
  { title: "Age", key: "age" },
  { title: "Contact Number", key: "contactnumber" },
  { title: "Personal Email Address", key: "personalemailaddress" },
  { title: "Official Email Address", key: "officialemailaddress" },
  { title: "Father Name", key: "fathername" },
  { title: "Current Address", key: "currentaddress" },
  { title: "Permanent Address", key: "permanentaddress" },
  { title: "Emergency Contact Name", key: "emergencycontactname" },
  { title: "Emergency Contact Relation", key: "emergencycontactrelation" },
  { title: "Emergency Contact", key: "emergencycontactnumber" },
  { title: "Dependent Contact Name", key: "dependentcontactname" },
  { title: "Dependent Contact Relation", key: "dependentcontactrelation" },
  { title: "Dependent Contact", key: "dependentcontactnumber" },
  { title: "Bank Name", key: "bankname" },
  { title: "Account Title", key: "accounttitle" },
  { title: "Acount Number", key: "acountnumber" },
  { title: "Reporting Line", key: "reportingLine" },
  { title: "Actions", key: "actions", sortable: false },
];

const employees = ref([]);
const employeeStore = useEmployeeStore();
const router = useRouter();
const dialog = ref(false);
const deleteDialog = ref(false);
const selectedRow = ref({});

const onEdit = (e) => {
  router.push("/employees/create?id=" + e.employeeid);
};
const onDelete = (e) => {
  selectedRow.value = e;
  deleteDialog.value = true;
};
const confirmDelete = () => {
  employeeStore.deleteEmployee(selectedRow.value.employeeid);
  deleteDialog.value = false;
  LoadData();
};
const onView = (e) => {
  selectedRow.value = e;
  dialog.value = true;
};
const onAddNew = () => {
  router.push("/employees/create");
};
const LoadData = () => {
  employees.value = employeeStore.employees;
};
onMounted(() => {
  LoadData();
});
</script>

<style></style>
