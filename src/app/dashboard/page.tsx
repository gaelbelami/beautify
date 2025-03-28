export default function DashboardPage() {
  return (
    <>
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
    </>
  );
}
