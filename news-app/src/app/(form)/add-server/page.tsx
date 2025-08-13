// app/add-server/page.tsx
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type News = {
  id?: string | number;
  title: string;
  description: string;
  poster?: string;
  publishedAt?: string;
  originalUrl?: string;
  author?: string;
  category?: string;
};

export default function AddNews() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const payload: News = {
      title: (formData.get("title") || "").toString().trim(),
      description: (formData.get("description") || "").toString().trim(),
      poster: (formData.get("poster") || "").toString().trim(),
      // default to today if empty
      publishedAt:
        (formData.get("publishedAt")?.toString().trim() as string) ||
        new Date().toISOString().slice(0, 10),
      originalUrl: (formData.get("originalUrl") || "").toString().trim(),
      author: (formData.get("author") || "").toString().trim(),
      category: (formData.get("category") || "").toString().trim(),
    };

    if (!payload.title || !payload.description) {
      throw new Error("Title and description are required.");
    }

    // POST directly to json-server (server-side; secrets safe)
    const upstream = await fetch("http://localhost:3001/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // cache setting irrelevant for POST, omitted
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      throw new Error(`Failed to create news: ${upstream.status} ${upstream.statusText} ${text.slice(0,120)}`);
    }

    // Try to read created object to get its id (json-server returns the created row)
    let created: News | null = null;
    const ct = upstream.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      created = (await upstream.json()) as News;
    }

    // ✅ Invalidate caches that used `cache: "force-cache"` + tags
    revalidateTag("news"); // list page
    if (created?.id != null) revalidateTag(`news-${created.id}`); // detail page

    redirect("/");
  }

  return (
    <div className="container max-w-2xl mx-auto">
      <h1 className="text-4xl font-semibold text-center py-5">Add News — Server</h1>

      <form action={handleSubmit} className="flex flex-col gap-2">
        <label>Title</label>
        <input name="title" type="text" required className="border p-2 rounded-md" />

        <label>Description</label>
        <textarea name="description" required className="border p-2 rounded-md" />

        <label>Poster URL</label>
        <input name="poster" type="url" className="border p-2 rounded-md" />

        <label>Published At</label>
        <input name="publishedAt" type="date" className="border p-2 rounded-md" />

        <label>Original URL</label>
        <input name="originalUrl" type="url" className="border p-2 rounded-md" />

        <label>Author</label>
        <input name="author" type="text" className="border p-2 rounded-md" />

        <label>Category</label>
        <input name="category" type="text" className="border p-2 rounded-md" />

        <button type="submit" className="mt-4 bg-black text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
