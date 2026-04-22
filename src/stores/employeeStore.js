// stores/employeeStore.js
import { defineStore } from "pinia";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [],
  }),
  actions: {
    load() {
      this.employees = JSON.parse(localStorage.getItem("employees") || "[]");
    },
    save() {
      localStorage.setItem("employees", JSON.stringify(this.employees));
    },
  },
});
