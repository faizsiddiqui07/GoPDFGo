"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  PenTool,
  Type as TypeIcon,
  ImageIcon,
  Eraser,
  ChevronLeft,
  ChevronRight,
  Move,
} from "lucide-react";

const SIG_FONTS = [
  { label: "Style 1", css: "'Brush Script MT','Segoe Script','Bradley Hand',cursive" },
  { label: "Style 2", css: "'Lucida Handwriting','Apple Chancery','Segoe Script',cursive" },
  { label: "Style 3", css: "'Segoe Script','Comic Sans MS',cursive" },
];

const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174";

const loadPdfJs = () =>
  new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.pdfjsLib) return resolve(true);
    const s = document.createElement("script");
    s.src = `${PDFJS}/pdf.min.js`;
    s.async = true;
    s.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS}/pdf.worker.min.js`;
      resolve(true);
    };
    s.onerror = () => reject(new Error("pdfjs load failed"));
    document.body.appendChild(s);
  });

// Crop a transparent canvas down to the inked area (+ small padding)
function trimCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  if (!width || !height) return null;
  const { data } = ctx.getImageData(0, 0, width, height);
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0,
    found = false;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 12) {
        found = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (!found) return null;
  const pad = 10;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width, maxX + pad);
  maxY = Math.min(height, maxY + pad);
  const w = maxX - minX;
  const h = maxY - minY;
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  out.getContext("2d").drawImage(canvas, minX, minY, w, h, 0, 0, w, h);
  return out;
}

export default function SignPdf() {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageUrl, setPageUrl] = useState(null);
  const [pageSize, setPageSize] = useState({ w: 1, h: 1 }); // PDF points

  const [sigMode, setSigMode] = useState("draw");
  const [signature, setSignature] = useState(null); // { url, w, h }
  const [typedText, setTypedText] = useState("");
  const [fontIdx, setFontIdx] = useState(0);

  // placement as fractions of the page (top-left origin)
  const [place, setPlace] = useState({ x: 0.34, y: 0.74, w: 0.3 });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const pdfDocRef = useRef(null);
  const arrayBufRef = useRef(null);
  const fileInputRef = useRef(null);
  const sigUploadRef = useRef(null);
  const drawCanvasRef = useRef(null);
  const drawingRef = useRef(false);
  const previewWrapRef = useRef(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  // Free the pdf.js document (worker + buffers) when the tool unmounts
  useEffect(() => {
    return () => {
      pdfDocRef.current?.destroy();
    };
  }, []);

  // ---- Load PDF + render a page ----
  const renderPage = useCallback(async (pageNum) => {
    const pdf = pdfDocRef.current;
    if (!pdf) return;
    const page = await pdf.getPage(pageNum);
    const base = page.getViewport({ scale: 1 });
    setPageSize({ w: base.width, h: base.height });
    const scale = Math.min(2, 1100 / Math.max(base.width, base.height));
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    setPageUrl(canvas.toDataURL("image/jpeg", 0.85));
  }, []);

  const handleFile = async (f) => {
    if (!f || f.type !== "application/pdf") {
      setErrorMsg("Please choose a PDF file.");
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);
    setIsDone(false);
    try {
      await loadPdfJs();
      const buf = await f.arrayBuffer();
      arrayBufRef.current = buf.slice(0);
      const pdf = await window.pdfjsLib.getDocument({ data: buf.slice(0) }).promise;
      await pdfDocRef.current?.destroy();
      pdfDocRef.current = pdf;
      setFile(f);
      setNumPages(pdf.numPages);
      setCurrentPage(1);
      await renderPage(1);
    } catch (e) {
      setErrorMsg("Could not open this PDF. It may be corrupted or password-protected.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToPage = async (n) => {
    const target = Math.max(1, Math.min(numPages, n));
    setCurrentPage(target);
    await renderPage(target);
  };

  // ---- Signature: DRAW ----
  const canvasPos = (e) => {
    const c = drawCanvasRef.current;
    const rect = c.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * c.width,
      y: ((e.clientY - rect.top) / rect.height) * c.height,
    };
  };
  const startDraw = (e) => {
    const c = drawCanvasRef.current;
    if (!c) return;
    c.setPointerCapture?.(e.pointerId);
    const ctx = c.getContext("2d");
    const p = canvasPos(e);
    ctx.strokeStyle = "#0b1f4d";
    ctx.lineWidth = 2.6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    drawingRef.current = true;
  };
  const moveDraw = (e) => {
    if (!drawingRef.current) return;
    const ctx = drawCanvasRef.current.getContext("2d");
    const p = canvasPos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  const endDraw = () => {
    drawingRef.current = false;
  };
  const clearDraw = () => {
    const c = drawCanvasRef.current;
    if (c) c.getContext("2d").clearRect(0, 0, c.width, c.height);
  };

  const applyDrawn = () => {
    const trimmed = trimCanvas(drawCanvasRef.current);
    if (!trimmed) {
      setErrorMsg("Draw your signature first.");
      return;
    }
    setErrorMsg(null);
    setSignature({ url: trimmed.toDataURL("image/png"), w: trimmed.width, h: trimmed.height });
    setPlace({ x: 0.34, y: 0.74, w: 0.3 });
  };

  // ---- Signature: TYPE ----
  const applyTyped = () => {
    const text = typedText.trim();
    if (!text) {
      setErrorMsg("Type your name first.");
      return;
    }
    setErrorMsg(null);
    const fontSize = 80;
    const css = `${fontSize}px ${SIG_FONTS[fontIdx].css}`;
    const meas = document.createElement("canvas").getContext("2d");
    meas.font = css;
    const tw = Math.ceil(meas.measureText(text).width);
    const canvas = document.createElement("canvas");
    canvas.width = tw + 48;
    canvas.height = Math.ceil(fontSize * 1.6);
    const ctx = canvas.getContext("2d");
    ctx.font = css;
    ctx.fillStyle = "#0b1f4d";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 24, canvas.height / 2);
    const trimmed = trimCanvas(canvas) || canvas;
    setSignature({ url: trimmed.toDataURL("image/png"), w: trimmed.width, h: trimmed.height });
    setPlace({ x: 0.34, y: 0.74, w: 0.32 });
  };

  // ---- Signature: UPLOAD ----
  const onSigUpload = (f) => {
    if (!f || !f.type.startsWith("image/")) {
      setErrorMsg("Please choose an image (PNG with transparent background works best).");
      return;
    }
    setErrorMsg(null);
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d").drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      setSignature({
        url: canvas.toDataURL("image/png"),
        w: img.naturalWidth,
        h: img.naturalHeight,
      });
      setPlace({ x: 0.34, y: 0.74, w: 0.3 });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setErrorMsg("Couldn't read that image.");
    };
    img.src = url;
  };

  // ---- Placement drag / resize ----
  const sigHeightFrac = () => {
    const sigAR = signature ? signature.w / signature.h : 3;
    const pageAR = pageSize.w / pageSize.h;
    return (place.w * pageAR) / sigAR;
  };

  const onDragStart = (e, mode) => {
    e.preventDefault();
    e.stopPropagation();
    if (!previewWrapRef.current) return;
    const rect = previewWrapRef.current.getBoundingClientRect();
    // Snapshot everything so the math stays stable for the whole drag, and so
    // the exact move/end functions we add are the ones we later remove.
    const start = {
      rect,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      orig: { ...place },
      sigAR: signature ? signature.w / signature.h : 3,
      pageAR: pageSize.w / pageSize.h,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const move = (ev) => {
      if (ev.pointerId !== start.pointerId) return;
      const dxF = (ev.clientX - start.startX) / start.rect.width;
      const dyF = (ev.clientY - start.startY) / start.rect.height;
      if (mode === "move") {
        const hF = (start.orig.w * start.pageAR) / start.sigAR;
        setPlace({
          ...start.orig,
          x: clamp(start.orig.x + dxF, 0, Math.max(0, 1 - start.orig.w)),
          y: clamp(start.orig.y + dyF, 0, Math.max(0, 1 - hF)),
        });
      } else {
        const w = clamp(start.orig.w + dxF, 0.06, 1 - start.orig.x);
        setPlace({ ...start.orig, w });
      }
    };
    const end = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };

  // ---- Export ----
  const signAndDownload = async () => {
    if (!signature || !file) return;
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.load(arrayBufRef.current.slice(0), {
        ignoreEncryption: true,
      });
      const pngBytes = await (await fetch(signature.url)).arrayBuffer();
      const sigImg = await pdfDoc.embedPng(pngBytes);

      const page = pdfDoc.getPages()[currentPage - 1];
      // pdf.js (preview) applies the page's /Rotate flag; pdf-lib's getWidth/Height
      // and drawImage work in the UNROTATED MediaBox. Map the user's placement
      // (measured in the rotated, as-seen frame) back into MediaBox space.
      const rot = ((page.getRotation().angle % 360) + 360) % 360;
      const pw = page.getWidth();
      const ph = page.getHeight();
      const rotated = rot === 90 || rot === 270;
      const Wv = rotated ? ph : pw; // visible frame width (matches the preview)
      const Hv = rotated ? pw : ph; // visible frame height

      const bw = place.w * Wv;
      const bh = bw * (signature.h / signature.w);
      const vx = place.x * Wv; // box left in the visible frame
      const vy = place.y * Hv; // box top in the visible frame

      let x;
      let y;
      let rotateDeg;
      if (rot === 90) {
        x = vy + bh;
        y = vx;
        rotateDeg = 90;
      } else if (rot === 180) {
        x = pw - vx;
        y = vy + bh;
        rotateDeg = 180;
      } else if (rot === 270) {
        x = pw - vy - bh;
        y = ph - vx;
        rotateDeg = 270;
      } else {
        x = vx;
        y = ph - vy - bh;
        rotateDeg = 0;
      }

      page.drawImage(sigImg, {
        x,
        y,
        width: bw,
        height: bh,
        rotate: degrees(rotateDeg),
      });

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setIsDone(true);
    } catch (e) {
      setErrorMsg("Something went wrong while signing the PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startOver = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFile(null);
    setIsDone(false);
    setDownloadUrl(null);
    setSignature(null);
    setPageUrl(null);
    setNumPages(0);
    setCurrentPage(1);
    setTypedText("");
    setErrorMsg(null);
    pdfDocRef.current?.destroy();
    pdfDocRef.current = null;
    arrayBufRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const hF = sigHeightFrac();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 animate-fade-in-up">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-slate-500 hover:text-[#FF9933] flex items-center gap-1 text-sm font-medium mb-3 transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Tools
        </button>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <PenTool size={28} className="text-orange-500" /> Sign PDF
        </h1>
      </div>

      {errorMsg && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2 text-sm border border-red-100">
          <AlertCircle size={18} className="shrink-0" /> {errorMsg}
        </div>
      )}

      <div className="mb-6 bg-blue-50 text-blue-700 p-3 rounded-lg flex items-start gap-2 text-sm border border-blue-100">
        <AlertCircle size={18} className="mt-0.5 shrink-0" />
        <span>
          This adds a visual (ink) signature to your PDF. It&apos;s perfect for
          forms, letters, and approvals — but it is not a legally certified
          digital signature (DSC/PKI).
        </span>
      </div>

      {!file ? (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-8">
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 hover:bg-slate-50 hover:border-[#FF9933] transition-colors cursor-pointer relative text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <div className="bg-orange-100 p-4 rounded-full mb-4 shadow-sm inline-flex">
              {isLoading ? (
                <Loader2 className="w-8 h-8 text-[#FF9933] animate-spin" />
              ) : (
                <Upload className="w-8 h-8 text-[#FF9933]" />
              )}
            </div>
            <p className="text-lg font-bold text-slate-700">
              {isLoading ? "Opening your PDF…" : "Click to upload a PDF"}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Your file is signed entirely in your browser — nothing is uploaded.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT: signature builder + controls */}
          <div className="p-5 md:p-7 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-5">
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {[
                { id: "draw", label: "Draw", icon: PenTool },
                { id: "type", label: "Type", icon: TypeIcon },
                { id: "upload", label: "Upload", icon: ImageIcon },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSigMode(m.id)}
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    sigMode === m.id
                      ? "bg-white text-[#FF9933] shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <m.icon size={15} /> {m.label}
                </button>
              ))}
            </div>

            {sigMode === "draw" && (
              <div>
                <canvas
                  ref={drawCanvasRef}
                  width={600}
                  height={220}
                  onPointerDown={startDraw}
                  onPointerMove={moveDraw}
                  onPointerUp={endDraw}
                  onPointerLeave={endDraw}
                  className="w-full h-44 bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg touch-none cursor-crosshair"
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={clearDraw}
                    className="text-xs font-bold text-slate-500 hover:text-red-500 flex items-center gap-1 cursor-pointer"
                  >
                    <Eraser size={14} /> Clear
                  </button>
                  <button
                    onClick={applyDrawn}
                    className="text-xs font-bold bg-[#FF9933] text-white px-4 py-2 rounded-lg hover:bg-[#e68a2e] cursor-pointer"
                  >
                    Use this signature
                  </button>
                </div>
              </div>
            )}

            {sigMode === "type" && (
              <div className="space-y-3">
                <input
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  placeholder="Type your name"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FF9933] outline-none font-medium"
                />
                <div className="grid grid-cols-3 gap-2">
                  {SIG_FONTS.map((f, i) => (
                    <button
                      key={f.label}
                      onClick={() => setFontIdx(i)}
                      style={{ fontFamily: f.css }}
                      className={`py-2 rounded-lg border text-lg truncate px-2 cursor-pointer transition ${
                        fontIdx === i
                          ? "border-[#FF9933] bg-orange-50 text-[#e68a2e]"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {typedText.trim() || "Name"}
                    </button>
                  ))}
                </div>
                <button
                  onClick={applyTyped}
                  className="text-xs font-bold bg-[#FF9933] text-white px-4 py-2 rounded-lg hover:bg-[#e68a2e] cursor-pointer"
                >
                  Use this signature
                </button>
              </div>
            )}

            {sigMode === "upload" && (
              <div>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#FF9933] cursor-pointer relative">
                  <input
                    ref={sigUploadRef}
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={(e) => onSigUpload(e.target.files?.[0])}
                  />
                  <ImageIcon className="w-7 h-7 text-[#FF9933] mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-600">
                    Upload a signature image
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PNG with a transparent background looks best.
                  </p>
                </div>
              </div>
            )}

            {signature && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-xs font-bold text-slate-500 mb-2">
                  Your signature (drag it onto the page →)
                </p>
                <div className="bg-white border border-slate-200 rounded p-2 flex items-center justify-center">
                  <img src={signature.url} alt="signature" className="max-h-16" />
                </div>
              </div>
            )}

            {!isDone ? (
              <button
                onClick={signAndDownload}
                disabled={!signature || isProcessing}
                className={`w-full py-3.5 rounded-full font-bold text-white flex items-center justify-center gap-2 transition ${
                  !signature || isProcessing
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-[#FF9933] hover:bg-[#e68a2e] shadow-lg shadow-orange-200 cursor-pointer"
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Signing…
                  </>
                ) : (
                  <>
                    <PenTool size={18} /> Add Signature &amp; Download
                  </>
                )}
              </button>
            ) : (
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 text-green-600 font-bold">
                  <CheckCircle size={20} /> Signed!
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={downloadUrl}
                    download={`GoPDFGo_signed_${file?.name || "document.pdf"}`}
                    className="flex-1 bg-[#FF9933] text-white px-6 py-3 rounded-full hover:bg-[#e68a2e] font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={18} /> Download
                  </a>
                  <button
                    onClick={startOver}
                    className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-full hover:bg-slate-200 font-bold cursor-pointer"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: page preview with draggable signature */}
          <div className="p-5 md:p-7 bg-slate-50">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-40 hover:border-[#FF9933] cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-bold text-slate-600">
                Page {currentPage} of {numPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= numPages}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-40 hover:border-[#FF9933] cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex justify-center">
              <div
                ref={previewWrapRef}
                className="relative inline-block shadow-lg max-w-full"
              >
                {pageUrl && (
                  <img
                    src={pageUrl}
                    alt={`Page ${currentPage}`}
                    className="block max-w-full select-none"
                    style={{ maxHeight: "70vh" }}
                    draggable={false}
                  />
                )}

                {signature && (
                  <div
                    className="absolute border-2 border-[#FF9933]/70 border-dashed group"
                    style={{
                      left: `${place.x * 100}%`,
                      top: `${place.y * 100}%`,
                      width: `${place.w * 100}%`,
                      touchAction: "none",
                    }}
                  >
                    <img
                      src={signature.url}
                      alt="placed signature"
                      className="w-full h-auto block pointer-events-none"
                      draggable={false}
                    />
                    {/* drag handle (whole box) */}
                    <div
                      className="absolute inset-0 cursor-move"
                      onPointerDown={(e) => onDragStart(e, "move")}
                    />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF9933] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 pointer-events-none">
                      <Move size={10} /> drag
                    </div>
                    {/* resize handle */}
                    <div
                      className="absolute -bottom-2 -right-2 w-5 h-5 bg-white border-2 border-[#FF9933] rounded-full cursor-nwse-resize shadow"
                      onPointerDown={(e) => onDragStart(e, "resize")}
                    />
                  </div>
                )}
              </div>
            </div>

            {!signature && (
              <p className="text-center text-xs text-slate-400 mt-3">
                Create a signature on the left, then drag it onto the page.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
