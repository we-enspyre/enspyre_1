import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./public/locals/en/common.json";
import da from "./public/locals/da/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    da: { translation: da }
  },
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
