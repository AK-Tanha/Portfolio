import Link from "next/link";
import { notFound } from "next/navigation";
import { findWorkById } from "@/lib/works";
import Breadcrumbs from "@/app/dashboard/(main)/components/Breadcrumbs";
import PageHeader from "@/app/dashboard/(main)/components/PageHeader";
import WorkForm from "@/app/dashboard/(main)/components/WorkForm";
import DeleteWorkButton from "@/app/dashboard/(main)/components/DeleteWorkButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const work = await findWorkById(id);
  return { title: work ? `Edit ${work.title} | Dashboard` : "Project | Dashboard" };
}

export default async function EditWorkPage({ params }) {
  const { id } = await params;
  const work = await findWorkById(id);

  if (!work) notFound();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Projects", href: "/dashboard/works" },
          { label: work.title },
        ]}
      />
      <PageHeader
        title="Edit Project"
        description={
          <>
            Public URL:{" "}
            <Link href={`/works/${work.id}`} className="text-accent hover:underline break-all">
              /works/{work.id}
            </Link>
          </>
        }
      />

      <div className="rounded-2xl border border-default bg-card p-6 sm:p-8">
        <WorkForm mode="edit" initialWork={work} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
        <div className="mr-auto min-w-0">
          <p className="text-sm font-medium text-body">Delete this project</p>
          <p className="text-xs text-secondary">
            Permanently removes it and its uploaded image.
          </p>
        </div>
        <DeleteWorkButton id={work.id} title={work.title} redirectTo="/dashboard/works" />
      </div>
    </div>
  );
}