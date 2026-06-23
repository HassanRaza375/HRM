<!-- src/pages/employees/leaves/LeaveDetail.vue -->
<template>
  <v-container>
    <!-- Header -->
    <v-card class="mb-4">
      <v-card-text class="d-flex align-center justify-space-between">
        <div>
          <h1 class="text-h5 font-weight-bold">{{ record?.name || "Unknown" }}</h1>
          <div class="text-medium-emphasis">
            {{ record?.employeeid }} · {{ record?.department }} · {{ record?.year }}
          </div>
        </div>
        <div class="d-flex ga-2">
          <v-btn
            v-if="record"
            color="info"
            prepend-icon="mdi-pencil"
            @click="editDialog = true"
          >
            Edit
          </v-btn>
          <v-btn prepend-icon="mdi-arrow-left" @click="router.push('/employees/leaves')">
            Back
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Not found -->
    <v-alert v-if="!record" type="warning" variant="tonal">
      No leave record found for this employee.
    </v-alert>

    <template v-else>
      <!-- Leave-type cards -->
      <v-row>
        <v-col v-for="t in types" :key="t.key" cols="12" md="4">
          <v-card>
            <v-card-text>
              <div class="d-flex align-center justify-space-between mb-2">
                <span class="text-subtitle-1 font-weight-medium">{{ t.label }}</span>
                <span class="text-h6 text-primary">{{ record[t.key].balance }}</span>
              </div>
              <v-progress-linear
                :model-value="usedPercent(record[t.key])"
                :color="t.color"
                height="10"
                rounded
              />
              <div class="d-flex justify-space-between mt-2 text-caption">
                <span>Used: {{ record[t.key].used }}</span>
                <span>Total: {{ record[t.key].total }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Total remaining -->
      <v-row>
        <v-col cols="12">
          <v-card color="primary" variant="tonal">
            <v-card-text class="d-flex align-center justify-space-between">
              <span class="text-subtitle-1">Total Remaining</span>
              <span class="text-h4 font-weight-bold">{{ record.totalRemaining }}</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <LeaveEditDialog v-model="editDialog" :record="record" @save="onSaveEdit" />
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useEmployeeStore } from "../../../stores/employeeStore.js";
import LeaveEditDialog from "../../../components/ui/LeaveEditDialog.vue";

const route = useRoute();
const router = useRouter();
const employeeStore = useEmployeeStore();

const record = ref(null);
const editDialog = ref(false);

const types = [
  { key: "casual", label: "Casual", color: "blue" },
  { key: "sick", label: "Sick", color: "deep-orange" },
  { key: "annual", label: "Annual", color: "green" },
];

const usedPercent = (leave) =>
  leave.total ? Math.min(100, (leave.used / leave.total) * 100) : 0;

const loadData = () => {
  employeeStore.loadLeaves();
  const found = employeeStore.getLeaveByEmployeeId(route.params.employeeid);
  record.value = found ? JSON.parse(JSON.stringify(found)) : null;
};

const onSaveEdit = (updated) => {
  employeeStore.updateLeave(updated);
  loadData();
  editDialog.value = false;
  employeeStore.callNotification({ text: "Leave record updated", color: "success" });
};

onMounted(loadData);
</script>

<style scoped>
.ga-2 {
  gap: 8px;
}
</style>
