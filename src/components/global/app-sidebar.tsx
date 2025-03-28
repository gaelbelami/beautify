"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconChevronLeft,
  IconChevronRight,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MenuItems } from "@/constants/sidebar";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/authStore";
import { GrapeIcon } from "lucide-react";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  console.log(pathname);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    // Optionally redirect if not handled by auth store
  };
  // Initialize state with localStorage value
  const translate = useTranslations("");
  const [open, setOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-open");
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(open));
  }, [open]);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}

          <div className="mt-8 flex flex-col gap-2">
            {MenuItems.map((link, idx) => {
              // Check if current path starts with link href (for parent routes)
              const isParentActive = pathname.startsWith(link.href);
              // Check exact match for non-parent links
              const isExactMatch = pathname === link.href;

              const isActive =
                link.href === "/dashboard/settings"
                  ? isParentActive
                  : isExactMatch;

              return (
                <SidebarLink
                  key={idx}
                  link={link}
                  label={translate(link.label)}
                  className={cn(
                    "transition-colors hover:text-white",
                    isActive
                      ? "text-primary bg-primary/10 rounded-md p-2"
                      : "text-muted-foreground",
                  )}
                />
              );
            })}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "John Doe",
              href: "#",
              icon: <IconUser />,
            }}
          />
        </div>

        {/* Floating Toggle Button */}
        <motion.div
          className="absolute top-4 right-2 z-50"
          initial={{ x: 0 }}
          animate={{
            x: open ? -16 : 20,
            rotate: open ? 0 : 180,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.5,
          }}
        >
          <button
            // aria-label={translate("toggle")}
            onClick={() => setOpen(!open)}
            className={cn(
              "h-6 w-6 flex items-center justify-center rounded-full",
              "bg-background border border-border shadow-sm hover:bg-accent",
              "focus:outline-none focus:ring-2 focus:ring-primary",
            )}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <IconChevronLeft className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <IconChevronLeft className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </SidebarBody>
    </Sidebar>
  );
}

// Rest of your existing Logo components remain the same
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg
          rounded-bl-sm shrink-0 flex justify-center items-center"
      >
        <GrapeIcon className="w-3 h-3 text-secondary/80" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        {BEAUTIFY_CONSTANTS.projectName}
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg
          rounded-bl-sm shrink-0 flex justify-center items-center"
      >
        <GrapeIcon className="w-3 h-3 text-secondary/80" />
      </div>
    </Link>
  );
};
