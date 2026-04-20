import React from "react";
import QrGenerator from "../../components/QrGenerator"; 
import { TOOLS_CONFIG } from "../../utils/constants";

export const metadata = {
  title: "Free QR Code Generator Online – No Expiration | GoPDFGo",
  description:
    "Create static, permanent QR codes for URLs, text, and Wi-Fi. 100% free, no sign-up required, and your QR codes will never expire.",
  keywords:
    "qr code generator, free qr code maker, static qr code, generate qr code online, wifi qr code generator, permanent qr code, no expire qr code",
  alternates: {
    canonical: "https://gopdfgo.com/qr-generator",
  },
};

export default function QrGeneratorPage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "qr-generator");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <QrGenerator toolId="qr-generator" />
    </div>
  );
}