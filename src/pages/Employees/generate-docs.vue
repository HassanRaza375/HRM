<template>
  <v-row>
    <!-- Header -->
    <v-col cols="12">
      <v-card class="rounded-0">
        <v-card-text>
          <div
            class="d-flex justify-space-between align-center flex-wrap ga-2"
          >
            <div>
              <h1 class="text-h4 font-weight-bold ma-0">Generate Docs</h1>
              <p class="text-medium-emphasis ma-0">
                Select template and employee to generate documents
              </p>
            </div>

            <div class="d-flex ga-2">
              <v-btn
                prepend-icon="mdi-refresh"
                class="rounded-0"
                color="grey-lighten-1"
                @click="resetForm"
              >
                Reset
              </v-btn>

              <v-btn
                prepend-icon="mdi-printer"
                class="rounded-0"
                color="primary"
                @click="printDocument"
                :disabled="!generatedHtml"
              >
                Print
              </v-btn>

              <v-btn
                prepend-icon="mdi-download"
                class="rounded-0"
                color="success"
                @click="downloadHtml"
                :disabled="!generatedHtml"
              >
                Download HTML
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- LEFT PANEL -->
    <v-col cols="12" md="4">
      <v-card class="rounded-0 mb-4">
        <v-card-title>Selections</v-card-title>

        <v-card-text>
          <!-- Template -->
          <v-autocomplete
            v-model="selectedTemplateId"
            label="Select Template"
            variant="outlined"
            density="comfortable"
            :items="templates"
            item-title="name"
            item-value="id"
            hide-details
            class="mb-4"
          />

          <!-- Employee -->
          <v-autocomplete
            v-model="selectedEmployeeId"
            label="Select Employee"
            variant="outlined"
            density="comfortable"
            :items="employees"
            item-title="name"
            item-value="employeeid"
            hide-details
            class="mb-4"
          />

          <!-- Document Name -->
          <v-text-field
            v-model="documentName"
            label="Document Name"
            variant="outlined"
            density="comfortable"
            hide-details
          />
        </v-card-text>
      </v-card>

      <!-- Variables -->
      <v-card class="rounded-0 mb-4">
        <v-card-title>Variables Used</v-card-title>

        <v-card-text>
          <div
            v-if="detectedVariables.length"
            class="d-flex flex-wrap ga-2"
          >
            <v-chip
              v-for="item in detectedVariables"
              :key="item"
              color="primary"
              size="small"
            >
              {{ item }}
            </v-chip>
          </div>

          <div v-else class="text-medium-emphasis">
            No variables detected
          </div>
        </v-card-text>
      </v-card>

      <!-- Missing Variables -->
      <v-card
        v-if="missingVariables.length"
        class="rounded-0 border border-error"
      >
        <v-card-title class="text-error">
          Missing Employee Data
        </v-card-title>

        <v-card-text>
          <v-alert
            type="warning"
            variant="tonal"
            density="comfortable"
          >
            Some variables do not exist in employee data
          </v-alert>

          <div class="d-flex flex-wrap ga-2 mt-4">
            <v-chip
              v-for="item in missingVariables"
              :key="item"
              color="error"
              size="small"
            >
              {{ item }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- RIGHT PANEL -->
    <v-col cols="12" md="8">
      <v-card class="rounded-0">
        <v-card-title>
          <div class="d-flex justify-space-between align-center">
            <span>Preview</span>

            <div class="d-flex ga-2">
              <v-btn
                size="small"
                variant="outlined"
                prepend-icon="mdi-fullscreen"
                @click="fullscreenPreview = true"
              >
                Fullscreen
              </v-btn>
            </div>
          </div>
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-0">
          <iframe
            ref="previewFrame"
            :srcdoc="generatedHtml"
            style="
              width: 100%;
              height: calc(100vh - 220px);
              border: none;
              background: #f5f5f5;
            "
          />
        </v-card-text>
      </v-card>
    </v-col>

    <!-- FULLSCREEN DIALOG -->
    <v-dialog
      v-model="fullscreenPreview"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card class="rounded-0">
        <v-toolbar color="primary">
          <v-toolbar-title>Document Preview</v-toolbar-title>

          <v-spacer />

          <v-btn icon="mdi-close" @click="fullscreenPreview = false" />
        </v-toolbar>

        <iframe
          :srcdoc="generatedHtml"
          style="
            width: 100%;
            height: 100%;
            border: none;
            background: #e0e0e0;
          "
        />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

/*
|--------------------------------------------------------------------------
| STORAGE KEYS
|--------------------------------------------------------------------------
*/
const EMPLOYEE_STORAGE_KEY = "employees";
const TEMPLATE_STORAGE_KEY = "templates";

/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/
const employees = ref([]);
const templates = ref([]);

const selectedTemplateId = ref(null);
const selectedEmployeeId = ref(null);

const documentName = ref("");

const fullscreenPreview = ref(false);

const previewFrame = ref(null);

/*
|--------------------------------------------------------------------------
| LOAD DATA
|--------------------------------------------------------------------------
*/
onMounted(() => {
  employees.value = JSON.parse(
    localStorage.getItem(EMPLOYEE_STORAGE_KEY) || "[]"
  );

  templates.value = JSON.parse(
    localStorage.getItem(TEMPLATE_STORAGE_KEY) || "[]"
  );
});

/*
|--------------------------------------------------------------------------
| COMPUTED
|--------------------------------------------------------------------------
*/
const selectedTemplate = computed(() => {
  return templates.value.find(
    (x) => x.id === selectedTemplateId.value
  );
});

const selectedEmployee = computed(() => {
  return employees.value.find(
    (x) => x.employeeid === selectedEmployeeId.value
  );
});

/*
|--------------------------------------------------------------------------
| TEMPLATE RENDER ENGINE
|--------------------------------------------------------------------------
*/
const renderTemplate = (html, employee) => {
  return html.replace(/{{(.*?)}}/g, (_, key) => {
    const cleanKey = key.trim();

    return employee?.[cleanKey] ?? "";
  });
};

/*
|--------------------------------------------------------------------------
| GENERATED HTML
|--------------------------------------------------------------------------
*/
const generatedHtml = computed(() => {
  if (!selectedTemplate.value || !selectedEmployee.value) {
    return `
      <div
        style="
          display:flex;
          align-items:center;
          justify-content:center;
          height:100vh;
          font-family:Arial;
          color:#999;
        "
      >
        Select template and employee
      </div>
    `;
  }

  const html = `
    <style>
      body{
        background:#e0e0e0;
        padding:30px;
      }

      .a4-page{
        width:210mm;
        min-height:297mm;
        margin:auto;
        background:white;
        box-shadow:0 0 10px rgba(0,0,0,.1);
        overflow:hidden;
      }

      ${selectedTemplate.value.css}
    </style>

    <div class="a4-page">
      ${selectedTemplate.value.header}
      ${selectedTemplate.value.body}
      ${selectedTemplate.value.footer}
    </div>
  `;

  return renderTemplate(html, selectedEmployee.value);
});

/*
|--------------------------------------------------------------------------
| DETECT VARIABLES
|--------------------------------------------------------------------------
*/
const detectedVariables = computed(() => {
  if (!selectedTemplate.value) return [];

  const fullHtml = `
    ${selectedTemplate.value.header}
    ${selectedTemplate.value.body}
    ${selectedTemplate.value.footer}
  `;

  const matches = fullHtml.match(/{{(.*?)}}/g) || [];

  return [...new Set(matches)];
});

/*
|--------------------------------------------------------------------------
| MISSING VARIABLES
|--------------------------------------------------------------------------
*/
const missingVariables = computed(() => {
  if (!selectedEmployee.value) return [];

  return detectedVariables.value.filter((variable) => {
    const key = variable.replace(/[{}]/g, "").trim();

    return !(key in selectedEmployee.value);
  });
});

/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/
const resetForm = () => {
  selectedTemplateId.value = null;
  selectedEmployeeId.value = null;
  documentName.value = "";
};

const printDocument = () => {
  const iframe = previewFrame.value;

  iframe.contentWindow.focus();
  iframe.contentWindow.print();
};

const downloadHtml = () => {
  const blob = new Blob([generatedHtml.value], {
    type: "text/html",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download =
    documentName.value || "generated-document.html";

  link.click();

  URL.revokeObjectURL(url);
};
</script>

<style scoped>
.ga-2 {
  gap: 8px;
}
</style>