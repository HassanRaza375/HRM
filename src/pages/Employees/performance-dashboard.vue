<template>
  <v-row>
    <v-col cols="12">
      <v-card class="overview-hero" color="primary" theme="dark">
        <v-card-text class="pa-6 d-flex align-center justify-space-between flex-wrap ga-4">
          <div>
            <div class="text-overline opacity-80">Performance workspace</div>
            <h1 class="text-h4 font-weight-bold mb-1">Performance overview</h1>
            <div class="text-body-1 opacity-90">A quick view of review progress and performance across the organisation.</div>
          </div>
          <v-btn color="white" variant="flat" prepend-icon="mdi-clipboard-plus-outline" to="/employees/employees-performance">Manage reviews</v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col v-for="metric in metrics" :key="metric.label" cols="12" sm="6" lg="3">
      <v-card class="metric-card h-100" variant="outlined">
        <v-card-text class="d-flex align-center ga-4">
          <v-avatar :color="metric.color" variant="tonal" size="48"><v-icon :icon="metric.icon" /></v-avatar>
          <div><div class="text-h5 font-weight-bold">{{ metric.value }}</div><div class="text-body-2 text-medium-emphasis">{{ metric.label }}</div></div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="7">
      <v-card class="h-100">
        <v-card-title class="pt-5 px-5">Department performance</v-card-title>
        <v-card-subtitle>Average score from completed reviews.</v-card-subtitle>
        <v-card-text>
          <v-table v-if="departmentSummary.length" density="comfortable">
            <thead><tr><th>Department</th><th>Completed reviews</th><th>Average score</th><th>Rating</th></tr></thead>
            <tbody><tr v-for="department in departmentSummary" :key="department.name"><td class="font-weight-medium">{{ department.name }}</td><td>{{ department.count }}</td><td style="min-width: 180px"><div class="d-flex align-center ga-3"><v-progress-linear :model-value="department.score" :color="ratingColor(ratingFor(department.score))" height="8" rounded /><span>{{ department.score }}%</span></div></td><td><v-chip size="small" :color="ratingColor(ratingFor(department.score))">{{ ratingFor(department.score) }}</v-chip></td></tr></tbody>
          </v-table>
          <div v-else class="empty-panel"><v-icon size="38" color="primary" icon="mdi-chart-box-outline" /><div class="font-weight-medium mt-3">No completed reviews yet</div><div class="text-body-2 text-medium-emphasis">Complete a review to see department insights here.</div></div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="5">
      <v-card class="h-100">
        <v-card-title class="pt-5 px-5">Recent reviews</v-card-title>
        <v-card-subtitle>Most recently created or updated review records.</v-card-subtitle>
        <v-list v-if="recentReviews" lines="two" class="pb-2">
          <v-list-item v-for="review in recentReviews" :key="review.id" :title="review.employeeName" :subtitle="`${review.period} · ${review.department || 'No department'}`" :to="`/employees/performance/${review.id}`">
            <template #prepend><v-avatar color="primary" variant="tonal">{{ initials(review.employeeName) }}</v-avatar></template>
            <template #append><div class="text-right"><v-chip size="x-small" :color="review.status === 'Completed' ? 'success' : 'warning'">{{ review.status }}</v-chip><div class="text-caption mt-1">{{ review.score }}%</div></div></template>
          </v-list-item>
        </v-list>
        <div v-else class="empty-panel"><v-icon size="38" color="primary" icon="mdi-clipboard-text-outline" /><div class="font-weight-medium mt-3">No reviews yet</div><v-btn class="mt-3" size="small" color="primary" to="/employees/employees-performance">Create first review</v-btn></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useEmployeeStore } from '../../stores/employeeStore';

const employeeStore = useEmployeeStore();
const completedReviews = computed(() => employeeStore.performanceReviews.filter(review => review.status === 'Completed'));
const averageScore = computed(() => completedReviews.value.length ? Math.round(completedReviews.value.reduce((total, review) => total + Number(review.score || 0), 0) / completedReviews.value.length) : 0);
const departmentSummary = computed(() => Object.values(completedReviews.value.reduce((summary, review) => {
  const name = review.department || 'Unassigned';
  if (!summary[name]) summary[name] = { name, count: 0, total: 0 };
  summary[name].count += 1; summary[name].total += Number(review.score || 0);
  return summary;
}, {})).map(item => ({ ...item, score: Math.round(item.total / item.count) })).sort((a, b) => b.score - a.score));
const recentReviews = computed(() => employeeStore.performanceReviews.slice().reverse().slice(0, 5));
const metrics = computed(() => [
  { label: 'Active KPIs', value: employeeStore.kpis.filter(kpi => kpi.status === 'Active').length, icon: 'mdi-target', color: 'primary' },
  { label: 'Completed reviews', value: completedReviews.value.length, icon: 'mdi-check-decagram-outline', color: 'success' },
  { label: 'Draft reviews', value: employeeStore.performanceReviews.filter(review => review.status === 'Draft').length, icon: 'mdi-file-document-edit-outline', color: 'warning' },
  { label: 'Average score', value: `${averageScore.value}%`, icon: 'mdi-chart-line', color: 'info' },
]);
const ratingFor = score => score >= 90 ? 'Outstanding' : score >= 75 ? 'Exceeds expectations' : score >= 60 ? 'Meets expectations' : score >= 40 ? 'Needs improvement' : 'Unsatisfactory';
const ratingColor = rating => ({ Outstanding: 'success', 'Exceeds expectations': 'primary', 'Meets expectations': 'info', 'Needs improvement': 'warning', Unsatisfactory: 'error' }[rating]);
const initials = name => (name || '?').split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
onMounted(() => employeeStore.load());
</script>

<style scoped>
.overview-hero { background: linear-gradient(120deg, rgb(var(--v-theme-primary)), #6558c7); }
.metric-card { border-color: rgba(var(--v-theme-on-surface), .10); }
.empty-panel { min-height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
</style>
