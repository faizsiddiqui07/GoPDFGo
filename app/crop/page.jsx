import React from "react";
import ImageEditor from "../../components/ImageEditor";
import { TOOLS_CONFIG } from "@/utils/constants";

export const metadata = {
  title: "Crop Image Online – Trim Photos Easily Free | GoPDFGo",
  description:
    "Crop images online to remove unwanted areas. Simple visual image cropper with instant preview and download.",
  keywords:
    "crop image, image cropper online, trim photos, crop image online, image cropper tool, trim photos online, cut image online, resize and crop images, photo cropping tool, browser based image editor",
  alternates: {
    canonical: "https://gopdfgo.com/crop",
  },
};

export default function CropImagePage() {
  const tool = TOOLS_CONFIG.find((t) => t.id === "crop");

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold text-xl">
        Tool not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ImageEditor toolId="crop" />
    </div>
  );
}
