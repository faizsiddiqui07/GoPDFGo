"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProcessingOverlay from "./ProcessingOverlay";
import NextSteps from "./NextSteps";
import {
  ArrowLeft,
  Upload,
  Download,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileSearch,
  Eraser,
  ShieldCheck,
  Info,
} from "lucide-react";

// The six text fields PDFs carry in their Info dictionary, in the order a
// reader is most likely to care about. `key` is the literal PDF dictionary
// name, which is what we delete when a field is left blank.
const TEXT_FIELDS = [
  { key: "Title", label: "Title", get: "getTitle", set: "setTitle" },
  { key: "Author", label: "Author", get: "getAuthor", set: "setAuthor" },
  { key: "Subject", label: "Subject", get: "getSubject", set: "setSubject" },
  { key: "Keywords", label: "Keywords", get: "getKeywords", set: "setKeywords" },
  {
    key: "Creator",
    label: "Creator (the app that made it)",
    get: "getCreator",
    set: "setCreator",
  },
  {
    key: "Producer",
    label: "Producer (the PDF engine)",
    get: "getProducer",
    set: "setProducer",
  },
];

const DATE_KEYS = ["CreationDate", "ModDate"];

const fmtDate = (d) => {
  if (!d) return null;
  try {
    return d.toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(d);
  }
};

