<template>
  <div class="pa-4">
    <!-- Top Bar -->
    <div class="d-flex justify-space-between align-center mb-3">
      <!-- Column Toggle -->
      <div class="d-flex align-center gap-2">
        <v-menu v-model="menu" :close-on-content-click="false">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon="mdi-tune"></v-btn>
          </template>

          <v-sheet class="pa-2 pt-3 column-menu">
            <div class="menu-container">
              <div class="menu-content">
                <v-list class="py-0">
                  <v-list-item
                    v-for="header in headers"
                    :key="header.key"
                    class="px-0 py-0"
                  >
                    <v-checkbox
                      v-model="tempColumns"
                      :label="header.title"
                      :value="header.key"
                      hide-details
                    />
                  </v-list-item>
                </v-list>
              </div>

              <div class="menu-footer">
                <v-btn variant="text" @click="onCancel">Cancel</v-btn>
                <v-btn color="primary" @click="onSave">Save</v-btn>
              </div>
            </div>
          </v-sheet>
        </v-menu>

        <h2 class="table--title">{{ PageName }}</h2>
      </div>

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

    <v-data-table
      :headers="computedHeaders"
      :items="filteredItems"
      :items-per-page="itemsPerPage"
      v-model:page="page"
      class="elevation-1"
    >
      <template v-if="hasActions" #item.actions="{ item }">
        <v-btn icon size="small">
          <v-icon>mdi-eye</v-icon>
        </v-btn>

        <v-btn icon size="small">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn icon size="small" color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  headers: Array,
  items: Array,
  PageName: String,
  itemsPerPageOptions: {
    type: Array,
    default: () => [10, 20, 30],
  },
});

// Search + Pagination
const search = ref("");
const page = ref(1);
const itemsPerPage = ref(props.itemsPerPageOptions[0]);
// Menu
const menu = ref(false);

// Visible columns
const visibleColumns = ref(props.headers.map((h) => h.key));
const tempColumns = ref([...visibleColumns.value]);

watch(menu, (val) => {
  if (val) tempColumns.value = [...visibleColumns.value];
});

watch(
  () => props.headers,
  (newHeaders) => {
    visibleColumns.value = newHeaders.map((h) => h.key);
  },
);

// Actions column ALWAYS included
const computedHeaders = computed(() => {
  return props.headers.filter((h) => visibleColumns.value.includes(h.key));
});
const hasActions = computed(() =>
  props.headers.some((h) => h.key === "actions"),
);
// Menu actions
const onCancel = () => {
  tempColumns.value = [...visibleColumns.value];
  menu.value = false;
};

const onSave = () => {
  if (!tempColumns.value.length) return;
  visibleColumns.value = [...tempColumns.value];
  menu.value = false;
};

// Search filter
const filteredItems = computed(() => {
  if (!search.value) return props.items;

  return props.items.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(search.value.toLowerCase()),
    ),
  );
});

watch(search, () => {
  page.value = 1;
});
</script>

<style scoped>
.table--title {
  font-size: 24px;
  font-weight: 500;
  margin-left: 10px;
}

.column-menu {
  width: 250px;
}

.menu-container {
  display: flex;
  flex-direction: column;
  max-height: 65vh;
}

.menu-content {
  overflow-y: auto;
  flex: 1;
}

.menu-footer {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-top: 1px solid #eee;
}
</style>
