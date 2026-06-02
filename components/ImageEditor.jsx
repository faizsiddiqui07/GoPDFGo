"use client"; // REQUIRED: Isme bahut saari state aur hooks hain

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Download,
  ImageIcon,
  ArrowLeft,
  Zap,
  Trash2,
  CheckCircle,
  RotateCw,
  RotateCcw,
  Loader2,
  Archive,
  FlipHorizontal,
  FlipVertical,
  ArrowRightLeft,
  Crop as CropIcon,
  Palette,
  ZoomIn,
  Copy,
  ShieldAlert,
} from "lucide-react";
import InfoSection from "./InfoSection";
import { formatBytes } from "../utils/helpers";
import { WORKER_CODE } from "../utils/worker";
import RelatedTools from "./RelatedTools";
import { TOOLS_CONFIG } from "@/utils/constants";

const ImageEditor = ({ toolId }) => {
  const tool = TOOLS_CONFIG.find((t) => t.id === toolId);
  const router = useRouter();

  // --- STATE ---
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [batchResults, setBatchResults] = useState([]);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [jsZipLoaded, setJsZipLoaded] = useState(false);

  // Editor States
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
  });
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [filter, setFilter] = useState("none");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true); // ✅ BUG FIX 9: UI Added below

  // Color Picker State
  const [pickedColor, setPickedColor] = useState(null);
  const [hoverColor, setHoverColor] = useState(null);
  const [colorPalette, setColorPalette] = useState([]); // ✅ BUG FIX 6: Removed pickedColors dead code
  const [magnifier, setMagnifier] = useState({
    x: 0,
    y: 0,
    show: false,
    color: null,
  });

  // Compression/Format States
  const [format, setFormat] = useState(tool.config.defaultFormat || "original");
  const [quality, setQuality] = useState(0.8);
  const [compareSliderPos, setCompareSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [batchQuality, setBatchQuality] = useState(0.8);
  const [batchProgress, setBatchProgress] = useState({
    current: 0,
    total: 0,
    processed: 0,
    eta: 0, // ✅ BUG FIX 7: ETA Logic added in processBatch
  });
  const [processingTimes, setProcessingTimes] = useState([]);
  const [compressionStats, setCompressionStats] = useState(null);

  // --- REFS ---
  const originalImageRef = useRef(null);
  const aspectRatioRef = useRef(0);
  const cropContainerRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const workerRef = useRef(null);
  const currentUrlsRef = useRef({ preview: null, converted: null, batch: [] });
  const pickerCanvasRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const CONCURRENCY_LIMIT = 5;

  // --- IDENTIFY TOOL TYPE ---
  const isMaskingTool = tool.id.includes("mask");
  const isCompressor = [
    "compress-webp",
    "compress-jpg",
    "compress-jpeg",
  ].includes(tool.id);
  const isConverter = tool.id.includes("convert");
  const isInstantTool = ["rotate", "flip"].includes(tool.id);
  const isColorPicker = tool.id === "color-picker";
  const isGeneralTool =
    !isCompressor && !isConverter && !isInstantTool && !isColorPicker;

  // --- CLEANUP ---
  const cleanupUrls = useCallback(() => {
    if (currentUrlsRef.current.preview)
      URL.revokeObjectURL(currentUrlsRef.current.preview);
    if (currentUrlsRef.current.converted)
      URL.revokeObjectURL(currentUrlsRef.current.converted);
    currentUrlsRef.current.batch.forEach((url) => URL.revokeObjectURL(url));
    currentUrlsRef.current = { preview: null, converted: null, batch: [] };
  }, []);

  // Worker Init
  useEffect(() => {
    const workerBlob = new Blob([WORKER_CODE], { type: "text/javascript" });
    const workerUrl = URL.createObjectURL(workerBlob);
    workerRef.current = new Worker(workerUrl);

    if (!window.JSZip) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      script.async = true;
      script.onload = () => setJsZipLoaded(true);
      document.body.appendChild(script);
    } else setJsZipLoaded(true);

    return () => {
      cleanupUrls();
      if (workerRef.current) workerRef.current.terminate();
      URL.revokeObjectURL(workerUrl);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [cleanupUrls]);

  useEffect(() => {
    if (files.length > 0) {
      if (tool.config.defaultFormat) setFormat(tool.config.defaultFormat);
      else setFormat("original");
    }
  }, [files, tool.id, tool.config.defaultFormat]);

  // ✅ BUG FIX 3: Fixed runWorkerTask parameters to avoid duplicate bitmap param bug
  const runWorkerTask = (taskData, transferList = []) => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) return reject("Worker not ready");
      const msgHandler = (e) => {
        if (e.data.fileId === taskData.fileId) {
          workerRef.current.removeEventListener("message", msgHandler);
          if (e.data.success) resolve(e.data.blob);
          else reject(e.data.error);
        }
      };
      workerRef.current.addEventListener("message", msgHandler);
      const { bitmap, ...safeData } = taskData;
      workerRef.current.postMessage({ ...safeData, bitmap }, [
        bitmap,
        ...transferList,
      ]);
    });
  };

  const requestProcessImage = useCallback(() => {
    if (!files[0] || !originalImageRef.current || isBatchMode) return;
    if (tool.id === "color-picker") return;

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (!isInstantTool) setIsProcessing(true);

    debounceTimerRef.current = setTimeout(() => {
      processSingleImage();
    }, 300);
  }, [
    files,
    isBatchMode,
    width,
    height,
    rotation,
    flipH,
    flipV,
    filter,
    format,
    quality,
    crop,
    tool.id,
  ]);

  useEffect(() => {
    if (files.length === 0) return;
    if (
      tool.id.includes("compress") ||
      tool.id.includes("convert") ||
      tool.id === "rotate" ||
      tool.id === "flip"
    ) {
      requestProcessImage();
    }
  }, [
    width,
    height,
    rotation,
    flipH,
    flipV,
    filter,
    format,
    quality,
    crop,
    requestProcessImage,
    tool.id,
  ]);

  const handleFileChange = (selectedFiles) => {
    let fileList = Array.from(selectedFiles);

    if (tool.config.accept) {
      const allowedExtensions = tool.config.accept
        .split(",")
        .map((ext) => ext.trim().toLowerCase());
      const validFiles = fileList.filter((f) => {
        if (tool.config.accept.includes(f.type)) return true;
        const ext = "." + f.name.split(".").pop().toLowerCase();
        return allowedExtensions.includes(ext);
      });
      if (validFiles.length === 0 && fileList.length > 0) {
        alert(
          `Incorrect file type! Only ${tool.config.accept
            .replace(/image\//g, "")
            .toUpperCase()
            .replace(/\./g, "")} allowed.`,
        );
        return;
      }
      fileList = validFiles;
    } else {
      fileList = fileList.filter((f) => f.type.startsWith("image/"));
    }

    if (fileList.length === 0) return;

    cleanupUrls();
    setFiles([]);
    setBatchResults([]);
    setPreviewUrl(null);
    setConvertedUrl(null);

    setColorPalette([]);
    setPickedColor(null);
    setHoverColor(null);

    setTimeout(() => {
      setFiles(fileList);
      setCompressionStats(null);
      setBatchProgress({
        current: 0,
        total: fileList.length,
        processed: 0,
        eta: 0,
      });
      setProcessingTimes([]);

      if (fileList.length > 1 && tool.config.allowBatch) {
        setIsBatchMode(true);
        setBatchResults([]);
      } else {
        setIsBatchMode(false);
        loadFileForEdit(fileList[0]);
      }
    }, 50);
  };

  const loadFileForEdit = (file) => {
    setIsProcessing(true);
    const url = URL.createObjectURL(file);
    if (currentUrlsRef.current.preview)
      URL.revokeObjectURL(currentUrlsRef.current.preview);
    currentUrlsRef.current.preview = url;
    setPreviewUrl(url);

    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setFilter("none");

    const img = new Image();
    img.src = url;
    img.onload = () => {
      originalImageRef.current = img;
      let initialWidth = img.width;
      let initialHeight = img.height;

      setWidth(initialWidth);
      setHeight(initialHeight);
      setCrop({ x: 0, y: 0, w: 0, h: 0, isDragging: false });
      aspectRatioRef.current = img.width / img.height;

      if (
        tool.id.includes("compress") ||
        tool.id.includes("convert") ||
        tool.id === "rotate" ||
        tool.id === "flip"
      ) {
        // Triggered via useEffect
      } else {
        setIsProcessing(false);
      }
    };
  };

  const processSingleImage = async (qualityOverride = null) => {
    if (!files[0] || !originalImageRef.current) return;

    if (!isInstantTool) setIsProcessing(true);

    try {
      const file = files[0];
      const bitmap = await createImageBitmap(file);
      const activeQuality =
        qualityOverride !== null ? qualityOverride : quality;

      const taskData = {
        fileId: "single-" + Date.now(),
        bitmap,
        w: width,
        h: height,
        fmt: format === "original" ? file.type : format,
        q: activeQuality,
        cx: crop.x,
        cy: crop.y,
        cw: crop.w,
        ch: crop.h,
        rot: rotation,
        flipH,
        flipV,
        filter,
        showVisualCrop: tool.config.showVisualCrop,
        isMasking: isMaskingTool,
        originalMimeType: file.type,
      };

      // ✅ BUG FIX 3 applied here (bitmap param removed)
      let blob = await runWorkerTask(taskData);

      let finalBlob = blob;
      let isReverted = false;
      const inputFormat = file.type;
      const outputFormat = format === "original" ? file.type : format;
      const isModified =
        width !== originalImageRef.current.width ||
        height !== originalImageRef.current.height ||
        rotation !== 0 ||
        crop.w !== 0 ||
        flipH ||
        flipV;

      if (
        blob.size >= file.size &&
        inputFormat === outputFormat &&
        !isModified &&
        !tool.config.showVisualCrop &&
        !isMaskingTool
      ) {
        finalBlob = file;
        isReverted = true;
      }

      const newUrl = URL.createObjectURL(finalBlob);
      if (currentUrlsRef.current.converted)
        URL.revokeObjectURL(currentUrlsRef.current.converted);
      currentUrlsRef.current.converted = newUrl;

      setConvertedUrl(newUrl);
      setFileSize(formatBytes(finalBlob.size));

      const original = file.size;
      const compressed = finalBlob.size;
      const saved = original - compressed;
      const percent = saved > 0 ? ((saved / original) * 100).toFixed(1) : 0;
      setCompressionStats({ original, compressed, percent, isReverted });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const processBatch = async () => {
    setIsProcessing(true);
    setBatchResults([]);
    currentUrlsRef.current.batch.forEach((url) => URL.revokeObjectURL(url));
    currentUrlsRef.current.batch = [];
    const executing = [];
    let processedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setBatchProgress((prev) => ({
        ...prev,
        current: i + 1,
        processed: processedCount,
      }));

      const p = (async () => {
        const startTime = Date.now();
        try {
          const bitmap = await createImageBitmap(file);
          const taskData = {
            fileId: `batch-${i}-${Date.now()}`,
            bitmap,
            w: bitmap.width,
            h: bitmap.height,
            fmt: format === "original" ? file.type : format,
            q: batchQuality,
            cx: 0,
            cy: 0,
            cw: bitmap.width,
            ch: bitmap.height,
            rot: 0,
            flipH: false,
            flipV: false,
            filter: "none",
            showVisualCrop: false,
            isMasking: false,
            originalMimeType: file.type,
          };
          // ✅ BUG FIX 3 applied here
          let blob = await runWorkerTask(taskData);

          if (blob.size >= file.size && format === "original") blob = file;

          const resultUrl = URL.createObjectURL(blob);
          currentUrlsRef.current.batch.push(resultUrl);

          const original = file.size;
          const saved = original - blob.size;
          const percent = saved > 0 ? ((saved / original) * 100).toFixed(0) : 0;

          setBatchResults((prev) => [
            ...prev,
            {
              id: taskData.fileId,
              name: file.name,
              url: resultUrl,
              blob,
              size: formatBytes(blob.size),
              originalSize: formatBytes(original),
              stats: { original, compressed: blob.size, percent, saved },
            },
          ]);

          processedCount++;

          // ✅ BUG FIX 7: Calculate ETA accurately
          setProcessingTimes((prevTimes) => {
            const newTimes = [...prevTimes, (Date.now() - startTime) / 1000];
            const avgTime =
              newTimes.reduce((a, b) => a + b, 0) / newTimes.length;
            const remainingFiles = files.length - processedCount;
            const newEta = Math.round(avgTime * remainingFiles);

            setBatchProgress((p) => ({
              ...p,
              processed: processedCount,
              eta: newEta,
            }));
            return newTimes;
          });
        } catch (e) {
          processedCount++;
          setBatchProgress((prev) => ({ ...prev, processed: processedCount }));
        }
      })();
      const wrappedPromise = p.then(() => {
        const idx = executing.indexOf(wrappedPromise);
        if (idx > -1) executing.splice(idx, 1);
      });
      executing.push(wrappedPromise);
      if (executing.length >= CONCURRENCY_LIMIT) await Promise.race(executing);
    }
    await Promise.all(executing);
    setIsProcessing(false);
    setBatchProgress((prev) => ({
      ...prev,
      current: files.length,
      processed: files.length,
      eta: 0,
    }));
  };

  const handleDownloadClick = () => {
    if (!convertedUrl) return;
    const link = document.createElement("a");
    link.href = convertedUrl;
    let ext = "jpg";

    if (compressionStats?.isReverted && files[0] && !isMaskingTool) {
      ext = files[0].name.split(".").pop();
    } else {
      if (format === "original" && files[0])
        ext = files[0].name.split(".").pop();
      else if (format.includes("png")) ext = "png";
      else if (format.includes("webp")) ext = "webp";
      else if (format.includes("gif")) ext = "gif";
    }

    link.download = `processed_image.${ext}`;
    link.click();
  };

  const downloadZip = async () => {
    if (!window.JSZip || batchResults.length === 0) return;
    const zip = new window.JSZip();
    batchResults.forEach((res) => {
      let ext = res.blob.type.split("/")[1];
      zip.file(`${res.name.split(".")[0]}_processed.${ext}`, res.blob);
    });
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `images.zip`;
    link.click();
  };

  const handleClearAll = () => {
    cleanupUrls();
    setFiles([]);
    setBatchResults([]);
    setPreviewUrl(null);
    setConvertedUrl(null);
    setIsBatchMode(false);
    setIsProcessing(false);
    setBatchProgress({ current: 0, total: 0, processed: 0, eta: 0 });
    setColorPalette([]);
    setPickedColor(null);
    setRotation(0);
    setFilter("none");
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    if (updated.length === 0) return handleClearAll();
    setFiles(updated);
    if (updated.length === 1 && isBatchMode) {
      setIsBatchMode(false);
      loadFileForEdit(updated[0]);
    }
  };

  const handleSliderMove = (e) => {
    if (!isDraggingSlider || !sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setCompareSliderPos((x / rect.width) * 100);
  };

  const handleSliderInteractionStart = (e) => {
    setIsDraggingSlider(true);
    if (sliderContainerRef.current) {
      const rect = sliderContainerRef.current.getBoundingClientRect();
      const clientX = e.type.includes("touch")
        ? e.touches[0].clientX
        : e.clientX;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setCompareSliderPos((x / rect.width) * 100);
    }
  };

  const handleMouseMove = (e) => {
    if (tool.config.mode !== "picker" || !originalImageRef.current) return;
    if (!pickerCanvasRef.current) {
      pickerCanvasRef.current = document.createElement("canvas");
      pickerCanvasRef.current.width = 1;
      pickerCanvasRef.current.height = 1;
    }
    const ctx = pickerCanvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setHoverColor(null);
      setMagnifier((prev) => ({ ...prev, show: false }));
      return;
    }

    const nx = Math.floor(
      (x / rect.width) * originalImageRef.current.naturalWidth,
    );
    const ny = Math.floor(
      (y / rect.height) * originalImageRef.current.naturalHeight,
    );

    ctx.drawImage(originalImageRef.current, -nx, -ny);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
    const rgb = `rgb(${r}, ${g}, ${b})`;

    setHoverColor({ hex, rgb });
    setMagnifier({ x, y, show: true, color: hex });
  };

  const handleColorClick = () => {
    if (hoverColor) {
      setPickedColor(hoverColor);
      setColorPalette((prev) => {
        const newPalette = [hoverColor, ...prev].filter(
          (v, i, a) => a.findIndex((t) => t.hex === v.hex) === i,
        );
        return newPalette.slice(0, 10);
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // --- MOUSE & TOUCH EVENT HANDLERS FOR CROP/MASK ---
  const handleCropInteractionStart = (e) => {
    if (!tool.config.showVisualCrop && !isMaskingTool) return;

    const rect = cropContainerRef.current.getBoundingClientRect();

    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

    setCrop((p) => ({
      ...p,
      isDragging: true,
      startX:
        (clientX - rect.left) * (originalImageRef.current.width / rect.width),
      startY:
        (clientY - rect.top) * (originalImageRef.current.height / rect.height),
      w: 0,
      h: 0,
    }));
  };

  const handleCropInteractionMove = (e) => {
    if (!crop.isDragging) return;

    const rect = cropContainerRef.current.getBoundingClientRect();

    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

    const currX = Math.max(
      0,
      Math.min(
        (clientX - rect.left) * (originalImageRef.current.width / rect.width),
        originalImageRef.current.width,
      ),
    );
    const currY = Math.max(
      0,
      Math.min(
        (clientY - rect.top) * (originalImageRef.current.height / rect.height),
        originalImageRef.current.height,
      ),
    );

    setCrop((p) => ({
      ...p,
      x: Math.min(p.startX, currX),
      y: Math.min(p.startY, currY),
      w: Math.abs(currX - p.startX),
      h: Math.abs(currY - p.startY),
    }));
  };

  const handleInteractionEnd = () => {
    if (crop.isDragging) {
      setCrop((p) => ({ ...p, isDragging: false }));
      requestProcessImage();
    }
    setIsDraggingSlider(false);
  };

  // ✅ BUG FIX 5: Calculate dynamic aspect ratio to prevent squishing portrait images
  const imageAspectRatio = originalImageRef.current
    ? `${originalImageRef.current.width} / ${originalImageRef.current.height}`
    : "16 / 9";

  return (
    <div
      className="max-w-7xl mx-auto px-4 pt-8 animate-fade-in-up"
      onMouseUp={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
      onMouseMove={(e) => {
        if (isDraggingSlider) handleSliderMove(e);
      }}
      onTouchMove={(e) => {
        if (isDraggingSlider) handleSliderMove(e);
      }}
    >
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-slate-500 hover:text-[#FF9933] flex items-center gap-1 text-sm font-medium mb-3 transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Tools
        </button>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <tool.icon size={28} className="text-blue-500" />
          {tool.title}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-150">
        {/* LEFT PANEL */}
        <div className="p-6 md:p-8 border-r border-slate-200 flex flex-col h-full bg-white z-10">
          {files.length === 0 ? (
            <div
              className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer ${
                isDragging
                  ? "border-[#FF9933] bg-orange-50"
                  : "border-slate-300 hover:border-[#FF9933] hover:bg-orange-50"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileChange(e.dataTransfer.files);
              }}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input
                type="file"
                id="fileInput"
                multiple={tool.config.allowBatch}
                className="hidden"
                accept={tool.config.accept || "image/*"}
                onChange={(e) => handleFileChange(e.target.files)}
              />
              <div className="bg-orange-100 p-4 rounded-full mb-4 shadow-sm">
                <Upload className="w-8 h-8 text-[#FF9933]" />
              </div>
              <p className="text-lg font-bold text-slate-700">
                Click to Upload {tool.config.allowBatch ? "Images" : "Image"}
              </p>
              {tool.config.accept && (
                <p className="text-xs text-slate-400 mt-2 font-medium bg-slate-50 inline-block px-2 py-1 rounded border border-slate-100 uppercase">
                  Allows:{" "}
                  {tool.config.accept
                    .replace(/image\//g, "")
                    .replace(/\./g, " ")
                    .toUpperCase()}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                  <ImageIcon size={18} />{" "}
                  {isBatchMode
                    ? `Batch (${files.length})`
                    : isColorPicker
                      ? "Color Palette"
                      : "Editing"}
                </h3>
                <button
                  onClick={handleClearAll}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {isBatchMode ? (
                <>
                  {/* Batch UI */}
                  {isProcessing && (
                    <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-700">
                          Processing {batchProgress.current}/
                          {batchProgress.total}
                          {batchProgress.eta > 0 &&
                            ` (~${batchProgress.eta}s left)`}
                        </span>
                        <span className="text-xs text-blue-600 font-medium">
                          {Math.round(
                            (batchProgress.processed / batchProgress.total) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (batchProgress.processed / batchProgress.total) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="flex-1 overflow-y-auto border border-slate-100 rounded-lg bg-slate-50 p-2 space-y-2 max-h-50">
                    {files.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 bg-white rounded border border-slate-200 shadow-sm"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-700 truncate">
                            {f.name}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {formatBytes(f.size)}
                          </p>
                        </div>
                        {batchResults.find((r) => r.name === f.name) ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : isProcessing && i < batchProgress.current ? (
                          <Loader2
                            size={14}
                            className="text-blue-500 animate-spin"
                          />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs text-slate-500">
                      Batch Quality ({Math.round(batchQuality * 100)}%)
                    </span>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={batchQuality}
                      onChange={(e) =>
                        setBatchQuality(parseFloat(e.target.value))
                      }
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none accent-[#FF9933] cursor-pointer"
                    />
                    <button
                      onClick={processBatch}
                      disabled={isProcessing}
                      className="w-full bg-[#FF9933] hover:bg-[#e68a2e] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap size={20} /> Start Batch
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Single Editor UI */}
                  {!isColorPicker && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="w-12 h-12 bg-white rounded overflow-hidden flex items-center justify-center">
                        <img
                          src={previewUrl}
                          alt="Thumb"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 truncate">
                          {files[0]?.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatBytes(files[0]?.size)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    {/* --- ADVANCED COLOR PICKER UI --- */}
                    {isColorPicker && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <p className="text-sm font-bold text-slate-700 mb-2">
                            Currently Picking
                          </p>
                          {hoverColor ? (
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="w-16 h-16 rounded-full border-4 border-white shadow-lg transition-colors"
                                style={{ backgroundColor: hoverColor.hex }}
                              ></div>
                              <div className="bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                                <p className="text-lg font-mono font-bold text-slate-800">
                                  {hoverColor.hex}
                                </p>
                                <p className="text-xs text-slate-500 font-mono">
                                  {hoverColor.rgb}
                                </p>
                              </div>
                              <p className="text-xs text-blue-500 animate-pulse">
                                Click image to save
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-slate-400 py-4">
                              <ZoomIn size={32} />
                              <p className="text-sm">Hover over image</p>
                            </div>
                          )}
                        </div>

                        {colorPalette.length > 0 && (
                          <div className="animate-fade-in-up">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Palette size={16} /> Saved Colors
                              </p>
                              <button
                                onClick={() => setColorPalette([])}
                                className="text-xs text-red-500 hover:text-red-600"
                              >
                                Clear
                              </button>
                            </div>
                            <div className="grid grid-cols-1 gap-2 max-h-62.5 overflow-y-auto pr-1">
                              {colorPalette.map((col, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all"
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="w-8 h-8 rounded-full border border-slate-200 shadow-sm"
                                      style={{ backgroundColor: col.hex }}
                                    ></div>
                                    <div>
                                      <p className="text-xs font-bold text-slate-700">
                                        {col.hex}
                                      </p>
                                      <p className="text-[10px] text-slate-400">
                                        {col.rgb}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => copyToClipboard(col.hex)}
                                    className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-[#FF9933] transition-colors"
                                    title="Copy HEX"
                                  >
                                    <Copy size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {tool.config.showVisualCrop && (
                      <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700 border border-blue-100 flex gap-2">
                        <CropIcon size={14} /> Draw a box on the preview to
                        crop.
                      </div>
                    )}

                    {/* AADHAR MASKING INSTRUCTIONS */}
                    {isMaskingTool && (
                      <div className="p-3 bg-red-50 rounded-lg text-xs text-red-700 border border-red-100 flex gap-2 items-start">
                        <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                        <div>
                          <strong>Secure Masking Mode:</strong>
                          <br />
                          Draw a box over the Aadhar number. It will be
                          permanently redacted with a black box.
                        </div>
                      </div>
                    )}

                    {tool.config.showFlip && (
                      <div className="flex gap-2 justify-center bg-slate-50 p-2 rounded border">
                        <button
                          onClick={() => setFlipH(!flipH)}
                          className={`p-2 rounded hover:bg-slate-200 ${
                            flipH ? "text-[#FF9933]" : "text-slate-600"
                          }`}
                        >
                          <FlipHorizontal size={20} />
                        </button>
                        <button
                          onClick={() => setFlipV(!flipV)}
                          className={`p-2 rounded hover:bg-slate-200 ${
                            flipV ? "text-[#FF9933]" : "text-slate-600"
                          }`}
                        >
                          <FlipVertical size={20} />
                        </button>
                      </div>
                    )}
                    {tool.config.showRotate && (
                      <div className="flex gap-2 justify-center bg-slate-50 p-2 rounded border">
                        <button
                          onClick={() => setRotation((r) => (r - 90) % 360)}
                          className="p-2 rounded hover:bg-slate-200 text-slate-600"
                        >
                          <RotateCcw size={20} />
                        </button>
                        <button
                          onClick={() => setRotation((r) => (r + 90) % 360)}
                          className="p-2 rounded hover:bg-slate-200 text-slate-600"
                        >
                          <RotateCw size={20} />
                        </button>
                      </div>
                    )}
                    {tool.config.showResize && (
                      <div className="grid grid-cols-2 gap-4">
                        {/* ✅ BUG FIX 9: Added Lock Aspect Ratio Checkbox */}
                        <div className="col-span-2 mb-2 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={maintainAspectRatio}
                            onChange={(e) =>
                              setMaintainAspectRatio(e.target.checked)
                            }
                            id="aspect-lock"
                            className="accent-[#FF9933] cursor-pointer"
                          />
                          <label
                            htmlFor="aspect-lock"
                            className="text-xs text-slate-600 font-medium cursor-pointer"
                          >
                            Lock Aspect Ratio
                          </label>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 mb-1 block">
                            Width
                          </span>
                          <input
                            type="number"
                            value={width}
                            onChange={(e) => {
                              setWidth(parseInt(e.target.value) || 0);
                              if (maintainAspectRatio && aspectRatioRef.current)
                                setHeight(
                                  Math.round(
                                    (parseInt(e.target.value) || 0) /
                                      aspectRatioRef.current,
                                  ),
                                );
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 mb-1 block">
                            Height
                          </span>
                          <input
                            type="number"
                            value={height}
                            onChange={(e) => {
                              setHeight(parseInt(e.target.value) || 0);
                              if (maintainAspectRatio && aspectRatioRef.current)
                                setWidth(
                                  Math.round(
                                    (parseInt(e.target.value) || 0) *
                                      aspectRatioRef.current,
                                  ),
                                );
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                    )}

                    {(isCompressor ||
                      (isConverter &&
                        (format.includes("jpeg") ||
                          format.includes("webp")))) && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-bold text-slate-700">
                            Quality
                          </label>
                          <span className="text-xs font-mono bg-orange-100 text-[#FF9933] px-2 py-1 rounded">
                            {Math.round(quality * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.05"
                          value={quality}
                          onChange={(e) =>
                            setQuality(parseFloat(e.target.value))
                          }
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none accent-[#FF9933] cursor-pointer"
                        />
                      </div>
                    )}

                    {isCompressor && compressionStats && (
                      <div className="bg-slate-800 text-white rounded-lg p-3 shadow-sm">
                        <div className="grid grid-cols-3 divide-x divide-slate-600 text-center">
                          <div>
                            <p className="text-[10px] text-slate-400">Before</p>
                            <p className="text-xs font-bold">
                              {formatBytes(compressionStats.original)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400">After</p>
                            <p className="text-xs font-bold text-[#FF9933]">
                              {formatBytes(compressionStats.compressed)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400">Saved</p>
                            <p
                              className={`text-xs font-bold ${
                                compressionStats.isReverted
                                  ? "text-slate-400"
                                  : "text-green-400"
                              }`}
                            >
                              {compressionStats.isReverted
                                ? "No Change"
                                : `-${compressionStats.percent}%`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isColorPicker && (
                      <div className="pt-2">
                        {!convertedUrl && isGeneralTool ? (
                          // General Tools: Show Apply Button if not yet processed
                          <button
                            onClick={() => requestProcessImage()}
                            disabled={isProcessing}
                            className="w-full bg-[#FF9933] hover:bg-[#e68a2e] text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer transition"
                          >
                            {isProcessing ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              "Apply Changes"
                            )}
                          </button>
                        ) : (
                          // All Tools (if processed) OR Compressors (auto-processed): Show Download
                          <div className="space-y-3">
                            <button
                              onClick={handleDownloadClick}
                              disabled={!convertedUrl || isProcessing}
                              className="w-full bg-[#FF9933] hover:bg-[#e68a2e] text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer transition"
                            >
                              {isProcessing ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                <Download size={20} />
                              )}
                              {isProcessing
                                ? "Processing..."
                                : "Download Result"}
                            </button>

                            {/* Edit Again for manual tools */}
                            {isGeneralTool && convertedUrl && (
                              <button
                                onClick={() => {
                                  setConvertedUrl(null);
                                  setCompressionStats(null);
                                }}
                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-3 rounded-lg cursor-pointer transition"
                              >
                                Edit Again
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* RIGHT PANEL (Preview) */}
        <div className="bg-slate-50 p-6 md:p-8 flex flex-col items-center justify-center border-t lg:border-t-0 text-center relative min-h-100 overflow-hidden">
          {isProcessing && !isBatchMode && !isInstantTool && (
            <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
              <Loader2 size={48} className="text-[#FF9933] animate-spin mb-4" />
              <p className="text-slate-600">Processing...</p>
            </div>
          )}

          {isBatchMode ? (
            batchResults.length > 0 ? (
              <div className="w-full h-full flex flex-col">
                <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center justify-center gap-2">
                  <CheckCircle className="text-green-500" /> Batch Complete
                </h3>
                <div className="flex-1 overflow-y-auto max-h-75 mb-4 space-y-2 pr-2">
                  {batchResults.map((res) => {
                    const ext = res.blob.type.split("/")[1];
                    const downloadName = `${res.name.split(".")[0]}_processed.${ext}`;

                    return (
                      <div
                        key={res.id}
                        className="bg-white p-3 rounded-lg border shadow-sm flex justify-between items-center"
                      >
                        <div className="text-left">
                          <p className="text-xs font-bold truncate max-w-37.5">
                            {res.name}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {res.originalSize} → {res.size}
                          </p>
                        </div>
                        <a
                          href={res.url}
                          download={downloadName}
                          className="text-[#FF9933] p-2 hover:bg-orange-50 rounded"
                        >
                          <Download size={18} />
                        </a>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={downloadZip}
                  disabled={!jsZipLoaded}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-full shadow-lg w-full flex justify-center gap-2 cursor-pointer"
                >
                  <Archive size={20} /> Download All ZIP
                </button>
              </div>
            ) : (
              <div className="text-slate-400 flex flex-col items-center">
                <Archive size={64} className="mb-4 opacity-30" />
                <p>Batch Ready</p>
              </div>
            )
          ) : previewUrl ? (
            <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in relative">
              {isCompressor && convertedUrl ? (
                // ✅ BUG FIX: Used 'clip-path' to perfectly align Before and After images without distortion
                <div
                  className="relative w-full max-w-150 rounded-lg overflow-hidden cursor-col-resize group select-none touch-none shadow-md"
                  style={{ aspectRatio: imageAspectRatio }}
                  onMouseDown={handleSliderInteractionStart}
                  onTouchStart={handleSliderInteractionStart}
                  ref={sliderContainerRef}
                >
                  {/* Checkerboard background for transparent images */}
                  <div
                    className="absolute inset-0 bg-slate-200 pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    }}
                  ></div>

                  {/* AFTER IMAGE (Base Layer - Stays 100% width) */}
                  <img
                    src={convertedUrl}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    alt="After"
                    draggable="false"
                  />

                  {/* AFTER LABEL (Right Side) */}
                  <div className="absolute top-3 right-3 bg-slate-900/70 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded backdrop-blur-md pointer-events-none z-0">
                    After (Compressed)
                  </div>

                  {/* BEFORE IMAGE (Clipped Layer using CSS clip-path) */}
                  <div
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                    style={{
                      clipPath: `polygon(0 0, ${compareSliderPos}% 0, ${compareSliderPos}% 100%, 0 100%)`,
                    }}
                  >
                    <img
                      src={previewUrl}
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                      alt="Before"
                      draggable="false"
                    />

                    {/* BEFORE LABEL (Left Side) */}
                    <div className="absolute top-3 left-3 bg-slate-900/70 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded backdrop-blur-md pointer-events-none">
                      Before (Original)
                    </div>
                  </div>

                  {/* SLIDER DIVIDER LINE */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-sm pointer-events-none z-20"
                    style={{ left: `${compareSliderPos}%` }}
                  ></div>

                  {/* SLIDER HANDLE BUTTON */}
                  <div
                    className="absolute top-1/2 -ml-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-[#FF9933] pointer-events-none z-20"
                    style={{
                      left: `${compareSliderPos}%`,
                      transform: "translateY(-50%)",
                    }}
                  >
                    <ArrowRightLeft size={16} />
                  </div>
                </div>
              ) : (
                <div className="relative max-w-full max-h-100 border border-slate-200 shadow-sm rounded-lg overflow-hidden bg-white">
                  {isColorPicker ? (
                    <div
                      className="cursor-crosshair relative"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => {
                        setHoverColor(null);
                        setMagnifier((p) => ({ ...p, show: false }));
                      }}
                      onClick={handleColorClick}
                    >
                      <img
                        src={convertedUrl ?? previewUrl}
                        className="max-w-full max-h-100 object-contain"
                        alt="Pick"
                      />
                      {magnifier.show && (
                        <div
                          className="absolute w-24 h-24 rounded-full border-2 border-white shadow-xl overflow-hidden pointer-events-none z-10 bg-white"
                          style={{
                            left: magnifier.x + 20,
                            top: magnifier.y - 50,
                            backgroundImage: `url(${previewUrl})`,
                            backgroundRepeat: "no-repeat",
                            background: magnifier.color,
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1 h-1 bg-white/50 rounded-full shadow-sm"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : tool.config.showVisualCrop || isMaskingTool ? (
                    <div
                      ref={cropContainerRef}
                      className="relative w-full h-full cursor-crosshair select-none touch-none"
                      onMouseDown={handleCropInteractionStart}
                      onMouseMove={handleCropInteractionMove}
                      onTouchStart={handleCropInteractionStart}
                      onTouchMove={handleCropInteractionMove}
                    >
                      <img
                        src={previewUrl}
                        className="max-w-full max-h-full block pointer-events-none"
                        alt="Crop"
                      />
                      {crop.w > 0 && (
                        <div
                          className={`absolute border-2 ${
                            isMaskingTool
                              ? "border-red-500 bg-black/50"
                              : "border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"
                          } pointer-events-none`}
                          style={{
                            left: `${
                              (crop.x / originalImageRef.current?.width) * 100
                            }%`,
                            top: `${
                              (crop.y / originalImageRef.current?.height) * 100
                            }%`,
                            width: `${
                              (crop.w / originalImageRef.current?.width) * 100
                            }%`,
                            height: `${
                              (crop.h / originalImageRef.current?.height) * 100
                            }%`,
                          }}
                        >
                          {isMaskingTool && (
                            <div className="absolute inset-0 flex items-center justify-center text-white/80 text-[10px] font-bold">
                              REDACT
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <img
                      src={previewUrl}
                      className="max-w-full max-h-100 object-contain"
                      alt="Preview"
                      style={
                        isInstantTool
                          ? {
                              transform: `rotate(${rotation}deg) scale(${
                                flipH ? -1 : 1
                              }, ${flipV ? -1 : 1})`,
                              transition: "transform 0.3s ease",
                            }
                          : {}
                      }
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-slate-400 flex flex-col items-center">
              <ImageIcon size={64} className="mb-4 opacity-30" />
              <p>Preview Area</p>
            </div>
          )}
        </div>
      </div>
      <InfoSection info={tool.info} />

      <RelatedTools currentToolId={tool.id} toolType={tool.type} />
    </div>
  );
};

export default ImageEditor;
