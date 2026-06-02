import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { router } from "./router";
import { createPinia } from "pinia";
import VueECharts from 'vue-echarts'
import VueApexCharts from "vue3-apexcharts";

import "./plugins/chart";
const pinia = createPinia();
const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(pinia);
app.use(VueApexCharts);
app.component('VChart', VueECharts)
app.mount("#app");
