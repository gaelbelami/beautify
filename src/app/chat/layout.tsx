"use client";
import { AppSidebar } from "@/components/global/app-sidebar";
import { cn } from "@/lib/utils";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col md:flex-row w-full flex-1 mx-auto overflow-hidden",
        "h-screen md:p-2 md:rounded-md",
      )}
    >
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-300/60 via-gray-100/40
            to-indigo-300/60 dark:from-purple-900/30 dark:via-black/20 dark:to-pink-900/30"
        />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20
            rounded-full blur-3xl"
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/30 dark:bg-pink-600/20
            rounded-full blur-3xl"
        />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full flex-1">
        <AppSidebar />
        <main className="flex flex-1 flex-col md:flex-row pb-4">
          <div
            className="md:rounded-2xl bg-white/40 dark:bg-neutral-900/70 backdrop-blur-xl shadow-lg
              flex flex-col gap-2 flex-1 w-full h-full overflow-hidden"
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
