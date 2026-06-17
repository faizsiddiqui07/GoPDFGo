import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "../../utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "Add Page Numbers to PDF Online Free | GoPDFGo",
  description:
    "Add page numbers to PDF documents online. Insert professional numbering securely with no uploads or watermarks.",
  keywords:
    "add page numbers pdf, pdf numbering, page numbers online, add page numbers to pdf, pdf page numbering online, insert page numbers pdf, number pdf pages online, pdf footer numbering, browser based pdf editor",
  alternates: {
    canonical: "https://gopdfgo.com/page-numbers",
  },
};

export default function PageNumbersPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "page-numbers");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="page-numbers" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="page-numbers" toolType="pdf" />
      <RelatedBlogs toolId="page-numbers" />
    </div>
  );
}