// stores/employeeStore.js
import { defineStore } from "pinia";
import { storageService } from "../services/storageService";
export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [],
    templates: [],
    isAuthenticated: false,
    showMainContent: false,
  }),
  actions: {
    load() {
      this.employees = storageService.get("employees") || [];
      this.templates = storageService.get("templates") || [];
      this.isAuthenticated = storageService.get("isAuthenticated");
    },
    save() {
      storageService.set("employees", this.employees);
    },
    saveTemplates() {
      storageService.set("templates", this.templates);
    },
    logout() {
      storageService.set("isAuthenticated", false);
      window.location.reload();
    },
  },
});
