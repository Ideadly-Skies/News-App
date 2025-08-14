import { notFound } from 'next/navigation';
import NewsContainer from '@/components/news-container';

const API_KEY = process.env.NYTIMES_API_KEY;
export const revalidate = 300;

const SECTION_ALIASES: Record<string, string> = {
  world: 'world',
  us: 'us',
  politics: 'politics',
  business: 'business',
  technology: 'technology',
  science: 'science',
  health: 'health',
  sports: 'sports',
  arts: 'arts',
  books: 'books',
  style: 'fashion',
  food: 'food',
  travel: 'travel',
  magazine: 'magazine',
  opinion: 'opinion',
};

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(SECTION_ALIASES).map((slug) => ({ slug }));
}

type Params = { slug: string };

// await params here too
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const title = slug === 'us'
    ? 'US — News'
    : `${slug[0].toUpperCase()}${slug.slice(1)} — News`;
  return { title };
}

async function fetchNewsBySection(slug: string): Promise<News[]> {
  const section = SECTION_ALIASES[slug];
  if (!section) notFound();

  const res = await fetch(
    `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`,
    { next: { revalidate } }
  );
  if (!res.ok) notFound();

  const data: NYTApiResponse = await res.json();

  return (data.results ?? []).map((it, idx) => ({
    id: String(idx),
    title: it.title,
    description: it.abstract,
    poster: it.multimedia?.[0]?.url ?? '',
    publishedAt: it.published_date,
    originalUrl: it.url,
    author: it.byline?.replace(/^By\s+/i, '') ?? '',
    category: it.section ?? slug,
  }));
}

// await params in the page
export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const news = await fetchNewsBySection(slug);
  const heading = slug === 'us'
    ? 'US News'
    : `${slug[0].toUpperCase()}${slug.slice(1)} News`;

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-4xl font-semibold text-center">{heading}</h1>
      <NewsContainer news={news} />
    </div>
  );
}