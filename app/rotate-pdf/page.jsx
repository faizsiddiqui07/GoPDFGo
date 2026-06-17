import React from "react";
import PdfEditor from "../../components/PdfEditor"; // Dhyan rakhein PDF tool hai
import { TOOLS_CONFIG } from "../../utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "Rotate PDF Pages Permanently Online Free | GoPDFGo",
  description:
    "Rotate PDF pages 90 or 180 degrees and save them permanently. Secure, local processing ensures your documents stay private.",
  keywords:
    "rotate pdf, turn pdf pages, fix upside down pdf, rotate pdf online, permanent pdf rotation, change pdf orientation, secure pdf editor",
  alternates: {
    canonical: "https://gopdfgo.com/rotate-pdf",
  },
};

export default function RotatePDFPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "rotate-pdf");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PdfEditor toolId="rotate-pdf" />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="rotate-pdf" toolType="pdf" />
      <RelatedBlogs toolId="rotate-pdf" />
    </div>
  );
}