import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "../../utils/constants";

export const metadata = {
  title: "Compress JPG Images Online – Reduce JPG Size Free | GoPDFGo",
  description:
    "Compress JPG images online and reduce file size without losing quality. Fast, secure, browser-based JPG compressor.",
  keywords:
    "compress jpg online, reduce jpg file size, jpg image compressor, optimize jpg images, compress photos online, lossy jpg compression, browser based image compressor",
  alternates: {
    canonical: "https://gopdfgo.com/compress-jpg",
  },
};

export default function CompressJPGPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "compress-jpg");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="compress-jpg" />
    </div>
  );
}