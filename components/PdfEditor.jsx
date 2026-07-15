"use client"; // REQUIRED for Next.js since we use state, refs, and browser APIs

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  Eye,
  EyeOff,
} from "lucide-react";
import InfoSection from "./InfoSection";
import ProcessingOverlay from "./ProcessingOverlay";
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

  // Hydration Fix
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // State
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrStatus, setOcrStatus] = useState(null); // pdf-to-text OCR progress
  const [isUploading, setIsUploading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadName, setDownloadName] = useState("");

  // Lib States
  const [pdfJsLoaded, setPdfJsLoaded] = useState(false);

  // UI States
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null); // ✅ NEW: For info messages like Large PDFs
  const [splitMode, setSplitMode] = useState("all");
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedPages, setSelectedPages] = useState(new Set());
  const [rangeInput, setRangeInput] = useState("");
  const [generatingThumbnails, setGeneratingThumbnails] = useState(false);
  const [compressionStats, setCompressionStats] = useState(null);
  const [pdfOrientation, setPdfOrientation] = useState("portrait");
  const [pdfPageSize, setPdfPageSize] = useState("a4"); // a4 | letter | fit (Image to PDF)
  const [pageRotations, setPageRotations] = useState([]);

  // New tools: PDF→image format, watermark text/opacity, unlock password
  const [imgFormat, setImgFormat] = useState("image/jpeg");
  const [imgQuality, setImgQuality] = useState(0.92); // pdf-to-image JPG quality
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [watermarkPos, setWatermarkPos] = useState("diagonal");
  const [watermarkSize, setWatermarkSize] = useState("normal"); // small | normal | large
  const [watermarkColor, setWatermarkColor] = useState("gray"); // gray | red | blue
  // Live-preview reflections of the watermark size + colour (match the pdf-lib output)
  const wmSizeMul =
    watermarkSize === "small" ? 0.7 : watermarkSize === "large" ? 1.35 : 1;
  const wmPreviewColor =
    watermarkColor === "red"
      ? "#d12929"
      : watermarkColor === "blue"
        ? "#2959c7"
        : "#808080";

  // Page numbers: position / start / format / skip-cover options
  const [pageNumPos, setPageNumPos] = useState("bottom-center");
  const [pageNumStart, setPageNumStart] = useState(1);
  const [pageNumFormat, setPageNumFormat] = useState("plain"); // plain | pageofn
  const [pageNumSkipFirst, setPageNumSkipFirst] = useState(false);
  const [pdfPassword, setPdfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // PDF → Text
  const [extractedText, setExtractedText] = useState("");
  const [copied, setCopied] = useState(false);

  // Compress PDF → target size (KB)
  const [pdfSizeMode, setPdfSizeMode] = useState("best"); // "best" | "target"
  const [pdfTargetKB, setPdfTargetKB] = useState(500);

  // Refs for Scroll and Image URLs
  const blobUrlsRef = useRef(new Set());
  const cancelRef = useRef(false); // set by the overlay's Cancel button
  const scrollContainerRef = useRef(null);

  // ✅ BUG FIX 1: Split the cleanup logic so thumbnails don't break when downloadUrl changes
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    return () => {
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
    let pdf = null;
    try {
      const arrayBuffer = await file.arrayBuffer();
      pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;

      const page = await pdf.getPage(pageNum);
      const scale = 1.0;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;

      return await new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(null); // OOM on low-end devices
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
    } finally {
      // pdf.js keeps a worker document alive unless destroyed — this leaked
      // one document per uploaded file (e.g. 20 leaks when merging 20 PDFs)
      try {
        await pdf?.destroy();
      } catch (e) {
        /* ignore */
      }
    }
  };

  // Generation counter: replacing the file mid-render previously left two
  // loops appending thumbnails of DIFFERENT PDFs into the same grid.
  const thumbGenRef = useRef(0);

  const generateAllThumbnails = async (file) => {
    if (!window.pdfjsLib) return;
    const gen = ++thumbGenRef.current;
    // Revoke thumbnails from a previously-loaded PDF (prevents memory leak on Replace)
    setThumbnails((prev) => {
      prev.forEach((t) => {
        if (t.url) {
          URL.revokeObjectURL(t.url);
          blobUrlsRef.current.delete(t.url);
        }
      });
      return [];
    });
    setGeneratingThumbnails(true);
    setInfoMsg(null);
    setErrorMsg(null);

    let pdf = null;
    try {
      const arrayBuffer = await file.arrayBuffer();
      pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;
      if (gen !== thumbGenRef.current) return; // a newer file took over
      const numPages = pdf.numPages;

      if (numPages > 50) {
        // ✅ BUG FIX 4: Use InfoMsg instead of ErrorMsg for large PDFs
        setInfoMsg(
          `Large PDF detected (${numPages} pages). Rendering thumbnails incrementally...`,
        );
      }

      const allPages = new Set();
      const initRots = Array(numPages).fill(0);
      setPageRotations(initRots);
      for (let i = 1; i <= numPages; i++) allPages.add(i);
      // delete-pages starts with NOTHING marked for deletion
      setSelectedPages(tool.id === "delete-pdf-pages" ? new Set() : allPages);

      const CHUNK_SIZE = 3;

      for (let i = 1; i <= numPages; i++) {
        if (gen !== thumbGenRef.current) return; // bail out of the stale loop
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
              if (!blob) return resolve(null); // OOM — skip this page
              const newUrl = URL.createObjectURL(blob);
              blobUrlsRef.current.add(newUrl);
              resolve(newUrl);
            },
            "image/jpeg",
            0.7,
          );
        });

        if (gen !== thumbGenRef.current) {
          if (url) {
            URL.revokeObjectURL(url);
            blobUrlsRef.current.delete(url);
          }
          return;
        }
        if (url) setThumbnails((prev) => [...prev, { pageNum: i, url }]);

        if (i % CHUNK_SIZE === 0) {
          await new Promise((resolve) => setTimeout(resolve, 15));
        }
      }
    } catch (e) {
      console.error("Error generating all thumbnails", e);
      if (gen === thumbGenRef.current) {
        setErrorMsg(
          "Error rendering pages. The PDF might be corrupted or protected.",
        );
      }
    } finally {
      try {
        await pdf?.destroy();
      } catch (e) {
        /* ignore */
      }
      if (gen === thumbGenRef.current) {
        setGeneratingThumbnails(false);
        setInfoMsg(null); // Clear info once done
      }
    }
  };

  const loadPdfJs = async () => {
    if (window.pdfjsLib) return true; // Agar pehle se load hai toh wapas jao

    return new Promise((resolve, reject) => {
      // Reuse a previous (possibly failed) tag instead of stacking new ones
      const existing = document.getElementById("pdfjs-cdn");
      if (existing) existing.remove();

      const script = document.createElement("script");
      script.id = "pdfjs-cdn";
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.async = true;

      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        setPdfJsLoaded(true);
        resolve(true);
      };
      script.onerror = () => {
        script.remove();
        setErrorMsg("Failed to load PDF engine. Check your internet connection.");
        reject(new Error("pdfjs load failed"));
      };

      document.body.appendChild(script);
    });
  };

  // --- File Handling ---
  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    let validFiles = [];

    // Accept by MIME or .pdf extension — Android file managers / WhatsApp
    // downloads often hand over PDFs with a blank MIME type.
    const isPdfFile = (f) =>
      f.type === "application/pdf" ||
      (f.name || "").toLowerCase().endsWith(".pdf");

    if (tool.id === "image-to-pdf")
      validFiles = selectedFiles.filter((f) => f.type.startsWith("image/"));
    else validFiles = selectedFiles.filter(isPdfFile);

    if (validFiles.length === 0) {
      setErrorMsg("Invalid file type selected.");
      return;
    }

    const allowMulti = ["merge-pdf", "image-to-pdf"].includes(tool.id);

    // Soft warning for very large files — a 300MB PDF can crash a phone tab
    const bigOne = validFiles.find((f) => f.size > 50 * 1024 * 1024);
    if (bigOne) {
      setInfoMsg(
        `"${bigOne.name}" is ${(bigOne.size / (1024 * 1024)).toFixed(0)} MB — large files may be slow or run out of memory on phones. A laptop handles them better.`,
      );
    }

    // Single-file tools: tell the user we kept only the first selection
    if (!allowMulti && validFiles.length > 1) {
      setInfoMsg(
        `This tool works on one file at a time — using "${validFiles[0].name}" and ignoring the other ${validFiles.length - 1}.`,
      );
    }

    setIsUploading(true);

    // Load pdf.js up front for PDF previews — but never let a CDN failure
    // strand the uploader in the disabled "Processing files..." state.
    if (validFiles.some(isPdfFile)) {
      try {
        await loadPdfJs();
      } catch (err) {
        setIsUploading(false);
        return; // loadPdfJs already set a helpful error message
      }
    }

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
            tool.id === "extract-pdf-pages" ||
            tool.id === "pdf-to-image" ||
            tool.id === "delete-pdf-pages" ||
            tool.id === "organize-pdf"
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
      (tool.id === "split-pdf" ||
        tool.id === "extract-pdf-pages" ||
        tool.id === "pdf-to-image" ||
        tool.id === "delete-pdf-pages" ||
        tool.id === "organize-pdf") &&
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
    // ✅ BUG FIX 8: Removed double revocation from here, it's handled cleanly by useEffect now
    blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    blobUrlsRef.current.clear();
    setDownloadUrl(null);

    setIsDone(false);
    setFiles([]);
    setDownloadName("");
    setCompressionStats(null);
    setThumbnails([]);
    setSelectedPages(new Set());
    setPageRotations([]);
    setErrorMsg(null);
    setInfoMsg(null);
    setExtractedText("");
    setCopied(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const copyExtractedText = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      setErrorMsg("Couldn't copy automatically — select the text and copy manually.");
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

  // --- Organize PDF: per-tile rotate + delete (rotation/deleted live on the thumbnail) ---
  const rotateOrganizeTile = (pageNum) => {
    setThumbnails((prev) =>
      prev.map((t) =>
        t.pageNum === pageNum
          ? { ...t, rotation: (((t.rotation || 0) + 90) % 360) }
          : t,
      ),
    );
  };

  const toggleDeleteOrganizeTile = (pageNum) => {
    setThumbnails((prev) =>
      prev.map((t) =>
        t.pageNum === pageNum ? { ...t, deleted: !t.deleted } : t,
      ),
    );
  };

  const handleRangeInput = (e) => {
    const val = e.target.value;
    setRangeInput(val);
    try {
      const maxPage = thumbnails.length || Infinity;
      const parts = val.split(",").map((s) => s.trim());
      const newSet = new Set();
      parts.forEach((part) => {
        if (part.includes("-")) {
          let [start, end] = part.split("-").map(Number);
          if (!isNaN(start) && !isNaN(end)) {
            if (start > end) [start, end] = [end, start];
            for (let i = start; i <= end; i++)
              if (i >= 1 && i <= maxPage) newSet.add(i);
          }
        } else {
          const num = Number(part);
          if (!isNaN(num) && num >= 1 && num <= maxPage) newSet.add(num);
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

  // Cancel is only offered for OCR: it is the one PDF job long enough to want
  // out of, and its page loop can genuinely stop between pages. The other
  // pdf-lib calls are single blocking operations that cannot be interrupted,
  // so offering a button that only hides the spinner would be a lie.
  const handleCancelProcessing = () => {
    cancelRef.current = true;
    setOcrStatus(null);
    setIsProcessing(false);
  };

  // Load tesseract.js on demand — only when a scanned PDF needs OCR.
  const ensureTesseract = () =>
    new Promise((resolve, reject) => {
      if (window.Tesseract) return resolve(true);
      const existing = document.getElementById("tesseract-cdn");
      if (existing) existing.remove();
      const s = document.createElement("script");
      s.id = "tesseract-cdn";
      s.src =
        "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
      s.async = true;
      s.onload = () => resolve(true);
      s.onerror = () => {
        s.remove();
        reject(new Error("tesseract load failed"));
      };
      document.body.appendChild(s);
    });

  // OCR fallback for scanned PDFs (no text layer). Renders each page to an
  // image and reads it with tesseract.js — all inside the browser.
  const runOcrOnPdf = async (pdf) => {
    setOcrStatus("Loading OCR engine…");
    await ensureTesseract();
    const worker = await window.Tesseract.createWorker("eng");
    try {
      let out = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        if (cancelRef.current) break; // Cancel pressed — stop before the next page
        setOcrStatus(
          `Reading scanned text with OCR… page ${i} of ${pdf.numPages}`,
        );
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        const { data } = await worker.recognize(canvas);
        const pageText = (data.text || "").trim();
        canvas.width = 0;
        canvas.height = 0;
        if (pdf.numPages > 1) out += `===== Page ${i} =====\n${pageText}\n\n`;
        else out += pageText;
      }
      return out.replace(/\n{3,}/g, "\n\n").trim();
    } finally {
      try {
        await worker.terminate();
      } catch (e) {
        /* ignore */
      }
    }
  };

  // --- Main PDF Processing Logic ---
  const processPdf = async () => {
    const { PDFDocument, degrees, StandardFonts, rgb } =
      await import("pdf-lib");
    const JSZip = (await import("jszip")).default;

    if (files.length === 0) {
      setErrorMsg("Please upload a file first.");
      return;
    }

    cancelRef.current = false;
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      // 1. MERGE
      if (tool.id === "merge-pdf") {
        const newPdf = await PDFDocument.create();
        const failed = [];
        for (const item of files) {
          try {
            const arrayBuffer = await item.file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer, {
              ignoreEncryption: true,
            });
            const copiedPages = await newPdf.copyPages(
              pdf,
              pdf.getPageIndices(),
            );
            copiedPages.forEach((page) => {
              const { angle } = page.getRotation();
              page.setRotation(degrees(angle + item.rotation));
              newPdf.addPage(page);
            });
          } catch (e) {
            failed.push(item.file.name);
          }
        }
        if (newPdf.getPageCount() === 0) {
          throw new Error(
            "None of the selected PDFs could be merged. They may be password-protected or corrupted.",
          );
        }
        const pdfBytes = await newPdf.save();
        if (failed.length > 0) {
          setInfoMsg(
            `Merged successfully. Skipped ${failed.length} file(s) we couldn't read: ${failed.join(", ")}.`,
          );
        }
        finalizePdf(pdfBytes, `GoPDFGo_${files[0].file.name}`);

        // 2. IMAGE TO PDF
      } else if (tool.id === "image-to-pdf") {
        const newPdf = await PDFDocument.create();
        // Page size presets (in points). "fit" makes each page match its image.
        const PAGE_SIZES = { a4: [595.28, 841.89], letter: [612, 792] };
        const [baseW, baseH] = PAGE_SIZES[pdfPageSize] || PAGE_SIZES.a4;
        const pageWidth = pdfOrientation === "portrait" ? baseW : baseH;
        const pageHeight = pdfOrientation === "portrait" ? baseH : baseW;

        // Re-encode via canvas honoring EXIF orientation — phone JPEGs otherwise
        // land sideways in the PDF even though the on-screen preview looks fine.
        const bakeOrientation = async (file, outType, quality) => {
          const bitmap = await createImageBitmap(file, {
            imageOrientation: "from-image",
          });
          const canvas = document.createElement("canvas");
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext("2d");
          if (outType === "image/jpeg") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(bitmap, 0, 0);
          if (bitmap.close) bitmap.close();
          const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, outType, quality),
          );
          canvas.width = 0;
          canvas.height = 0;
          canvas.remove();
          if (!blob) throw new Error("encode failed");
          return blob.arrayBuffer();
        };

        const skipped = [];
        for (const item of files) {
          try {
            let image;

            if (
              item.file.type === "image/jpeg" ||
              item.file.type === "image/jpg"
            ) {
              try {
                const bytes = await bakeOrientation(
                  item.file,
                  "image/jpeg",
                  0.92,
                );
                image = await newPdf.embedJpg(bytes);
              } catch (e) {
                // decoding failed — fall back to embedding the raw JPEG
                image = await newPdf.embedJpg(await item.file.arrayBuffer());
              }
            } else if (item.file.type === "image/png") {
              image = await newPdf.embedPng(await item.file.arrayBuffer());
            } else {
              // WebP/GIF/BMP and anything else the browser can decode
              const bytes = await bakeOrientation(item.file, "image/png");
              image = await newPdf.embedPng(bytes);
            }

            if (image) {
              if (pdfPageSize === "fit") {
                // Page matches the image exactly — no borders, no whitespace.
                const w = image.width;
                const h = image.height;
                const page = newPdf.addPage([w, h]);
                page.drawImage(image, { x: 0, y: 0, width: w, height: h });
              } else {
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
          } catch (e) {
            skipped.push(item.file.name);
          }
        }

        if (newPdf.getPageCount() === 0) {
          throw new Error("We couldn't read any of the selected images.");
        }

        const pdfBytes = await newPdf.save();
        const baseName = files[0].file.name.split(".")[0];
        if (skipped.length > 0) {
          setInfoMsg(
            `Created PDF. Skipped ${skipped.length} image(s) we couldn't read: ${skipped.join(", ")}.`,
          );
        }
        finalizePdf(pdfBytes, `GoPDFGo_${baseName}.pdf`);

        // 3. SPLIT
      } else if (tool.id === "split-pdf" || tool.id === "extract-pdf-pages") {
        const file = files[0].file;
        const baseName = file.name.replace(/\.pdf$/i, "");
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();

        // Parse the range input into PARTS ("1-5, 8, 10-12" → three groups).
        // Split keeps each part as its own output file; extract flattens them.
        const parseParts = (text) => {
          const groups = [];
          text
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .forEach((part) => {
              const pages = [];
              if (part.includes("-")) {
                let [start, end] = part.split("-").map(Number);
                if (!isNaN(start) && !isNaN(end)) {
                  if (start > end) [start, end] = [end, start];
                  for (let i = start; i <= end; i++)
                    if (i >= 1 && i <= pageCount) pages.push(i - 1);
                }
              } else {
                const num = Number(part);
                if (!isNaN(num) && num >= 1 && num <= pageCount)
                  pages.push(num - 1);
              }
              if (pages.length > 0) groups.push({ label: part, pages });
            });
          return groups;
        };

        // Copy a set of zero-based page indices into ONE new PDF.
        const buildPdfFromPages = async (indices) => {
          const outPdf = await PDFDocument.create();
          const copied = await outPdf.copyPages(pdf, indices);
          copied.forEach((p) => outPdf.addPage(p));
          return outPdf.save();
        };

        if (tool.id === "extract-pdf-pages") {
          // EXTRACT: all selected pages → one combined PDF (as the page promises)
          let pagesToExtract = [];
          if (splitMode === "all") {
            for (let i = 0; i < pageCount; i++) pagesToExtract.push(i);
          } else if (rangeInput.trim().length > 0) {
            parseParts(rangeInput).forEach((g) => pagesToExtract.push(...g.pages));
          } else {
            pagesToExtract = Array.from(selectedPages).map((p) => p - 1);
          }
          pagesToExtract = [...new Set(pagesToExtract)].sort((a, b) => a - b);

          if (pagesToExtract.length === 0) {
            setErrorMsg("Please select at least one page to extract.");
            setIsProcessing(false);
            return;
          }

          const pdfBytes = await buildPdfFromPages(pagesToExtract);
          finalizePdf(pdfBytes, `GoPDFGo_${baseName}_extracted.pdf`);
        } else {
          // SPLIT: each entered range becomes its own PDF.
          // "All pages" mode = every page as a separate PDF (classic split).
          let groups = [];
          if (splitMode === "all") {
            for (let i = 0; i < pageCount; i++)
              groups.push({ label: `${i + 1}`, pages: [i] });
          } else if (rangeInput.trim().length > 0) {
            groups = parseParts(rangeInput);
          } else {
            groups = Array.from(selectedPages)
              .sort((a, b) => a - b)
              .map((p) => ({ label: `${p}`, pages: [p - 1] }));
          }

          if (groups.length === 0) {
            setErrorMsg("Please select at least one page to split.");
            setIsProcessing(false);
            return;
          }

          if (groups.length === 1) {
            // One range → one clean PDF, no ZIP needed
            const pdfBytes = await buildPdfFromPages(groups[0].pages);
            const safe = groups[0].label.replace(/[^0-9-]/g, "");
            finalizePdf(pdfBytes, `GoPDFGo_${baseName}_pages-${safe}.pdf`);
          } else {
            const zip = new JSZip();
            for (const g of groups) {
              const pdfBytes = await buildPdfFromPages(g.pages);
              const safe = g.label.replace(/[^0-9-]/g, "");
              zip.file(`${baseName}_pages-${safe}.pdf`, pdfBytes);
            }
            const content = await zip.generateAsync({ type: "blob" });
            finalizePdf(
              content,
              `GoPDFGo_${baseName}_split.zip`,
              "application/zip",
            );
          }
        }

        // 4. ROTATE
      } else if (tool.id === "rotate-pdf") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = pdf.getPages();

        pages.forEach((page, idx) => {
          const currentRotation = page.getRotation().angle;
          const addedRotation = pageRotations[idx] || 0;
          // Normalize: negative or >360 /Rotate values render wrong in some viewers
          const normalized =
            (((currentRotation + addedRotation) % 360) + 360) % 360;
          page.setRotation(degrees(normalized));
        });

        const pdfBytes = await pdf.save();
        finalizePdf(pdfBytes, `GoPDFGo_${file.name}`);

        // 5. COMPRESS
      } else if (tool.id === "compress-pdf") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        const originalSize = file.size;

        // Ensure pdf.js is ready (no more "click compress again in 2 seconds")
        if (!window.pdfjsLib) {
          await loadPdfJs();
        }
        if (!window.pdfjsLib) {
          throw new Error(
            "PDF engine failed to load. Please check your connection and retry.",
          );
        }

        // Snapshot the original bytes up front — pdf.js detaches the ArrayBuffer below
        const originalBytes = new Uint8Array(arrayBuffer.slice(0));

        // Rasterize the whole PDF at a resolution cap + JPEG quality → new PDF bytes.
        // (A fresh byte copy each call because pdf.js detaches the buffer it's given.)
        const rasterizeToBytes = async (scaleCap, quality) => {
          const pdf = await window.pdfjsLib.getDocument({
            data: originalBytes.slice(0),
          }).promise;
          const rasterPdf = await PDFDocument.create();

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const baseViewport = page.getViewport({ scale: 1.0 });
            const actualWidth = baseViewport.width;
            const actualHeight = baseViewport.height;

            // Cap longest canvas side to ~2000px to avoid mobile OOM on big scans
            const maxSide = Math.max(actualWidth, actualHeight);
            const scale = Math.min(scaleCap, 2000 / maxSide);
            const renderViewport = page.getViewport({ scale });

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

            const imgData = canvas.toDataURL("image/jpeg", quality);
            const img = await rasterPdf.embedJpg(imgData);
            const newPage = rasterPdf.addPage([actualWidth, actualHeight]);
            newPage.drawImage(img, {
              x: 0,
              y: 0,
              width: actualWidth,
              height: actualHeight,
            });

            canvas.width = 0;
            canvas.height = 0;
            canvas.remove();
          }

          const rasterBytes = await rasterPdf.save();
          if (pdf.destroy) pdf.destroy();
          return rasterBytes;
        };

        if (pdfSizeMode === "target") {
          // ---- Compress to a target file size (KB) ----
          const targetBytes = Math.max(20, Number(pdfTargetKB) || 500) * 1024;

          // Already small enough? Keep the original untouched (don't blur a tiny PDF).
          if (originalSize <= targetBytes) {
            setCompressionStats({
              original: originalSize,
              compressed: originalSize,
              percent: 0,
              unchanged: true,
              target: Number(pdfTargetKB),
              alreadyUnder: true,
            });
            finalizePdf(originalBytes, `GoPDFGo_${file.name}`);
          } else {
            // Progressively more aggressive: [resolution cap, JPEG quality]
            const steps = [
              [1.5, 0.8],
              [1.3, 0.72],
              [1.1, 0.65],
              [1.0, 0.6],
              [0.85, 0.55],
              [0.7, 0.5],
              [0.6, 0.42],
              [0.5, 0.38],
              [0.42, 0.32],
            ];
            let chosen = null;
            let hit = false;
            for (const [sc, q] of steps) {
              const bytes = await rasterizeToBytes(sc, q);
              if (!chosen || bytes.byteLength < chosen.byteLength) chosen = bytes;
              if (bytes.byteLength <= targetBytes) {
                chosen = bytes;
                hit = true;
                break;
              }
            }
            const finalBytes = chosen || originalBytes;
            const finalSize = finalBytes.byteLength;
            const saved = originalSize - finalSize;
            const percent =
              saved > 0 ? ((saved / originalSize) * 100).toFixed(1) : 0;
            setCompressionStats({
              original: originalSize,
              compressed: finalSize,
              percent,
              flattened: true,
              unchanged: false,
              target: Number(pdfTargetKB),
              targetMissed: !hit,
            });
            finalizePdf(finalBytes, `GoPDFGo_${file.name}`);
          }
        } else {
          // ---- Best compression (default): lossless-first, raster only if smaller ----
          let bestBytes = originalBytes;
          let bestSize = originalBytes.byteLength;
          let usedRaster = false;

          // Candidate 1: lossless re-save — keeps text selectable, helps bloated PDFs
          try {
            const reSaved = await (
              await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
            ).save({ useObjectStreams: true });
            if (reSaved.byteLength < bestSize) {
              bestBytes = reSaved;
              bestSize = reSaved.byteLength;
            }
          } catch (e) {
            // ignore — fall through to rasterization
          }

          // Candidate 2: rasterize pages (best for scanned / image-heavy PDFs)
          try {
            const rasterBytes = await rasterizeToBytes(1.5, 0.8);
            if (rasterBytes.byteLength < bestSize) {
              bestBytes = rasterBytes;
              bestSize = rasterBytes.byteLength;
              usedRaster = true;
            }
          } catch (e) {
            // ignore — keep the best candidate so far
          }

          // Never serve a file bigger than the original
          const useCompressed = bestSize < originalSize;
          const finalBytes = useCompressed ? bestBytes : originalBytes;
          const finalSize = finalBytes.byteLength;
          const saved = originalSize - finalSize;
          const percent =
            saved > 0 ? ((saved / originalSize) * 100).toFixed(1) : 0;

          setCompressionStats({
            original: originalSize,
            compressed: finalSize,
            percent,
            flattened: useCompressed && usedRaster,
            unchanged: !useCompressed,
          });

          finalizePdf(finalBytes, `GoPDFGo_${file.name}`);
        }
        // 6. PAGE NUMBERS
      } else if (tool.id === "page-numbers") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, {
          ignoreEncryption: true,
        });
        const font = await pdf.embedFont(StandardFonts.Helvetica);
        const pages = pdf.getPages();
        const size = 12;
        const margin = 24;

        const startNum = Math.max(1, Number(pageNumStart) || 1);
        const skip = pageNumSkipFirst && pages.length > 1;
        const totalNumbered = pages.length - (skip ? 1 : 0);
        const lastNum = startNum + totalNumbered - 1;

        pages.forEach((page, idx) => {
          if (skip && idx === 0) return; // cover page stays clean

          const n = startNum + idx - (skip ? 1 : 0);
          const text =
            pageNumFormat === "pageofn" ? `Page ${n} of ${lastNum}` : `${n}`;
          const textWidth = font.widthOfTextAtSize(text, size);
          const { width, height } = page.getSize();
          const angle = ((page.getRotation().angle % 360) + 360) % 360;

          // Work in the VISUAL frame (what the reader sees), then map back to
          // the unrotated page coordinates pdf-lib draws in.
          const rotatedPage = angle === 90 || angle === 270;
          const Wv = rotatedPage ? height : width;
          const Hv = rotatedPage ? width : height;

          let vx; // from visual-left to the text start
          let vy; // from visual-bottom to the baseline
          if (pageNumPos === "bottom-left") {
            vx = margin;
            vy = margin;
          } else if (pageNumPos === "bottom-right") {
            vx = Wv - margin - textWidth;
            vy = margin;
          } else if (pageNumPos === "top-right") {
            vx = Wv - margin - textWidth;
            vy = Hv - margin - size;
          } else {
            // bottom-center (default)
            vx = (Wv - textWidth) / 2;
            vy = margin;
          }

          let x;
          let y;
          if (angle === 90) {
            x = vy;
            y = vx;
          } else if (angle === 180) {
            x = width - vx;
            y = height - vy;
          } else if (angle === 270) {
            x = width - vy;
            y = height - vx;
          } else {
            x = vx;
            y = vy;
          }

          page.drawText(text, {
            x,
            y,
            size,
            font,
            color: rgb(0, 0, 0),
            rotate: degrees(angle),
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

        // 8. PDF TO IMAGE (JPG / PNG)
      } else if (tool.id === "pdf-to-image") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        if (!window.pdfjsLib) await loadPdfJs();
        if (!window.pdfjsLib)
          throw new Error("PDF engine failed to load. Please retry.");

        const pdf = await window.pdfjsLib.getDocument({
          data: arrayBuffer.slice(0),
        }).promise;
        const ext = imgFormat === "image/png" ? "png" : "jpg";
        const baseName = file.name.replace(/\.pdf$/i, "");
        const images = [];

        // Convert only the pages the user left selected (all by default)
        const wantedPages = Array.from(selectedPages)
          .filter((p) => p >= 1 && p <= pdf.numPages)
          .sort((a, b) => a - b);
        if (wantedPages.length === 0) {
          setErrorMsg("Select at least one page to convert.");
          if (pdf.destroy) pdf.destroy();
          setIsProcessing(false);
          return;
        }

        for (const i of wantedPages) {
          const page = await pdf.getPage(i);
          const baseViewport = page.getViewport({ scale: 1.0 });
          const maxSide = Math.max(baseViewport.width, baseViewport.height);
          const scale = Math.min(2.0, 2500 / maxSide);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          if (imgFormat !== "image/png") {
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
          }
          await page.render({ canvasContext: context, viewport }).promise;
          const blob = await new Promise((res) =>
            canvas.toBlob(res, imgFormat, imgQuality),
          );
          images.push({ name: `${baseName}-page-${i}.${ext}`, blob });
          canvas.width = 0;
          canvas.height = 0;
          canvas.remove();
        }
        if (pdf.destroy) pdf.destroy();

        if (images.length === 1) {
          finalizePdf(images[0].blob, `GoPDFGo_${images[0].name}`, imgFormat);
        } else {
          const zip = new JSZip();
          images.forEach((im) => zip.file(im.name, im.blob));
          const content = await zip.generateAsync({ type: "blob" });
          finalizePdf(
            content,
            `GoPDFGo_${baseName}_images.zip`,
            "application/zip",
          );
        }

        // 9. WATERMARK PDF
      } else if (tool.id === "watermark-pdf") {
        const file = files[0].file;
        const text = (watermarkText || "").trim();
        if (!text) {
          setErrorMsg("Please enter the watermark text.");
          setIsProcessing(false);
          return;
        }
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, {
          ignoreEncryption: true,
        });
        const font = await pdf.embedFont(StandardFonts.HelveticaBold);
        const pages = pdf.getPages();
        const opacity = Math.max(0.05, Math.min(1, watermarkOpacity));
        const wmColor =
          watermarkColor === "red"
            ? rgb(0.82, 0.16, 0.16)
            : watermarkColor === "blue"
              ? rgb(0.16, 0.35, 0.78)
              : rgb(0.5, 0.5, 0.5);
        const sizeMul =
          watermarkSize === "small" ? 0.7 : watermarkSize === "large" ? 1.35 : 1;
        const diag = Math.cos(Math.PI / 4);

        pages.forEach((page) => {
          const { width, height } = page.getSize();
          // Draw in the VISUAL frame so the stamp lands where the reader sees
          // it, even on /Rotate-d scans (footer used to land on a side edge).
          const angle = ((page.getRotation().angle % 360) + 360) % 360;
          const rotatedPage = angle === 90 || angle === 270;
          const Wv = rotatedPage ? height : width;
          const Hv = rotatedPage ? width : height;

          const toBase = (vx, vy) => {
            if (angle === 90) return { x: vy, y: vx };
            if (angle === 180) return { x: width - vx, y: height - vy };
            if (angle === 270) return { x: width - vy, y: height - vx };
            return { x: vx, y: vy };
          };
          const stamp = (vx, vy, fontSize, extraRotate = 0) => {
            const { x, y } = toBase(vx, vy);
            page.drawText(text, {
              x,
              y,
              size: fontSize,
              font,
              color: wmColor,
              rotate: degrees(angle + extraRotate),
              opacity,
            });
          };

          if (watermarkPos === "tiled") {
            const fontSize =
              Math.max(14, Math.min(Wv, Hv) / 22) * sizeMul;
            const tw = font.widthOfTextAtSize(text, fontSize);
            const stepX = Wv / 3;
            const stepY = Hv / 4;
            for (let gx = 0; gx < 3; gx++) {
              for (let gy = 0; gy < 4; gy++) {
                stamp(
                  stepX * gx + stepX / 2 - (tw / 2) * diag,
                  stepY * gy + stepY / 2 - (tw / 2) * diag,
                  fontSize,
                  45,
                );
              }
            }
          } else if (watermarkPos === "footer") {
            const fontSize =
              Math.max(12, Math.min(Wv, Hv) / 28) * sizeMul;
            const tw = font.widthOfTextAtSize(text, fontSize);
            stamp((Wv - tw) / 2, 24, fontSize);
          } else if (watermarkPos === "center") {
            const fontSize =
              Math.max(24, Math.min(Wv, Hv) / 12) * sizeMul;
            const tw = font.widthOfTextAtSize(text, fontSize);
            stamp((Wv - tw) / 2, Hv / 2 - fontSize / 2, fontSize);
          } else {
            // diagonal (default)
            const fontSize =
              Math.max(24, Math.min(Wv, Hv) / 12) * sizeMul;
            const tw = font.widthOfTextAtSize(text, fontSize);
            stamp(
              Wv / 2 - (tw / 2) * diag,
              Hv / 2 - (tw / 2) * diag,
              fontSize,
              45,
            );
          }
        });

        const pdfBytes = await pdf.save();
        finalizePdf(pdfBytes, `GoPDFGo_${file.name}`);

        // 10. DELETE PDF PAGES
      } else if (tool.id === "delete-pdf-pages") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, {
          ignoreEncryption: true,
        });
        const pageCount = pdf.getPageCount();

        // selectedPages = pages (1-based) the user marked for DELETION
        if (selectedPages.size === 0) {
          setErrorMsg("Select at least one page to delete.");
          setIsProcessing(false);
          return;
        }
        if (selectedPages.size >= pageCount) {
          setErrorMsg("You can't delete every page — keep at least one.");
          setIsProcessing(false);
          return;
        }

        const keepIndices = [];
        for (let i = 0; i < pageCount; i++) {
          if (!selectedPages.has(i + 1)) keepIndices.push(i);
        }
        const newPdf = await PDFDocument.create();
        const copied = await newPdf.copyPages(pdf, keepIndices);
        copied.forEach((p) => newPdf.addPage(p));

        const pdfBytes = await newPdf.save();
        finalizePdf(pdfBytes, `GoPDFGo_${file.name}`);

        // 11. UNLOCK PDF (remove a password the user knows)
      } else if (tool.id === "unlock-pdf") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        if (!window.pdfjsLib) await loadPdfJs();
        if (!window.pdfjsLib)
          throw new Error("PDF engine failed to load. Please retry.");

        let pdf;
        try {
          pdf = await window.pdfjsLib.getDocument({
            data: arrayBuffer.slice(0),
            password: pdfPassword || undefined,
          }).promise;
        } catch (err) {
          if (err && err.name === "PasswordException") {
            setErrorMsg(
              pdfPassword
                ? "Incorrect password. Please check it and try again."
                : "This PDF needs a password to open. Please enter it above.",
            );
          } else {
            setErrorMsg("Could not open this PDF. It may be corrupted.");
          }
          setIsProcessing(false);
          return;
        }

        const newPdf = await PDFDocument.create();
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const baseViewport = page.getViewport({ scale: 1.0 });
          const actualWidth = baseViewport.width;
          const actualHeight = baseViewport.height;
          const maxSide = Math.max(actualWidth, actualHeight);
          const scale = Math.min(2.0, 2200 / maxSide);
          const renderViewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = renderViewport.width;
          canvas.height = renderViewport.height;
          context.fillStyle = "white";
          context.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({
            canvasContext: context,
            viewport: renderViewport,
          }).promise;
          const imgData = canvas.toDataURL("image/jpeg", 0.85);
          const img = await newPdf.embedJpg(imgData);
          const newPage = newPdf.addPage([actualWidth, actualHeight]);
          newPage.drawImage(img, {
            x: 0,
            y: 0,
            width: actualWidth,
            height: actualHeight,
          });
          canvas.width = 0;
          canvas.height = 0;
          canvas.remove();
        }
        if (pdf.destroy) pdf.destroy();

        const pdfBytes = await newPdf.save();
        finalizePdf(pdfBytes, `GoPDFGo_unlocked_${file.name}`);

        // 12. PDF TO TEXT
      } else if (tool.id === "pdf-to-text") {
        const file = files[0].file;
        const arrayBuffer = await file.arrayBuffer();
        if (!window.pdfjsLib) await loadPdfJs();
        if (!window.pdfjsLib)
          throw new Error("PDF engine failed to load. Please retry.");

        const pdf = await window.pdfjsLib.getDocument({
          data: arrayBuffer.slice(0),
        }).promise;

        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          let pageText = "";
          let lastY = null;
          for (const item of content.items) {
            const str = item.str || "";
            const y = item.transform ? item.transform[5] : null;
            if (lastY !== null && y !== null && Math.abs(lastY - y) > 2) {
              // new visual line
              pageText += "\n";
            } else if (
              pageText &&
              !/\s$/.test(pageText) &&
              str &&
              !/^\s/.test(str)
            ) {
              // same line, separate items — keep words apart
              pageText += " ";
            }
            pageText += str;
            if (item.hasEOL) pageText += "\n";
            lastY = y;
          }
          pageText = pageText.replace(/[ \t]+\n/g, "\n").trim();
          if (pdf.numPages > 1) {
            fullText += `===== Page ${i} =====\n${pageText}\n\n`;
          } else {
            fullText += pageText;
          }
        }
        let cleaned = fullText.replace(/\n{3,}/g, "\n\n").trim();

        // Scanned PDF (no text layer) — read it with in-browser OCR.
        if (!cleaned) {
          try {
            cleaned = await runOcrOnPdf(pdf);
          } catch (e) {
            setOcrStatus(null);
            if (pdf.destroy) pdf.destroy();
            setErrorMsg(
              "This looks like a scanned PDF and OCR could not read it. Check your connection and try again, or use a clearer scan.",
            );
            setIsProcessing(false);
            return;
          }
          setOcrStatus(null);
        }

        if (pdf.destroy) pdf.destroy();

        if (!cleaned) {
          setErrorMsg(
            "No readable text found in this PDF, even after OCR. The scan may be too blurry or the page may be blank.",
          );
          setIsProcessing(false);
          return;
        }

        setExtractedText(cleaned);
        const baseName = file.name.replace(/\.pdf$/i, "");
        finalizePdf(cleaned, `${baseName}.txt`, "text/plain;charset=utf-8");

        // 13. ORGANIZE PDF (reorder + rotate + delete in one pass)
      } else if (tool.id === "organize-pdf") {
        const file = files[0].file;
        const kept = thumbnails.filter((t) => !t.deleted);
        if (kept.length === 0) {
          setErrorMsg(
            "You've removed every page. Keep at least one page before exporting.",
          );
          setIsProcessing(false);
          return;
        }

        const arrayBuffer = await file.arrayBuffer();
        const srcPdf = await PDFDocument.load(arrayBuffer, {
          ignoreEncryption: true,
        });
        const outPdf = await PDFDocument.create();

        const indices = kept.map((t) => Number(t.pageNum) - 1);
        const copied = await outPdf.copyPages(srcPdf, indices);
        copied.forEach((page, i) => {
          const added = kept[i].rotation || 0;
          if (added) {
            const current = page.getRotation().angle || 0;
            page.setRotation(degrees((current + added) % 360));
          }
          outPdf.addPage(page);
        });

        const pdfBytes = await outPdf.save();
        finalizePdf(pdfBytes, `GoPDFGo_organized_${file.name}`);
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

  // Visitors landing straight from Google have no in-site history —
  // router.back() would bounce them off the site entirely.
  const goBackToTools = () => {
    if (
      typeof document !== "undefined" &&
      document.referrer.startsWith(window.location.origin)
    ) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 animate-fade-in-up">
      <div className="mb-6">
        <button
          onClick={goBackToTools}
          className="text-slate-500 hover:text-[#FF9933] flex items-center gap-1 text-sm font-medium mb-3 transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Tools
        </button>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <tool.icon size={28} className="text-orange-500" /> {tool.title}
        </h1>
      </div>

      <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <ProcessingOverlay
          show={isProcessing}
          title={ocrStatus || "Working on your PDF…"}
          onCancel={ocrStatus ? handleCancelProcessing : null}
        />
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

          {/* ✅ BUG FIX 4: Info Messages UI */}
          {infoMsg && (
            <div className="mb-6 bg-blue-50 text-blue-700 p-4 rounded-lg flex items-center gap-2 text-sm border border-blue-100">
              <Info size={18} className="shrink-0" /> {infoMsg}
            </div>
          )}

          {tool.id === "compress-pdf" && files.length > 0 && !isDone && (
            <div className="mb-6">
              {/* Mode toggle: Best compression vs Target size */}
              <div className="inline-flex w-full sm:w-auto p-1 bg-slate-100 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setPdfSizeMode("best")}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition cursor-pointer ${
                    pdfSizeMode === "best"
                      ? "bg-white text-[#e68a2e] shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Best Compression
                </button>
                <button
                  type="button"
                  onClick={() => setPdfSizeMode("target")}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition cursor-pointer ${
                    pdfSizeMode === "target"
                      ? "bg-white text-[#e68a2e] shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Target Size (KB)
                </button>
              </div>

              {pdfSizeMode === "target" && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-600 mb-2">
                    Shrink to about this size (for portals with strict upload
                    limits):
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[200, 500, 1000, 2000].map((kb) => (
                      <button
                        key={kb}
                        type="button"
                        onClick={() => setPdfTargetKB(kb)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold border transition cursor-pointer ${
                          Number(pdfTargetKB) === kb
                            ? "bg-orange-100 border-orange-300 text-[#e68a2e]"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {kb >= 1000 ? `${kb / 1000} MB` : `${kb} KB`}
                      </button>
                    ))}
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3">
                      <input
                        type="number"
                        min="20"
                        value={pdfTargetKB}
                        onChange={(e) =>
                          setPdfTargetKB(parseInt(e.target.value) || 0)
                        }
                        className="w-20 py-2 outline-none text-sm font-bold text-slate-700"
                      />
                      <span className="text-sm text-slate-400 font-medium">
                        KB
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 text-blue-700 p-3 rounded-lg flex items-start gap-2 text-sm border border-blue-100">
                <Info size={18} className="mt-0.5 shrink-0" />
                <span>
                  {pdfSizeMode === "target" ? (
                    <>
                      <strong>Note:</strong> Hitting an exact size flattens pages
                      to images, so text inside becomes non-selectable and may
                      look softer. Best for scanned or image-heavy PDFs.
                    </>
                  ) : (
                    <>
                      <strong>Note:</strong> We try a lossless re-save first and
                      keep text selectable when we can. Only image-heavy PDFs get
                      flattened for extra savings — and we never hand back a file
                      bigger than your original.
                    </>
                  )}
                </span>
              </div>
            </div>
          )}

          {isMounted &&
            files.length > 0 &&
            tool.id !== "split-pdf" &&
            tool.id !== "rotate-pdf" &&
            tool.id !== "rearrange-pdf" &&
            tool.id !== "extract-pdf-pages" &&
            tool.id !== "pdf-to-image" &&
            tool.id !== "delete-pdf-pages" &&
            tool.id !== "organize-pdf" && (
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
                            aria-label="Remove file"
                            title="Remove file"
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
            <div className="mb-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                  Page Size
                </label>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { v: "a4", label: "A4" },
                    { v: "letter", label: "US Letter" },
                    { v: "fit", label: "Fit to Image" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      onClick={() => setPdfPageSize(o.v)}
                      className={`px-5 py-2.5 rounded-xl font-bold transition cursor-pointer ${
                        pdfPageSize === o.v
                          ? "bg-[#FF9933] text-white shadow-lg"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                {pdfPageSize === "fit" && (
                  <p className="text-xs text-slate-500 text-center mt-2">
                    Each page matches its image exactly — no borders or extra
                    whitespace.
                  </p>
                )}
              </div>

              {pdfPageSize !== "fit" && (
                <div>
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

              {/* ✅ BUG FIX: Mobile Instruction Hint */}
              <div className="sm:hidden flex justify-center mb-4 animate-fade-in">
                <p className="text-xs font-bold bg-orange-50 text-[#FF9933] px-4 py-2 rounded-full flex items-center gap-2 border border-orange-100 shadow-sm">
                  <RotateCw size={14} /> Tap on any page to rotate it individually
                </p>
              </div>

              {generatingThumbnails && thumbnails.length === 0 ? (
                <div className="py-12 flex flex-col items-center text-slate-400 animate-pulse">
                  <Loader2 className="animate-spin mb-2 w-8 h-8 text-[#FF9933]" />
                  <p className="font-medium text-slate-500">Loading Pages...</p>
                </div>
              ) : (
                <div
                  ref={scrollContainerRef}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-h-150 overflow-y-auto p-4 sm:p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-inner"
                >
                  {thumbnails.map((thumb, index) => (
                    <div
                      key={thumb.pageNum}
                      className="relative group flex flex-col items-center"
                    >
                      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg p-2 w-full">
                        <div className="w-full h-48 sm:h-72 flex items-center justify-center bg-slate-100 overflow-hidden rounded-lg">
                          <img
                            src={thumb.url}
                            alt={`Page ${thumb.pageNum}`}
                            className="max-w-full max-h-full object-contain transition-transform duration-300"
                            style={{
                              transform: `rotate(${pageRotations[index] || 0}deg)`,
                            }}
                          />
                        </div>
                        
                        {/* ✅ BUG FIX: Hover effect changed to be permanent on mobile, but hover-only on Desktop */}
                        <div className="absolute inset-0 bg-slate-900/5 sm:bg-transparent sm:group-hover:bg-slate-900/20 transition-colors flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 backdrop-blur-[0.5px] rounded-xl">
                          <button
                            onClick={() => rotateSinglePage(index, 90)}
                            className="bg-white/95 sm:bg-white text-slate-800 p-3 rounded-full shadow-lg hover:text-[#FF9933] transform hover:scale-110 transition cursor-pointer flex items-center justify-center"
                            title="Rotate Right"
                          >
                            <RotateCw size={22} className="sm:w-6 sm:h-6" />
                          </button>
                        </div>

                      </div>
                      <span className="mt-3 text-xs sm:text-sm font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
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

          {/* Rearrange PDF UI with DnD Kit */}
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

          {/* Organize PDF: drag-reorder + per-page rotate + delete */}
          {isMounted && files.length > 0 && tool.id === "organize-pdf" && (
            <div className="mb-8 animate-fade-in">
              <div className="text-center mb-6">
                <p className="text-sm font-bold bg-orange-50 text-[#FF9933] inline-block px-4 py-2 rounded-full">
                  <GripVertical size={16} className="inline mr-1 mb-0.5" />
                  Drag to reorder · rotate or remove any page
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
                      {thumbnails.map((thumb, index) => {
                        const keptBefore = thumbnails
                          .slice(0, index)
                          .filter((t) => !t.deleted).length;
                        return (
                          <SortableItemWrapper
                            key={`org-${thumb.pageNum}`}
                            id={thumb.pageNum.toString()}
                            disabled={thumb.deleted}
                            className={`relative group bg-white border-2 rounded-lg overflow-hidden transition-all shadow-sm touch-none select-none ${
                              thumb.deleted
                                ? "border-red-200 opacity-60"
                                : "border-slate-200 hover:border-[#FF9933] cursor-grab active:cursor-grabbing"
                            }`}
                          >
                            <div className="absolute top-1 left-1 bg-slate-800/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm z-10">
                              Page {thumb.pageNum}
                            </div>

                            <div className="absolute top-1 right-1 flex gap-1 z-20">
                              <button
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() => rotateOrganizeTile(thumb.pageNum)}
                                className="bg-white/90 hover:bg-white text-slate-700 hover:text-[#FF9933] p-1.5 rounded-md shadow cursor-pointer"
                                title="Rotate 90°"
                                aria-label="Rotate page"
                              >
                                <RotateCw size={14} />
                              </button>
                              <button
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() =>
                                  toggleDeleteOrganizeTile(thumb.pageNum)
                                }
                                className={`p-1.5 rounded-md shadow cursor-pointer ${
                                  thumb.deleted
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-white/90 hover:bg-white text-slate-700 hover:text-red-500"
                                }`}
                                title={
                                  thumb.deleted ? "Restore page" : "Remove page"
                                }
                                aria-label={
                                  thumb.deleted ? "Restore page" : "Remove page"
                                }
                              >
                                {thumb.deleted ? (
                                  <RotateCcw size={14} />
                                ) : (
                                  <Trash2 size={14} />
                                )}
                              </button>
                            </div>

                            <div className="h-40 flex items-center justify-center overflow-hidden bg-white">
                              <img
                                src={thumb.url}
                                alt={`Page ${thumb.pageNum}`}
                                style={{
                                  transform: `rotate(${thumb.rotation || 0}deg)`,
                                }}
                                className="max-h-40 max-w-full w-auto h-auto object-contain pointer-events-none transition-transform"
                              />
                            </div>

                            <div
                              className={`text-center py-2 text-xs font-bold border-t ${
                                thumb.deleted
                                  ? "bg-red-50 text-red-500 border-red-100"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                              }`}
                            >
                              {thumb.deleted
                                ? "Removed"
                                : `New Position: ${keptBefore + 1}`}
                            </div>
                          </SortableItemWrapper>
                        );
                      })}
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

              {thumbnails.length > 0 && !generatingThumbnails && (
                <div className="text-center mt-4 text-sm text-slate-500">
                  {thumbnails.filter((t) => !t.deleted).length} of{" "}
                  {thumbnails.length} pages kept
                  {thumbnails.some((t) => t.deleted) && (
                    <button
                      onClick={() =>
                        setThumbnails((prev) =>
                          prev.map((t) => ({ ...t, deleted: false })),
                        )
                      }
                      className="ml-2 text-[#FF9933] font-bold hover:underline cursor-pointer"
                    >
                      Restore all
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* PDF to Image Controls */}
          {files.length > 0 && tool.id === "pdf-to-image" && (
            <div className="mb-8 animate-fade-in">
              <div className="flex flex-wrap gap-3 justify-center mb-4">
                <button
                  onClick={() => setImgFormat("image/jpeg")}
                  className={`px-8 py-3 rounded-xl font-bold transition cursor-pointer ${
                    imgFormat === "image/jpeg"
                      ? "bg-[#FF9933] text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  JPG
                </button>
                <button
                  onClick={() => setImgFormat("image/png")}
                  className={`px-8 py-3 rounded-xl font-bold transition cursor-pointer ${
                    imgFormat === "image/png"
                      ? "bg-[#FF9933] text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  PNG
                </button>
              </div>

              {imgFormat === "image/jpeg" && (
                <div className="flex items-center gap-2 justify-center mb-4">
                  <span className="text-sm font-semibold text-slate-600">
                    Quality:
                  </span>
                  {[
                    { v: 0.8, label: "Good" },
                    { v: 0.92, label: "High" },
                    { v: 1.0, label: "Max" },
                  ].map((q) => (
                    <button
                      key={q.v}
                      onClick={() => setImgQuality(q.v)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border transition cursor-pointer ${
                        imgQuality === q.v
                          ? "bg-[#FF9933] text-white border-[#FF9933]"
                          : "bg-white text-slate-600 border-slate-200 hover:border-[#FF9933]"
                      }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="text-center mb-4">
                <p className="text-sm font-bold bg-orange-50 text-[#FF9933] inline-block px-4 py-2 rounded-full">
                  Tap pages to include or exclude them —{" "}
                  {selectedPages.size} of {thumbnails.length || "…"} selected
                </p>
              </div>

              {generatingThumbnails && thumbnails.length === 0 ? (
                <div className="py-12 flex flex-col items-center text-slate-400 animate-pulse">
                  <Loader2 className="animate-spin mb-2 w-8 h-8 text-[#FF9933]" />
                  <p className="font-medium text-slate-500">Loading Pages...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-125 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-inner">
                  {thumbnails.map((thumb) => {
                    const isOn = selectedPages.has(thumb.pageNum);
                    return (
                      <button
                        type="button"
                        key={thumb.pageNum}
                        onClick={() =>
                          setSelectedPages((prev) => {
                            const next = new Set(prev);
                            if (next.has(thumb.pageNum))
                              next.delete(thumb.pageNum);
                            else next.add(thumb.pageNum);
                            return next;
                          })
                        }
                        className={`relative rounded-lg overflow-hidden border-2 bg-white shadow-sm text-left cursor-pointer transition ${
                          isOn
                            ? "border-[#FF9933]"
                            : "border-slate-200 opacity-50"
                        }`}
                      >
                        {isOn && (
                          <div className="absolute top-1 right-1 bg-[#FF9933] text-white rounded-full p-1 z-10">
                            <Check size={12} />
                          </div>
                        )}
                        <img
                          src={thumb.url}
                          alt={`Page ${thumb.pageNum}`}
                          className="w-full h-auto"
                        />
                        <div className="absolute bottom-0 w-full bg-slate-900/80 text-white text-xs font-medium text-center py-1.5 backdrop-blur-sm">
                          Page {thumb.pageNum}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Delete Pages Controls */}
          {files.length > 0 && tool.id === "delete-pdf-pages" && (
            <div className="mb-8 animate-fade-in">
              <div className="flex flex-col items-center gap-3 mb-6">
                <p className="text-sm font-bold bg-red-50 text-red-600 inline-block px-4 py-2 rounded-full">
                  <Trash2 size={16} className="inline mr-1 mb-0.5" />
                  Tap the pages you want to DELETE
                </p>
                {selectedPages.size > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-700">
                      {selectedPages.size} page
                      {selectedPages.size > 1 ? "s" : ""} selected to delete
                    </span>
                    <button
                      onClick={() => setSelectedPages(new Set())}
                      className="text-xs font-bold text-slate-500 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-3 py-1.5 rounded-full transition cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
              {generatingThumbnails && thumbnails.length === 0 ? (
                <div className="py-12 flex flex-col items-center text-slate-400 animate-pulse">
                  <Loader2 className="animate-spin mb-2 w-8 h-8 text-[#FF9933]" />
                  <p className="font-medium text-slate-500">Loading Pages...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-125 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-inner">
                  {thumbnails.map((thumb) => {
                    const marked = selectedPages.has(thumb.pageNum);
                    return (
                      <div
                        key={thumb.pageNum}
                        onClick={() => {
                          const s = new Set(selectedPages);
                          if (s.has(thumb.pageNum)) s.delete(thumb.pageNum);
                          else s.add(thumb.pageNum);
                          setSelectedPages(s);
                        }}
                        className={`relative group rounded-lg overflow-hidden border-2 cursor-pointer transition-all bg-white shadow-sm ${
                          marked
                            ? "border-red-500 ring-4 ring-red-500/20"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                        }`}
                      >
                        <img
                          src={thumb.url}
                          alt={`Page ${thumb.pageNum}`}
                          className={`w-full h-auto transition ${
                            marked ? "opacity-40" : ""
                          }`}
                        />
                        <div className="absolute bottom-0 w-full bg-slate-900/80 text-white text-xs font-medium text-center py-1.5 backdrop-blur-sm">
                          Page {thumb.pageNum}
                        </div>
                        {marked && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md">
                            <Trash2 size={14} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Watermark Controls */}
          {/* Page Numbers Options */}
          {files.length > 0 && tool.id === "page-numbers" && !isDone && (
            <div className="mb-8 animate-fade-in max-w-3xl mx-auto space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Position
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "bottom-center", label: "Bottom Center" },
                    { id: "bottom-right", label: "Bottom Right" },
                    { id: "bottom-left", label: "Bottom Left" },
                    { id: "top-right", label: "Top Right" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPageNumPos(p.id)}
                      className={`py-2.5 px-2 rounded-lg font-bold text-xs sm:text-sm transition cursor-pointer ${
                        pageNumPos === p.id
                          ? "bg-[#FF9933] text-white shadow"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Format
                  </label>
                  <div className="flex gap-1.5">
                    {[
                      { id: "plain", label: "1, 2, 3" },
                      { id: "pageofn", label: "Page 1 of N" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setPageNumFormat(f.id)}
                        className={`flex-1 py-2 px-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                          pageNumFormat === f.id
                            ? "bg-[#FF9933] text-white shadow"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Start counting from
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={pageNumStart}
                    onChange={(e) =>
                      setPageNumStart(parseInt(e.target.value) || 1)
                    }
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-[#FF9933] outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 w-full">
                    <input
                      type="checkbox"
                      checked={pageNumSkipFirst}
                      onChange={(e) => setPageNumSkipFirst(e.target.checked)}
                      className="accent-[#FF9933] w-4 h-4"
                    />
                    <span className="text-sm font-bold text-slate-700">
                      Skip first page (cover)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {files.length > 0 && tool.id === "watermark-pdf" && (
            <div className="mb-8 animate-fade-in max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
              {/* Controls */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Watermark Text
                  </label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="e.g. CONFIDENTIAL"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Position
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "diagonal", label: "Diagonal" },
                      { id: "center", label: "Center" },
                      { id: "tiled", label: "Tiled" },
                      { id: "footer", label: "Footer" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setWatermarkPos(p.id)}
                        className={`py-2.5 rounded-lg font-bold text-sm transition cursor-pointer ${
                          watermarkPos === p.id
                            ? "bg-[#FF9933] text-white shadow"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-700">
                      Opacity
                    </label>
                    <span className="text-xs font-mono bg-orange-100 text-[#FF9933] px-2 py-1 rounded">
                      {Math.round(watermarkOpacity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1"
                    step="0.05"
                    value={watermarkOpacity}
                    onChange={(e) =>
                      setWatermarkOpacity(parseFloat(e.target.value))
                    }
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none accent-[#FF9933] cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Size
                    </label>
                    <div className="flex gap-1.5">
                      {[
                        { id: "small", label: "S" },
                        { id: "normal", label: "M" },
                        { id: "large", label: "L" },
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setWatermarkSize(s.id)}
                          className={`flex-1 py-2 rounded-lg font-bold text-sm transition cursor-pointer ${
                            watermarkSize === s.id
                              ? "bg-[#FF9933] text-white shadow"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Color
                    </label>
                    <div className="flex gap-1.5">
                      {[
                        { id: "gray", cls: "bg-slate-500" },
                        { id: "red", cls: "bg-red-600" },
                        { id: "blue", cls: "bg-blue-600" },
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setWatermarkColor(c.id)}
                          aria-label={`${c.id} watermark`}
                          className={`flex-1 h-9 rounded-lg cursor-pointer transition ring-offset-2 ${c.cls} ${
                            watermarkColor === c.id
                              ? "ring-2 ring-[#FF9933]"
                              : "opacity-60 hover:opacity-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview (Page 1) */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                  Live Preview (Page 1)
                </p>
                <div className="relative bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center min-h-75">
                  {files[0]?.preview ? (
                    <img
                      src={files[0].preview}
                      alt="Page 1 preview"
                      className="max-w-full max-h-100 w-auto"
                    />
                  ) : (
                    <div className="py-12 text-slate-400 flex flex-col items-center">
                      <FileText size={40} />
                      <span className="text-xs mt-2">Preview</span>
                    </div>
                  )}

                  {watermarkText.trim() && (
                    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                      {watermarkPos === "tiled" ? (
                        <div className="absolute inset-0 flex flex-wrap items-center justify-around content-around p-2">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <span
                              key={i}
                              className="font-extrabold whitespace-nowrap"
                              style={{
                                opacity: watermarkOpacity,
                                color: wmPreviewColor,
                                transform: "rotate(-45deg)",
                                fontSize: `${0.7 * wmSizeMul}rem`,
                              }}
                            >
                              {watermarkText}
                            </span>
                          ))}
                        </div>
                      ) : watermarkPos === "footer" ? (
                        <span
                          className="absolute bottom-3 left-1/2 -translate-x-1/2 font-extrabold whitespace-nowrap"
                          style={{
                            opacity: watermarkOpacity,
                            color: wmPreviewColor,
                            fontSize: `${0.8 * wmSizeMul}rem`,
                          }}
                        >
                          {watermarkText}
                        </span>
                      ) : watermarkPos === "center" ? (
                        <span
                          className="absolute top-1/2 left-1/2 font-extrabold whitespace-nowrap"
                          style={{
                            opacity: watermarkOpacity,
                            color: wmPreviewColor,
                            transform: "translate(-50%, -50%)",
                            fontSize: `${1.4 * wmSizeMul}rem`,
                          }}
                        >
                          {watermarkText}
                        </span>
                      ) : (
                        <span
                          className="absolute top-1/2 left-1/2 font-extrabold whitespace-nowrap"
                          style={{
                            opacity: watermarkOpacity,
                            color: wmPreviewColor,
                            transform: "translate(-50%, -50%) rotate(-45deg)",
                            fontSize: `${1.4 * wmSizeMul}rem`,
                          }}
                        >
                          {watermarkText}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Unlock Controls */}
          {files.length > 0 && tool.id === "unlock-pdf" && (
            <div className="mb-8 animate-fade-in max-w-md mx-auto">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                PDF Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={pdfPassword}
                  onChange={(e) => setPdfPassword(e.target.value)}
                  placeholder="Enter the password you use to open this PDF"
                  className="w-full p-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#FF9933] cursor-pointer p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-snug">
                We only remove a password you already know — this is not a
                cracker. For bank statements it&apos;s often your PAN + date of
                birth.
              </p>
              <p className="text-xs text-amber-600 mt-2 leading-snug">
                Note: the unlocked copy is rebuilt page-by-page as images, so
                text inside it won&apos;t be selectable or searchable.
              </p>
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
                    <Loader2 className="animate-spin" />{" "}
                    {ocrStatus ? "Running OCR…" : "Processing..."}
                  </>
                ) : tool.id === "compress-pdf" ? (
                  <>
                    <Minimize2 size={20} /> Compress PDF
                  </>
                ) : tool.id === "pdf-to-image" ? (
                  <>
                    PDF to {imgFormat === "image/png" ? "PNG" : "JPG"} Now{" "}
                    <Zap size={20} />
                  </>
                ) : (
                  <>
                    {tool.title} Now <Zap size={20} />
                  </>
                )}
              </button>
            )}

            {ocrStatus && (
              <p className="mt-3 text-sm text-slate-500 text-center max-w-md">
                {ocrStatus}
                <br />
                <span className="text-xs text-slate-400">
                  Scanned pages are read right on your device — the OCR engine
                  downloads once, then takes a few seconds per page.
                </span>
              </p>
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
                    {compressionStats.alreadyUnder && (
                      <p className="text-xs text-green-600 mt-3 leading-snug">
                        Your PDF was already under {compressionStats.target} KB,
                        so we kept it unchanged.
                      </p>
                    )}
                    {compressionStats.unchanged &&
                      !compressionStats.alreadyUnder && (
                        <p className="text-xs text-slate-500 mt-3 leading-snug">
                          This PDF was already well-optimized, so we kept your
                          original file unchanged.
                        </p>
                      )}
                    {compressionStats.targetMissed && (
                      <p className="text-xs text-amber-600 mt-3 leading-snug">
                        We couldn&apos;t reach {compressionStats.target} KB
                        without making the pages unreadable, so here&apos;s the
                        smallest clear version we could make.
                      </p>
                    )}
                    {compressionStats.flattened &&
                      !compressionStats.targetMissed && (
                        <p className="text-xs text-amber-600 mt-3 leading-snug">
                          Note: pages were flattened to images to shrink the
                          file, so text inside is no longer selectable.
                        </p>
                      )}
                  </div>
                )}

                {tool.id === "pdf-to-text" && extractedText && (
                  <div className="mb-6 max-w-2xl mx-auto text-left">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-600">
                        Extracted text
                        <span className="text-slate-400 font-medium">
                          {" "}
                          ({extractedText.length.toLocaleString()} characters)
                        </span>
                      </span>
                      <button
                        onClick={copyExtractedText}
                        className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                          copied
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-[#e68a2e] hover:bg-orange-200"
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check size={16} /> Copied!
                          </>
                        ) : (
                          <>
                            <FileText size={16} /> Copy all
                          </>
                        )}
                      </button>
                    </div>
                    <textarea
                      readOnly
                      value={extractedText}
                      onFocus={(e) => e.target.select()}
                      className="w-full h-64 p-4 border border-slate-300 rounded-xl bg-slate-50 text-sm text-slate-700 font-mono leading-relaxed resize-y focus:ring-2 focus:ring-[#FF9933] outline-none"
                    />
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a
                    href={downloadUrl}
                    download={downloadName}
                    className="bg-[#FF9933] text-white px-8 py-3.5 rounded-full hover:bg-[#e68a2e] transition font-bold shadow-lg shadow-orange-200 flex items-center justify-center gap-2 cursor-pointer text-lg"
                  >
                    <Download size={22} />{" "}
                    {tool.id === "pdf-to-text" ? "Download .txt" : "Download Result"}
                  </a>
                  <button
                    onClick={() => {
                      // Keep the loaded file; just return to the options so the
                      // user can tweak settings and run again
                      setIsDone(false);
                      setCompressionStats(null);
                      setExtractedText("");
                      setErrorMsg(null);
                    }}
                    className="bg-orange-50 text-[#e68a2e] border border-orange-200 px-8 py-3.5 rounded-full hover:bg-orange-100 transition font-bold cursor-pointer"
                  >
                    Adjust &amp; Re-run
                  </button>
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

      {/* <InfoSection info={tool.info} />

      <RelatedTools currentToolId={tool.id} toolType={tool.type} /> */}
    </div>
  );
};

export default PdfEditor;
