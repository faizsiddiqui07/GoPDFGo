import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "@/utils/constants";

export const metadata = {
  title: "Flip Image Online – Mirror Images Horizontally or Vertically | GoPDFGo",
  description:
    "Flip images online horizontally or vertically. Fix mirrored selfies and create reflection effects easily.",
  keywords:
    "flip image, mirror image online, flip photo,flip image online, mirror image online, flip photo horizontally, flip image vertically, reverse image online, mirror selfie image, browser based image editor",
  alternates: {
    canonical: "https://gopdfgo.com/flip",
  },
};

export default function FlipImagePage() {
    const tool = TOOLS_CONFIG.find((t) => t.id === "flip");
        
          if (!tool) {
            return (
              <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
                Tool not found
              </div>
            );
          }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="flip" />
    </div>
  );
}