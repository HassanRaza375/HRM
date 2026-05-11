<template>
  <div>
    <DataTables
      :headers="headers"
      :items="templateListing"
      :itemsPerPageOptions="itemsPerPageOptions"
      @delete="onDelete"
      @edit="onEdit"
      @view="onView"
      @addNew="onAddNew"
      :actionsToShow="{ view: false, edit: true, delete: false, addNew: false }"
      :PageName="pageName"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DataTables from "../../components/ui/DataTables.vue";
import { useEmployeeStore } from "../../stores/employeeStore";
import { useRouter } from "vue-router";

const itemsPerPageOptions = [10, 20, 30];
const pageName = "Templates";
const employeeStore = useEmployeeStore();

const headers = [
  { title: "ID", key: "id" },
  { title: "Template", key: "name" },
  { title: "Date Created", key: "dateCreated" },
  { title: "Actions", key: "actions", sortable: false },
];

// { templateId: 1, template: "Bank Opening Letter", dateCreated: "2024-01-01" },
const templateListing = ref([]);

const router = useRouter();

const onEdit = (e) => {
  router.push("/templates/create?id=" + e.id);
};
const onDelete = (e) => {
  employeeStore.deleteTemplate(e.id);
};
const onView = (e) => {
  console.log(e);
};
const onAddNew = () => {
  router.push("/templates/create");
};

const loadTemplateListing = () => {
  templateListing.value = employeeStore.getAllTemplates();
};

onMounted(() => {
  loadTemplateListing();
});
</script>

<style></style>
