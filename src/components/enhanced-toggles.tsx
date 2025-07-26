"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { primitiveColors } from "@/lib/design-tokens";

import { Moon, Sun, Palette, Globe, Check, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useImprovedTheme } from "@/context/theme-provider";
import { setUserLocale, Locale } from "@/services/locale";
import Image from "next/image";
import { useTransition } from "react";

// Enhanced Theme Mode Toggle
export function EnhancedThemeModeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={cn("w-10 h-10 p-0", className)}
        disabled
      >
        <div className="w-4 h-4 animate-pulse bg-muted rounded" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            `w-10 h-10 p-0 border-2 transition-all duration-200 hover:scale-105
            hover:border-primary/50`,
            className,
          )}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Theme Mode
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center justify-between cursor-pointer",
            theme === "light" && "bg-accent",
          )}
        >
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Light
          </div>
          {theme === "light" && <Check className="w-4 h-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center justify-between cursor-pointer",
            theme === "dark" && "bg-accent",
          )}
        >
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            Dark
          </div>
          {theme === "dark" && <Check className="w-4 h-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center justify-between cursor-pointer",
            theme === "system" && "bg-accent",
          )}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-slate-400 to-slate-600" />
            System
          </div>
          {theme === "system" && <Check className="w-4 h-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Enhanced Color Theme Toggle
export function EnhancedColorToggle({ className }: { className?: string }) {
  const { themeColor, setThemeColor, availableThemes } = useImprovedTheme();
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="lg"
        className={cn("w-10 h-10 p-0", className)}
        disabled
      >
        <div className="w-4 h-4 animate-pulse bg-muted rounded-full" />
      </Button>
    );
  }

  const currentColorValue =
    primitiveColors[themeColor as keyof typeof primitiveColors];
  const displayColor =
    theme === "dark" ? currentColorValue?.[400] : currentColorValue?.[600];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            `w-10 h-10 p-0 border-2 transition-all duration-200 hover:scale-105
            hover:border-primary/50`,
            className,
          )}
        >
          <div
            className="w-4 h-4 rounded-full border border-white/20"
            style={{ backgroundColor: displayColor }}
          />
          <span className="sr-only">Change color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Color Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-4 gap-2 p-2">
          {availableThemes.map((themeName) => {
            const colorValue =
              primitiveColors[themeName as keyof typeof primitiveColors];
            const buttonColor =
              theme === "dark" ? colorValue?.[400] : colorValue?.[600];

            return (
              <button
                key={themeName}
                onClick={() => {
                  console.log("🎨 Header Theme Toggle Clicked:", {
                    selectedTheme: themeName,
                    currentTheme: themeColor,
                    source: "EnhancedColorToggle",
                    timestamp: new Date().toISOString(),
                  });
                  setThemeColor(themeName);
                }}
                className={cn(
                  `relative w-8 h-8 rounded-full border-2 transition-all duration-200
                  hover:scale-110`,
                  themeColor === themeName
                    ? "border-foreground shadow-lg scale-110"
                    : "border-white/20 hover:border-foreground/50",
                )}
                style={{ backgroundColor: buttonColor }}
                title={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              >
                {themeColor === themeName && (
                  <Check className="w-3 h-3 text-white absolute inset-0 m-auto" />
                )}
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Enhanced Locale Switcher
const localeData = {
  en: { name: "English", flag: "🇺🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  nl: { name: "Nederlands", flag: "🇳🇱" },
  zh: { name: "中文", flag: "🇨🇳" },
};

export function EnhancedLocaleSwitcher({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const currentLocale = useLocale();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (locale: string) => {
    startTransition(() => {
      setUserLocale(locale as Locale);
      router.refresh();
    });
  };

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={cn("w-10 h-10 p-0", className)}
        disabled
      >
        <div className="w-4 h-4 animate-pulse bg-muted rounded" />
      </Button>
    );
  }

  const currentLocaleData =
    localeData[currentLocale as keyof typeof localeData];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            `w-auto h-10 px-3 border-2 transition-all duration-200 hover:scale-105
            hover:border-primary/50`,
            isPending && "opacity-50 cursor-not-allowed",
            className,
          )}
          disabled={isPending}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentLocaleData?.flag}</span>
            <span className="text-sm font-medium uppercase hidden sm:block">
              {currentLocale}
            </span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {localeData && typeof localeData === "object"
          ? Object.entries(localeData).map(([locale, data]) => (
              <DropdownMenuItem
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={cn(
                  "flex items-center justify-between cursor-pointer",
                  currentLocale === locale && "bg-accent",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{data.flag}</span>
                  <span className="font-medium">{data.name}</span>
                </div>
                {currentLocale === locale && <Check className="w-4 h-4" />}
              </DropdownMenuItem>
            ))
          : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Combined Toggle Group
export function EnhancedToggles({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <EnhancedThemeModeToggle />
      <EnhancedColorToggle />
      <EnhancedLocaleSwitcher />
    </div>
  );
}
