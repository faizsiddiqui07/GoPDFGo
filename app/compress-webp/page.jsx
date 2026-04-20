import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "../../utils/constants";

export const metadata = {
  title: "Compress WebP Images Online – Reduce WebP Size Free | GoPDFGo",
  description:
    "Compress WebP images online to reduce file size while preserving quality. Fast and private WebP compressor.",
  keywords:
    "compress webp, webp compressor, reduce webp size,compress webp online, reduce webp image size, webp image compressor, optimize webp images, lossless webp compression, browser based webp compressor, webp optimizer online",
  alternates: {
    canonical: "https://gopdfgo.com/compress-webp",
  },
};

export default function CompressWebPPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "compress-webp");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="compress-webp" />
    </div>
  );
}