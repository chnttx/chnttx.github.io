import { useEffect, useState } from "react";

const STORAGE_KEY = "preferred-theme";
type Theme = "theme-light" | "theme-dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "theme-light" || stored === "theme-dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "theme-dark" : "theme-light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "theme-dark" ? "theme-light" : "theme-dark"));

  return { theme, toggle };
}
