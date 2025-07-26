"use client";
import { EnhancedColorToggle } from "@/components/enhanced-toggles";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";

export default function SettingsThemingPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Theming</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <div>
        <div className="font-medium">Theme</div>
        <p className="text-sm my-2">
          Select the theme you want to use in the dashboard
        </p>
        <div className="flex gap-8">
          <button
            onClick={() => setTheme("light")}
            className="w-[180px] text-left"
          >
            <div
              className={`space-y-2 rounded-sm bg-[#ecedef] p-3 mt-1
                ${theme === "light" ? "border-2 border-primary" : ""}`}
            >
              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Light
            </span>
          </button>

          <button
            onClick={() => setTheme("dark")}
            className="w-[180px] text-left"
          >
            <div
              className={`items-center rounded-md p-1 hover:bg-accent hover:text-accent-foreground
                ${theme === "dark" ? "border-2 border-primary" : "border-2 border-muted bg-popover"}`}
            >
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Dark
            </span>
          </button>
        </div>
      </div>
      <Separator />
      <p>Select your prefered Theme Color.</p>
      <div>
        <EnhancedColorToggle className="w-10 h-10" />
      </div>
    </div>
  );
}
