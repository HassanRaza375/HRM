<template>
  <v-card class="pa-4">
    <!-- Top Bar -->
    <div class="d-flex justify-space-between align-center mb-3">
      <!-- Column Toggle -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon="mdi-view-column"></v-btn>
        </template>

        <v-list>
          <v-list-item v-for="header in headers" :key="header.key">
            <v-checkbox
              v-model="visibleColumns"
              :label="header.title"
              :value="header.key"
              hide-details
            />
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- Search -->
      <v-text-field
        v-model="search"
        label="Search"
        density="compact"
        prepend-inner-icon="mdi-magnify"
        hide-details
        style="max-width: 250px"
      />
    </div>

    <!-- Table -->
    <v-table>
      <thead>
        <tr>
          <th v-for="header in filteredHeaders" :key="header.key">
            {{ header.title }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in paginatedItems" :key="index">
          <td v-for="header in filteredHeaders" :key="header.key">
            {{ item[header.key] }}
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination -->
    <div class="d-flex justify-space-between align-center mt-4">
      <!-- Rows per page -->
      <v-select
        v-model="itemsPerPage"
        :items="[10, 20, 30]"
        label="Rows"
        density="compact"
        hide-details
        style="max-width: 100px"
      />

      <!-- Page Navigation -->
      <v-pagination v-model="page" :length="totalPages" />
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  headers: Array,
  items: Array,
});

const search = ref("");
const page = ref(1);
const itemsPerPage = ref(10);

// Column visibility
const visibleColumns = ref(props.headers.map((h) => h.key));

watch(
  () => props.headers,
  (newHeaders) => {
    visibleColumns.value = newHeaders.map((h) => h.key);
  },
);

// Filtered headers
const filteredHeaders = computed(() => {
  return props.headers.filter((h) => visibleColumns.value.includes(h.key));
});

// 🔍 Search filter
const filteredItems = computed(() => {
  if (!search.value) return props.items;

  return props.items.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(search.value.toLowerCase()),
    ),
  );
});

// 📄 Pagination logic
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value);
});

const paginatedItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredItems.value.slice(start, end);
});

// Reset page when search changes
watch(search, () => {
  page.value = 1;
});
</script>
