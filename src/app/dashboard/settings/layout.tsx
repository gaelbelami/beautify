"use client";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { SidebarNav } from "./_components/sidebar-nav";
import { usePathname } from "next/navigation";
import { BEAUTIFY_CONSTANTS } from "@/constants";

// export const metadata: Metadata = {
//   title: "Forms",
//   description: "Advanced form example using react-hook-form and Zod.",
// };

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-1">
        {" "}
        {/* Increased from 0.5 for better spacing */}
        <h2 className="text-3xl font-bold tracking-tighter">Settings</h2>
        <p className="text-muted-foreground text-base">
          {" "}
          {/* Increased text size */}
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6 bg-border/50" />{" "}
      {/* Added opacity for consistency */}
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav
            items={BEAUTIFY_CONSTANTS.sideBarNavItems}
            pathname={pathname}
          />
        </aside>
        <div className="flex-1 lg:max-w-3xl">
          {" "}
          {/* Increased max width */}
          <div className="space-y-6 rounded-xl border bg-background/5 p-6 backdrop-blur-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
