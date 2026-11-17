import Breadcrumbs from "../../components/Breadcrumbs";
import PageHeader from "../../components/PageHeader";
import WorkForm from "@/app/dashboard/(main)/components/WorkForm";

export const metadata = { title: "New Project | Dashboard" };

export default function NewWorkPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Projects", href: "/dashboard/works" },
          { label: "New" },
        ]}
      />
      <PageHeader
        title="New Project"
        description="This project will appear on your portfolio once saved."
      />

      <div className="rounded-2xl border border-default bg-card p-6 sm:p-8">
        <WorkForm mode="create" />
      </div>
    </div>
  );
}