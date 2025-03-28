"use client";
import { AppSidebar } from "@/components/global/app-sidebar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        `rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full
        flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden`,
        "h-screen p-2",
      )}
    >
      <AppSidebar />
      <main className="flex flex-1">
        <div
          className="p-2 md:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-700
            bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full"
        >
          {children}
        </div>
      </main>
    </div>
  );
}
