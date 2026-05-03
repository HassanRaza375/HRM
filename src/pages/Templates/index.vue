<template>
  <div>
    <DataTables :headers="headers" :items="template" :itemsPerPageOptions="itemsPerPageOptions" @delete="onDelete"
      @edit="onEdit" @view="onView" @addNew="onAddNew" :PageName="pageName" />
  </div>
</template>

<script setup>
import DataTables from "../../components/ui/DataTables.vue";
const itemsPerPageOptions = [10, 20, 30];
import { useRouter } from "vue-router";
const pageName = "Templates";
const headers = [
  { title: "ID", key: "templateId" },
  { title: "Name", key: "name" },
  { title: "Template", key: "template" },
  { title: "Date Created", key: "dateCreated" },
  { title: "Actions", key: "actions", sortable: false },
];

const template = [
  { templateId: 1, name: "SAT-XYZ", template: "Bank Opening Letter", dateCreated: "2024-01-01" },
  { templateId: 2, name: "SAT-Ahmed", template: "Job Application Form", dateCreated: "2024-01-02" },
];

const router = useRouter();


const onEdit = (e) => {
  router.push("/templates/create?id=" + e.templateId);
}
const onDelete = (e) => {
  console.log(e)
}
const onView = (e) => {
  console.log(e)
}
const onAddNew = () => {
  router.push("/templates/create");
}
</script>

<style></style>
