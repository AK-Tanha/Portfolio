"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

const EMPTY = {
  title: "",
  category: "",
  description: "",
  overview: "",
  live_link: "",
  bgImage: "",
  blobUrl: null,
};

export default function WorkForm({ initialWork, mode = "create" }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(() => ({
    ...EMPTY,
    ...(initialWork || {}),
    featuresText: (initialWork?.features || []).join("\n"),
  }));
  const [cover, setCover] = useState(initialWork?.bgImage || "");
  const [blobUrl, setBlobUrl] = useState(initialWork?.blobUrl || null);
  const [uploading, setUploading] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    setFieldErrors((prev) => ({ ...prev, bgImage: "" }));

    try {
      const safeName =
        file.name
          .split(/[\\/]/)
          .pop()
          .replace(/[^a-zA-Z0-9._-]/g, "-")
          .replace(/^[^a-zA-Z0-9]+/, "") || "image";

      const result = await upload(safeName, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: file.type || undefined,
      });

      setCover(result.url);
      setBlobUrl(result.url);
    } catch (uploadError) {
      console.error(uploadError);
      setError(
        uploadError?.message ||
          "Upload failed. Make sure BLOB_READ_WRITE_TOKEN is set and the store is linked."
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});
    setPending(true);

    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      overview: form.overview,
      live_link: form.live_link,
      bgImage: cover,
      blobUrl,
      features: form.featuresText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };

    const isEdit = mode === "edit";
    const url = isEdit ? `/api/works/${encodeURIComponent(initialWork.id)}` : "/api/works";

    try {
      const response = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setFieldErrors(data.errors || {});
        setError(data.error || "Something went wrong.");
        return;
      }

      router.push("/dashboard/works");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-default bg-body px-4 py-3 text-body outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition";

  const labelClass = "block text-sm font-medium text-body mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="title">
            Title <span className="text-accent">*</span>
          </label>
          <input
            id="title"
            required
            value={form.title}
            onChange={(event) => setField("title", event.target.value)}
            className={fieldClass}
            placeholder="Stat·Fit – Gym Workout Tracker PWA"
          />
          {fieldErrors.title && (
            <p className="mt-1.5 text-xs text-red-500">{fieldErrors.title}</p>
          )}
          <p className="mt-1.5 text-xs text-muted">
            The URL slug is generated automatically and cannot be changed after saving.
          </p>
        </div>

        <div>
          <label className={labelClass} htmlFor="category">
            Category
          </label>
          <input
            id="category"
            value={form.category}
            onChange={(event) => setField("category", event.target.value)}
            className={fieldClass}
            placeholder="E-commerce"
            list="category-suggestions"
          />
          <datalist id="category-suggestions">
            <option value="E-commerce" />
            <option value="News Portal" />
            <option value="Landing Page" />
            <option value="PWA" />
            <option value="Other" />
          </datalist>
          {fieldErrors.category && (
            <p className="mt-1.5 text-xs text-red-500">{fieldErrors.category}</p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="live_link">
            Live link
          </label>
          <input
            id="live_link"
            value={form.live_link}
            onChange={(event) => setField("live_link", event.target.value)}
            className={fieldClass}
            placeholder="https://example.com"
          />
          {fieldErrors.live_link && (
            <p className="mt-1.5 text-xs text-red-500">{fieldErrors.live_link}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="description">
            Short description
          </label>
          <input
            id="description"
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
            className={fieldClass}
            placeholder="Next.js 16 • React 19 • MongoDB"
          />
          {fieldErrors.description && (
            <p className="mt-1.5 text-xs text-red-500">{fieldErrors.description}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="overview">
            Overview
          </label>
          <textarea
            id="overview"
            rows={4}
            value={form.overview}
            onChange={(event) => setField("overview", event.target.value)}
            className={fieldClass}
            placeholder="A full-stack, mobile-first Progressive Web App…"
          />
          {fieldErrors.overview && (
            <p className="mt-1.5 text-xs text-red-500">{fieldErrors.overview}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="featuresText">
            Key highlights
          </label>
          <textarea
            id="featuresText"
            rows={6}
            value={form.featuresText}
            onChange={(event) => setField("featuresText", event.target.value)}
            className={fieldClass}
            placeholder={"One highlight per line\nBuilt an admin panel…\nImplemented JWT auth…"}
          />
          <p className="mt-1.5 text-xs text-muted">One highlight per line (max 20).</p>
          {fieldErrors.features && (
            <p className="mt-1.5 text-xs text-red-500">{fieldErrors.features}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="cover">
            Cover image
          </label>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative h-32 w-full sm:w-48 shrink-0 rounded-xl overflow-hidden border border-default bg-accent/5">
              {cover ? (
                <Image
                  src={cover}
                  alt="Cover preview"
                  fill
                  sizes="192px"
                  className="object-cover object-top"
                  unoptimized={cover.startsWith("http")}
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs text-muted">
                  No image
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                id="cover"
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="rounded-full border border-default px-5 py-2.5 text-sm font-medium text-secondary hover:text-accent hover:border-accent/40 disabled:opacity-60 transition-colors"
              >
                {uploading ? "Uploading…" : cover ? "Replace image" : "Upload image"}
              </button>
              {cover && (
                <button
                  type="button"
                  onClick={() => {
                    setCover("");
                    setBlobUrl(null);
                  }}
                  disabled={uploading}
                  className="rounded-full border border-default px-5 py-2.5 text-sm font-medium text-secondary hover:text-red-500 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-muted">
            PNG, JPEG, WebP, AVIF or GIF up to 5 MB. Stored in your Vercel Blob store.
          </p>
          {fieldErrors.bgImage && (
            <p className="mt-1.5 text-xs text-red-500">{fieldErrors.bgImage}</p>
          )}
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending || uploading}
          className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-7 py-3 text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? "Saving…" : mode === "edit" ? "Save changes" : "Create project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/works")}
          className="rounded-full border border-default px-7 py-3 text-sm font-medium text-secondary hover:text-accent transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}