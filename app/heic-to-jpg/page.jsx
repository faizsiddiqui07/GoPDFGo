import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "@/utils/constants";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "HEIC to JPG Converter Online Free – iPhone HEIC to JPG/PNG/WebP | GoPDFGo",
  description:
    "Convert iPhone HEIC photos to JPG, PNG, or WebP online for free. Fast, private, browser-based — no upload. Batch convert and download as ZIP.",
  keywords:
    "heic to jpg, heic to png, heic converter, iphone photo to jpg, convert heic, heic to jpg online, heic to webp, heic to jpg free, change heic to jpg",
  alternates: {
    canonical: "https://gopdfgo.com/heic-to-jpg",
  },
};

export default function HeicToJpgPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "heic-to-jpg");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="heic-to-jpg" />
      <RelatedBlogs toolId="heic-to-jpg" />
    </div>
  );
}
