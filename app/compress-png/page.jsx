import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "../../utils/constants";

export const metadata = {
  title: "Compress PNG Online – Reduce PNG Size Free | GoPDFGo",
  description:
    "Compress PNG images online and reduce PNG file size by up to 80% while keeping transparency. Fast, private, in-browser PNG compressor — no upload.",
  keywords:
    "compress png, png compressor, reduce png size, compress png online, reduce png image size, png optimizer, shrink png file, compress png without losing quality, compress png with transparency, browser based png compressor",
  alternates: {
    canonical: "https://gopdfgo.com/compress-png",
  },
};

export default function CompressPngPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "compress-png");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="compress-png" />
    </div>
  );
}
