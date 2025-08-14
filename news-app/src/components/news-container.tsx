'use client';

import { useEffect, useMemo, useState } from 'react';
import NewsCard from './news-card';
import EmptyState from './empty-state';

type Props = {
  news: News[] | undefined | null;
  perPage?: number;             
  scrollToTopOnChange?: boolean;
};

export default function NewsContainer({
  news,
  perPage = 12,
  scrollToTopOnChange = true,
}: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil((news?.length ?? 0) / perPage));

  // Keep page in range if the list size changes
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  // Optional scroll to top on page change
  useEffect(() => {
    if (scrollToTopOnChange) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, scrollToTopOnChange]);

  const items = useMemo(() => {
    if (!news || news.length === 0) return [];
    const start = (page - 1) * perPage;
    return news.slice(start, start + perPage);
  }, [news, page, perPage]);

  if (!news || news.length === 0) return <EmptyState />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            className="px-3 py-2 rounded-md border text-sm hover:bg-gray-50 disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Previous
          </button>

          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>

          <button
            className="px-3 py-2 rounded-md border text-sm hover:bg-gray-50 disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}
