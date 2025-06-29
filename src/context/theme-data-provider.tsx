"use client";
// Legacy theme provider - DEPRECATED
// This file is kept for backward compatibility only
// New implementations should use @/context/improved-theme-provider

import { ImprovedThemeProvider, useImprovedTheme } from './improved-theme-provider';
import { ThemeProviderProps } from "next-themes/dist/types";
import { createContext, useContext } from "react";
import { ThemeColors, ThemeColorStateParams, LegacyThemeContextType, ImprovedThemeContextType } from "@/types/theme-types";

// Legacy context for backward compatibility
const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams,
);

// Legacy provider that wraps the new improved provider
export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  console.warn('ThemeDataProvider is deprecated. Use ImprovedThemeProvider instead.');
  
  return (
    <ImprovedThemeProvider>
      <LegacyThemeWrapper>
        {children}
      </LegacyThemeWrapper>
    </ImprovedThemeProvider>
  );
}

// Wrapper to provide legacy API
function LegacyThemeWrapper({ children }: { children: React.ReactNode }) {
  const { currentTheme, setTheme } = useImprovedTheme();
  
  const legacyValue: LegacyThemeContextType = {
    themeColor: (currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)) as ThemeColors,
    setThemeColor: (color: ThemeColors) => {
      setTheme(color.toLowerCase());
    },
    currentTheme: (currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)) as ThemeColors,
    setTheme: (color: ThemeColors) => {
      setTheme(color.toLowerCase());
    }
  };

  return (
    <ThemeContext.Provider value={legacyValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Legacy hook for backward compatibility
export function useThemeContext() {
  console.warn('useThemeContext is deprecated. Use useImprovedTheme instead.');
  return useContext(ThemeContext);
}

// Re-export new components for easy migration
export { ImprovedThemeProvider, useImprovedTheme };
