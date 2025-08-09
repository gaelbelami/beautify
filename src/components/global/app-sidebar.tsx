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
import { MENU_ITEMS } from "@/constants/sidebar";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/authStore";
import { useCurrentUser } from "@/hooks/api/useAuth";
import { GrapeIcon, LogOut, Settings, User } from "lucide-react";
import { BEAUTIFY_CONSTANTS } from "@/constants";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user: authUser } = useAuthStore();
  const { data: currentUser } = useCurrentUser();

  // Use current user data from React Query or fallback to auth store
  const user = currentUser || authUser;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleProfileClick = () => {
    router.push("/dashboard/settings");
  };

  const handleAccountClick = () => {
    router.push("/dashboard/settings/account");
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
      <SidebarBody
        className="justify-between gap-10 bg-white/40 dark:bg-neutral-900/60 border-white/20
          dark:border-white/10"
      >
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}

          <div className="mt-8 flex flex-col gap-2">
            {MENU_ITEMS.map((item, idx) => {
              // Check if current path starts with link href (for parent routes)
              const isParentActive = pathname.startsWith(item.href);
              // Check exact match for non-parent links
              const isExactMatch = pathname === item.href;

              const isActive =
                item.href === "/dashboard/settings"
                  ? isParentActive
                  : isExactMatch;

              const linkItem = {
                label: item.label,
                href: item.href,
                icon: item.icon ? <item.icon className="h-5 w-5" /> : undefined,
              };

              return (
                <SidebarLink
                  key={idx}
                  link={linkItem}
                  label={translate(item.label)}
                  className={cn(
                    "transition-colors hover:text-primary",
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent cursor-pointer
                    transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {open && (
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">
                        {user.name}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </span>
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAccountClick}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SidebarLink
              link={{
                label: "Guest User",
                href: "/login",
                icon: <IconUser />,
              }}
            />
          )}
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
