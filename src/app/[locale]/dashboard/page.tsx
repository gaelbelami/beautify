"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/global/app-sidebar";

export default function Dashboard() {
  return (
    <div
      className={cn(
        `rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full
        flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden`,
        "h-screen",
      )}
    >
      <AppSidebar />
      <div className="flex flex-1">
        <div
          className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700
            bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full"
        >
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`skeleton-header-${index}`}
                className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
              />
            ))}
          </div>
          <div className="flex gap-2 flex-1">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={`skeleton-content-${index}`}
                className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
