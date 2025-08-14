'use client';

import { useEffect, useRef } from 'react';
import type { AnimationItem } from 'lottie-web';
import noData from '@/lotties/No-Data.json';

export default function EmptyState({
  message = 'No News found for this section.',
  animation = noData
}: { message?: string; animation?: unknown }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const lottie = (await import('lottie-web/build/player/lottie_light')).default;

      // destroy any previous instance (Strict Mode will call effect twice)
      animRef.current?.destroy();
      animRef.current = null;

      if (cancelled || !containerRef.current) return;

      // ensure the container is empty
      containerRef.current.innerHTML = '';

      animRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animation
      });
    })();

    return () => {
      cancelled = true;
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [animation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] py-20 text-center">
      <div ref={containerRef} className="w-56 h-56" aria-hidden />
      <p className="mt-4 text-gray-500">{message}</p>
    </div>
  );
}
