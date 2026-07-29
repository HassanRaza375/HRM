<template>
  <v-row v-if="review">
    <v-col cols="12"><v-btn variant="text" prepend-icon="mdi-arrow-left" to="/employees/employees-performance">Back to reviews</v-btn></v-col>
    <v-col cols="12">
      <v-card class="detail-hero" color="primary" theme="dark"><v-card-text class="pa-6 d-flex align-center justify-space-between flex-wrap ga-4"><div><div class="text-overline opacity-80">{{ review.period }} review</div><h1 class="text-h4 font-weight-bold mb-1">{{ review.employeeName }}</h1><div class="opacity-90">{{ review.designation || 'No designation' }} · {{ review.department || 'No department' }}</div></div><div class="d-flex align-center ga-3"><v-chip :color="review.status === 'Completed' ? 'success' : 'warning'" size="large">{{ review.status }}</v-chip><v-btn color="white" variant="flat" prepend-icon="mdi-pencil" @click="editReview">Edit review</v-btn></div></v-card-text></v-card>
    </v-col>
    <v-col cols="12" md="4"><v-card class="h-100"><v-card-text class="pa-5"><div class="text-caption text-medium-emphasis">WEIGHTED SCORE</div><div class="text-h2 font-weight-bold mt-2">{{ review.score }}%</div><v-progress-linear :model-value="review.score" :color="ratingColor(review.rating)" height="10" rounded class="my-4" /><v-chip :color="ratingColor(review.rating)" size="large">{{ review.rating }}</v-chip></v-card-text></v-card></v-col>
    <v-col cols="12" md="8"><v-card class="h-100"><v-card-title class="pt-5 px-5">Manager comments</v-card-title><v-card-text class="text-body-1">{{ review.managerComments || 'No manager comments have been recorded for this review.' }}</v-card-text></v-card></v-col>
    <v-col cols="12"><v-card><v-card-title class="pt-5 px-5">KPI scorecard</v-card-title><v-card-subtitle>Targets and scores captured for this review period.</v-card-subtitle><v-card-text><v-table><thead><tr><th>KPI</th><th>Target</th><th>Actual result</th><th>Weight</th><th>Score</th></tr></thead><tbody><tr v-for="item in review.items" :key="item.kpiId"><td><div class="font-weight-medium">{{ item.name }}</div><div class="text-caption text-medium-emphasis">{{ item.description }}</div></td><td>{{ item.target }} {{ item.unit }}</td><td>{{ item.actual || '—' }}</td><td>{{ item.weight }}%</td><td><v-chip size="small" :color="scoreColor(item.score)">{{ item.score || 0 }}%</v-chip></td></tr></tbody></v-table></v-card-text></v-card></v-col>
  </v-row>
  <v-row v-else><v-col cols="12"><v-alert type="warning" title="Review not found">This review may have been deleted. <v-btn variant="text" to="/employees/employees-performance">Return to reviews</v-btn></v-alert></v-col></v-row>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEmployeeStore } from '../../stores/employeeStore';

const route = useRoute(); const router = useRouter(); const employeeStore = useEmployeeStore();
const review = computed(() => employeeStore.performanceReviews.find(item => item.id === route.params.id));
const ratingColor = rating => ({ Outstanding: 'success', 'Exceeds expectations': 'primary', 'Meets expectations': 'info', 'Needs improvement': 'warning', Unsatisfactory: 'error' }[rating] || 'grey');
const scoreColor = score => score >= 75 ? 'success' : score >= 60 ? 'info' : score >= 40 ? 'warning' : 'error';
const editReview = () => router.push({ path: '/employees/employees-performance', query: { review: review.value.id } });
onMounted(() => employeeStore.load());
</script>

<style scoped>
.detail-hero { background: linear-gradient(120deg, rgb(var(--v-theme-primary)), #6558c7); }
</style>
