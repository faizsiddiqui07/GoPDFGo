import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "../../utils/constants";

export const metadata = {
  title: "Rotate Image Online – Fix Photo Orientation Free | GoPDFGo",
  description:
    "Rotate JPG, PNG, and WebP images 90, 180, or 270 degrees instantly. Fix sideways photos permanently directly in your browser.",
  keywords:
    "rotate image, turn photo online, fix image orientation, rotate picture 90 degrees, permanent image rotation, browser based photo editor",
  alternates: {
    canonical: "https://gopdfgo.com/rotate",
  },
};

export default function RotateImagePage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "rotate");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="rotate" />
    </div>
  );
}