import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "../../utils/constants";
import { TOOL_INFO } from "../../utils/toolsContent";

export const metadata = {
  title: "Combine Images Online Free – Two Photos Into One | GoPDFGo",
  description:
    "Join two or more photos into a single image, free and in your browser. Perfect for the front and back of an Aadhaar or PAN card. No upload, works on mobile.",
  keywords:
    "combine images, join two photos into one, merge photos online, front and back of aadhaar in one image, combine two pictures, put two images together, id card front back single image, join screenshots",
  alternates: {
    canonical: "https://gopdfgo.com/combine-images",
  },
};

export default function CombineImagesPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "combine-images");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  // ImageEditor renders InfoSection, RelatedTools and RelatedBlogs itself —
  // adding them here too emitted the FAQPage JSON-LD twice.
  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="combine-images" info={TOOL_INFO["combine-images"]} />
    </div>
  );
}
