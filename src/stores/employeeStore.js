// stores/employeeStore.js
import { defineStore } from "pinia";
import { storageService } from "../services/storageService";
import { de } from "vuetify/locale";
import { templateList } from "../templates/index.js";
export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [],
    templates: [],
    notification: [],
    organogram: [],
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
      this.templates = [...templateList] || [];
      this.isAuthenticated = storageService.get("isAuthenticated");
    },
    save() {
      storageService.set("employees", this.employees);
      this.load();
    },
    saveTemplates() {
      storageService.set("templates", this.templates);
    },
    logout() {
      storageService.set("isAuthenticated", false);
      window.location.reload();
    },
    // Employee
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
      this.save();
    },
    addEmployee(employee) {
      this.employees.push(employee);
      this.save();
    },
    deleteEmployee(id) {
      this.employees = this.employees.filter((emp) => emp.employeeid !== id);
      this.save();
    },
    // Templates
    getAllTemplates() {
      return this.templates;
    },
    getTemplateById(id) {
      return this.templates.find((emp) => emp.id === id);
    },
    updateTemplate(template) {
      const index = this.templates.findIndex((emp) => emp.id === template.id);
      if (index !== -1) {
        this.templates[index] = template;
      }
      this.saveTemplates();
    },
    addTemplate(template) {
      this.templates.push(template);
      this.saveTemplates();
    },
    deleteTemplate(id) {
      this.templates = this.templates.filter((emp) => emp.id !== id);
      this.saveTemplates();
    },
    // get hierarchy
    getOrganogram() {
      this.organogram = storageService.get("employees").map((emp) => ({
        name: emp.name,
        role: emp.designation,
        reportingline: emp.reportingline,
      }));
      debugger
      return this.organogram;
    },
  },
});
