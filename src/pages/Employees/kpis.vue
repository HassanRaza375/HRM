<template>
  <v-row>
    <v-col cols="12">
      <v-card class="kpi-hero" color="primary" theme="dark">
        <v-card-text class="d-flex align-center justify-space-between flex-wrap ga-4 pa-6">
          <div>
            <div class="text-overline opacity-80">Performance workspace</div>
            <div class="text-h4 font-weight-bold">KPI Library</div>
            <div class="text-body-1 opacity-90">Create the shared measures behind fair, consistent employee reviews.</div>
          </div>
          <div class="d-flex align-center ga-4">
            <div class="text-right"><div class="text-h5 font-weight-bold">{{ activeCount }}</div><div class="text-caption">active KPIs</div></div>
            <v-btn color="white" variant="flat" prepend-icon="mdi-plus" @click="openForm()">Add KPI</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="5">
      <v-text-field v-model="search" label="Search KPIs" prepend-inner-icon="mdi-magnify" variant="outlined" density="compact" hide-details />
    </v-col>
    <v-col cols="12" md="3">
      <v-select v-model="departmentFilter" :items="departments" label="Department" variant="outlined" density="compact" hide-details clearable />
    </v-col>
    <v-col cols="12" md="4">
      <v-select v-model="statusFilter" :items="['Active', 'Inactive']" label="Status" variant="outlined" density="compact" hide-details clearable />
    </v-col>

    <v-col cols="12">
      <v-card>
        <v-card-text class="pb-0 d-flex align-center justify-space-between"><span class="text-subtitle-1 font-weight-medium">{{ filteredKpis.length }} KPI{{ filteredKpis.length === 1 ? '' : 's' }}</span><span class="text-caption text-medium-emphasis">Changes apply to future reviews only.</span></v-card-text>
        <v-data-table :headers="headers" :items="filteredKpis" :items-per-page="10">
          <template #item.target="{ item }">{{ item.target }} {{ item.unit }}</template>
          <template #item.weight="{ item }">{{ item.weight }}%</template>
          <template #item.status="{ item }"><v-chip :color="item.status === 'Active' ? 'success' : 'grey'" size="small">{{ item.status }}</v-chip></template>
          <template #item.actions="{ item }">
            <v-btn icon="mdi-pencil" variant="text" size="small" color="primary" @click="openForm(item)" />
            <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error" @click="remove(item)" />
          </template>
          <template #no-data><div class="pa-8 text-center text-medium-emphasis">No KPIs yet. Add a KPI to start building review scorecards.</div></template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog" max-width="720" persistent>
    <v-card>
      <v-card-title class="pa-6 pb-2">{{ form.id ? 'Edit KPI' : 'Add KPI' }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12"><v-text-field v-model="form.name" label="KPI name" variant="outlined" :rules="[required]" /></v-col>
          <v-col cols="12"><v-textarea v-model="form.description" label="Description / measurement guidance" variant="outlined" rows="2" /></v-col>
          <v-col cols="12" md="6"><v-select v-model="form.department" :items="departments" label="Department" variant="outlined" clearable hint="Leave blank to make company-wide" persistent-hint /></v-col>
          <v-col cols="12" md="6"><v-text-field v-model="form.role" label="Role or designation" variant="outlined" /></v-col>
          <v-col cols="12" md="4"><v-text-field v-model.number="form.target" type="number" label="Target" variant="outlined" :rules="[required]" /></v-col>
          <v-col cols="12" md="4"><v-select v-model="form.unit" :items="['%', 'Number', 'Currency', 'Days', 'Rating']" label="Unit" variant="outlined" /></v-col>
          <v-col cols="12" md="4"><v-text-field v-model.number="form.weight" type="number" min="1" max="100" label="Weight (%)" variant="outlined" :rules="[required]" /></v-col>
          <v-col cols="12" md="6"><v-select v-model="form.frequency" :items="['Monthly', 'Quarterly', 'Biannual', 'Annual']" label="Review frequency" variant="outlined" /></v-col>
          <v-col cols="12" md="6"><v-select v-model="form.status" :items="['Active', 'Inactive']" label="Status" variant="outlined" /></v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pa-6 pt-2"><v-spacer /><v-btn @click="dialog = false">Cancel</v-btn><v-btn color="primary" :disabled="!isValid" @click="save">Save KPI</v-btn></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useEmployeeStore } from '../../stores/employeeStore';

const employeeStore = useEmployeeStore();
const dialog = ref(false); const search = ref(''); const departmentFilter = ref(null); const statusFilter = ref(null);
const blank = () => ({ id: '', name: '', description: '', department: '', role: '', target: null, unit: '%', weight: 100, frequency: 'Quarterly', status: 'Active' });
const form = ref(blank());
const headers = [{ title: 'KPI', key: 'name' }, { title: 'Department', key: 'department' }, { title: 'Role', key: 'role' }, { title: 'Target', key: 'target' }, { title: 'Weight', key: 'weight' }, { title: 'Frequency', key: 'frequency' }, { title: 'Status', key: 'status' }, { title: 'Actions', key: 'actions', sortable: false }];
const departments = computed(() => [...new Set(employeeStore.employees.map(e => e.department).filter(Boolean))].sort());
const filteredKpis = computed(() => employeeStore.kpis.filter(kpi => (!search.value || Object.values(kpi).some(v => String(v).toLowerCase().includes(search.value.toLowerCase()))) && (!departmentFilter.value || kpi.department === departmentFilter.value) && (!statusFilter.value || kpi.status === statusFilter.value)));
const activeCount = computed(() => employeeStore.kpis.filter(kpi => kpi.status === 'Active').length);
const isValid = computed(() => Boolean(form.value.name?.trim()) && form.value.target !== null && Number(form.value.weight) > 0 && Number(form.value.weight) <= 100);
const required = value => value === 0 || !!value || 'Field is required';
const openForm = (kpi) => { form.value = kpi ? { ...kpi } : blank(); dialog.value = true; };
const save = () => {
  if (!isValid.value) return;
  form.value.id ? employeeStore.updateKpi(form.value) : employeeStore.addKpi(form.value);
  employeeStore.callNotification({ text: 'KPI saved', color: 'success' }); dialog.value = false;
};
const remove = (kpi) => { if (window.confirm(`Delete “${kpi.name}”? Existing review snapshots will be retained.`)) { employeeStore.deleteKpi(kpi.id); employeeStore.callNotification({ text: 'KPI deleted', color: 'success' }); } };
onMounted(() => employeeStore.load());
</script>

<style scoped>
.kpi-hero { background: linear-gradient(120deg, rgb(var(--v-theme-primary)) 0%, #6558c7 100%); }
</style>
