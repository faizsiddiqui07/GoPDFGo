import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "@/utils/constants";

export const metadata = {
  title: "Convert Images to JPG Online Free – PNG WebP to JPG | GoPDFGo",
  description:
    "Convert PNG and WebP images to JPG format online. Universal JPG converter with high quality and smaller file size.",
  keywords:
    "convert to jpg, png to jpg, webp to jpg, jpg converter online,convert images to jpg, png to jpg converter, webp to jpg online, image format converter, jpg image converter online, high quality jpg conversion, browser based image converter",
  alternates: {
    canonical: "https://gopdfgo.com/convert-jpg",
  },
};

export default function ConvertJPEGPage() {
    const tool = TOOLS_CONFIG.find((t) => t.id === "convert-jpg");
        
          if (!tool) {
            return (
              <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
                Tool not found
              </div>
            );
          }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* "convert-jpg" ID use karna hai jaisa constants me define hai */}
      <ImageEditor toolId="convert-jpg" />
    </div>
  );
}