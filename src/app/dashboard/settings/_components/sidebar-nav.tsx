"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavProps {
  items: {
    href: string;
    title: string;
  }[];
  pathname: string | null;
}

export function SidebarNav({ items, pathname }: SidebarNavProps) {
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
