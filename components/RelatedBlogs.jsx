import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogsData } from "../utils/BlogData";

// Har tool ke liye sabse relevant guides (internal linking: tool -> blog).
// Jis tool ke liye mapping na ho, latest 3 guides fallback me dikhte hain.
const TOOL_BLOG_MAP = {
  "compress-pdf": [
    "optimize-pdf-under-50kb-government-recruitment-forms",
    "compress-pan-card-pdf-kyc-verification",
    "split-large-pdf-bypass-email-attachment-limits",
  ],
  "merge-pdf": [
    "merge-marksheets-pdf-govt-jobs",
    "merge-multiple-vendor-invoices-pdf-accounting",
    "organize-merge-documents-online-visa-applications",
  ],
  "split-pdf": [
    "extract-single-page-from-large-pdf",
    "split-large-pdf-bypass-email-attachment-limits",
    "best-secure-alternatives-ilovepdf-smallpdf",
  ],
  "extract-pdf-pages": [
    "extract-single-page-from-large-pdf",
    "split-large-pdf-bypass-email-attachment-limits",
    "organize-merge-documents-online-visa-applications",
  ],
  "rotate-pdf": [
    "rotate-scanned-assignment-pages-permanently",
    "rearrange-scanned-pdf-page-order",
    "why-mobile-scanner-apps-add-watermarks-avoid",
  ],
  "page-numbers": [
    "add-page-numbers-to-college-project-pdf",
    "add-page-numbers-legal-documents-court-filings",
    "common-pdf-mistakes-online-job-applications",
  ],
  "image-to-pdf": [
    "combine-assignment-photos-into-one-pdf-mobile",
    "convert-mobile-photos-to-clear-pdf",
    "create-product-catalog-pdf-whatsapp-sharing",
  ],
  "rearrange-pdf": [
    "rearrange-scanned-pdf-page-order",
    "organize-merge-documents-online-visa-applications",
    "prepare-property-documents-one-pdf-home-loan",
  ],
  "pdf-to-image": [
    "convert-mobile-photos-to-clear-pdf",
    "jpg-vs-png-format-guide",
    "create-product-catalog-pdf-whatsapp-sharing",
  ],
  "watermark-pdf": [
    "mask-aadhaar-card-safely-for-rent-agreements",
    "never-upload-bank-statements-free-pdf-sites",
    "best-secure-alternatives-ilovepdf-smallpdf",
  ],
  "delete-pdf-pages": [
    "rearrange-scanned-pdf-page-order",
    "split-large-pdf-bypass-email-attachment-limits",
    "common-pdf-mistakes-online-job-applications",
  ],
  "unlock-pdf": [
    "never-upload-bank-statements-free-pdf-sites",
    "compress-pan-card-pdf-kyc-verification",
    "local-pdf-processing-vs-cloud-tools-safer",
  ],
  "pdf-to-text": [
    "extract-single-page-from-large-pdf",
    "local-pdf-processing-vs-cloud-tools-safer",
    "best-secure-alternatives-ilovepdf-smallpdf",
  ],
  "organize-pdf": [
    "rearrange-scanned-pdf-page-order",
    "organize-merge-documents-online-visa-applications",
    "prepare-property-documents-one-pdf-home-loan",
  ],
  "sign-pdf": [
    "mask-aadhaar-card-safely-for-rent-agreements",
    "common-pdf-mistakes-online-job-applications",
    "local-pdf-processing-vs-cloud-tools-safer",
  ],
  "heic-to-jpg": [
    "jpg-vs-png-format-guide",
    "convert-mobile-photos-to-clear-pdf",
    "fix-mirrored-selfies-upside-down-photos-online",
  ],
  "heic-to-png": [
    "jpg-vs-png-format-guide",
    "convert-webp-to-png-for-photoshop",
    "find-exact-color-code-hex-rgb",
  ],
  "heic-to-webp": [
    "compress-webp-images-speed-up-wordpress",
    "jpg-vs-png-format-guide",
    "convert-webp-to-png-for-photoshop",
  ],
  "compress-jpg": [
    "compress-jpg-under-20kb-online-forms",
    "resize-passport-photo-signature-200x230",
    "common-pdf-mistakes-online-job-applications",
  ],
  "compress-jpeg": [
    "compress-jpg-under-20kb-online-forms",
    "resize-passport-photo-signature-200x230",
    "convert-expense-receipts-to-pdf-reimbursement",
  ],
  "compress-webp": [
    "compress-webp-images-speed-up-wordpress",
    "jpg-vs-png-format-guide",
    "convert-webp-to-png-for-photoshop",
  ],
  resize: [
    "resize-passport-photo-signature-200x230",
    "compress-jpg-under-20kb-online-forms",
    "fix-mirrored-selfies-upside-down-photos-online",
  ],
  crop: [
    "remove-unwanted-edges-crop-scanned-documents",
    "resize-passport-photo-signature-200x230",
    "mask-aadhaar-card-safely-for-rent-agreements",
  ],
  "convert-jpg": [
    "jpg-vs-png-format-guide",
    "convert-webp-to-png-for-photoshop",
    "compress-jpg-under-20kb-online-forms",
  ],
  "convert-png": [
    "jpg-vs-png-format-guide",
    "convert-webp-to-png-for-photoshop",
    "find-exact-color-code-hex-rgb",
  ],
  "convert-webp": [
    "convert-webp-to-png-for-photoshop",
    "compress-webp-images-speed-up-wordpress",
    "jpg-vs-png-format-guide",
  ],
  rotate: [
    "fix-mirrored-selfies-upside-down-photos-online",
    "rotate-scanned-assignment-pages-permanently",
    "remove-unwanted-edges-crop-scanned-documents",
  ],
  flip: [
    "fix-mirrored-selfies-upside-down-photos-online",
    "jpg-vs-png-format-guide",
    "find-exact-color-code-hex-rgb",
  ],
  "color-picker": [
    "find-exact-color-code-hex-rgb",
    "jpg-vs-png-format-guide",
    "compress-webp-images-speed-up-wordpress",
  ],
  "aadhaar-masking": [
    "mask-aadhaar-card-safely-for-rent-agreements",
    "never-upload-bank-statements-free-pdf-sites",
    "local-pdf-processing-vs-cloud-tools-safer",
  ],
  "qr-generator": [
    "generate-free-qr-codes-for-website",
    "share-wifi-without-passwords-free-qr-code",
    "static-vs-dynamic-qr-codes-difference",
  ],
};

const RelatedBlogs = ({ toolId }) => {
  const slugs = TOOL_BLOG_MAP[toolId] || [];

  let posts = slugs
    .map((slug) => blogsData.find((b) => b.id === slug))
    .filter(Boolean);

  // Fallback: latest 3 guides
  if (posts.length === 0) {
    posts = [...blogsData].slice(-3).reverse();
  }

  if (posts.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-0 mb-12 border-t border-slate-200 pt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen size={22} className="text-[#FF9933]" /> Related Guides
        </h2>
        <Link
          href="/blogs"
          className="text-sm sm:text-base text-[#FF9933] font-medium hover:underline flex items-center gap-1"
        >
          All Guides <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className="group bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#FF9933]/30 active:scale-[0.98] touch-manipulation transition-[scale,box-shadow,border-color] duration-200 flex flex-col h-full"
          >
            <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-[#FF9933] transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 flex-1">
              {post.excerpt}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#FF9933]">
              Read Guide{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedBlogs;
