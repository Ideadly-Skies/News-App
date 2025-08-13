// app/detail/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";

type News = {
  id: string | number;
  title: string;
  description: string;
  poster?: string;
  publishedAt?: string;
  originalUrl?: string;
  author?: string;
  category?: string;
};

async function fetchNewsById(id: string) {
  const res = await fetch(
    `http://localhost:3001/news/${encodeURIComponent(id)}`,
    {
      // ✅ cache the response
      cache: "force-cache",
      // tag so we can revalidate after mutations
      next: { tags: ["news", `news-${id}`] },
    }
  );

  if (res.status === 404) return null; // render 404 page
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `GET /news/${id} failed: ${res.status} ${res.statusText}. ${body.slice(0, 120)}`
    );
  }

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const body = await res.text();
    throw new Error(`Expected JSON, got ${ct}. Body: ${body.slice(0, 120)}`);
  }

  return (await res.json()) as News;
}

export default async function Detail({
  params,
}: {
  params: { id: string };
}) {
  const news = await fetchNewsById(params.id);
  if (!news) notFound();

  return (
    <div>
      {news.poster && (
        <Image
          src={news.poster}
          alt={news.title}
          width={400}
          height={192}
          className="w-full rounded-lg"
        />
      )}

      <div className="mt-6">
        <h1 className="text-4xl font-semibold">{news.title}</h1>
        <div className="flex items-center mt-4 text-gray-500">
          <span>{news.publishedAt}</span>
        </div>
        <div className="mt-8 prose lg:prose-xl">
          <div className="text-lg leading-relaxed text-gray-500">
            {news.description}
          </div>
        </div>
      </div>
    </div>
  );
}
