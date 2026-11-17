export default function DashboardLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <div className="space-y-2">
        <div className="h-8 w-48 rounded-lg bg-accent/10 animate-pulse" />
        <div className="h-4 w-72 rounded-lg bg-accent/5 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-24 rounded-2xl border border-default bg-card animate-pulse"
          />
        ))}
      </div>

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-24 rounded-2xl border border-default bg-card animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}