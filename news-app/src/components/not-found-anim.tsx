'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import animationData from '@/lotties/404.json'; 

export default function NotFoundAnim() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    setReady(true);

    let anim: import('lottie-web').AnimationItem | undefined;
    (async () => {
      const lottie = (await import('lottie-web/build/player/lottie_light')).default;
      anim = lottie.loadAnimation({
        container: boxRef.current!,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData,
      });
    })();

    return () => anim?.destroy();
  }, [ready]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div ref={boxRef} className="w-72 h-72" aria-hidden />
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-1 text-gray-500">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 rounded-md border font-medium hover:bg-gray-50"
      >
        Go to Home
      </Link>
    </div>
  );
}
