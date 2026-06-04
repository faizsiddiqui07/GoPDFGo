import React from "react";
import PdfEditor from "../../components/PdfEditor"; // Apne path ke hisaab se adjust kar lena
import { TOOLS_CONFIG } from "@/utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";

export const metadata = {
  title: "Extract Pages from PDF Online Free | Secure PDF Extractor | GoPDFGo",
  description:
    "Easily extract specific pages or a range of pages from any large PDF document. Fast, secure, and private PDF extractor that works directly in your browser.",
  keywords: 
    "extract pdf pages, pull pages from pdf, save single page pdf, pdf page extractor, separate pdf pages offline, extract merit list page securely, extract pdf online free",
  alternates: {
    canonical: "https://gopdfgo.com/extract-pdf-pages",
  },
};

export default function ExtractPDFPages() {
    const tool = TOOLS_CONFIG.find((t) => t.id === "extract-pdf-pages");
    
      if (!tool) {
        return (
          <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
            Tool not found
          </div>
        );
      }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="extract-pdf-pages" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="extract-pdf-pages" toolType="pdf" />
    </div>
  );
}