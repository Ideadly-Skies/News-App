// app/add-client/page.tsx
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type News = {
  id?: string;
  title: string;
  description: string;
  poster?: string;
  publishedAt?: string;   // yyyy-mm-dd
  originalUrl?: string;
  author?: string;
  category?: string;
};

export default function AddClient() {
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const submitLockRef = useRef(false); // prevents fast double-click/Enter

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitLockRef.current) return;
    submitLockRef.current = true;

    setStatus(null);

    const formEl = e.currentTarget as HTMLFormElement;
    const form = new FormData(formEl);
    const payload: News = {
      title: (form.get("title") || "").toString().trim(),
      description: (form.get("description") || "").toString().trim(),
      poster: (form.get("poster") || "").toString().trim(),
      publishedAt:
        ((form.get("publishedAt") || "") as string) ||
        new Date().toISOString().slice(0, 10),
      originalUrl: (form.get("originalUrl") || "").toString().trim(),
      author: (form.get("author") || "").toString().trim(),
      category: (form.get("category") || "").toString().trim(),
    };

    if (!payload.title || !payload.description) {
      setStatus({ ok: false, msg: "Title and description are required." });
      submitLockRef.current = false;
      return;
    }

    try {
      setSubmitting(true);

      // ⬇️ Post to Next API so the server can revalidate tags
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();

      if (!res.ok) {
        throw new Error(
          `Failed to create news: ${res.status} ${res.statusText} ${
            typeof body === "string" ? body.slice(0, 120) : ""
          }`
        );
      }

      setStatus({ ok: true, msg: "News added successfully." });
      formEl.reset();

      // ⬇️ navigate to list and refresh (cached pages will be fresh due to revalidateTag)
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      let errorMsg = "Something went wrong.";
      if (err instanceof Error) {
        errorMsg = err.message;
      }
      setStatus({ ok: false, msg: errorMsg });
    } finally {
      setSubmitting(false);
      submitLockRef.current = false;
    }
  }

  return (
    <div className="container max-w-2xl mx-auto">
      <h1 className="text-4xl font-semibold text-center py-5">Add News — Client</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="title" className="text-lg font-medium">Title</label>
        <input id="title" name="title" type="text" required className="border border-gray-300 rounded-md px-3 py-2" placeholder="Tech Conference 2025 Announced" />

        <label htmlFor="description" className="text-lg font-medium mt-2">Description</label>
        <textarea id="description" name="description" required rows={4} className="border border-gray-300 rounded-md px-3 py-2" placeholder="Short summary of the news item..." />

        <label htmlFor="poster" className="text-lg font-medium mt-2">Poster URL (optional)</label>
        <input id="poster" name="poster" type="url" className="border border-gray-300 rounded-md px-3 py-2" placeholder="https://images.unsplash.com/..." />

        <label htmlFor="publishedAt" className="text-lg font-medium mt-2">Published At</label>
        <input id="publishedAt" name="publishedAt" type="date" className="border border-gray-300 rounded-md px-3 py-2" />

        <label htmlFor="originalUrl" className="text-lg font-medium mt-2">Original URL</label>
        <input id="originalUrl" name="originalUrl" type="url" className="border border-gray-300 rounded-md px-3 py-2" placeholder="https://example.com/article" />

        <label htmlFor="author" className="text-lg font-medium mt-2">Author</label>
        <input id="author" name="author" type="text" className="border border-gray-300 rounded-md px-3 py-2" placeholder="Jane Smith" />

        <label htmlFor="category" className="text-lg font-medium mt-2">Category</label>
        <input id="category" name="category" type="text" className="border border-gray-300 rounded-md px-3 py-2" placeholder="Technology" />

        <button type="submit" disabled={submitting} className="mt-4 bg-black text-white rounded-md px-4 py-2 disabled:opacity-60">
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {status && (
          <p className={`mt-2 text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>
            {status.msg}
          </p>
        )}
      </form>
    </div>
  );
}
