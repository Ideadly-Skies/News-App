import Link from 'next/link';
import Image from 'next/image';

export default function NewsCard({ item }: { item: News }) {
  return (
    <div className="h-auto p-4 rounded-lg border border-zinc-300 dark:border-zinc-600 flex flex-col justify-between">
      <Image
        src={item.poster}
        alt={item.title}
        width={400}
        height={192}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-2xl font-semibold mt-3">{item.title}</h2>
      <p className="text-sm text-gray-500">{item.description}</p>
      <div>
        <Link href={`/detail/${item.id}`}>
          <button className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-md mt-3">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}
