'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { ThemeConfig, ThemeName, defaultThemes, themeNames } from '@/lib/design-tokens';
import { themeUtils } from '@/lib/theme-utils';

// Enhanced theme context interface
interface ImprovedThemeContextType {
  // Current theme state
  themeColor: ThemeName;
  setThemeColor: (theme: ThemeName) => void;
  
  // Custom theme support
  customTheme: ThemeConfig | null;
  setCustomTheme: (theme: ThemeConfig | null) => void;
  
  // Theme utilities
  availableThemes: ThemeName[];
  currentThemeConfig: ThemeConfig;
  
  // Performance features
  isLoading: boolean;
  preloadTheme: (themeName: ThemeName) => Promise<void>;
  
  // Theme validation
  isValidTheme: (themeName: string) => boolean;
  
  // Theme persistence
  resetToDefault: () => void;
  exportTheme: () => string;
  importTheme: (themeData: string) => boolean;
}

const ImprovedThemeContext = createContext<ImprovedThemeContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  THEME_COLOR: 'beautify-theme-color',
  CUSTOM_THEME: 'beautify-custom-theme',
  PRELOADED_THEMES: 'beautify-preloaded-themes'
} as const;

// Default theme fallback
const DEFAULT_THEME: ThemeName = 'zinc';

