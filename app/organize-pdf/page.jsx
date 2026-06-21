import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "../../utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "Organize PDF – Reorder, Rotate & Delete Pages Free | GoPDFGo",
  description:
    "Organize a PDF on one screen: drag to reorder, rotate, and delete pages together, then download. The all-in-one PDF page organizer — free, private, no upload.",
  keywords:
    "organize pdf, organize pdf pages, pdf page organizer, manage pdf pages, edit pdf pages online, reorder rotate and delete pdf pages, sort pdf pages, all in one pdf page editor",
  alternates: {
    canonical: "https://gopdfgo.com/organize-pdf",
  },
};

export default function OrganizePdfPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "organize-pdf");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="organize-pdf" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="organize-pdf" toolType="pdf" />
      <RelatedBlogs toolId="organize-pdf" />
    </div>
  );
}
