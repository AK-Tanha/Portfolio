import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="rounded-2xl border border-dashed border-default px-6 py-16 text-center">
      <p className="text-sm font-medium text-accent">404</p>
      <h2 className="mt-2 text-xl font-semibold text-body">Project not found</h2>
      <p className="mt-1 text-sm text-secondary">
        It may have been deleted from the database.
      </p>
      <Link
        href="/dashboard/works"
        className="mt-6 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2.5 text-sm font-medium text-white transition-all shadow-md hover:shadow-lg"
      >
        Back to projects
      </Link>
    </div>
  );
}