import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export default function useTheme(initial?: Theme) {
  const getInitial = (): Theme => {
    if (initial) return initial;
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {
      // ignore
    }
    // default to dark so the app uses dark mode unless the user explicitly chooses light
    return "dark";
  };

  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore
    }
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  return { theme, setTheme, isDark: theme === "dark", toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}
