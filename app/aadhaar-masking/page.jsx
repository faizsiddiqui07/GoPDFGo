import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "@/utils/constants";

// --- Next.js Native SEO ---
export const metadata = {
  title: "Aadhaar Card Masking Online – Secure ID Masking Tool | GoPDFGo",
  description:
    "Mask Aadhaar card numbers online securely. Hide first 8 digits for KYC compliance without uploading your ID.",
  keywords:
    "aadhaar masking, mask aadhaar online, id masking tool,aadhaar masking online, mask aadhaar card, aadhaar card masking tool, secure id masking, kyc compliant aadhaar masking, hide aadhaar number online, privacy friendly aadhaar tool",
  alternates: {
    canonical: "https://gopdfgo.com/aadhaar-masking",
  },
};

export default function AadhaarMaskingPage() {

    const tool = TOOLS_CONFIG.find((t) => t.id === "aadhaar-masking");
    
      if (!tool) {
        return (
          <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
            Tool not found
          </div>
        );
      }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hum poora object nahi, sirf string pass kar rahe hain */}
      <ImageEditor toolId="aadhaar-masking" />
    </div>
  );
}