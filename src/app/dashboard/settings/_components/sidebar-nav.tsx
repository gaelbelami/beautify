"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface SidebarNavProps {
  items: {
    href: string;
    title: string;
  }[];
  pathname: string | null;
}

export function SidebarNav({ items, pathname }: SidebarNavProps) {
  const t = useTranslations();
  return (
    <nav className="flex overflow-x-auto space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:overflow-x-visible">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {t(item.title)}
          </Link>
        );
      })}
    </nav>
  );
}
