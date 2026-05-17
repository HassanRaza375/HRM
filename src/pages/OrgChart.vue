<template>
  <v-container>
    <v-card class="pa-4">
      <h2 class="mb-4">Company Organogram</h2>

      <v-treeview
        :items="employees"
        item-title="name"
        item-value="id"
        open-all
        activatable
      >
        <template v-slot:prepend="{ item }">
          <v-avatar color="primary" size="32">
            <span class="text-white">
              {{ item.name.charAt(0) }}
            </span>
          </v-avatar>
        </template>

        <template v-slot:title="{ item }">
          <div>
            <strong>{{ item.name }}</strong>
            <div class="text-caption text-grey">
              {{ item.designation }}
            </div>
          </div>
        </template>
      </v-treeview>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "../stores/employeeStore";

const employstore = useEmployeeStore();
const employees = ref([]);

const buildOrganoObj = (data) => {
  // CEO ROOT
  const ceo = {
    id: "sat-ceo-1",
    name: "Sarmad",
    designation: "CEO",
    children: [],
  };

  // create map
  const map = {};

  // first pass
  data.forEach((emp) => {
    map[emp.name] = {
      id: emp.id,
      name: emp.name,
      designation: emp.role,
      reportingline: emp.reportingline,
      children: [],
    };
  });

  // second pass
  data.forEach((emp) => {
    const employeeNode = map[emp.name];

    // if reports to CEO
    if (emp.reportingline?.toLowerCase() === "CEO") {
      ceo.children.push(employeeNode);
    } else {
      // reports to another employee
      const manager = map[emp.reportingline];

      if (manager) {
        manager.children.push(employeeNode);
      } else {
        // fallback if manager not found
        ceo.children.push(employeeNode);
      }
    }
  });

  employees.value = [ceo];
};

onMounted(() => {
  buildOrganoObj(employstore.getOrganogram());
});
</script>
