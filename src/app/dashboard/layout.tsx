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
        `flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full
        flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden`,
        "h-screen md:p-2 md:rounded-md",
      )}
    >
      <AppSidebar />
      <main className="flex flex-1 flex-col md:flex-row">
        <div
          className="p-4 md:p-10 md:rounded-2xl md:border border-neutral-200 dark:border-neutral-700
            bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-auto"
        >
          {children}
        </div>
      </main>
    </div>
  );
}
