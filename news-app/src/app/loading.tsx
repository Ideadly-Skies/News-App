"use client"
import Lottie from "lottie-react";
import loadingAnimation from "@/lotties/Material wave loading.json";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-theme(spacing.32))] w-full flex justify-center items-center">
      <Lottie animationData={loadingAnimation} loop={true} style={{ width: 200, height: 200 }} />
    </div>
  );
}
