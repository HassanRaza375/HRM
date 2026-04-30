<template>
  <v-card class="pa-4 employee--growth">
    <div class="text-h6 mb-3">Employee Growth</div>
    <canvas ref="chartRef"></canvas>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  labels: Array,
  data: Array,
});

const chartRef = ref(null);

onMounted(() => {
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
          tension: 0.4,
        },
      ],
    },
  });
});
</script>
<style scoped>
.employee--growth {
  height: 100%;
}
</style>
