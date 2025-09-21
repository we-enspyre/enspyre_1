import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./src/assets/locals/en/common.json";
import da from "./src/assets/locals/da/common.json";
import LanguageDetector from "i18next-browser-languagedetector";

localStorage.removeItem("lang") // For testing only, remove in production
const savedLang = localStorage.getItem("lang") || "da"; // ✅ default Danish

i18n.use(LanguageDetector).use(initReactI18next).init({
  detection: {
      order: [], // disables automatic browser detection
    },
  resources: {
    en: { translation: en },
    da: { translation: da }
  },
  lng: savedLang,
  fallbackLng: "da",
  interpolation: { escapeValue: false },
  
  
});

export default i18n;
