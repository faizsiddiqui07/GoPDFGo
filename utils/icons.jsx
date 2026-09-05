// src/utils/icons.js

import React from "react";
import { TOOLS_CONFIG } from "./constants";
import {
  Minimize2,
  Zap,
  ImageIcon,
  FileImage,
  FlipHorizontal,
  Maximize2,
  Crop,
  RotateCw,
  Palette,
  ShieldAlert,
  Layers,
  Scissors,
  FileDigit,
  QrCode,
  FileText,
  GripVertical,
  FileOutput,
  Stamp,
  FileMinus,
  Unlock,
  Type,
  ScanText,
  Combine,
  ImageDown,
  LayoutGrid,
  PenTool,
  FileSearch,
} from "lucide-react";

// Icons mapping
export const TOOL_ICONS = {
  // New Tools
  "compress-webp": <Zap className="w-5 h-5 text-green-600" />,
  "compress-jpg": <FileImage className="w-5 h-5 text-blue-600" />,
  "compress-jpeg": <FileImage className="w-5 h-5 text-blue-500" />,
  "compress-png": <Minimize2 className="w-5 h-5 text-purple-600" />,

  // Existing Tools
  "convert-webp": <Zap className="w-5 h-5 text-green-500" />,
  "convert-png": <ImageIcon className="w-5 h-5 text-purple-600" />,
  "convert-jpg": <FileImage className="w-5 h-5 text-indigo-600" />,
  flip: <FlipHorizontal className="w-5 h-5 text-indigo-500" />,
  resize: <Maximize2 className="w-5 h-5 text-blue-500" />,
  crop: <Crop className="w-5 h-5 text-teal-500" />,
  rotate: <RotateCw className="w-5 h-5 text-yellow-500" />,
  "color-picker": <Palette className="w-5 h-5 text-rose-500" />,
  "aadhaar-masking": <ShieldAlert className="w-5 h-5 text-red-600" />,
  "merge-pdf": <Layers className="w-5 h-5 text-red-500" />,
  "split-pdf": <Scissors className="w-5 h-5 text-orange-500" />,
  "page-numbers": <FileDigit className="w-5 h-5 text-blue-600" />,
  "image-to-pdf": <FileImage className="w-5 h-5 text-pink-500" />,
  "compress-pdf": <FileText className="w-5 h-5 text-red-400" />,
  "rotate-pdf": <RotateCw className="w-5 h-5 text-blue-600" />,
  "qr-generator": <QrCode className="w-5 h-5 text-gray-700" />,
  "rearrange-pdf": <GripVertical className="w-5 h-5 text-green-400" />,
  "extract-pdf-pages": <FileOutput className="w-5 h-5 text-blue-400" />,
  "pdf-to-image": <FileImage className="w-5 h-5 text-blue-500" />,
  "watermark-pdf": <Stamp className="w-5 h-5 text-orange-500" />,
  "delete-pdf-pages": <FileMinus className="w-5 h-5 text-red-500" />,
  "unlock-pdf": <Unlock className="w-5 h-5 text-green-600" />,
  "pdf-to-text": <Type className="w-5 h-5 text-blue-600" />,
  "ocr-pdf": <ScanText className="w-5 h-5 text-blue-600" />,
  "combine-images": <Combine className="w-5 h-5 text-purple-500" />,
  "heic-to-jpg": <ImageDown className="w-5 h-5 text-blue-500" />,
  "heic-to-png": <ImageDown className="w-5 h-5 text-purple-500" />,
  "heic-to-webp": <ImageDown className="w-5 h-5 text-green-500" />,
  "organize-pdf": <LayoutGrid className="w-5 h-5 text-orange-500" />,
  "sign-pdf": <PenTool className="w-5 h-5 text-orange-600" />,
  "remove-pdf-metadata": <FileSearch className="w-5 h-5 text-slate-600" />,
};

export const getToolIcon = (toolId) => {
  if (TOOL_ICONS[toolId]) return TOOL_ICONS[toolId];
  // Not in the map: fall back to the icon the tool already declares in
  // TOOLS_CONFIG, so a newly added tool shows its own icon instead of a
  // generic one. The map is only here to override the tint per tool.
  const Icon = TOOLS_CONFIG.find((t) => t.id === toolId)?.icon;
  if (Icon) return <Icon className="w-5 h-5 text-slate-500" />;
  return <ImageIcon className="w-5 h-5 text-gray-500" />;
};