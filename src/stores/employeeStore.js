// stores/employeeStore.js
import { defineStore } from "pinia";
import { storageService } from "../services/storageService";
export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [],
    isAuthenticated: false,
    showMainContent: false,
  }),
  actions: {
    load() {
      this.employees = storageService.get("employees") || [];
      this.isAuthenticated = storageService.get("isAuthenticated");
    },
    save() {
      storageService.set("employees", this.employees);
    },
  },
});
