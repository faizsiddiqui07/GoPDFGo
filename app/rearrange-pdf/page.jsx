import React from "react";
import PdfEditor from "../../components/PdfEditor";
import { TOOLS_CONFIG } from "@/utils/constants";

export const metadata = {
  title: "Rearrange PDF Pages Online (No Server Upload) | GoPDFGo",
  description:
    "Reorder, move, and organize PDF pages easily with a visual drag-and-drop editor. 100% private, fast, and secure client-side processing with zero server uploads.",
  keywords:
    "rearrange pdf, reorder pdf pages, move pdf pages, organize pdf, change pdf page order, client side pdf organizer, browser based pdf tool, secure pdf reorder",
  alternates: {
    canonical: "https://gopdfgo.com/rearrange-pdf",
  },
};

export default function RearrangePDFPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "rearrange-pdf");
  
  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="rearrange-pdf" />
    </div>
  );
}