import { createRouter, createWebHistory } from "vue-router";
import { storageService } from "../services/storageService";

// Pages
import Dashboard from "../pages/Dashboard.vue";
import Organogram from "../pages/OrgChart.vue";

// Employee
import Employees from "../pages/Employees/index.vue";
import CreateEmployee from "../pages/Employees/create.vue";
import BulkUpload from "../pages/Employees/bulk-upload.vue";
import GenerateDocs from "../pages/Employees/generate-docs.vue";
import Salary from "../pages/Employees/salary.vue";
import SalarySlip from "../pages/Employees/salary-slip/index.vue";
import SalaryForm from "../pages/Employees/salary-slip/form.vue";
import LeaveList from "../pages/Employees/leaves/index.vue";
import UploadLeaves from "../pages/Employees/leaves/upload.vue";
import LeaveDetails from "../pages/Employees/leaves/detail.vue";
import EmployeePerformance from "../pages/Employees/performance.vue";
import Kpis from "../pages/Employees/kpis.vue";
import PerformanceDashboard from "../pages/Employees/performance-dashboard.vue";
import PerformanceDetail from "../pages/Employees/performance-detail.vue";

// Template
import Templates from "../pages/Templates/index.vue";
import TemplatesCreate from "../pages/Templates/create.vue";

// Assets
import Assets from "../pages/Assets/assets.vue";
import AssetsMovement from "../pages/Assets/movement.vue";
import AssetsTypes from "../pages/Assets/types.vue";
import AssetsUpload from "../pages/Assets/upload.vue";

// Main pages
import HRM from "../pages/HRM.vue";

import Report from "../pages/Report/index.vue";

import Login from "../pages/Login.vue";

import Settings from "../pages/Settings.vue";

// Layouts
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "", component: Dashboard },
      { path: "organogram", component: Organogram },
      { path: "hrm", component: HRM },
      { path: "report", component: Report },

      { path: "employees", component: Employees },
      { path: "employees/bulk-upload", component: BulkUpload },
      { path: "employees/create", component: CreateEmployee },
      { path: "employees/generate-docs", component: GenerateDocs },
      {
        path: "employees/leaves",
        component: LeaveList,
      },
      {
        path: "employees/leaves/upload",
        component: UploadLeaves,
      },
      {
        path: "employees/leaves/:employeeid",
        component: LeaveDetails,
      },
      { path: "employees/salary", component: Salary },
      { path: "employees/salary-slip", component: SalarySlip },
      { path: "employees/salary-slip/form", component: SalaryForm },
      { path: "employees/employees-performance", component: EmployeePerformance },
      { path: "employees/kpis", component: Kpis },
      { path: "employees/performance", component: PerformanceDashboard },
      { path: "employees/performance/:id", component: PerformanceDetail },

      { path: "templates", component: Templates },
      { path: "templates/create", component: TemplatesCreate },

      { path: "assets", component: Assets },
      { path: "assets/movement", component: AssetsMovement },
      { path: "assets/types", component: AssetsTypes },
      { path: "assets/upload", component: AssetsUpload },

      { path: "settings", component: Settings },

      {
        path: "404",
        name: "NotFound",
        component: NotFound,
      },
      {
        path: ":catchAll(.*)",
        redirect: "404",
      },
    ],
  },
  {
    path: "/login",
    component: AuthLayout,
    children: [{ path: "", component: Login }],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = storageService.get("isAuthenticated") === "true";

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});
