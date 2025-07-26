// Theme system type definitions
export type ThemeColor = string;
export type ThemeColors = 
  | "Slate"
  | "Neutral"
  | "Stone"
  | "Red"
  | "Orange"
  | "Amber"
  | "Yellow"
  | "Lime"
  | "Green"
  | "Emerald"
  | "Teal"
  | "Cyan"
  | "Sky"
  | "Blue"
  | "Indigo"
  | "Violet"
  | "Purple"
  | "Fuchsia"
  | "Pink"
  | "Rose";

export interface ThemeColorMap {
  [key: string]: ThemeColor;
}

export interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: (color: ThemeColors) => void;
}

export interface ThemeDefinition {
  name: string;
  colors: ThemeColorMap;
  isDark?: boolean;
}

export interface CustomTheme {
  id: string;
  name: string;
  colors: ThemeColorMap;
  createdAt: string;
}

export interface ThemeContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
  customThemes: CustomTheme[];
  addCustomTheme: (theme: CustomTheme) => void;
  removeCustomTheme: (id: string) => void;
  exportThemes: () => string;
  importThemes: (data: string) => boolean;
}

export interface ImprovedThemeContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
  customThemes: CustomTheme[];
  addCustomTheme: (theme: CustomTheme) => void;
  removeCustomTheme: (id: string) => void;
  exportThemes: () => string;
  importThemes: (data: string) => boolean;
  preloadTheme: (color: string) => void;
  validateTheme: (theme: any) => boolean;
}

// Legacy compatibility types
export interface LegacyThemeContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
  currentTheme?: any;
  setTheme?: (theme: any) => void;
}