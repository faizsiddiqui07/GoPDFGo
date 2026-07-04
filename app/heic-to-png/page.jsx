import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "@/utils/constants";

export const metadata = {
  title: "HEIC to PNG – Convert iPhone Photos to PNG Free | GoPDFGo",
  description:
    "Convert iPhone HEIC photos to lossless PNG online for free. Pixel-perfect, edit-friendly, private — no upload. Batch convert and download as ZIP.",
  keywords:
    "heic to png, heic to png converter, convert heic to png, iphone heic to png, heic to png online, heic to png free, lossless heic converter",
  alternates: {
    canonical: "https://gopdfgo.com/heic-to-png",
  },
};

export default function HeicToPngPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "heic-to-png");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="heic-to-png" />
    </div>
  );
}
