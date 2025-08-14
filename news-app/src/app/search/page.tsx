// app/search/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewsContainer from '@/components/news-container';
import EmptyState from '@/components/empty-state';
import NoDataAnimation from '@/lotties/404.json';

const API_KEY = process.env.NYTIMES_API_KEY;
const PAGE_SIZE = 10;
export const revalidate = 0;

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
    poster: img ? `https://static01.nyt.com/${img}` : '',
    publishedAt: d.pub_date ?? '',
    originalUrl: d.web_url,
    author: d.byline?.original?.replace(/^By\s+/i, '') ?? '',
    category: d.section_name ?? 'Search',
  };
}

async function fetchSearch(q: string, page: number) {
  const url = new URL('https://api.nytimes.com/svc/search/v2/articlesearch.json');
  url.searchParams.set('q', q);
  url.searchParams.set('page', String(page));
  url.searchParams.set('sort', 'newest');
  url.searchParams.set('api-key', API_KEY || '');
  // cleaner result
  // url.searchParams.set('fq', 'document_type:("article")');

  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) notFound();

  const data: NYTSearchResponse = await res.json();
  const docs = data.response?.docs ?? [];

  // If meta.hits is missing/0 but we have docs, fall back to docs.length
  const hits =
    (data.response?.meta?.hits ?? 0) || docs.length;

  return { news: docs.map(toNews), hits };
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

        {/* Lottie empty state */}
        <div className="mt-8 flex justify-center">
            <EmptyState
                animation={NoDataAnimation}
                message='begin searching now in the search bar!'
            />
        </div>
      </div>
    );
  }

  const { news, hits } = await fetchSearch(q, page);

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
