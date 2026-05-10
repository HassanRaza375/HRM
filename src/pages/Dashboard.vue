<template>
  <v-row>
    <v-col v-for="(item, index) in stats" :key="index" cols="12" sm="6" md="4">
      <v-card class="pa-4 d-flex align-center justify-space-between" hover>
        <!-- Left Content -->
        <div>
          <div class="text-subtitle-2 text-grey">
            {{ item.title }}
          </div>
          <div class="text-h5 font-weight-bold">
            {{ item.value }}
          </div>
        </div>

        <!-- Icon -->
        <v-avatar :color="item.color" size="40">
          <v-icon color="white">{{ item.icon }}</v-icon>
        </v-avatar>
      </v-card>
    </v-col>
    <!-- New Hiring -->
    <!-- <v-col cols="6">
      <NewHiringCard :count="12" />
    </v-col> -->
    <!-- Quick Actions -->
    <v-col cols="12">
      <v-card class="pa-4 mt-4">
        <div class="text-h6 mb-3">Quick Actions</div>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-btn block color="primary" prepend-icon="mdi-account-plus" @click="goToAddEmployee">
              Add Employee
            </v-btn>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-btn block color="secondary" prepend-icon="mdi-file-plus" @click="goToCreateTemplate">
              Create Template
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <!-- Growth Chart -->
    <v-col cols="12" md="8">
      <EmployeeGrowthChart
        :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
        :data="EmployeeGrowthByYear" />
    </v-col>
    <!-- Gender Ratio -->
    <v-col cols="12" md="4">
      <GenderRatioChart :MaleFemaleRatio="EmployeesRatio" />
    </v-col>

    <!-- table -->
    <v-col cols="12">
      <div class="text-h6 mb-3">Employees Latest</div>
      <DataTables :headers="headers" :items="employees" :PageName="PageName" :actionsToShow="actionsToShow" />
    </v-col>
  </v-row>
</template>

<script setup>
import { useRouter } from "vue-router";
import DataTables from "../components/ui/DataTables.vue";
import EmployeeGrowthChart from "../components/charts/EmployeeGrowthChart.vue";
import GenderRatioChart from "../components/charts/GenderRatioChart.vue";
import NewHiringCard from "../components/charts/NewHiringCard.vue";
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "../stores/employeeStore";

const router = useRouter();
const employeeStore = useEmployeeStore();
const employees = ref([]);
const PageName = "Dashboard";
const actionsToShow = {
  view: false,
  edit: false,
  delete: false,
  addNew: false,
};
const goToAddEmployee = () => {
  router.push("/employees/create");
};

const goToCreateTemplate = () => {
  router.push("/templates/create");
};
const stats = ref([
  {
    title: "Total Employees",
    value: 0,
    icon: "mdi-account-group",
    color: "primary",
  },
  {
    title: "Active Employees",
    value: 0,
    icon: "mdi-account-check",
    color: "success",
  },
  {
    title: "Total Templates",
    value: 0,
    icon: "mdi-file-document",
    color: "info",
  },
]);

const headers = [
  { title: "#", key: "number" },
  { title: "Employee ID", key: "employeeid" },
  { title: "Name", key: "name" },
  { title: "Designation", key: "designation" },
  { title: "Department", key: "department" },
  { title: "Reporting Line", key: "reportingLine" },
];
const EmployeesRatio = ref({
  Male: 0,
  Female: 0,
})
const EmployeeGrowthByYear = ref([])
onMounted(() => {
  if (employeeStore.$state.employees.length > 0) {
    employees.value = [...employeeStore.$state.employees]
      .reverse()
      .map((emp, index) => ({
        number: index + 1,
        ...emp,
      }));
    stats.value = stats.value.map((stat) => {
      if (stat.title === "Total Employees") {
        return { ...stat, value: employeeStore.$state.employees.length };
      }
      if (stat.title === "Active Employees") {
        return {
          ...stat,
          value: employeeStore.$state.employees.filter(
            (e) => e.status === "active",
          ).length,
        };
      }
      if (stat.title === "Total Templates") {
        return { ...stat, value: employeeStore.$state.templates.length };
      }
      return stat;
    });
    EmployeeGrowthByYear.value = employeeStore.$state.employees.reduce(
      (acc, emp) => {
        if (!emp.doj) return acc;

        const month = new Date(emp.doj).getMonth();

        if (month >= 0 && month <= 11) {
          acc[month] += 1;
        }

        return acc;
      },
      Array(12).fill(0)
    );
    EmployeesRatio.value = employeeStore.$state.employees.reduce((acc, emp) => {
      if (emp.gender === "male") {
        acc.Male++;
      } else {
        acc.Female++;
      }
      return acc;
    }, { Male: 0, Female: 0 });
  }
});
</script>

<style></style>
