export default function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl sm:text-3xl font-ovo font-bold text-body break-words">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-secondary break-words">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}