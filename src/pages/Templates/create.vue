<template>
  <v-row>
    <v-col cols="12">
      <v-card class="rounded-0">
        <v-card-text>
          <div class="d-flex justify-space-between align-center flex-wrap gap-2">
            <h1 class="my-0 text-headline-large font-weight-bold">
              {{ route.query.id ? "Edit" : "Create" }} Template
            </h1>
            <div class="d-flex align-items-center gap-2 justify-end flex-grow-1">
              <v-btn class="rounded-0" @click="goBack" prepend-icon="mdi-arrow-left" color="grey-lighten-1">Back</v-btn>
              <v-btn class="rounded-0" color="primary" @click="onSubmit">
                {{ route.query.id ? "Update Template" : "Create Template" }}
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="6" md="4" sm="6">
          <v-text-field label="Template Name" variant="outlined" density="comfortable" hide-details />
        </v-col>
        <v-col cols="6" md="4" sm="6">
          <v-autocomplete label="Template Type" variant="outlined" density="comfortable" hide-details
            :items="['Bank Opening Letter', 'Experience Letter']"></v-autocomplete>
        </v-col>
        <v-col cols="6" md="4" sm="6">
          <v-btn icon="mdi-eye" @click="dialog = true" variant="text"></v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <v-card class="rounded-0">
        <v-card-text>
          <v-textarea v-model="templateBody.css" label="CSS" variant="outlined" density="comfortable" hide-details
            rows="4"></v-textarea>
          <v-expansion-panels class="mb-2">
            <v-expansion-panel title="Header">
              <v-expansion-panel-text class="p-0">
                <v-textarea v-model="templateBody.header" variant="outlined" density="comfortable" hide-details
                  rows="4"></v-textarea>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <!-- Body -->
            <v-expansion-panel title="Body">
              <v-expansion-panel-text class="p-0">
                <v-textarea v-model="templateBody.body" variant="outlined" density="comfortable" hide-details
                  rows="3"></v-textarea>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <!-- footer -->
            <v-expansion-panel title="Footer">
              <v-expansion-panel-text class="p-0">
                <v-textarea v-model="templateBody.footer" variant="outlined" density="comfortable" hide-details
                  rows="3"></v-textarea>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <v-card class="rounded-0">
        <v-card-text>
          <h3 class="my-0 pb-2 text-headline-small font-weight-bold">
            Preview
          </h3>
          <iframe style="
              width: 100%;
              height: calc(100vh - 360px);
              border: 1px solid #ccc;
            " :srcdoc="previewHtml"></iframe>
        </v-card-text>
      </v-card>
    </v-col>
    <ViewDetails :title="Variables" v-model="dialog" :selectedRow="variables" :allowCopy="true" />
  </v-row>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useEmployeeStore } from "../../stores/employeeStore";
import ViewDetails from "../../components/ui/ViewDetails.vue";

const employeeStore = useEmployeeStore();
const route = useRoute();
const router = useRouter();
const dialog = ref(false);

const templateBody = ref({
  css: "",
  header: "",
  body: "",
  footer: "",
});

let variables = { id: "", name: "", designation: "", department: "", currentsalary: "", salaryathiring: "", ['afterprobation(ifapplicable)']: "", reportingline: "", doj: "", cnic: "", maritalstatus: "", religion: "", dob: "", age: "", contactnumber: "", personalemailaddress: "", officialemailaddress: "", fathername: "", currentaddress: "", permanentaddress: "", emergencycontactname: "", emergencycontactrelation: "", emergencycontactnumber: "", dependentcontactname: "", dependentcontactrelation: "", dependentcontactnumber: "", bankname: "", accounttitle: "", acountnumber: "", reportingLine: "" };


const previewHtml = computed(() => {
  return `
    <style>${templateBody.value.css}</style>
    ${templateBody.value.header}
    ${templateBody.value.body}
    ${templateBody.value.footer}
  `;
});
const goBack = () => {
  router.back();
};
const loadEditTemplate = (id) => {
  const template = employeeStore.getTemplateById(id);
  templateBody.value.css = template.content.css;
  templateBody.value.body = template.content.body;
  templateBody.value.footer = template.content.footer;
  templateBody.value.header = template.content.header;
};
const onView = (e) => {
  selectedRow.value = e;
  dialog.value = true;
};
onMounted(() => {
  if (route.query.id) {
    loadEditTemplate(route.query.id);
  }
});
</script>
<style scoped>
.v-expansion-panels .v-expansion-panel-text__wrapper {
  padding: 0px !important;
}
</style>
