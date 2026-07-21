import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "../../utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "OCR PDF Online Free – Scanned PDF to Text in Hindi & English | GoPDFGo",
  description:
    "Read text off a scanned PDF free, in your browser. Works on Hindi and English, including bilingual forms. No upload, nothing stored, works on mobile.",
  keywords:
    "ocr pdf, ocr online free, scanned pdf to text, hindi ocr online, ocr hindi pdf, extract text from scanned pdf, image to text pdf, ocr scanned document, hindi text recognition, ocr pdf free no signup",
  alternates: {
    canonical: "https://gopdfgo.com/ocr-pdf",
  },
};

export default function OcrPdfPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "ocr-pdf");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="ocr-pdf" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="ocr-pdf" toolType="pdf" />
      <RelatedBlogs toolId="ocr-pdf" />
    </div>
  );
}
