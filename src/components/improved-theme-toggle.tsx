'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Check, Palette, Download, Upload, RotateCcw, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useImprovedTheme } from '@/context/improved-theme-provider';
import { primitiveColors } from '@/lib/design-tokens';

// Theme color preview component
const ThemeColorPreview = ({ 
  colorName, 
  isSelected, 
  onClick 
}: { 
  colorName: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const { theme } = useTheme();
  const colorValue = primitiveColors[colorName as keyof typeof primitiveColors];
  
  if (!colorValue) return null;
  
  const previewColor = theme === 'dark' ? colorValue[400] : colorValue[600];
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-3 w-full p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105',
        isSelected 
          ? 'border-primary bg-primary/5 shadow-md' 
          : 'border-border hover:border-primary/50 hover:bg-accent/50'
      )}
    >
      <div 
        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
        style={{ backgroundColor: previewColor }}
      />
      <span className="font-medium capitalize">{colorName}</span>
      {isSelected && (
        <Check className="w-4 h-4 ml-auto text-primary" />
      )}
    </button>
  );
};

// Advanced theme toggle with dropdown
export function ImprovedThemeToggle({ className }: { className?: string }) {
  const {
    themeColor,
    setThemeColor,
    customTheme,
    setCustomTheme,
    availableThemes,
    isLoading,
    resetToDefault,
    exportTheme,
    importTheme
  } = useImprovedTheme();
  
  const [isOpen, setIsOpen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle theme selection
  const handleThemeSelect = React.useCallback((themeName: string) => {
    setThemeColor(themeName as any);
    setIsOpen(false);
  }, [setThemeColor]);

  // Handle theme export
  const handleExport = React.useCallback(async () => {
    setIsExporting(true);
    try {
      const themeData = exportTheme();
      const blob = new Blob([themeData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `beautify-theme-${themeColor}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export theme:', error);
    } finally {
      setIsExporting(false);
    }
  }, [exportTheme, themeColor]);

  // Handle theme import
  const handleImport = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        const success = importTheme(content);
        if (success) {
          console.log('Theme imported successfully');
        } else {
          console.error('Failed to import theme');
        }
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [importTheme]);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Simple Select for basic usage */}
      <Select value={themeColor} onValueChange={handleThemeSelect}>
        <SelectTrigger className="w-[140px]">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <SelectValue placeholder="Theme" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Color Themes</SelectLabel>
            {availableThemes.map((theme) => {
              const colorValue = primitiveColors[theme as keyof typeof primitiveColors];
              return (
                <SelectItem key={theme} value={theme}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: colorValue?.[500] || '#000' }}
                    />
                    <span className="capitalize">{theme}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Advanced options dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Palette className="w-4 h-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex items-center gap-2">
            Theme Options
            {customTheme && (
              <Badge variant="secondary" className="text-xs">
                Custom
              </Badge>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleExport} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export Theme'}
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Import Theme
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={resetToDefault}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden file input for theme import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
}

// Grid-based theme selector for better UX
export function ThemeColorGrid({ className }: { className?: string }) {
  const { themeColor, setThemeColor, availableThemes } = useImprovedTheme();

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5" />
        <h3 className="font-semibold">Choose Theme Color</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {availableThemes.map((theme) => (
          <ThemeColorPreview
            key={theme}
            colorName={theme}
            isSelected={themeColor === theme}
            onClick={() => setThemeColor(theme)}
          />
        ))}
      </div>
    </div>
  );
}

// Compact theme toggle for headers/navbars
export function CompactThemeToggle({ className }: { className?: string }) {
  const { themeColor, setThemeColor, availableThemes } = useImprovedTheme();
  const { theme } = useTheme();
  
  const currentColor = primitiveColors[themeColor as keyof typeof primitiveColors];
  const displayColor = theme === 'dark' ? currentColor?.[400] : currentColor?.[600];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={cn('gap-2', className)}>
          <div 
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: displayColor }}
          />
          <span className="capitalize hidden sm:inline">{themeColor}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme Colors</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableThemes.map((theme) => {
          const colorValue = primitiveColors[theme as keyof typeof primitiveColors];
          const previewColor = theme === 'dark' ? colorValue?.[400] : colorValue?.[600];
          
          return (
            <DropdownMenuItem
              key={theme}
              onClick={() => setThemeColor(theme)}
              className="flex items-center gap-2"
            >
              <div 
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: previewColor }}
              />
              <span className="capitalize">{theme}</span>
              {themeColor === theme && <Check className="w-4 h-4 ml-auto" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Export the main component as default
export default ImprovedThemeToggle;

// Named exports for backward compatibility
export { ImprovedThemeToggle as AdvancedThemeToggle };
export { ThemeColorPreview };
export { ThemeColorGrid as ThemeSelector };