import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "@/utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "Unlock PDF Online Free – Remove PDF Password | GoPDFGo",
  description:
    "Remove the password from a PDF you can already open (e.g. bank or card statements) so portals accept it. Secure, browser-based, your file never leaves your device.",
  keywords:
    "unlock pdf, remove pdf password, remove password from pdf, unlock bank statement pdf, decrypt pdf online, password remover pdf, open locked pdf for upload",
  alternates: {
    canonical: "https://gopdfgo.com/unlock-pdf",
  },
};

export default function UnlockPdfPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "unlock-pdf");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="unlock-pdf" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="unlock-pdf" toolType="pdf" />
      <RelatedBlogs toolId="unlock-pdf" />
    </div>
  );
}
