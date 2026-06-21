import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "@/utils/constants";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "HEIC to WebP Converter Online Free – iPhone HEIC to WebP for Web | GoPDFGo",
  description:
    "Convert iPhone HEIC photos to lightweight WebP online for free. Smaller files, faster pages, private — no upload. Batch convert and download as ZIP.",
  keywords:
    "heic to webp, heic to webp converter, convert heic to webp, iphone heic to webp, heic to webp online, heic to webp free, web image converter",
  alternates: {
    canonical: "https://gopdfgo.com/heic-to-webp",
  },
};

export default function HeicToWebpPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "heic-to-webp");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="heic-to-webp" />
      <RelatedBlogs toolId="heic-to-webp" />
    </div>
  );
}
