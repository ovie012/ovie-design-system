import React, { useEffect } from "react";
import { useThemeStore } from "@/lib/store/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark";
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme }) => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    if (defaultTheme && !localStorage.getItem("ovie-ui-theme")) {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, setTheme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};