export function ImprovedThemeProvider({ children, ...props }: ThemeProviderProps) {
  // State management
  const [themeColor, setThemeColorState] = useState<ThemeName>(DEFAULT_THEME);
  const [customTheme, setCustomThemeState] = useState<ThemeConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  const { theme: mode, setTheme } = useTheme();

  // Memoized current theme configuration
  const currentThemeConfig = useMemo((): ThemeConfig => {
    return customTheme || defaultThemes[themeColor] || defaultThemes[DEFAULT_THEME];
  }, [customTheme, themeColor]);

  // Safe localStorage operations
  const safeLocalStorage = useMemo(() => ({
    getItem: (key: string): string | null => {
      try {
        return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
      } catch {
        return null;
      }
    },
    setItem: (key: string, value: string): void => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, value);
        }
      } catch {
        // Silently fail
      }
    },
    removeItem: (key: string): void => {
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(key);
        }
      } catch {
        // Silently fail
      }
    }
  }), []);

  // Load saved theme on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedThemeColor = safeLocalStorage.getItem(STORAGE_KEYS.THEME_COLOR);
    const savedCustomTheme = safeLocalStorage.getItem(STORAGE_KEYS.CUSTOM_THEME);

    // Load saved theme color
    if (savedThemeColor && themeNames.includes(savedThemeColor as ThemeName)) {
      setThemeColorState(savedThemeColor as ThemeName);
    }

    // Load saved custom theme
    if (savedCustomTheme) {
      try {
        const parsedCustomTheme = JSON.parse(savedCustomTheme) as ThemeConfig;
        if (themeUtils.validateTheme(parsedCustomTheme)) {
          setCustomThemeState(parsedCustomTheme);
        }
      } catch {
        // Invalid custom theme, remove it
        safeLocalStorage.removeItem(STORAGE_KEYS.CUSTOM_THEME);
      }
    }

    setIsMounted(true);
  }, [safeLocalStorage]);

  // Apply theme when theme color, mode, or custom theme changes
  useEffect(() => {
    if (!isMounted || !mode) return;

    const themeConfig = customTheme || defaultThemes[themeColor];
    if (themeConfig) {
      themeUtils.applyTheme(themeColor, mode as 'light' | 'dark', themeConfig);
    }

    setIsLoading(false);
  }, [themeColor, mode, customTheme, isMounted]);

  // Enhanced theme color setter with persistence
  const setThemeColor = useCallback((newThemeColor: ThemeName) => {
    if (!themeNames.includes(newThemeColor)) {
      console.warn(`Invalid theme: ${newThemeColor}`);
      return;
    }

    setThemeColorState(newThemeColor);
    safeLocalStorage.setItem(STORAGE_KEYS.THEME_COLOR, newThemeColor);
    
    // Clear custom theme when switching to predefined theme
    if (customTheme) {
      setCustomThemeState(null);
      safeLocalStorage.removeItem(STORAGE_KEYS.CUSTOM_THEME);
    }
  }, [customTheme, safeLocalStorage]);

  // Enhanced custom theme setter with persistence
  const setCustomTheme = useCallback((newCustomTheme: ThemeConfig | null) => {
    if (newCustomTheme && !themeUtils.validateTheme(newCustomTheme)) {
      console.warn('Invalid custom theme configuration');
      return;
    }

    setCustomThemeState(newCustomTheme);
    
    if (newCustomTheme) {
      safeLocalStorage.setItem(STORAGE_KEYS.CUSTOM_THEME, JSON.stringify(newCustomTheme));
    } else {
      safeLocalStorage.removeItem(STORAGE_KEYS.CUSTOM_THEME);
    }
  }, [safeLocalStorage]);

  // Preload theme for better performance
  const preloadTheme = useCallback(async (themeName: ThemeName): Promise<void> => {
    if (!defaultThemes[themeName]) {
      console.warn(`Theme ${themeName} not found`);
      return;
    }

    // Theme is already loaded in defaultThemes, so just cache it
    await themeUtils.preloadThemes([themeName]);
  }, []);

  // Validate theme name
  const isValidTheme = useCallback((themeName: string): boolean => {
    return themeNames.includes(themeName as ThemeName);
  }, []);

  // Reset to default theme
  const resetToDefault = useCallback(() => {
    setThemeColorState(DEFAULT_THEME);
    setCustomThemeState(null);
    safeLocalStorage.removeItem(STORAGE_KEYS.THEME_COLOR);
    safeLocalStorage.removeItem(STORAGE_KEYS.CUSTOM_THEME);
  }, [safeLocalStorage]);

  // Export current theme configuration
  const exportTheme = useCallback((): string => {
    const exportData = {
      themeColor,
      customTheme,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(exportData, null, 2);
  }, [themeColor, customTheme]);

  // Import theme configuration
  const importTheme = useCallback((themeData: string): boolean => {
    try {
      const importedData = JSON.parse(themeData);
      
      if (importedData.version !== '1.0') {
        console.warn('Unsupported theme version');
        return false;
      }

      if (importedData.themeColor && isValidTheme(importedData.themeColor)) {
        setThemeColor(importedData.themeColor);
      }

      if (importedData.customTheme && themeUtils.validateTheme(importedData.customTheme)) {
        setCustomTheme(importedData.customTheme);
      }

      return true;
    } catch {
      console.error('Failed to import theme data');
      return false;
    }
  }, [isValidTheme, setThemeColor, setCustomTheme]);

  // Context value
  const contextValue = useMemo((): ImprovedThemeContextType => ({
    themeColor,
    setThemeColor,
    customTheme,
    setCustomTheme,
    availableThemes: themeNames,
    currentThemeConfig,
    isLoading,
    preloadTheme,
    isValidTheme,
    resetToDefault,
    exportTheme,
    importTheme
  }), [
    themeColor,
    setThemeColor,
    customTheme,
    setCustomTheme,
    currentThemeConfig,
    isLoading,
    preloadTheme,
    isValidTheme,
    resetToDefault,
    exportTheme,
    importTheme
  ]);

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <ImprovedThemeContext.Provider value={contextValue}>
      {children}
    </ImprovedThemeContext.Provider>
  );
}

// Custom hook to use the improved theme context
export function useImprovedTheme(): ImprovedThemeContextType {
  const context = useContext(ImprovedThemeContext);
  
  if (context === undefined) {
    throw new Error('useImprovedTheme must be used within an ImprovedThemeProvider');
  }
  
  return context;
}

// Backward compatibility hook
export function useThemeContext() {
  const improvedTheme = useImprovedTheme();
  
  return {
    themeColor: improvedTheme.themeColor,
    setThemeColor: improvedTheme.setThemeColor
  };
}

// Export types for external use
export type { ImprovedThemeContextType, ThemeConfig, ThemeName };