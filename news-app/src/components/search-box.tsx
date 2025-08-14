// components/search-box.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get('q') ?? '');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep input in sync if user navigates with back/forward
  useEffect(() => {
    setValue(searchParams.get('q') ?? '');
  }, [searchParams]);

  const onChange = (v: string) => {
    setValue(v);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (v.trim()) {
        params.set('q', v.trim());
        params.delete('page'); // reset pagination on a new query
        router.push(`/search?${params.toString()}`);
      } else {
        params.delete('q');
        params.delete('page');
        // If you prefer staying on the same page with an empty query, skip push
        router.push(pathname);
      }
    }, 500);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    // Allow manual submit as a fallback (no debounce)
    // so pressing Enter or clicking "Go" still works.
  };

  return (
    <form action="/search" method="GET" onSubmit={onSubmit}
      className="flex items-center gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <input
          name="q"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search"
          className="w-full rounded-md border px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          aria-label="Search news"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>
      <button
        type="submit"
        className="px-3 py-2 rounded-md border text-sm font-semibold hover:bg-gray-50"
      >
        Go
      </button>
    </form>
  );
}
