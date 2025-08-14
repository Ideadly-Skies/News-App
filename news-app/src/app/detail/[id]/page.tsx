const fetchNewsById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/news/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }

  const news: News = await res.json();

  return news;
};

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await fetchNewsById(id);

  return (
    <div className="container mx-auto py-5">
      <div className="max-w-4xl mx-auto">
        <img src={news.poster} alt={news.title} className="w-full rounded-lg" />
        <div className="mt-6">
          <h1 className="text-4xl font-semibold">{news.title}</h1>
          <div className="flex items-center mt-4 text-gray-500">
            <span>Published on {news.publishedAt}</span>
          </div>
          <div className="mt-8 prose lg:prose-xl">
            <div className="text-lg leading-relaxed text-gray-500">
              {news.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
