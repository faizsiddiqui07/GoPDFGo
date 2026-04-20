import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "@/utils/constants";

export const metadata = {
  title: "Convert Images to WebP Online Free – JPG PNG to WebP | GoPDFGo",
  description:
    "Convert JPG and PNG images to WebP online for free. Reduce image size and improve website speed with modern WebP format.",
  keywords:
    "convert to webp, jpg to webp, png to webp, webp converter online, convert images to webp, jpg to webp online, png to webp converter, webp image converter, modern image format webp, optimize images for web, browser based webp converter",
  alternates: {
    canonical: "https://gopdfgo.com/convert-webp",
  },
};

export default function ConvertWebPPage() {
    const tool = TOOLS_CONFIG.find((t) => t.id === "convert-webp");
    
      if (!tool) {
        return (
          <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
            Tool not found
          </div>
        );
      }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="convert-webp" />
    </div>
  );
}