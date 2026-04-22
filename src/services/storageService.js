// services/storageService.js
export const storageService = {
  get(key) {
    return JSON.parse(localStorage.getItem(key) || "null");
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
