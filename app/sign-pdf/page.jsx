import React from "react";
import SignPdf from "../../components/SignPdf";
import { TOOLS_CONFIG } from "../../utils/constants";
import InfoSection from "@/components/InfoSection";
import RelatedTools from "@/components/RelatedTools";
import RelatedBlogs from "@/components/RelatedBlogs";

export const metadata = {
  title: "Sign PDF Online Free – Add Your Signature to a PDF | GoPDFGo",
  description:
    "Sign a PDF online free. Draw, type, or upload your signature, place it on any page, and download — 100% in your browser, no upload. Works on mobile.",
  keywords:
    "sign pdf, sign pdf online, add signature to pdf, esign pdf, electronic signature pdf, draw signature on pdf, sign pdf free, sign document online",
  alternates: {
    canonical: "https://gopdfgo.com/sign-pdf",
  },
};

export default function SignPdfPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "sign-pdf");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SignPdf />
      <InfoSection info={tool.info} />
      <RelatedTools currentToolId="sign-pdf" toolType="pdf" />
      <RelatedBlogs toolId="sign-pdf" />
    </div>
  );
}
