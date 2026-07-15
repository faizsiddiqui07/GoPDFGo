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
  AlertCircle,
} from "lucide-react";
import InfoSection from "./InfoSection";
import ProcessingOverlay from "./ProcessingOverlay";
import RelatedBlogs from "./RelatedBlogs";
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
  // Debounced live-preview runs (slider/settings tweaks) must NOT raise the
  // modal — it would cover and block the very slider being dragged.
  const [liveTweak, setLiveTweak] = useState(false);
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
  const [cropAspect, setCropAspect] = useState(null); // null = Free, else ratio (w/h)
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
  const [quality, setQuality] = useState(tool.config.defaultQuality || 0.8);
  const [compareSliderPos, setCompareSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [batchQuality, setBatchQuality] = useState(0.8);
  const [batchProgress, setBatchProgress] = useState({
    current: 0,
    total: 0,
    processed: 0,
    eta: 0, // ✅ BUG FIX 7: ETA Logic added in processBatch
    activeIndex: -1, // file currently being worked on (index into `files`)
  });
  const [processingTimes, setProcessingTimes] = useState([]);
  const [compressionStats, setCompressionStats] = useState(null);
  const [imgError, setImgError] = useState(null);
  const [heicDecoding, setHeicDecoding] = useState(false);

  // ID Masking: list of redaction boxes (in original-image coordinates)
  const [masks, setMasks] = useState([]);

  // ✅ NEW: Target file-size compression (e.g. "under 100 KB" for govt forms)
  const [sizeMode, setSizeMode] = useState("quality"); // "quality" | "target"
  const [targetKB, setTargetKB] = useState(100);

  // --- REFS ---
  const originalImageRef = useRef(null);
  const aspectRatioRef = useRef(0);
  const cropContainerRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const workerRef = useRef(null);
  const currentUrlsRef = useRef({ preview: null, converted: null, batch: [] });
  const pickerCanvasRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // One shared Worker serialises every task anyway, and PNG quantization runs
  // on the main thread — so a higher limit bought no parallelism, it only made
  // progress jump 5 at a time (React cannot paint while the thread is blocked).
  const CONCURRENCY_LIMIT = 1;

  // --- IDENTIFY TOOL TYPE ---
  const isMaskingTool = tool.id.includes("mask");
  const isCompressor = [
    "compress-webp",
    "compress-jpg",
    "compress-jpeg",
    "compress-png",
  ].includes(tool.id);
  const isHeic = tool.id.startsWith("heic-to-");
  const isConverter = tool.id.includes("convert") || isHeic;
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
      script.onerror = () => {
        // Previously failed silently — "Download All (ZIP)" just stayed dead
        setImgError(
          "Couldn't load the ZIP engine. Batch downloads need an internet connection — files can still be downloaded one by one.",
        );
      };
      document.body.appendChild(script);
    } else setJsZipLoaded(true);

    return () => {
      cleanupUrls();
      if (workerRef.current) workerRef.current.terminate();
      URL.revokeObjectURL(workerUrl);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [cleanupUrls]);

  // Tracks whether the user explicitly picked an output format, so loading
  // files doesn't silently snap their choice back to the tool default.
  const userPickedFormatRef = useRef(false);

  useEffect(() => {
    if (files.length > 0 && !userPickedFormatRef.current) {
      if (tool.config.defaultFormat) setFormat(tool.config.defaultFormat);
      else setFormat("original");
    }
  }, [files, tool.id, tool.config.defaultFormat]);

  // ✅ BUG FIX 3: Fixed runWorkerTask parameters to avoid duplicate bitmap param bug
  // `full` is opt-in: without it this still resolves the bare blob, so every
  // existing caller behaves exactly as before. Only Compress PNG asks for the
  // whole payload, because it needs the `quantized` flag.
  const runWorkerTask = (taskData, transferList = [], full = false) => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) return reject("Worker not ready");
      const msgHandler = (e) => {
        if (e.data.fileId === taskData.fileId) {
          workerRef.current.removeEventListener("message", msgHandler);
          if (e.data.success) resolve(full ? e.data : e.data.blob);
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
    if (isCompressor && sizeMode === "target") return; // target mode is manual (button)

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (!isInstantTool) {
      setLiveTweak(true); // keeps the modal down while the user drags
      setIsProcessing(true);
    }

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
    sizeMode,
  ]);

  useEffect(() => {
    if (files.length === 0) return;
    if (
      tool.id.includes("compress") ||
      tool.id.includes("convert") ||
      isHeic ||
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

  // Lazy-load the heic2any decoder from CDN only when an iPhone HEIC is dropped
  const loadHeic2any = () =>
    new Promise((resolve, reject) => {
      if (typeof window !== "undefined" && window.heic2any) return resolve();
      const existing = document.getElementById("heic2any-cdn");
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () =>
          reject(new Error("heic2any failed to load")),
        );
        return;
      }
      const s = document.createElement("script");
      s.id = "heic2any-cdn";
      s.src =
        "https://cdnjs.cloudflare.com/ajax/libs/heic2any/0.0.4/heic2any.min.js";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("heic2any failed to load"));
      document.body.appendChild(s);
    });

  // Decode HEIC/HEIF files → PNG File objects, then run the normal image pipeline
  const decodeAndLoadHeic = async (fileList) => {
    cleanupUrls();
    setFiles([]);
    setBatchResults([]);
    setPreviewUrl(null);
    setConvertedUrl(null);
    setCompressionStats(null);
    setColorPalette([]);
    setPickedColor(null);
    setHoverColor(null);
    setImgError(null);
    setHeicDecoding(true);

    try {
      await loadHeic2any();
      const decoded = [];
      let failures = 0;
      for (const f of fileList) {
        try {
          const out = await window.heic2any({ blob: f, toType: "image/png" });
          const blob = Array.isArray(out) ? out[0] : out;
          const base = f.name.replace(/\.(heic|heif)$/i, "") || "photo";
          decoded.push(
            new File([blob], `${base}.png`, { type: "image/png" }),
          );
        } catch (e) {
          failures++;
        }
      }

      setHeicDecoding(false);

      if (decoded.length === 0) {
        setImgError(
          "Couldn't read this HEIC file. Some iPhone Live Photos or 10/12-bit HEICs can't be decoded in the browser — open it on your iPhone and export as JPG, or try another photo.",
        );
        return;
      }
      if (failures > 0) {
        setImgError(
          `${failures} photo${failures > 1 ? "s" : ""} couldn't be decoded and ${failures > 1 ? "were" : "was"} skipped (Live Photos or unusual HEICs). The rest are ready below.`,
        );
      }

      setBatchProgress({
        current: 0,
        total: decoded.length,
        processed: 0,
        eta: 0,
      });
      setProcessingTimes([]);

      if (decoded.length > 1 && tool.config.allowBatch) {
        setIsBatchMode(true);
        setBatchResults([]);
        setFiles(decoded);
      } else {
        setIsBatchMode(false);
        setFiles(decoded);
        loadFileForEdit(decoded[0]);
      }
    } catch (e) {
      setHeicDecoding(false);
      setImgError(
        "The HEIC converter couldn't load. Please check your connection and try again.",
      );
    }
  };

  // Load pdf.js on demand — only needed when an ID-mask PDF is dropped in.
  const ensurePdfJs = () =>
    new Promise((resolve, reject) => {
      if (window.pdfjsLib) return resolve(true);
      const existing = document.getElementById("pdfjs-cdn");
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = "pdfjs-cdn";
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.async = true;
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(true);
      };
      script.onerror = () => {
        script.remove();
        reject(new Error("pdfjs load failed"));
      };
      document.body.appendChild(script);
    });

  // Render page 1 of a PDF into a PNG File so the masking canvas can use it.
  const pdfFirstPageToImageFile = async (file) => {
    await ensurePdfJs();
    const buf = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument(buf).promise;
    try {
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2 }); // 2x for a crisp, maskable image
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;
      const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
      canvas.width = 0;
      canvas.height = 0;
      if (!blob) throw new Error("render failed");
      const name = file.name.replace(/\.pdf$/i, "") + ".png";
      return new File([blob], name, { type: "image/png" });
    } finally {
      try {
        await pdf.destroy();
      } catch (e) {
        /* ignore */
      }
    }
  };

  const isPdfFile = (f) =>
    !!f && (f.type === "application/pdf" || /\.pdf$/i.test(f.name));

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
        setImgError(
          `Incorrect file type! Only ${tool.config.accept
            .replace(/image\//g, "")
            .toUpperCase()
            .replace(/\./g, "")} allowed here.`,
        );
        return;
      }
      fileList = validFiles;
    } else {
      fileList = fileList.filter(
        (f) => f.type.startsWith("image/") || (isMaskingTool && isPdfFile(f)),
      );
    }

    if (fileList.length === 0) return;

    setImgError(null);

    // ID Masking accepts a PDF Aadhaar too — render page 1 to an image first,
    // then re-enter this flow with the rendered PNG.
    if (isMaskingTool && isPdfFile(fileList[0])) {
      setIsProcessing(true);
      pdfFirstPageToImageFile(fileList[0])
        .then((imgFile) => {
          setIsProcessing(false);
          handleFileChange([imgFile]);
        })
        .catch(() => {
          setIsProcessing(false);
          setImgError(
            "Could not read that PDF. Try exporting the Aadhaar page as an image, or check your connection.",
          );
        });
      return;
    }

    // HEIC needs decoding first (browsers can't read it natively)
    if (isHeic) {
      decodeAndLoadHeic(fileList);
      return;
    }

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
    setMasks([]);

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
        isHeic ||
        tool.id === "rotate" ||
        tool.id === "flip"
      ) {
        // Triggered via useEffect
      } else {
        setIsProcessing(false);
      }
    };
    img.onerror = () => {
      // Undecodable image (e.g. an iPhone HEIC dropped into a generic tool) —
      // without this the full-screen spinner never goes away.
      setIsProcessing(false);
      setFiles([]);
      setPreviewUrl(null);
      URL.revokeObjectURL(url);
      currentUrlsRef.current.preview = null;
      setImgError(
        /\.(heic|heif)$/i.test(file.name || "")
          ? "This is an iPhone HEIC photo, which this tool can't open directly. Convert it first with our HEIC to JPG tool, then come back."
          : "We couldn't read this image. The file may be corrupted or in an unsupported format.",
      );
    };
  };

  // Run token: an in-flight worker result from file A must not overwrite
  // state after file B has been loaded.
  const processRunRef = useRef(0);
  // Actual MIME of the last produced blob — used for a truthful file extension
  // (the worker may fall back to PNG for formats canvases can't encode).
  const lastBlobTypeRef = useRef(null);

  // --- Real PNG compression (canvas PNG is lossless; we quantize colours) ---
  // Load UPNG.js + pako from CDN on demand (only for the Compress PNG tool).
  const ensureUpng = () =>
    new Promise((resolve, reject) => {
      if (window.UPNG && window.pako) return resolve(true);
      const loadScript = (id, src) =>
        new Promise((res, rej) => {
          const existing = document.getElementById(id);
          if (existing) existing.remove();
          const s = document.createElement("script");
          s.id = id;
          s.src = src;
          s.async = true;
          s.onload = () => res();
          s.onerror = () => {
            s.remove();
            rej(new Error(id + " failed"));
          };
          document.body.appendChild(s);
        });
      // pako must exist before UPNG (UPNG reads the pako global in browsers)
      (window.pako
        ? Promise.resolve()
        : loadScript(
            "pako-cdn",
            "https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js",
          )
      )
        .then(() =>
          window.UPNG
            ? Promise.resolve()
            : loadScript(
                "upng-cdn",
                "https://cdn.jsdelivr.net/npm/upng-js@2.1.0/UPNG.js",
              ),
        )
        .then(() => resolve(true))
        .catch(reject);
    });

  // quality slider (0.05–1) → UPNG colour count. 1.0 = lossless, lower = fewer colours.
  const qualityToCnum = (q) => (q >= 0.98 ? 0 : Math.max(8, Math.round(256 * q)));

  const drawToRgba = (bmp, w, h) => {
    let c;
    if (typeof OffscreenCanvas !== "undefined") c = new OffscreenCanvas(w, h);
    else {
      c = document.createElement("canvas");
      c.width = w;
      c.height = h;
    }
    const cx = c.getContext("2d");
    cx.imageSmoothingQuality = "high";
    cx.drawImage(bmp, 0, 0, w, h);
    return cx.getImageData(0, 0, w, h).data;
  };

  // Re-encode an already-edited PNG blob with colour quantization to shrink it.
  const pngQuantize = async (pngBlob, cnum) => {
    if (!cnum) return pngBlob; // lossless requested — keep as-is
    await ensureUpng();
    const bitmap = await createImageBitmap(pngBlob);
    const rgba = drawToRgba(bitmap, bitmap.width, bitmap.height);
    const out = window.UPNG.encode(
      [rgba.buffer],
      bitmap.width,
      bitmap.height,
      cnum,
    );
    if (bitmap.close) bitmap.close();
    const quantized = new Blob([out], { type: "image/png" });
    // Never hand back something larger than what we started with.
    return quantized.size < pngBlob.size ? quantized : pngBlob;
  };

  // Target-size PNG: binary-search the colour count, then downscale if needed.
  const compressPngToTarget = async (file, targetBytes) => {
    await ensureUpng();
    const bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    });
    let W = bitmap.width;
    let H = bitmap.height;
    const encode = (rgba, w, h, cnum) =>
      new Blob([window.UPNG.encode([rgba.buffer], w, h, cnum)], {
        type: "image/png",
      });

    let rgba = drawToRgba(bitmap, W, H);
    let lo = 2;
    let hi = 256;
    let best = null;
    let bestCnum = 2;
    for (let i = 0; i < 8; i++) {
      const mid = Math.round((lo + hi) / 2);
      const b = encode(rgba, W, H, mid);
      if (b.size <= targetBytes) {
        best = b;
        bestCnum = mid;
        lo = mid;
      } else {
        hi = mid;
      }
    }
    if (!best) best = encode(rgba, W, H, 2);
    let targetHit = best.size <= targetBytes;

    const MIN_SIDE = 200;
    while (!targetHit && Math.min(W, H) > MIN_SIDE) {
      W = Math.round(W * 0.8);
      H = Math.round(H * 0.8);
      rgba = drawToRgba(bitmap, W, H);
      const b = encode(rgba, W, H, 64);
      if (b.size < best.size) best = b;
      if (best.size <= targetBytes) targetHit = true;
    }
    if (bitmap.close) bitmap.close();
    return { blob: best, quality: bestCnum / 256, targetHit };
  };

  const processSingleImage = async (qualityOverride = null) => {
    if (!files[0] || !originalImageRef.current) return;
    const run = ++processRunRef.current;

    setImgError(null);
    if (!isInstantTool) setIsProcessing(true);

    try {
      const file = files[0];
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
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
        masks: isMaskingTool ? masks : undefined,
        originalMimeType: file.type,
      };

      // Canvas PNG is lossless, so compress-png has to quantize colours to
      // actually shrink. Ask the worker to do it inline (off the main thread).
      const cnum = tool.id === "compress-png" ? qualityToCnum(activeQuality) : 0;
      if (cnum) taskData.quantizeCnum = cnum;

      // ✅ BUG FIX 3 applied here (bitmap param removed)
      const res = await runWorkerTask(taskData, [], !!cnum);
      let blob = cnum ? res.blob : res;
      if (run !== processRunRef.current) return; // a newer file/run took over

      // Worker couldn't load UPNG (offline/CDN blocked) — quantize here instead,
      // so the tool keeps compressing rather than silently returning a plain PNG.
      if (cnum && !res.quantized) {
        blob = await pngQuantize(blob, cnum);
        if (run !== processRunRef.current) return;
      }

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
      lastBlobTypeRef.current = finalBlob.type || null;

      setConvertedUrl(newUrl);
      setFileSize(formatBytes(finalBlob.size));

      const original = file.size;
      const compressed = finalBlob.size;
      const saved = original - compressed;
      const percent = saved > 0 ? ((saved / original) * 100).toFixed(1) : 0;
      setCompressionStats({ original, compressed, percent, isReverted });
    } catch (err) {
      console.error(err);
      if (run === processRunRef.current) {
        setImgError(
          "Could not process this image. The format may be unsupported or the file may be corrupted.",
        );
      }
    } finally {
      if (run === processRunRef.current) {
        setIsProcessing(false);
        setLiveTweak(false);
      }
    }
  };

  // ✅ NEW: Compress to a target file size (binary-search the best quality)
  // ✅ NEW: Reusable — binary-search the best quality to hit a target byte size.
  // Returns { blob, quality, targetHit }. Works for any File (single + batch).
  const compressBlobToTarget = async (file, targetBytes) => {
    // PNG needs colour quantization, not a JPEG-style quality knob.
    if (tool.id === "compress-png") {
      return await compressPngToTarget(file, targetBytes);
    }
    // Decode the source ONCE, then only re-encode per iteration (no repeated decodes)
    const bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    });
    const reqFmt = format === "original" ? file.type : format;
    const useFmt = ["image/jpeg", "image/png", "image/webp"].includes(reqFmt)
      ? reqFmt
      : "image/jpeg";

    let canvas;
    if (typeof OffscreenCanvas !== "undefined") {
      canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    } else {
      canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
    }
    const ctx = canvas.getContext("2d");
    if (useFmt === "image/jpeg") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0);
    if (bitmap.close) bitmap.close();

    const makeBlob = (q) =>
      canvas.convertToBlob
        ? canvas.convertToBlob({ type: useFmt, quality: q })
        : new Promise((res) => canvas.toBlob((b) => res(b), useFmt, q));

    let low = 0.05;
    let high = 1.0;
    let bestBlob = null;
    let bestQ = 0.05;

    // ~8 iterations lands within a few % of the target
    for (let i = 0; i < 8; i++) {
      const mid = (low + high) / 2;
      const blob = await makeBlob(mid);
      if (blob.size <= targetBytes) {
        bestBlob = blob;
        bestQ = mid;
        low = mid; // size ok, push quality higher
      } else {
        high = mid; // too big, lower quality
      }
    }

    let targetHit = true;
    if (!bestBlob) {
      bestBlob = await makeBlob(0.05);
      bestQ = 0.05;
      targetHit = bestBlob.size <= targetBytes;
    }

    // Quality alone can't get a 4000px photo under 20KB — progressively
    // downscale the dimensions and retry (the PDF target mode already does
    // this; the image mode just gave up with targetHit:false).
    if (!targetHit) {
      let scaleW = canvas.width;
      let scaleH = canvas.height;
      const MIN_SIDE = 200; // keep it recognizable for form uploads
      while (
        bestBlob.size > targetBytes &&
        Math.min(scaleW, scaleH) > MIN_SIDE
      ) {
        scaleW = Math.round(scaleW * 0.8);
        scaleH = Math.round(scaleH * 0.8);
        let smaller;
        if (typeof OffscreenCanvas !== "undefined") {
          smaller = new OffscreenCanvas(scaleW, scaleH);
        } else {
          smaller = document.createElement("canvas");
          smaller.width = scaleW;
          smaller.height = scaleH;
        }
        const sctx = smaller.getContext("2d");
        if (useFmt === "image/jpeg") {
          sctx.fillStyle = "#FFFFFF";
          sctx.fillRect(0, 0, scaleW, scaleH);
        }
        sctx.imageSmoothingQuality = "high";
        sctx.drawImage(canvas, 0, 0, scaleW, scaleH);
        const makeSmall = (q) =>
          smaller.convertToBlob
            ? smaller.convertToBlob({ type: useFmt, quality: q })
            : new Promise((res) => smaller.toBlob((b) => res(b), useFmt, q));
        // quick 4-step search at this size
        let lo = 0.05;
        let hi = 0.92;
        let found = null;
        for (let i = 0; i < 4; i++) {
          const mid = (lo + hi) / 2;
          const b = await makeSmall(mid);
          if (b && b.size <= targetBytes) {
            found = b;
            bestQ = mid;
            lo = mid;
          } else {
            hi = mid;
          }
        }
        const candidate = found || (await makeSmall(0.05));
        if (candidate && candidate.size < bestBlob.size) bestBlob = candidate;
        if (found) {
          targetHit = true;
          break;
        }
      }
    }

    return { blob: bestBlob, quality: bestQ, targetHit };
  };

  // Single-image "compress to target size"
  const processToTargetSize = async () => {
    if (!files[0] || !originalImageRef.current) return;
    const targetBytes = Math.max(1, Number(targetKB) || 1) * 1024;
    setIsProcessing(true);

    try {
      const file = files[0];
      const { blob: bestBlob, quality: bestQ, targetHit } =
        await compressBlobToTarget(file, targetBytes);

      const newUrl = URL.createObjectURL(bestBlob);
      if (currentUrlsRef.current.converted)
        URL.revokeObjectURL(currentUrlsRef.current.converted);
      currentUrlsRef.current.converted = newUrl;
      lastBlobTypeRef.current = bestBlob.type || null;

      setConvertedUrl(newUrl);
      setQuality(bestQ);
      setFileSize(formatBytes(bestBlob.size));

      const original = file.size;
      const compressed = bestBlob.size;
      const saved = original - compressed;
      const percent = saved > 0 ? ((saved / original) * 100).toFixed(1) : 0;
      setCompressionStats({
        original,
        compressed,
        percent,
        isReverted: false,
        targetHit,
      });
    } catch (err) {
      console.error(err);
      setImgError("Could not compress this image to the target size.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ NEW: Live target-size compression (debounced) — preview updates as you type/click
  useEffect(() => {
    if (!isCompressor || sizeMode !== "target") return;
    if (files.length === 0 || !originalImageRef.current) return;
    if (!targetKB) return;
    const t = setTimeout(() => {
      processToTargetSize();
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetKB, sizeMode, width, height, files, isCompressor]);

  // ✅ Live crop — regenerate output whenever the crop box settles (not mid-drag)
  useEffect(() => {
    if (!tool.config.showVisualCrop) return;
    if (crop.isDragging) return;
    if (crop.w > 0 && originalImageRef.current) requestProcessImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crop.x, crop.y, crop.w, crop.h, crop.isDragging]);

  // ID Masking: rebuild the redacted output whenever the mask list changes
  useEffect(() => {
    if (!isMaskingTool || !originalImageRef.current || files.length === 0) return;
    const t = setTimeout(() => processSingleImage(), 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masks]);

  const processBatch = async () => {
    setIsProcessing(true);
    setBatchResults([]);
    currentUrlsRef.current.batch.forEach((url) => URL.revokeObjectURL(url));
    currentUrlsRef.current.batch = [];
    const executing = [];
    let processedCount = 0;

    // Smallest first: the first result lands almost immediately, so the wait
    // feels shorter than watching a 12MB photo go first. `srcIndex` still
    // points at the original row, so the list order on screen never changes.
    const order = files
      .map((_, i) => i)
      .sort((a, b) => files[a].size - files[b].size);

    for (const i of order) {
      const file = files[i];
      setBatchProgress((prev) => ({
        ...prev,
        current: processedCount + 1,
        processed: processedCount,
        activeIndex: i,
      }));

      const p = (async () => {
        const startTime = Date.now();
        const resultId = `batch-${i}-${Date.now()}`;
        try {
          let blob;

          if (isCompressor && sizeMode === "target") {
            // ✅ NEW: each file compressed to the target size
            const targetBytes = Math.max(1, Number(targetKB) || 1) * 1024;
            const result = await compressBlobToTarget(file, targetBytes);
            blob = result.blob;
          } else {
            const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
            const taskData = {
              fileId: resultId,
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
            // PNG is lossless — quantize colours so batch PNGs actually shrink.
            // The worker does it inline; this is what keeps a big batch from
            // freezing the page.
            const cnum =
              tool.id === "compress-png" ? qualityToCnum(batchQuality) : 0;
            if (cnum) taskData.quantizeCnum = cnum;

            // ✅ BUG FIX 3 applied here
            const res = await runWorkerTask(taskData, [], !!cnum);
            blob = cnum ? res.blob : res;
            // Worker had no UPNG (offline/CDN blocked) — fall back to the main
            // thread so the tool still compresses.
            if (cnum && !res.quantized) {
              blob = await pngQuantize(blob, cnum);
            }
            // Never ship a bigger file when the format isn't changing.
            // (For compressors `format` is a concrete MIME, so the old
            // `format === "original"` guard never fired and an already
            // optimized JPEG could come back LARGER.)
            const batchOutFmt = format === "original" ? file.type : format;
            if (blob.size >= file.size && batchOutFmt === file.type) blob = file;
          }

          const resultUrl = URL.createObjectURL(blob);
          currentUrlsRef.current.batch.push(resultUrl);

          const original = file.size;
          const saved = original - blob.size;
          const percent = saved > 0 ? ((saved / original) * 100).toFixed(0) : 0;

          setBatchResults((prev) => [
            ...prev,
            {
              id: resultId,
              srcIndex: i,
              name: file.name,
              url: resultUrl,
              blob,
              size: formatBytes(blob.size),
              originalSize: formatBytes(original),
              stats: { original, compressed: blob.size, percent, saved },
            },
          ]);

          processedCount++;

          // ETA. Files now run one at a time, so average-per-file × remaining
          // is the honest estimate.
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
      activeIndex: -1,
    }));
  };

  const handleDownloadClick = () => {
    if (!convertedUrl) return;
    const link = document.createElement("a");
    link.href = convertedUrl;
    let ext = "jpg";

    // Trust the ACTUAL blob type first — the worker falls back to PNG for
    // formats browsers can't encode (BMP/GIF), and a wrong extension gets
    // files rejected by strict upload portals.
    const typeToExt = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
      "image/bmp": "bmp",
    };
    if (lastBlobTypeRef.current && typeToExt[lastBlobTypeRef.current]) {
      ext = typeToExt[lastBlobTypeRef.current];
    } else if (compressionStats?.isReverted && files[0] && !isMaskingTool) {
      ext = files[0].name.split(".").pop();
    } else {
      if (format === "original" && files[0])
        ext = files[0].name.split(".").pop();
      else if (format.includes("png")) ext = "png";
      else if (format.includes("webp")) ext = "webp";
      else if (format.includes("gif")) ext = "gif";
    }

    const baseName = files[0]?.name?.replace(/\.[^/.]+$/, "") || "image";
    link.download = `${baseName}-gopdfgo.${ext}`;
    link.click();
  };

  const downloadZip = async () => {
    if (!window.JSZip || batchResults.length === 0) return;
    const zip = new window.JSZip();
    const usedNames = {};
    batchResults.forEach((res) => {
      const ext = res.blob.type.split("/")[1] || "jpg";
      const base = res.name.replace(/\.[^/.]+$/, "");
      let fname = `${base}_processed.${ext}`;
      if (usedNames[fname]) {
        usedNames[fname] += 1;
        fname = `${base}_processed_${usedNames[fname]}.${ext}`;
      } else {
        usedNames[fname] = 1;
      }
      zip.file(fname, res.blob);
    });
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    const zipUrl = URL.createObjectURL(content);
    link.href = zipUrl;
    link.download = `GoPDFGo_images.zip`;
    link.click();
    // Give the browser a moment to start the download, then free the blob
    setTimeout(() => URL.revokeObjectURL(zipUrl), 30000);
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
    setFlipH(false);
    setFlipV(false);
    setFilter("none");
    setMasks([]);
    setImgError(null);
    setCropAspect(null);
    setCompressionStats(null);
    userPickedFormatRef.current = false;
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    if (updated.length === 0) return handleClearAll();
    setFiles(updated);
    // Keep the progress denominator in sync or the bar finishes at e.g. 3/5
    setBatchProgress((prev) => ({ ...prev, total: updated.length }));
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
    setMagnifier({
      x,
      y,
      fx: x / rect.width,
      fy: y / rect.height,
      show: true,
      color: hex,
    });
  };

  // Touch support for the color picker — it was mouse-only on a mobile-first
  // site. Maps the first touch point onto the same sampling logic.
  const handlePickerTouch = (e) => {
    const t = e.touches && e.touches[0];
    if (!t) return;
    const img = e.currentTarget.querySelector("img");
    if (!img) return;
    handleMouseMove({ target: img, clientX: t.clientX, clientY: t.clientY });
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

    setCrop((p) => {
      const imgW = originalImageRef.current.width;
      const imgH = originalImageRef.current.height;

      const dx = currX - p.startX;
      const dy = currY - p.startY;
      let w = Math.abs(dx);
      let h = Math.abs(dy);

      // ✅ NEW: lock to a fixed aspect ratio if one is selected
      if (cropAspect) {
        // drive by the larger drag dimension so it feels natural
        if (w / cropAspect > h) h = w / cropAspect;
        else w = h * cropAspect;
      }

      // anchor the box at the start corner in the drag direction
      let x = dx < 0 ? p.startX - w : p.startX;
      let y = dy < 0 ? p.startY - h : p.startY;

      // keep the box inside the image
      if (x < 0) {
        w += x;
        x = 0;
      }
      if (y < 0) {
        h += y;
        y = 0;
      }
      if (x + w > imgW) w = imgW - x;
      if (y + h > imgH) h = imgH - y;

      // re-apply ratio after clamping so it stays exact
      if (cropAspect && w > 0 && h > 0) {
        if (w / cropAspect > h) w = h * cropAspect;
        else h = w / cropAspect;
      }

      return { ...p, x, y, w: Math.max(0, w), h: Math.max(0, h) };
    });
  };

  const handleInteractionEnd = () => {
    if (crop.isDragging) {
      if (isMaskingTool && crop.w > 2 && crop.h > 2) {
        // Commit this box to the redaction list, then clear the live drawing box
        const box = { x: crop.x, y: crop.y, w: crop.w, h: crop.h };
        setMasks((prev) => [...prev, box]);
        setCrop((p) => ({ ...p, isDragging: false, x: 0, y: 0, w: 0, h: 0 }));
      } else {
        setCrop((p) => ({ ...p, isDragging: false }));
        requestProcessImage();
      }
    }
    setIsDraggingSlider(false);
  };

  const undoLastMask = () => setMasks((prev) => prev.slice(0, -1));
  const clearMasks = () => setMasks([]);

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
          onClick={() =>
            document.referrer.startsWith(window.location.origin)
              ? router.back()
              : router.push("/")
          }
          className="text-slate-500 hover:text-[#FF9933] flex items-center gap-1 text-sm font-medium mb-3 transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Tools
        </button>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <tool.icon size={28} className="text-blue-500" />
          {tool.title}
        </h1>
      </div>

      {imgError && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm border border-red-100">
          <AlertCircle size={18} className="shrink-0" /> {imgError}
        </div>
      )}


      <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-150">
        {/* Title AND bar are both derived from `processed` (files actually
            finished) so they can never disagree. `batchProgress.current` is the
            QUEUED index — with 5 lanes it races ahead and used to read
            "13 of 13" while the bar sat at 77%. */}
        {/* `!liveTweak` keeps the blocking modal off the debounced preview runs
            so dragging the quality slider is never covered or interrupted. */}
        <ProcessingOverlay
          show={isProcessing && !liveTweak}
          title={
            isBatchMode && batchProgress.total > 0
              ? `Processing image ${Math.min(batchProgress.processed + 1, batchProgress.total)} of ${batchProgress.total}…`
              : "Processing your image…"
          }
          progress={
            isBatchMode && batchProgress.total > 0
              ? (batchProgress.processed / batchProgress.total) * 100
              : null
          }
          eta={isBatchMode ? batchProgress.eta : 0}
        />
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
                accept={
                  tool.config.accept ||
                  (isMaskingTool ? "image/*,application/pdf,.pdf" : "image/*")
                }
                onChange={(e) => handleFileChange(e.target.files)}
              />
              {heicDecoding ? (
                <>
                  <div className="bg-orange-100 p-4 rounded-full mb-4 shadow-sm">
                    <Loader2 className="w-8 h-8 text-[#FF9933] animate-spin" />
                  </div>
                  <p className="text-lg font-bold text-slate-700">
                    Converting your HEIC photo
                    {tool.config.allowBatch ? "s" : ""}…
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-medium">
                    This can take a few seconds on phones — the decoding runs on
                    your device.
                  </p>
                </>
              ) : (
                <>
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
                </>
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
                  aria-label="Clear all files"
                  title="Clear all files"
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {isBatchMode ? (
                <>
                  {/* Batch progress now lives in the ProcessingOverlay (count,
                      %, ETA) — the old inline blue bar duplicated it. */}
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
                        {/* Files are processed smallest-first, so the spinner
                            follows activeIndex — `i < current` would light up
                            the wrong rows now that order != index. */}
                        {batchResults.find((r) => r.srcIndex === i) ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : isProcessing && batchProgress.activeIndex === i ? (
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
                    {/* ✅ NEW: Batch mode toggle (compressors) */}
                    {isCompressor && (
                      <div className="flex gap-1 p-1 bg-slate-200 rounded-lg">
                        <button
                          onClick={() => setSizeMode("quality")}
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition cursor-pointer ${
                            sizeMode === "quality"
                              ? "bg-white text-[#FF9933] shadow-sm"
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          By Quality
                        </button>
                        <button
                          onClick={() => setSizeMode("target")}
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition cursor-pointer ${
                            sizeMode === "target"
                              ? "bg-white text-[#FF9933] shadow-sm"
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          By Target Size
                        </button>
                      </div>
                    )}

                    {!isCompressor || sizeMode === "quality" ? (
                      <>
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
                      </>
                    ) : (
                      <div className="space-y-2">
                        <span className="text-xs text-slate-500 block">
                          Target size (applied to each file)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {[20, 50, 100, 200, 500].map((kb) => (
                            <button
                              key={kb}
                              onClick={() => setTargetKB(kb)}
                              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition cursor-pointer ${
                                Number(targetKB) === kb
                                  ? "bg-[#FF9933] text-white border-[#FF9933]"
                                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-[#FF9933] hover:text-[#FF9933]"
                              }`}
                            >
                              {kb} KB
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={targetKB}
                            onChange={(e) =>
                              setTargetKB(parseInt(e.target.value) || 0)
                            }
                            className="w-24 p-2 border border-slate-300 rounded-lg text-center font-bold"
                          />
                          <span className="text-sm text-slate-500 font-medium">
                            KB
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={processBatch}
                      disabled={
                        isProcessing ||
                        (isCompressor && sizeMode === "target" && !targetKB)
                      }
                      className="w-full bg-[#FF9933] hover:bg-[#e68a2e] disabled:bg-slate-400 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
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

                    {/* ✅ NEW: Crop aspect-ratio presets */}
                    {tool.config.showVisualCrop && (
                      <div>
                        <span className="text-xs text-slate-500 mb-1.5 block">
                          Aspect ratio
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { label: "Free", val: null },
                            { label: "1:1", val: 1 },
                            { label: "16:9", val: 16 / 9 },
                            { label: "4:3", val: 4 / 3 },
                            { label: "3:4", val: 3 / 4 },
                          ].map((r) => (
                            <button
                              key={r.label}
                              onClick={() => {
                                setCropAspect(r.val);
                                // re-shape an existing box to the new ratio instantly
                                if (r.val && originalImageRef.current) {
                                  setCrop((p) => {
                                    if (!p.w || p.w <= 0) return p;
                                    const imgW = originalImageRef.current.width;
                                    const imgH = originalImageRef.current.height;
                                    let w = p.w;
                                    let h = w / r.val;
                                    let x = p.x;
                                    let y = p.y;
                                    if (y + h > imgH) {
                                      h = imgH - y;
                                      w = h * r.val;
                                    }
                                    if (x + w > imgW) {
                                      w = imgW - x;
                                      h = w / r.val;
                                    }
                                    return {
                                      ...p,
                                      x,
                                      y,
                                      w: Math.max(0, w),
                                      h: Math.max(0, h),
                                    };
                                  });
                                }
                              }}
                              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition cursor-pointer ${
                                cropAspect === r.val
                                  ? "bg-[#FF9933] text-white border-[#FF9933]"
                                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-[#FF9933] hover:text-[#FF9933]"
                              }`}
                            >
                              {r.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ID MASKING INSTRUCTIONS + CONTROLS */}
                    {isMaskingTool && (
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 rounded-lg text-xs text-red-700 border border-red-100 flex gap-2 items-start">
                          <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                          <div>
                            <strong>Secure Masking Mode:</strong>
                            <br />
                            Draw a box over each detail you want to hide — you can
                            add <strong>as many boxes as you need</strong>. Each
                            one is permanently burned out with a solid black box
                            (the pixels underneath are removed, not just covered).
                            For Aadhaar, UIDAI suggests hiding the first 8 digits
                            and keeping only the last 4 visible. Works for{" "}
                            <strong>
                              PAN, passport, voter ID, driving licence, bank
                              statements
                            </strong>{" "}
                            and marksheets too.
                          </div>
                        </div>

                        <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-800 border border-amber-200 flex gap-2 items-start">
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          <div>
                            <strong>Don&apos;t forget the QR code!</strong> An
                            Aadhaar/PAN QR code stores your full number and
                            details — anyone can scan it. If your card has a QR
                            code, draw a box over that too, or masking the digits
                            alone won&apos;t protect you.
                          </div>
                        </div>

                        {masks.length > 0 && (
                          <div className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                            <span className="text-xs font-bold text-slate-600">
                              {masks.length} area{masks.length > 1 ? "s" : ""}{" "}
                              redacted
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={undoLastMask}
                                className="text-xs font-bold px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-[#FF9933] hover:text-[#FF9933] cursor-pointer transition"
                              >
                                Undo last
                              </button>
                              <button
                                onClick={clearMasks}
                                className="text-xs font-bold px-3 py-1.5 rounded-md bg-white border border-slate-200 text-red-500 hover:bg-red-50 cursor-pointer transition"
                              >
                                Clear all
                              </button>
                            </div>
                          </div>
                        )}

                        <p className="text-[11px] text-slate-400 leading-snug flex gap-1.5 items-start">
                          <ShieldAlert size={13} className="shrink-0 mt-0.5" />
                          Bonus: saving here also strips hidden photo metadata
                          (GPS location, device info), so nothing extra leaks with
                          your file.
                        </p>
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

                        {/* ✅ NEW: Common size presets */}
                        <div className="col-span-2 -mt-2 mb-1">
                          <span className="text-xs text-slate-500 mb-1.5 block">
                            Quick presets
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: "Passport 200×230", w: 200, h: 230 },
                              { label: "Profile 400×400", w: 400, h: 400 },
                              { label: "HD 1280×720", w: 1280, h: 720 },
                              { label: "Square 1080", w: 1080, h: 1080 },
                            ].map((p) => (
                              <button
                                key={p.label}
                                onClick={() => {
                                  setMaintainAspectRatio(false);
                                  setWidth(p.w);
                                  setHeight(p.h);
                                }}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:border-[#FF9933] hover:text-[#FF9933] transition cursor-pointer"
                              >
                                {p.label}
                              </button>
                            ))}
                          </div>
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

                    {/* HEIC: choose output format JPG / PNG / WebP */}
                    {isHeic && (
                      <div>
                        <label className="text-sm font-bold text-slate-700 block mb-2">
                          Convert to
                        </label>
                        <div className="flex gap-2">
                          {[
                            { v: "image/jpeg", label: "JPG" },
                            { v: "image/png", label: "PNG" },
                            { v: "image/webp", label: "WebP" },
                          ].map((opt) => (
                            <button
                              key={opt.v}
                              onClick={() => {
                                userPickedFormatRef.current = true;
                                setFormat(opt.v);
                              }}
                              className={`flex-1 py-2.5 text-sm font-bold rounded-lg border transition cursor-pointer ${
                                format === opt.v
                                  ? "bg-[#FF9933] text-white border-[#FF9933] shadow-sm"
                                  : "bg-white text-slate-600 border-slate-200 hover:border-[#FF9933] hover:text-[#FF9933]"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-2 leading-snug">
                          JPG is the most compatible (forms, portals, sharing).
                          PNG keeps the cleanest quality. WebP is smallest for
                          websites.
                        </p>
                      </div>
                    )}

                    {/* ✅ NEW: Compressor mode toggle — Quality vs Target Size */}
                    {isCompressor && (
                      <div className="flex gap-1 p-1 bg-slate-200 rounded-lg">
                        <button
                          onClick={() => setSizeMode("quality")}
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition cursor-pointer ${
                            sizeMode === "quality"
                              ? "bg-white text-[#FF9933] shadow-sm"
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          By Quality
                        </button>
                        <button
                          onClick={() => setSizeMode("target")}
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition cursor-pointer ${
                            sizeMode === "target"
                              ? "bg-white text-[#FF9933] shadow-sm"
                              : "text-slate-600 hover:text-slate-800"
                          }`}
                        >
                          By Target Size
                        </button>
                      </div>
                    )}

                    {/* Quality slider: compressors in quality mode, or jpeg/webp converters */}
                    {((isCompressor && sizeMode === "quality") ||
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

                    {/* ✅ NEW: Target file-size UI (govt forms: under 20/50/100 KB) */}
                    {isCompressor && sizeMode === "target" && (
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 block">
                          Target file size
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[20, 50, 100, 200, 500].map((kb) => (
                            <button
                              key={kb}
                              onClick={() => setTargetKB(kb)}
                              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition cursor-pointer ${
                                Number(targetKB) === kb
                                  ? "bg-[#FF9933] text-white border-[#FF9933]"
                                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-[#FF9933] hover:text-[#FF9933]"
                              }`}
                            >
                              {kb} KB
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            value={targetKB}
                            onChange={(e) =>
                              setTargetKB(parseInt(e.target.value) || 0)
                            }
                            className="w-24 p-2 border border-slate-300 rounded-lg text-center font-bold"
                          />
                          <span className="text-sm text-slate-500 font-medium">
                            KB
                          </span>
                        </div>
                        <button
                          onClick={processToTargetSize}
                          disabled={isProcessing || !targetKB}
                          className="w-full bg-[#FF9933] hover:bg-[#e68a2e] disabled:bg-slate-400 text-white font-bold py-3 rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer transition"
                        >
                          {isProcessing ? (
                            <Loader2 className="animate-spin" size={20} />
                          ) : (
                            <Zap size={20} />
                          )}
                          {isProcessing
                            ? "Optimizing..."
                            : `Compress to ~${targetKB} KB`}
                        </button>
                        {compressionStats &&
                          compressionStats.targetHit === false && (
                            <p className="text-xs text-amber-600 leading-snug">
                              Couldn&apos;t reach {targetKB} KB without destroying
                              the image — this is the smallest clear version we
                              could produce.
                            </p>
                          )}
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
                <h3 className="text-lg font-bold text-slate-700 mb-2 flex items-center justify-center gap-2">
                  <CheckCircle className="text-green-500" /> Batch Complete
                </h3>

                {/* Total savings, summed from the results actually on screen so
                    it always matches the rows below (and stays correct if a
                    file came back unchanged). */}
                {(() => {
                  const totalSaved = batchResults.reduce(
                    (sum, r) => sum + Math.max(0, r.stats?.saved || 0),
                    0,
                  );
                  const totalOriginal = batchResults.reduce(
                    (sum, r) => sum + (r.stats?.original || 0),
                    0,
                  );
                  if (totalSaved <= 0) return null;
                  const pct = Math.round((totalSaved / totalOriginal) * 100);
                  return (
                    <div className="mb-4 mx-auto bg-green-50 border border-green-100 rounded-xl px-4 py-2.5 text-center">
                      <p className="text-sm font-bold text-green-700">
                        Saved {formatBytes(totalSaved)} in total
                        <span className="font-semibold text-green-600">
                          {" "}
                          ({pct}% smaller)
                        </span>
                      </p>
                      <p className="text-[11px] text-green-600/80 font-medium mt-0.5">
                        across {batchResults.length}{" "}
                        {batchResults.length === 1 ? "image" : "images"}
                      </p>
                    </div>
                  );
                })()}
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
                      className="cursor-crosshair relative touch-none"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => {
                        setHoverColor(null);
                        setMagnifier((p) => ({ ...p, show: false }));
                      }}
                      onClick={handleColorClick}
                      onTouchStart={handlePickerTouch}
                      onTouchMove={handlePickerTouch}
                      onTouchEnd={handleColorClick}
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
                            backgroundImage: `url(${convertedUrl ?? previewUrl})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "300%",
                            backgroundPosition: `${(magnifier.fx ?? 0.5) * 100}% ${
                              (magnifier.fy ?? 0.5) * 100
                            }%`,
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
                      {isMaskingTool &&
                        masks.map((m, i) => (
                          <div
                            key={`mask-${i}`}
                            className="absolute bg-black pointer-events-none"
                            style={{
                              left: `${(m.x / originalImageRef.current?.width) * 100}%`,
                              top: `${(m.y / originalImageRef.current?.height) * 100}%`,
                              width: `${(m.w / originalImageRef.current?.width) * 100}%`,
                              height: `${(m.h / originalImageRef.current?.height) * 100}%`,
                            }}
                          />
                        ))}
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
                      // Show the PROCESSED result once it exists (users were
                      // downloading resize output blind); instant tools keep
                      // the CSS-transformed original for live feedback.
                      src={
                        !isInstantTool && convertedUrl
                          ? convertedUrl
                          : previewUrl
                      }
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
      <RelatedBlogs toolId={tool.id} />
    </div>
  );
};

export default ImageEditor;