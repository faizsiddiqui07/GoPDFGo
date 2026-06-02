"use client"; // REQUIRED for Next.js since we use state, refs, and browser APIs

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import {
  ArrowLeft,
  Trash2,
  RotateCw,
  Layers,
  Scissors,
  CheckCircle,
  AlertCircle,
  Loader2,
  Check,
  RotateCcw,
  FileText,
  ImageIcon,
  Smartphone,
  Monitor,
  Zap,
  Minimize2,
  TrendingDown,
  Download,
  GripVertical,
  Info,
} from "lucide-react";
import InfoSection from "./InfoSection";
import { formatBytes } from "../utils/helpers";
import RelatedTools from "./RelatedTools";
import { TOOLS_CONFIG } from "@/utils/constants";

// --- DND KIT IMPORTS ---
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// --- SORTABLE ITEM WRAPPER (For smooth animations) ---
function SortableItemWrapper({ id, children, className, disabled }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(disabled ? {} : attributes)}
      {...(disabled ? {} : listeners)}
      className={className}
    >
      {children}
    </div>
  );
}

const PdfEditor = ({ toolId }) => {
  const tool = TOOLS_CONFIG.find((t) => t.id === toolId);
  const router = useRouter();
  const fileInputRef = useRef(null);

  // ✅ HYDRATION FIX: Ensures heavy UI only renders on client, protecting SEO
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // State
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadName, setDownloadName] = useState("");

  // Lib States
  const [pdfJsLoaded, setPdfJsLoaded] = useState(false);

  // UI States
  const [errorMsg, setErrorMsg] = useState(null);
  const [splitMode, setSplitMode] = useState("all");
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedPages, setSelectedPages] = useState(new Set());
  const [rangeInput, setRangeInput] = useState("");
  const [generatingThumbnails, setGeneratingThumbnails] = useState(false);
  const [compressionStats, setCompressionStats] = useState(null);
  const [pdfOrientation, setPdfOrientation] = useState("portrait");
  const [pageRotations, setPageRotations] = useState([]);

  // Refs for Scroll and Image URLs
  const blobUrlsRef = useRef(new Set());
  const scrollContainerRef = useRef(null);

  // Revoke URLs for memory cleanup ONLY on unmount
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  // --- NEW DRAG & DROP SENSORS & LOGIC ---
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEndFiles = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragEndThumbnails = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setThumbnails((items) => {
        const oldIndex = items.findIndex(
          (item) => item.pageNum.toString() === active.id,
        );
        const newIndex = items.findIndex(
          (item) => item.pageNum.toString() === over.id,
        );
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // --- Thumbnail Generation ---
  const generatePdfThumbnail = async (file, pageNum = 1) => {
    if (!window.pdfjsLib) return null;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;

      const page = await pdf.getPage(pageNum);
      const scale = 1.0;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            blobUrlsRef.current.add(url);
            resolve(url);
          },
          "image/jpeg",
          0.8,
        );
      });
    } catch (e) {
      return null;
    }
  };

  const generateAllThumbnails = async (file) => {
    if (!window.pdfjsLib) return;
    setGeneratingThumbnails(true);
    setThumbnails([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;
      const numPages = pdf.numPages;

      if (numPages > 50) {
        setErrorMsg(
          `Large PDF (${numPages} pages). Rendering thumbnails incrementally...`,
        );
      }

      const allPages = new Set();
      const initRots = Array(numPages).fill(0);
      setPageRotations(initRots);
      for (let i = 1; i <= numPages; i++) allPages.add(i);
      setSelectedPages(allPages);

      const CHUNK_SIZE = 3;

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const scale = 0.5;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;

        const url = await new Promise((resolve) => {
          canvas.toBlob(
            (blob) => {
              const newUrl = URL.createObjectURL(blob);
              blobUrlsRef.current.add(newUrl);
              resolve(newUrl);
            },
            "image/jpeg",
            0.7,
          );
        });

        setThumbnails((prev) => [...prev, { pageNum: i, url }]);

        if (i % CHUNK_SIZE === 0) {
          await new Promise((resolve) => setTimeout(resolve, 15));
        }
      }
    } catch (e) {
      console.error("Error generating all thumbnails", e);
      setErrorMsg(
        "Error rendering pages. The PDF might be corrupted or protected.",
      );
    } finally {
      setGeneratingThumbnails(false);
    }
  };

  // --- File Handling ---
  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    let validFiles = [];

    if (tool.id === "merge-pdf" && files.length + selectedFiles.length > 20) {
      setErrorMsg("Limit Reached: You can merge up to 20 PDFs at once.");
      return;
    }

    if (tool.id === "image-to-pdf")
      validFiles = selectedFiles.filter((f) => f.type.startsWith("image/"));
    else validFiles = selectedFiles.filter((f) => f.type === "application/pdf");

    if (validFiles.length === 0) {
      setErrorMsg("Invalid file type selected.");
      return;
    }

    const allowMulti = ["merge-pdf", "image-to-pdf"].includes(tool.id);

    setIsUploading(true);

    setTimeout(async () => {
      try {
        const newFilesData = await Promise.all(
          validFiles.map(async (f, index) => {
            let previewUrl = null;
            if (f.type === "application/pdf") {
              previewUrl = await generatePdfThumbnail(f);
            } else {
              previewUrl = URL.createObjectURL(f);
              blobUrlsRef.current.add(previewUrl);
            }

            return {
              id:
                window.crypto && window.crypto.randomUUID
                  ? window.crypto.randomUUID()
                  : Math.random().toString(36).substring(2) +
                    Date.now().toString(36),
              file: f,
              rotation: 0,
              order: files.length + index,
              preview: previewUrl,
            };
          }),
        );

        if (!allowMulti && newFilesData.length > 0) {
          if (
            files.length > 0 &&
            files[0].preview &&
            files[0].preview.startsWith("blob:")
          ) {
            URL.revokeObjectURL(files[0].preview);
            blobUrlsRef.current.delete(files[0].preview);
          }

          setFiles([newFilesData[0]]);
          if (
            tool.id === "split-pdf" ||
            tool.id === "rotate-pdf" ||
            tool.id === "rearrange-pdf" ||
            tool.id === "extract-pdf-pages"
          ) {
            setSplitMode("all");
            setRangeInput("");
            generateAllThumbnails(newFilesData[0].file);
          }
        } else {
          setFiles((prev) => [...prev, ...newFilesData]);
        }

        setErrorMsg(null);
        setIsDone(false);
        setCompressionStats(null);
      } catch (err) {
        console.error("Upload error: ", err);
        setErrorMsg("Error processing files. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }, 50);
  };

  const removeFile = (id) => {
    const fileToRemove = files.find((f) => f.id === id);

    if (
      fileToRemove &&
      fileToRemove.preview &&
      fileToRemove.preview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(fileToRemove.preview);
      blobUrlsRef.current.delete(fileToRemove.preview);
    }

    const newFiles = files.filter((f) => f.id !== id);
    setFiles(newFiles);
    setIsDone(false);

    if (
      (tool.id === "split-pdf" || tool.id === "extract-pdf-pages") &&
      newFiles.length === 0
    ) {
      thumbnails.forEach((t) => {
        URL.revokeObjectURL(t.url);
        blobUrlsRef.current.delete(t.url);
      });
      setThumbnails([]);
      setSelectedPages(new Set());
    }
  };

  const resetAll = () => {
    blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    blobUrlsRef.current.clear();

    if (downloadUrl) URL.revokeObjectURL(downloadUrl);

    setIsDone(false);
    setFiles([]);
    setDownloadUrl(null);
    setDownloadName("");
    setCompressionStats(null);
    setThumbnails([]);
    setSelectedPages(new Set());
    setPageRotations([]);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --- Rotations & Selection ---
  const rotateFile = (id) => {
    setFiles(
      files.map((f) =>
        f.id === id ? { ...f, rotation: (f.rotation + 90) % 360 } : f,
      ),
    );
  };

  const rotateAllPages = (deg) => {
    setPageRotations((prev) => prev.map((r) => r + deg));
  };

  const rotateSinglePage = (index, deg) => {
    setPageRotations((prev) => {
      const newRot = [...prev];
      newRot[index] = (newRot[index] || 0) + deg;
      return newRot;
    });
  };

  const togglePageSelection = (pageNum) => {
    if (splitMode !== "select") return;
    const newSet = new Set(selectedPages);
    if (newSet.has(pageNum)) newSet.delete(pageNum);
    else newSet.add(pageNum);
    setSelectedPages(newSet);
    const sorted = Array.from(newSet).sort((a, b) => a - b);
    setRangeInput(sorted.join(", "));
  };

  const handleRangeInput = (e) => {
    const val = e.target.value;
    setRangeInput(val);
    try {
      const parts = val.split(",").map((s) => s.trim());
      const newSet = new Set();
      parts.forEach((part) => {
        if (part.includes("-")) {
          const [start, end] = part.split("-").map(Number);
          if (!isNaN(start) && !isNaN(end))
            for (let i = start; i <= end; i++) newSet.add(i);
        } else {
          const num = Number(part);
          if (!isNaN(num) && num >= 1) newSet.add(num);
        }
      });
      setSelectedPages(newSet);
    } catch (e) {
      console.error(e);
    }
  };

  const changeSplitMode = (mode) => {
    setSplitMode(mode);
    if (mode === "all") {
      const allPages = new Set();
      thumbnails.forEach((t) => allPages.add(t.pageNum));
      setSelectedPages(allPages);
    }
  };

  // --- Main PDF Processing Logic ---
  const processPdf = async () => {
    // ✅ FIX: Libraries are ONLY loaded when the user actually clicks process!
    const { PDFDocument, degrees, StandardFonts, rgb } =
      await import("pdf-lib");
    const JSZip = (await import("jszip")).default;

    if (files.length === 0) {
      setErrorMsg("Please upload a file first.");
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);
    try {
      // 1. MERGE
      if (tool.id === "merge-pdf") {
        const newPdf = await PDFDocument.create();
        for (const item of files) {
          const arrayBuffer = await item.file.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const copiedPages = await newPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => {
            const { angle } = page.getRotation();
            page.setRotation(degrees(angle + item.rotation));
            newPdf.addPage(page);
          });
        }
        const pdfBytes = await newPdf.save();
        finalizePdf(pdfBytes, `GoPDFGo_${files[0].file.name}`);

        // 2. IMAGE TO PDF
      } else if (tool.id === "image-to-pdf") {
        const newPdf = await PDFDocument.create();
        const A4_WIDTH = 595.28;
        const A4_HEIGHT = 841.89;
        const pageWidth = pdfOrientation === "portrait" ? A4_WIDTH : A4_HEIGHT;
        const pageHeight = pdfOrientation === "portrait" ? A4_HEIGHT : A4_WIDTH;

        for (const item of files) {
          let image;
          let imageBytes = await item.file.arrayBuffer();

          if (item.file.type === "image/jpeg" || item.file.type === "image/jpg")
            image = await newPdf.embedJpg(imageBytes);
          else if (item.file.type === "image/png")
            image = await newPdf.embedPng(imageBytes);
          else if (item.file.type === "image/webp") {
            const bitmap = await createImageBitmap(item.file);
            const canvas = document.createElement("canvas");
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(bitmap, 0, 0);
            const blob = await new Promise((resolve) =>
              canvas.toBlob(resolve, "image/png"),
            );
            imageBytes = await blob.arrayBuffer();
            image = await newPdf.embedPng(imageBytes);
          } else {
            try {
              image = await newPdf.embedPng(imageBytes);
            } catch (e) {
              continue;
            }
          }
          if (image) {
            const page = newPdf.addPage([pageWidth, pageHeight]);
            const margin = 20;
            const availableWidth = pageWidth - margin * 2;
            const availableHeight = pageHeight - margin * 2;
            const imgDims = image.scaleToFit(availableWidth, availableHeight);
            page.drawImage(image, {
              x: (pageWidth - imgDims.width) / 2,
              y: (pageHeight - imgDims.height) / 2,
              width: imgDims.width,
              height: imgDims.height,
            });
          }
        }
        const pdfBytes = await newPdf.save();
        const baseName = files[0].file.name.split(".")[0];
        finalizePdf(pdfBytes, `GoPDFGo_${baseName}.pdf`);

        // 3. SPLIT
      } else if (tool.id === "split-pdf" || tool.id === "extract-pdf-pages") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();
        const zip = new JSZip();

        let pagesToExtract = [];
        if (splitMode === "all") {
          for (let i = 0; i < pageCount; i++) pagesToExtract.push(i);
        } else {
          if (selectedPages.size === 0 && rangeInput.trim().length > 0) {
            const parts = rangeInput.split(",").map((s) => s.trim());
            parts.forEach((part) => {
              if (part.includes("-")) {
                const [start, end] = part.split("-").map(Number);
                if (!isNaN(start) && !isNaN(end))
                  for (let i = start; i <= end; i++)
                    if (i >= 1 && i <= pageCount) pagesToExtract.push(i - 1);
              } else {
                const num = Number(part);
                if (!isNaN(num) && num >= 1 && num <= pageCount)
                  pagesToExtract.push(num - 1);
              }
            });
          } else {
            pagesToExtract = Array.from(selectedPages).map((p) => p - 1);
          }
          pagesToExtract = [...new Set(pagesToExtract)].sort((a, b) => a - b);
        }
        if (pagesToExtract.length === 0) {
          setErrorMsg("Please select at least one page to extract.");
          setIsProcessing(false);
          return;
        }

        for (const pageIdx of pagesToExtract) {
          const subPdf = await PDFDocument.create();
          const [copiedPage] = await subPdf.copyPages(pdf, [pageIdx]);
          subPdf.addPage(copiedPage);
          const pdfBytes = await subPdf.save();
          zip.file(`page-${pageIdx + 1}.pdf`, pdfBytes);
        }

        const content = await zip.generateAsync({ type: "blob" });
        finalizePdf(content, `GoPDFGo_${file.name}.zip`, "application/zip");

        // 4. ROTATE
      } else if (tool.id === "rotate-pdf") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = pdf.getPages();

        pages.forEach((page, idx) => {
          const currentRotation = page.getRotation().angle;
          const addedRotation = pageRotations[idx] || 0;
          page.setRotation(degrees(currentRotation + addedRotation));
        });

        const pdfBytes = await pdf.save();
        finalizePdf(pdfBytes, `GoPDFGo_${file.name}`);

        // 5. COMPRESS
      } else if (tool.id === "compress-pdf") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        const originalSize = file.size;

        if (!window.pdfjsLib && !pdfJsLoaded) {
          setErrorMsg(
            "PDF engine is initializing... Please click compress again in 2 seconds.",
          );
          setIsProcessing(false);
          return;
        }

        const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;
        const newPdf = await PDFDocument.create();

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.0 });
          const actualWidth = viewport.width;
          const actualHeight = viewport.height;

          const renderViewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = renderViewport.height;
          canvas.width = renderViewport.width;

          context.fillStyle = "white";
          context.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({
            canvasContext: context,
            viewport: renderViewport,
          }).promise;

          const imgData = canvas.toDataURL("image/jpeg", 0.8);
          const img = await newPdf.embedJpg(imgData);

          const newPage = newPdf.addPage([actualWidth, actualHeight]);
          newPage.drawImage(img, {
            x: 0,
            y: 0,
            width: actualWidth,
            height: actualHeight,
          });

          canvas.remove();
        }

        const pdfBytes = await newPdf.save();
        const compressedSize = pdfBytes.byteLength;
        const saved = originalSize - compressedSize;
        const percent =
          saved > 0 ? ((saved / originalSize) * 100).toFixed(1) : 0;

        setCompressionStats({
          original: originalSize,
          compressed: compressedSize,
          percent,
        });

        finalizePdf(pdfBytes, `GoPDFGo_${file.name}`);
        // 6. PAGE NUMBERS
      } else if (tool.id === "page-numbers") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const font = await pdf.embedFont(StandardFonts.Helvetica);
        const pages = pdf.getPages();

        pages.forEach((page, idx) => {
          const { width } = page.getSize();
          page.drawText(`${idx + 1}`, {
            x: width / 2,
            y: 20,
            size: 12,
            font: font,
            color: rgb(0, 0, 0),
          });
        });

        const pdfBytes = await pdf.save();
        finalizePdf(pdfBytes, `GoPDFGo_${file.name}`);

        // 7. REARRANGE
      } else if (tool.id === "rearrange-pdf") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const newPdf = await PDFDocument.create();

        if (!thumbnails || thumbnails.length === 0) {
          throw new Error("No pages found to rearrange.");
        }

        const newOrderIndices = thumbnails.map((t) => Number(t.pageNum) - 1);
        const copiedPages = await newPdf.copyPages(pdf, newOrderIndices);
        copiedPages.forEach((page) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        finalizePdf(pdfBytes, `GoPDFGo_${file.name}`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Error processing file.");
      setIsProcessing(false);
    }
  };

  const finalizePdf = (bytes, name, type = "application/pdf") => {
    const blob = new Blob([bytes], { type });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setDownloadName(name);
    setIsDone(true);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 animate-fade-in-up">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            setPdfJsLoaded(true);
          }
        }}
      />
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-slate-500 hover:text-[#FF9933] flex items-center gap-1 text-sm font-medium mb-3 transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Tools
        </button>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <tool.icon size={28} className="text-orange-500" /> {tool.title}
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Upload Area */}
        <div className="p-4 sm:p-6 md:p-8 bg-slate-50 border-b border-slate-100 text-center">
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:bg-white hover:border-[#FF9933] transition-colors cursor-pointer relative group">
            <input
              ref={fileInputRef}
              key={files.length}
              type="file"
              multiple={["merge-pdf", "image-to-pdf"].includes(tool.id)}
              accept={tool.config.accept}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-2 pointer-events-none z-20 relative">
                <Loader2
                  size={40}
                  className="animate-spin text-[#FF9933] mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-700">
                  Processing files... Please wait
                </h3>
              </div>
            ) : (
              <div className="pointer-events-none">
                <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF9933] group-hover:scale-110 transition-transform">
                  {tool.id === "image-to-pdf" ? (
                    <ImageIcon size={32} />
                  ) : (
                    <FileText size={32} />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-700">
                  {files.length > 0 &&
                  !["merge-pdf", "image-to-pdf"].includes(tool.id)
                    ? "Replace File"
                    : `Drop ${tool.id === "image-to-pdf" ? "Images" : "PDFs"} here`}
                </h3>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {errorMsg && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm border border-red-100">
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          {tool.id === "compress-pdf" && files.length > 0 && !isDone && (
            <div className="mb-6 bg-blue-50 text-blue-700 p-3 rounded-lg flex items-start gap-2 text-sm border border-blue-100">
              <Info size={18} className="mt-0.5 shrink-0" />
              <span>
                <strong>Note:</strong> Extreme compression flattens the PDF.
                Text selection and searchability inside the PDF will be lost.
              </span>
            </div>
          )}

          {/* ✅ HYDRATION SAFE DND-KIT AREA */}
          {isMounted &&
            files.length > 0 &&
            tool.id !== "split-pdf" &&
            tool.id !== "rotate-pdf" &&
            tool.id !== "rearrange-pdf" &&
            tool.id !== "extract-pdf-pages" && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEndFiles}
              >
                <SortableContext
                  items={files.map((f) => f.id)}
                  strategy={rectSortingStrategy}
                >
                  <div
                    className={`space-y-3 mb-8 ${
                      tool.id === "merge-pdf"
                        ? "grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0"
                        : ""
                    }`}
                  >
                    {files.map((item, idx) => {
                      const isDraggable = [
                        "merge-pdf",
                        "image-to-pdf",
                      ].includes(tool.id);
                      return (
                        <SortableItemWrapper
                          key={item.id}
                          id={item.id}
                          disabled={!isDraggable}
                          className={`relative group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-3 flex items-center gap-4 ${
                            isDraggable
                              ? "cursor-grab active:cursor-grabbing"
                              : "cursor-default"
                          }`}
                        >
                          {isDraggable && (
                            <div className="text-slate-400 hover:text-slate-600">
                              <GripVertical size={20} />
                            </div>
                          )}
                          {isDraggable && (
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#FF9933] text-white text-xs rounded-full flex items-center justify-center font-bold shadow-sm z-10">
                              {idx + 1}
                            </div>
                          )}

                          <div className="w-24 h-32 sm:w-32 sm:h-44 bg-slate-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-slate-200 relative shadow-inner">
                            {item.preview ? (
                              <img
                                src={item.preview}
                                alt="Preview"
                                className="w-full h-full object-cover transition-transform duration-300"
                                style={{
                                  transform: `rotate(${item.rotation}deg)`,
                                }}
                              />
                            ) : (
                              <FileText size={40} className="text-slate-300" />
                            )}
                            {item.rotation > 0 && (
                              <div className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm font-medium z-10">
                                {item.rotation}°
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0 py-2">
                            <p
                              className="font-semibold text-slate-800 text-base truncate mb-1"
                              title={item.file.name}
                            >
                              {item.file.name}
                            </p>
                            <p className="text-sm text-slate-500 font-medium">
                              {(item.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            {tool.id === "merge-pdf" && (
                              <button
                                onClick={() => rotateFile(item.id)}
                                onPointerDown={(e) => e.stopPropagation()}
                                className="mt-3 text-sm flex items-center gap-1.5 text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md transition cursor-pointer font-bold relative z-20"
                              >
                                <RotateCw size={14} /> Rotate
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => removeFile(item.id)}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="absolute top-3 right-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition p-2 cursor-pointer relative z-20"
                          >
                            <Trash2 size={18} />
                          </button>
                        </SortableItemWrapper>
                      );
                    })}

                    {["merge-pdf", "image-to-pdf"].includes(tool.id) &&
                      files.length > 1 && (
                        <div className="col-span-full text-center mt-4 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                          <p className="text-sm font-medium text-slate-600 flex items-center justify-center gap-2">
                            <GripVertical
                              size={18}
                              className="text-slate-400"
                            />
                            Drag and drop items to reorder them
                          </p>
                        </div>
                      )}
                  </div>
                </SortableContext>
              </DndContext>
            )}

          {/* Image to PDF Controls */}
          {files.length > 0 && tool.id === "image-to-pdf" && (
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                Page Orientation
              </label>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setPdfOrientation("portrait")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition cursor-pointer ${
                    pdfOrientation === "portrait"
                      ? "bg-[#FF9933] text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Smartphone size={20} /> Portrait
                </button>
                <button
                  onClick={() => setPdfOrientation("landscape")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition cursor-pointer ${
                    pdfOrientation === "landscape"
                      ? "bg-[#FF9933] text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Monitor size={20} /> Landscape
                </button>
              </div>
            </div>
          )}

          {/* Split PDF Controls */}
          {files.length > 0 &&
            (tool.id === "split-pdf" || tool.id === "extract-pdf-pages") && (
              <div className="mb-8">
                <div className="text-center mb-6">
                  <p className="text-sm font-bold bg-blue-50 text-blue-600 inline-block px-4 py-2 rounded-full">
                    <Scissors size={16} className="inline mr-1 mb-0.5" />
                    {tool.id === "extract-pdf-pages"
                      ? "Enter specific pages to extract (e.g., 1, 3, 5-10)"
                      : "Enter page ranges to split (e.g., 1-5, 6-10)"}
                  </p>
                </div>
                <div className="flex gap-3 sm:gap-4 justify-center mb-6">
                  <button
                    onClick={() => changeSplitMode("all")}
                    className={`text-sm px-4 sm:px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                      splitMode === "all"
                        ? "bg-[#FF9933] text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Layers className="hidden sm:block" size={18} /> Extract All
                    Pages
                  </button>
                  <button
                    onClick={() => changeSplitMode("select")}
                    className={`text-sm px-4 sm:px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                      splitMode === "select"
                        ? "bg-[#FF9933] text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Scissors className="hidden sm:block" size={18} /> Select
                    Pages
                  </button>
                </div>

                {generatingThumbnails && thumbnails.length === 0 ? (
                  <div className="py-12 flex flex-col items-center text-slate-400 animate-pulse">
                    <Loader2 className="animate-spin mb-2 w-8 h-8 text-[#FF9933]" />
                    <p className="font-medium text-slate-500">
                      Processing PDF Pages...
                    </p>
                  </div>
                ) : (
                  <div className="animate-fade-in space-y-6">
                    {splitMode === "select" && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Page Range (e.g. 1-3, 5, 8)
                        </label>
                        <input
                          type="text"
                          value={rangeInput}
                          onChange={handleRangeInput}
                          placeholder="Enter pages or select below..."
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none text-lg font-medium"
                        />
                      </div>
                    )}
                    <div
                      ref={scrollContainerRef}
                      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-125 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-inner"
                    >
                      {thumbnails.map((thumb) => (
                        <div
                          key={thumb.pageNum}
                          onClick={() => togglePageSelection(thumb.pageNum)}
                          className={`relative group rounded-lg overflow-hidden border-2 transition-all bg-white shadow-sm ${
                            selectedPages.has(thumb.pageNum)
                              ? "border-[#FF9933] ring-4 ring-[#FF9933]/20"
                              : "border-slate-200"
                          } ${
                            splitMode === "select"
                              ? "cursor-pointer hover:border-slate-300 hover:shadow-md"
                              : "cursor-default opacity-90"
                          }`}
                        >
                          <img
                            src={thumb.url}
                            alt={`Page ${thumb.pageNum}`}
                            className="w-full h-auto"
                          />
                          <div className="absolute bottom-0 w-full bg-slate-900/80 text-white text-xs font-medium text-center py-1.5 backdrop-blur-sm">
                            Page {thumb.pageNum}
                          </div>
                          {selectedPages.has(thumb.pageNum) && (
                            <div className="absolute top-2 right-2 bg-[#FF9933] text-white rounded-full p-1 shadow-md">
                              <Check size={16} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      ))}
                      {generatingThumbnails && (
                        <div className="col-span-full flex items-center justify-center py-4 text-slate-400">
                          <Loader2 className="animate-spin mr-2 w-5 h-5 text-[#FF9933]" />
                          Rendering remaining pages...
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

          {/* Rotate PDF Controls */}
          {files.length > 0 && tool.id === "rotate-pdf" && (
            <div className="mb-8 animate-fade-in">
              <div className="flex gap-4 justify-center mb-6">
                <button
                  onClick={() => rotateAllPages(-90)}
                  className="px-6 py-3 rounded-xl font-bold bg-white border border-slate-200 text-slate-700 hover:text-[#FF9933] hover:border-[#FF9933] transition flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <RotateCcw size={18} /> Rotate All Left
                </button>
                <button
                  onClick={() => rotateAllPages(90)}
                  className="px-6 py-3 rounded-xl font-bold bg-white border border-slate-200 text-slate-700 hover:text-[#FF9933] hover:border-[#FF9933] transition flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <RotateCw size={18} /> Rotate All Right
                </button>
              </div>

              {generatingThumbnails && thumbnails.length === 0 ? (
                <div className="py-12 flex flex-col items-center text-slate-400 animate-pulse">
                  <Loader2 className="animate-spin mb-2 w-8 h-8 text-[#FF9933]" />
                  <p className="font-medium text-slate-500">Loading Pages...</p>
                </div>
              ) : (
                <div
                  ref={scrollContainerRef}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-h-150 overflow-y-auto p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-inner"
                >
                  {thumbnails.map((thumb, index) => (
                    <div
                      key={thumb.pageNum}
                      className="relative group flex flex-col items-center"
                    >
                      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg p-2 w-full">
                        <div className="w-full h-56 sm:h-72 flex items-center justify-center bg-slate-100 overflow-hidden rounded-lg">
                          <img
                            src={thumb.url}
                            alt={`Page ${thumb.pageNum}`}
                            className="max-w-full max-h-full object-contain transition-transform duration-300"
                            style={{
                              transform: `rotate(${pageRotations[index] || 0}deg)`,
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[1px] rounded-xl">
                          <button
                            onClick={() => rotateSinglePage(index, 90)}
                            className="bg-white text-slate-800 p-3 rounded-full shadow-xl hover:text-[#FF9933] transform hover:scale-110 transition cursor-pointer flex items-center justify-center"
                            title="Rotate Right"
                          >
                            <RotateCw size={24} />
                          </button>
                        </div>
                      </div>
                      <span className="mt-3 text-sm font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                        Page {thumb.pageNum}
                      </span>
                    </div>
                  ))}
                  {generatingThumbnails && (
                    <div className="col-span-full flex items-center justify-center py-4 text-slate-400">
                      <Loader2 className="animate-spin mr-2 w-5 h-5 text-[#FF9933]" />
                      Loading more...
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ✅ HYDRATION SAFE DND-KIT REARRANGE */}
          {isMounted && files.length > 0 && tool.id === "rearrange-pdf" && (
            <div className="mb-8 animate-fade-in">
              <div className="text-center mb-6">
                <p className="text-sm font-bold bg-orange-50 text-[#FF9933] inline-block px-4 py-2 rounded-full">
                  <GripVertical size={16} className="inline mr-1 mb-0.5" />
                  Drag and Drop pages to reorder them
                </p>
              </div>

              {generatingThumbnails && thumbnails.length === 0 ? (
                <div className="py-12 flex flex-col items-center text-slate-400 animate-pulse">
                  <Loader2 className="animate-spin mb-2 w-8 h-8 text-[#FF9933]" />
                  <p className="font-medium text-slate-500">Loading Pages...</p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndThumbnails}
                >
                  <SortableContext
                    items={thumbnails.map((t) => t.pageNum.toString())}
                    strategy={rectSortingStrategy}
                  >
                    <div
                      ref={scrollContainerRef}
                      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 max-h-150 overflow-y-auto"
                    >
                      {thumbnails.map((thumb, index) => (
                        <SortableItemWrapper
                          key={`page-${thumb.pageNum}`}
                          id={thumb.pageNum.toString()}
                          className="relative group bg-white border-2 border-slate-200 hover:border-[#FF9933] rounded-lg overflow-hidden cursor-grab active:cursor-grabbing transition-all shadow-sm touch-none select-none"
                        >
                          <div className="absolute top-1 left-1 bg-slate-800/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm z-10">
                            Original Page {thumb.pageNum}
                          </div>
                          <img
                            src={thumb.url}
                            alt={`Page`}
                            className="w-full h-auto pointer-events-none"
                          />
                          <div className="bg-slate-100 text-center py-2 text-xs font-bold text-slate-700 border-t border-slate-200">
                            New Position: {index + 1}
                          </div>
                        </SortableItemWrapper>
                      ))}
                      {generatingThumbnails && (
                        <div className="col-span-full flex items-center justify-center py-4 text-slate-400">
                          <Loader2 className="animate-spin mr-2 w-5 h-5 text-[#FF9933]" />
                          Loading more...
                        </div>
                      )}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col items-center">
            {!isDone && (
              <button
                onClick={processPdf}
                disabled={
                  files.length === 0 ||
                  isProcessing ||
                  generatingThumbnails ||
                  isUploading
                }
                className={`w-full md:w-auto px-8 py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all ${
                  files.length === 0 ||
                  isProcessing ||
                  generatingThumbnails ||
                  isUploading
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-[#FF9933] hover:bg-[#e68a2e] shadow-lg shadow-orange-200 cursor-pointer"
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" /> Processing...
                  </>
                ) : tool.id === "compress-pdf" ? (
                  <>
                    <Minimize2 size={20} /> Compress PDF
                  </>
                ) : (
                  <>
                    {tool.title} Now <Zap size={20} />
                  </>
                )}
              </button>
            )}

            {/* Results */}
            {(isDone || (tool.id === "compress-pdf" && compressionStats)) && (
              <div className="text-center animate-fade-in w-full">
                <div className="inline-flex items-center gap-2 text-green-600 font-bold text-xl mb-4">
                  <CheckCircle size={24} /> Processing Complete!
                </div>

                {compressionStats && tool.id === "compress-pdf" && (
                  <div className="mb-6 bg-slate-50 p-5 rounded-xl border border-slate-200 max-w-md mx-auto shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-slate-500">
                        Original Size:
                      </span>
                      <span className="text-sm font-bold text-slate-700">
                        {formatBytes(compressionStats.original)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-slate-500">
                        Compressed Size:
                      </span>
                      <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {formatBytes(compressionStats.compressed)}
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Storage Saved
                      </span>
                      <div className="flex items-center gap-1.5 text-[#FF9933] font-black text-lg">
                        <TrendingDown size={20} /> {compressionStats.percent}%
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a
                    href={downloadUrl}
                    download={downloadName}
                    className="bg-[#FF9933] text-white px-8 py-3.5 rounded-full hover:bg-[#e68a2e] transition font-bold shadow-lg shadow-orange-200 flex items-center justify-center gap-2 cursor-pointer text-lg"
                  >
                    <Download size={22} /> Download Result
                  </a>
                  <button
                    onClick={resetAll}
                    className="bg-slate-100 text-slate-700 px-8 py-3.5 rounded-full hover:bg-slate-200 transition font-bold cursor-pointer"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ SEO TEXT STAYS SERVER RENDERED - NO HYDRATION WRAPPER HERE */}
      <InfoSection info={tool.info} />

      <RelatedTools currentToolId={tool.id} toolType={tool.type} />
    </div>
  );
};

export default PdfEditor;
