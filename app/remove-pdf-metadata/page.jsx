import React from "react";
import PdfMetadata from "../../components/PdfMetadata";
import { TOOLS_CONFIG } from "../../utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "Remove PDF Metadata Online Free – No Upload | GoPDFGo",
  description:
    "See and remove the hidden title, author, and software details inside a PDF. Edit or strip metadata entirely in your browser — nothing is uploaded.",
  keywords:
    "remove pdf metadata, pdf metadata remover, remove author from pdf, edit pdf metadata online, check pdf metadata, strip pdf properties, remove pdf document properties, pdf metadata viewer online free",
  alternates: {
    canonical: "https://gopdfgo.com/remove-pdf-metadata",
  },
};

export default function RemovePdfMetadataPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "remove-pdf-metadata");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfMetadata />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="remove-pdf-metadata" toolType="pdf" />
      <RelatedBlogs toolId="remove-pdf-metadata" />
    </div>
  );
}
