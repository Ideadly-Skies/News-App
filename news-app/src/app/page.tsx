// app/page.tsx
import NewsContainer from "@/components/news-container";

async function fetchNews() {
  const res = await fetch("http://localhost:3001/news", {
    cache: "force-cache",
    next: { tags: ["news"] },
  });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export default async function Home() {
  const news = await fetchNews()
  console.log(news)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-center">Daily News</h1>
      <NewsContainer news={news} />
    </main>
  );
}
