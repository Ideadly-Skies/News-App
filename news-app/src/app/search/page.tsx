// app/search/page.tsx
import Link from 'next/link';
import NewsContainer from '@/components/news-container';
import EmptyState from '@/components/empty-state';
import NoDataAnimation from '@/lotties/404.json'; 

const API_KEY = process.env.NYTIMES_API_KEY;
const PAGE_SIZE = 10;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

type SearchParams = { q?: string; page?: string };

type NYTSearchDoc = {
  web_url: string;
  headline?: { main?: string };
  abstract?: string;
  byline?: { original?: string };
  pub_date?: string;
  section_name?: string;
  multimedia?: { url: string }[];
};
type NYTSearchResponse = {
  response?: {
    docs?: NYTSearchDoc[];
    meta?: { hits?: number; offset: number; time: number };
  };
};

function toNews(d: NYTSearchDoc, idx: number): News {
  const img = d.multimedia?.[0]?.url;
  return {
    id: String(idx),
    title: d.headline?.main ?? 'Untitled',
    description: d.abstract ?? '',
    poster: img ? `https://static01.nyt.com/${img}` : '', // OK: NewsCard must handle empty safely
    publishedAt: d.pub_date ?? '',
    originalUrl: d.web_url,
    author: d.byline?.original?.replace(/^By\s+/i, '') ?? '',
    category: d.section_name ?? 'Search',
  };
}

async function fetchSearch(q: string, page: number) {
  const url = new URL('https://api.nytimes.com/svc/search/v2/articlesearch.json');
  url.searchParams.set('q', q);
  url.searchParams.set('page', String(page)); // 0-indexed
  url.searchParams.set('sort', 'newest');
  url.searchParams.set('api-key', API_KEY || '');
  // If you want only articles:
  // url.searchParams.set('fq', 'document_type:("article")');

  try {
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) {
      // Don’t blow up the page—fall back to an empty result
      console.error('Search request failed:', res.status, await res.text().catch(() => ''));
      return { news: [] as News[], hits: 0, error: true as const };
    }

    const data: NYTSearchResponse = await res.json();
    const docs = data.response?.docs ?? [];
    const hits = (data.response?.meta?.hits ?? 0) || docs.length; // fallback when hits is missing

    return { news: docs.map(toNews), hits, error: false as const };
  } catch (e) {
    console.error('Search request crashed:', e);
    return { news: [] as News[], hits: 0, error: true as const };
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? '').trim();
  const page = Number(sp.page ?? '0') || 0;

  if (!q) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center">Search</h1>
        <p className="text-center text-gray-500">
          Type a query in the search box to find articles.
        </p>
        <div className="mt-8 flex justify-center">
          <EmptyState
            animation={NoDataAnimation}
            message="Begin searching now in the search bar!"
          />
        </div>
      </div>
    );
  }

  const { news, hits, error } = await fetchSearch(q, page);

  // Show a clear empty state when no results (or on recoverable error)
  if (!news.length) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center">Results for “{q}”</h1>
        <p className="text-center text-gray-500 mt-2">
          {error ? 'We had trouble fetching results. Please try again in a moment.' : '0 matching articles'}
        </p>
        <div className="mt-8 flex justify-center">
          <EmptyState
            animation={NoDataAnimation}
            message={error ? 'Something went wrong. Try again.' : 'No results found. Try different keywords.'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center">Results for “{q}”</h1>
      <p className="text-center text-gray-500 mt-2">
        {hits.toLocaleString()} matching articles
      </p>

      <div className="mt-6">
        <NewsContainer news={news} />
      </div>

      <div className="flex items-center justify-center gap-3 mt-8">
        {page > 0 && (
          <Link
            href={`/search?q=${encodeURIComponent(q)}&page=${page - 1}`}
            className="px-3 py-2 rounded-md border text-sm hover:bg-gray-50"
            prefetch={false}
          >
            ← Previous
          </Link>
        )}
        {news.length === PAGE_SIZE && (
          <Link
            href={`/search?q=${encodeURIComponent(q)}&page=${page + 1}`}
            className="px-3 py-2 rounded-md border text-sm hover:bg-gray-50"
            prefetch={false}
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
