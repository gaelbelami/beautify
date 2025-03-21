"use client";
import setGlobalThemeColorTheme from "@/lib/theme-colors";
import { useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams,
);
export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const getSavedThemeColor = () => {
    try {
      return (localStorage.getItem("themeColor") as ThemeColors) || "Zinc";
    } catch {
      return "Zinc" as ThemeColors;
    }
  };

  const [themeColor, setThemeColor] = useState<ThemeColors>(
    getSavedThemeColor() as ThemeColors,
  );
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
    setGlobalThemeColorTheme(theme as "light" | "dark", themeColor);

    if (!isMounted) {
      setIsMounted(true);
    }
  }, [themeColor, theme, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
