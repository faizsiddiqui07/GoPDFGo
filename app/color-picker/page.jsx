import React from "react";
import ImageEditor from "../../components/ImageEditor"; // Path check kar lijiyega
import { TOOLS_CONFIG } from "@/utils/constants";

// --- Next.js Native SEO ---
export const metadata = {
  title: "Color Picker From Image – Extract HEX Colors | GoPDFGo",
  description:
    "Pick colors from images online. Extract exact HEX color codes with pixel-perfect accuracy.",
  keywords:
    "color picker from image, hex color picker,color picker from image, hex color picker online, rgb color picker, extract colors from image, image color picker tool, eyedropper from image, pick color online",
  alternates: {
    canonical: "https://gopdfgo.com/color-picker",
  },
};

export default function ColorPickerPage() {

const tool = TOOLS_CONFIG.find((t) => t.id === "color-picker");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hum poora object nahi, sirf string pass kar rahe hain taaki error na aaye */}
      <ImageEditor toolId="color-picker" />
    </div>
  );
}