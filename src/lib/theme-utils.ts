// Optimized theme utilities with performance enhancements

import { ThemeConfig, SemanticColors, ChartColors } from './design-tokens';

// Theme application performance optimizations
class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: string | null = null;
  private themeCache = new Map<string, ThemeConfig>();
  private isApplying = false;
  private pendingTheme: string | null = null;

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  // Batch DOM updates for better performance
  private batchDOMUpdates(updates: () => void): void {
    if (this.isApplying) {
      return;
    }
    
    this.isApplying = true;
    requestAnimationFrame(() => {
      updates();
      this.isApplying = false;
      
      // Apply pending theme if any
      if (this.pendingTheme && this.pendingTheme !== this.currentTheme) {
        const pendingTheme = this.pendingTheme;
        this.pendingTheme = null;
        this.applyTheme(pendingTheme, 'light'); // Default to light, will be corrected by theme provider
      }
    });
  }

  // Convert color values to HSL format if needed
  private normalizeColorValue(value: string): string {
    // If already in HSL format, return as is
    if (value.includes('%')) {
      return value;
    }
    
    // Convert hex to HSL if needed (simplified for common cases)
    if (value.startsWith('#')) {
      return this.hexToHSL(value);
    }
    
    return value;
  }

  // Simple hex to HSL conversion
  private hexToHSL(hex: string): string {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  }

  // Apply theme colors to CSS custom properties
  applyTheme(themeName: string, mode: 'light' | 'dark', themeConfig?: ThemeConfig): void {
    if (this.isApplying) {
      this.pendingTheme = themeName;
      return;
    }

    this.batchDOMUpdates(() => {
      const root = document.documentElement;
      
      if (!themeConfig) {
        console.warn(`Theme '${themeName}' not found`);
        return;
      }

      const colors = themeConfig.colors[mode];
      
      // Apply semantic colors
      Object.entries(colors).forEach(([key, value]) => {
        if (key === 'chart') {
          // Handle chart colors separately
          Object.entries(value as ChartColors).forEach(([chartKey, chartValue]) => {
            root.style.setProperty(`--chart-${chartKey.replace('chart', '')}`, this.normalizeColorValue(chartValue));
          });
        } else {
          // Convert camelCase to kebab-case for CSS variables
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          root.style.setProperty(`--${cssKey}`, this.normalizeColorValue(value as string));
        }
      });
      
      // Apply border radius
      if (themeConfig.radius) {
        root.style.setProperty('--radius', themeConfig.radius);
      }
      
      this.currentTheme = themeName;
    });
  }

  // Get current theme
  getCurrentTheme(): string | null {
    return this.currentTheme;
  }

  // Cache theme for faster subsequent loads
  cacheTheme(themeName: string, themeConfig: ThemeConfig): void {
    this.themeCache.set(themeName, themeConfig);
  }

  // Get cached theme
  getCachedTheme(themeName: string): ThemeConfig | undefined {
    return this.themeCache.get(themeName);
  }

  // Preload themes for better performance
  async preloadThemes(themeNames: string[]): Promise<void> {
    const { defaultThemes } = await import('./design-tokens');
    
    themeNames.forEach(name => {
      if (defaultThemes[name]) {
        this.cacheTheme(name, defaultThemes[name]);
      }
    });
  }
}

// Singleton instance
export const themeManager = ThemeManager.getInstance();

// Utility functions for theme operations
export const themeUtils = {
  // Apply theme with performance optimizations
  applyTheme: (themeName: string, mode: 'light' | 'dark', themeConfig?: ThemeConfig) => {
    themeManager.applyTheme(themeName, mode, themeConfig);
  },

  // Get current theme
  getCurrentTheme: () => themeManager.getCurrentTheme(),

  // Preload themes
  preloadThemes: (themeNames: string[]) => themeManager.preloadThemes(themeNames),

  // Generate CSS variables string for SSR
  generateCSSVariables: (themeConfig: ThemeConfig, mode: 'light' | 'dark'): string => {
    const colors = themeConfig.colors[mode];
    const variables: string[] = [];
    
    Object.entries(colors).forEach(([key, value]) => {
      if (key === 'chart') {
        Object.entries(value as ChartColors).forEach(([chartKey, chartValue]) => {
          variables.push(`--chart-${chartKey.replace('chart', '')}: ${chartValue};`);
        });
      } else {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        variables.push(`--${cssKey}: ${value};`);
      }
    });
    
    if (themeConfig.radius) {
      variables.push(`--radius: ${themeConfig.radius};`);
    }
    
    return variables.join('\n');
  },

  // Debounced theme application for rapid changes
  debouncedApplyTheme: (() => {
    let timeoutId: NodeJS.Timeout;
    return (themeName: string, mode: 'light' | 'dark', themeConfig?: ThemeConfig, delay = 100) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        themeManager.applyTheme(themeName, mode, themeConfig);
      }, delay);
    };
  })(),

  // Validate theme configuration
  validateTheme: (themeConfig: ThemeConfig): boolean => {
    const requiredKeys = [
      'background', 'foreground', 'card', 'cardForeground',
      'primary', 'primaryForeground', 'secondary', 'secondaryForeground'
    ];
    
    const lightColors = themeConfig.colors.light;
    const darkColors = themeConfig.colors.dark;
    
    return requiredKeys.every(key => 
      lightColors[key as keyof SemanticColors] && 
      darkColors[key as keyof SemanticColors]
    );
  },

  // Create theme from primary color
  createCustomTheme: async (name: string, primaryColor: string): Promise<ThemeConfig> => {
    const { createTheme, primitiveColors } = await import('./design-tokens');
    
    // Find closest primitive color or use blue as fallback
    const colorKey = Object.keys(primitiveColors).find(key => 
      primaryColor.toLowerCase().includes(key)
    ) as keyof typeof primitiveColors || 'blue';
    
    return createTheme(name, name.charAt(0).toUpperCase() + name.slice(1), colorKey);
  }
};

// Export for backward compatibility
export default themeUtils.applyTheme;