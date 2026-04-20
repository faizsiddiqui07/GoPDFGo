import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "../../utils/constants";

export const metadata = {
  title: "Resize Image Online – Pixel Perfect Dimensions Free | GoPDFGo",
  description:
    "Resize JPG, PNG, and WebP images with pixel-perfect precision. Change width and height securely in your browser without quality loss.",
  keywords:
    "resize image, change image dimensions, resize photo online, image resizer free, reduce image resolution, scale image online, browser based image resizer",
  alternates: {
    canonical: "https://gopdfgo.com/resize",
  },
};

export default function ResizeImagePage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "resize");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="resize" />
    </div>
  );
}