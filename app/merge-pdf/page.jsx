import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "@/utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "Merge PDF Online Free – Combine Multiple PDFs Into One | GoPDFGo",
  description:
    "Merge multiple PDF files into one document online. Fast, secure, and private PDF merger that works directly in your browser.",
  keywords:
    "merge pdf, combine pdf, pdf merger online, join pdf files, merge pdf online, combine pdf files, pdf merger free, join pdf files online, merge multiple pdfs, browser based pdf merger, secure pdf merge tool",
  alternates: {
    canonical: "https://gopdfgo.com/merge-pdf",
  },
};

export default function MergePDFPage() {
    const tool = TOOLS_CONFIG.find((t) => t.id === "merge-pdf");
    
      if (!tool) {
        return (
          <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
            Tool not found
          </div>
        );
      }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="merge-pdf" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="merge-pdf" toolType="pdf" />
      <RelatedBlogs toolId="merge-pdf" />
    </div>
  );
}