"use client";

export default function DashboardError({ error, reset }) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
      <h2 className="text-xl font-semibold text-body">Something went wrong</h2>
      <p className="mt-2 text-sm text-secondary break-words">
        {error?.message || "The dashboard could not load this page."}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2.5 text-sm font-medium text-white transition-all shadow-md hover:shadow-lg"
        >
          Try again
        </button>
        <a
          href="/dashboard"
          className="rounded-full border border-default px-6 py-2.5 text-sm font-medium text-secondary hover:text-accent transition-colors"
        >
          Back to overview
        </a>
      </div>
    </div>
  );
}