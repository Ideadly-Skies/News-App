// components/search-box.tsx
'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get('q') ?? '');
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<number | null>(null);

  // Keep input in sync with the URL (back/forward)
  useEffect(() => {
    setValue(searchParams.get('q') ?? '');
  }, [searchParams]);

  // Clear any pending debounce when unmounting
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const navigate = (v: string, replace = false) => {
    const params = new URLSearchParams(searchParams.toString());
    if (v) {
      params.set('q', v);
      params.delete('page'); // reset pagination
      const url = `/search?${params.toString()}`;
   
      // warm up to reduce blank page opener   
      router.prefetch?.(url);
      startTransition(() =>
        replace ? router.replace(url) : router.push(url)
      );
    } else {
      params.delete('q');
      params.delete('page');
      const url = pathname;
      startTransition(() => router.replace(url));
    }
  };

  const onChange = (v: string) => {
    setValue(v);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      navigate(v.trim(), true); 
    }, 400);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); 
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    navigate(value.trim(), false);
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 w-full max-w-md">
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
        disabled={isPending}
        className="px-3 py-2 rounded-md border text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
      >
        Go
      </button>
    </form>
  );
}
