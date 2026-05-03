<template>
  <v-card class="rounded-2">
    <v-card-item>
      <div class="d-flex justify-space-between align-center mb-3 flex-wrap">
        <!-- Column Toggle -->
        <div class="d-flex align-center gap-2">
          <v-menu v-model="menu" :close-on-content-click="false">
            <template #activator="{ props }">
              <v-btn  v-bind="props" variant="text" icon="mdi-tune"></v-btn>
            </template>

            <v-sheet class="pa-2 pt-3 column-menu">
              <div class="menu-container">
                <div class="menu-content">
                  <v-list class="py-0">
                    <v-list-item v-for="header in headers" :key="header.key" class="px-0 py-0">
                      <v-checkbox v-model="tempColumns" :label="header.title" :value="header.key" hide-details />
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
        <div class="d-flex align-center justify-end gap-2 flex-wrap">
          <!-- Search -->
          <v-text-field class="w-100" v-model="search" label="Search" variant="underlined" density="compact" prepend-inner-icon="mdi-magnify"
            hide-details style="max-width: 250px;min-width: 250px;" />
          <v-btn class="rounded-0" color="success" prepend-icon="mdi-plus" @click="onAddNew">{{ PageName }}</v-btn>
          <!-- Extra Actions -->
          <TableAction :items="items" @actionType="actionType" />
        </div>
      </div>

      <v-data-table :headers="computedHeaders" :items="filteredItems" :items-per-page="itemsPerPage"
        v-model:page="page">
        <template v-if="hasActions" #item.actions="{ item }">
          <div class="d-flex items-center gap-2">
            <v-icon @click="onView(item)" color="blue-lighten-1">mdi-eye</v-icon>
            <v-icon @click="onEdit(item)" color="green-lighten-1">mdi-pencil</v-icon>
            <v-icon @click="onDelete(item)" color="red-darken-1">mdi-delete</v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card-item>
    <!-- Top Bar -->
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import TableAction from "../../components/ui/tableAction.vue";
const props = defineProps({
  headers: Array,
  items: Array,
  PageName: {
    type: String,
    default: "Data Table"
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [10, 20, 30],
  },
});
const emit = defineEmits(["edit", "delete", "view", "addNew"]);
// Search + Pagination
const search = ref("");
const page = ref(1);
const itemsPerPage = ref(props.itemsPerPageOptions[0]);
// Menu
const menu = ref(false);
const items = [
  { title: "Import Bulk Employees", icon: "mdi-application-import", actionType: "import" },
  { title: "Export in Excel", icon: "mdi-microsoft-excel", actionType: "export" },
  { title: "Print", icon: "mdi-printer-outline", actionType: "print" },
];

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



const onEdit = (e) => {
  emit("edit", e);
}
const onDelete = (e) => {
  emit("delete", e);
}
const onView = (e) => {
  emit("view", e)
}
const onAddNew = () => {
  emit("addNew")
}

const actionType = (type) => {
  console.log(type)
}

</script>

<style scoped>
.table--title {
  font-size: 24px;
  font-weight: 500;
  margin: 0;
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
  justify-content: end;
  padding: 8px;
  border-top: 1px solid #eee;
  gap: 5px;
}

.v-list-item--density-default.v-list-item--one-line {
  height: auto !important;
}
</style>
