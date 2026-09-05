import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "../../utils/constants";
import { TOOL_INFO } from "../../utils/toolsContent";

export const metadata = {
  title: "Compress JPEG Images Online – Reduce JPEG Size Free | GoPDFGo",
  description:
    "Compress JPEG images online without quality loss. Optimize photos for web, email, and storage instantly.",
  keywords: "compress jpeg, jpeg compressor, reduce jpeg size",
  alternates: {
    // Same engine as /compress-jpg, and the page says so. Two indexable
    // self-canonical URLs for one intent reads as a doorway pair to Google's
    // quality systems -- exactly what an AdSense re-review does not need.
    // The page stays for direct traffic; /compress-jpg is the indexed one.
    canonical: "https://gopdfgo.com/compress-jpg",
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
      <ImageEditor toolId="compress-jpeg" info={TOOL_INFO["compress-jpeg"]} />
    </div>
  );
}