"use client";

// Legacy theme toggle - DEPRECATED
// This file is kept for backward compatibility only
// New implementations should use @/components/improved-theme-toggle

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "./../lib/utils";
import { useThemeContext } from "./../context/theme-data-provider";
import ThemeModeToggle from "./theme-mode-toggle";
import { Palette } from "lucide-react";
import { ThemeColors } from '@/types/theme-types';
import { AdvancedThemeToggle, ThemeColorPreview, ThemeSelector } from './improved-theme-toggle';

// Legacy theme colors for backward compatibility
export const availableThemeColors = [
  { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
  { name: "Slate", light: "bg-slate-500", dark: "bg-slate-700" },
  { name: "Gray", light: "bg-gray-500", dark: "bg-gray-700" },
  { name: "Zinc", light: "bg-zinc-500", dark: "bg-zinc-700" },
  { name: "Neutral", light: "bg-neutral-500", dark: "bg-neutral-700" },
  { name: "Stone", light: "bg-stone-500", dark: "bg-stone-700" },
  { name: "Red", light: "bg-red-500", dark: "bg-red-700" },
  { name: "Amber", light: "bg-amber-500", dark: "bg-amber-700" },
  { name: "Yellow", light: "bg-yellow-500", dark: "bg-yellow-700" },
  { name: "Lime", light: "bg-lime-500", dark: "bg-lime-700" },
  { name: "Green", light: "bg-green-500", dark: "bg-green-700" },
  { name: "Emerald", light: "bg-emerald-500", dark: "bg-emerald-700" },
  { name: "Teal", light: "bg-teal-500", dark: "bg-teal-700" },
  { name: "Cyan", light: "bg-cyan-500", dark: "bg-cyan-700" },
  { name: "Sky", light: "bg-sky-500", dark: "bg-sky-700" },
  { name: "Blue", light: "bg-blue-500", dark: "bg-blue-700" },
  { name: "Indigo", light: "bg-indigo-500", dark: "bg-indigo-700" },
  { name: "Violet", light: "bg-violet-500", dark: "bg-violet-700" },
  { name: "Purple", light: "bg-purple-500", dark: "bg-purple-700" },
  { name: "Fuchsia", light: "bg-fuchsia-500", dark: "bg-fuchsia-700" },
  { name: "Pink", light: "bg-pink-500", dark: "bg-pink-700" },
  { name: "Rose", light: "bg-rose-500", dark: "bg-rose-700" },
];

// Legacy component that wraps the new improved theme toggle
export function ThemeColorToggle({ className }: { className?: string }) {
  console.warn('ThemeColorToggle is deprecated. Use AdvancedThemeToggle from @/components/improved-theme-toggle instead.');
  
  // Use the new improved theme toggle with legacy styling
  return (
    <AdvancedThemeToggle className={className} />
  );
}

// Legacy implementation kept for reference (commented out)
/*
export function LegacyThemeColorToggle({ className }: { className?: string }) {
  const { themeColor, setThemeColor } = useThemeContext();
  const { theme } = useTheme();

  const createSelectItem = () => {
    return availableThemeColors.map(({ name, light, dark }) => (
      <SelectItem key={name} value={name}>
        <div className="flex items-center space-x-2">
          <div
            className={cn(
              "rounded-full",
              "w-[20px]",
              "h-[20px]",
              theme == "light" ? light : dark,
            )}
          ></div>
          <div className="text-sm">{name}</div>
        </div>
      </SelectItem>
    ));
  };
  
  return (
    <div>
      <Select
        onValueChange={(value) => setThemeColor(value as ThemeColors)}
        defaultValue={themeColor}
      >
        <SelectTrigger
          className={cn(
            "w-[] ring-offset-transparent focus:ring-transparent",
            className,
          )}
        >
          <SelectValue placeholder="Select Color">
            {
              availableThemeColors.find((color) => color.name === themeColor)
                ?.name
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-[500px]">
          <SelectGroup>
            <SelectLabel className="py-2">Theme Color</SelectLabel>
            <div className="grid grid-cols-4 gap-2">{createSelectItem()}</div>
          </SelectGroup>
          <div className="pl-8 my-2">
            <div className="py-1.5 pr-2 text-sm font-semibold">Theme Mode</div>
            <ThemeModeToggle />
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
*/

// Re-export new components for easy migration
export { AdvancedThemeToggle, ThemeColorPreview, ThemeSelector };
