import Link from "next/link";
import { getStoredWorks, getCategorySummary } from "@/lib/works";
import { connectToDatabase } from "@/lib/mongodb";
import PageHeader from "./components/PageHeader";

export const metadata = { title: "Overview | Dashboard" };
export const dynamic = "force-dynamic";

async function getDatabaseStatus() {
  try {
    await connectToDatabase();
    return { connected: true, message: "Connected to MongoDB" };
  } catch (error) {
    return { connected: false, message: error.message };
  }
}

export default async function DashboardOverview() {
  const [works, categories, db] = await Promise.all([
    getStoredWorks(),
    getCategorySummary(),
    getDatabaseStatus(),
  ]);

  const stats = [
    { label: "Projects", value: works.length },
    { label: "Categories", value: Object.keys(categories).length },
    {
      label: "Live links",
      value: works.filter((work) => work.live_link).length,
    },
    { label: "Highlights", value: works.reduce((sum, w) => sum + (w.features?.length || 0), 0) },
  ];

  const recent = [...works]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        description="Manage the projects shown on your portfolio."
        actions={
          <Link
            href="/dashboard/works/new"
            className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-5 py-2.5 text-sm transition-all shadow-md hover:shadow-lg"
          >
            + New Project
          </Link>
        }
      />

      <div
        className={`rounded-2xl border px-5 py-4 text-sm ${
          db.connected
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
        }`}
      >
        <strong className="font-semibold">Database:</strong> {db.message}
        {(!db.connected || works.length === 0) && (
          <span className="ml-1">
            — the public site is showing sample content from{" "}
            <code>lib/seed-works.js</code>.
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-default rounded-2xl p-5">
            <p className="text-sm text-secondary">{stat.label}</p>
            <p className="mt-1 text-3xl font-ovo font-bold text-body">{stat.value}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">By category</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categories).map(([category, count]) => (
            <span
              key={category}
              className="rounded-full border border-accent/20 bg-accent/10 text-accent px-4 py-1.5 text-sm font-medium"
            >
              {category} · {count}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">Recently updated</h2>
        <ul className="bg-card border border-default rounded-2xl divide-y divide-default">
          {recent.map((work) => (
            <li key={work.id}>
              <Link
                href={`/dashboard/works/${work.id}`}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-accent/5 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-medium text-body truncate">{work.title}</p>
                  <p className="text-xs text-secondary truncate">/{work.id}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">
                  {work.updatedAt
                    ? new Date(work.updatedAt).toLocaleDateString()
                    : "not saved yet"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}