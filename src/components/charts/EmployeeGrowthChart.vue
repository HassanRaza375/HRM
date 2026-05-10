<template>
  <v-card class="pa-4 employee--growth d-flex flex-column">
    <div class="text-h6 mb-3">Employee Growth</div>

    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>
  </v-card>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  labels: Array,
  data: Array,
});

const chartRef = ref(null);

onMounted(async () => {
  await nextTick();

  new Chart(chartRef.value, {
    type: "line",
    data: {
      labels: props.labels,
      datasets: [
        {
          label: "Employees",
          data: props.data,
          borderColor: "#2a9fe8",
          backgroundColor: "rgba(42,159,232,0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
});
</script>

<style scoped>
.employee--growth {
  height: 100%;
  min-height: 400px;
}

.chart-container {
  position: relative;
  flex: 1;
  width: 100%;
}
</style>