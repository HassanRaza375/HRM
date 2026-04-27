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
    <v-col cols="12">
      <v-card class="pa-4 mt-4">
        <div class="text-h6 mb-3">Quick Actions</div>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-btn
              block
              color="primary"
              prepend-icon="mdi-account-plus"
              @click="goToAddEmployee"
            >
              Add Employee
            </v-btn>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-btn
              block
              color="secondary"
              prepend-icon="mdi-file-plus"
              @click="goToCreateTemplate"
            >
              Create Template
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <!-- table -->
    <v-col cols="12">
      <div class="text-h6 mb-3">Employees Latest</div>
      <DataTables :headers="headers" :items="employees" />
    </v-col>
  </v-row>
</template>

<script setup>
import { useRouter } from "vue-router";
import DataTables from "../components/ui/DataTables.vue";
const router = useRouter();

const goToAddEmployee = () => {
  router.push("/employees/create");
};

const goToCreateTemplate = () => {
  router.push("/templates/create");
};
const stats = [
  {
    title: "Total Employees",
    value: 120,
    icon: "mdi-account-group",
    color: "primary",
  },
  {
    title: "Active Employees",
    value: 95,
    icon: "mdi-account-check",
    color: "success",
  },
  {
    title: "Total Templates",
    value: 30,
    icon: "mdi-file-document",
    color: "info",
  },
];

const headers = [
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Role", key: "role" },
  { title: "Status", key: "status" },
];

const employees = [
  { name: "Ali", email: "ali@test.com", role: "Admin", status: "Active" },
  { name: "Ahmed", email: "ahmed@test.com", role: "User", status: "Inactive" },
];
</script>

<style></style>
