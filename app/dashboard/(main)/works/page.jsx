import Link from "next/link";
import Image from "next/image";
import { getStoredWorks } from "@/lib/works";
import PageHeader from "../components/PageHeader";
import DeleteWorkButton from "@/app/dashboard/(main)/components/DeleteWorkButton";

export const metadata = { title: "Projects | Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardWorksPage() {
  const works = await getStoredWorks();

  return (
    <div>
      <PageHeader
        title="Projects"
        description={`${works.length} project${works.length === 1 ? "" : "s"} published.`}
        actions={
          <Link
            href="/dashboard/works/new"
            className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-5 py-2.5 text-sm transition-all shadow-md hover:shadow-lg"
          >
            + New Project
          </Link>
        }
      />

      {works.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-default px-6 py-16 text-center">
          <p className="text-body font-medium">No projects yet</p>
          <p className="mt-1 text-sm text-secondary">
            Create your first project to see it on the portfolio.
          </p>
          <Link
            href="/dashboard/works/new"
            className="mt-6 inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2.5 text-sm font-medium text-white transition-all shadow-md hover:shadow-lg"
          >
            + New Project
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3">
          {works.map((work) => (
            <li
              key={work.id}
              className="group flex flex-col gap-4 rounded-2xl border border-default bg-card p-4 transition-colors hover:border-accent/30 sm:flex-row sm:items-center sm:gap-5"
            >
              <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl border border-default bg-accent/5 sm:h-20 sm:w-28">
                {work.bgImage ? (
                  <Image
                    src={work.bgImage}
                    alt={work.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 112px"
                    className="object-cover object-top"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs text-muted">
                    No image
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    {work.category}
                  </span>
                  {work.live_link && (
                    <a
                      href={work.live_link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-secondary transition-colors hover:text-accent"
                    >
                      Live site
                    </a>
                  )}
                </div>
                <p className="mt-1.5 truncate font-medium text-body">{work.title}</p>
                <p className="truncate text-xs text-muted">/works/{work.id}</p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/dashboard/works/${work.id}`}
                  className="rounded-full border border-default px-4 py-1.5 text-center text-xs font-medium text-secondary transition-colors hover:border-accent/40 hover:text-accent"
                >
                  Edit
                </Link>
                <DeleteWorkButton id={work.id} title={work.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}