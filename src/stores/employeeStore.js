// stores/employeeStore.js
import { defineStore } from "pinia";
import { storageService } from "../services/storageService";
import { de } from "vuetify/locale";
export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [],
    templates: [],
    notification: [],
    isAuthenticated: false,
    showMainContent: false,
  }),
  actions: {
    toggleMainContent() {
      this.showMainContent = !this.showMainContent;
    },
    callNotification(notification) {
      this.notification.push({
        text: notification.text || "",
        color: notification.color || "success",
        timeout: notification.timeout || 3000,
      });
    },

    removeNotification(index) {
      this.notification.splice(index, 1);
    },

    clearNotifications() {
      this.notification = [];
    },
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
    getEmployeeById(id) {
      return this.employees.find((emp) => emp.employeeid === id);
    },
    updateEmployee(employee) {
      const index = this.employees.findIndex(
        (emp) => emp.employeeid === employee.employeeid,
      );
      if (index !== -1) {
        this.employees[index] = employee;
      }
    },
    addEmployee(employee) {
      this.employees.push(employee);
      this.save();
    },
    deleteEmployee(id) {
      this.employees = this.employees.filter((emp) => emp.employeeid !== id);
      this.save();
    },
  },
});
