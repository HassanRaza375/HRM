<template>
  <v-card class="pa-4">
    <div class="text-h6 mb-3">Gender Ratio</div>
    <canvas ref="chartRef"></canvas>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  male: Number,
  female: Number,
});

const chartRef = ref(null);

onMounted(() => {
  new Chart(chartRef.value, {
    type: "doughnut",
    data: {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [props.male, props.female],
          backgroundColor: ["#2a9fe8", "#014e78"],
        },
      ],
    },
  });
});
</script>