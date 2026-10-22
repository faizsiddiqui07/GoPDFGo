/**
 * The data the sitemap is built from. `app/sitemap.js` turns it into
 * sitemap.xml at build time.
 *
 * Two things live here, for two different reasons.
 *
 * STATIC_PAGES is hand-maintained on purpose. Tool pages take their prose
 * from one shared file, so deriving their dates from anything automatic
 * would bump all 35 of them the moment one sentence changed — and a wall of
 * identical lastmods is the fingerprint of scaled content, which is exactly
 * what this site does not want to look like. A layout change is not a
 * content change either. So: edit the date here when a page genuinely says
 * something new, and leave it alone otherwise.
 *
 * BLOG_LASTMOD_FLOOR is a frozen record of what the hand-written sitemap had
 * already published for each post, and it exists to stop dates going
 * BACKWARD. 33 of these posts were edited at some point and their sitemap
 * date bumped, but BlogData.js carries no updatedAt for them, so generating
 * purely from publishedAt would move those 33 dates months into the past —
 * telling Google the pages got older. The floor is deliberately NOT written
 * into BlogData as updatedAt: several of these share one date, which means
 * they were bumped in bulk rather than genuinely edited that day, and
 * recording that as an edit date would be a lie.
 *
 * A new post needs nothing here — it picks up its own publishedAt. To move
 * an existing post forward, set updatedAt on it in BlogData.js.
 */

export const SITE = "https://gopdfgo.com";

