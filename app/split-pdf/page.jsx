import React from "react";
import { TOOLS_CONFIG } from "../../utils/constants";
import PdfEditor from "@/components/PdfEditor";

export const metadata = {
  title: "Split PDF Online Free – Extract Specific PDF Pages | GoPDFGo",
  description:
    "Extract specific pages from a PDF or split it into multiple files. 100% secure, browser-based extraction with no file uploads.",
  keywords:
    "split pdf, extract pdf pages, separate pdf pages, split pdf online free, cut pdf file, divide pdf pages, secure pdf splitter, browser based pdf extraction",
  alternates: {
    canonical: "https://gopdfgo.com/split-pdf",
  },
};

export default function SplitPDFPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "split-pdf");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="split-pdf" />
    </div>
  );
}