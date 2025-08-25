import { useState } from "react";
import { gsap } from "gsap";

interface TranslationButtonProps {
  className?: string;
}

const TranslationButton: React.FC<TranslationButtonProps> = ({ className }) => {
  const [lang, setLang] = useState<"en" | "da">("en"); // default English site

  const handleClick = () => {
    // Animate flip
    gsap.fromTo(
      ".translation-flag",
      { rotateY: 0 },
      {
        rotateY: 180,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => setLang(lang === "en" ? "da" : "en"),
      }
    );
  };

  return (
    <button
      onClick={handleClick}
      className={`translation-btn p-2 rounded-full border border-border bg-background/10 hover:bg-background/20 
                  transition-all duration-300 flex items-center justify-center ${className}`}
      aria-label="Toggle language"
    >
      <img
        src={lang === "en" ? "/src/assets/dk.svg" : "/src/assets/en.svg"}
        alt={lang === "en" ? "Switch to Danish" : "Switch to English"}
        className="translation-flag w-6 h-6"
      />
    </button>
  );
};

export default TranslationButton;
