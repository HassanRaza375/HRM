<template>
  <v-row>
    <v-col cols="12">
      <v-card class="rounded-0">
        <v-card-text>
          <div
            class="d-flex justify-space-between align-center flex-wrap gap-2"
          >
            <h1 class="my-0 text-headline-large font-weight-bold">
              {{ route.query.id ? "Edit" : "Create" }} Template
            </h1>
            <div
              class="d-flex align-items-center gap-2 justify-end flex-grow-1"
            >
              <v-btn
                class="rounded-0"
                @click="goBack"
                prepend-icon="mdi-arrow-left"
                color="grey-lighten-1"
                >Back</v-btn
              >
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
          <v-text-field
            label="Template Name"
            variant="outlined"
            density="comfortable"
            hide-details
          />
        </v-col>
        <v-col cols="6" md="4" sm="6">
          <v-autocomplete
            label="Template Type"
            variant="outlined"
            density="comfortable"
            hide-details
            :items="['Bank Opening Letter', 'Experience Letter']"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <v-card class="rounded-0">
        <v-card-text>
          <v-textarea
            v-model="templateBody.css"
            label="CSS"
            variant="outlined"
            density="comfortable"
            hide-details
            rows="4"
          ></v-textarea>
          <v-expansion-panels class="mb-2">
            <v-expansion-panel title="Header">
              <v-expansion-panel-text class="p-0">
                <v-textarea
                  v-model="templateBody.header"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  rows="4"
                ></v-textarea>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <!-- Body -->
            <v-expansion-panel title="Body">
              <v-expansion-panel-text class="p-0">
                <v-textarea
                  v-model="templateBody.body"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  rows="3"
                ></v-textarea>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <!-- footer -->
            <v-expansion-panel title="Footer">
              <v-expansion-panel-text class="p-0">
                <v-textarea
                  v-model="templateBody.footer"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  rows="3"
                ></v-textarea>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <v-card class="rounded-0">
        <v-card-text>
          <h3 class="my-0 pb-2 text-headline-small font-weight-bold">Preview</h3>
          <iframe
            style="
              width: 100%;
              height: calc(100vh - 360px);
              border: 1px solid #ccc;
            "
            :srcdoc="previewHtml"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const templateBody = ref({
  css: "",
  header: "",
  body: "",
  footer: "",
});

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
onMounted(() => {
  templateBody.value.css = `:root {
    --header-height: 250px;
    --footer-height: 75px;
    --white: #ffffff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
}


header {
    height: var(--header-height);
    width: 100%;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

footer {
    height: var(--footer-height);
    width: 100%;
    padding: 0 30px;
}

.inherit-height {
    height: inherit;
}

.row {
    display: flex;
    flex-wrap: wrap;
}

.justify-space-between {
    justify-content: space-between;
}

.col {
    padding: 10px;
}

.sefl-center {
    align-self: center;
}

.company {
    margin: 20px;
    margin-top: 50px;
    padding: 2px;
    line-height: 2.5;
    font-style: italic;
    color: #3498db;
    border-top: 5px solid #3498db;
    border-bottom: 5px solid #3498db;
}

.page-1 {
    text-align: center;
    padding-top: 210px;
}

.mt-4 {
    margin-top: 24px;
}

.my-4 {
    margin-top: 24px;
    margin-bottom: 24px;
}

.ma-0 {
    margin: 0 !important;
}

.page {
    page-break-after: always;
}

.width-100 {
    width: 100%;
}

section {
    padding: 0 48px;
}

.text-justify {
    text-align: justify;
}

.text-center {
    text-align: center;
}

.text-right {
    text-align: right;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul {
    margin-bottom: .5em;
}

li {
    margin-left: 25px;
}

.privacy {
    border: 1px solid grey;
    padding: 20px;
    margin: 40px 20px 20px 20px;
    background-color: rgb(239, 239, 239);
}

@media print {
    header {
        position: fixed;
        top: 0;
    }

    footer {
        position: fixed;
        bottom: 0;
    }

    .header-space {
        height: var(--header-height);
    }

    .footer-space {
        height: var(--footer-height);
    }
}`;
});
templateBody.value.body = `<section style="margin-top: 100px;">
      <h4 class="text-center my-4">Bank Account Opening Request Letter For Company Employees</h4>
      <p>
        To, <br />
        The Branch Manager, <br />
        {{Bank Name}}, <br />
        {{Branch Address}}, <br />
        {{Date}}. <br />
      </p>
      <p class="my-4">Subject: Account opening request letter for employees.</p>
      <p class="my-4">Respected Sir,</p>
      <p class="text-justify">
        You are requested that {{Employee}} Son of {{FatherName}}
        is an employee of this company. He is employed as a {{Designation}}. His monthly salary is approximately Rs {{BasicPay}},
      </p>
      <p class="text-justify my-4">
        He needs to open a new savings bank account in your bank for his salary.
        So, you are requested that open a bank account of the above-named
        employee on behalf of this company.
      </p>
      <p>Your co-operation will be highly appreciated</p>
      <p class="my-4">
        Best Regards, <br />
        {{Name}}
      </p>
    </section>`;
</script>
<style scoped>
.v-expansion-panels .v-expansion-panel-text__wrapper {
  padding: 0px !important;
}
</style>
