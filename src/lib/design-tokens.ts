// Design Token System - Foundation for the new theme architecture

export interface ColorToken {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

// Primitive color tokens - base color palette
export const primitiveColors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712'
  },
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b'
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a'
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407'
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16'
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764'
  }
} as const;

// Semantic color tokens - meaning-based colors
export interface SemanticColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  success: string;
  warning: string;
  info: string;
}

// Chart colors for data visualization
export interface ChartColors {
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

// Complete theme configuration
export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    light: SemanticColors & { chart: ChartColors };
    dark: SemanticColors & { chart: ChartColors };
  };
  radius: string;
}

// Theme generator utility
export const createTheme = (
  name: string,
  displayName: string,
  primaryColor: keyof typeof primitiveColors,
  options?: {
    radius?: string;
    customColors?: Partial<SemanticColors>;
  }
): ThemeConfig => {
  const primary = primitiveColors[primaryColor];
  const neutral = primitiveColors.slate;
  
  const baseLight: SemanticColors = {
    background: '0 0% 100%',
    foreground: neutral[900],
    card: '0 0% 100%',
    cardForeground: neutral[900],
    popover: '0 0% 100%',
    popoverForeground: neutral[900],
    primary: primary[600],
    primaryForeground: '0 0% 98%',
    secondary: neutral[100],
    secondaryForeground: neutral[900],
    muted: neutral[100],
    mutedForeground: neutral[500],
    accent: neutral[100],
    accentForeground: neutral[900],
    destructive: primitiveColors.red[500],
    destructiveForeground: '0 0% 98%',
    border: neutral[200],
    input: neutral[200],
    ring: primary[600],
    success: primitiveColors.green[500],
    warning: primitiveColors.orange[500],
    info: primitiveColors.blue[500],
    ...options?.customColors
  };
  
  const baseDark: SemanticColors = {
    background: neutral[950],
    foreground: neutral[50],
    card: neutral[950],
    cardForeground: neutral[50],
    popover: neutral[950],
    popoverForeground: neutral[50],
    primary: primary[500],
    primaryForeground: neutral[900],
    secondary: neutral[800],
    secondaryForeground: neutral[50],
    muted: neutral[800],
    mutedForeground: neutral[400],
    accent: neutral[800],
    accentForeground: neutral[50],
    destructive: primitiveColors.red[900],
    destructiveForeground: neutral[50],
    border: neutral[800],
    input: neutral[800],
    ring: primary[500],
    success: primitiveColors.green[600],
    warning: primitiveColors.orange[600],
    info: primitiveColors.blue[600],
    ...options?.customColors
  };
  
  const chartColors: ChartColors = {
    chart1: primary[500],
    chart2: primitiveColors.green[500],
    chart3: primitiveColors.orange[500],
    chart4: primitiveColors.purple[500],
    chart5: primitiveColors.blue[500]
  };
  
  return {
    name,
    displayName,
    colors: {
      light: { ...baseLight, chart: chartColors },
      dark: { ...baseDark, chart: chartColors }
    },
    radius: options?.radius || '0.5rem'
  };
};

// Pre-defined themes using the generator
export const defaultThemes: Record<string, ThemeConfig> = {
  slate: createTheme('slate', 'Slate', 'slate'),
  gray: createTheme('gray', 'Gray', 'gray'),
  zinc: createTheme('zinc', 'Zinc', 'zinc'),
  red: createTheme('red', 'Red', 'red'),
  orange: createTheme('orange', 'Orange', 'orange'),
  blue: createTheme('blue', 'Blue', 'blue'),
  green: createTheme('green', 'Green', 'green'),
  purple: createTheme('purple', 'Purple', 'purple')
};

// Available theme names for TypeScript
export type ThemeName = keyof typeof defaultThemes;

// Export theme names array for UI components
export const themeNames = Object.keys(defaultThemes) as ThemeName[];