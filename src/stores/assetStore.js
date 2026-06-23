// stores/assetStore.js
import { defineStore } from "pinia";
import { storageService } from "../services/storageService";

export const useAssetStore = defineStore("asset", {
  state: () => ({
    assetTypes: [], // [{ id, name, description }]
    assets: [], // [{ id, assettag, type, brand, model, serialnumber, purchasedate, cost, status, condition, location, notes }]
    movements: [], // [{ id, assettag, assetname, employeeid, employeename, action, date, condition, notes }]
  }),
  actions: {
    load() {
      this.assetTypes = storageService.get("assetTypes") || [];
      this.assets = storageService.get("assets") || [];
      this.movements = storageService.get("movements") || [];
    },

    // ---------------- Asset Types ----------------
    saveAssetTypes() {
      storageService.set("assetTypes", this.assetTypes);
      this.assetTypes = storageService.get("assetTypes") || [];
    },
    addAssetType(type) {
      this.assetTypes.push({ ...type, id: type.id || `ATYP-${Date.now()}` });
      this.saveAssetTypes();
    },
    updateAssetType(type) {
      const i = this.assetTypes.findIndex((t) => t.id === type.id);
      if (i !== -1) this.assetTypes[i] = type;
      this.saveAssetTypes();
    },
    deleteAssetType(id) {
      this.assetTypes = this.assetTypes.filter((t) => t.id !== id);
      this.saveAssetTypes();
    },

    // ---------------- Assets ----------------
    saveAssets() {
      storageService.set("assets", this.assets);
      this.assets = storageService.get("assets") || [];
    },
    // Bulk upsert from Excel — matches by assettag so re-uploading refreshes
    setAssets(records) {
      records.forEach((rec) => {
        const i = this.assets.findIndex((a) => a.assettag === rec.assettag);
        if (i !== -1) this.assets[i] = { ...this.assets[i], ...rec };
        else this.assets.push({ ...rec, id: rec.id || `AST-${Date.now()}-${i}` });
      });
      this.saveAssets();
    },
    addAsset(asset) {
      this.assets.push({ ...asset, id: asset.id || `AST-${Date.now()}` });
      this.saveAssets();
    },
    updateAsset(asset) {
      const i = this.assets.findIndex((a) => a.id === asset.id);
      if (i !== -1) this.assets[i] = asset;
      this.saveAssets();
    },
    deleteAsset(id) {
      this.assets = this.assets.filter((a) => a.id !== id);
      this.saveAssets();
    },
    getAssetById(id) {
      return this.assets.find((a) => a.id === id);
    },

    // ---------------- Movements ----------------
    saveMovements() {
      storageService.set("movements", this.movements);
      this.movements = storageService.get("movements") || [];
    },
    addMovement(movement) {
      this.movements.push({ ...movement, id: movement.id || `MOV-${Date.now()}` });
      this.saveMovements();
    },
    updateMovement(movement) {
      const i = this.movements.findIndex((m) => m.id === movement.id);
      if (i !== -1) this.movements[i] = movement;
      this.saveMovements();
    },
    deleteMovement(id) {
      this.movements = this.movements.filter((m) => m.id !== id);
      this.saveMovements();
    },
  },
});