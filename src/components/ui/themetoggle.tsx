export const ThemeToggle = () => (
  <button
    className="theme-btn p-2 rounded-full border border-border bg-background/10 hover:bg-background/20 
               transition-all duration-300 flex items-center justify-center"
    onClick={handleThemeClick}
    aria-label="Toggle theme"
  >
    {theme === "dark" ? <MoonIcon /> : <SunIcon />}
  </button>
);