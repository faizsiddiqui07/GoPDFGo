import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "../../utils/constants";

export const metadata = {
  title: "Compress JPEG Images Online – Reduce JPEG Size Free | GoPDFGo",
  description:
    "Compress JPEG images online without quality loss. Optimize photos for web, email, and storage instantly.",
  keywords: "compress jpeg, jpeg compressor, reduce jpeg size",
  alternates: {
    canonical: "https://gopdfgo.com/compress-jpeg",
  },
};

export default function CompressJPEGPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "compress-jpeg");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="compress-jpeg" />
    </div>
  );
}