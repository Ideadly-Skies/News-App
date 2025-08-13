// app/components/NewsCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewsCard({ item }: { item: News }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (item?.id == null) return;
    if (!confirm(`Delete "${item.title}"?`)) return;

    try {
      setDeleting(true);

      // ✅ hit Next API so server can revalidate tags
      const res = await fetch(`/api/news/${encodeURIComponent(String(item.id))}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        // try to surface a clearer error if the API returned JSON
        let msg = `${res.status} ${res.statusText}`;
        try {
          const body = await res.json();
          if (body?.error) msg += ` ${body.error}`;
        } catch {
          /* ignore */
        }
        throw new Error(`Failed to delete: ${msg}`);
      }

      // Server route already called revalidateTag; this refetches the list component
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Failed to delete item.");
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="h-auto p-4 rounded-lg border border-zinc-300 dark:border-zinc-600 flex flex-col justify-between">
      <div>
        {item.poster ? (
          <Image
            src={item.poster}
            alt={item.title}
            width={400}
            height={192}
            className="w-full h-48 object-cover rounded-md"
          />
        ) : null}
        <h2 className="text-2xl font-semibold mt-3">{item.title}</h2>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      <div className="mt-3 flex gap-2">
        <Link href={`/detail/${item.id}`}>
          <button className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md">
            Read More
          </button>
        </Link>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-60"
          aria-label={`Delete ${item.title}`}
        >
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}
