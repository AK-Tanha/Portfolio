"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteWorkButton({ id, title, redirectTo }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    try {
      const response = await fetch(`/api/works/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (response.ok) {
        if (redirectTo) {
          router.push(redirectTo);
        }
        router.refresh();
      } else {
        const data = await response.json().catch(() => ({}));
        window.alert(data.error || "Failed to delete project.");
      }
    } catch {
      window.alert("Network error. Please try again.");
    } finally {
      setPending(false);
      setConfirming(false);
    }
  };

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-full border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
      >
        Delete
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-secondary">
        Delete {title ? `"${title}"` : "this project"}?
      </span>
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-60"
      >
        {pending ? "Deleting…" : "Confirm"}
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        disabled={pending}
        className="rounded-full border border-default px-3 py-1.5 text-xs font-medium text-secondary hover:text-accent"
      >
        Cancel
      </button>
    </div>
  );
}