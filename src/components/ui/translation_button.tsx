import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import engIcon from "@/assets/en.svg";
import dkIcon from "@/assets/dk.svg";

const TranslationButton = () => {
  const { i18n } = useTranslation();
  const flagRef = useRef<HTMLImageElement>(null);

  // Normalize lang codes like "en-US" -> "en"
  const normalize = (lang: string) => (lang.startsWith("da") ? "da" : "en");

  // Initialize language from localStorage or fallback to Danish
  const initialLang = normalize(localStorage.getItem("lang") || i18n.language || "da");
  const [current, setCurrent] = useState(initialLang);

  useEffect(() => {
    // Keep i18n in sync with current state
    if (i18n.language !== current) {
      i18n.changeLanguage(current);
    }

    // Update <html lang=""> for SEO + accessibility
    document.documentElement.lang = current;
  }, [current, i18n]);

  const toggleLang = () => {
    const newLang = current === "en" ? "da" : "en";

    gsap.fromTo(
      flagRef.current,
      { rotateY: 0 },
      {
        rotateY: 180,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          i18n.changeLanguage(newLang);
          localStorage.setItem("lang", newLang);
          setCurrent(newLang);
        },
      }
    );
  };

  return (
    <button
      onClick={toggleLang}
      className="translation-btn p-2 rounded-full border border-border bg-background/10 hover:bg-background/20 
           transition-all duration-300 flex items-center justify-center"
      aria-label="Toggle language"
    >
      <img
        ref={flagRef}
        src={current === "en" ? engIcon : dkIcon}
        alt={current === "en" ? "English" : "Danish"}
        className="w-6 h-6"
      />
    </button>
  );
};

export default TranslationButton;
