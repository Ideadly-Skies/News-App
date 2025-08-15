// app/not-found.tsx
import { Suspense } from "react";
import NotFoundAnim from "@/components/not-found-anim";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-10">
      <Suspense fallback={null}>
        <NotFoundAnim />
      </Suspense>
    </div>
  );
}