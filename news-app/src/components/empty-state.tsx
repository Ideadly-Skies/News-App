'use client';

import { useEffect, useRef } from 'react';

export default function EmptyState({
  message = 'No stories found for this section.',
  src = '/lotties/No-Data.json',
}: {
  message?: string;
  src?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let anim: import('lottie-web').AnimationItem | undefined;
    (async () => {
      const lottieModule = await import('lottie-web');
      const lottie = lottieModule.default;
      anim = lottie.loadAnimation({
        container: ref.current!,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: src,
        rendererSettings: { progressiveLoad: true },
      });
    })();

    return () => {
      if (anim) anim.destroy();
    };
  }, [src]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div ref={ref} className="w-56 h-56" aria-hidden />
      <p className="mt-4 text-gray-500">{message}</p>
    </div>
  );
}
