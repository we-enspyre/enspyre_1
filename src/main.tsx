import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "../i18nts.ts"; // 🔑 import config here

createRoot(document.getElementById("root")!).render(<App />);
