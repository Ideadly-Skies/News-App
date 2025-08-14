import NewsCard from './news-card';
import EmptyState from './empty-state';

export default function NewsContainer({ news }: { news: News[] | undefined | null }) {
  if (!news || news.length === 0) {
    return <EmptyState message="This page is empty right now. Please try another category." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
      {news.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