export const STATIC_PAGES = [
  { path: "/", lastmod: "2026-09-05", changefreq: "daily", priority: "1.0" },
  { path: "/compress-pdf", lastmod: "2026-09-05", changefreq: "weekly", priority: "0.9" },
  { path: "/merge-pdf", lastmod: "2026-09-05", changefreq: "weekly", priority: "0.9" },
  { path: "/extract-pdf-pages", lastmod: "2026-09-05", changefreq: "weekly", priority: "0.9" },
  { path: "/split-pdf", lastmod: "2026-07-18", changefreq: "weekly", priority: "0.9" },
  { path: "/image-to-pdf", lastmod: "2026-08-11", changefreq: "weekly", priority: "0.9" },
  { path: "/rearrange-pdf", lastmod: "2026-09-05", changefreq: "weekly", priority: "0.9" },
  { path: "/page-numbers", lastmod: "2026-09-05", changefreq: "monthly", priority: "0.8" },
  { path: "/rotate-pdf", lastmod: "2026-09-05", changefreq: "monthly", priority: "0.8" },
  { path: "/pdf-to-image", lastmod: "2026-07-18", changefreq: "weekly", priority: "0.9" },
  { path: "/watermark-pdf", lastmod: "2026-09-05", changefreq: "monthly", priority: "0.8" },
  { path: "/delete-pdf-pages", lastmod: "2026-07-18", changefreq: "monthly", priority: "0.8" },
  { path: "/unlock-pdf", lastmod: "2026-07-18", changefreq: "monthly", priority: "0.8" },
  { path: "/ocr-pdf", lastmod: "2026-09-05", changefreq: "monthly", priority: "0.8" },
  { path: "/pdf-to-text", lastmod: "2026-07-18", changefreq: "monthly", priority: "0.8" },
  { path: "/heic-to-jpg", lastmod: "2026-07-18", changefreq: "monthly", priority: "0.8" },
  { path: "/heic-to-png", lastmod: "2026-07-18", changefreq: "monthly", priority: "0.8" },
  { path: "/heic-to-webp", lastmod: "2026-07-18", changefreq: "monthly", priority: "0.8" },
  { path: "/organize-pdf", lastmod: "2026-09-05", changefreq: "monthly", priority: "0.8" },
  { path: "/sign-pdf", lastmod: "2026-09-05", changefreq: "monthly", priority: "0.8" },
  { path: "/remove-pdf-metadata", lastmod: "2026-09-05", changefreq: "monthly", priority: "0.8" },
  { path: "/compress-webp", lastmod: "2026-08-11", changefreq: "weekly", priority: "0.8" },
  { path: "/compress-png", lastmod: "2026-07-18", changefreq: "weekly", priority: "0.8" },
  { path: "/compress-jpg", lastmod: "2026-08-11", changefreq: "weekly", priority: "0.8" },
  { path: "/resize", lastmod: "2026-08-11", changefreq: "weekly", priority: "0.8" },
  { path: "/combine-images", lastmod: "2026-08-05", changefreq: "monthly", priority: "0.8" },
  { path: "/crop", lastmod: "2026-07-18", changefreq: "weekly", priority: "0.8" },
  { path: "/flip", lastmod: "2026-07-18", changefreq: "monthly", priority: "0.8" },
  { path: "/rotate", lastmod: "2026-07-18", changefreq: "monthly", priority: "0.8" },
  { path: "/convert-webp", lastmod: "2026-07-28", changefreq: "weekly", priority: "0.8" },
  { path: "/convert-png", lastmod: "2026-08-11", changefreq: "weekly", priority: "0.8" },
  { path: "/convert-jpg", lastmod: "2026-07-28", changefreq: "weekly", priority: "0.8" },
  { path: "/qr-generator", lastmod: "2026-08-11", changefreq: "monthly", priority: "0.9" },
  { path: "/color-picker", lastmod: "2026-07-18", changefreq: "monthly", priority: "0.8" },
  { path: "/aadhaar-masking", lastmod: "2026-07-28", changefreq: "monthly", priority: "0.7" },
  { path: "/about", lastmod: "2026-07-18", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", lastmod: "2026-06-17", changefreq: "yearly", priority: "0.5" },
  { path: "/terms", lastmod: "2026-07-08", changefreq: "yearly", priority: "0.4" },
  { path: "/why-gopdfgo", lastmod: "2026-07-08", changefreq: "yearly", priority: "0.5" },
  { path: "/how-it-works", lastmod: "2026-07-08", changefreq: "yearly", priority: "0.5" },
  { path: "/privacy", lastmod: "2026-06-22", changefreq: "yearly", priority: "0.4" },
  { path: "/blogs", lastmod: "2026-10-17", changefreq: "monthly", priority: "0.9" },
];

export const BLOG_LASTMOD_FLOOR = {
  "optimize-pdf-under-50kb-government-recruitment-forms": "2026-09-05",
  "merge-marksheets-pdf-govt-jobs": "2026-09-21",
  "convert-mobile-photos-to-clear-pdf": "2026-07-08",
  "never-upload-bank-statements-free-pdf-sites": "2026-07-08",
  "compress-pan-card-pdf-kyc-verification": "2026-09-05",
  "combine-assignment-photos-into-one-pdf-mobile": "2026-07-08",
  "add-page-numbers-to-college-project-pdf": "2026-08-18",
  "rotate-scanned-assignment-pages-permanently": "2026-07-08",
  "merge-multiple-vendor-invoices-pdf-accounting": "2026-07-08",
  "generate-free-qr-codes-for-website": "2026-07-08",
  "compress-jpg-under-20kb-online-forms": "2026-08-11",
  "resize-passport-photo-signature-200x230": "2026-07-08",
  "compress-webp-images-speed-up-wordpress": "2026-07-08",
  "jpg-vs-png-format-guide": "2026-08-11",
  "remove-unwanted-edges-crop-scanned-documents": "2026-08-18",
  "find-exact-color-code-hex-rgb": "2026-06-20",
  "mask-aadhaar-card-safely-for-rent-agreements": "2026-08-11",
  "extract-single-page-from-large-pdf": "2026-08-11",
  "rearrange-scanned-pdf-page-order": "2026-09-05",
  "convert-webp-to-png-for-photoshop": "2026-08-11",
  "split-large-pdf-bypass-email-attachment-limits": "2026-07-08",
  "add-page-numbers-legal-documents-court-filings": "2026-07-08",
  "create-product-catalog-pdf-whatsapp-sharing": "2026-07-04",
  "fix-mirrored-selfies-upside-down-photos-online": "2026-07-08",
  "convert-expense-receipts-to-pdf-reimbursement": "2026-09-05",
  "share-wifi-without-passwords-free-qr-code": "2026-07-08",
  "best-secure-alternatives-ilovepdf-smallpdf": "2026-09-21",
  "static-vs-dynamic-qr-codes-difference": "2026-07-08",
  "local-pdf-processing-vs-cloud-tools-safer": "2026-09-21",
  "organize-merge-documents-online-visa-applications": "2026-08-11",
  "best-way-to-share-large-pdfs-on-whatsapp": "2026-07-08",
  "common-pdf-mistakes-online-job-applications": "2026-07-08",
  "why-mobile-scanner-apps-add-watermarks-avoid": "2026-07-08",
  "prepare-property-documents-one-pdf-home-loan": "2026-07-08",
  "why-government-websites-reject-perfectly-fine-pdfs": "2026-07-08",
  "real-difference-pdf-optimization-vs-compression": "2026-07-04",
  "how-to-create-paperless-workflow-small-businesses": "2026-07-08",
  "break-down-annual-reports-department-wise-pdfs": "2026-07-11",
  "how-to-add-watermark-to-pdf-online-free": "2026-07-18",
  "ocr-pdf-scanned-document-to-text-hindi-english": "2026-07-28",
  "convert-pdf-to-jpg-online-free": "2026-07-25",
  "qr-code-for-google-reviews": "2026-08-01",
  "front-and-back-of-id-in-one-image": "2026-08-05",
  "delete-pdf-pages-online-remove-blank-and-extra-pages": "2026-08-08",
  "unlock-bank-statement-pdf-remove-password": "2026-08-15",
  "add-cover-page-to-pdf-report-project": "2026-08-22",
  "convert-png-to-jpg-online-fix-black-background": "2026-08-29",
  "linkedin-youtube-whatsapp-dp-image-sizes-2026": "2026-09-02",
  "add-page-x-of-y-numbers-to-pdf-skip-cover-page": "2026-09-05",
  "vcard-qr-code-generator-digital-business-card": "2026-09-12",
  "extract-text-from-pdf-copy-paste-free": "2026-09-16",
  "heic-to-jpg-iphone-photos-wont-open": "2026-09-19",
  "sign-pdf-online-without-printing": "2026-10-05",
  "qr-code-for-restaurant-menu-no-monthly-fees": "2026-10-03",
  "organize-pdf-pages-reorder-rotate-delete-one-screen": "2026-10-10",
  "split-question-paper-pdf-subject-wise": "2026-10-14",
  "remove-instruction-pages-government-form-pdf": "2026-10-17",
};
