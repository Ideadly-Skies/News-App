'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

const CATEGORIES = [
  'home',        
  'world',
  'us',
  'politics',
  'business',
  'technology',
  'science',
  'health',
  'sports',
  'arts',
  'books',
  'style',
  'food',
  'travel',
  'magazine',
  'opinion',
];

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="border-b">
      {/* Row 1 — brand, links, search */}
      <div className="container mx-auto flex items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-black tracking-tight">
            News
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-zinc-900 ${
                pathname === '/' ? 'underline underline-offset-4' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-zinc-900 ${
                pathname?.startsWith('/about') ? 'underline underline-offset-4' : ''
              }`}
            >
              About
            </Link>
          </nav>
        </div>

        {/* Search (GET -> /search?q=...) */}
        <form
          action="/search"
          method="GET"
          className="flex items-center gap-2 w-full max-w-md"
        >
          <div className="relative flex-1">
            <input
              ref={inputRef}
              defaultValue={searchParams.get('q') ?? ''}
              name="q"
              type="search"
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
      </div>

      {/* Row 2 — category bar */}
      <div className="border-t bg-white/90 sticky top-0 z-40">
        <nav className="container mx-auto overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-4 py-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c} className="shrink-0">
                <Link
                  href={c === 'home' ? '/' : `/category/${c}`}
                  className={`px-2 py-1 rounded hover:bg-gray-100 capitalize ${
                    pathname === `/category/${c}` ||
                    (c === 'home' && pathname === '/')
                      ? 'font-semibold'
                      : ''
                  }`}
                >
                  {c.replace('-', ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
