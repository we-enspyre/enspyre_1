import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import engIcon from "@/assets/en.svg";
import dkIcon from "@/assets/dk.svg";

const TranslationButton = () => {
  const { i18n } = useTranslation();
  const [current, setCurrent] = useState(i18n.language);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
      setCurrent(saved);
    }
  }, [i18n]);

  const toggleLang = () => {
    const newLang = current === "en" ? "da" : "en";
    gsap.fromTo(".translation-flag",
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
      src={current === "en" ? engIcon : dkIcon}
      alt="Translation Flag"
      className="translation-flag w-6 h-6"
      />
    </button>
  );
};

export default TranslationButton;
