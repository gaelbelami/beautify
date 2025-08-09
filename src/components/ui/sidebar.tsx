"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

// In components/ui/sidebar.tsx
export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          `h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-900
          rounded-2xl shadow-xl mr-4 w-[300px] shrink-0 relative`, // Added relative for positioning
          className,
        )}
        animate={{
          width: animate ? (open ? "300px" : "70px") : "300px",
        }}
        // Remove onMouseEnter and onMouseLeave
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          `h-14 px-4 py-2 flex flex-row md:hidden items-center justify-between
          bg-neutral-100 dark:bg-neutral-800 w-full border-b border-neutral-200
          dark:border-neutral-700`,
        )}
        {...props}
      >
        <div className="flex justify-between items-center z-20 w-full">
          <div className="flex items-center space-x-2">
            <div
              className="h-6 w-7 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg
                rounded-bl-sm shrink-0 flex justify-center items-center"
            >
              <div className="w-2.5 h-2.5 bg-white dark:bg-black rounded-full" />
            </div>
            <span className="font-medium text-black dark:text-white text-sm">
              Beautify
            </span>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <IconMenu2 className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-[90]"
                onClick={() => setOpen(false)}
              />
              {/* Sidebar */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className={cn(
                  `fixed left-0 top-0 h-full w-80 bg-white dark:bg-neutral-900 p-6 z-[100] flex
                  flex-col justify-between shadow-2xl border-r border-neutral-200
                  dark:border-neutral-700`,
                  className,
                )}
              >
                <button
                  className="absolute right-4 top-4 z-50 p-2 rounded-lg hover:bg-neutral-100
                    dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => setOpen(!open)}
                  aria-label="Close menu"
                >
                  <IconX className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
                </button>
                <div className="mt-8">{children}</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  label,
  className,
  ...props
}: {
  link: Links;
  label?: string;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2 px-1 ",
        className,
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1
          group-hover/sidebar:font-bold transition duration-150 whitespace-pre
          inline-block !p-0 !m-0"
      >
        {label}
      </motion.span>
    </Link>
  );
};
