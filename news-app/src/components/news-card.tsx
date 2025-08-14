// components/news-card.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import Lottie from 'lottie-react';
import placeholder from '@/lotties/No-Data.json';
import type { News } from '@/helpers/mapToNews';

export default function NewsCard({ item }: { item: News }) {
  return (
    <article className="rounded-2xl border border-black/10 p-4">
      {item.poster ? (
        <Image
          src={item.poster}
          alt={item.title}
          width={1200}
          height={800}
          className="h-56 w-full rounded-md object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
      ) : (
        <div className="h-56 w-full overflow-hidden rounded-md bg-black/5">
          <Lottie animationData={placeholder} loop autoplay className="h-full w-full" />
        </div>
      )}

      <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
      {item.description && (
        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
      )}

      <Link
        href={item.originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-white"
      >
        Read More
      </Link>
    </article>
  );
}
