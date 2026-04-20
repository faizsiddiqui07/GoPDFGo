import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "../../utils/constants";

export const metadata = {
  title: "Image to PDF Converter – JPG PNG to PDF Online | GoPDFGo",
  description:
    "Convert JPG, PNG, and WebP images to PDF online for free. Secure image-to-PDF converter with instant download.",
  keywords:
    "image to pdf online, jpg to pdf converter, png to pdf converter, photo to pdf online, convert images to pdf, combine images into pdf, browser based image to pdf",
  alternates: {
    canonical: "https://gopdfgo.com/image-to-pdf",
  },
};

export default function ImageToPDFPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "image-to-pdf");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="image-to-pdf" />
    </div>
  );
}