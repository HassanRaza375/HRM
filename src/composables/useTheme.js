import { ref, watch } from "vue";
import { useTheme } from "vuetify";

export function useAppTheme() {
  const theme = useTheme();

  const current = ref(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    current.value = current.value === "light" ? "dark" : "light";
  };

  // Sync with Vuetify + localStorage
  watch(
    current,
    (val) => {
      theme.global.name.value = val;
      localStorage.setItem("theme", val);
    },
    { immediate: true },
  );

  return {
    current,
    toggleTheme,
    isDark: () => current.value === "dark",
  };
}
