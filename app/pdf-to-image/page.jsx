import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "@/utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "PDF to JPG / PNG Online Free – Convert PDF Pages to Images | GoPDFGo",
  description:
    "Convert each PDF page into a high-quality JPG or PNG image online. Secure, browser-based, no upload. Download single images or a ZIP of all pages.",
  keywords:
    "pdf to jpg, pdf to png, convert pdf to image, pdf to image online, pdf pages to jpg, export pdf as image, free pdf to jpg converter, no upload pdf to image",
  alternates: {
    canonical: "https://gopdfgo.com/pdf-to-image",
  },
};

export default function PdfToImagePage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "pdf-to-image");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="pdf-to-image" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="pdf-to-image" toolType="pdf" />
      <RelatedBlogs toolId="pdf-to-image" />
    </div>
  );
}
