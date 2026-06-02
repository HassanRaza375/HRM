<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div class="d-flex align-center ga-2 justify-space-between">
            <h1 class="text-title-large font-weight-bold">Leave Request</h1>
            <div>
              <v-btn class="rounded-0" @click="goBack" prepend-icon="mdi-arrow-left" color="grey-lighten-1">Back</v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div>Anual Leaves</div>
          <div>Casual Leaves</div>
          <div>Sick Leaves</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <DataTables :headers="headers" :items="employees" :itemsPerPageOptions="itemsPerPageOptions"
        PageName="Employees Leaves" />
    </v-col>
  </v-row>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "../../stores/employeeStore";
import DataTables from "../../components/ui/DataTables.vue";
const itemsPerPageOptions = [10, 20, 30];
const headers = [
  { title: "Employee ID", key: "employeeid" },
  { title: "Name", key: "name" },
  { title: "Designation", key: "designation" },
  { title: "Department", key: "department" },
  { title: "Actions", key: "actions", sortable: false },
];

const router = useRouter();
const employees = ref([]);
const employeeStore = useEmployeeStore();
const LoadData = () => {
  employees.value = employeeStore.employees;
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  LoadData();
});
</script>

<style scoped></style>
