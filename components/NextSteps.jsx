"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// What people actually reach for straight after a given job finishes. Kept to
// two suggestions at most, and only where the next step is genuinely common —
// a tool with no obvious follow-up (a QR code, a colour, a .txt file) shows
// nothing rather than padding the screen with links.
const NEXT_STEPS = {
  // ---- PDF ----
  "merge-pdf": [
    { href: "/compress-pdf", label: "Compress it", why: "if the upload form has a size cap" },
    { href: "/organize-pdf", label: "Fix the page order", why: "if something landed out of sequence" },
  ],
  "compress-pdf": [
    { href: "/split-pdf", label: "Split it", why: "if it is still too big to email" },
  ],
  "split-pdf": [
    { href: "/compress-pdf", label: "Compress the parts", why: "to get under an upload limit" },
  ],
  "extract-pdf-pages": [
    { href: "/compress-pdf", label: "Compress it", why: "a single scanned page can still be heavy" },
  ],
  "delete-pdf-pages": [
    { href: "/compress-pdf", label: "Compress it", why: "to get under an upload limit" },
  ],
  "rotate-pdf": [
    { href: "/merge-pdf", label: "Merge with other files", why: "now every page faces the right way" },
    { href: "/page-numbers", label: "Add page numbers", why: "" },
  ],
  "rearrange-pdf": [
    { href: "/page-numbers", label: "Add page numbers", why: "now the order is right" },
    { href: "/compress-pdf", label: "Compress it", why: "" },
  ],
  "organize-pdf": [
    { href: "/page-numbers", label: "Add page numbers", why: "now the order is right" },
    { href: "/compress-pdf", label: "Compress it", why: "" },
  ],
  "page-numbers": [
    { href: "/compress-pdf", label: "Compress it", why: "before uploading or emailing" },
  ],
  "image-to-pdf": [
    { href: "/compress-pdf", label: "Compress it", why: "photo pages are heavy" },
    { href: "/page-numbers", label: "Add page numbers", why: "" },
  ],
  "pdf-to-image": [
    { href: "/compress-jpg", label: "Compress the images", why: "if a form caps the file size" },
  ],
  "watermark-pdf": [
    { href: "/compress-pdf", label: "Compress it", why: "before sending it on" },
  ],
  "unlock-pdf": [
    { href: "/compress-pdf", label: "Compress it", why: "unlocked copies are usually heavier" },
    { href: "/merge-pdf", label: "Merge with other documents", why: "" },
  ],
  "sign-pdf": [
    { href: "/compress-pdf", label: "Compress it", why: "before emailing it back" },
    { href: "/merge-pdf", label: "Merge with your ID proof", why: "" },
  ],
  "remove-pdf-metadata": [
    { href: "/watermark-pdf", label: "Watermark it", why: "to mark who you are sending it to" },
    { href: "/compress-pdf", label: "Compress it", why: "" },
  ],

  // ---- IMAGE ----
  "compress-jpg": [
    { href: "/resize", label: "Resize it", why: "if the form wants exact pixel dimensions" },
    { href: "/image-to-pdf", label: "Make it a PDF", why: "" },
  ],
  "compress-jpeg": [
    { href: "/resize", label: "Resize it", why: "if the form wants exact pixel dimensions" },
    { href: "/image-to-pdf", label: "Make it a PDF", why: "" },
  ],
  "compress-png": [
    { href: "/resize", label: "Resize it", why: "if the form wants exact pixel dimensions" },
    { href: "/convert-jpg", label: "Convert to JPG", why: "" },
  ],
  "compress-webp": [
    { href: "/resize", label: "Resize it", why: "if you need exact dimensions" },
  ],
  resize: [
    { href: "/compress-jpg", label: "Compress it", why: "if there is also a KB limit" },
    { href: "/crop", label: "Crop it", why: "" },
  ],
  crop: [
    { href: "/resize", label: "Resize it", why: "to hit exact pixel dimensions" },
    { href: "/compress-jpg", label: "Compress it", why: "" },
  ],
  rotate: [
    { href: "/image-to-pdf", label: "Make it a PDF", why: "now it faces the right way" },
    { href: "/compress-jpg", label: "Compress it", why: "" },
  ],
  flip: [
    { href: "/compress-jpg", label: "Compress it", why: "before uploading" },
  ],
  "convert-jpg": [
    { href: "/compress-jpg", label: "Compress it", why: "if the form has a KB limit" },
  ],
  "convert-png": [
    { href: "/compress-png", label: "Compress it", why: "PNGs get heavy quickly" },
  ],
  "convert-webp": [
    { href: "/compress-webp", label: "Compress it", why: "to cut the page weight further" },
  ],
  "heic-to-jpg": [
    { href: "/compress-jpg", label: "Compress it", why: "if the form has a KB limit" },
    { href: "/image-to-pdf", label: "Make it a PDF", why: "" },
  ],
  "heic-to-png": [
    { href: "/compress-png", label: "Compress it", why: "PNGs get heavy quickly" },
  ],
  "heic-to-webp": [
    { href: "/compress-webp", label: "Compress it", why: "to cut the page weight further" },
  ],
  "combine-images": [
    { href: "/compress-jpg", label: "Compress it", why: "if the upload has a size cap" },
    { href: "/image-to-pdf", label: "Make it a PDF", why: "" },
  ],
  "aadhaar-masking": [
    { href: "/watermark-pdf", label: "Watermark it", why: "to mark who you are sending it to" },
    { href: "/image-to-pdf", label: "Make it a PDF", why: "" },
  ],
};

export default function NextSteps({ toolId }) {
  const steps = NEXT_STEPS[toolId];
  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-6 pt-5 border-t border-slate-100">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">
        What people do next
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
        {steps.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group inline-flex items-center justify-center gap-1.5 text-sm text-slate-600 hover:text-[#FF9933] bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-full px-4 py-2 transition"
          >
            <span className="font-bold">{s.label}</span>
            {s.why && (
              <span className="hidden sm:inline text-slate-400 group-hover:text-[#e68a2e]">
                {s.why}
              </span>
            )}
            <ArrowRight
              size={14}
              className="shrink-0 opacity-60 group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
