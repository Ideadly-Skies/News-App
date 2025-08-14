import NewsContainer from '@/components/news-container';
const API_KEY = process.env.NYTIMES_API_KEY;

async function fetchNews(): Promise<News[]> {
  const res = await fetch(
    `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`,
    { cache: 'force-cache' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }

  const data: NYTApiResponse = await res.json();

  return data.results.map((it, idx) => ({
    id: String(idx),
    title: it.title,
    description: it.abstract,
    poster: it.multimedia?.[0]?.url ?? '',
    publishedAt: it.published_date,
    originalUrl: it.url,
    author: it.byline?.replace(/^By\s+/i, '') ?? '',
    category: it.section ?? '',
  }));
}

export default async function Home() {
  const news = await fetchNews();
  return (
    <div className="container mx-auto py-5">
      <h1 className="text-4xl font-semibold text-center">Daily News</h1>
      <NewsContainer news={news} />
    </div>
  );
}
