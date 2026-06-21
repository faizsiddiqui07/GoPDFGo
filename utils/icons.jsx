// src/utils/icons.js

import React from "react";
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
  ArrowRightLeft,
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
  ImageDown,
  LayoutGrid,
  PenTool,
} from "lucide-react";

// Icons mapping
export const TOOL_ICONS = {
  // New Tools
  "compress-webp": <Zap className="w-5 h-5 text-green-600" />,
  "compress-jpg": <FileImage className="w-5 h-5 text-blue-600" />,
  "compress-jpeg": <FileImage className="w-5 h-5 text-blue-500" />,

  // Existing Tools
  "convert-webp": <Zap className="w-5 h-5 text-green-500" />,
  "convert-png": <ImageIcon className="w-5 h-5 text-purple-600" />,
  "convert-jpeg": <FileImage className="w-5 h-5 text-indigo-600" />,
  flip: <FlipHorizontal className="w-5 h-5 text-indigo-500" />,
  resize: <Maximize2 className="w-5 h-5 text-blue-500" />,
  crop: <Crop className="w-5 h-5 text-teal-500" />,
  rotate: <RotateCw className="w-5 h-5 text-yellow-500" />,
  "color-picker": <Palette className="w-5 h-5 text-rose-500" />,
  "convert-general": <ArrowRightLeft className="w-5 h-5 text-slate-500" />,
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
  "heic-to-jpg": <ImageDown className="w-5 h-5 text-blue-500" />,
  "heic-to-png": <ImageDown className="w-5 h-5 text-purple-500" />,
  "heic-to-webp": <ImageDown className="w-5 h-5 text-green-500" />,
  "organize-pdf": <LayoutGrid className="w-5 h-5 text-orange-500" />,
  "sign-pdf": <PenTool className="w-5 h-5 text-orange-600" />,
};

export const getToolIcon = (toolId) => {
  return TOOL_ICONS[toolId] || <ImageIcon className="w-5 h-5 text-gray-500" />;
};