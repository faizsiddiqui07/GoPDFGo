import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "@/utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "Delete PDF Pages Online Free – Remove Pages from PDF | GoPDFGo",
  description:
    "Remove unwanted, blank, or extra pages from a PDF visually. Secure, browser-based, lossless on the pages you keep. No upload, no watermark.",
  keywords:
    "delete pdf pages, remove pages from pdf, delete page from pdf online, remove blank pages pdf, pdf page remover, free delete pdf pages tool",
  alternates: {
    canonical: "https://gopdfgo.com/delete-pdf-pages",
  },
};

export default function DeletePdfPagesPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "delete-pdf-pages");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="delete-pdf-pages" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="delete-pdf-pages" toolType="pdf" />
      <RelatedBlogs toolId="delete-pdf-pages" />
    </div>
  );
}
