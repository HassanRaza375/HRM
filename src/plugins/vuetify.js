import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";

const savedTheme = localStorage.getItem("theme") || "light";

export default createVuetify({
  theme: {
    defaultTheme: savedTheme,

    themes: {
      light: {
        colors: {
          primary: "#014e78", // main brand
          secondary: "#2a9fe8", // accent
          sidebar: "#014e78",
          header: "#014e78",
          active: "#2a9fe8",
        },
      },
      dark: {
        colors: {
          primary: "#2a9fe8",
          secondary: "#014e78",
          sidebar: "#0b2f44",
          header: "#0b2f44",
          active: "#2a9fe8",
        },
      },
    },
  },
});