export default function PdfMetadata() {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // What the PDF arrived with, and what the user has edited it to.
  const [original, setOriginal] = useState(null); // { Title: "...", ... }
  const [fields, setFields] = useState(null);
  const [dates, setDates] = useState({ CreationDate: null, ModDate: null });
  const [removeDates, setRemoveDates] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  const bufRef = useRef(null);
  const fileInputRef = useRef(null);
  const isBusyRef = useRef(false);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  // Accept by MIME or extension: Android file managers and WhatsApp downloads
  // routinely hand over PDFs with a blank MIME type.
  const isPdfFile = (f) =>
    f &&
    (f.type === "application/pdf" ||
      (f.name || "").toLowerCase().endsWith(".pdf"));

  const readMetadata = async (f) => {
    if (!f) return;
    if (!isPdfFile(f)) {
      setErrorMsg("That is not a PDF. Please choose a .pdf file.");
      return;
    }
    if (isBusyRef.current) return;
    isBusyRef.current = true;

    setErrorMsg(null);
    setIsReading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const buf = await f.arrayBuffer();

      // updateMetadata:false is load-bearing. With the default (true), pdf-lib
      // stamps its OWN Producer and a fresh ModDate onto the document as it
      // loads — so we would show the user pdf-lib's metadata instead of their
      // file's, and then write that stamp back into the "cleaned" copy.
      const doc = await PDFDocument.load(buf, {
        ignoreEncryption: true,
        updateMetadata: false,
      });

      if (doc.isEncrypted) {
        setErrorMsg(
          "This PDF is password-protected, so its metadata can't be read or edited directly. Remove the password with our free Unlock PDF tool first, then try again.",
        );
        setIsReading(false);
        isBusyRef.current = false;
        return;
      }

      const found = {};
      for (const f2 of TEXT_FIELDS) {
        let v;
        try {
          v = doc[f2.get]();
        } catch {
          v = undefined;
        }
        found[f2.key] = typeof v === "string" ? v : "";
      }

      const readDate = (fn) => {
        try {
          const d = doc[fn]();
          return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null;
        } catch {
          return null;
        }
      };

      // Read EVERYTHING into locals before touching state. A half-broken PDF
      // can parse far enough to load and then throw on the next call, and if
      // setFile() had already run the user would be looking at an edit form
      // for a file we never finished reading, with an error banner above it.
      const readPages = doc.getPageCount();
      const readDates = {
        CreationDate: readDate("getCreationDate"),
        ModDate: readDate("getModificationDate"),
      };

      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(null);
      }
      bufRef.current = buf;
      setFile(f);
      setPageCount(readPages);
      setOriginal(found);
      setFields({ ...found });
      setDates(readDates);
      setRemoveDates(true);
      setIsDone(false);
    } catch (e) {
      console.error(e);
      // Leave the uploader on screen so the user can simply pick another file.
      bufRef.current = null;
      setFile(null);
      setFields(null);
      setOriginal(null);
      setErrorMsg(
        "We couldn't read this PDF. It may be corrupted, or in a format this tool can't open — try re-saving it and uploading again.",
      );
    } finally {
      setIsReading(false);
      isBusyRef.current = false;
    }
  };

  const applyAndDownload = async () => {
    if (!bufRef.current || !fields) return;
    if (isBusyRef.current) return;
    isBusyRef.current = true;

    setErrorMsg(null);
    setIsProcessing(true);
    try {
      const { PDFDocument, PDFName } = await import("pdf-lib");
      // Same flag as the read: without it pdf-lib re-stamps its own Producer
      // and ModDate on load, and they would survive into the saved file.
      const doc = await PDFDocument.load(bufRef.current, {
        ignoreEncryption: true,
        updateMetadata: false,
      });

      if (doc.isEncrypted) {
        throw new Error(
          "This PDF is password-protected, so its metadata can't be edited. Remove the password with our free Unlock PDF tool first.",
        );
      }

      const info = doc.getInfoDict();

      for (const f2 of TEXT_FIELDS) {
        const v = (fields[f2.key] || "").trim();
        if (!v) {
          // Deleting the key removes the entry from the file outright, which
          // is stronger than writing an empty string: nothing is left behind
          // in the bytes for anyone to read.
          info.delete(PDFName.of(f2.key));
        } else if (f2.key === "Keywords") {
          doc.setKeywords(v.split(/[,\n]+/).map((s) => s.trim()).filter(Boolean));
        } else {
          doc[f2.set](v);
        }
      }

      if (removeDates) {
        for (const k of DATE_KEYS) info.delete(PDFName.of(k));
      }

      const bytes = await doc.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(URL.createObjectURL(blob));
      setIsDone(true);
    } catch (e) {
      console.error(e);
      setErrorMsg(
        e?.message?.startsWith("This PDF is password-protected")
          ? e.message
          : "Something went wrong while writing the new file. Try re-saving the PDF and uploading it again.",
      );
    } finally {
      setIsProcessing(false);
      isBusyRef.current = false;
    }
  };

  const clearAll = () => {
    if (!fields) return;
    const blank = {};
    for (const f2 of TEXT_FIELDS) blank[f2.key] = "";
    setFields(blank);
    setRemoveDates(true);
  };

  const restoreAll = () => {
    if (original) setFields({ ...original });
  };

  const startOver = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFile(null);
    setFields(null);
    setOriginal(null);
    setDates({ CreationDate: null, ModDate: null });
    setPageCount(0);
    setIsDone(false);
    setDownloadUrl(null);
    setErrorMsg(null);
    bufRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const hasAnyMetadata =
    original &&
    (TEXT_FIELDS.some((f2) => (original[f2.key] || "").trim()) ||
      dates.CreationDate ||
      dates.ModDate);

  const outName = `GoPDFGo_${file?.name || "document.pdf"}`;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 animate-rise">
      <ProcessingOverlay
        show={isProcessing}
        title="Rewriting your PDF's metadata…"
      />

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
          <FileSearch size={28} className="text-orange-500" /> Remove PDF
          Metadata
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Every PDF quietly carries a title, an author name, and the name of the
          software that made it — often your real name, or your employer&apos;s
          licence. See exactly what your file is carrying, edit any of it, or
          strip it out completely. The file is read and rewritten inside your
          browser, so it never leaves your device.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-2 text-sm border border-red-100">
          <AlertCircle size={18} className="shrink-0 mt-0.5" /> {errorMsg}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {!file ? (
          <div className="p-4 sm:p-6 md:p-8">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                readMetadata(e.dataTransfer.files?.[0]);
              }}
              className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-[#FF9933] transition-colors cursor-pointer relative"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={(e) => readMetadata(e.target.files?.[0])}
                disabled={isReading}
              />
              <div className="pointer-events-none">
                <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF9933]">
                  {isReading ? (
                    <Loader2 size={32} className="animate-spin" />
                  ) : (
                    <Upload size={32} />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-700">
                  {isReading ? "Reading metadata…" : "Tap to upload a PDF"}
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                  Nothing is uploaded — the file is opened on your own device.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="min-w-0">
                <p
                  className="font-semibold text-slate-800 truncate"
                  title={file.name}
                >
                  {file.name}
                </p>
                <p className="text-sm text-slate-500 font-medium">
                  {file.size < 1024 * 1024
                    ? `${Math.max(1, Math.round(file.size / 1024))} KB`
                    : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                  {pageCount
                    ? ` · ${pageCount} page${pageCount === 1 ? "" : "s"}`
                    : ""}
                </p>
              </div>
              {!isDone && (
                <div className="flex gap-2">
                  <button
                    onClick={clearAll}
                    className="text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Eraser size={15} /> Clear all
                  </button>
                  <button
                    onClick={restoreAll}
                    className="text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition cursor-pointer"
                  >
                    Undo
                  </button>
                </div>
              )}
            </div>

            {!hasAnyMetadata && !isDone && (
              <div className="mb-6 bg-blue-50 text-blue-700 p-4 rounded-lg flex items-start gap-2 text-sm border border-blue-100">
                <Info size={18} className="shrink-0 mt-0.5" />
                <span>
                  This PDF carries no metadata at all — there is nothing to
                  remove. You can still type values in below if you want to add
                  them.
                </span>
              </div>
            )}

            {!isDone ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TEXT_FIELDS.map((f2) => {
                    const wasSet = (original?.[f2.key] || "").trim();
                    return (
                      <div key={f2.key}>
                        <label
                          htmlFor={`meta-${f2.key}`}
                          className="block text-sm font-bold text-slate-700 mb-1.5"
                        >
                          {f2.label}
                        </label>
                        <input
                          id={`meta-${f2.key}`}
                          type="text"
                          value={fields?.[f2.key] ?? ""}
                          onChange={(e) =>
                            setFields((p) => ({
                              ...p,
                              [f2.key]: e.target.value,
                            }))
                          }
                          placeholder={wasSet ? "" : "(empty)"}
                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#FF9933] transition"
                        />
                        {wasSet && !(fields?.[f2.key] || "").trim() && (
                          <p className="text-xs text-red-500 mt-1 font-medium">
                            Will be removed (was: {wasSet})
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={removeDates}
                      onChange={(e) => setRemoveDates(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#FF9933] cursor-pointer"
                    />
                    <span className="text-sm text-slate-700">
                      <strong className="font-bold">
                        Also remove the dates
                      </strong>
                      <br />
                      <span className="text-slate-500">
                        Created:{" "}
                        {fmtDate(dates.CreationDate) || "not set"} · Modified:{" "}
                        {fmtDate(dates.ModDate) || "not set"}
                      </span>
                    </span>
                  </label>
                </div>

                <button
                  onClick={applyAndDownload}
                  disabled={isProcessing}
                  className={`mt-6 w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] touch-manipulation ${
                    isProcessing
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-[#FF9933] hover:bg-[#e68a2e] shadow-lg shadow-orange-200 cursor-pointer"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Working…
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={20} /> Apply &amp; Download
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="text-center animate-fade-in">
                <div className="inline-flex items-center gap-2 text-green-600 font-bold text-xl mb-4">
                  <CheckCircle size={24} /> Metadata updated
                </div>
                <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                  Open the file and check its properties — the fields you
                  cleared are gone from the document itself, not just hidden.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                  <a
                    href={downloadUrl}
                    download={outName}
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

                <NextSteps toolId="remove-pdf-metadata" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
