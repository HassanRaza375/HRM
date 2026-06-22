<template>
    <div>
        <DataTables :headers="headers" :items="salarySlips" :itemsPerPageOptions="itemsPerPageOptions"
            @delete="onDelete" @edit="onEdit" @view="onView" @addNew="onAddNew" PageName="Salary Slip" />
        <ConfirmDialog v-model="deleteDialog" title="Confirm Delete"
            message="Are you sure you want to delete this salary slip?" @confirm="confirmDelete" />
        <!-- View Dialog -->
        <SalaryModel v-model="dialog" :selectedRow="selectedRow" />
    </div>
</template>

<script setup>
import DataTables from "../../../components/ui/DataTables.vue";
import ConfirmDialog from "../../../components/ui/ConfirmDialog.vue";
import SalaryModel from "../../../components/ui/salaryModel.vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "../../../stores/employeeStore";

const itemsPerPageOptions = [10, 20, 30];
const headers = [
    { title: "Slip ID", key: "id" },
    { title: "Employee ID", key: "employeeid" },
    { title: "Name", key: "name" },
    { title: "Designation", key: "designation" },
    { title: "Department", key: "department" },
    { title: "Actions", key: "actions", sortable: false },
];

const salarySlips = ref([]);
const employeeStore = useEmployeeStore();
const router = useRouter();
const dialog = ref(false);
const deleteDialog = ref(false);
const selectedRow = ref({});

// Flatten every employee's slips into a single list for the table
const LoadData = () => {
    salarySlips.value = employeeStore.employees.flatMap((emp) =>
        (emp.salarySlips || []).map((slip) => ({
            ...slip,
            // ensure these are present even if the slip didn't store them
            employeeid: emp.employeeid,
            name: emp.name,
            designation: emp.designation,
            department: emp.department,
        }))
    );
};

const onEdit = (e) => {
    // form needs BOTH the slip id and the employee id to locate the slip
    router.push(
        `/employees/salary-slip/form?id=${e.id}&employeeid=${e.employeeid}`
    );
};

const onDelete = (e) => {
    selectedRow.value = e;
    deleteDialog.value = true;
};

const confirmDelete = () => {
    employeeStore.deleteSalarySlip(
        selectedRow.value.employeeid,
        selectedRow.value.id
    );
    deleteDialog.value = false;
    LoadData();
};

const onView = (e) => {
    selectedRow.value = e;
    dialog.value = true;
};

const onAddNew = () => {
    router.push("/employees/salary-slip/form");
};

onMounted(() => {
    LoadData();
});
</script>

<style></style>