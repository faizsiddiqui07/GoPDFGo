import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "@/utils/constants";

export const metadata = {
  title: "Convert Images to PNG Online Free – JPG WebP to PNG | GoPDFGo",
  description:
    "Convert JPG and WebP images to PNG format online. Get lossless image quality with transparent background support.",
  keywords:
    "convert to png, jpg to png, webp to png, png converter online,convert images to png, jpg to png online, webp to png converter, png image converter, lossless png conversion, transparent png converter, browser based image conversion",
  alternates: {
    canonical: "https://gopdfgo.com/convert-png",
  },
};

export default function ConvertPNGPage() {
    const tool = TOOLS_CONFIG.find((t) => t.id === "convert-png");
    
      if (!tool) {
        return (
          <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
            Tool not found
          </div>
        );
      }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="convert-png" />
    </div>
  );
}