"use client";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { SidebarNav } from "./_components/sidebar-nav";
import { usePathname } from "next/navigation";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { useTranslations } from "next-intl";

// export const metadata: Metadata = {
//   title: "Forms",
//   description: "Advanced form example using react-hook-form and Zod.",
// };

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const t = useTranslations("settings");
  return (
    <div className="space-y-6 p-4 pb-16 md:p-10">
      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">{t("title")}</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          {t("description")}
        </p>
      </div>
      <Separator className="my-4 md:my-6 bg-border/50" />
      <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav
            items={BEAUTIFY_CONSTANTS.sideBarNavItems}
            pathname={pathname}
          />
        </aside>
        <div className="flex-1 lg:max-w-3xl">
          <div className="space-y-6 rounded-xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-black/20 p-4 md:p-6 backdrop-blur-lg shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
