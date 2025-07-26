export type ThemeColors = 
  | "Orange"
  | "Slate"
  | "Neutral"
  | "Stone"
  | "Red"
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}
