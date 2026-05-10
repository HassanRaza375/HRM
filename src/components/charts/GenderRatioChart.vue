<template>
  <v-card class="pa-4 gender--ratio">
    <div class="text-h6 mb-3">Gender Ratio</div>
    <canvas ref="chartRef"></canvas>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  EmployeesRatio: {
    type: Object,
    default: () => ({
      male: 1,
      female: 1,
    }),
  },
});

const chartRef = ref(null);

onMounted(() => {
  new Chart(chartRef.value, {
    type: "doughnut",
    data: {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [props.EmployeesRatio.male, props.EmployeesRatio.female],
          backgroundColor: ["#2a9fe8", "#014e78"],
        },
      ],
    },
  });
});
</script>
<style scoped>
.gender--ratio {
  height: 100%;
}
</style>
