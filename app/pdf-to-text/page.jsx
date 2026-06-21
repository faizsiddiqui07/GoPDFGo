import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "../../utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "PDF to Text Online Free – Extract Text from PDF | GoPDFGo",
  description:
    "Extract all text from a PDF into plain text, free and in your browser. Copy or download as .txt. No upload, 100% private. Works on mobile.",
  keywords:
    "pdf to text, extract text from pdf, pdf to txt, copy text from pdf, pdf text extractor, convert pdf to text online, pdf to text free, get text out of pdf",
  alternates: {
    canonical: "https://gopdfgo.com/pdf-to-text",
  },
};

export default function PdfToTextPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "pdf-to-text");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="pdf-to-text" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="pdf-to-text" toolType="pdf" />
      <RelatedBlogs toolId="pdf-to-text" />
    </div>
  );
}
