import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";
import { SunIcon, MenuIcon, MoonIcon, CloseIcon } from "@/components/ui/navbaricons";
import TranslationButton from "@/components/ui/translation_button";
import { useTranslation } from "react-i18next";
import logodark from "../assets/logo-dark.png"
import logolight from "../assets/logo-light.png"

const Navbar = () => {
  const { t } = useTranslation();
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".logo", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" });
      gsap.fromTo(".theme-btn", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, delay: 0.7 });
    }, navRef);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: sectionId, offsetY: 80 },
      ease: "power2.inOut",
      onComplete: () => setIsMenuOpen(false),
    });
  };

  const handleThemeClick = () => {
    gsap.fromTo(".theme-btn", { rotate: 0 }, { rotate: 360, duration: 0.4 });
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = t("navbar.items", { returnObjects: true }) as { name: string; target: string }[];

  const ThemeToggle = () => (
    <button
      className="theme-btn p-2 rounded-full border border-border bg-background/10 hover:bg-background/20 transition-all duration-300 flex items-center justify-center"
      onClick={handleThemeClick}
      aria-label={t("navbar.toggleTheme")}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-md bg-background/10 border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("#home")}
            className="p-0 m-0 bg-transparent border-none"
          >
            {theme === "dark" ? (
              <img
                src={logodark}
                alt="Enspyre Logo Dark"
                className="h-14 w-auto"
              />
            ) : (
              <img
                src={logolight}
                alt="Enspyre Logo Light"
                className="h-14 w-auto"
              />
            )}
          </button>

          {!isMobile && (
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.target)}
                  className="nav-item px-6 py-2 text-foreground/90 hover:text-foreground hover:bg-foreground/10 rounded-lg backdrop-blur-sm border border-foreground/10 transition-all duration-300 hover:scale-105"
                >
                  {item.name}
                </button>
              ))}
              <TranslationButton />
              <ThemeToggle />
            </div>
          )}

          {isMobile && (
            <div className="flex items-center space-x-4">
              <TranslationButton />
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          )}
        </div>
      </nav>

      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/70 backdrop-blur-lg">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.target)}
              className="text-2xl font-semibold text-foreground hover:text-blue-400 transition"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
