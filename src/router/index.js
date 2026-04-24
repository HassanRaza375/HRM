import { createRouter, createWebHistory } from "vue-router";

// Pages
import Dashboard from "../pages/Dashboard.vue";
import Employees from "../pages/Employees/index.vue";
import CreateEmployee from "../pages/Employees/create.vue";
import Templates from "../pages/Templates/index.vue";
import TemplatesCreate from "../pages/Templates/create.vue";
import Login from "../pages/Login.vue";

// Layouts
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", component: Dashboard },
      { path: "employees", component: Employees },
      { path: "employees/create", component: CreateEmployee },
      { path: "templates", component: Templates },
      { path: "templates/create", component: TemplatesCreate },
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
