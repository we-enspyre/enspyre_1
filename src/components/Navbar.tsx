import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile"; // ✅ fixed import

// === Icons ===
const SunIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="5" stroke="currentColor" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M21 12.79A9 9 0 0111.21 3a7 7 0 100 14 9 9 0 009.79-4.21z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// === Navbar Component ===
const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".logo",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
      );
      gsap.fromTo(
        ".theme-btn",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.7 }
      );
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
    setIsDark((prev) => !prev);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { name: "Gallery", target: "#gallery" },
    { name: "Contact Us", target: "#contact" },
    { name: "About Us", target: "#about" },
  ];

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
          {/* Logo */}
          <div className="logo">
            <h1 className="text-2xl font-bold text-foreground">
              En<span className="text-blue-400">spyre</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          {!isMobile && (
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.target)}
                  className="nav-item px-6 py-2 text-foreground/90 hover:text-foreground hover:bg-foreground/10 
                           rounded-lg backdrop-blur-sm border border-foreground/10 transition-all duration-300 hover:scale-105"
                >
                  {item.name}
                </button>
              ))}
              <button
                className="theme-btn ml-4 p-2 rounded-full border border-border bg-background/10 hover:bg-background/20 
                         transition-all duration-300 flex items-center justify-center"
                onClick={handleThemeClick}
                aria-label="Toggle theme"
              >
                {isDark ? <MoonIcon /> : <SunIcon />}
              </button>
            </div>
          )}

          {/* Mobile Nav */}
          {isMobile && (
            <div className="flex items-center space-x-4">
              <button
                className="theme-btn p-2 rounded-full border border-border bg-background/10 hover:bg-background/20 
                 transition-all duration-300 flex items-center justify-center"
                onClick={handleThemeClick}
                aria-label="Toggle theme"
              >
                {isDark ? <MoonIcon /> : <SunIcon />}
              </button>
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

      {/* ✅ Overlay rendered OUTSIDE nav so it covers viewport properly */}
      {isMobile && isMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 
                  bg-background/70 backdrop-blur-lg"
        >
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
