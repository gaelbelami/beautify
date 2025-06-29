// Legacy theme system - DEPRECATED
// This file is kept for backward compatibility only
// New implementations should use @/lib/design-tokens and @/lib/theme-utils

import { defaultThemes, ThemeConfig } from './design-tokens';
import { themeUtils } from './theme-utils';

// Legacy interfaces for backward compatibility
interface ChartColors {
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
}

interface ThemeColor {
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
    radius?: string;
    chart?: ChartColors;
}

interface Themes {
    [key: string]: {
        light: ThemeColor;
        dark: ThemeColor;
    };
}

// Convert new theme format to legacy format for backward compatibility
function convertToLegacyFormat(themeConfig: ThemeConfig): { light: ThemeColor; dark: ThemeColor } {
    const convertColors = (colors: any): ThemeColor => ({
        background: colors.background,
        foreground: colors.foreground,
        card: colors.card,
        cardForeground: colors.cardForeground,
        popover: colors.popover,
        popoverForeground: colors.popoverForeground,
        primary: colors.primary,
        primaryForeground: colors.primaryForeground,
        secondary: colors.secondary,
        secondaryForeground: colors.secondaryForeground,
        muted: colors.muted,
        mutedForeground: colors.mutedForeground,
        accent: colors.accent,
        accentForeground: colors.accentForeground,
        destructive: colors.destructive,
        destructiveForeground: colors.destructiveForeground,
        border: colors.border,
        input: colors.input,
        ring: colors.ring,
        radius: themeConfig.radius,
        chart: colors.chart
    });

    return {
        light: convertColors(themeConfig.colors.light),
        dark: convertColors(themeConfig.colors.dark)
    };
}

// Generate legacy themes object from new design tokens
export const themes: Themes = Object.entries(defaultThemes).reduce((acc, [key, themeConfig]) => {
    acc[key.charAt(0).toUpperCase() + key.slice(1)] = convertToLegacyFormat(themeConfig);
    return acc;
}, {} as Themes);

// Legacy theme application function - DEPRECATED
// Use themeUtils.applyTheme instead
export function setGlobalThemeColorTheme(
  theme: string | number,
  applyTheme = true
): void {
  console.warn('setGlobalThemeColorTheme is deprecated. Use themeUtils.applyTheme instead.');
  
  // Convert new theme format to legacy format for backward compatibility
  const themeKey = typeof theme === 'string' ? theme.toLowerCase() : String(theme).toLowerCase();
  const legacyTheme = {
    name: themeKey,
    light: newThemes[themeKey]?.light || {},
    dark: newThemes[themeKey]?.dark || {},
  };
}

   