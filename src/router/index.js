import { createRouter, createWebHistory } from "vue-router";

// Pages
import Dashboard from "../pages/Dashboard.vue";
import Employees from "../pages/Employees.vue";
import Templates from "../pages/Templates.vue";
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
      { path: "templates", component: Templates },
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
