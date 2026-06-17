import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "../../utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "Compress PDF Online Free – Reduce PDF Size Without Quality Loss | GoPDFGo",
  description:
    "Compress PDF online for free without losing quality. Secure, fast, browser-based PDF compressor. No upload, no watermark, no signup.",
  keywords:
    "compress pdf, reduce pdf size, pdf compressor online, compress pdf free,compress pdf online, reduce pdf file size, pdf compressor free, optimize pdf documents, compress pdf without quality loss, browser based pdf compressor, no upload pdf compression",
  alternates: {
    canonical: "https://gopdfgo.com/compress-pdf",
  },
};

export default function CompressPDFPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "compress-pdf");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="compress-pdf" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="compress-pdf" toolType="pdf" />
      <RelatedBlogs toolId="compress-pdf" />
    </div>
  );
}