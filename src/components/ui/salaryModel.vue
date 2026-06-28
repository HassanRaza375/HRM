<template>
  <v-dialog v-model="dialog" width="1200" scrollable>
    <v-card class="rounded-0">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ title }}</span>
        <div class="d-flex ga-2">
          <v-btn
            size="small"
            color="primary"
            prepend-icon="mdi-printer"
            @click="printSlip"
            :disabled="!generatedHtml"
          >
            Print
          </v-btn>
        </div>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-0">
        <iframe
          ref="previewFrame"
          :srcdoc="generatedHtml"
          style="width: 100%; height: 70vh; border: none; background: #f5f5f5"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="onCancel">{{ cancelText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useEmployeeStore } from "../../stores/employeeStore";

const employeeStore = useEmployeeStore();

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: "Salary Slip" },
  selectedRow: { type: Object, default: () => ({}) },
  cancelText: { type: String, default: "Close" },
  allowCopy: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const previewFrame = ref(null);

/*
|--------------------------------------------------------------------------
| TEMPLATE
|--------------------------------------------------------------------------
*/
const template = computed(() =>
  employeeStore.getTemplateById("salary-slip")
);

/*
|--------------------------------------------------------------------------
| RENDER DATA
| Merge the slip row with computed extras (print date, employee no, etc.)
|--------------------------------------------------------------------------
*/
const renderData = computed(() => {
  const row = props.selectedRow || {};
  const benefits = Array.isArray(row.otherBenefits) ? row.otherBenefits : [];

  const toNum = (v) => parseFloat(v) || 0;

  const otherBenefitsRows = benefits.length === 0
    ? `<tr><td colspan="2" style="border:0;padding:3px;text-align:center;color:#888;">N/A</td></tr>`
    : benefits.map(b => `<tr>
        <td style="border:0;padding:3px;"><b>${b.title}:</b></td>
        <td style="border:0;padding:3px;" align="right">${b.value || "N/A"}</td>
      </tr>`).join("");

  const earningsTotal = toNum(row.basicsalary) + toNum(row.houserent) + toNum(row.utility) + toNum(row.medical);
  const deductionsTotal = toNum(row.eobi) + toNum(row.providentfund);
  const otherBenefitsTotal = benefits.reduce((sum, b) => sum + toNum(b.value), 0);

  return {
    ...row,
    id: row.employeeid ?? row.id ?? "",
    todaydate: new Date().toLocaleDateString(),
    otherBenefitsRows,
    earningsTotal: earningsTotal || "N/A",
    deductionsTotal: deductionsTotal || "N/A",
    otherBenefitsTotal: benefits.length === 0 ? "N/A" : otherBenefitsTotal,
  };
});

/*
|--------------------------------------------------------------------------
| TEMPLATE RENDER ENGINE  (same as docs generation page)
|--------------------------------------------------------------------------
*/
const renderTemplate = (html, data) =>
  html.replace(/{{(.*?)}}/g, (_, key) => data?.[key.trim()] ?? "");

/*
|--------------------------------------------------------------------------
| GENERATED HTML
|--------------------------------------------------------------------------
*/
const generatedHtml = computed(() => {
  if (!template.value) {
    return `<div style="display:flex;align-items:center;justify-content:center;
            height:100vh;font-family:Arial;color:#999;">
            Salary slip template not found</div>`;
  }

  const { css, header, body, footer } = template.value.content;

  const html = `
    <style>
    ${css}
     @page { size: A4 landscape; margin: 5mm; }
    </style>
    ${header}
    ${body}
    ${footer}
  `;

  return renderTemplate(html, renderData.value);
});

/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/
const printSlip = () => {
  const iframe = previewFrame.value;
  if (!iframe) return;
  iframe.contentWindow.focus();
  iframe.contentWindow.print();
};

const onCancel = () => {
  dialog.value = false;
};
</script>