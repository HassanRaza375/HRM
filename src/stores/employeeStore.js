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
    leaves: [],
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
      this.leaves = storageService.get("leaves") || [];
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
      if (storageService.get("employees").length === 0) return [];
      else {
        return storageService.get("employees").map((emp) => ({
          id: emp.employeeid,
          name: emp.name,
          role: emp.designation,
          reportingline: emp.reportingline,
        }));
      }
    },
    // Salary Slip
    addSalarySlip(slip) {
      const index = this.employees.findIndex(
        (emp) => emp.employeeid === slip.employeeid,
      );
      if (index === -1) return;

      if (!this.employees[index].salarySlips) {
        this.employees[index].salarySlips = [];
      }

      const newSlip = {
        ...slip,
        id: `SLIP-${Date.now()}`, // unique id for the slip
      };

      this.employees[index].salarySlips.push(newSlip);
      this.save();
    },

    updateSalarySlip(slip) {
      const empIndex = this.employees.findIndex(
        (emp) => emp.employeeid === slip.employeeid,
      );
      if (empIndex === -1) return;

      const slips = this.employees[empIndex].salarySlips || [];
      const slipIndex = slips.findIndex((s) => s.id === slip.id);
      if (slipIndex !== -1) {
        slips[slipIndex] = { ...slip };
      }
      this.save();
    },

    getSalarySlipById(employeeid, slipId) {
      const emp = this.employees.find((e) => e.employeeid === employeeid);
      if (!emp || !emp.salarySlips) return null;
      return emp.salarySlips.find((s) => s.id === slipId);
    },
    deleteSalarySlip(employeeid, slipId) {
      const emp = this.employees.find((e) => e.employeeid === employeeid);
      if (!emp || !emp.salarySlips) return;
      emp.salarySlips = emp.salarySlips.filter((s) => s.id !== slipId);
      this.save();
    },

    // ============================================================
    // Leaves  (ADDED)
    // ============================================================
    loadLeaves() {
      this.leaves = storageService.get("leaves") || [];
    },
    saveLeaves() {
      storageService.set("leaves", this.leaves);
      this.loadLeaves();
    },
    // Bulk upsert from an Excel upload. Existing employees get updated,
    // new ones get appended — so re-uploading refreshes the records.
    setLeaves(records) {
      records.forEach((rec) => {
        const i = this.leaves.findIndex((l) => l.employeeid === rec.employeeid);
        if (i !== -1) this.leaves[i] = { ...this.leaves[i], ...rec };
        else this.leaves.push(rec);
      });
      this.saveLeaves();
    },
    getLeaveByEmployeeId(id) {
      return this.leaves.find((l) => l.employeeid === id);
    },
    updateLeave(record) {
      const i = this.leaves.findIndex(
        (l) => l.employeeid === record.employeeid,
      );
      if (i !== -1) this.leaves[i] = record;
      else this.leaves.push(record);
      this.saveLeaves();
    },
    deleteLeave(id) {
      this.leaves = this.leaves.filter((l) => l.employeeid !== id);
      this.saveLeaves();
    },
    clearLeaves() {
      this.leaves = [];
      this.saveLeaves();
    },
  },
});
