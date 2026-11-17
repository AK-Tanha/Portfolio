"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    href: "/dashboard/works",
    label: "Projects",
    icon: (
      <>
        <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4l2 2.5h7A1.5 1.5 0 0 1 19 10v7.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 3 17.5z" />
      </>
    ),
  },
];

const isActive = (pathname, href) =>
  href === "/dashboard" ? pathname === href : pathname.startsWith(`${href}/`);

const Icon = ({ children, className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    {children}
  </svg>
);

export default function DashboardShell({ children }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Without this the rejection is swallowed by the event handler and the
      // user is left on the dashboard with no feedback at all.
      window.alert("Sign out failed. Please check your connection and try again.");
      return;
    }
    router.replace("/dashboard/login");
    router.refresh();
  };

  const navLinkClass = (active) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
      active
        ? "bg-accent/10 text-accent"
        : "text-secondary hover:text-accent hover:bg-accent/5"
    }`;

  return (
    <div className="min-h-screen bg-body">
      {/* Mobile backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-default bg-card transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/dashboard" className="text-lg font-ovo font-bold gradient-text">
            Dashboard
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="rounded-lg p-1.5 text-secondary hover:text-accent lg:hidden"
          >
            <Icon className="w-5 h-5">
              <path d="M6 6l12 12M18 6L6 18" />
            </Icon>
          </button>
        </div>

        <div className="px-4 pb-4">
          <Link
            href="/dashboard/works/new"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2.5 text-sm font-medium text-white transition-all shadow-md hover:shadow-lg"
          >
            <Icon className="w-4 h-4">
              <path d="M12 5v14M5 12h14" />
            </Icon>
            New Project
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-4">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Menu
          </p>
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClass(isActive(pathname, link.href))}>
                  <Icon>{link.icon}</Icon>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-default p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-secondary hover:text-accent hover:bg-accent/5 transition-colors"
          >
            <Icon>
              <path d="M14 4h6v6" />
              <path d="M20 4l-9 9" />
              <path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
            </Icon>
            View site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Icon>
              <path d="M15 17l5-5-5-5" />
              <path d="M20 12H9" />
              <path d="M9 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20H9" />
            </Icon>
            Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-default bg-card/80 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="rounded-lg p-1.5 text-secondary hover:text-accent lg:hidden"
          >
            <Icon className="w-5 h-5">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </Icon>
          </button>
          <span className="text-sm font-medium text-secondary">
            {links.find((link) => isActive(pathname, link.href))?.label || "Projects"}
          </span>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}