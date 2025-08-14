export type News = {
  id: string;
  title: string;
  description: string;
  poster: string | null;
  publishedAt: string;
  originalUrl: string;
  author: string;
  category: string;
};

type MultimediaItem = {
  url?: string;
  format?: string;
};

export function pickPoster(multimedia?: MultimediaItem[]): string | null {
  // Prefer a large image if present; else first; else null
  return multimedia?.find(m => (m.format ?? '').toLowerCase().includes('superjumbo'))?.url
      ?? multimedia?.[0]?.url
      ?? null;
}

// usage in your fetch mappers:
type RawNewsItem = {
  title: string;
  abstract: string;
  multimedia?: MultimediaItem[];
  published_date: string;
  url: string;
  byline?: string;
  section?: string;
};

export function mapToNews(data: { results: RawNewsItem[] }): News[] {
  return data.results.map((it, idx) => ({
    id: String(idx),
    title: it.title,
    description: it.abstract,
    poster: pickPoster(it.multimedia), 
    publishedAt: it.published_date,
    originalUrl: it.url,
    author: it.byline?.replace(/^By\s+/i, '') ?? '',
    category: it.section ?? '',
  }));
}
