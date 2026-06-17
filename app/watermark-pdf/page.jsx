import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "@/utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "Watermark PDF Online Free – Add Text Stamp to PDF | GoPDFGo",
  description:
    "Add a text watermark like CONFIDENTIAL or your name across every PDF page. Secure, browser-based, no upload, no signup, no watermark from us.",
  keywords:
    "watermark pdf, add watermark to pdf, stamp pdf, pdf watermark online, confidential stamp pdf, add text to pdf pages, free pdf watermark tool",
  alternates: {
    canonical: "https://gopdfgo.com/watermark-pdf",
  },
};

export default function WatermarkPdfPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "watermark-pdf");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="watermark-pdf" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="watermark-pdf" toolType="pdf" />
      <RelatedBlogs toolId="watermark-pdf" />
    </div>
  );
}
