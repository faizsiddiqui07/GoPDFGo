import {
  FileText,
  ImageIcon,
  Scissors,
  RotateCw,
  Minimize2,
  Layers,
  QrCode,
  Maximize2,
  Crop as CropIcon,
  RefreshCw,
  FlipHorizontal,
  Palette,
  ShieldAlert,
  GripVertical,
  FileOutput,
  FileImage,
  Stamp,
  FileMinus,
  Unlock,
  Type,
  ImageDown,
  LayoutGrid,
  PenTool,
  ScanText
} from "lucide-react";

export const TOOLS_CONFIG = [
  // ==========================================
  // PDF TOOLS
  // ==========================================
  {
    id: "compress-pdf",
    type: "pdf",
    title: "Compress PDF",
    desc: "Reduce PDF file size efficiently without losing quality.",
    leadIn: "Shrink a heavy PDF to an exact size — 100 KB, 200 KB, or whatever an upload form demands — without turning your text to mush. Pick Best compression for everyday files, or Target size when a portal enforces a hard limit. Everything runs on your device, so bank statements and Aadhaar scans never leave your browser.",
    icon: Minimize2,
    color: "orange",
    config: { mode: "compress", accept: ".pdf" },
    info: {
      // NEW ADDITION: Unique SEO Headings for this specific tool
      sectionHeadings: {
        features: "Why Choose Our Hybrid Compressor?",
        useCases: "Best Situations to Shrink PDFs",
        steps: "How to Compress PDF Online",
        faq: "PDF Compression FAQs"
      },
      // Design Note: Ye text aapke Hero section ke niche ya page ke bottom me SEO footer ki tarah aa sakta hai.
      intro: `Struggling with large PDF files that refuse to upload? You need to **Compress PDF** files fast, and you are not alone. Whether you are a student trying to submit an assignment, a job seeker applying on a government portal, or a professional sending a report via email, file size limits are a constant hurdle. Most platforms restrict uploads to 100KB, 2MB, or 25MB, leaving you stuck with heavy documents.

GoPDFGo’s **Compress PDF** tool is engineered to solve this problem instantly and securely. Unlike traditional tools that force you to upload your personal files to a remote server, our tool does the whole job inside the page you are already on. This means the compression engine is downloaded to your browser and runs directly on your device (laptop or mobile). Your sensitive bank statements, Aadhaar cards, and contracts never leave your system, guaranteeing 100% privacy.

**How does GoPDFGo achieve high compression without quality loss?**
Our advanced algorithm uses a multi-layered approach to shrink files by up to 90%:
1.  **DPI Optimization:** We intelligently identify high-resolution images within the document and adjust their Dots Per Inch (DPI) to a web-optimized standard (144 DPI or 72 DPI). This reduces bulk without making images look blurry on screens.
2.  **Metadata Stripping:** PDFs often carry invisible weight like thumbnail caches, edit history, and XML metadata. We strip this unnecessary data to shave off kilobytes.
3.  **Font Subsetting:** Instead of embedding an entire font family, we only keep the characters used in your document, significantly reducing file size while keeping text razor-sharp.

Experience the fastest, safest, and most efficient way to optimize your documents with GoPDFGo.`,

      // 2. WHY USE THIS TOOL? (Matches Screenshot 2 - 3 Cards)
      walkthrough: {
        heading: "A real example: shrinking a scanned statement",
        body: `GoPDFGo compresses a PDF in two different ways and picks the right one for your file. For a normal text PDF it does a **lossless re-save** — stripping metadata, unused fonts, and duplicated data — so the text stays fully selectable and the size drops with no visible change. For a scanned or image-heavy PDF, where most of the weight is pictures, it optimises those page images instead, and that is where the big reductions come from.

Here is what that looks like in practice. Take a 4 MB scanned statement. In **Best compression** mode you will usually get it down to a few hundred kilobytes with the pages still crisp on screen — a typical scan loses somewhere around 60-80% of its size. If a form insists on a hard limit, switch to **Target size** mode, tap a preset like 200 KB or type your own number, and the tool works down toward that figure. To hit a very small target it flattens each page into an image, so the text stops being selectable and goes slightly softer — a fair trade when a portal simply refuses anything above the cap.

One guarantee runs through both modes: GoPDFGo never hands you a file bigger than the one you started with. If your PDF is already optimised, or is pure text with no images, there is little to remove — and the tool tells you so instead of inflating it.

Working with several files? [Merge them into one PDF](/merge-pdf) first, or [extract just the pages you need](/extract-pdf-pages) before compressing — a smaller starting document almost always compresses better. If your file is a scanned image set, [converting your photos to a PDF](/image-to-pdf) cleanly before compression also helps.`,
        troubleshooting: [
          {
            problem: "The file barely got smaller",
            fix: "That usually means it is already a lean, text-only PDF with no heavy images to optimise. Compression saves the most on scans and photo-heavy files, often 40-80%; a plain text report may only lose a little.",
          },
          {
            problem: "My text is no longer selectable after compressing",
            fix: "You were in Target size mode and asked for a very small limit, so the tool flattened the pages into images to reach it. If you need the text to stay selectable, use Best compression mode instead, or set a more generous target.",
          },
          {
            problem: "It says it could not reach my target size",
            fix: "Some documents cannot shrink to a tiny number without becoming unreadable, so the tool stops at the smallest clear version it can produce rather than wrecking the file. Try a slightly larger target.",
          },
        ],
      },
      features: [
        {
          title: "Smart Hybrid Compression",
          desc: "We don't just lower quality blindly. Our engine first tries a lossless re-save that keeps your text fully selectable and searchable. Only when a document is image-heavy (like scans) do we optimize the page images for maximum size reduction — and we never hand you a file bigger than the one you uploaded."
        },
        {
          title: "100% Privacy-First Architecture",
          desc: "Your security is our #1 priority. GoPDFGo runs entirely in your browser, right on your own device. Unlike other sites, we have no 'upload' server. You can literally turn off your internet after the page loads, and the tool will still compress your files perfectly."
        },
        {
          title: "Preserve Visual Quality",
          desc: "Worrying about blurry documents? Don't be. Our tool removes 'invisible' data (metadata, unused fonts) first. When image compression is needed, it uses bicubic resampling to maintain visual fidelity, so your compressed PDF looks professional for printing and viewing."
        }
      ],

      // 3. WHEN TO USE THIS TOOL? (Matches Screenshot 3 - 4 Checkpoints)
      useCases: [
        "**Exam & Government Portal Uploads:** Applying on SSC, UPSC, IBPS, NEET or a state government portal? These sites strictly cap uploads at sizes like 100KB, 200KB or 500KB. Switch to Target Size mode to Compress PDF files down to the exact quota while keeping them readable.",
        "**Email Attachments:** Gmail and Outlook block attachments larger than 25MB. Compress your heavy project reports, portfolios, or thesis papers to send them in a single email without needing Google Drive links.",
        "**Site Performance & SEO:** Heavy PDF assets kill your page load speed and hurt your Core Web Vitals scores. Optimize your files to ensure lightning-fast downloads, reduce bounce rates, and secure higher rankings on Google search results.",
        "**Saving Digital Storage:** Running out of space on Google Drive, iCloud, or your phone? Compressing your archived bills, receipts, and e-books can reclaim gigabytes of storage space for free."
      ],

      // 4. HOW TO USE THIS TOOL (Matches Screenshot 3 - 4 Steps)
      steps: [
        "**Drag, Drop, & Go:** Load your PDFs via the upload button or a quick drag-and-drop action. We fully support batch processing, allowing you to work on multiple heavy files simultaneously.",
        "**Auto-Analysis:** Our browser-based engine immediately scans your PDF structure to find redundant data and high-res images that can be optimized.",
        "**Review Savings:** Within seconds, you will see the 'Before' and 'After' file sizes (e.g., 5MB → 200KB). You can clearly see how much space you have saved.",
        "**Instant Download:** Click 'Download' to save your new, lighter PDF. Since processing is local, there is no waiting for server downloads—it's instant."
      ],

      // 5. FAQ (Matches Screenshot 4 - Detailed Answers for SEO)
      faq: [
        {
          q: "Will the quality of my PDF decrease visibly?",
          a: "For most documents, the difference is invisible to the human eye. We first attempt a lossless optimization that preserves selectable text. For image-heavy or scanned PDFs, pages may be optimized as images to maximize savings, which keeps them razor-sharp on screen. Either way, we always keep the smaller result and never increase your file size."
        },
        {
          q: "Is it safe to upload private documents like Bank Statements?",
          a: "There is **nothing to upload** — that is the whole point. The moment you pick a file it is read into your browser and compressed by your own device's processor; it is never sent to us, and it clears the moment you close the tab. That makes a password-protected bank statement or an Aadhaar scan safer here than on any tool that copies it to a server first."
        },
        {
          q: "Can I compress PDF on Mac, iPhone, or Android?",
          a: "Absolutely. GoPDFGo is a Progressive Web App (PWA). It works seamlessly on Chrome, Safari, Edge, and Firefox across all devices—Windows, macOS, iOS, and Android—without installing any battery-draining apps."
        },
        {
          q: "Is there a file size limit?",
          a: "Since we don't pay for server storage (because we use your device's power), we don't impose artificial limits. You can compress a 100MB or 500MB file as long as your device has enough RAM to handle it."
        },
        {
          q: "Does this tool work offline?",
          a: "Yes! Once the webpage is loaded, our compression engine is cached in your browser. You can disconnect your Wi-Fi or mobile data and continue compressing files. This is a great way to verify our privacy guarantee yourself!"
        },
        {
          q: "Why did my file size not decrease much?",
          a: "If your PDF is already optimized or contains only text (no images), there isn't much to compress. However, scanned documents and files with photos usually see a reduction of 40% to 80%."
        },
        {
          q: "How do I compress a PDF under 100KB or 200KB for an exam or government form?",
          a: "Switch to the 'Target Size (KB)' mode and either tap a preset like 200 KB or type a custom target such as 100 KB in the box. The tool then shrinks your PDF toward that limit, which is ideal for SSC, UPSC, IBPS and other portal upload caps. To hit a very small exact size it flattens pages into images, so text may become non-selectable and slightly softer; this works best for scanned forms and photos. If it cannot reach the exact number, it gets as close as possible without ever handing back a file bigger than your original."
        }
      ]
    }
  },
  {
    id: "merge-pdf",
    type: "pdf",
    title: "Merge PDF",
    desc: "Combine multiple PDFs into one unified document.",
    leadIn: "Combine several PDFs — chapters, marksheets, invoices, scanned pages — into one clean file, in the order you choose. Drag the files to reorder, mix A4 with Letter or portrait with landscape, and download a single document. The files are stitched together inside your browser, not on a server.",
    icon: Layers,
    color: "orange",
    config: { mode: "merge", accept: ".pdf", allowBatch: true },
    info: {
      sectionHeadings: {
        features: "Benefits of Merging Documents",
        useCases: "When Should You Combine PDFs?",
        steps: "How to Merge PDF Files Online",
        faq: "Common Questions About Merging"
      },
      // 1. INTRO SECTION (High SEO Value)
      intro: `Need to Merge PDF files or combine PDF documents into one? Managing multiple PDF files can be a nightmare. Whether you are a student submitting a thesis with separate chapters, an accountant organizing monthly invoices, or a professional combining reports, keeping track of scattered files is inefficient. You need a way to **stitch them together** into a single, organized document.

GoPDFGo’s **Merge PDF** tool is the ultimate solution to combine unlimited PDF files online. Unlike other platforms that restrict you to 10 or 20 files per day, our tool offers **unlimited merging** capabilities completely for free. We use advanced browser-based technology, which means the merging process happens entirely on your device (laptop or mobile). We do not upload your documents to any cloud server, ensuring that your sensitive contracts, bank statements, and personal IDs remain 100% private.

**Why is our Client-Side Merger better?**
Traditional PDF websites work by uploading your files, processing them on a remote server, and sending them back. This is slow and risky.
**GoPDFGo changes the game:**
1.  **Zero Upload Time:** Since files aren't sent to a server, the process starts instantly.
2.  **Unlimited Pages:** Merge a 500-page book with a 2-page cover instantly. The only limit is your device's memory.
3.  **Visual Reordering:** Our interactive editor allows you to drag and drop files to rearrange them in the exact order you want before binding them together.

Stop wasting time with slow uploads and daily limits. Combine your PDFs securely and instantly with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: building one application PDF from three files",
        body: `Say you are assembling a job or visa application: a cover letter exported from your word processor, a scanned ID, and a two-page marksheet. Drop all three in, then drag them into the order the form expects — cover letter first, ID second, marksheet last. The file sitting at the top becomes page one of the output. GoPDFGo stitches them in that exact sequence, entirely inside your browser, and hands back a single PDF.

Mixed formats are fine. Your cover letter might be Letter size and portrait while the marksheet scan is A4 — the tool keeps each page at its own size and orientation instead of stretching everything to match, so nothing gets distorted.

One thing worth knowing: if one of your files is password-protected or unreadable, Merge PDF does not fail the whole job. It skips that file, finishes the rest, and tells you by name which ones it left out. If a locked file has to be in there, [remove its password first](/unlock-pdf) and merge again. Once everything is combined, you can [reorder or remove individual pages](/organize-pdf) if something landed out of sequence, or [shrink the finished PDF](/compress-pdf) when the merged result is too heavy for an upload form.`,
        troubleshooting: [
          {
            problem: "A file is missing from the merged PDF",
            fix: "It was password-protected or corrupted, so the tool skipped it rather than fail everything — check the list of skipped names it shows. Unlock or re-export that file, then merge again.",
          },
          {
            problem: "The pages came out in the wrong order",
            fix: "The sequence follows the file list top to bottom, not the file names. Drag the files into the order you want before merging; whatever sits at the top becomes page one.",
          },
          {
            problem: "The combined file is very large",
            fix: "Merging keeps every page at full quality, so several scans stack up fast. Run the result through Compress PDF afterward, or leave out any files you do not actually need in the final document.",
          },
        ],
      },
      features: [
        {
          title: "Visual Drag & Drop Editor",
          desc: "Control the flow of your document. Upload multiple files and simply **drag and drop** them to set the correct sequence. You can reorder pages effortlessly to ensure your final document follows the exact structure you need (e.g., Cover Page first, then Index, then Chapters)."
        },
        {
          title: "Secure & Private Merging",
          desc: "Privacy is not an option; it's a guarantee. When you merge bank statements or legal contracts here, **no data leaves your computer**. The magic happens inside your browser. This makes GoPDFGo safer than even some paid desktop software."
        },
        {
          title: "Universal Handling",
          desc: "Got a mix of landscape charts and portrait reports? No problem. Our smart engine handles **mixed orientations** and different page sizes (A4, Letter, Legal) seamlessly, stitching them into one cohesive file without breaking the layout."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Formal Documentation:** Need to submit a consolidated file for immigration, court, or job applications? You often need to upload a single PDF containing your ID proof, address proof, and academic mark sheets. Use this tool to **combine all scanned documents** into one file instantly.",
        "**Freelance Administration:** Stop sending folders full of loose files. Merge all your monthly bills, invoices, and payment proofs into one master PDF to streamline your record-keeping and get paid faster.",
        "**Education & Research:** Students can combine their assignment cover page, main body, and bibliography (often created in different apps) into one final submission file. Perfect for **Thesis and Dissertation** organization.",
        "**Seamless E-Reading:** Tired of opening 20 different files just to read one book? Merge them all into a single **E-Book** so you can read continuously without opening new files every few minutes."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select Files:** Click 'Upload' or drag and drop all the PDF files you want to combine. You can select **multiple files** at once.",
        "**Arrange Order:** This is the most important step. Adjust the sequence by **dragging items** to your preferred position. The file at the top will become the start of your new document.",
        "**Click Merge:** Once you are happy with the order, hit the **'Merge PDF'** button. Our engine will stitch the documents together in milliseconds.",
        "**Download:** Your single, unified file is ready. Click 'Download' to save it to your device. No watermarks, no waiting."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Can I merge PDF files with different page sizes?",
          a: "Yes! You can combine a **Landscape A3 chart** with a **Portrait A4 letter** without any issues. Our tool stitches them together while preserving the original dimensions and formatting of individual pages."
        },
        {
          q: "What is the maximum file count allowed for a single batch?",
          a: "Most websites limit you to 20 files. **GoPDFGo has no artificial limits.** As long as your computer or phone has enough RAM to handle the process, you can merge 50, 100, or even more files in a single go."
        },
        {
          q: "Does merging reduce the quality of my pages?",
          a: "No. The merging process is **lossless**. We simply take the pages from your original files and copy them into a new container. Your text remains sharp, and images retain their original resolution."
        },
        {
          q: "Can I rearrange files after uploading?",
          a: "Absolutely. Before you click the final button, you get a **preview screen** where you can reorder files, remove accidental uploads, or add more documents to the queue."
        },
        {
          q: "Is it safe to merge confidential legal documents?",
          a: "Yes. The files are opened and stitched together **right on your device**, so a set of contracts or salary slips is never copied to a cloud server. It is as private as merging them in desktop software like Acrobat — just free, with nothing to install."
        },
        {
          q: "Does this tool work on mobile?",
          a: "Yes, our interface is fully **mobile-optimized**. You can select files from your Android or iPhone storage, rearrange them with a touch, and download the merged PDF directly to your phone."
        },
        {
          q: "Can I reorder files before I combine PDF documents together?",
          a: "Yes. After you add your files, drag and drop them into the exact sequence you want before merging, the file at the top becomes the first page. When the order looks right, hit Merge PDF to stitch them into one clean document."
        }
      ]
    }
  },
  {
    id: "extract-pdf-pages",
    type: "pdf",
    title: "Extract PDF Pages",
    desc: "Extract specific pages or a range of pages from any large PDF document securely.",
    leadIn: "Pull the exact pages you need out of a big PDF — one page from a 500-page merit list, a signature page from a contract, the latest report from a heavy medical file. Select a continuous range or hand-pick scattered pages, then download them as a fresh document. The extraction runs in your browser, so the original stays on your device.",
    icon: FileOutput,
    color: "blue",
    config: { mode: "extract", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Advantages of Lossless Extraction",
        useCases: "Ideal Scenarios for Extracting Pages",
        steps: "How to Extract PDF Pages Online",
        faq: "Extraction FAQs"
      },
      // 1. INTRO SECTION (SEO Optimized Long Form)
      intro: `Need to Extract PDF Pages from a massive 500-page document when you only need a single page? We have all been there. Whether you are a student trying to isolate your name from a giant university merit list, a lawyer extracting a specific signature page from a corporate contract, or a patient trying to send only the latest lab results from a heavy medical file, scrolling through hundreds of pages is frustrating.

With GoPDFGo you open the PDF, tick the pages you actually want, and download them as a fresh document — no account, no watermark, no queue. Because the extraction runs inside your own browser, you can open an entire confidential contract just to pull a single signature page, and not one byte is sent to us. Pick a continuous range or hand-select scattered pages; the originals stay untouched on your device.

**Why is extracting better than other methods?**
Taking a screenshot of a page destroys its quality and makes the text unsearchable. Using the browser's "Print to PDF" function often ruins the formatting, strips clickable links, and bloats the file size. Our tool structurally splits the PDF at the code level, ensuring that the extracted pages retain their exact original quality, vector graphics, and crystal-clear text without any loss.`,

      // 2. WHY USE THIS TOOL?
      walkthrough: {
        heading: "A real example: pulling your page out of a 500-page merit list",
        body: `Say a university posts results as one 500-page PDF and your roll number sits on page 213. Open the file in GoPDFGo, scroll the thumbnail view, tick page 213, and download it as a fresh one-page PDF. Or skip the scrolling and type 213 straight into the page box — same result. The extraction is a **lossless copy**: your name, the seal, and the vector text come across exactly as they were, still selectable and print-sharp, unlike a screenshot.

The tool handles two shapes of selection. A **continuous range** like 10-25 pulls a whole block — handy for lifting one chapter out of a heavy textbook. Scattered hand-picks such as 1, 5, 8-12 gather pages from all over the document into a single new PDF, not a zip of loose files. The original stays untouched on your device the whole time, so you can open a confidential contract just to pull its signature page without copying the rest.

Extraction pairs well with the next step. If you would rather cut a few unwanted pages and keep everything else, [delete the pages you do not need](/delete-pdf-pages) instead. Pulling scattered sections out of several documents? [Merge them into one PDF](/merge-pdf) first, then extract across the combined file. And if the finished PDF is still too heavy to email, [compress the extracted file](/compress-pdf) before you send it.`,
        troubleshooting: [
          {
            problem: "The page I extracted was not the one I expected",
            fix: "The tool counts every physical page from 1, including cover sheets, blank pages, and roman-numeral front matter, so the printed page number often runs ahead of the real one. Use the visual thumbnail view and tick the actual page rather than trusting the number printed on it.",
          },
          {
            problem: "My single extracted page is still a big file",
            fix: "That is expected. Extraction is a lossless copy, so a page carrying a full-size scan or high-resolution photo keeps its full weight instead of shrinking. Run the result through the Compress PDF tool afterwards if you need it lighter for an upload or email.",
          },
          {
            problem: "I wanted each page saved as its own separate file",
            fix: "Extraction always stitches your chosen pages into ONE new PDF, never a folder of loose files. If you need one file per page, use the Split PDF tool instead, which is built to break a document into several separate outputs.",
          },
        ],
      },
      features: [
        {
          title: "100% Lossless Extraction",
          desc: "We do not compress or alter the contents of your pages during extraction. The tool extracts the exact structural data, meaning your text remains sharp, selectable, and fully searchable."
        },
        {
          title: "Ultimate Privacy Guarantee",
          desc: "Your files never touch our servers. Because the processing happens locally in your browser, you can extract pages from confidential legal or financial documents without risking data leaks."
        },
        {
          title: "Custom Range Selection",
          desc: "You have complete control. Extract a single page (e.g., '5'), a continuous block (e.g., '10-20'), or combine multiple specific pages (e.g., '1, 5, 8-12') into one clean, new PDF file instantly."
        }
      ],

      // 3. WHEN TO USE THIS TOOL?
      useCases: [
        "**Legal & Corporate Contracts:** Need to send an NDA or a specific Annexure without sharing the entire 100-page master agreement? Isolate the exact pages securely to protect corporate secrets.",
        "**University & Exam Results:** Find your exact roll number in a massive 50MB government merit list. Extract just that one page to use as proof of admission or employment.",
        "**Bypassing Email Limits:** If a document is too large to attach to an email, extract only the highly relevant chapters or sections to create a lightweight, focused file that sends easily.",
        "**Organizing Medical Records:** Stop sending years of medical history to a new specialist. Extract only your most recent blood work and scans for a clean, efficient consultation."
      ],

      // 4. HOW TO USE THIS TOOL
      steps: [
        "**Upload Securely:** Drag and drop your heavy PDF file into the upload zone. Because it processes locally, even massive 50MB files will load instantly.",
        "**Select Your Pages:** Use the visual thumbnails to click the pages you want, or type specific page numbers and ranges (e.g., 2, 4, 7-10) directly into the input box.",
        "**Extract Instantly:** Click the 'Extract Pages' button. Our local engine will seamlessly stitch your chosen pages into a brand new document in milliseconds.",
        "**Download & Share:** Save your new, lightweight, highly-targeted PDF directly to your hard drive, ready to be emailed or printed."
      ],

      // 5. FAQ
      faq: [
        {
          q: "Will extracting pages reduce the visual quality of the PDF?",
          a: "Absolutely not. GoPDFGo’s extraction process is 100% lossless. We simply extract the existing data and place it in a new file. Vector graphics and text remain perfectly sharp."
        },
        {
          q: "Is it safe to extract pages from confidential bank statements?",
          a: "Yes, it is safer than using offline software. GoPDFGo operates entirely in your browser. No upload happens, meaning we physically cannot see, copy, or store your private financial data."
        },
        {
          q: "Can I extract PDF pages from several ranges into one file?",
          a: "Yes! Type complex ranges like '1, 5, 10-15' and the tool instantly combines every selected page into ONE new PDF, not a ZIP of separate files. You get a single, clean document ready to email or print."
        },
        {
          q: "Is there a file size limit for the PDF I want to extract from?",
          a: "Because we use your device's processing power and not our servers, there are no artificial file size limits. You can process massive documents as long as your device has enough RAM."
        },
        {
          q: "Does this tool work offline?",
          a: "Yes! Once the webpage is loaded, the extraction engine is cached in your browser. You can disconnect from the internet and continue extracting pages securely."
        }
      ]
    }
  },
  {
    id: "split-pdf",
    type: "pdf",
    title: "Split PDF",
    desc: "Extract pages from a PDF or split into multiple files.",
    leadIn: "Break one large PDF into smaller files — split by a page range, or pull out just the pages you need. Handy when an email limit rejects a heavy report, or when you want to share a few pages instead of the whole document. The original never leaves your device.",
    icon: Scissors,
    color: "orange",
    config: { mode: "split", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Why Use a Precision Splitter?",
        useCases: "Real-World Uses for Splitting PDFs",
        steps: "How to Split PDF Online",
        faq: "PDF Splitting Questions Answered"
      },
      // 1. INTRO SECTION (Deep SEO Content)
      intro: `Need to Split PDF files so you can pull out just the pages that matter? Ever downloaded a massive 100-page PDF just to use **one single page**? It is a common frustration. You might have a large bank statement but only need the last month's transaction history, or a heavy textbook where you only need chapter 5. Sharing the entire file is unprofessional, slow, and confusing for the receiver. You need a tool to **extract exactly what you need**.

GoPDFGo’s **Split PDF** tool gives you surgical precision over your documents. It allows you to separate PDF pages, extract specific ranges, or remove unwanted sections instantly. Unlike traditional splitters that require you to upload your sensitive file to a server, wait for processing, and then download the result, our tool works **locally on your device**.

**The Power of Client-Side Splitting:**
We use a fast, browser-based engine to bring desktop-class performance right to your device.
1.  **Instant Extraction:** Since we don't upload your file, the splitting happens the moment you click the button. No buffering, no waiting.
2.  **100% Privacy:** Your legal contracts, medical reports, or financial data never leave your computer. The splitting engine runs inside your browser (Chrome, Edge, Safari, etc.), ensuring your data remains invisible to the internet.
3.  **Flexible Control:** Whether you want to extract a single page (e.g., "5"), a range (e.g., "1-10"), or a mix of both, GoPDFGo handles it with ease.

Take control of your documents. Stop sharing bulky files and start sharing only what matters.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: emailing a report that is over the limit",
        body: `Split PDF works two ways, and the output depends on what you type. Give it a single page range like 1-20 and you get back one smaller PDF. Give it several ranges like 1-20, 21-40, 41-60 and each range becomes its own PDF, bundled together in a single ZIP. Either way the pages are copied across untouched — nothing is re-rendered — so text stays fully selectable and the layout is identical to the original.

Say you have a 40 MB annual report that Gmail rejects because attachments cap at 25 MB. Open the file, type two ranges — 1-30 and 31-60 — and split. You get a ZIP holding two roughly 20 MB PDFs, each small enough to attach. If one half still lands over the limit, run that part through [Compress PDF](/compress-pdf) to shrink the heavy scanned pages. Prefer one file per page instead of ranges? Choose **Extract All** and every page is saved as its own PDF inside the ZIP.

When the recipient needs the whole document back later, [merge the parts into one PDF](/merge-pdf) in original order. And if the report is locked and the tool cannot read it, [remove the password first](/unlock-pdf) so the splitter can see the pages — since everything runs on your device, that password never leaves it.`,
        troubleshooting: [
          {
            problem: "I expected one PDF but got a ZIP file",
            fix: "That happens whenever you enter more than one range. A single range like 1-20 downloads as one plain PDF; multiple ranges, or Extract All, are packaged together in a ZIP so nothing gets lost.",
          },
          {
            problem: "The split grabbed the wrong pages",
            fix: "Ranges follow the PDF's real page order, which can differ from the numbers printed on the page. A cover or blank page shifts everything, so count from the first page of the file, not from the printed page number.",
          },
          {
            problem: "The parts are still too big to email",
            fix: "Splitting divides page count, not file weight. If your pages are heavy scans, each part can stay large. Split into smaller ranges, or compress the oversized part before you send it.",
          },
        ],
      },
      features: [
        {
          title: "Precision Extraction",
          desc: "You are in the driver's seat. Our tool allows you to define **exact page ranges** (like '1-5' or '10, 12, 15'). Whether you want to save a single page as a new file or extract a specific chapter from a book, you get exactly what you ask for without any quality loss."
        },
        {
          title: "Zero-Upload Security",
          desc: "Splitting often involves sensitive documents like tax returns or legal agreements. With GoPDFGo, **security is built-in**. Your file is processed in your device's RAM, not on a cloud server. This means you can split highly confidential documents without worrying about data breaches."
        },
        {
          title: "Preserve Formatting",
          desc: "Worried about messing up the layout? Don't be. When we extract a page, we copy it **bit-for-bit**. All your fonts, images, hyperlinks, and formatting remain exactly the same in the new file. It's like taking a digital pair of scissors to your document without damaging the content."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Financial Audits & Bookkeeping:** Finance professionals often face the nightmare of a single 500-page PDF containing a whole year's expenses. Effortlessly deconstruct these bulk files to isolate specific monthly statements or segregate invoices for precise tax filing.",
        "**Legal Professionals:** In a 50-page contract, you might only need to share the **'Signature Page'** or specific clauses with a client. Split the document to remove internal notes and share only the relevant pages.",
        "**Education & Students:** Textbooks are heavy and difficult to navigate. Extract just the **relevant chapters** or homework pages you need for the week to create a lightweight study guide on your tablet or laptop.",
        "**HR & Property Management:** Handling a massive PDF containing bulk employee IDs or a portfolio of floor plans? **Segregate** these composite files into distinct documents to ensure every staff member or property unit has its own dedicated digital record."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Upload PDF:** Click 'Select File' or drag your document into the box. The tool loads the file instantly.",
        "**Define Range:** Enter the page numbers you want to keep. You can type a single page (e.g., **'5'**) or a range (e.g., **'1-10'**) to extract a section.",
        "**Process Split:** Click the **'Split PDF'** button. Our browser-based engine cuts the document locally in milliseconds.",
        "**Download:** One range gives you a single, smaller PDF. Enter multiple ranges (like '1-10, 11-20') and each range becomes its own PDF, delivered together in a ZIP."
      ],

      // 5. FAQ (Detailed Answers)
      faq: [
        {
          q: "Does splitting delete the original file?",
          a: "No, absolutely not. Your original file on your computer remains **untouched and safe**. GoPDFGo creates a *new* copy containing only the pages you selected. You will end up with two files: your original (full) PDF and your new (extracted) PDF."
        },
        {
          q: "How does the output work when I Split PDF into multiple ranges?",
          a: "You define page ranges and each range becomes its own separate PDF. Enter a single range like '1-10' and you get one clean PDF. Enter several ranges like '1-10, 11-20, 21-30' and each one is saved as its own PDF, delivered together in a single ZIP file. It is range-grouped output, never a pile of one-page-per-file scraps, unless you choose Extract All, which saves every page as its own PDF."
        },
        {
          q: "Is it safe to split password-protected PDFs?",
          a: "If you have the password to open the file, yes. Since the processing happens **locally on your device**, entering a password to unlock and split the file is safe because the password is never sent to our servers."
        },
        {
          q: "Will the quality of extracted pages be lower?",
          a: "No. The quality remains **100% identical** to the original. We do not re-compress the pages; we simply extract them. If your original PDF was high-quality, the split pages will be high-quality too."
        },
        {
          q: "Is there a maximum page count limit for splitting documents?",
          a: "No. Whether your PDF has 10 pages or 1,000 pages, GoPDFGo can handle it. Since we use your browser's power, we don't impose artificial page limits like other 'free' tools do."
        },
        {
          q: "How fast is the process?",
          a: "It is nearly instant. Because there is **no upload time** and **no download time** for the processing (data travel), extracting pages takes only a fraction of a second."
        }
      ]
    }
  },
  {
    id: "rotate-pdf",
    type: "pdf",
    title: "Rotate PDF",
    desc: "Rotate PDF pages permanently.",
    leadIn: "Fix a PDF that opens sideways or upside down — and have the rotation actually stay saved. Most viewers only turn the page on screen and forget it the moment you reopen the file; this rewrites the pages so the fix is permanent. Rotate the whole document or just the pages that are wrong, all on your own device.",
    icon: RotateCw,
    color: "orange",
    config: { mode: "rotate", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Why Permanently Rotate Pages?",
        useCases: "When is Rotation Necessary?",
        steps: "How to Rotate a PDF Online",
        faq: "Orientation Fix FAQs"
      },
      // 1. INTRO SECTION (Focus on "Permanent Save" vs "View Only")
      intro: `Need to **rotate a PDF** and have the fix stay saved? There is nothing more annoying than opening a PDF document and realizing it is upside down or sideways. You crane your neck, turn your head, or rotate your laptop screen just to read it. While most PDF viewers allow you to "view" the file correctly, they often **fail to save** that rotation. The moment you close and reopen the file, it reverts to the wrong orientation.

GoPDFGo’s **Rotate PDF** tool is designed to fix this problem once and for all. It allows you to change the orientation of your PDF pages permanently. Whether you have scanned a document upside down, merged landscape and portrait pages incorrectly, or converted mobile photos that are rotated 90 degrees, our tool corrects the layout instantly.

**The GoPDFGo Privacy Advantage:**
Unlike other online tools that ask you to upload your private files to a server just to rotate them, the work happens where the file already is. Your PDF never leaves your browser. The rotation logic runs locally on your device, right inside your browser.
1.  **Permanent Fix:** We rewrite the file's internal structure so that when you send it to someone else, it opens correctly on their device too.
2.  **No Uploads:** Rotate legal contracts, medical scans, or personal IDs without fear. Your data stays invisible to the internet.
3.  **Instant Result:** Since there is no heavy processing or uploading involved, the rotation happens in the blink of an eye.

Stop struggling with sideways documents. Make your PDFs professional and readable with a single click.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: fixing a scan that opens sideways",
        body: `Say you scanned a three-page agreement and the middle page came out sideways because it fed through the scanner the wrong way. GoPDFGo fixes it by rewriting that page's actual **rotation flag**, not just turning it on screen. You rotate the one bad page **90 degrees** until the preview sits upright, leave the other two alone, and process. The saved file then opens correctly everywhere — on a reviewer's laptop, on a phone, for whoever you forward it to next — because the fix is written into the file, not into your viewer.

Since it only updates the orientation tag, the operation is **lossless**: text stays selectable and searchable, and scanned images keep their original sharpness. Nothing gets re-compressed. If 90 degrees is not enough you can keep clicking to reach 180 or 270, and a document that mixes portrait and landscape pages is no problem — you turn each page on its own.

This one runs entirely on your device, so a signed contract or an ID scan never gets uploaded. Turning phone photos into a document? [convert your images into a PDF](/image-to-pdf) first, then straighten any that came out on their side here. And if you are lining up several documents, [combine them into one PDF](/merge-pdf) once every page faces the same direction, so the finished file reads cleanly start to finish.`,
        troubleshooting: [
          {
            problem: "The whole file rotated when only a couple of pages were actually wrong.",
            fix: "Rotate page by page instead of the whole document. The tool handles a mix of orientations, so turn only the offending pages and leave the rest as they are — check each one in the preview before you process.",
          },
          {
            problem: "The scanned page is tilted by a few degrees, not a clean quarter turn.",
            fix: "Rotation works in 90 degree steps (90, 180, 270), so it straightens pages that are a full quarter or half turn off, not a slight slant. A small skew usually means re-scanning the page squarely; this tool cannot nudge it by tiny angles.",
          },
          {
            problem: "You rotated the wrong way and now the page is upside down.",
            fix: "Nothing is locked in until you process. Keep clicking to cycle through 180 and 270, or use the counter-clockwise button, and watch the on-screen preview until the page sits upright before you download.",
          },
        ],
      },
      features: [
        {
          title: "Permanent Rotation Save",
          desc: "Don't just view it; fix it. Most PDF readers only rotate the 'view' temporarily. Our tool alters the **document metadata** to ensure that the new orientation (Landscape or Portrait) is saved permanently. Next time you open it, it will be perfect."
        },
        {
          title: "Mix of Orientations",
          desc: "Have a document where some pages are Portrait (vertical) and some are Landscape (horizontal)? It looks messy. Use our tool to **standardize the layout**, ensuring all pages face the right way for a professional presentation."
        },
        {
          title: "Private On-Device Rotation",
          desc: "Security is our core promise. Whether you are correcting a scanned bank statement or a confidential agreement, **no file transfer** takes place. The rotation is calculated by your own CPU, ensuring your data remains 100% private."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Scanned Documents:** Old scanners often have a mind of their own, scanning pages upside down or sideways. Use this tool to **correct scanned batches** before sharing them with clients or colleagues.",
        "**Mobile Photography:** When you convert phone photos to PDF, they often retain the wrong camera orientation. Rotate them to **Portrait mode** so they display correctly on computer screens.",
        "**Professional Reporting:** Sending a report where the charts are sideways forces the reader to rotate their head. Fix the orientation to ensure a **smooth reading experience** for your boss or professor.",
        "**Pre-Merge Preparation:** Before merging multiple files, it is crucial that they all share the same orientation. Use this tool to **align all documents** vertically before stitching them together."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select PDF:** Upload the document that has the wrong orientation. You can drag and drop it directly into the tool.",
        "**Choose Rotation:** Use the rotation buttons to turn the pages **90° Clockwise** or **Counter-Clockwise**. You can rotate until the preview looks upright.",
        "**Apply Changes:** Click the **'Process PDF'** button. Our engine permanently writes the new orientation tags into the file.",
        "**Download:** Save the fixed document. You can now open it in any viewer, and it will stay upright."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "What is the difference between 'View Rotate' and this tool?",
          a: "Great question! When you rotate a PDF in Adobe Reader or Chrome, it is temporary—it resets when you close the file. **GoPDFGo saves the rotation permanently**, so the file remains correct forever, no matter where you send it."
        },
        {
          q: "Does rotating affect the text or quality?",
          a: "No. Rotating is a **lossless operation**. We simply update the mathematical 'rotation flag' inside the PDF code. Your text remains searchable, sharp, and selectable, and images retain their original quality."
        },
        {
          q: "Can I fix a PDF with mixed landscape and portrait pages?",
          a: "Yes. This is a common issue with charts and graphs. You can rotate the document to ensure the content is readable without forcing the user to physically turn their device."
        },
        {
          q: "Is it safe to upload confidential scans?",
          a: "There is **no upload step at all**. A scanned page is loaded into the browser, turned by your processor, and written straight back to your disk — it never leaves the machine you are sitting at. So even a signed agreement or an ID scan stays entirely with you."
        },
        {
          q: "Can I rotate multiple times?",
          a: "Yes. If 90 degrees isn't enough, you can keep clicking to rotate 180 or 270 degrees until the page is exactly how you want it."
        },
        {
          q: "Does this work on scanned images inside PDFs?",
          a: "Yes. Whether your PDF contains text or scanned images, the tool rotates the entire page canvas, correcting everything on it."
        }
      ]
    }
  },
  {
    id: "page-numbers",
    type: "pdf",
    title: "Page Numbers",
    desc: "Add page numbers to PDF documents.",
    leadIn: "Add clean, professional page numbers to any PDF — a thesis, a contract, a merged report. The tool counts the pages for you and lets you choose where the number sits and how it is styled, with safe margins so nothing overlaps your content. Everything is added inside your browser, so the file is never uploaded.",
    icon: FileText,
    color: "orange",
    config: { mode: "page-numbers", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Benefits of Numbering Documents",
        useCases: "When to Stamp Page Numbers",
        steps: "How to Add Page Numbers to PDF Online",
        faq: "Numbering Tool FAQs"
      },
      // 1. INTRO SECTION (Focus on Organization & Professionalism)
      intro: `Imagine printing a 50-page contract or a university thesis, and accidentally dropping the papers on the floor. If those pages aren't numbered, putting them back in the correct order is a nightmare. Page numbers are not just a design element; they are the backbone of document organization. They make your files referable, professional, and easy to navigate.

GoPDFGo’s **Add Page Numbers to PDF** tool lets you insert professional numbering into your PDF documents online, instantly. Whether you have a scanned file, a converted Word document, or a merged report, our tool calculates the total page count and stamps sequential numbers (e.g., "1", "2", "3" or "Page 1 of 50") in the position you choose — bottom or top of the page.

**Why choose Client-Side Numbering?**
Most online tools force you to upload your document to a server just to add a tiny number. This is a huge privacy risk for legal contracts or unpublished research papers.
**GoPDFGo is different.** The stamping is done by your own machine.
1.  **100% Private:** Your document never leaves your device. The numbering engine runs inside your browser.
2.  **No Overwriting:** Our smart algorithm places numbers in the safe margin areas (headers/footers) so they don't overlap with your text.
3.  **Universal Compatibility:** Works on scanned PDFs, digital PDFs, and even files that previously had no margins.

Turn your chaotic pile of digital pages into a structured, professional document in seconds.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: numbering a merged 50-page report",
        body: `Say you have just combined a cover sheet, a Word export, and three scanned appendices into one report. GoPDFGo counts the pages for you — no need to tell it there are 50 — then stamps each one in the position you pick: **Bottom Center**, Bottom Left, Bottom Right, or Top Right. The numbers land in the footer margin, so nothing overlaps your text, signatures, or footnotes.

Because the first page is a cover, tick **Skip first page** so numbering starts on the actual content. Choose the format too: plain '1, 2, 3', or 'Page 1 of N' when you want readers to see how much is left. On the scanned appendices the number is drawn on top of the image layer, which is why it still appears even though that text is not selectable. Everything runs in your browser, so a confidential draft never leaves your device.

Building the report first? [Merge your files into one PDF](/merge-pdf) before numbering, or [reorder the pages](/organize-pdf) so the sequence is right — otherwise the numbers follow whatever order the pages are in. If the scanned appendices make the file heavy, [compress the finished PDF](/compress-pdf) afterward so it is easy to email.`,
        troubleshooting: [
          {
            problem: "The page number shows up on my cover sheet",
            fix: "Tick Skip first page and apply again. Numbering then starts on the first real content page, leaving the cover clean, and you can set the starting number so that page reads as 1.",
          },
          {
            problem: "On a tightly cropped scan the number sits close to the content",
            fix: "The number goes in the safe margin, but scans vary and some leave little whitespace. Try a different position — for example switch from Bottom Center to Top Right — to a corner that is empty on your particular scan.",
          },
          {
            problem: "The numbers do not line up with my Table of Contents",
            fix: "The tool numbers the physical PDF pages in their current order. Reorder or merge the pages first so the sequence is correct, use Skip first page for front matter, and set the starting number so body page 1 matches your contents.",
          },
        ],
      },
      features: [
        {
          title: "Smart Positioning",
          desc: "You control exactly where the numbers sit. Pick **Bottom Center** (the international standard), Bottom Left, Bottom Right, or Top Right — plus set your own **starting number** and choose the **format**, either plain '1, 2, 3' or 'Page 1 of N'. This keeps your document consistent whether it is a court submission, a corporate report, or a book."
        },
        {
          title: "Safe Margin Tech",
          desc: "Worried about the number covering your text? Our engine identifies the **safe whitespace** in the page margin. It places the number cleanly there, ensuring that your original content, signatures, and footnotes remain 100% visible and untouched."
        },
        {
          title: "Confidential, Local Numbering",
          desc: "Adding page numbers to a confidential Non-Disclosure Agreement (NDA) or a financial audit report? Do it safely. With GoPDFGo, **no file upload** takes place. The data processing happens locally on your CPU, guaranteeing that your secrets stay with you."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Legal Documentation:** Lawyers and paralegals deal with massive case files. Courts require every page to be numbered for reference (e.g., 'Refer to Page 45'). Use our tool to **Bates-stamp** or number your exhibits instantly without expensive software.",
        "**Academic Thesis & Research:** Universities have strict formatting guidelines. A dissertation without page numbers is often rejected. Ensure your **Table of Contents** matches the actual document by adding accurate page numbers before submission.",
        "**Corporate Reports:** Merging multiple Excel sheets and Word docs into one PDF often results in lost page numbers. Re-index your entire **Annual Report** or financial statement to ensure stakeholders can navigate it easily.",
        "**Document Integrity & Printing:** Essential for hard copies. Embedding page numbers allows for effortless navigation and acts as a safeguard. If a printed stack is accidentally dropped or shuffled, the document can be **restored to its original sequence** instantly."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Upload PDF:** Select the document that needs numbering. You can drag and drop it directly from your desktop or mobile file manager.",
        "**Choose Your Options:** Pick the position (Bottom Center, Bottom Left, Bottom Right or Top Right), set the starting number, choose the format ('1, 2, 3' or 'Page 1 of N'), and tick **Skip first page** if your document has a cover page.",
        "**Apply Numbering:** Click the **'Add Page Numbers'** button. Our engine calculates the total count and stamps each page sequentially.",
        "**Download:** Your organized document is ready. Download it immediately. The file size remains optimized, and the quality stays original."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Will the page numbers cover my text?",
          a: "No. The numbers are placed in the **footer margin** (the bottom whitespace) of the page. We have calibrated the position to avoid overlapping with standard document text or footnotes."
        },
        {
          q: "Can I number scanned PDF documents?",
          a: "Yes! Since scanned PDFs are essentially images, you can't edit text easily, but our tool can overlay numbers on top of the image layer. This is perfect for organizing **scanned receipts** or old archival records."
        },
        {
          q: "Does this tool work on merged files?",
          a: "Absolutely. In fact, this is the best time to use it. After merging different files, the old page numbers (if any) become confusing. Running this tool **re-indexes the entire document** from 1 to the end."
        },
        {
          q: "Is it safe for confidential papers?",
          a: "Yes. The numbers are drawn onto the pages **by your own browser**, so a legal draft or an unpublished thesis is never sent anywhere. Nothing about the document — its text, its contents, its filename — reaches us."
        },
        {
          q: "Does it restart numbering for every file?",
          a: "The tool numbers the specific file you upload from start to finish. If you have a single PDF with 100 pages, it will number them 1 through 100 sequentially."
        },
        {
          q: "Can I remove page numbers later?",
          a: "Since the numbers are 'baked' into the PDF to ensure they print correctly, they are permanent. We recommend keeping a copy of your original file if you think you might need the un-numbered version later."
        }
      ]
    }
  },
  {
    id: "image-to-pdf",
    type: "pdf",
    title: "Image to PDF",
    desc: "Convert JPG, PNG, and WebP images to PDF.",
    leadIn: "Turn photos and scans into a single, correctly sized PDF — ideal for assignments, ID copies, or receipts shot on a phone. Add multiple images, choose the page size (A4, Letter, or fit-to-image), and reorder them before exporting. The conversion happens on your device, so your pictures are never uploaded.",
    icon: ImageIcon,
    color: "orange",
    config: { mode: "image-to-pdf", accept: "image/*", allowBatch: true },
    info: {
      sectionHeadings: {
        features: "Why Convert Photos to PDF?",
        useCases: "Perfect Situations for Image Compilations",
        steps: "How to Convert Images to PDF Online",
        faq: "Conversion Tool FAQs"
      },
      // 1. INTRO SECTION (Focus on Convenience & Organization)
      intro: `A picture is worth a thousand words, but sending twenty separate picture files in an email is a nightmare. It looks unprofessional, clutters the recipient's inbox, and makes printing a hassle. Whether you are a designer sharing a portfolio, a student submitting handwritten notes, or an employee filing expense receipts, you need a way to **combine these images into a single, professional document**.

GoPDFGo’s **Image to PDF** converter — also the fastest **JPG to PDF** converter online — turns your chaotic collection of JPG, PNG, or WebP photos into a polished PDF file. Unlike other tools that stretch your images or ruin the aspect ratio, our smart engine **auto-scales** your photos to fit perfectly on standard page sizes while maintaining their original quality.

**The Privacy Revolution:**
Most "free" converters require you to upload your personal photos to a cloud server. This is risky, especially for personal photos or ID proofs.
**GoPDFGo works differently.** The whole conversion runs inside your browser tab.
1.  **Zero Uploads:** Your photos never leave your device. The conversion happens directly in your browser using your computer's power.
2.  **Lightning Fast:** Since there is no upload time, you can convert 50 images in seconds, even on a slow internet connection.
3.  **High Quality:** We don't compress your images unless you ask. Your PDF will look as crisp as the original photos.

Stop zipping files. Start creating professional PDFs instantly.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: turning phone photos into one PDF",
        body: `GoPDFGo places each image on its own PDF page and lets you decide how that page is shaped. Pick **A4** or **US Letter** and every photo is centred and auto-scaled to fit inside standard margins, so nothing gets stretched or cut off — handy when the document has to print cleanly later. Pick **Fit to image** and each page is sized to match that exact photo, with no border, which suits screenshots or artwork where a white frame would look wrong. You can also set portrait or landscape for the whole batch.

Say you are photographing the front and back of an ID for an upload slot that only accepts one file. Add both shots, then check the order — the thumbnails run top to bottom, so the first one becomes page 1. Drag them if the back ended up first. Choose A4 portrait, convert, and you get a single two-page PDF with both sides centred on the page. The same flow works for a stack of taxi and meal receipts shot on your phone: drop them all in, drag them into date order, and export one tidy document instead of ten loose images.

A couple of steps pair well with this. If a photo has your desk or a dark edge in the frame, [crop the image first](/crop) so the page looks deliberate. If the finished PDF is too heavy for a portal that caps uploads, [compress the PDF](/compress-pdf) before sending. And if you already have a PDF to attach it to, [merge the two into one file](/merge-pdf) afterwards.`,
        troubleshooting: [
          {
            problem: "The pages came out in the wrong order",
            fix: "Order follows the thumbnails, and the first thumbnail is always page 1. Drag them into the sequence you want before you convert — the tool does not sort by filename or capture time.",
          },
          {
            problem: "There is a lot of white space around my image",
            fix: "A4 and US Letter add margins so the page prints cleanly, which leaves a border around smaller or oddly shaped photos. Switch to Fit to image for a borderless page that matches each photo exactly.",
          },
          {
            problem: "A photo shows up sideways in the PDF",
            fix: "The converter reads each photo orientation tag and turns it upright on its own. If one still looks rotated, that tag was likely stripped by a screenshot or edit — set the batch to landscape, or rotate the image before adding it.",
          },
        ],
      },
      features: [
        {
          title: "Smart Auto-Fit Layout",
          desc: "Don't worry about image sizes. Whether you have a small receipt or a high-res landscape photo, our tool automatically **centers and scales** the image to fit the PDF page perfectly. No cut-off edges, no stretched pixels—just a clean, printable document."
        },
        {
          title: "Universal Format Support",
          desc: "We support all major image formats. You can mix and match **JPG, PNG, and WebP** files in a single batch. Want to combine a PNG screenshot with a JPG photograph? Go ahead. Our tool stitches them together seamlessly into one PDF file."
        },
        {
          title: "Private & Local Conversion",
          desc: "Your photos are personal. Whether it's family memories or confidential ID scans, **privacy is paramount**. With GoPDFGo, the conversion happens locally on your device. We physically cannot see or store your images because they never touch our servers."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Creative Showcases:** Designers and photographers can consolidate scattered project images into a polished, unified Digital Portfolio. Converting to PDF guarantees that your visual work is presented exactly as intended, with zero layout shifts on the client’s screen.",
        "**Expense Reporting:** Business travelers often snap photos of taxi bills and food receipts. Use this tool to combine all your daily receipts into one **'Expense_Report.pdf'** for easy reimbursement claims.",
        "**Education & Notes:** Students often take photos of whiteboard notes or handwritten homework. Convert these scattered images into a structured **Study Guide PDF** that is easy to read, share, and print.",
        "**KYC & Identity Verification:** Most official portals restrict you to a single upload slot. Capture both the front and back of your PAN Card or License, and instantly merge them into one **Unified Verification Document** for hassle-free approval."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select Images:** Click 'Upload' or drag and drop your photos. You can select multiple images at once (JPG, PNG, etc.).",
        "**Reorder Pages:** This is crucial. Drag the thumbnails to change the sequence. The first image will be Page 1, the second will be Page 2, and so on.",
        "**Choose Page Size & Convert:** Pick **A4**, **US Letter**, or **Fit to Image** (a borderless page that matches each photo exactly), set portrait or landscape, then click **'Convert to PDF'**. Our browser engine places each image onto its own PDF page.",
        "**Download:** Your new document is ready. Download it immediately. The file is optimized for sharing but retains high visual quality."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Will my images lose quality?",
          a: "No. We prioritize **visual fidelity**. Unlike compressors that blur images to save space, this tool focuses on embedding your original images into the PDF container with maximum clarity."
        },
        {
          q: "Can I combine JPG and PNG in the same file?",
          a: "Yes! You can upload a mix of different formats. The tool handles them all uniformly and creates a consistent document."
        },
        {
          q: "Is there a maximum number of images I can upload in one go?",
          a: "Most online tools stop at 20 images. **GoPDFGo has no hard limit.** As long as your device's memory allows, you can combine 50, 100, or more images into a single book-like PDF."
        },
        {
          q: "How can I rearrange the sequence of my uploaded photos?",
          a: "Before converting, you will see a preview of all your selected images. Simply **click and drag** any image to move it to a new position in the sequence."
        },
        {
          q: "Is it safe for private photos?",
          a: "Completely. Your photos are assembled into the PDF **inside the browser tab** and discarded the instant you close it. Nobody else ever sees them, which matters when the images are ID copies, medical reports, or personal documents."
        },
        {
          q: "Does it work on mobile?",
          a: "Yes. You can select photos directly from your phone's **Gallery or Camera Roll**, convert them, and share the PDF on WhatsApp or Email instantly."
        }
      ]
    }
  },
  {
    id: "rearrange-pdf",
    type: "pdf",
    title: "Rearrange PDF",
    desc: "Change the page order of your PDF document easily with a visual editor.",
    leadIn: "Reorder the pages of a PDF by dragging them into place — move an executive summary to the front, or pull a stray page out of the middle. You see every page as a thumbnail and set the exact sequence you want, then export one clean file. The reordering happens in your browser, with no upload and no quality loss.",
    icon: GripVertical,
    color: "orange",
    config: { mode: "rearrange", accept: ".pdf", allowBatch: false },
    info: {
      sectionHeadings: {
        features: "Why Use Our Visual Organizer?",
        useCases: "Best Times to Reorder Pages",
        steps: "How to Rearrange PDF Pages Online",
        faq: "Reordering Tool FAQs"
      },
      // 1. INTRO SECTION (High SEO Value)
      intro: `Need to **rearrange PDF pages** or reorder a document? Have you ever scanned a 50-page document only to realize page 12 is at the very end? Or maybe you need to move the executive summary of a business report to the front. Fixing the page order of a PDF usually requires expensive desktop software, but GoPDFGo's **Rearrange PDF** tool lets you do it effortlessly right in your browser.

Unlike other online tools that force you to upload your sensitive files to their servers just to change the page order, our platform uses advanced **browser-based technology**. This means the entire reordering process happens locally on your device. Your files never leave your computer, ensuring total data privacy.

**Why choose our Client-Side Organizer?**
Traditional tools are slow and compromise your privacy. **GoPDFGo changes the rules:**
1.  **Visual Simplicity:** See thumbnail previews of every page and simply drag them into the perfect sequence.
2.  **Instant Processing:** No waiting for heavy files to upload or download. It happens in milliseconds.
3.  **Zero Risk:** Perfect for confidential legal papers, medical records, or unreleased portfolios because there are zero server uploads.

Stop struggling with messy documents. Reorder your PDF pages securely and instantly with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: moving a summary to the front",
        body: `GoPDFGo shows every page of your PDF as a thumbnail, then lets you drag them into any order you want. Nothing re-renders or re-compresses — it is a **lossless** reshuffle, so the text stays sharp and the file size barely moves. The whole process runs on your device, so a confidential file never leaves your browser.

Say you have a 20-page report where the executive summary ended up as the last page. Open the file, wait for the thumbnails to finish loading, then drag that page from the end up to the first position. You can nudge several pages in the same session — pull a stray appendix out of the middle, group all the invoices together — and the thumbnail view updates live, so you can see the sequence before you commit. When it looks right, export, and you get one clean file in the new order.

Because this tool works on a **single PDF** at a time, [combine separate files into one document](/merge-pdf) first if your pages are spread across several PDFs, then reorder them together. If reordering is only half the job, [organize, rotate and reorder in one view](/organize-pdf) instead, or [remove the pages you no longer need](/delete-pdf-pages) before setting the final order.`,
        troubleshooting: [
          {
            problem: "The thumbnails take a while to appear on a large or scanned PDF",
            fix: "Every page is drawn locally on your device, so a long or image-heavy file needs a moment to render each preview. Let all the thumbnails finish loading before you start dragging; if it stays sluggish, delete pages you do not need first to lighten the file.",
          },
          {
            problem: "A password-protected PDF will not open for reordering",
            fix: "An encrypted PDF cannot be read to generate thumbnails until the protection is removed. Run it through the Unlock PDF tool first, then bring the unlocked copy back here to rearrange the pages.",
          },
          {
            problem: "The exported file looks unchanged even though the thumbnails were in the right order",
            fix: "You likely exported a split-second before the last drag registered, or saved the original by mistake. Re-check that the thumbnail sequence reflects the order you want, then export again and open the freshly downloaded file to confirm.",
          },
        ],
      },
      features: [
        {
          title: "Intuitive Drag & Drop",
          desc: "No confusing menus or typing in page numbers. We generate **clear visual thumbnails** for every page. Simply click, hold, and drag the pages into your desired sequence. It is as easy as moving apps on your phone screen."
        },
        {
          title: "100% Private Processing",
          desc: "Your files are your business. Because our tool runs entirely **inside your web browser**, your data is never uploaded, stored, or seen by any third-party server. Complete peace of mind for sensitive documents."
        },
        {
          title: "Zero Quality Loss",
          desc: "Moving pages around shouldn't degrade your document. Our engine reconstructs your PDF with **lossless precision**, keeping your text sharp, vectors crisp, and images at their original high resolution."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Fixing Scanned Documents:** When scanning a large batch of physical papers, it is incredibly easy for pages to get mixed up. Quickly upload the file and drag the out-of-order pages back to their correct chronological spots.",
        "**Organizing Portfolios:** Designers, freelancers, and architects can experiment with the flow of their work. Move your most impressive project to the very first page to make a stronger impact on potential clients.",
        "**Restructuring Reports:** Did you forget to put the executive summary at the beginning of your financial report? Easily drag it from the bottom to the very top in seconds before emailing it to your boss.",
        "**Preparing Legal Files:** Arrange contracts, annexures, and signature pages in the exact sequence required by courts or corporate legal teams without ever risking data exposure."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Upload your PDF:** Click the upload box or drag and drop your PDF file into the designated area to get started.",
        "**Wait for Thumbnails:** Give our engine a few seconds to securely process the file and generate crisp, visual previews of every single page.",
        "**Drag to Reorder:** Click and hold any page thumbnail, then **drag it** to its new position in the grid. The position numbers will update automatically.",
        "**Save & Download:** Once the sequence looks perfect, click **'Rearrange PDF Now'** to instantly download your newly organized document."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Is it safe to rearrange sensitive or confidential PDFs here?",
          a: "Yes. Reordering only shuffles pages within the copy **held in your device's memory** — the file is never sent to a server to be edited. That keeps it safe for anything sensitive, from financial records to legal filings."
        },
        {
          q: "Will changing the page order reduce the quality of my PDF?",
          a: "No. The rearranging process is completely **lossless**. We do not compress or alter the actual contents of the pages; we simply rewrite the structural sequence of the file."
        },
        {
          q: "Can I use this tool on my smartphone or tablet?",
          a: "Yes! Our visual drag-and-drop interface is fully **touch-optimized**. You can easily tap, hold, and reorder pages on your iPhone, iPad, or Android device just as easily as on a desktop."
        },
        {
          q: "Is there a limit to how many pages I can rearrange?",
          a: "There are **no hard limits** imposed by GoPDFGo. The only limitation is your device's RAM. Most modern phones and computers can easily handle and render thumbnails for documents with hundreds of pages."
        },
        {
          q: "Are there any watermarks added to the final downloaded file?",
          a: "Never. All of our privacy-first tools are **100% free of watermarks**, ensuring your reorganized documents remain professional, clean, and ready for official use."
        },
        {
          q: "What happens to my original file after I rearrange it?",
          a: "Your original file remains **completely untouched** on your local hard drive or phone storage. The tool simply reads it and generates a brand new, rearranged copy for you to download."
        }
      ]
    }
  },

  {
    id: "pdf-to-image",
    type: "pdf",
    title: "PDF to JPG",
    desc: "Convert each PDF page into a high-quality JPG or PNG image.",
    leadIn: "Turn PDF pages into images — all of them, or just the ones you pick. Handy when a portal only accepts JPG, you want to share a single page on WhatsApp, or you need a page for a slide. Choose JPG for small, share-friendly files or PNG for lossless quality. It runs on your device, so the document is never uploaded.",
    icon: FileImage,
    color: "blue",
    config: { mode: "pdf-to-image", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Why Convert PDF to Images?",
        useCases: "When You Need PDF Pages as Images",
        steps: "How to Turn a PDF into Images",
        faq: "PDF to Image FAQs"
      },
      intro: `Sometimes you don't need a whole PDF — you just need a picture of a page. Maybe a portal only accepts JPG uploads, you want to share a single page on WhatsApp, or you need to drop a page into a presentation. GoPDFGo's **PDF to JPG/PNG** tool turns your PDF pages — all of them, or just the ones you select — into crisp, high-resolution images, right inside your browser.

Like all our tools, this runs **100% on your device** right inside your browser — your document is never uploaded to a server. Choose JPG for small, share-friendly files or PNG for lossless, transparent-friendly quality. If your PDF has multiple pages, we neatly bundle all the images into a single ZIP for you.`,
      walkthrough: {
        heading: "A real example: pulling one page out of a PDF as a JPG",
        body: `Say you have a 10-page contract but a job portal only wants a JPG of the signature page. Drop the PDF in and every page starts selected — untick the nine you don't need so only the last page converts. Pick JPG, and because a single page produces a single image, you get one file straight back. Leave several pages ticked and GoPDFGo bundles them into one ZIP instead, so nothing gets lost in a long download list.

The format switch matters more than it looks. **JPG** gives you the smallest file, which is what most upload forms and chat apps prefer. Switch to **PNG** when you need crisp edges or a transparent background — a logo page, or a diagram you'll drop into a slide. Both render at a high DPI, so text stays sharp when someone zooms in; the real difference is file size, not clarity. If a form still rejects your JPG for being too large, nudge the quality level down a notch before re-exporting.

Once you have the images you can keep going. [Shrink the JPG a bit more](/compress-jpg) before uploading, or [turn a batch of images back into one PDF](/image-to-pdf) if the portal changes its mind. And if what you actually wanted was the wording rather than a picture, [pull the text straight out of the PDF](/pdf-to-text) instead of converting to an image.`,
        troubleshooting: [
          {
            problem: "I got a ZIP when I only wanted one image",
            fix: "More than one page was still selected. Untick every page except the one you need — a single selected page comes back as a single image, no ZIP.",
          },
          {
            problem: "The JPG is still too big for the upload form",
            fix: "Lower the quality level and re-export, and make sure you are on JPG rather than PNG. PNG files are lossless and usually much larger than the same page as a JPG.",
          },
          {
            problem: "Fine text looks soft when I zoom into the image",
            fix: "JPG compression can soften small text at lower quality settings. Raise the quality level, or switch to PNG, which is lossless and keeps edges crisp.",
          },
        ],
      },
      features: [
        {
          title: "High-Resolution Output",
          desc: "We render each page at a high DPI so text stays sharp and images stay clear — perfect for printing, presentations, or zooming in. No blurry, pixelated screenshots."
        },
        {
          title: "JPG or PNG, Your Choice",
          desc: "Pick **JPG** for the smallest file size (great for uploads and chat), or **PNG** when you need maximum quality and crisp edges. One click switches the entire batch."
        },
        {
          title: "100% Private Conversion",
          desc: "Your PDF never leaves your browser. Everything is rendered locally on your own device, so even sensitive documents like statements or contracts stay completely private."
        }
      ],
      useCases: [
        "**Image-Only Upload Forms:** Many government and job portals only accept JPG/PNG. Convert your PDF page into an image that fits their exact requirements.",
        "**Sharing on WhatsApp & Social:** Images preview instantly in chats while PDFs need to be downloaded first. Send a page as a JPG for quick viewing.",
        "**Presentations & Documents:** Drop a PDF page straight into PowerPoint, Google Slides, or a Word file as a clean image.",
        "**Thumbnails & Previews:** Create a quick visual preview of a document's cover or a specific page for a website or catalog."
      ],
      steps: [
        "**Upload PDF:** Drag and drop your PDF or tap to select it. It loads instantly because nothing is uploaded.",
        "**Choose Pages, Format & Quality:** Every page is selected by default — untick any you don't need. Then pick JPG (smaller) or PNG (higher quality) and set the image quality level.",
        "**Convert:** Click convert — every page is rendered to an image in your browser.",
        "**Download:** Get a single image, or a ZIP of all pages if your PDF has more than one page."
      ],
      faq: [
        {
          q: "Will the image quality be good enough to print?",
          a: "Yes. We render pages at a high resolution so the output is sharp enough for screens and most printing needs. Choose PNG for the highest fidelity."
        },
        {
          q: "What happens if my PDF has many pages?",
          a: "Each page becomes its own image. If there's more than one page, we automatically package all the images into a single ZIP file for easy download."
        },
        {
          q: "Is JPG or PNG better?",
          a: "JPG gives much smaller files and is ideal for uploads and sharing. PNG is lossless and supports transparency, making it better for graphics and maximum quality."
        },
        {
          q: "Is it safe for confidential PDFs?",
          a: "Completely. The conversion happens entirely inside your browser using your device's own processor. Your file is never sent to or stored on any server."
        }
      ]
    }
  },
  {
    id: "watermark-pdf",
    type: "pdf",
    title: "Watermark PDF",
    desc: "Stamp text like CONFIDENTIAL or your name across every PDF page.",
    leadIn: "Stamp text like CONFIDENTIAL, DRAFT, or your name across every page of a PDF. Pick the position — diagonal, tiled, footer, or centre — and set the size, colour, and opacity so the mark stays visible without hiding the content. A live preview shows the result as you type, and the stamping happens entirely in your browser.",
    icon: Stamp,
    color: "blue",
    config: { mode: "watermark", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Why Watermark Your PDFs?",
        useCases: "Best Times to Add a Watermark",
        steps: "How to Watermark a PDF",
        faq: "Watermark Tool FAQs"
      },
      intro: `A watermark protects your work and your privacy. Whether you're a freelancer marking a proposal as **DRAFT**, a student writing "Submitted to XYZ only" across an ID copy, or a business stamping **CONFIDENTIAL** on a contract, a clear diagonal watermark tells everyone how a document should be used.

GoPDFGo's **Watermark PDF** tool stamps your chosen text across every page — you choose the position (diagonal, tiled, footer, or center) plus the size, color, and opacity, so it stays visible without hiding the content. It runs entirely in your browser, so your sensitive documents never touch a server. Add your watermark and download in seconds, with no signup and no watermark from us.`,
      walkthrough: {
        heading: "A real example: stamping an ID copy before you send it",
        body: `GoPDFGo stamps your text across every page of a PDF in one pass, on your own device. Say you are sending a scanned copy of your Aadhaar or PAN to a company for a KYC check. Type something like 'Submitted to Acme only' as the watermark text, pick the **diagonal** position so the mark sits across the middle of the page at an angle and is awkward to crop out — the longer your text, the further it reaches across the sheet, and set the colour to gray at a medium opacity. The live preview of page 1 updates as you type, so you can nudge the size and opacity until the stamp reads clearly while the ID details underneath stay legible, then apply and download.

The position you choose changes the job. **Diagonal** makes the strongest visible claim; **tiled** repeats the text so there is no clean corner to crop away; **footer** puts a discreet line at the bottom; **centre** drops a single mark in the middle. Whatever you pick is applied to every page at once and baked into the file permanently, so keep your original if you will ever need an unmarked copy.

For an ID copy you can go further: [black out the number itself with the ID masking tool](/aadhaar-masking) first, then [turn the masked image back into a PDF](/image-to-pdf) before you stamp it. Working with several loose scans? [Merge them into one PDF](/merge-pdf) first so a single watermark covers the lot, or [add your signature to the same document](/sign-pdf) once the mark is in place.`,
        troubleshooting: [
          {
            problem: "The watermark is too dark and makes the text underneath hard to read.",
            fix: "Lower the opacity, drop to a smaller size, or switch to the footer position. Gray sits lighter on the page than red or blue, and the live preview shows the effect before you download.",
          },
          {
            problem: "You are worried someone could crop the watermark off a corner of the page.",
            fix: "Use the tiled position so the text repeats across the whole sheet, or diagonal so it runs through the middle. Both leave no clean margin to trim away without cutting into the content.",
          },
          {
            problem: "You already downloaded the file and now need it without the watermark, or want to change the text.",
            fix: "The mark is baked into the page content and cannot be lifted out, so redo it from your original PDF. Always keep an unstamped copy before you apply a watermark.",
          },
        ],
      },
      features: [
        {
          title: "Custom Text Stamp",
          desc: "Type anything — CONFIDENTIAL, DRAFT, your name, a website, or 'For KYC use only'. The text is applied across every page in one go."
        },
        {
          title: "Full Control: Opacity, Size, Color & Position",
          desc: "Tune the **opacity** (light or bold), pick a **size** (small, normal, or large), choose a **color** (gray, red, or blue), and set the **position** — a diagonal stamp, a repeating tiled pattern, a footer line, or a single center mark. A **live preview of page 1** updates instantly as you adjust, so you see exactly how it will look before you download."
        },
        {
          title: "Secure & Local",
          desc: "Stamping a confidential agreement or an ID copy? It's safe. The watermark is applied on your own device — your file is never uploaded anywhere."
        }
      ],
      useCases: [
        "**Protecting ID Copies:** Write 'Submitted to [Company] only' across a copy of your Aadhaar, PAN, or license so it can't be misused elsewhere.",
        "**Marking Drafts:** Freelancers and teams can stamp DRAFT or SAMPLE on proposals and designs before they're finalized.",
        "**Confidential Documents:** Clearly mark contracts, reports, and financial statements as CONFIDENTIAL before sharing.",
        "**Branding:** Add your name or website across a portfolio or quotation to reinforce ownership."
      ],
      steps: [
        "**Upload PDF:** Drop your document in — it loads instantly and privately.",
        "**Enter Watermark Text:** Type the text you want stamped on every page.",
        "**Style It:** Set the position (diagonal, tiled, footer, or center), size, color, and opacity to get the exact look you want.",
        "**Apply & Download:** Click to stamp every page and download your watermarked PDF."
      ],
      faq: [
        {
          q: "Will the watermark cover my text?",
          a: "No. The watermark is semi-transparent, so your original content stays fully readable underneath it — and you can lower the opacity or change the position and size to keep everything clear."
        },
        {
          q: "Is the watermark added to every page?",
          a: "Yes. Your chosen text is stamped consistently across all pages of the document in a single click."
        },
        {
          q: "Can the watermark be removed later?",
          a: "The watermark is baked into the page content, so it is permanent. Keep a copy of your original file if you'll need an un-watermarked version."
        },
        {
          q: "Is it safe for confidential files?",
          a: "Yes. Watermarking happens entirely in your browser. Your file is never uploaded, so even sensitive documents stay private."
        }
      ]
    }
  },
  {
    id: "delete-pdf-pages",
    type: "pdf",
    title: "Delete PDF Pages",
    desc: "Remove unwanted, blank, or extra pages from a PDF in seconds.",
    leadIn: "Remove the pages you do not want from a PDF — a blank sheet at the end of a scan, instruction pages on a form, a duplicate. Just tap the pages to delete and download a clean, trimmed document. The pages you keep stay lossless, and the whole thing happens in your browser with nothing sent to a server.",
    icon: FileMinus,
    color: "blue",
    config: { mode: "delete-pages", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Why Use a Page Remover?",
        useCases: "When to Delete PDF Pages",
        steps: "How to Delete Pages from a PDF Online",
        faq: "Page Deletion FAQs"
      },
      intro: `Need to **delete pages from a PDF**? Scanned a document and ended up with a blank page at the end? Downloaded a form with instruction pages you don't need? GoPDFGo's **Delete PDF Pages** tool lets you remove any pages from a PDF visually — just tap the pages you want gone and download a clean, trimmed document.

It's the fastest way to tidy up a PDF before uploading or printing. Everything happens **inside your browser** with zero quality loss on the pages you keep, and your file is never sent to a server.`,
      walkthrough: {
        heading: "A real example: cutting the blank page a scanner adds",
        body: `Say you scan a 6-page contract and the scanner tacks a blank sheet onto the end, plus a page of boilerplate terms you do not need. Open the PDF in GoPDFGo and you get a **thumbnail of every page**. Tap the blank page and the terms page — selected pages are clearly marked — then hit delete and download a clean 5-page file. You are choosing pages by sight, not by number, so there is no counting cover sheets or guessing where the empty one landed.

The pages you keep are a **lossless copy**: nothing is re-compressed, so text stays sharp and selectable and any photos keep full quality. It all runs inside your browser, which matters when you are trimming a bank statement or a signed contract — the file never leaves your device, and your original stays untouched while the tool builds a fresh trimmed copy for you. You can select pages anywhere across the document and remove them all in a single click - the only limit is that at least one page has to stay.

Deleting is the right move when you want to drop a few pages and keep the rest. If instead you only need a handful of pages out of a big file, [extract just the pages you need](/extract-pdf-pages) — the cleaner inverse. Want to reorder while you tidy up? [Organize the whole document](/organize-pdf). And if the trimmed PDF is still too heavy for a portal, [compress it before uploading](/compress-pdf).`,
        troubleshooting: [
          {
            problem: "I deleted a page by mistake and want it back",
            fix: "Nothing is truly lost. The tool builds a brand-new trimmed copy and leaves your original untouched on your device. Just re-open the original PDF, and this time tap only the pages you actually want gone before downloading again.",
          },
          {
            problem: "The thumbnails are slow to appear on a big scan",
            fix: "Every page is rendered as a preview inside your browser, so a heavy scanned file with hundreds of high-resolution pages needs a moment to draw them all. Let it finish rather than re-dropping the file — nothing is uploading, it is just your device building the previews.",
          },
          {
            problem: "My trimmed PDF is barely smaller than the original",
            fix: "Deleting only removes the pages you picked; the pages you keep are copied losslessly, so a file full of large scans stays heavy even after you cut a few. If you need it lighter for an upload, run the result through the Compress PDF tool afterwards.",
          },
        ],
      },
      features: [
        {
          title: "Visual Page Selection",
          desc: "See a thumbnail of every page and simply tap the ones you want to remove. No guessing page numbers — what you see is what you delete."
        },
        {
          title: "Lossless on Kept Pages",
          desc: "We don't re-compress anything. The pages you keep are copied exactly as they were, so text stays sharp and selectable and images keep full quality."
        },
        {
          title: "Private & Instant",
          desc: "Removing pages from a bank statement or contract? It's processed locally on your device, so your document never leaves your hands."
        }
      ],
      useCases: [
        "**Removing Blank Pages:** Scanners often add empty pages. Delete them before sharing so your document looks professional.",
        "**Trimming Instruction Pages:** Forms and tickets often include pages of terms you don't need to print or upload — remove them in one go.",
        "**Cleaning Up Before Upload:** Portals with strict page or size limits? Drop the pages that aren't required.",
        "**Sharing Only What Matters:** Keep just the relevant pages of a long report before sending it to a client or colleague."
      ],
      steps: [
        "**Upload PDF:** Drag in your document and wait a moment for the page thumbnails to appear.",
        "**Select Pages to Delete:** Tap every page you want to remove — selected pages are clearly marked.",
        "**Delete:** Click the button to rebuild your PDF with only the pages you kept.",
        "**Download:** Save your clean, trimmed PDF instantly."
      ],
      faq: [
        {
          q: "Does deleting pages lower the quality of the rest?",
          a: "No. The process is lossless. We simply copy the pages you keep into a new file exactly as they were, so nothing is re-compressed."
        },
        {
          q: "Can I remove multiple pages at once?",
          a: "Yes. Select as many pages as you like across the whole document, then delete them all in a single click."
        },
        {
          q: "Will my original file change?",
          a: "Never. Your original stays untouched on your device. We create a brand-new trimmed copy for you to download."
        },
        {
          q: "Is it safe for private documents?",
          a: "Yes. Pages are removed entirely within your browser. Your file is never uploaded to any server."
        }
      ]
    }
  },
  {
    id: "unlock-pdf",
    type: "pdf",
    title: "Unlock PDF",
    desc: "Remove the password from a PDF you can already open, for easy uploads.",
    leadIn: "Remove the password from a PDF you can already open — the kind banks put on statements (often your PAN plus date of birth) that portals then reject for KYC or loan uploads. This is not a cracker: you enter the password you already know and get back a clean, openable copy. Your statement is processed in your browser, never uploaded.",
    icon: Unlock,
    color: "blue",
    config: { mode: "unlock", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Why Unlock a PDF?",
        useCases: "When to Remove a PDF Password",
        steps: "How to Unlock a PDF Online",
        faq: "Unlock PDF FAQs"
      },
      intro: `Bank and card statements in India usually arrive password-protected (often your PAN + date of birth), and many portals won't accept a locked PDF for KYC or loan uploads. GoPDFGo's **Unlock PDF** tool removes that password — for a file you already have the password to — so you get a clean, openable PDF you can upload anywhere.

This is **not a password cracker**: you simply enter the password you already know, and we produce an unlocked copy. As always, everything runs in your browser — your statement is never uploaded to a server, which matters a lot for financial documents.`,
      walkthrough: {
        heading: "A real example: a bank statement a KYC portal keeps rejecting",
        body: `Say your bank emails a monthly statement that only opens after you type a password — often your PAN plus your date of birth. A loan or KYC portal then rejects the upload because the file is protected. Open that same statement here, type **the password you already use**, and unlock it. You get back a clean copy that opens with no prompt, ready to upload anywhere.

Here is the honest part: to strip the encryption inside your browser, each page is rebuilt as a high-quality image. The unlocked copy views, prints, and uploads everywhere, but its text is no longer selectable — so **keep your original locked file** if you ever need to copy figures out of it later. Because everything runs on your device, neither the statement nor the password ever leaves your machine, which is exactly what you want for a financial document.

Working through a whole year of statements? Unlock them one at a time, then tidy up the results. If the unlocked file ends up heavier than the portal allows, [shrink it with Compress PDF](/compress-pdf). If you only need a couple of months, [pull out just those pages](/extract-pdf-pages) before uploading, or [combine several statements into one PDF](/merge-pdf) when a portal asks for a single document.`,
        troubleshooting: [
          {
            problem: "It says my password is incorrect",
            fix: "Bank passwords are case-sensitive, and each bank sets its own format - some use a PAN and date of birth, others a customer ID, account number, or part of your name. Check the pattern described in the email or notice that came with the statement, then enter it exactly, with no extra spaces. Nothing is processed until the correct password opens the file. Check the pattern in the email or notice that came with the statement, then enter it exactly, with no spaces. Nothing is processed until the correct password opens the file.",
          },
          {
            problem: "The unlocked file opens as images and I cannot select the text",
            fix: "That is expected. To remove the encryption in your browser, each page is rebuilt as a high-quality image, which drops the selectable text layer. The copy is fine for viewing, printing, and uploading. If you need to copy text or figures, keep and use your original locked PDF for that.",
          },
          {
            problem: "The portal still rejects my file after I unlocked it",
            fix: "The password is gone, so the rejection is now about something else. Size is a common cause - rebuilt image pages can be larger than the original, and many portals cap the upload. Run the unlocked file through Compress PDF to bring it down, then upload it again. Rebuilt image pages can be larger than the original, and many portals cap the upload. Run the unlocked file through Compress PDF to bring it down, then upload it again.",
          },
        ],
      },
      features: [
        {
          title: "Password Removed for Good",
          desc: "Enter the password once and download a PDF that opens freely — no more typing your PAN and date of birth every time you want to view or upload it."
        },
        {
          title: "Built for Bank & Card Statements",
          desc: "Designed for the exact Indian use case: unlocking statements so they can be uploaded to KYC, loan, and verification portals that reject password-protected files."
        },
        {
          title: "Stays on Your Device",
          desc: "Your financial documents are the last thing you'd want on someone's server. Unlocking happens entirely in your browser, so the file never leaves your computer or phone."
        }
      ],
      useCases: [
        "**KYC & Loan Uploads:** Most verification portals reject locked PDFs. Unlock your statement so it uploads without errors.",
        "**Easy Everyday Viewing:** Stop re-entering the password each time you open a statement — keep one unlocked copy for yourself.",
        "**Sharing with Your CA:** Send statements to your accountant or advisor without also sharing the password separately.",
        "**Printing & Archiving:** Some printers and document managers can't handle protected PDFs — unlock first for a smooth workflow."
      ],
      steps: [
        "**Upload the PDF:** Select your password-protected document. It stays on your device.",
        "**Enter the Password:** Type the password you use to open the file (e.g. your PAN + DOB for bank statements).",
        "**Unlock:** Click to remove the protection and rebuild an openable PDF.",
        "**Download:** Save your unlocked PDF, ready to view, print, or upload anywhere."
      ],
      faq: [
        {
          q: "Can this crack a password I don't know?",
          a: "No. This tool only removes protection from PDFs you can already open — you must enter the correct password. It is not a password recovery or cracking tool."
        },
        {
          q: "Is it safe to unlock my bank statement here?",
          a: "Yes — in fact it's safer than most alternatives. Your statement and password never leave your browser; the unlocking is done entirely on your own device."
        },
        {
          q: "Why does the unlocked file open as images?",
          a: "To reliably strip the encryption in the browser, pages are rebuilt as high-quality images. The result opens and uploads anywhere; if you need selectable text, keep your original."
        },
        {
          q: "What if I enter the wrong password?",
          a: "We'll tell you the password was incorrect so you can try again. Nothing is processed until the correct password unlocks the file."
        }
      ]
    }
  },
  {
    id: "ocr-pdf",
    type: "pdf",
    title: "OCR PDF",
    desc: "Read text off a scanned PDF, in English or Hindi.",
    leadIn: "Turn a scanned PDF back into text you can actually select, search and paste. Photographed pages, a scanner copy, an old certificate — the tool reads the words straight off the page images, in English, Hindi, or both together for the bilingual forms most Indian paperwork uses. It runs inside your browser, so the document never leaves your device.",
    icon: ScanText,
    color: "blue",
    config: { mode: "ocr-pdf", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Why Run OCR in Your Own Browser?",
        useCases: "When You Need OCR on a Scanned PDF",
        steps: "How to OCR a PDF Online",
        faq: "OCR PDF FAQs"
      },
      intro: `You have a PDF, but you cannot copy a single word out of it. Try to select a line and nothing highlights — the cursor just drags a blue box over what looks like text. That file is a **scan**: someone photographed the pages or ran them through a scanner, so what you are looking at is a picture of words, not words.

**OCR** — optical character recognition — is what turns those pictures back into text. It looks at the shapes on the page, recognises them as letters, and gives you characters you can select, search, paste and edit. It is how you get the address off a scanned utility bill without retyping it, or the questions out of a photographed question paper.

GoPDFGo's **OCR PDF** tool does this **inside your browser**. The recognition engine is downloaded to your device and runs on your own processor, so a scanned Aadhaar card, salary slip or agreement is never uploaded to anyone's server. And because most Indian paperwork is bilingual, it reads **Hindi and English together** — not one or the other.`,
      walkthrough: {
        heading: "A real example: getting the text off a bilingual government form",
        body: `Say you have a scanned application form where the labels are printed in both scripts — **आवेदन पत्र / Application Form**, **नाम / Name**, and so on. Open the PDF, and before you run anything, choose the language that is actually on the page.

This choice matters more than people expect. Reading a Hindi line with the English model does not give you slightly worse Hindi — it gives you nonsense, because the engine tries to force Devanagari shapes into Latin letters. The reverse is just as bad. That is why **Hindi + English** is the default here: it recognises both scripts in one pass, which is what a bilingual form needs, at the cost of being a little slower than a single language.

Then it works page by page. Each page is rendered to an image and read, so a long document takes real time — this is the slowest tool on the site, and a phone will be slower than a laptop. The progress bar shows the actual page count so you know where you are. When it finishes you get plain text you can copy with one tap or download as a **.txt** file.

Two things to know before you rely on the output. First, OCR is never perfect: a **1** can go missing from a long number, and faint or skewed scans read worst — always check anything that matters, like an amount or a roll number, against the original. Second, if your PDF is not a scan at all and you can already select its text, skip this entirely and use [PDF to Text](/pdf-to-text), which lifts the real characters exactly and takes a fraction of the time. If the scan is crooked or has a big dark border, [straighten the pages first](/rotate-pdf) or [crop the edges off the images](/crop) — OCR reads a clean, upright page far better than a tilted one.`,
        troubleshooting: [
          {
            problem: "The Hindi came out as random Latin letters",
            fix: "The English-only model was selected. It cannot read Devanagari at all, so it approximates the shapes with Latin characters and the result is unusable. Switch to Hindi, or Hindi + English if the page has both, and run it again.",
          },
          {
            problem: "It is taking a very long time",
            fix: "That is expected, and it is the honest cost of reading every page as an image. A long scan on a phone can take a minute or more, and the first run also downloads the language data. Leave the tab open and in the foreground; the progress bar shows the real page count so you can see it moving.",
          },
          {
            problem: "A few characters or digits are wrong",
            fix: "OCR guesses from shapes, so it confuses similar ones — a 1 with an l, a 0 with an O — and loses accuracy on faint, blurry or handwritten text. Proofread anything you will act on. A sharper, straighter, higher-contrast scan is the single biggest improvement you can make.",
          },
          {
            problem: "Nothing came back at all",
            fix: "Either the page is genuinely blank, or the scan is too faint or too skewed for the engine to find any letters. Rescan at a higher quality if you can. If the first run failed outright, check your connection too — the language data is fetched once on first use.",
          },
        ],
      },
      features: [
        {
          title: "Hindi and English, Together",
          desc: "Most Indian forms print both scripts on the same line, and a single-language pass mangles whichever one it was not built for. This reads **Hindi and English in one go**, so a bilingual application form comes back readable end to end instead of half nonsense."
        },
        {
          title: "The Scan Never Leaves Your Device",
          desc: "The recognition engine is downloaded to your browser and runs on your own processor. That matters here more than anywhere: the documents people OCR are exactly the sensitive ones — Aadhaar copies, salary slips, agreements, medical reports — and none of them are uploaded."
        },
        {
          title: "Plain Text You Can Actually Use",
          desc: "The result is clean text, not another locked-up file. Copy it straight into WhatsApp, an email or a form, or download it as a .txt to keep. Page breaks are marked so you can tell where each page ends."
        }
      ],
      useCases: [
        "**Scanned Government Forms & Certificates:** Pull the name, number or address off a scanned form without retyping it, whether the labels are in Hindi, English, or both.",
        "**Old Documents You Only Have on Paper:** A degree certificate, a rent agreement, an old bill — scan it once and get a searchable text copy you can keep and paste from.",
        "**Photographed Notes & Question Papers:** Turn a phone photo of printed notes or a question paper into text you can reformat, translate, or share.",
        "**Anything a Text Extractor Returned Empty:** If PDF to Text gave you nothing, the file is a scan — this is the tool that reads it."
      ],
      steps: [
        "**Upload the scanned PDF:** Drag and drop the file or tap to select. It stays on your device the whole time.",
        "**Pick the language on the page:** Hindi + English is the default and suits most Indian paperwork. Choose English or Hindi alone if the page is only one script — it is a little faster.",
        "**Run the OCR:** Each page is rendered and read in turn. The first run also downloads the language data, so give it a moment.",
        "**Copy or download:** Read the text on screen, copy it all with one tap, or download it as a .txt file. Proofread anything important before you rely on it."
      ],
      faq: [
        {
          q: "Does it work on Hindi documents?",
          a: "Yes. You can read a page as **Hindi**, **English**, or **Hindi + English together** — the last one is the default, because most Indian forms print both scripts on the same page. Picking the right language matters: the English model cannot read Devanagari at all, and will return nonsense rather than imperfect Hindi."
        },
        {
          q: "What is the difference between this and PDF to Text?",
          a: "**PDF to Text** lifts the text layer that is already inside a normal PDF — instant and exact, but it needs that layer to exist. **OCR PDF** is for scans, where the pages are images and there is no text layer, so the words have to be recognised visually. If you can select text in your PDF with a cursor, use PDF to Text; if you cannot, use this."
        },
        {
          q: "Is my scanned document uploaded anywhere?",
          a: "No. The OCR engine is downloaded to your browser and runs on your own device. Nothing about the file — not the images, not the text it produces — is sent to us. That is the whole reason to run OCR here rather than on a site that wants your Aadhaar copy on its server."
        },
        {
          q: "Does it give me back a searchable PDF?",
          a: "No, and it is worth being clear about that. You get the **text** as plain text you can copy or download as a .txt file. It does not rebuild your scan into a PDF with an invisible text layer behind the images. If you need the words, this is what you want; if you specifically need a searchable PDF, this is not that tool."
        },
        {
          q: "Why is it so slow compared to the other tools?",
          a: "Because it does far more work. Every page is rendered to an image and then examined shape by shape, which is genuinely heavy — this is the slowest job on the site, and a phone takes longer than a laptop. The first run also downloads the language data (a few MB), though that is cached afterwards."
        },
        {
          q: "How accurate is it?",
          a: "Good on clear printed text, and imperfect by nature. Similar shapes get confused — a 1 with an l, a 0 with an O — and faint, skewed or handwritten pages read worst. Always proofread anything you will act on, especially numbers. A sharper, straighter scan improves the result more than anything else you can change."
        },
        {
          q: "Does it work on my phone?",
          a: "Yes, in Chrome, Safari and other modern browsers on Android and iPhone, with nothing to install. It will be slower than a laptop, and the first run downloads the language data, so use Wi-Fi if your data is limited."
        }
      ]
    }
  },
  {
    id: "pdf-to-text",
    type: "pdf",
    title: "PDF to Text",
    desc: "Extract all selectable text from a PDF into plain text.",
    leadIn: "Pull the words out of a PDF as clean, copyable plain text — a few paragraphs for an email, the questions from a paper, a clause from an agreement, without retyping. Copy it with one tap or download it as a .txt file. It reads the PDF right in your browser, so nothing is uploaded.",
    icon: Type,
    color: "blue",
    config: { mode: "pdf-to-text", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Why Extract PDF Text in Your Browser?",
        useCases: "When You Need the Text Out of a PDF",
        steps: "How to Convert PDF to Text Online",
        faq: "PDF to Text FAQs"
      },
      intro: `Sometimes you don't need the whole PDF — you just need the words inside it. Maybe you want to copy a few paragraphs from a report into an email, pull the question text out of a question paper, quote a clause from an agreement, or feed some content into another document without retyping it line by line.

GoPDFGo's **PDF to Text** tool reads the text layer of your PDF and hands it back to you as clean, copyable plain text. You can copy it with one tap or download it as a **.txt** file. It runs **entirely in your browser** — your PDF is never uploaded to any server, which matters when you're pulling text out of contracts, statements, or anything with personal details.

**This tool reads the text layer only.** If you can already select words in your PDF with a cursor, extraction is instant and exact — every character comes across as it was typed. If the pages are **scanned images** — a photo of a page saved as a PDF — there is no text layer to read, and this tool will tell you so rather than return an empty box. For those files use the [OCR PDF](/ocr-pdf) tool instead, which reads the letters off the page images and handles Hindi as well as English.`,
      walkthrough: {
        heading: "A real example: pulling a clause out of an agreement",
        body: `GoPDFGo reads a PDF two ways depending on what is inside it. For a normal PDF it pulls straight from the **text layer** — the selectable characters already baked into the file — so a long report comes back quickly, in roughly the order you read it on screen, with page breaks marked. Tap Copy all to grab the whole extract in one go, select just the paragraph you need from the text box, or download the lot as a .txt file.

A scanned PDF is a different job. If someone photographed the pages or ran them through a scanner there is no text layer at all — just pictures of words — so there is nothing here to lift, and the tool says so instead of handing you an empty box. Those files need [OCR, which reads the letters off the page images](/ocr-pdf); it is slower and never perfect, which is exactly why it is a separate tool rather than a surprise that quietly triples your wait. Everything runs on your device either way, which matters when the file is an offer letter, a statement, or a contract.

Once you have the words you can keep going. If the PDF asks for a password on open, [remove the protection first](/unlock-pdf) so the text is actually readable. If you wanted the pages as pictures rather than words, [turn each page into a JPG](/pdf-to-image) instead. And when you only need a section, [pull those pages out](/extract-pdf-pages) before extracting, so you are not scrolling past everything else to find the part you want.`,
        troubleshooting: [
          {
            problem: "The text came out jumbled or in the wrong order",
            fix: "The tool follows each page line by line, but multi-column layouts and tables don't always flow the way they look on screen — the columns can interleave. Check against the original and re-order the copied text by hand for tricky pages.",
          },
          {
            problem: "It returned nothing at all",
            fix: "Your PDF is almost certainly a scan, so there is no text layer to lift — the pages are images. Run it through the OCR PDF tool instead, which reads the letters off those images. A quick way to tell before you start: open the PDF and try to select a word with your cursor. If nothing highlights, it is a scan.",
          },
          {
            problem: "Some pages came back empty and others worked",
            fix: "That is a mixed PDF — a few typed pages plus some scanned ones, which is common when a signed page is scanned back into a digital document. The typed pages extract here; for the scanned ones, run the file through the OCR PDF tool.",
          },
          {
            problem: "I got text back, but it is full of odd symbols",
            fix: "That is a broken font encoding rather than a missing text layer: the characters are there, but the map from them to real letters is wrong, so the extract is technically successful and completely unusable. Convert the pages to images and read them with the OCR PDF tool instead — reading the page visually sidesteps the broken encoding entirely.",
          },
        ],
      },
      features: [
        {
          title: "Keeps Your Reading Order",
          desc: "We don't just dump characters. The tool follows the layout of each page — line by line, page by page — so the text you get back reads in roughly the same order you see on screen, with page breaks marked clearly."
        },
        {
          title: "100% Private, No Upload",
          desc: "The extraction happens on your own device using your browser's PDF engine. Your file never leaves your laptop or phone, so even sensitive documents like offer letters or statements stay completely yours."
        },
        {
          title: "Copy or Download",
          desc: "Once the text is out, grab it however you like — hit Copy to drop it straight into WhatsApp, Word, or an email, or download it as a .txt file to keep or edit later."
        }
      ],
      useCases: [
        "**Students & Researchers:** Pull quotes, definitions, or references out of e-books and papers without retyping a single line.",
        "**Office Work:** Copy a clause from a contract, a paragraph from a report, or figures from a statement into your own document in seconds.",
        "**Question Papers & Notes:** Get the text out of a PDF question paper or notes so you can reformat, translate, or share it.",
        "**Feeding Other Tools:** Need the raw text to paste into a translator, a summarizer, or a word counter? Extract it here first, cleanly."
      ],
      steps: [
        "**Upload your PDF:** Drag and drop the file or tap to select it. It stays on your device.",
        "**Extract:** Click the button and the tool reads the text layer of every page.",
        "**Copy or Download:** Read the extracted text on screen, tap Copy to grab it all, or download it as a .txt file.",
        "**Scanned PDF?** This tool needs a real text layer. If your pages are images, use the [OCR PDF](/ocr-pdf) tool, which reads the words off the page in English or Hindi."
      ],
      faq: [
        {
          q: "Does it work on scanned PDFs?",
          a: "Not this tool — it lifts an existing text layer, and a scan has none. Use the **OCR PDF** tool for scans: it renders each page and reads the letters off the image, in English, Hindi, or both together. Both tools run entirely in your browser, so nothing is uploaded either way."
        },
        {
          q: "Does the formatting (bold, tables, columns) come through?",
          a: "No. This gives you plain text only — no fonts, colours, bold, or table grids. Complex multi-column layouts may also come out in an unexpected order, because PDFs don't always store text the way it looks. It's meant for getting the words out, not recreating the design."
        },
        {
          q: "Is my PDF uploaded anywhere?",
          a: "Never. The whole process runs inside your browser using your device's own power. Your file is never sent to us or any server, so it's safe for private documents."
        },
        {
          q: "Can I extract text from a password-protected PDF?",
          a: "Remove the password first using our Unlock PDF tool (if you know the password), then run the unlocked file through this tool."
        },
        {
          q: "Does it work on mobile?",
          a: "Yes. It works in Chrome, Safari, and other modern browsers on Android and iPhone — no app to install."
        }
      ]
    }
  },
  {
    id: "organize-pdf",
    type: "pdf",
    title: "Organize PDF",
    desc: "Reorder, rotate, and delete PDF pages on one screen.",
    leadIn: "Reorder, rotate, and delete PDF pages on a single screen instead of running the file through three separate tools. See every page as a thumbnail, drag them into order, turn the sideways ones upright, and drop the blank or unwanted ones — then export one clean PDF. Rotations stay with their page, and nothing is uploaded.",
    icon: LayoutGrid,
    color: "orange",
    config: { mode: "organize", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Why Organize PDF Pages Visually?",
        useCases: "When You Need to Reorganize a PDF",
        steps: "How to Organize a PDF Online",
        faq: "Organize PDF FAQs"
      },
      intro: `Some PDFs come out of the scanner or the export button in a mess. Pages in the wrong order. A blank sheet in the middle. One page lying sideways because it was scanned the wrong way. Normally you'd need three separate tools to fix that — one to reorder, one to rotate, one to delete — and you'd run the file through each one in turn.

GoPDFGo's **Organize PDF** tool puts all of that on a single screen. You see every page of your PDF as a thumbnail. **Drag** them into the right order, **rotate** the sideways ones upright, and **remove** the blank or unwanted pages — then export one clean PDF. No going back and forth between tools, no re-uploading between steps.

And like everything on GoPDFGo, it runs **entirely in your browser**. Your pages are rendered and rebuilt on your own device, so even a contract, an answer sheet, or a set of bank statements never gets uploaded to a server.`,
      walkthrough: {
        heading: "A real example: fixing a messy scan in one pass",
        body: `Say a scanner hands you a 12-page document where two pages landed out of order, one came out sideways, and there's a blank separator sheet in the middle. Drop that PDF into Organize PDF and every page appears as a thumbnail on one screen, still on your device — nothing gets uploaded.

Now work straight through it. **Drag** the two stray pages into place; the 'New Position' number on each page updates as you move them, so you can see the running order before you commit. **Rotate** the sideways page 90 degrees until it sits upright, and because each rotation travels with its own page, you can fix the orientation first and reorder afterwards without anything scrambling. **Remove** the blank sheet — it greys out rather than vanishing, so you can restore it right up until you export. When the layout matches what you want, export one clean PDF with the new order, rotations, and deletions all baked in.

If you only need a single change, it's often quicker to [rotate specific pages upright](/rotate-pdf) or [delete the pages you don't want](/delete-pdf-pages) on their own. And when you've just [merged several PDFs into one file](/merge-pdf), this is the natural next step for putting every page in the right place and dropping anything that slipped in by mistake.`,
        troubleshooting: [
          {
            problem: "The thumbnails take a while to appear for a large PDF",
            fix: "Every page is rendered on your own device rather than a server, so a long or heavily scanned file needs a moment to draw all its thumbnails. Give it time on the first load, and close other heavy browser tabs if your device is low on memory. Splitting a very large file into parts first also helps.",
          },
          {
            problem: "I deleted the wrong page",
            fix: "Nothing is final until you export. A removed page stays visible greyed out with a restore option, so bring it back before you download. If you already exported the file, just re-open your original PDF in the tool and organize it again from scratch.",
          },
          {
            problem: "Text on a page still isn't selectable after organizing",
            fix: "Reordering, rotating, and deleting keep the original page content intact, but they can't add text that was never there. If a page came from a scanner it's a flat image, so there is no selectable text to preserve — the organizing worked, the source page simply has none.",
          },
        ],
      },
      features: [
        {
          title: "Everything on One Screen",
          desc: "Reorder, rotate, and delete in the same view. Drag a page to move it, tap to rotate it 90°, tap to remove it. What you see is exactly what your final PDF will look like."
        },
        {
          title: "Rotations Stay With Their Page",
          desc: "Rotate a page and then move it — the rotation travels with the page, not the slot. So you can fix a sideways scan first and reorder afterwards without anything getting scrambled."
        },
        {
          title: "Private, No Upload",
          desc: "Your PDF is opened and rebuilt right inside your browser using your device's own power. Nothing is sent to a server, which matters for personal or confidential documents."
        }
      ],
      useCases: [
        "**Fixing Scanned Documents:** Scanners often produce pages out of order or upside down. Reorder and rotate them into a clean, readable document in one go.",
        "**Removing Blank or Extra Pages:** Delete the blank separator sheets, duplicate pages, or instruction pages you don't want before sharing or printing.",
        "**Assembling Reports & Submissions:** Drag chapters, annexures, or certificates into the exact sequence a college, office, or portal expects.",
        "**Tidying a Merged File:** After combining several PDFs, use this to put every page in the right place and drop anything that slipped in by mistake."
      ],
      steps: [
        "**Upload your PDF:** Drop the file in and every page appears as a thumbnail. It stays on your device.",
        "**Rearrange:** Drag any page to a new position. The 'New Position' number updates as you go.",
        "**Rotate or delete:** Use the buttons on each page to turn it 90° or remove it. Removed pages can be restored until you export.",
        "**Export:** Click the button to download your reorganized PDF, with your new order, rotations, and deletions applied."
      ],
      faq: [
        {
          q: "Can I do everything at once, or one thing at a time?",
          a: "All at once. Reorder, rotate, and delete pages in the same screen in any order you like, then export a single PDF. You don't need separate tools or multiple passes."
        },
        {
          q: "If I rotate a page and then move it, does the rotation stay?",
          a: "Yes. Each page carries its own rotation, so you can rotate first and reorder later — the rotation always stays attached to the correct page."
        },
        {
          q: "Can I get a deleted page back?",
          a: "Yes, until you export. Removed pages are shown greyed out with a restore option, so you can bring one back if you change your mind. Once you download, the deletion is final in that file."
        },
        {
          q: "Are my pages uploaded anywhere?",
          a: "No. The PDF is rendered and rebuilt entirely in your browser on your own device. Nothing is ever sent to a server, so it's safe for private documents."
        },
        {
          q: "Does the text stay selectable after organizing?",
          a: "Yes. Reordering, rotating, and deleting pages keeps the original page content intact, so text inside your PDF stays selectable and searchable."
        }
      ]
    }
  },

  {
    id: "sign-pdf",
    type: "pdf",
    title: "Sign PDF",
    desc: "Draw, type, or upload a signature and place it on your PDF.",
    icon: PenTool,
    color: "orange",
    config: { mode: "sign", accept: ".pdf" },
    info: {
      sectionHeadings: {
        features: "Why Sign PDFs in Your Browser?",
        useCases: "When You Need to Sign a PDF",
        steps: "How to Sign a PDF Online",
        faq: "Sign PDF FAQs"
      },
      intro: `Someone emails you a form, a letter, or an agreement and asks you to "sign and send it back." The old way was painful: print it, sign with a pen, scan it, hope the scan isn't crooked, and email it back. GoPDFGo's **Sign PDF** tool skips all of that. You add your signature to the PDF right on screen and download the signed file — no printer, no scanner, no app.

You can create your signature three ways: **draw** it with your finger or mouse, **type** your name and pick a handwriting style, or **upload** a photo of your real signature. Then just drag it onto the page exactly where it belongs, resize it, and download. The whole thing takes under a minute.

Everything happens **inside your browser** — your document is never uploaded to a server. That matters, because the PDFs people sign are often the sensitive ones: offer letters, rental agreements, consent forms, bank paperwork. With GoPDFGo, your file and your signature stay on your own device.

One honest note: this adds a **visual (ink) signature** — the kind that's perfect for everyday forms, approvals, and letters. It is not a legally certified digital signature (the DSC/PKI kind issued by a certifying authority), so for documents that specifically demand that, you'll need a registered digital signature instead.`,
      walkthrough: {
        heading: "A real example: signing a rental agreement",
        body: `Say a landlord emails you a two-page rental agreement and asks you to sign and send it back. Upload the PDF, then build your signature one of three ways: **draw** it with your finger or mouse, **type** your name and pick a handwriting style, or **upload** a photo of your real signature. A photo sits most naturally when it's a clean, background-removed PNG. Drag the signature onto the line near the bottom of page two, resize it to fit, and download the signed file — no printer, no scanner.

Many agreements also ask you to initial every page. Instead of placing the signature over and over, tick the Place this signature on all pages box (it shows the actual page count, so on a two-pager it reads Place this signature on all 2 pages) and it stamps across the whole document at once. All of this runs inside your browser, so the PDF and your signature never leave your device — which matters for the sensitive stuff like offer letters and bank paperwork. One honest note: this adds a **visual ink signature**, ideal for everyday forms, letters, and approvals, but it is not a certified DSC/PKI signature issued by a certifying authority, so use a registered one where that is specifically demanded.

Once it's signed, you can [shrink the file before emailing](/compress-pdf) if scan-heavy pages make it large. If the agreement arrived as separate files, [combine them into one PDF](/merge-pdf) first, or [reorder the pages](/organize-pdf) before you sign.`,
        troubleshooting: [
          {
            problem: "Your uploaded signature shows a white or grey box around it",
            fix: "The tool places the image exactly as it is, so a plain photo keeps its background. Sign on white paper, take a clear photo, and remove the background so it's a transparent PNG before uploading. It then sits cleanly on the page instead of covering the text underneath.",
          },
          {
            problem: "The signature looks blurry or pixelated when you make it bigger",
            fix: "Every signature ends up as an image, so none of the three modes is infinitely scalable — but a drawn or typed one is generated at a reasonably high resolution, while an uploaded photo is limited to whatever the source file had. Start from a sharp, well-lit image and avoid stretching it much larger than its natural size. If it still looks rough, draw or type the signature instead, which usually gives you more resolution to work with. Start from a sharp, well-lit image and avoid stretching it much larger than its natural size. If it still looks rough, draw or type the signature instead.",
          },
          {
            problem: "It landed on the wrong page or slightly off the signature line",
            fix: "Nothing is committed until you download, so just drag it to reposition or move to the correct page first. Only tick Place this signature on all pages when you genuinely want it everywhere, otherwise it stamps pages you did not mean to sign.",
          },
        ],
      },
      features: [
        {
          title: "Draw, Type, or Upload",
          desc: "Make your signature whichever way suits you — draw it by hand, type your name in a signature-style font, or upload a clean photo of your real signature. You're in control of how it looks."
        },
        {
          title: "Place It Exactly Where You Want",
          desc: "Drag your signature to the right spot on any page and resize it to fit the signature line. What you see on screen is exactly where it lands in the final PDF."
        },
        {
          title: "100% Private",
          desc: "Your PDF and your signature never leave your device. The signing happens entirely in your browser, so even confidential agreements stay completely yours."
        }
      ],
      useCases: [
        "**Forms & Applications:** Sign admission forms, job paperwork, or government forms and send them back without printing.",
        "**Agreements & Contracts:** Add your signature to rental agreements, freelance contracts, or NDAs in seconds.",
        "**Letters & Approvals:** Put a signature on official letters, authorisation notes, or approvals before emailing them.",
        "**Consent & Declaration Forms:** Quickly sign school, medical, or bank consent forms from your phone or laptop."
      ],
      steps: [
        "**Upload your PDF:** Drop in the file you need to sign. It stays on your device.",
        "**Create your signature:** Draw it, type your name in a handwriting style, or upload an image of your signature.",
        "**Place it:** Drag the signature onto the right page and spot, then resize it to fit. Need it on every page? Tick **'Place this signature on all pages'** to sign the whole document at once.",
        "**Download:** Click to add the signature and download your signed PDF."
      ],
      faq: [
        {
          q: "Is this a legally valid digital signature?",
          a: "It adds a visual (ink) signature, which is widely accepted for everyday forms, letters, and approvals. It is not a certified digital signature (DSC/PKI) issued by a certifying authority. If a document specifically requires that kind of signature, you'll need a registered DSC instead."
        },
        {
          q: "Is my document uploaded to a server?",
          a: "No. Your PDF and signature are processed entirely in your browser on your own device. Nothing is ever uploaded, which keeps sensitive agreements private."
        },
        {
          q: "Can I sign on my phone?",
          a: "Yes. You can draw your signature with your finger and drag it into place right on a phone or tablet — no app needed."
        },
        {
          q: "Can I place the signature on any page — or on every page?",
          a: "Both. Move between pages and drop the signature on whichever page needs it, or tick 'Place this signature on all pages' to stamp it on every page at once — handy when you need to initial each page of an agreement."
        },
        {
          q: "What's the best way to upload my real signature?",
          a: "Sign on white paper, take a clear photo, and ideally remove the background so it's a transparent PNG. A clean image sits more naturally on the document, though a normal photo works too."
        }
      ]
    }
  },

  // ==========================================
  // IMAGE TOOLS
  // ==========================================
  {
    id: "compress-jpg",
    type: "image",
    title: "Compress JPG",
    desc: "Reduce JPG size without quality loss.",
    leadIn: "Reduce a JPG's file size for uploads, email, or a faster website — with a live before/after preview so you judge the quality before downloading. Drag the slider for a quick trade-off, or set a target size when a form caps you at a specific KB. The photo is processed right in your browser.",
    icon: Minimize2,
    color: "blue",
    config: { showQuality: true, defaultQuality: 0.8, defaultFormat: "image/jpeg", lockFormat: true, allowBatch: true, accept: ".jpg,.jpeg,image/jpeg" },
    info: {
      sectionHeadings: {
        features: "The Power of Intelligent Compression",
        useCases: "When to Optimize Your JPGs",
        steps: "How to Compress JPG Online",
        faq: "JPG Optimization FAQs"
      },
      // 1. INTRO SECTION (Focus on Speed & Storage)
      intro: `In the digital age, speed is everything. High-resolution photos are beautiful, but they are also heavy. A single 5MB JPG image can slow down your website, clog your email outbox, and eat up your phone's storage in no time. If you are a web developer, a photographer, or just someone trying to send a holiday album to family, you know the struggle of the "File Too Large" error.

GoPDFGo’s **Compress JPG** tool is the ultimate solution to optimize your images instantly — and to shrink a photo or signature under a strict **20KB, 50KB or 100KB** limit for SSC, UPSC, IBPS and other exam forms. We use advanced compression algorithms to significantly reduce the file size of your JPEG photos (often by up to 80%) while maintaining excellent visual quality.

**The GoPDFGo Difference: Client-Side Compression**
Most online compressors work by uploading your photos to a remote server. This is slow and raises privacy concerns—who else is seeing your personal photos?
**We do it differently.** Our tool uses **advanced browser-based technology** to compress images directly inside your browser.
1.  **Maximum Privacy:** Your photos never leave your device. The compression happens on your CPU, not our servers.
2.  **Unbeatable Speed:** Since there is no upload time, you can compress 50 images in the time it takes other sites to upload just one.
3.  **Custom Control:** You decide the balance. Use our quality slider to find the perfect sweet spot between file size and image clarity.

Make your web pages load faster and your emails send instantly with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: a 2 MB photo down under 1 MB",
        body: `Compress JPG gives you two ways to shrink a photo, and the right one depends on why you are compressing. Drag the **quality slider** when you just want a smaller file — the live before/after preview lets you stop the moment the image still looks sharp. In our own test a 2.15 MB JPEG dropped to about 977 KB, well under half, with no obvious change on screen. The tool never hands back a file larger than the one you put in, so you can push the slider without it ever backfiring.

The second mode is **Target Size (KB)**. Pick a preset — 20, 50, 100, 200 or 500 KB — or type your own number, and the tool lowers quality and, if it has to, downscales the image until it lands under that limit. This is the mode for exam and government forms, where many portals cap a photo or signature at a specific KB and reject anything larger. One aggressive pass also strips the EXIF metadata, so the GPS location and camera model your phone baked into the file are gone — a quiet privacy win.

A couple of things worth knowing. This tool only outputs JPEG, so if your source is an iPhone HEIC file, [convert HEIC to JPG first](/heic-to-jpg), and for screenshots saved as PNG reach for [the dedicated PNG compressor](/compress-png) instead. Batch-compressing a set of shots for a single upload? You can [combine the images into one PDF](/image-to-pdf) afterwards.`,
        troubleshooting: [
          {
            problem: "Target Size mode left the photo looking soft or blocky",
            fix: "A very small cap like 20 KB forces heavy quality loss and downscaling on a large image. Crop or resize the photo down to the dimensions the form actually needs first, then the tool has far less to throw away to hit the limit.",
          },
          {
            problem: "The file barely got smaller",
            fix: "It is already a lean, heavily compressed JPEG with little left to remove. Because the tool refuses to output anything bigger than the original, it simply stops rather than bloat the file back up.",
          },
          {
            problem: "The location and camera details vanished after compressing",
            fix: "That is expected. Aggressive compression strips the EXIF metadata, including GPS coordinates and camera model, which is a privacy feature rather than a bug. If you need that data, keep a copy of the original before you compress.",
          },
        ],
      },
      features: [
        {
          title: "Intelligent Lossy Compression",
          desc: "We don't just blur your image. Our smart engine analyzes the texture and colors of your photo to remove metadata and merge similar pixel data that the human eye cannot perceive. The result? A file that is **80% lighter** but looks virtually identical to the original."
        },
        {
          title: "Bulk Batch Processing",
          desc: "Have a folder full of vacation photos or product shots? Don't waste time doing them one by one. Select **multiple JPG files** at once. Our tool processes them sequentially in your browser, allowing you to optimize an entire album in seconds."
        },
        {
          title: "Compress to an Exact KB (Great for Exam Forms)",
          desc: "Switch to **Target Size (KB)** mode and pick a preset — **20, 50, 100, 200, or 500 KB** — or type your own number. The tool automatically lowers quality and, if needed, resizes the image so it lands under that limit. Perfect for SSC, UPSC, IBPS and other government form uploads that demand a photo or signature below a strict size like 20KB or 50KB."
        },
        {
          title: "100% Secure & Private",
          desc: "Security is built into our architecture. Whether you are compressing personal family photos or confidential product prototypes, **no data is ever uploaded**. The processing is local to your device, making it the safest way to compress images online."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Exam & Government Form Photos:** SSC, UPSC, IBPS, NEET and state portals demand a photo or signature under a strict size — often **20KB, 50KB, or 100KB**. Use Target Size mode to hit the exact limit in one click, no photo studio needed.",
        "**Web Development & SEO:** Large images are the #1 killer of website speed. Compressing your JPG assets improves your **Core Web Vitals** scores, leading to better Google rankings and a happier user experience.",
        "**Social Media Uploads:** Platforms like Twitter, Facebook, and Instagram compress your images aggressively, often making them look bad. **Compress them yourself** first to maintain control over the final look while ensuring faster uploads.",
        "**Email Attachments:** Trying to send 10 photos in an email? You will likely hit the 25MB limit. Compress your JPGs to attach **more photos** in a single email without using third-party links.",
        "**Storage Management:** Running out of space on your iPhone or Google Photos? Compressing your image library can recover **gigabytes of free space** without forcing you to delete your precious memories."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select Images:** Click 'Upload' or drag and drop your JPG/JPEG files. You can process multiple images simultaneously.",
        "**Pick a Mode:** Drag the **Quality Slider** for a size-vs-clarity balance, or switch to **Target Size (KB)** and choose 20, 50, 100, 200 or 500 KB (or a custom value) to hit an exact limit.",
        "**Process:** The tool instantly calculates the new file size. You will see the reduction percentage (e.g., '-75%').",
        "**Download:** Click to download your optimized images individually or save them all at once. Your original files remain untouched."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Is there a difference between JPG and JPEG?",
          a: "No. **JPG and JPEG are the same format.** The only difference is the letter count in the extension. Our tool handles both extensions perfectly and treats them as the exact same file type."
        },
        {
          q: "How do I compress a JPG under 20KB or 50KB for an SSC/UPSC form?",
          a: "Switch to **Target Size (KB)** mode and pick 20 KB or 50 KB (or type any number). The tool lowers the quality and, if needed, gently resizes the photo until it fits under that limit — ideal for SSC, UPSC, IBPS, NEET and other online form uploads, while keeping the photo clear and recognisable."
        },
        {
          q: "Will my photos look pixelated or blurry?",
          a: "Not if you stick to the recommended settings (70-80% quality). Our algorithm is designed to remove **invisible data** first. Visual degradation only occurs if you push the compression to extreme levels (like 10-20%)."
        },
        {
          q: "How many images can I compress at once?",
          a: "Unlimited! While other sites limit you to 20 images, GoPDFGo uses your browser's power, so you can batch compress as many files as your computer's RAM can handle."
        },
        {
          q: "Does this remove EXIF data (Location/Camera info)?",
          a: "Yes, to save space and protect your privacy, aggressive compression usually strips metadata like **GPS location** and camera settings. This makes the file lighter and safer to share online."
        },
        {
          q: "Is it safe for private photos?",
          a: "Yes. Each photo is shrunk **by your own device** and never leaves the browser tab, so we cannot see, keep, or sell it — there is simply no copy on our side. Personal pictures and scanned documents stay yours."
        },
        {
          q: "Can I revert the compression?",
          a: "No. Compression involves discarding data to save space. Once downloaded, you cannot 'un-compress' it back to the original quality. We always recommend keeping a copy of your original high-res file."
        }
      ]
    }
  },
  {
    id: "compress-jpeg",
    type: "image",
    title: "Compress JPEG",
    desc: "Reduce JPEG size efficiently.",
    leadIn: "Shrink a heavy JPEG for an upload, an email, or a website — including down to a strict 20 KB, 50 KB, or 100 KB when a form demands it. A quality slider lets you trade size against sharpness with a live preview, and you can process a batch at once. The photo is compressed on your device, never uploaded.",
    icon: Minimize2,
    color: "blue",
    config: { showQuality: true, defaultQuality: 0.8, defaultFormat: "image/jpeg", lockFormat: true, allowBatch: true, accept: ".jpg,.jpeg,image/jpeg" },
    info: {
      sectionHeadings: {
        features: "Why Use Adaptive JPEG Control?",
        useCases: "Best Uses for JPEG Optimization",
        steps: "How to Compress JPEG Online",
        faq: "JPEG Compression FAQs"
      },
      // 1. INTRO SECTION (Focus on "JPEG" specifics & Photography)
      intro: `You have likely noticed that some image files end in ".jpg" while others end in ".jpeg". While they are technically the same format, handling heavy JPEG files can still be a massive headache. A single raw JPEG from a modern DSLR or smartphone can easily exceed 10MB. Whether you are a photographer trying to upload a portfolio, an e-commerce store owner managing product images, or a student submitting scanned notes, file size limits are everywhere.

GoPDFGo’s **Compress JPEG** tool is precision-engineered to shrink these files without ruining their beauty — including down to a strict **20KB, 50KB or 100KB** limit for SSC, UPSC and other exam-form uploads. We understand that JPEG users often care deeply about image quality. That is why our tool provides a **customizable quality slider**, giving you full control over the balance between file size and visual fidelity.

**Why trust GoPDFGo with your JPEGs?**
Unlike standard compressors that blindly crush your images into pixelated messes, our tool uses **Intelligent Perceptual Compression**. It runs directly in your browser on your own device.
1.  **Photographer-Friendly Privacy:** Professional photographers worry about image theft. With GoPDFGo, your high-res originals never touch a server. Processing happens on your machine, protecting your intellectual property.
2.  **Web-Ready Speed:** We optimize JPEGs specifically for faster web loading, helping you pass Google's Core Web Vitals assessments.
3.  **No Limits:** Batch compress unlimited JPEG files instantly.

Shrink your files, not your quality. Experience the safest JPEG compressor online.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: getting a phone photo under 50 KB",
        body: `GoPDFGo compresses a JPEG two ways, and you choose which. Drag the **quality slider** and a live preview updates as you go, so you can trade sharpness against size by eye. Or switch to **Target size** mode and name a strict figure in kilobytes. JPG and JPEG are the same format with a different extension, so this runs the exact same engine as our JPG compressor and treats both identically.

Take a 6 MB photo straight off a phone or DSLR. At around 80% quality it usually drops to a fraction of its original size while still looking crisp on screen — most of what gets removed is data your eye never sees. When a form demands the file sit under a hard limit like 50 KB, Target size mode lowers the quality and, if it has to, gently shrinks the dimensions until the file fits. Re-encoding also strips EXIF metadata such as GPS and camera details at any quality setting, which trims a little more weight and keeps private information out of shared photos. In quality-slider mode the tool never hands back a file bigger than the one you put in, and you can run a whole batch in one pass.

If a photo still will not reach a tiny target while staying clear, [resize the image](/resize) smaller first so the same budget covers fewer pixels. For a website, [converting it to WebP](/convert-webp) usually squeezes further than JPEG. And if you only need part of the frame, [crop it down](/crop) before compressing.`,
        troubleshooting: [
          {
            problem: "The compressed JPEG looks soft or blocky",
            fix: "You have pushed the quality too low, or the target KB is very small for the photo's dimensions. Nudge the slider back toward 70-80%, or resize the image smaller first so the same size budget covers fewer pixels and each one stays sharper.",
          },
          {
            problem: "Target size mode cannot reach a very small number like 20 KB on a large photo",
            fix: "A big image simply holds too many pixels to stay legible at that few KB. Cut the dimensions with Resize Image first, then compress — fewer pixels hit small targets far more cleanly than crushing quality alone.",
          },
          {
            problem: "The output is barely smaller than the original",
            fix: "The file is probably already heavily compressed, so there is little left to remove. Try Target size mode for a firm number. On the quality slider the tool will not return a file larger than your original - if nothing more can be saved it simply hands back the smaller of the two. In Target size mode, pick a number below the current file size, otherwise the re-encode can come out larger.",
          },
        ],
      },
      features: [
        {
          title: "Adaptive Quality Control",
          desc: "You are in control. Use our **precision slider** to choose the exact compression level (0-100%). Want maximum reduction for a thumbnail? Go for 60%. Need high fidelity for a hero banner? Stick to 80-90%. We give you the power to decide."
        },
        {
          title: "Bulk JPEG Processing",
          desc: "Managing a library of thousands of photos? Don't waste time uploading them one by one. Our tool supports **Batch Processing**, allowing you to select multiple JPEG images and optimize them all in a single click, saving you hours of work."
        },
        {
          title: "Zero-Data Retention",
          desc: "We believe your photos belong to you. Because our technology is **Client-Side**, we have no database to store your images. Once you close the tab, your data is gone from the browser's memory forever. It is the ultimate privacy guarantee."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**E-Commerce & Retail:** Online stores with slow-loading product images lose customers. Compressing your JPEGs ensures your **product pages load instantly**, reducing bounce rates and increasing sales conversions.",
        "**Real Estate Listings:** Real estate agents deal with hundreds of high-res property photos. Use this tool to shrink them so they can be easily uploaded to listing portals like **Zillow or MagicBricks** without hitting size limits.",
        "**Photography Portfolios:** Photographers need to showcase their work online without theft risks. Compressing high-res JPEGs reduces the file size enough to deter printing theft while keeping them sharp enough for **digital display**.",
        "**Government & Exam Forms:** SSC, UPSC, IBPS and many official portals ask for a `.jpeg` photo or signature under 50KB. Switch to **Target Size (KB)** mode and pick the exact limit — the tool auto-adjusts quality and, if needed, dimensions to fit."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select JPEGs:** Click 'Upload' or drag your `.jpeg` files into the tool. You can mix `.jpg` and `.jpeg` files; the tool handles both.",
        "**Fine-Tune or Target a Size:** Adjust the **Quality Slider** for a size-vs-quality balance, or switch to **Target Size (KB)** and pick 20, 50, 100, 200 or 500 KB (or a custom value) to hit an exact limit — handy for forms that require a JPEG under 50KB.",
        "**Compress:** The tool instantly recalculates the pixel data to discard invisible details. You will see the new size immediately.",
        "**Download:** Save your optimized JPEGs. You can download them individually or as a bulk ZIP file if supported."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "What is the difference between JPG and JPEG?",
          a: "Technically, **there is no difference**. Older Windows systems required 3-letter extensions (.jpg), while Mac/Unix used 4 letters (.jpeg). Today, they are interchangeable. Our tool works perfectly with both."
        },
        {
          q: "How do I compress a JPEG under 50KB for a government or exam form?",
          a: "Switch to **Target Size (KB)** mode and choose 50 KB (or type any number). The tool lowers the quality and, if needed, resizes the photo until it fits below that limit — ideal for SSC, UPSC, IBPS and other portals that cap the `.jpeg` upload size."
        },
        {
          q: "Will this change my file extension?",
          a: "No. If you upload a `.jpeg` file, you will get a `.jpeg` file back. We respect your original file naming conventions."
        },
        {
          q: "How does JPEG compression work?",
          a: "JPEG is a 'lossy' format. Our tool works by identifying and discarding **high-frequency color information** that the human eye is less sensitive to. This drastically lowers file size with minimal visual impact."
        },
        {
          q: "Is it safe to compress personal photos?",
          a: "Yes. Unlike other sites that upload your photos to a cloud database, GoPDFGo processes everything **locally on your device**. Your family photos or private scans remain strictly in your browser's control."
        },
        {
          q: "Can I use this for print-ready images?",
          a: "For professional printing, we recommend keeping compression minimal (90-95% quality) to avoid artifacts. For screen viewing, 70-80% is usually perfect."
        },
        {
          q: "Why did the file size barely change?",
          a: "If your JPEG was already compressed (e.g., downloaded from WhatsApp or Facebook), it is already optimized. Further compression might yield diminishing returns unless you lower the quality slider significantly."
        }
      ]
    }
  },
  {
    id: "compress-webp",
    type: "image",
    title: "Compress WebP",
    desc: "Reduce WebP file size.",
    leadIn: "Squeeze a WebP image down for a faster-loading website without wrecking its quality — the kilobytes that Core Web Vitals and PageSpeed actually count. Transparency is preserved, and you can optimise a batch of assets in one go. Compression runs in your browser, so nothing is uploaded to a server.",
    icon: Minimize2,
    color: "blue",
    config: { showQuality: true, defaultQuality: 0.8, defaultFormat: "image/webp", lockFormat: true, allowBatch: true, accept: ".webp,image/webp" },
    info: {
      sectionHeadings: {
        features: "Why Optimize Next-Gen WebP?",
        useCases: "Ideal Scenarios for WebP Shrinking",
        steps: "How to Compress WebP Online",
        faq: "WebP Optimization FAQs"
      },
      // 1. INTRO SECTION (Focus on Modern Web & Speed)
      intro: `The internet is evolving, and so are image formats. You likely use WebP because it offers superior quality at smaller file sizes compared to traditional JPGs and PNGs. However, simply using WebP isn't enough. Exporting a WebP image from tools like Photoshop or Canva at 100% quality can still result in bloated files that hurt your website's loading speed. If you care about **Google PageSpeed Insights**, **Core Web Vitals**, or mobile app performance, every kilobyte counts.

GoPDFGo’s **Compress WebP** tool is designed for the modern web. It allows you to squeeze the maximum performance out of your next-gen images. By intelligently adjusting the compression quality, we can often reduce WebP file sizes by an additional **30% to 70%** without any noticeable difference to the human eye.

**Why optimize WebP with GoPDFGo?**
Unlike generic image compressors that treat all files the same, our engine is tuned for WebP's unique algorithms. Plus, the optimisation runs on your own hardware:
1.  **Zero Server Latency:** We don't upload your assets to a slow backend. The optimization happens instantly on your device, right inside your browser.
2.  **Transparency Support:** Unlike JPG compression which turns transparent backgrounds black or white, our tool **preserves the Alpha Channel** (transparency), making it perfect for logos and product cutouts.
3.  **Developer-Grade Privacy:** Working on confidential client assets or unreleased app designs? Keep them safe. Your files never leave your computer.

Maximize your site speed and SEO rankings by serving the lightest possible WebP images.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: slimming a hero image for PageSpeed",
        body: `GoPDFGo re-encodes a WebP through your browser at the quality you choose — the default is **0.8**, a sensible balance for most web images. Because the format stays locked to WebP, you are optimising the same file type rather than converting it, and the alpha channel survives, so logos and product cut-outs keep their transparent background instead of turning white.

Take a hero banner you exported from Canva or Photoshop at full quality. The Quality control starts at 80 percent, so the compressed result appears as soon as the file loads — drag it lower and the size updates live and the new size appears straight away, and the new size appears straight away — a full-quality export usually sheds a good chunk of its weight with no visible change, though an already-optimised WebP may barely move. You can work either way here: stay on By Quality and nudge the slider while the new size updates, or switch to By Target Size, pick a figure such as 100 KB, and the tool searches for the quality that lands under it — those are the kilobytes that Largest Contentful Paint and PageSpeed actually measure. — those are the kilobytes that Largest Contentful Paint and PageSpeed actually measure. Push much below 0.6 and softer edges or gradient banding start to show, so eyeball detailed images before you ship them.

Working on a whole asset folder? Load the batch and each file is processed in turn, right on your device, nothing uploaded. If some sources are still PNG or JPG, [convert them to WebP first](/convert-webp) and then compress, or shrink oversized artwork with the [image resize tool](/resize) before optimising. For flat graphics without transparency, it is worth comparing your result against a [compressed PNG](/compress-png) to see which format ships lighter.`,
        troubleshooting: [
          {
            problem: "The file barely got smaller",
            fix: "Your WebP was probably already optimised — exports from a CDN or a previous compression pass have little left to give. Drag the Quality slider lower and watch the size update; if it still holds steady, you are near the format floor and further squeezing only costs sharpness.",
          },
          {
            problem: "Edges look soft or I see colour banding",
            fix: "Quality is set too low for that image. Photos of skies, gradients and fine text need more headroom, so raise the slider back toward 0.8 or higher. Re-run and compare — the goal is the smallest size where the change stays invisible at normal viewing distance.",
          },
          {
            problem: "The tab slows or stalls on a big batch",
            fix: "Everything runs locally using your device memory, so a large batch of high-resolution assets is demanding. Split the folder into smaller groups, close other heavy tabs, and let each set finish before loading the next instead of dropping hundreds of files at once.",
          },
        ],
      },
      features: [
        {
          title: "Transparency Preservation",
          desc: "Unlike JPG, WebP fully supports transparency, a crucial feature for modern web design. Our compression engine is smart enough to reduce the file size of the image data **without destroying the transparent background**. This makes it ideal for compressing stickers, logos, and UI elements."
        },
        {
          title: "Core Web Vitals Boost",
          desc: "Heavy images are the main cause of poor **LCP (Largest Contentful Paint)** scores. By shrinking your WebP headers and banners with our tool, you directly improve your website’s performance metrics, which is a crucial ranking factor for Google SEO."
        },
        {
          title: "Batch Asset Optimization",
          desc: "Developing a new website or app? You likely have folders full of assets. Don't waste time on single uploads. Drag and drop **dozens of WebP files** at once. Our tool will process them sequentially in your browser, ready for deployment."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Web Developers & SEO:** Speed is money. Compressing WebP images ensures your site loads instantly on 4G mobile networks, lowering bounce rates and improving your **Google Search Rankings**.",
        "**Mobile App Development:** APK and IPA file sizes matter. Compressing your app's WebP assets reduces the download size for users, leading to **more installs** and fewer uninstalls due to storage concerns.",
        "**E-Commerce Stores:** Product images need to be sharp but fast. Use our tool to compress thousands of product thumbnails so your customers can browse your catalog without waiting for images to load.",
        "**Digital Marketing:** Ad banners and email graphics often have strict file size limits (e.g., Google Ads < 150KB). Switch to **Target Size (KB)** mode to force your WebP creative under the exact cap without compromising visual impact."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select WebP Files:** Click 'Upload' or drag your `.webp` images into the dashboard. Batch processing is supported.",
        "**Set Quality or Target Size:** Use the slider to control quality (**80%** is great for web), or switch to **Target Size (KB)** and pick 20, 50, 100, 200 or 500 KB to force each file under an exact limit.",
        "**Analyze:** Watch as the tool recalculates the file size instantly. You will see the new size and the percentage saved.",
        "**Download:** Save your optimized WebP files. They are now ready to be uploaded to your CMS, app, or server."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Why compress WebP if it is already small?",
          a: "WebP is efficient, but design tools often export them with unnecessary metadata and excessive quality settings (100%). Dropping quality slightly (to 85% or 80%) can reduce file size by half without the user noticing."
        },
        {
          q: "Will I lose transparency (transparent background)?",
          a: "No. Unlike JPG compression, our WebP compressor **fully supports and preserves the alpha channel**. Your logos and cutouts will remain transparent."
        },
        {
          q: "Is WebP supported on all browsers?",
          a: "Yes. All modern browsers (Chrome, Safari, Edge, Firefox) fully support WebP. It is the industry standard for modern web performance."
        },
        {
          q: "Can I process confidential assets?",
          a: "Yes. Because the optimisation runs **on your own machine**, an unreleased design or an NDA-covered asset is never uploaded anywhere. You can compress a whole folder of client images without a single one leaving your computer."
        },
        {
          q: "How does this affect image quality?",
          a: "WebP uses 'predictive coding' to compress images. Our tool optimizes this prediction model. At 80% quality, the visual difference is usually imperceptible, but the file size savings are massive."
        },
        {
          q: "Can I convert other formats to WebP here?",
          a: "This specific tool is for **compressing** existing WebP files. To convert JPG or PNG to WebP, please use our separate 'Convert to WebP' tool found in the menu."
        }
      ]
    }
  },
  {
    id: "compress-png",
    type: "image",
    title: "Compress PNG",
    desc: "Reduce PNG file size while keeping transparency.",
    leadIn: "Actually shrink a PNG — not just re-save it. PNG is lossless, so basic tools barely change the size; this one quantises the colours to cut the file properly while keeping sharp edges and transparent backgrounds intact. Use Target size mode to hit a specific KB, all processed on your own device.",
    icon: Minimize2,
    color: "blue",
    config: { showQuality: true, defaultQuality: 0.8, defaultFormat: "image/png", lockFormat: true, allowBatch: true, accept: ".png,image/png" },
    info: {
      sectionHeadings: {
        features: "Why Our PNG Compressor Is Different",
        useCases: "Best Times to Compress a PNG",
        steps: "How to Compress PNG Online",
        faq: "PNG Compression FAQs"
      },
      intro: `Need to **Compress PNG** files that are far too heavy? PNG is a fantastic format for logos, screenshots, and graphics with sharp edges or transparent backgrounds — but that quality comes at a cost: PNG files are often 5–10× larger than a JPG of the same image. A single UI screenshot or a transparent logo can easily balloon past 1MB, slowing down your website and clogging up email and upload forms.

Here is the catch most "PNG compressors" hide: PNG is a **lossless** format, so simply re-saving it (which is all a basic tool does) barely changes the size. GoPDFGo does it properly. Our tool uses **smart colour quantization** — the same technique behind pngquant and TinyPNG — to intelligently reduce the number of colours in the image to a carefully chosen palette. Your eyes barely notice the difference, but the file gets **up to 80% smaller**, and the **transparent background is fully preserved**.

And like every GoPDFGo tool, it runs **entirely in your browser**. Your screenshots, designs, and ID images are never uploaded to any server — the whole thing happens on your own device.`,
      walkthrough: {
        heading: "A real example: a heavy screenshot cut down to a fraction of its size",
        body: `PNG is a lossless format, so simply re-saving it barely changes the size — that is the trick most PNG compressors quietly rely on. GoPDFGo does it properly. It uses **colour quantization** to remap the image's colours down to a smaller, carefully chosen palette, which cuts the file substantially while keeping sharp edges and any transparent background fully intact.

Take a heavy PNG screenshot. The quality slider starts at 80%, so quantization is already doing its job the moment you load the file: a screenshot at that setting typically drops well over half, often in the 40-80% range, with no obvious change on screen. Drag the slider lower for a smaller file. Push it to the very top and the image stays lossless, so it hardly shrinks at all — that is expected, and easing it down a notch is where the real savings begin. Need to meet a hard cap? Switch to Target size mode and the tool trims the palette, gently resizing only if it has to, to get as close to your KB limit as it can without wrecking the image. You can select a whole set of files and compress them in one batch, and every image is processed on your own device.

A couple of pointers on picking the right tool. For an actual photograph, PNG is the wrong format — [compress it as a JPG instead](/compress-jpg), which is almost always far smaller. If those screenshots are headed for a web page, [convert the PNG to WebP](/convert-webp) for an even lighter file. And when you are gathering several shots for one upload, [combine the images into a single PDF](/image-to-pdf) once they are compressed.`,
        troubleshooting: [
          {
            problem: "The PNG barely got smaller",
            fix: "At the very top of the quality slider the image is kept lossless, and that is just how PNG works — there is almost nothing to remove. Ease the slider down so colour quantization can remap the palette; that is where the real reduction happens.",
          },
          {
            problem: "Colours look banded or patchy after compressing",
            fix: "Quantization maps many colours onto a smaller palette, which can show as banding on smooth gradients or photo-like images. Raise the quality so the palette keeps more colours, or if the source is really a photograph, compress it as a JPG instead where gradients hold up better.",
          },
          {
            problem: "Target size mode left the image soft or fuzzy",
            fix: "A very small cap forces the tool to shrink the pixel dimensions once palette reduction alone cannot reach the limit. Raise the target, or crop and resize the PNG to the size the form actually needs first, so it has far less to throw away.",
          },
        ],
      },
      features: [
        {
          title: "Real Compression, Not Just Re-Saving",
          desc: "Because PNG is lossless, a plain re-save saves almost nothing. Our engine uses **colour quantization** to map millions of colours down to an optimised palette, cutting file size by **40–80%** while keeping edges crisp. Slide the quality control to balance size against colour fidelity."
        },
        {
          title: "Transparency Fully Preserved",
          desc: "Compressing a logo, sticker, or cut-out? The **alpha channel (transparency) stays intact**, so your PNG keeps its see-through background and drops onto any design cleanly — just much lighter."
        },
        {
          title: "Target Size Mode & 100% Private",
          desc: "Need a PNG under an exact limit? Switch to **Target Size (KB)** mode and the tool shrinks toward your cap automatically. Everything runs in your browser on your own device — no PNG is ever uploaded to a server."
        }
      ],
      useCases: [
        "**Faster Websites:** Heavy PNG logos, icons, and hero graphics slow your pages and hurt Core Web Vitals. Compress them to load instantly without losing sharpness or transparency.",
        "**Screenshots & Documentation:** Screenshots save as huge PNGs. Shrink them before adding to a blog, PDF, presentation, or a bug report so they upload and load quickly.",
        "**Logos & Design Assets:** Send lighter transparent logos and UI assets to clients or teammates, or bundle them into an app without bloating the download size.",
        "**Form & Portal Uploads:** Some portals accept PNG but cap the size at 100KB or 200KB. Use Target Size mode to fit the exact limit while keeping the image readable."
      ],
      steps: [
        "**Select PNG Files:** Click 'Upload' or drag and drop your PNG images. You can compress several at once.",
        "**Pick a Mode:** Drag the **Quality slider** to balance size and colour detail, or switch to **Target Size (KB)** and choose a cap like 100 KB to hit an exact limit.",
        "**Process:** The tool quantizes the colours in your browser and shows the new size and how much you saved (e.g. -76%).",
        "**Download:** Save your lighter PNG — with its transparency intact. Your original files stay untouched."
      ],
      faq: [
        {
          q: "How can you compress a PNG when PNG is lossless?",
          a: "We use **colour quantization** — the same approach as pngquant and TinyPNG. Instead of storing millions of colours, the image is remapped to a smaller, carefully chosen palette. The result looks almost identical but is dramatically smaller. It is technically 'lossy', but for logos, screenshots, and graphics the difference is usually invisible."
        },
        {
          q: "Will the transparent background be kept?",
          a: "Yes. The alpha channel is fully preserved, so transparent logos and cut-outs stay transparent after compression."
        },
        {
          q: "How do I compress a PNG under 100KB or 200KB?",
          a: "Switch to **Target Size (KB)** mode and pick or type your limit. The tool reduces the colour palette (and, if needed, gently resizes) to land under that size — handy for forms and portals with strict caps."
        },
        {
          q: "PNG or JPG — which should I use for a photo?",
          a: "For **photographs**, JPG is almost always smaller — use our Compress JPG tool for those. PNG shines for **logos, screenshots, text, and anything needing transparency**, which is exactly what this tool is built to compress."
        },
        {
          q: "Is my PNG uploaded anywhere?",
          a: "Never. The entire compression runs inside your browser using your device's own processor. Your images are never sent to or stored on any server."
        },
        {
          q: "Why did my PNG barely shrink at the highest quality?",
          a: "At the top of the slider we keep the image lossless, which barely changes the size (that is just how PNG works). Lower the quality a little to let colour quantization kick in — that is where the big savings come from."
        }
      ]
    }
  },
  {
    id: "resize",
    type: "image",
    title: "Resize Image",
    desc: "Change image dimensions and resolution.",
    leadIn: "Resize an image to exact pixel dimensions — a 400×400 profile picture, a 200×230 passport photo, or any custom width and height. Lock the aspect ratio to avoid stretching, or tap a preset for common sizes. Everything runs on your own device, with no watermark and nothing uploaded.",
    icon: Maximize2,
    color: "blue",
    config: { showResize: true, showFormat: true, defaultQuality: 0.9, allowBatch: false },
    info: {
      sectionHeadings: {
        features: "Why Use Pixel-Perfect Resizing?",
        useCases: "When Do You Need Exact Dimensions?",
        steps: "How to Resize an Image Online",
        faq: "Image Resizing FAQs"
      },
      // 1. INTRO SECTION (Focus on Precision & Social Media)
      intro: `Have you ever tried to upload a profile picture only to be told it needs to be exactly 400x400 pixels? Or tried to post a photo on Instagram, but it got awkwardly cropped because the dimensions were wrong? In the digital world, **one size does not fit all**. Every platform—from Facebook headers to passport application portals—demands specific image dimensions.

GoPDFGo’s **Resize Image** tool gives you total control over your photo’s geometry. Whether you need to scale down a massive wallpaper to fit your blog post or resize a logo for an email signature, our tool allows you to change width and height with **pixel-perfect precision**.

**The Privacy Advantage:**
Resizing often involves personal photos or sensitive documents like signatures. Unlike other editors that upload your file to a server to process it, GoPDFGo uses **Browser-Based Resizing**.
1.  **Zero Uploads:** Your image never leaves your computer. The resizing math happens on your own CPU.
2.  **No Quality Drop:** We use advanced resampling algorithms (like Bicubic interpolation) to ensure that shrinking an image doesn't make it jagged, and scaling it doesn't make it blurry.
3.  **Instant Feedback:** Type in your new width, and see the dimensions update instantly without page reloads.

Stop struggling with complex software like Photoshop. Resize your images instantly and securely right here.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: a phone photo into a 400x400 profile picture",
        body: `Say you have a photo straight off your phone and a site that wants a **400x400** profile picture. That photo is several thousand pixels on each side — far bigger than the slot needs. Tap the **Profile 400x400** preset (or **Passport 200x230**, **HD 1280x720**, **Square 1080**, or just type your own width and height), then click **Apply Changes** and download. For a picture that is already square, that is the whole job.

The catch is that a phone photo is usually a tall rectangle, not a square. With **Lock aspect ratio** on, setting the width to 400 leaves the height taller than 400, so you never get a true 400x400. Turn the lock off and you do get exactly 400x400 — but the face looks squashed. The clean fix is to [crop the photo to a square first](/crop), then resize that square down to 400x400 with the lock on, so nothing distorts. If the photo came off an iPhone as a HEIC file, [convert it to JPG first](/heic-to-jpg) so the resizer can open it.

Resizing also changes format on the way out: load a PNG and save the smaller copy as a JPG to shed weight, or keep it as PNG to protect a transparent background. Fewer pixels means a smaller file on its own, but if a form still caps the upload in kilobytes, run the result through [Compress JPG](/compress-jpg) to land under the limit.`,
        troubleshooting: [
          {
            problem: "The resized photo looks stretched or squashed.",
            fix: "You forced a rectangular image into a different shape — usually a square target with Lock aspect ratio turned off. Crop the image to the shape you need first, then resize with the lock on so the proportions stay correct.",
          },
          {
            problem: "I typed new dimensions but the image did not change.",
            fix: "Entering a width and height only sets the target. You have to click Apply Changes to actually redraw the image at the new size before you download it.",
          },
          {
            problem: "My transparent PNG came out with a white background.",
            fix: "You saved it as a JPG, and JPG cannot store transparency. Choose PNG as the output format instead and the transparent background is preserved.",
          },
        ],
      },
      features: [
        {
          title: "Lock Aspect Ratio",
          desc: "The biggest mistake in resizing is stretching or squashing an image, making people look wide or thin. Our tool includes a smart **Aspect Ratio Lock**. When you change the width, we automatically calculate the correct height to ensure your image retains its original proportions perfectly."
        },
        {
          title: "High-Quality Resampling",
          desc: "We don't just delete pixels. Our engine uses **Bicubic Resampling** to smooth out edges when you make an image smaller (downscaling) and preserves details as much as possible when you make it larger (upscaling). This ensures professional-looking results every time."
        },
        {
          title: "Format Flexibility",
          desc: "Resize and convert in one go. You can upload a PNG and download the resized version as a JPG to save space, or vice versa. We support all major formats including **JPG, PNG, and WebP**, giving you complete flexibility for any platform."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Social Media Graphics:** Every platform has strict rules. Resize your photos to **1080x1080** for Instagram posts, **1200x630** for Facebook links, or **2560x1440** for YouTube channel art to ensure they look perfect on all devices.",
        "**E-Commerce Listings:** Amazon, Flipkart, and Shopify require product images to be at least **1000 pixels wide** for their zoom features to work. Use our tool to standardize all your product shots to the correct resolution.",
        "**Exam & Official Documents:** Applying for SSC, UPSC, IBPS, NEET, a visa or a passport? These forms demand your photo and signature at exact dimensions — a photo is often around **200×230 px** and a signature around **140×60 px** (always check your form's own notification). Type the exact numbers here with zero privacy risk.",
        "**Web Performance:** Don't make your website load a 4000-pixel image in a 300-pixel box. Resizing images to their **display size** significantly improves page load speed and Google Core Web Vitals scores."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Upload Image:** Select the photo you want to resize. We support JPG, PNG, and WebP.",
        "**Enter Dimensions:** Type your desired **Width** or **Height** in pixels. If 'Lock Aspect Ratio' is on, the other number updates automatically.",
        "**Apply:** Click the **'Resize'** button. Our engine instantly redraws the image at the new resolution.",
        "**Download:** Save your perfectly sized image. You can also choose the output format (e.g., save as PNG or JPG)."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "What does 'Lock Aspect Ratio' mean?",
          a: "It links the width and height together. If you change one, the other changes automatically to keep the image shape correct. Turning this off lets you stretch the image freely, but it might look distorted."
        },
        {
          q: "Does resizing reduce file size?",
          a: "Yes! If you make an image smaller (e.g., from 4000px to 800px), the file size drops dramatically because there are fewer pixels to store. It is a great way to optimize images for the web."
        },
        {
          q: "Can I make small images larger?",
          a: "Yes, you can upscale images, but be careful. Adding pixels that didn't exist before can make the image look soft or blurry. Our tool uses smoothing algorithms to minimize this, but original quality is always best."
        },
        {
          q: "Is it safe to resize personal photos?",
          a: "Absolutely. Resizing happens **entirely on your device** — no file is transferred, so there is no copy for anyone to see or store. A passport photo or a family picture is resized and handed straight back to you."
        },
        {
          q: "How do I resize for Instagram?",
          a: "For a standard square post, set the width and height to **1080 x 1080** pixels. For a portrait post, use **1080 x 1350**. Our tool lets you type these exact numbers."
        },
        {
          q: "How do I resize a photo and signature for an SSC or UPSC form?",
          a: "Turn off 'Lock Aspect Ratio' if your form needs an exact width and height, then type the required pixels — many exam portals expect a photo around **200×230 px** and a signature around **140×60 px**, but the exact size is always listed in your official notification. Resize it here, then use our Compress JPG tool to bring it under the KB limit if needed."
        },
        {
          q: "Will this remove transparency?",
          a: "If you upload a transparent PNG and resize it as a PNG, transparency is **preserved**. If you convert it to JPG during resizing, the background will become white."
        }
      ]
    }
  },
  {
    id: "crop",
    type: "image",
    title: "Crop Image",
    desc: "Trim unwanted outer areas from photos.",
    leadIn: "Crop a photo down to just what matters — cut out a photobomber, trim empty sky, or remove clutter from a product shot. Drag the visual selector to re-frame the image and download the tighter version. No Photoshop, no upload — the crop happens right in your browser.",
    icon: CropIcon,
    color: "blue",
    config: { showVisualCrop: true, allowBatch: false },
    info: {
      sectionHeadings: {
        features: "Advantages of Local Image Cropping",
        useCases: "When to Trim Your Photos",
        steps: "How to Crop an Image Online",
        faq: "Cropping Tool FAQs"
      },
      // 1. INTRO SECTION (Focus on Composition & Privacy)
      intro: `Want to **crop an image** down to just what matters? We take hundreds of photos, but rarely is the raw shot perfect. Maybe there is a stranger photobombing the background, too much empty sky above your subject, or clutter on the desk that ruins a professional product shot. Often, the best picture is hiding *inside* the bigger picture. You need a tool to **trim the fat** and focus on what matters.

GoPDFGo’s **Crop Image** tool is the simplest and safest way to re-frame your photos online. Forget complicated desktop software like Photoshop just for a simple cut. Our intuitive **Visual Editor** allows you to draw a box over the area you want to keep and discard the rest instantly.

**Why Crop Locally in Your Browser?**
Cropping often involves personal photos—your selfies, family pictures, or documents. Uploading these to an unknown server for editing is a privacy risk.
**GoPDFGo solves this:**
1.  **100% Private Editing:** Your image never leaves your device. The cropping engine runs right here in your browser using your CPU. We cannot see or store your photo.
2.  **Zero Quality Loss:** Unlike resizing, cropping does not stretch or compress pixels. It simply removes the outer edges, ensuring the remaining part of your image retains its original crispness.
3.  **Instant Results:** No upload bars, no download queues. The edit happens immediately.

Take control of your photo's composition and create the perfect frame with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: cropping a selfie into a square profile picture",
        body: `GoPDFGo crops entirely in your browser with a visual selector, so there are no numbers to guess at. You open a photo, then click and drag a box over the part you want to keep. Everything outside the box dims so you can see exactly what will be removed, and small handles on the corners and sides let you nudge the edges until the frame is right.

Take a rectangular phone selfie you want to use as a square profile picture. Drag a box around your face, grab a corner handle, and pull until the width and height look roughly equal, then apply the crop and download. Because cropping only discards the outer pixels, the part you keep stays at its original sharpness — nothing is stretched or re-compressed. That is the real difference from [resizing an image](/resize), which scales the whole photo up or down instead of cutting anything away.

The same move tightens a cluttered product shot or trims a photobomber out of the edge of a frame. Cropped photos are often headed somewhere with a size limit, so once you have the framing you want you can [compress the JPG](/compress-jpg) to shrink the file, or [convert it to a lossless PNG](/convert-png) if you plan to keep editing it. The tool works on JPG, PNG, and WebP, and your image never leaves your device.`,
        troubleshooting: [
          {
            problem: "The crop box will not lock to a perfect square",
            fix: "There is no numeric aspect-ratio lock — drag the corner handles and watch the box until the width and height look equal. For a profile picture, eyeball a square frame around your subject before you apply.",
          },
          {
            problem: "The cropped image is still a fairly large file",
            fix: "Cropping removes the outer pixels but a high-resolution photo can still be heavy. Run the trimmed image through the compress tool afterwards to bring the file size down.",
          },
          {
            problem: "I trimmed off too much and want it back",
            fix: "Once you apply and download, the removed areas are gone from that new file. Your original on disk is untouched, so open it again and draw a wider crop box.",
          },
        ],
      },
      features: [
        {
          title: "Intuitive Visual Editor",
          desc: "No guesswork with numbers. Our tool provides an interactive interface where you can **click and drag a selection box** directly over your image. Grab the corners to refine your selection precisely. What you see inside the box is exactly what you get."
        },
        {
          title: "Master Your Composition",
          desc: "Good photography is about what you leave out. Use our crop tool to apply the **Rule of Thirds**, remove distracting background elements, center your subject, or tighten the frame to create a more impactful and professional-looking image."
        },
        {
          title: "Secure & Private Cropping",
          desc: "Editing personal photos should not mean sharing them with the world. Because the cropping is done by your own machine, your photos remain on your computer or phone throughout the entire editing process. It's as safe as editing offline."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Social Media Profile Pics:** LinkedIn, Instagram, and WhatsApp require square or circular profile photos. Crop your rectangular selfies into a perfect square to ensure your face is centered and not awkwardly cut off.",
        "**E-Commerce & Product Photos:** Selling online? Use crop to **remove messy backgrounds** and zoom in tightly on the product you are selling. A clean, focused image significantly increases buyer confidence.",
        "**Removing Distractions:** Captured a great moment but there's an ugly trash can or a random person in the frame? Simply **trim the edges** to cut them out and save the photo.",
        "**Preparing for Print:** Trying to fit a photo into a specific frame size (like 8x10)? Crop the image to the correct aspect ratio before sending it to the printer to avoid unwanted white borders."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Upload Photo:** Select the image you want to edit. JPG, PNG, and WebP are supported.",
        "**Draw Selection:** Click on the image and drag your mouse to create a cropping box. The area outside the box turns darker to show what will be removed.",
        "**Refine Edges:** Grab the small handles on the corners or sides of the box to adjust the exact area you want to keep.",
        "**Crop & Download:** Click the **'Apply Crop'** button to finalize the cut, then download your new, perfectly framed image."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Does cropping lower the image quality?",
          a: "No. Cropping is a **non-destructive** process to the remaining pixels. We simply remove the outer pixels you don't want. The area you keep retains 100% of its original quality and sharpness."
        },
        {
          q: "Can I undo the crop if I make a mistake?",
          a: "While editing, yes, you can adjust the box freely. However, once you click 'Apply' and download the file, the removed areas are gone from that new file. Always keep your original photo safe!"
        },
        {
          q: "What is the difference between Crop and Resize?",
          a: "**Cropping** cuts away parts of the image to change the composition or aspect ratio. **Resizing** shrinks or stretches the *entire* image to make the file smaller or larger without cutting anything out."
        },
        {
          q: "Is it safe to crop private photos here?",
          a: "Yes. The crop is applied **by your browser** and the trimmed image saved straight back to your disk, so the photo never reaches a server. Whatever you cut out — a background, a document edge — stays on your device."
        },
        {
          q: "How do I crop into a perfect square?",
          a: "Use the visual editor to drag the corner handles until the width and height numbers show the same value (or look visually square). This is perfect for Instagram or profile pictures."
        },
        {
          q: "Does this work on mobile touchscreens?",
          a: "Yes! Our crop tool is touch-friendly. You can use your fingers to draw and adjust the crop box easily on your Android or iPhone."
        }
      ]
    }
  },
  {
    id: "convert-webp",
    type: "image",
    title: "To WebP",
    desc: "Convert images to the modern WebP format.",
    leadIn: "Convert JPG, PNG, or JPEG images into WebP — Google's modern format that is typically 25–35% smaller at the same quality, so pages load faster. Transparency is carried over, and you can convert a whole batch at once. Everything runs on your device, with nothing uploaded.",
    icon: RefreshCw,
    color: "blue",
    config: { showFormat: true, defaultFormat: "image/webp", lockFormat: true, allowBatch: true, accept: ".jpg,.jpeg,.png,.gif,.bmp,image/jpeg,image/png,image/gif,image/bmp" },
    info: {
      sectionHeadings: {
        features: "Why Upgrade to WebP Format?",
        useCases: "Best Uses for WebP Conversion",
        steps: "How to Convert to WebP Online",
        faq: "WebP Conversion FAQs"
      },
      // 1. INTRO SECTION (Focus on Modern Web Standards & Speed)
      intro: `Need to **convert an image to WebP**? Is your website loading slowly? Are your high-quality PNGs and JPGs taking up too much storage space? It is time to upgrade to the future of digital imagery. **WebP** is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web.

GoPDFGo’s **Convert to WebP** tool allows you to transform your legacy image files (JPG, PNG, JPEG) into the next-generation WebP format instantly. Why does this matter? Because WebP images are typically **25% to 35% smaller** than comparable JPGs and PNGs while maintaining the exact same visual quality.

**The GoPDFGo Advantage: Client-Side Conversion**
Many developers and designers hesitate to use online converters because of privacy risks or slow upload speeds.
**We solve this with Browser-Based Technology:**
1.  **Instant Transformation:** We don't upload your files to a server queue. The conversion logic runs inside your browser, turning your images into WebP files instantly.
2.  **Privacy Guaranteed:** Your unreleased designs, personal photos, or client assets never leave your computer.
3.  **Transparency Support:** Unlike converting to JPG (which loses transparency), converting a PNG to WebP with our tool **preserves the transparent background** while drastically reducing the file size.

Make the switch to WebP today and watch your digital assets become lighter and faster.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: a transparent logo and a batch of photos",
        body: `GoPDFGo re-encodes each image into WebP right in your browser, and the target format is locked to WebP, so there is no format to choose — just an optional quality slider if you want to trade size against detail. Take a transparent PNG logo sitting at a few hundred kilobytes. Drop it in and it comes back as WebP with the **transparent background intact** — no white box behind it — usually noticeably smaller, though how much depends on the artwork. Every file you add is queued and converted on your own device, with nothing uploaded to a server.

Got a folder of JPG product shots instead? Select the whole **batch** at once and each one is re-encoded in turn, typically shedding 25-35% at the same visible quality. The conversion is lossy, though, so the new pixels are not byte-for-byte identical to the source — keep your originals if you might re-edit later. Accepted inputs include JPG, PNG, JPEG, GIF and BMP, so most of a mixed folder just works.

If a converted file is still heavier than you want, run it through the [WebP compressor](/compress-webp) — the quality slider there squeezes the WebP down further without changing format again. Shooting on an iPhone? You can [turn HEIC photos straight into WebP](/heic-to-webp) in a single pass instead of converting twice. And if an older upload portal refuses WebP, just [convert the file back to JPG](/convert-jpg).`,
        troubleshooting: [
          {
            problem: "The converted WebP looks soft or shows blocky artifacts",
            fix: "WebP conversion is lossy by default, so heavily re-encoding a file that was already compressed several times can smear fine detail. Start from the highest-quality original you have — not a screenshot or a re-saved copy — and the WebP stays crisp.",
          },
          {
            problem: "The WebP came out the same size or larger than the source",
            fix: "This happens when the input is already tightly optimised or is a simple flat-colour graphic that PNG and JPG handle efficiently. WebP wins most on photos and detailed images; for a tiny icon the old format can already be smaller, so keep whichever file is actually lighter.",
          },
          {
            problem: "A website or upload portal will not accept the WebP file",
            fix: "Some older uploaders and submission forms still accept only JPG or PNG. Nothing is wrong with the file itself — run it through the To JPG tool and submit that copy instead.",
          },
        ],
      },
      features: [
        {
          title: "Superior Compression Efficiency",
          desc: "WebP is the future. It uses advanced predictive coding to create files that are significantly lighter than older formats. By converting your gallery to WebP, you save massive amounts of bandwidth and storage without sacrificing a single pixel of quality."
        },
        {
          title: "Preserve Transparency (Alpha)",
          desc: "Need a transparent logo or product cutout but hate the heavy file size of PNGs? WebP is the solution. Our tool converts PNGs to WebP while **keeping the transparent background intact**, giving you the quality of PNG at a fraction of the size."
        },
        {
          title: "Bulk Batch Conversion",
          desc: "Updating an entire website or photo library? You don't have to do it one by one. Select **multiple JPG or PNG files** and drag them into GoPDFGo. Our engine will convert them all to WebP sequentially in seconds, ready for deployment."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Boost SEO & Page Speed:** Google explicitly recommends using 'Next-Gen Formats' like WebP. Converting your site images helps you pass **Core Web Vitals** tests, improving your Largest Contentful Paint (LCP) score and search rankings.",
        "**Mobile App Optimization:** App size is a critical metric for downloads. Converting your app's assets (icons, backgrounds, splash screens) to WebP can significantly **reduce your APK/IPA size**, leading to more user installs.",
        "**E-Commerce Performance:** Online stores with thousands of product images can save gigabytes of bandwidth costs. WebP images load faster on mobile data, ensuring your customers can browse and buy without lag.",
        "**Design & Archiving:** Designers can convert high-res PNG drafts into WebP to share **lightweight previews** with clients via email or chat apps without hitting file size limits."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Upload Images:** Click 'Select Images' or drag and drop your current files (JPG, PNG, JPEG, etc.). Batch selection is supported.",
        "**Auto-Convert:** The tool automatically sets the target format to **WebP**. Our engine immediately begins re-encoding the image data.",
        "**Review:** You will see the new files appearing in the list. Notice how the conversion happens instantly without waiting for uploads.",
        "**Download:** Click to download your new WebP files. You can now use them on any modern website or app."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Is WebP supported by all browsers?",
          a: "Yes! As of today, **all modern browsers** including Chrome, Safari, Firefox, Edge, and Opera fully support WebP images. It is the industry standard for modern web development."
        },
        {
          q: "How much space will I save?",
          a: "On average, converting a PNG to WebP reduces file size by **26%**, and converting a JPG to WebP saves about **25-34%**, all while maintaining comparable visual quality."
        },
        {
          q: "Will I lose transparency from my PNGs?",
          a: "No. Unlike JPG, which turns transparent areas white, **WebP fully supports transparency**. You get the best of both worlds: the small size of a compressed format and the transparency of a PNG."
        },
        {
          q: "Is it safe to convert private images?",
          a: "Yes. The re-encoding to WebP is done **by your own computer** inside the browser window; the images are never sent to an external service. Private or client-owned pictures stay entirely with you."
        },
        {
          q: "Can I convert WebP back to JPG later?",
          a: "Yes. If you ever need the legacy format back, simply use our **'Convert to JPG'** tool to switch the file back."
        },
        {
          q: "Does this affect image quality?",
          a: "WebP is designed to be highly efficient. While it is technically a 'lossy' conversion (unless lossless mode is used), the visual difference is usually **imperceptible to the human eye**, even though the file size drops dramatically."
        }
      ]
    }
  },
  {
    id: "convert-jpg",
    type: "image",
    title: "To JPG",
    desc: "Convert PNG, WebP, and others to JPG.",
    leadIn: "Convert almost any image — PNG, WebP, HEIC, TIFF, BMP — into JPG, the format every portal and old device accepts. Transparent areas are filled cleanly instead of turning black, and the result is much smaller than a PNG. Convert one image or a batch, all inside your browser.",
    icon: RefreshCw,
    color: "blue",
    config: { showFormat: true, defaultFormat: "image/jpeg", lockFormat: true, allowBatch: true, accept: ".png,.webp,.gif,.bmp,image/png,image/webp,image/gif,image/bmp" },
    info: {
      sectionHeadings: {
        features: "Why Standardize to JPEG?",
        useCases: "When to Switch Formats",
        steps: "How to Convert to JPG Online",
        faq: "JPG Conversion FAQs"
      },
      // 1. INTRO SECTION (Focus on Compatibility & Standardization)
      intro: `In the vast world of digital images, there are dozens of formats—PNG, WebP, HEIC, TIFF, BMP—but there is only one true king of compatibility: **JPG (JPEG)**. Have you ever tried to upload a photo to a government portal, only to be rejected because it was a "PNG"? Or tried to open a modern "WebP" file on an old computer, only to see an error message?

GoPDFGo’s **Convert to JPG** tool is your universal adapter. It instantly transforms almost any image format into the globally accepted standard: JPEG. Whether you are dealing with heavy PNG screenshots, modern WebP downloads, or complex TIFF files, our tool standardizes them into a format that works on **every device, every browser, and every software** created in the last 30 years.

**The Privacy-First Converter:**
Most converters force you to upload your files to the cloud. This takes time and puts your data at risk.
**GoPDFGo uses Browser-Based Conversion:**
1.  **Instant Processing:** Since there is no upload wait time, you can convert dozens of images in seconds.
2.  **Smart Flattening:** Converting a transparent PNG? Our smart engine automatically replaces the transparent background with a clean **white background**, ensuring your image looks perfect.
3.  **100% Secure:** Your personal photos, scanned documents, and screenshots remain on your device. We convert them locally using your browser’s power.

Stop worrying about "File Format Not Supported" errors. Switch to JPG with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: a PNG a portal keeps rejecting",
        body: `GoPDFGo takes a common image — a PNG, WebP, GIF or BMP — and re-encodes it as JPG, the one format almost every upload portal and older program will accept. The detail that trips up other converters is transparency. JPG has no concept of a see-through pixel, so when your PNG logo or screenshot has transparent areas, GoPDFGo fills them with **white** rather than black, which is the usual bug that leaves ugly dark boxes behind the image.

Say a job or government portal rejects your screenshot because it is a PNG and it only takes JPG. Drop the file in here and it comes back as a JPG that uploads cleanly — and usually much smaller, since JPG discards data that PNG stores losslessly. Got a whole folder of mixed PNG and WebP downloads? Select them all and get JPGs back in one batch. Every file is converted on your own device, so nothing is sent to a server.

Photos straight off an iPhone arrive as HEIC, which this picker does not take — use the dedicated [HEIC to JPG converter](/heic-to-jpg) for those. If your new JPG is still over a size cap, [compress the JPG](/compress-jpg) afterward. And when the portal actually wants a document rather than a picture, [turn the image into a PDF](/image-to-pdf) instead.`,
        troubleshooting: [
          {
            problem: "The transparent background on my PNG came out solid white.",
            fix: "JPG cannot store transparency at all, so some fill is unavoidable. White is chosen because it is the safe neutral for portal photos and documents. If you need the transparency kept, leave the file as PNG or convert it to WebP instead.",
          },
          {
            problem: "Fine text or sharp lines look slightly soft or blocky in the JPG.",
            fix: "JPG is a lossy format tuned for photographs, so hard-edged graphics and screenshots can show faint artefacts. For crisp text you may prefer to keep the PNG; for a portal upload the softening is usually invisible at normal zoom.",
          },
          {
            problem: "My iPhone HEIC or a TIFF will not select in the file picker.",
            fix: "This page accepts PNG, WebP, GIF and BMP. For Apple's HEIC photos use the dedicated HEIC to JPG tool, which is built to read that format directly.",
          },
        ],
      },
      features: [
        {
          title: "Universal Compatibility",
          desc: "JPG is the universal language of digital images. From a 1990s Windows PC to the latest iPhone 15, and from Microsoft Word to professional printing services—**JPG works everywhere**. Converting your files ensures you never face a compatibility issue again."
        },
        {
          title: "Intelligent Transparency Handling",
          desc: "JPG does not support transparency. So what happens to your transparent PNG logos? Our tool intelligently **'flattens' the image**, filling transparent areas with a pure white background. This prevents your graphics from turning into broken black boxes."
        },
        {
          title: "Massive Size Reduction",
          desc: "PNGs are 'lossless' and heavy. Converting a photograph from PNG to JPG often reduces the file size by **50% to 80%** without a noticeable drop in visual quality. This is perfect for freeing up storage space or sending photos via email."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Official Applications:** Most online forms (Visa, Passport, Job Applications) specifically demand **'.jpg' or '.jpeg'** files. Use this tool to ensure your documents meet these strict technical requirements immediately.",
        "**Printing Services:** Many professional printers and photo labs struggle with WebP or HEIC files. Converting your photos to JPG ensures that the colors print correctly and the software recognizes the file.",
        "**Legacy Software Support:** Trying to import an image into older software (like an old version of Photoshop, Word, or PowerPoint)? They often fail to read modern formats. A quick conversion to JPG fixes the issue instantly.",
        "**Sharing & Storage:** Screenshots saved as PNGs are often unnecessarily large (2MB+). Converting them to JPG can shrink them to 200KB, making them much faster to share on WhatsApp or Slack."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select Images:** Click 'Upload' or drag and drop your files. You can upload PNG, WebP, BMP, or other supported formats.",
        "**Auto-Convert:** The tool automatically sets the target format to **JPG/JPEG**. You don't need to configure complex settings.",
        "**Process:** Our browser engine re-encodes the image data instantly. Transparent backgrounds are filled with white.",
        "**Download:** Click to save your new JPG files. You can now open them on any device without compatibility errors."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "What happens to the transparent background in my PNG?",
          a: "Since the JPG format does not support transparency, our tool automatically fills the transparent areas with **White**. This ensures your logo or object remains visible and looks clean."
        },
        {
          q: "Is there a difference between converting and renaming?",
          a: "Yes! Simply renaming 'photo.png' to 'photo.jpg' creates a corrupted file. You must use a **Converter Tool** like GoPDFGo to actually re-encode the internal data structure so the computer can read it as a JPG."
        },
        {
          q: "Will the quality decrease?",
          a: "JPG is a 'lossy' format, so technically yes, some data is discarded to save space. However, our converter uses **High-Quality** settings, so the visual difference is usually impossible to spot with the naked eye."
        },
        {
          q: "Can I convert multiple files at once?",
          a: "Yes. You can select a batch of mixed files (e.g., 5 PNGs and 3 WebPs) and convert them all to JPG in a single click using our **Batch Processing** feature."
        },
        {
          q: "Is it safe for personal photos?",
          a: "Yes. Each image is converted to JPG **on your device** and written back locally — nothing goes to the cloud. So converting a personal photo or a scanned ID exposes it to no one but you."
        },
        {
          q: "Why convert WebP to JPG?",
          a: "While WebP is modern, many older image viewers, email clients, and upload portals still don't support it. Converting to JPG ensures your image can be viewed by **100% of users**."
        }
      ]
    }
  },
  {
    id: "convert-png",
    type: "image",
    title: "To PNG",
    desc: "Convert JPG and WebP to PNG format.",
    leadIn: "Convert a JPG or WebP into PNG when quality matters more than size — a logo, a screenshot, a graphic with sharp text or lines. PNG is lossless, so every pixel is preserved with no compression blur, and transparency is kept. Convert one image or a batch, processed entirely on your device.",
    icon: RefreshCw,
    color: "blue",
    config: { showFormat: true, defaultFormat: "image/png", lockFormat: true, allowBatch: true, accept: ".jpg,.jpeg,.webp,.gif,.bmp,image/jpeg,image/webp,image/gif,image/bmp" },
    info: {
      sectionHeadings: {
        features: "Benefits of Lossless PNGs",
        useCases: "When Quality Matters Most",
        steps: "How to Convert to PNG Online",
        faq: "PNG Conversion FAQs"
      },
      // 1. INTRO SECTION (Focus on Quality & Graphics)
      intro: `Need to **convert an image to PNG**? Have you ever saved a logo or a screenshot as a JPG, only to see it become blurry, pixelated, or surrounded by "noise" artifacts? That is the price of compression. When quality matters more than file size, there is only one clear winner: **PNG (Portable Network Graphics)**.

GoPDFGo’s **Convert to PNG** tool is the ultimate solution for preserving visual fidelity. Whether you have a compressed JPG photograph or a modern WebP graphic, our tool transforms it into the **Lossless PNG format**. This means every single pixel is preserved exactly as it is, with zero quality degradation. It is the gold standard for designers, photographers, and anyone who refuses to compromise on clarity.

**Why choose GoPDFGo for PNG conversion?**
While many online converters are slow and insecure, we hand the conversion to your own device to offer a superior experience:
1.  **Pixel-Perfect Accuracy:** We re-encode your images into PNG without adding any compression artifacts. We guarantee 100% visual fidelity in the final output.
2.  **Privacy Guaranteed:** Your high-value assets (like brand logos or legal scans) never leave your computer. The conversion happens locally in your browser.
3.  **Modern Format Support:** Easily convert newer formats like WebP (or older ones like BMP) into the universally supported PNG standard.

Stop settling for blurry JPEGs. Upgrade your images to crystal-clear PNGs instantly.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: turning a WebP logo into a clean PNG",
        body: `GoPDFGo re-encodes your JPG or WebP into **PNG**, a lossless format, so nothing is thrown away in the save. The output is fixed to PNG here — you drop files in and get PNGs back. There is no quality setting to choose for a single image, and if a Batch Quality slider shows up when you convert several files at once, it makes no difference to the result: PNG encoding is lossless either way. It reads JPG, WebP, GIF and BMP, and you can convert a single file or a whole batch entirely on your device.

Say you downloaded a company logo as a WebP but your slide software or a print shop only accepts PNG. Drop it in, convert, and you get a PNG that opens everywhere — and if that WebP had a transparent background, the transparency is kept, so the logo still sits cleanly on any background. Screenshots and diagrams with fine text are the other big win: PNG holds letters and thin lines razor-sharp instead of smearing them the way JPG does.

One honest limit: converting a JPG to PNG cannot undo blur that is already baked in. PNG stops any *further* loss as you keep editing and re-saving, but it will not rescue detail a lossy JPG has already discarded. And because PNG keeps every pixel, the files run large — that is normal. If size becomes a problem, [shrink the PNG afterwards](/compress-png), or [convert it back to JPG](/convert-jpg) for uploads with a tight cap. Need transparency going the other way? [Export to WebP](/convert-webp) instead.`,
        troubleshooting: [
          {
            problem: "The PNG is much bigger than the JPG or WebP I started with",
            fix: "That is expected — PNG is lossless, so it stores every pixel instead of discarding data to save space. If the size is a problem, run the result through Compress PNG, or convert to JPG when a portal enforces a small limit.",
          },
          {
            problem: "My JPG still looks blurry after converting it to PNG",
            fix: "PNG cannot restore detail a JPG already threw away; it only prevents new loss from here on. Convert from the highest-quality or original source you have, not from a JPG that was already heavily compressed.",
          },
          {
            problem: "I converted a JPG but the background did not turn transparent",
            fix: "A plain JPG has no transparency to keep, so converting cannot create it — you would need a background remover for that. Converting a WebP or GIF that already has a transparent area will preserve that transparency in the PNG.",
          },
        ],
      },
      features: [
        {
          title: "Lossless Compression",
          desc: "Unlike JPG, which deletes data to save space, PNG is a **lossless format**. When you convert a file to PNG using our tool, it ensures that not a single detail is lost during the saving process. This is critical for archiving images or editing them repeatedly."
        },
        {
          title: "Text & Line Clarity",
          desc: "JPGs are terrible for text—they make letters look fuzzy (compression artifacts). PNGs are perfect for **screenshots, documents, and diagrams** because they keep sharp edges sharp. Use our tool to make your text-heavy images readable again."
        },
        {
          title: "Secure Batch Conversion",
          desc: "Need to convert a folder of 50 product shots or design assets? Don't do it manually. Our **Batch Processing** feature lets you drag and drop multiple files at once and convert them all to high-quality PNGs in seconds, safely on your device."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Professional Design:** PNG is the industry standard for delivering razor-sharp, lossless visuals. Convert your draft JPGs to PNG to prevent 'generation loss' (quality dropping every time you save the file).",
        "**Technical Documentation::** Screen captures are often packed with fine print, intricate icons, and subtle interface details. Converting them to PNG ensures that every button and letter remains **razor-sharp and readable**, unlike the blurry mess of a JPG.",
        "**Digital Archiving:** If you are digitizing old family photos or important documents, save them as PNG. This ensures the digital copy is an **exact replica** of the original without any compression noise added.",
        "**Web Overlays:** While this tool converts *to* PNG, moving to PNG prepares your assets for future transparency work, as PNG is the standard format for web graphics that require a transparent background."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select Files:** Click 'Upload' or drag your JPG, WebP, or BMP files into the box. You can process multiple files simultaneously.",
        "**Auto-Detect:** The tool identifies the input format and prepares the **PNG encoder**. No complex settings are required.",
        "**Convert:** Click the button to start. Our engine re-maps the pixels to the PNG lossless standard instantly.",
        "**Download:** Save your new high-quality images. You will notice they might be larger in file size—that means the quality is being preserved!"
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Why is the PNG file size larger than JPG?",
          a: "Quality has a weight. JPG deletes data to make the file small (lossy). **PNG keeps all the data** to keep the image perfect (lossless). If you need the best quality, the larger file size is worth it."
        },
        {
          q: "Will this tool create a transparent background?",
          a: "Converting a solid JPG to PNG does **not** automatically remove the background (you need a background remover for that). However, it *does* save the file in a format that supports transparency for future editing."
        },
        {
          q: "Is PNG better than WebP?",
          a: "For quality? They are comparable. For compatibility? **PNG is better**. Every piece of software created in the last 25 years can open a PNG, whereas some older tools still struggle with WebP."
        },
        {
          q: "Is it safe to convert private scans?",
          a: "Yes. A scanned ID or contract is converted to PNG **inside your browser** and saved straight back to you; no copy is uploaded or kept. The tool never sees the contents of what you convert."
        },
        {
          q: "Can I print PNG files?",
          a: "Absolutely. PNGs are excellent for printing because they do not suffer from the 'compression blocks' that appear in low-quality JPG prints. Your printed documents will look sharp and professional."
        },
        {
          q: "Can I convert multiple formats at once?",
          a: "Yes. You can drag in a mix of JPGs, WebPs, and BMPs. Our tool will standardize them all into high-quality PNG files in a single batch."
        }
      ]
    }
  },
  {
    id: "heic-to-jpg",
    type: "image",
    title: "HEIC to JPG",
    desc: "Convert iPhone HEIC photos to JPG, PNG, or WebP.",
    leadIn: "Convert iPhone HEIC photos into JPG so they actually open everywhere — job portals, college forms, Windows, websites that reject HEIC. Pick JPG for universal compatibility, or PNG/WebP if you prefer, and convert a whole batch at once. Your photos are decoded on your device and never leave your browser.",
    icon: ImageDown,
    color: "blue",
    config: {
      showFormat: true,
      defaultFormat: "image/jpeg",
      defaultQuality: 0.9,
      allowBatch: true,
      accept: ".heic,.heif,image/heic,image/heif"
    },
    info: {
      sectionHeadings: {
        features: "Why Convert HEIC in Your Browser?",
        useCases: "When You Need to Convert HEIC Photos",
        steps: "How to Convert HEIC to JPG Online",
        faq: "HEIC to JPG FAQs"
      },
      intro: `Need to **convert HEIC to JPG**? You took a photo on your iPhone, went to upload it somewhere — a job portal, a college form, a website, your Windows laptop — and it just wouldn't open. Or it uploaded but nobody else could see it. The culprit is almost always the same: **HEIC**, the format iPhones save photos in by default.

HEIC (High Efficiency Image Container) is genuinely clever — it keeps photos sharp while using roughly half the space of a JPG. The catch is that most of the world hasn't caught up. Android phones, Windows, a lot of government and exam portals, and countless websites still expect a plain old **JPG**. So an iPhone photo that looks perfect on your phone becomes a headache the moment it leaves it.

GoPDFGo's **HEIC to JPG** tool fixes that in seconds. Drop in your iPhone photos and get back universal **JPG, PNG, or WebP** files that open and upload anywhere. And because everything runs **inside your browser**, your photos are never uploaded to a server — which matters, because the photos you're converting are often personal ones.`,
      walkthrough: {
        heading: "A real example: getting an iPhone photo onto a job portal",
        body: `GoPDFGo decodes your HEIC or HEIF photo on your own device and re-encodes it to the format you pick. The default is **JPG at high quality**, which is the sweet spot for almost every photo — visually the same as the original, but a file that opens and uploads anywhere. You can switch the output to PNG or WebP, though for forms, portals, and sharing, plain JPG is the safe choice. Dropping in a whole folder of iPhone shots works too; you get them back as a single ZIP.

Take a photo you need to attach to a job application. It looks perfect on your phone, but your Windows laptop won't preview it and the portal rejects the .heic upload. Drop it here, leave the format on JPG, convert, and you get a file every uploader accepts. If that portal also enforces a size cap, run the result through [Compress JPG](/compress-jpg). If the form wants a single document instead of separate images, send your converted photos through [Image to PDF](/image-to-pdf), or [resize them to the required dimensions](/resize) first.

Most HEIC files convert cleanly, but a few won't decode in the browser — usually Live Photos and some HDR or 10-bit HEIC files. When one fails, the reliable fix is on the phone: open the photo, tap Share, and export it as JPG, or set your iPhone camera to Most Compatible so new shots save as JPG from the start.`,
        troubleshooting: [
          {
            problem: "A photo failed to convert or came out blank",
            fix: "It is very likely a Live Photo or an HDR/10-bit HEIC that the browser cannot decode. Open it on your iPhone, tap Share, and export it as a JPG, or set Settings > Camera > Formats to Most Compatible and re-export.",
          },
          {
            problem: "The portal still rejects the converted file",
            fix: "It is probably enforcing a size or dimension limit, not a format one. Shrink the JPG with Compress JPG or resize it smaller, then upload the lighter file.",
          },
          {
            problem: "My file ends in .heif, not .heic — will it work?",
            fix: "Yes. The tool accepts both .heic and .heif, which are the same underlying format. Drop it in and convert exactly the same way.",
          },
        ],
      },
      features: [
        {
          title: "JPG, PNG, or WebP — Your Choice",
          desc: "Pick the format you actually need. **JPG** for forms, portals, and sharing (smallest, most compatible). **PNG** when you want the cleanest possible quality. **WebP** for fast-loading websites. One tool, all three outputs."
        },
        {
          title: "Your Photos Never Leave Your Device",
          desc: "Most HEIC converters upload your private photos to their servers. We don't. The conversion happens right here in your browser using your own device, so your personal pictures stay completely private."
        },
        {
          title: "Convert a Whole Batch at Once",
          desc: "Got a folder full of iPhone photos? Drop them all in together and download the converted JPGs as a single ZIP. No converting them one painful file at a time."
        }
      ],
      useCases: [
        "**Uploading to Forms & Portals:** Job applications, exam registrations, and government sites that reject HEIC will happily accept the JPG version.",
        "**Sharing with Android & Windows Users:** Send photos that your friends, family, or colleagues can actually open, instead of a file their device doesn't recognise.",
        "**Posting Online:** Many websites, CMS uploaders, and marketplaces only accept JPG or PNG — convert first, upload without errors.",
        "**Editing & Printing:** Most photo editors and print shops want a JPG or PNG. Convert your iPhone shots so any software or printer can use them."
      ],
      steps: [
        "**Add your HEIC photos:** Drag and drop one or many iPhone photos, or tap to select them. They stay on your device.",
        "**Choose a format:** Pick JPG (most compatible), PNG (best quality), or WebP (smallest for web).",
        "**Convert:** The tool decodes the HEIC and re-encodes it to your chosen format, right in your browser.",
        "**Download:** Save a single converted photo, or grab the whole batch as a ZIP."
      ],
      faq: [
        {
          q: "What is a HEIC file and why won't it open?",
          a: "HEIC is the high-efficiency format iPhones use to save photos in less space. The problem is that Android, Windows, and many websites and portals don't support it yet, so the file refuses to open or upload. Converting it to JPG solves this instantly."
        },
        {
          q: "Will I lose quality converting HEIC to JPG?",
          a: "The difference is invisible to the eye. We decode the full-quality HEIC and re-encode it at a high quality setting. If you want zero compression at all, choose PNG instead of JPG."
        },
        {
          q: "Are my photos uploaded to a server?",
          a: "No. Everything happens inside your browser on your own device. Your photos are never sent to us or anyone else, which makes this safe for personal pictures."
        },
        {
          q: "Can I convert many photos at once?",
          a: "Yes. Drop in as many HEIC files as you like and download them all together as a ZIP. Larger batches take a little longer on older phones, since the decoding happens on your device."
        },
        {
          q: "A few of my photos failed to convert. Why?",
          a: "Some special HEICs — like iPhone Live Photos or certain 10/12-bit images — can't always be decoded in the browser. If one fails, the easiest fix is to open it on your iPhone and use Share or export it as a JPG, or try the others."
        }
      ]
    }
  },
  {
    id: "heic-to-png",
    type: "image",
    title: "HEIC to PNG",
    desc: "Convert iPhone HEIC photos to lossless PNG.",
    leadIn: "Convert iPhone HEIC photos into lossless PNG — the right choice when you plan to edit the image afterwards. Unlike JPG, PNG throws away nothing, so you keep a pixel-perfect copy with no compression blur, ready to retouch or drop into a design. The conversion runs in your browser, so nothing is uploaded.",
    icon: ImageDown,
    color: "blue",
    config: {
      showFormat: true,
      defaultFormat: "image/png",
      defaultQuality: 0.92,
      allowBatch: true,
      accept: ".heic,.heif,image/heic,image/heif"
    },
    info: {
      sectionHeadings: {
        features: "Why Convert HEIC to PNG?",
        useCases: "When PNG Is the Right Choice",
        steps: "How to Convert HEIC to PNG Online",
        faq: "HEIC to PNG FAQs"
      },
      intro: `Converting **HEIC to PNG**? When you convert an iPhone photo, the format you pick decides what you can do with it afterwards. **PNG** is the one to choose when quality is the priority. Unlike JPG, PNG is **lossless** — it doesn't throw away any image data to save space, so what you get is a pixel-perfect copy of the original HEIC, with no compression blur, no blocky artifacts, nothing lost.

That matters the moment you plan to **edit** the photo. Every time a JPG is opened, edited, and re-saved, it loses a little more quality. A PNG doesn't. So if you're going to retouch the image, drop it into a design, crop it repeatedly, or keep it as a clean master copy, PNG is the safer format. It's also the format virtually every image editor, design tool, and document app accepts without complaint.

GoPDFGo's **HEIC to PNG** converter does this **entirely in your browser** — your photos are decoded and saved on your own device and never uploaded anywhere. The trade-off to know up front: because PNG keeps everything, the files are larger than JPG. If your goal is simply to upload to a form or share quickly, JPG is lighter; if it's quality you're after, PNG wins.`,
      walkthrough: {
        heading: "A real example: prepping an iPhone photo to edit",
        body: `GoPDFGo decodes your iPhone HEIC and re-encodes it to PNG right in the browser, so the photo is never uploaded. Because PNG is **lossless**, you get a pixel-perfect copy of the original — no compression blur, no blocky artifacts, nothing discarded. That is the whole reason to pick PNG over JPG: the moment you plan to **edit** the image.

Take a photo you want to retouch. Convert it to PNG, open it in your editor, crop it repeatedly, tweak the colours and re-save — the quality holds, because PNG does not lose a little more each time it is saved the way JPG does. Working through a camera roll? Drop in many HEIC files at once and download the whole batch as a ZIP. The trade-off to expect: a PNG is noticeably larger than the same photo as JPG, since keeping every pixel costs space.

If you only need a light file to upload to a form, [convert HEIC to JPG instead](/heic-to-jpg) — it is far smaller. If you do want PNG but the size is awkward, [shrink it with the PNG compressor](/compress-png) after editing, or [crop it down to just the part you need](/crop) first. One honest limit: some HEICs — Live Photos and certain HDR or 10-bit shots — cannot always be decoded in-browser.`,
        troubleshooting: [
          {
            problem: "A few photos fail to convert",
            fix: "Live Photos and some HDR or 10-bit HEICs cannot always be decoded in the browser. On your iPhone, open the photo and use Share to export it as a JPG, On your iPhone, open the photo and use Share to export it as a JPG, then work from that copy. Switching Camera to Most Compatible only changes future shots, and those are saved as JPG already, so they never need this converter..",
          },
          {
            problem: "The PNG is much bigger than the original HEIC",
            fix: "That is expected — HEIC is heavily compressed and PNG is lossless, so it keeps every pixel. If you are not editing the image, JPG is far lighter. If you need PNG, run it through the PNG compressor after you finish editing.",
          },
          {
            problem: "A large batch is slow or the phone heats up",
            fix: "All decoding happens on your own device, so big batches take longer on older phones. Convert in smaller groups so each batch finishes sooner, and leave the tab open until the downloads appear.",
          },
        ],
      },
      features: [
        {
          title: "Truly Lossless",
          desc: "PNG stores every pixel exactly as it was in the original HEIC. No compression, no quality drop, no artifacts — ideal when the image will be edited or printed and you can't afford any loss."
        },
        {
          title: "Edit-Friendly Everywhere",
          desc: "PNG is the universal currency of image editors and design tools. Convert once and your iPhone photo will open cleanly in Photoshop, Canva, GIMP, Figma, Word, or anything else."
        },
        {
          title: "Private, In Your Browser",
          desc: "The HEIC is decoded and re-saved as PNG on your own device. Nothing is sent to a server, so even personal or work photos stay completely private."
        }
      ],
      useCases: [
        "**Editing & Retouching:** Keep full quality through multiple edits — PNG won't degrade each time you save, unlike JPG.",
        "**Design & Graphics Work:** Drop your iPhone photos into Canva, Figma, or Photoshop in a format they handle perfectly.",
        "**Archiving Master Copies:** Store a clean, lossless version of an important photo that you can always re-export from later.",
        "**Crisp Documents:** When a photo has fine text, lines, or detail that must stay sharp, PNG preserves it better than JPG."
      ],
      steps: [
        "**Add your HEIC photos:** Drag and drop one or many iPhone photos, or tap to select. They stay on your device.",
        "**PNG is preselected:** The tool is already set to output lossless PNG (you can switch to JPG or WebP if you change your mind).",
        "**Convert:** Your HEIC is decoded and re-saved as a pixel-perfect PNG in your browser.",
        "**Download:** Save a single PNG, or grab the whole batch as a ZIP."
      ],
      faq: [
        {
          q: "Is PNG better than JPG for HEIC photos?",
          a: "It depends on your goal. PNG is lossless, so it's better when you'll edit, print, or archive the photo and want zero quality loss. JPG makes much smaller files and is better for quick sharing or uploading to forms. Choose PNG for quality, JPG for size."
        },
        {
          q: "Why is my PNG file larger than the HEIC?",
          a: "HEIC is a highly compressed format, while PNG is lossless and stores every pixel without compression. That extra quality means a bigger file. If size matters more than perfect quality, convert to JPG instead."
        },
        {
          q: "Does converting to PNG lose any quality?",
          a: "No. PNG is lossless, so the conversion keeps the full quality decoded from your HEIC. Nothing is thrown away."
        },
        {
          q: "Are my photos uploaded anywhere?",
          a: "Never. Everything runs inside your browser on your own device, so your photos are never sent to us or any server."
        },
        {
          q: "Can I convert many HEIC files to PNG at once?",
          a: "Yes. Drop in as many as you like and download them together as a ZIP. Big batches take a little longer on older phones since the decoding happens on your device."
        }
      ]
    }
  },
  {
    id: "heic-to-webp",
    type: "image",
    title: "HEIC to WebP",
    desc: "Convert iPhone HEIC photos to lightweight WebP for the web.",
    leadIn: "Convert iPhone HEIC photos into WebP when they are headed for a website — a blog, a store, a portfolio. WebP looks as good as JPG or PNG while weighing noticeably less, so pages load faster and rank better. Transparency is supported, and the whole conversion happens on your device.",
    icon: ImageDown,
    color: "blue",
    config: {
      showFormat: true,
      defaultFormat: "image/webp",
      defaultQuality: 0.85,
      allowBatch: true,
      accept: ".heic,.heif,image/heic,image/heif"
    },
    info: {
      sectionHeadings: {
        features: "Why Convert HEIC to WebP?",
        useCases: "When WebP Is the Right Choice",
        steps: "How to Convert HEIC to WebP Online",
        faq: "HEIC to WebP FAQs"
      },
      intro: `Converting **HEIC to WebP**? If your iPhone photos are headed for a **website** — a blog, an online store, a portfolio, a CMS — then **WebP** is the format built for the job. WebP is Google's modern image format, and its whole purpose is to look as good as JPG or PNG while weighing **significantly less**. Smaller images mean pages that load faster, and faster pages mean happier visitors and better Google rankings (page speed is a real ranking signal).

The problem WebP solves is specific: a raw iPhone HEIC won't display on most websites at all, and a converted JPG, while compatible, is often heavier than it needs to be. WebP gives you web-ready images that are both **universally supported by modern browsers** and noticeably lighter — frequently 25–35% smaller than the same JPG at comparable quality.

GoPDFGo's **HEIC to WebP** converter runs **entirely in your browser**, so your photos are never uploaded to a server. If you're a blogger, a small-business owner adding product shots, or a developer optimising a site, this turns your iPhone photos into fast-loading web images in seconds. (Sharing with a friend or uploading to a form instead? Plain JPG is the safer pick there.)`,
      walkthrough: {
        heading: "A real example: putting iPhone photos on a blog",
        body: `Say you have shot a dozen photos on your iPhone for a new post, and they all landed as HEIC files. A raw HEIC will not display on most websites, so it needs converting — and for anything headed to a page, WebP is the format built for it. WebP usually weighs noticeably less than a JPG of similar visual quality, so your pages load faster.

Drop the whole set in at once. **WebP is preselected**, and a quality slider lets you trade sharpness against size — 85% for a single photo, 80% for a batch — both of which keep photos sharp while staying light., which keeps photos sharp while staying light. Every file is decoded and re-encoded on your device — nothing is uploaded. Convert, then download a single file or grab the entire batch as a ZIP. WebP also supports transparency, so if a source file does carry an alpha channel it survives the conversion, which a JPG cannot do.

One catch: the HEIC decoder can stumble on Live Photos and some HDR shots. If a file refuses to convert, open it on your iPhone and export it as a JPG first, then bring that in. Aiming for a genuinely fast page? Convert first, then [resize the WebP for the web](/resize) one file at a time, or [shrink existing WebP files further](/compress-webp)., or [shrink existing WebP files further](/compress-webp). Sharing with a friend or uploading to a form instead? [Convert them to JPG](/heic-to-jpg) for the widest compatibility.`,
        troubleshooting: [
          {
            problem: "A photo refuses to convert or throws an error.",
            fix: "It is usually a Live Photo or an unusual 10/12-bit HEIC that the browser decoder cannot read. Open the photo on your iPhone, export or save it as a JPG, then convert that file instead.",
          },
          {
            problem: "The WebP file gets rejected by a form, email, or an older app.",
            fix: "WebP is built for websites, not universal sharing. For those uses, switch the output format to JPG in the tool, or use the HEIC to JPG converter, which nearly every app accepts.",
          },
          {
            problem: "A large batch is slow or seems to hang on an older phone.",
            fix: "Decoding runs entirely on your device, so big batches take longer on older hardware. Convert in smaller groups and give each set a moment to finish rather than reloading the tab.",
          },
        ],
      },
      features: [
        {
          title: "Built for Fast Websites",
          desc: "WebP files are typically 25–35% smaller than JPG at similar quality. Lighter images load faster, improve Core Web Vitals, and help your pages rank — exactly what you want for web photos."
        },
        {
          title: "Modern Quality & Transparency",
          desc: "WebP keeps your photos looking sharp at a smaller size, and unlike JPG it also supports transparency — a genuinely modern format for the web."
        },
        {
          title: "Private, In Your Browser",
          desc: "Your HEIC is decoded and re-encoded to WebP on your own device. Nothing is uploaded, so your photos stay yours."
        }
      ],
      useCases: [
        "**Blog & Website Images:** Add iPhone photos to your posts and pages as fast-loading WebP files.",
        "**E-Commerce Product Shots:** Lighter product images mean a quicker store and a smoother buying experience.",
        "**Web Performance & SEO:** Cut image weight to improve page speed and Core Web Vitals scores.",
        "**Developers & Designers:** Generate optimised WebP assets for sites and apps straight from iPhone photos."
      ],
      steps: [
        "**Add your HEIC photos:** Drag and drop one or many, or tap to select. They stay on your device.",
        "**WebP is preselected:** The tool is already set to output WebP (switch to JPG or PNG anytime).",
        "**Convert:** Your HEIC is decoded and re-encoded as a lightweight WebP in your browser.",
        "**Download:** Save a single WebP, or grab the whole batch as a ZIP."
      ],
      faq: [
        {
          q: "Is WebP supported everywhere?",
          a: "All modern browsers — Chrome, Edge, Firefox, Safari, and their mobile versions — support WebP, which is why it's the standard for web images today. For emailing a photo or uploading to an older form, though, JPG is still the safest choice."
        },
        {
          q: "Why choose WebP over JPG for iPhone photos?",
          a: "WebP files are usually 25–35% smaller than JPG at the same quality, so they make web pages load faster and help SEO. For website use, WebP wins; for universal sharing, JPG is more compatible."
        },
        {
          q: "Does WebP lose quality?",
          a: "WebP uses smart compression to stay small while looking sharp. At the default quality the difference is hard to notice, and you can raise the quality slider if you want it even closer to the original."
        },
        {
          q: "Are my photos uploaded anywhere?",
          a: "No. The whole conversion happens inside your browser on your own device, so your photos are never sent to a server."
        },
        {
          q: "Can I convert HEIC to WebP in bulk?",
          a: "Yes. Drop in as many HEIC files as you like and download them all as a ZIP. Larger batches take a little longer on older phones since decoding runs on your device."
        }
      ]
    }
  },
  {
    id: "rotate",
    type: "image",
    title: "Rotate Image",
    desc: "Rotate images 90, 180, or 270 degrees.",
    leadIn: "Rotate a sideways or upside-down photo and have the fix saved into the file itself — not just turned on screen, which reverts the moment you upload or email it. Turn JPG, PNG, or WebP images by 90, 180, or 270 degrees. Everything happens instantly in your browser, with nothing uploaded.",
    icon: RotateCw,
    color: "blue",
    config: { showRotate: true, showFormat: true, allowBatch: false },
    info: {
      sectionHeadings: {
        features: "Why Permanently Fix Image Orientation?",
        useCases: "Common Rotation Scenarios",
        steps: "How to Rotate an Image Online",
        faq: "Image Rotation FAQs"
      },
      // 1. INTRO SECTION (Focus on Orientation & Permanence)
      intro: `Need to **rotate an image**? Taking a great photo is satisfying, but opening it on your computer only to find it is sideways or upside down is frustrating. This often happens with photos taken on smartphones or documents scanned in a hurry. While image viewers let you "turn" the image to see it, they often fail to **save that orientation permanently**. The moment you upload that photo to a website or email it, it reverts to being sideways.

GoPDFGo’s **Rotate Image** tool is the permanent fix for your orientation woes. It allows you to rotate your JPG, PNG, or WebP images by **90 degrees clockwise or counter-clockwise** instantly. Unlike basic viewers, our tool rewrites the image data to ensure that "Up" is truly "Up," no matter where you view the file next.

**Why Rotate with GoPDFGo?**
We prioritize speed, quality, and privacy by keeping the work on your own device:
1.  **Permanent Correction:** We don't just rotate the view; we rotate the pixels. Your image stays fixed forever.
2.  **Lossless Rotation:** Concerned about quality? Our engine performs rotation without unnecessary re-compression, keeping your image crisp.
3.  **100% Private:** Your personal photos, selfies, and scanned documents never leave your device. The rotation happens right in your browser.

Stop craning your neck. Fix your photo's orientation instantly with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: a photo that keeps reverting sideways",
        body: `GoPDFGo rotates in fixed quarter-turns — 90, 180, or 270 degrees — and, crucially, it bakes that turn into the exported file instead of only spinning it on screen. That distinction is the whole point. A photo viewer or gallery app often just displays the image rotated and quietly reverts the moment you upload it to a form or email it to someone, undoing your fix.

Take a page you scanned in a hurry that came out lying on its side. Open it here, turn it 90 degrees the right way, and if something is fully upside down, two turns gives you the 180. Because the tool rewrites the actual pixels and re-exports the file, it stays the right way up wherever it lands next — an exam portal, an email attachment, a printed sheet. You can also change format on the way out: rotate a PNG screenshot and save it as a JPG in the same step, which keeps things simple when a form wants a specific type.

Only need a mirror rather than a turn? Flip it horizontally with the [flip image tool](/flip). If the orientation is right but the edges are messy, [crop the image](/crop) afterward, or [convert it to JPG](/convert-jpg) if a portal only accepts that format.`,
        troubleshooting: [
          {
            problem: "It looks upright in my phone gallery but shows up sideways on the website.",
            fix: "Your camera saved the orientation as a hidden EXIF tag that some apps read and others ignore. Rotating here bakes the turn into the pixels themselves, so every app shows it the same way.",
          },
          {
            problem: "My photo is only slightly tilted, not turned a full quarter.",
            fix: "This tool works in fixed 90, 180, and 270 degree steps, so it fixes camera and scanner quarter-turns, not small leans. It cannot straighten an arbitrary angle.",
          },
          {
            problem: "I have a whole folder of sideways scans to fix at once.",
            fix: "The rotate tool handles one image at a time by design, so rotate and download each in turn. There is no batch mode on this page.",
          },
        ],
      },
      features: [
        {
          title: "Standard Angle Control",
          desc: "Precision matters. Our tool offers simple buttons to rotate your image **Left (90°)** or **Right (90°)**. Need to flip it upside down? Simply click twice for a perfect **180-degree** turn. It is the fastest way to fix orientation errors from cameras and scanners."
        },
        {
          title: "Multi-Format Support",
          desc: "Whether you have a standard **JPG** from a camera, a high-quality **PNG** screenshot, or a modern **WebP** graphic, our tool handles them all. You can even rotate a PNG and save it as a JPG in the same step to optimize for sharing."
        },
        {
          title: "Secure & Instant",
          desc: "Editing photos online usually means slow uploads and privacy risks. Not here. With our **Serverless Architecture**, your image loads instantly, rotates instantly, and saves instantly. Your data remains strictly on your own computer or mobile device."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Fixing Scanned Documents:** Old scanners are notorious for scanning pages upside down. Use this tool to **rotate scanned contracts** or receipts to the upright position before sending them to your boss or accountant.",
        "**Smartphone Photos:** Phones often get confused about gravity, saving landscape photos as portrait (vertical) files. Rotate them back to **Landscape mode** so they look correct on desktop screens and TVs.",
        "**Social Media Prep:** Before uploading to Instagram or Facebook, ensure your photo is oriented correctly. Uploading a sideways photo often results in auto-cropping that ruins the composition.",
        "**Composition & Styling:** Perfecting a design often requires reorienting textures or background layers to align seamlessly with the visual flow. Use this tool to quickly **change the direction** of an asset without opening heavy software like Photoshop."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Upload Image:** Click 'Select Image' or drag and drop the photo you want to fix. Supported formats include JPG, PNG, and WebP.",
        "**Rotate:** Use the **'Left'** or **'Right'** buttons to turn the image. You will see an instant preview of the new orientation.",
        "**Format (Optional):** If you want to change the file type (e.g., save PNG as JPG), select it from the dropdown menu.",
        "**Download:** Click the button to save. Your image is now permanently rotated and ready to use."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Does rotating the image reduce its quality?",
          a: "Generally, no. Rotating by 90-degree increments is a clean operation. We preserve the original pixel data as much as possible, ensuring your photo remains **sharp and clear** after the edit."
        },
        {
          q: "Why is my photo sideways when I upload it?",
          a: "This is a metadata issue. Your camera saved the photo horizontally, but tagged it vertically. Our tool fixes the actual pixel orientation so it displays correctly **everywhere**, not just on your phone."
        },
        {
          q: "Is custom angle rotation (e.g., 45°) supported?",
          a: "Currently, our tool is optimized for **orientation correction** (90, 180, 270 degrees), which fixes 99% of photo issues. Arbitrary rotation (like 45°) usually requires cropping and quality loss."
        },
        {
          q: "Is it safe to rotate private photos?",
          a: "Yes. Rotating happens **on your own device**, so family photos or private scans are never uploaded, stored, or viewed by us. The corrected image is written straight back to your disk."
        },
        {
          q: "Can I rotate multiple images at once?",
          a: "Currently, this tool focuses on precision editing for single images to ensure you get the orientation exactly right for each file."
        },
        {
          q: "Does this work on mobile?",
          a: "Yes! You can take a photo, upload it directly to GoPDFGo from your mobile browser, rotate it, and save it back to your gallery in seconds."
        }
      ]
    }
  },
  {
    id: "flip",
    type: "image",
    title: "Flip Image",
    desc: "Mirror images horizontally or vertically.",
    leadIn: "Mirror an image horizontally to fix a selfie where the text reads backwards, or vertically for a creative effect. A live preview shows the result as you flip, and it works on JPG, PNG, and WebP. The whole thing runs in your browser — no upload, no watermark.",
    icon: FlipHorizontal,
    color: "blue",
    config: { showFlip: true, showFormat: true, allowBatch: false },
    info: {
      sectionHeadings: {
        features: "Why Use Our Mirroring Tool?",
        useCases: "Best Uses for Flipped Images",
        steps: "How to Flip an Image Online",
        faq: "Image Flipping FAQs"
      },
      // 1. INTRO SECTION (Focus on Selfies & Symmetry)
      intro: `Want to **flip an image** or fix a mirrored selfie? Have you ever taken the perfect selfie, only to realize later that the text on your T-shirt is backwards? Or perhaps you have scanned an old photo negative and it looks reversed? This happens because cameras and mirrors often flip our perspective. To fix this, you don't need to retake the shot—you simply need to **mirror it back**.

GoPDFGo’s **Flip Image** tool is the easiest way to create a mirror image online. Whether you need to flip a photo **Horizontally** (left to right) to fix a selfie, or **Vertically** (top to bottom) for a creative reflection effect, our tool handles it instantly.

**The GoPDFGo Privacy Promise:**
Most online editors demand that you upload your files to their servers just to apply a simple effect. We believe that is unnecessary and unsafe.
**The mirroring happens on your device:**
1.  **Instant Mirroring:** Your image loads directly in your browser. When you click "Flip," the change happens instantly on your screen using your device's power.
2.  **Zero Quality Loss:** Flipping is a mathematical operation. We rearrange the pixels without compressing them, ensuring your photo stays sharp.
3.  **100% Private:** Your photos, selfies, and designs never leave your computer. You can flip confidential images safely because no one else can see them.

Correct your perspective and create stunning symmetrical art with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: making backwards text readable",
        body: `The most common job here is a selfie where a logo, T-shirt slogan, or street sign reads backwards. Front cameras save a mirrored view, so the text comes out reversed. Load the photo and press the first of the two flip icons — the left-right one — and the live preview mirrors the image on the spot — the letters read the right way round again. The flip itself is a pixel rearrangement rather than a resize, so nothing is stretched or cropped. The file is re-saved on the way out, so a JPG or WebP picks up one round of ordinary re-encoding, while a PNG comes back untouched.

There are two directions, and they do different things. **Horizontal** mirrors left to right, which fixes selfies and mirrors a design before transfer-paper printing so it lands correctly on fabric. **Vertical** mirrors top to bottom, for a water-reflection effect or an upside-down scan. A vertical flip is not the same as a 180-degree turn, so if you actually need to rotate the image rather than mirror it, use the [rotate image tool](/rotate) instead. The flipped image is saved back in whatever format you loaded, so a WebP stays a WebP and a JPG stays a JPG.

Because it works on one image at a time, you get a clean preview before you commit. Tidy up messy borders afterward by [cropping the image](/crop), or [convert the result to JPG](/convert-jpg) if a site or portal only accepts that format.`,
        troubleshooting: [
          {
            problem: "You flipped the selfie but the text still looks wrong or the photo looks stranger than before.",
            fix: "You likely picked the wrong direction. Horizontal is the one that fixes backwards text, since it mirrors left to right; Vertical mirrors top to bottom. Toggle the button back and forth and watch the live preview until the letters read correctly, then save.",
          },
          {
            problem: "You wanted to stand a sideways or upside-down photo upright, but flipping made it look worse.",
            fix: "Flipping mirrors an image, it does not turn it. For orientation problems from a camera or scanner, use the Rotate Image tool instead. Remember a 180-degree rotation gives a different result from a vertical flip.",
          },
          {
            problem: "The flipped image downloaded in a format a website will not accept.",
            fix: "This tool always saves in the format you started with — it does not convert. Flip and download first, then run that file through a converter such as the convert to JPG tool to get the format the site wants.",
          },
        ],
      },
      features: [
        {
          title: "Horizontal & Vertical Control",
          desc: "Complete control over orientation. Use **'Flip Horizontal'** to fix backwards text in selfies or mirror a subject's gaze. Use **'Flip Vertical'** to create water-reflection effects or correct upside-down scanned art. You can combine both for creative results."
        },
        {
          title: "Instant Live Preview",
          desc: "Stop guessing what the result will look like. Our tool provides a **real-time preview**. As soon as you click the button, the image flips on your canvas, allowing you to verify if the text is readable or the composition works before you save it."
        },
        {
          title: "Format Flexibility",
          desc: "Need to flip a WebP image but save it as a JPG for Instagram? No problem. Our tool lets you **flip and convert** in a single step. We support input and output for all major formats including JPG, PNG, and WebP."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Correcting Selfies:** Front-facing cameras often act like mirrors, saving photos where text appears backwards. Flip your selfies horizontally to make logos, street signs, and T-shirt slogans **readable again**.",
        "**T-Shirt & Merchandise Printing:** If you are printing iron-on transfers for T-shirts or mugs, you often need to print the design in **mirror image** first. Use this tool to prepare your designs for physical printing.",
        "**Digital Art & Design:** Designers use flipping to check for balance in a composition or to create **symmetrical patterns** (kaleidoscope effects). Flipping an image can reveal flaws in layout that you missed.",
        "**Video Thumbnails:** YouTube creators often flip images to make the subject look towards the center of the frame. Changing the direction of a gaze can significantly improve **Click-Through Rates (CTR)**."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Upload Photo:** Select the image you want to mirror. Drag and drop works perfectly for JPG, PNG, and WebP files.",
        "**Choose Direction:** Click **'Flip Horizontal'** (Left-Right) or **'Flip Vertical'** (Top-Bottom). You can toggle it back and forth to see the difference.",
        "**Select Output:** Choose your desired file format (e.g., maintain original or convert to PNG).",
        "**Download:** Click 'Download' to save the mirrored image to your device instantly."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "What is the difference between Rotate and Flip?",
          a: "**Rotating** turns the image (like turning a steering wheel). **Flipping** creates a mirror reflection (like looking in a mirror). Crucially, simply turning the image upside down (180°) produces a different result than mirroring it vertically."
        },
        {
          q: "Does flipping reduce image quality?",
          a: "No. Flipping is a **lossless pixel operation**. We simply rearrange the order of the pixels. We do not re-compress the image unless you specifically ask to change the format or quality."
        },
        {
          q: "Why do my selfies look backwards?",
          a: "Most phone cameras show you a 'mirror' view when taking the photo because it feels more natural, but they save the 'real' view (or vice versa). Flipping the image restores it to how you saw it in the preview."
        },
        {
          q: "Is it safe to edit personal photos?",
          a: "Yes. The mirror is applied **inside your browser** and the result saved back locally — the photo never travels to a server. Whatever you are flipping stays entirely on your device."
        },
        {
          q: "Can I flip multiple images at once?",
          a: "Currently, we focus on single-image editing to allow for precise previewing. This ensures you don't accidentally mirror an image that didn't need it."
        },
        {
          q: "Can I use this for printing?",
          a: "Absolutely. This is essential for **transfer printing**. If you don't mirror your design before printing on transfer paper, it will appear backwards when applied to the T-shirt."
        }
      ]
    }
  },
  {
    id: "color-picker",
    type: "image",
    title: "Color Picker",
    desc: "Extract Hex and RGB colors from images.",
    leadIn: "Find the exact colour in any image — that precise shade of blue in a logo, a sunset, or a website design. Upload a picture, hover with the magnifier for pixel-level accuracy, and read the colour back as a Hex code or RGB values to drop straight into your design. No software, and the image never leaves your browser.",
    icon: Palette,
    color: "blue",
    config: { mode: "picker", allowBatch: false },
    info: {
      sectionHeadings: {
        features: "Why Extract Colors Locally?",
        useCases: "When to Use a Digital Eyedropper",
        steps: "How to Pick Colors from an Image Online",
        faq: "Color Picker FAQs"
      },
      // 1. INTRO SECTION (Focus on Precision & Design Utility)
      intro: `Need to **pick a color from an image**? Have you ever looked at a beautiful sunset photo, a corporate logo, or a website design and wondered, "What is that exact shade of blue?" Color precision is often the defining factor that separates a polished masterpiece from a chaotic draft. Whether you are a web developer trying to match a button to a background, or a designer building a brand palette, guessing the color isn't enough—you need the exact code.

GoPDFGo’s **Image Color Picker** is your digital eyedropper. It allows you to upload any image and extract the precise **Hex, RGB, or HSL** color code from any pixel. No need to take a screenshot, open Photoshop, and use the eyedropper tool there. We bring that professional functionality directly to your browser.

**The Privacy Advantage:**
Color picking often involves proprietary brand assets or personal photos.
**GoPDFGo ensures total privacy:**
1.  **Client-Side Scanning:** We don't upload your image to a server to analyze the colors. The scanning happens entirely in your browser using the HTML5 Canvas API.
2.  **Zero-Latency Privacy:** Since all processing happens locally within your browser, the results are generated immediately. You can analyze confidential product mockups without fear of leaks.
3.  **Pixel Precision:** Our built-in **Magnifier (Zoom)** tool lets you see individual pixels, ensuring you pick the exact color you want, not a blurry mix of neighboring pixels.

Stop guessing colors. Get the exact code instantly with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: matching a button to your logo blue",
        body: `Say you have a company logo and need the exact blue for a website button, but the brand guide is long gone. Upload the logo as JPG, PNG or WebP and move your cursor over the blue mark. The **magnifier** pops up and shows a zoomed circle of the area under your cursor, so you can land on the flat centre of the shape rather than the softer, blended edge. Click to save the colour to the **Saved Colors** list, then hit the copy button on that row to grab the **Hex** for your CSS — the panel shows the RGB value right under it too, so you can take whichever your design tool prefers.

To rebuild a small palette, click several points in turn: the primary blue, a darker shade for hover states, the off-white background. Each click lands in the **Saved Colors** list — up to ten, duplicates ignored — with a copy button on every row, so you do not have to write them down. What it will not do is work out a palette for you automatically; it samples the one pixel you point at. Because the reading is the raw pixel value, a gradient gives a different code at every point — pick the start and end rather than expecting one code for the whole sweep. Everything runs on the canvas inside your browser, so a confidential mockup is only ever read to sample colours, never uploaded.

A couple of prep steps help. iPhone screenshots often save as HEIC, which this picker does not open, so [convert them to JPG first](/heic-to-jpg). And if the shade you want is a tiny detail buried in a busy image, [crop down to just that area](/crop) so the magnifier has more room to work.`,
        troubleshooting: [
          {
            problem: "The colour I picked looks slightly off from the shape I clicked",
            fix: "You are probably sampling an anti-aliased edge, where the browser blends the shape into whatever is behind it. Use the zoom to move a pixel or two into the solid middle of the area and click again — the flat centre gives the true colour.",
          },
          {
            problem: "My image will not load into the tool",
            fix: "The picker works on standard web image formats your browser can decode. An iPhone HEIC will not open directly — convert it to JPG first, then sample it. A corrupted or partly downloaded file will also fail, so re-download it and try again.",
          },
          {
            problem: "The Hex I copied does not match the original design file",
            fix: "A JPG screenshot is lossy, so compression can nudge nearby pixels and shift the colour a little. Where you can, pick from the original asset or a PNG export rather than a re-saved JPG copy, since PNG keeps the pixels exact.",
          },
        ],
      },
      features: [
        {
          title: "Precision Magnifier Tool",
          desc: "Trying to pick a color from a thin line or small text is frustrating with a normal mouse cursor. Our tool includes a **Zoom Lens** that magnifies the area under your cursor, allowing you to select the target pixel with surgical precision."
        },
        {
          title: "Multi-Format Color Codes",
          desc: "Web development and print design require different formats. When you pick a color, we instantly generate the **HEX code** (for CSS), **RGB values** (for digital displays), and **HSL** (for color adjustments), so you have the data ready for any software."
        },
        {
          title: "No Software Needed",
          desc: "Why wait for heavy design software like Photoshop or Illustrator to load just to pick a color? GoPDFGo is lightweight and runs in your browser. It is the perfect **quick-utility tool** for Chromebook users, mobile users, and developers on the go."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Web Design & CSS:** Developers often receive flat image mockups from designers. Use this tool to inspect the image and grab the exact **Hex codes** for backgrounds, fonts, and buttons to use in your CSS code.",
        "**Brand Identity Management:** Consistency is key. If you have a company logo but lost the brand guidelines, upload the logo here to recover the exact **official brand colors** to ensure your new marketing materials match perfectly.",
        "**Concept Art & Design:** Great artwork often begins with a strong reference image or mood board. Upload a reference image to build a **custom color palette** based on the mood and tones of that photograph.",
        "**Interior Design Inspiration:** Captivated by a specific wall hue or upholstery tone in a design photo? Extract the color code to find similar paint swatches or fabrics for your own home renovation projects."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Upload Image:** Click 'Select Image' or drag your photo into the tool. JPG, PNG, and WebP formats are supported.",
        "**Hover to Inspect:** Move your mouse over the image. A **magnifier window** will appear, showing you the zoomed-in details of the pixels.",
        "**Click to Pick:** Click on the exact spot you want. The tool will 'freeze' that color and display its details.",
        "**Copy Code:** Click the **Copy icon** next to the HEX, RGB, or HSL value to paste it directly into your code editor or design tool."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "How accurate is the color picker?",
          a: "It is **100% accurate**. The tool reads the raw data of the pixel directly from the image file. It gives you the exact digital value stored in that pixel."
        },
        {
          q: "Does it work on mobile phones?",
          a: "Yes! On touch devices, you can tap and drag your finger on the image. The magnifier will help you see what is under your finger so you can pick colors accurately even on small screens."
        },
        {
          q: "Can I extract gradients?",
          a: "A gradient is made of thousands of different colors. You can use the tool to pick specific points *along* the gradient (e.g., the start and end colors), but you cannot extract the 'formula' of the gradient itself."
        },
        {
          q: "Is it safe to upload client work?",
          a: "Yes. A logo or mockup is read by the browser **only to sample its colours**; the image itself is never uploaded or stored, so a client's unreleased work and your NDA stay intact."
        },
        {
          q: "What formats do you support?",
          a: "We generate the three primary digital standards: HEX, RGB, and HSL. This selection ensures compatibility with virtually every design tool and coding environment."
        },
        {
          q: "Can I create a palette from an image?",
          a: "Yes. You can click multiple times on different areas of the image to note down the codes, effectively letting you manually build a palette from the photo."
        }
      ]
    }
  },
  {
    id: "aadhaar-masking",
    type: "image",
    title: "ID Masking",
    desc: "Securely redact sensitive identity information.",
    leadIn: "Black out the sensitive parts of an ID before you share a copy — the first 8 digits of an Aadhaar number, a photo, or any detail you do not want exposed for a hotel check-in or SIM form. You draw boxes over what to hide, and the tool flattens them into the image so the covered data is genuinely gone, not just hidden. All of it happens on your device.",
    icon: ShieldAlert,
    color: "blue",
    config: { mode: "mask", showVisualCrop: false, showMaskTool: true, allowBatch: false },
    info: {
      sectionHeadings: {
        features: "Why Redact Sensitive IDs?",
        useCases: "When to Share a Masked Aadhaar",
        steps: "How to Mask an Aadhaar Card Online",
        faq: "ID Masking FAQs"
      },
      // 1. INTRO SECTION (Focus on Security, Identity Theft & Compliance)
      intro: `Your Aadhaar card is the most critical identity document you own. It links to your bank account, your phone number, and your tax records. Yet, we are often asked to hand over photocopies or digital scans of our Aadhaar for simple things like hotel check-ins, buying a SIM card, or renting a car. Sharing your full 12-digit UID number everywhere exposes you to a significant risk of **Identity Theft** and financial fraud.

The UIDAI (Unique Identification Authority of India) and RBI explicitly recommend using a **"Masked Aadhaar"**—a version of your card where the first 8 digits are hidden, and only the last 4 digits are visible. This is valid for proof of identity but useless for hackers trying to steal your data.

GoPDFGo’s **Aadhaar masking tool** lets you mask your Aadhaar online and create a valid Masked Aadhaar instantly and securely. Unlike other editors that might save a copy of your ID, our tool is built with a **Privacy-First Architecture**.
1.  **Zero-Knowledge Processing:** We do not know who you are. Your ID card is loaded directly into your browser's memory.
2.  **No Server Uploads:** We never upload your sensitive documents to a cloud server. The masking happens locally on your device (laptop or mobile).
3.  **Permanent Redaction:** We don't just put a removable layer on top. Our tool replaces the pixels of the first 8 digits with solid black color, permanently destroying the data in the file so it cannot be recovered.

Protect your identity today. Mask your Aadhaar before you share it.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: masking an Aadhaar for a SIM form",
        body: `Say you have a phone photo of your Aadhaar and a SIM shop wants a copy. Draw a box over the first 8 digits of the 12-digit number, leaving the last 4 visible so a verification officer can still match their records. Then draw a second box over the QR code — it can carry your full details even after the printed number is hidden. The tool never finds anything for you, so you cover every sensitive part yourself before you download.

Each box is flattened into the pixels as soon as you draw it, so the covered data is genuinely gone from the saved file — not sitting under a layer someone can peel back. Add as many boxes as you need, and undo the last box or clear them all if one drifts onto your name. A PDF Aadhaar, say one saved from DigiLocker, opens on its first page so you can mask it the same way; the masked result downloads as an image.

Since the output is an image, [turn the masked card into a PDF](/image-to-pdf) if an upload portal wants that format. If the file sits over a size cap, [compress the JPG](/compress-jpg) first, or [crop the card](/crop) down to just the ID before you share it over email or WhatsApp.`,
        troubleshooting: [
          {
            problem: "A sliver of a digit still shows at the edge of the black box",
            fix: "Draw a second box overlapping the same spot, or use Undo last and redraw the box a little larger so it clears the digit edges. Once you apply, the covered pixels turn solid black permanently, so check the preview and confirm full coverage before downloading.",
          },
          {
            problem: "I hid the printed number but the QR code is still visible",
            fix: "Masking the 8 digits alone is not always enough — the QR code can still encode your full Aadhaar details. The tool does not auto-detect anything, so draw a separate box over the QR code yourself before you save the file.",
          },
          {
            problem: "A mask drifted and covered my name or the last 4 digits",
            fix: "Nothing is burned into your original file until you download, so undo the last box or clear them all and redraw. Keep the last 4 digits visible, since the usual guidance is to hide only the first 8, and redraw any box that has crept over your name.",
          },
        ],
      },
      features: [
        {
          title: "Visual Redaction Tool",
          desc: "You don't need to be a Photoshop expert. Our intuitive interface lets you simply **click and drag** to place one or more black boxes over the sensitive areas of your document. Add as many boxes as you need — cover the first 8 digits, the QR code, and any other detail — then undo the last box or clear them all with one tap. Resize and move each mask precisely while keeping the name and photo visible."
        },
        {
          title: "Permanent Data Destruction",
          desc: "Some PDF tools simply place a black image 'over' the text, which can be removed by a clever hacker. GoPDFGo performs **destructive editing**. We overwrite the actual pixel data of the image. Once you save the file, the numbers underneath the black box are gone forever."
        },
        {
          title: "100% Client-Side Safety",
          desc: "This is the most secure way to edit an ID card. Because everything runs **right inside your browser**, the code executes on your own computer. Your Aadhaar card never travels over the internet, eliminating the risk of 'Man-in-the-Middle' attacks or server data breaches."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Hotel & Travel Check-ins:** Hotels require ID proof by law, but they don't need your full Aadhaar number. Provide a **Masked Aadhaar** to verify your identity without giving them access to your biometric-linked UID.",
        "**KYC for Non-Banking:** Renting furniture, getting a new internet connection, or joining a gym often requires KYC. These entities do not need your full financial identity. Use a masked card to **limit your exposure**.",
        "**HR & Employee Onboarding:** When submitting documents to a new employer, you can often use a masked version for age and address proof, keeping your full UID private until strictly necessary.",
        "**General Address Proof:** Need to verify your address for a delivery or service? A masked card works perfectly as a valid address proof while keeping your unique identification number **strictly confidential**."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Upload ID:** Select your Aadhaar card (or any other ID) as an image or a **PDF** — JPG, PNG, WebP and PDF are all supported. A PDF opens on its first page, ready to mask.",
        "**Draw Mask(s):** Use your mouse (or finger on mobile) to draw one or more black boxes over the **first 8 digits** of the UID number. Add a box over the **QR code** too — it can still hold your full details even after the number is hidden. Made a mistake? Undo the last box or clear them all.",
        "**Apply:** Click the button to burn the mask into the image. The hidden area turns permanently black.",
        "**Download:** Save your secured ID card. It is now safe to share via email, WhatsApp, or upload portals."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Is a Masked Aadhaar legally valid?",
          a: "Yes. The **UIDAI** and **RBI** recognize Masked Aadhaar as a valid proof of identity and address. Service providers cannot deny services solely because you provided a masked version, unless they are specifically licensed to perform e-KYC."
        },
        {
          q: "Can the black box be removed to see the numbers?",
          a: "No. GoPDFGo flattens the image. The pixels containing the numbers are **permanently replaced** with black pixels. There is no hidden layer or 'undo' data in the downloaded file."
        },
        {
          q: "Is it safe to upload my Aadhaar here?",
          a: "Absolutely. We cannot stress this enough: **You are NOT uploading it.** The file opens in your browser, gets edited by your browser, and saves to your computer. It never touches our servers."
        },
        {
          q: "What part of the Aadhaar should I mask?",
          a: "Standard practice is to mask the **first 8 digits** of the 12-digit number, keeping the last 4 visible so a verification officer can match their records. Important: also cover the **QR code** — it can still contain your full Aadhaar details, so masking only the printed number is not always enough."
        },
        {
          q: "Can I mask other documents like PAN Card?",
          a: "Yes. This tool works on any image. You can use it to redact sensitive financial figures from bank statements, hide your signature on public forms, or mask the PAN number on ID copies."
        },
        {
          q: "Does this work on PDF files?",
          a: "Yes. You can upload a **PDF Aadhaar** directly (for example one saved from DigiLocker or mAadhaar) — the tool renders its first page so you can draw your mask boxes right away. The masked result downloads as an image."
        }
      ]
    }
  },
  {
    id: "qr-generator",
    type: "utility",
    title: "QR Generator",
    desc: "Create custom QR codes for URLs and text.",
    leadIn: "Create a free QR code for a link, some text, or your Wi-Fi details — the kind people scan straight off a screen or a printout. These are static codes, so the data lives in the QR itself and never expires behind a subscription. Choose the size and error-correction level, and generate it instantly in your browser.",
    icon: QrCode,
    color: "purple",
    config: { mode: "qr" },
    info: {
      sectionHeadings: {
        features: "Benefits of Static QR Codes",
        useCases: "Where to Use Scannable Codes",
        steps: "How to Generate a Free QR Code",
        faq: "QR Generator FAQs"
      },
      // 1. INTRO SECTION (Focus on Permanence & Privacy)
      intro: `From restaurant menus to Wi-Fi sharing, QR codes have become the bridge between the physical and digital worlds. Whether you want to share your Wi-Fi password without spelling it out, direct customers to your website, or share your contact details instantly, a QR code is the fastest way to do it. But not all generators are created equal. Many online tools trick you into creating "Dynamic" QR codes that expire after a week unless you pay a subscription fee.

GoPDFGo’s **Free QR Code Generator** is different. We generate **Static QR Codes**. This ensures the data is embedded directly within the visual matrix of the code.
1.  **No Expiration:** Your QR code will work forever. It will never "stop working" because you didn't pay a monthly fee.
2.  **No Tracking:** We don't track who scans your code or when. The direct link is between your user and your data.
3.  **100% Private:** Unlike other generators that send your data to a server to create the image, our tool generates the QR code **locally in your browser**. Your Wi-Fi passwords or personal messages remain strictly on your device.

Create professional, high-resolution QR codes instantly without signing up.`,

      // 2. FEATURES (3 Cards)
      walkthrough: {
        heading: "A real example: a Wi-Fi sign for the reception desk",
        body: `Say you want guests to join your **Wi-Fi** without reading out a long password. Pick the Wi-Fi option, type the network name and password exactly as they appear (both are case-sensitive), then hit **Generate** and the code appears in the preview panel. The data lives inside the pattern itself, so the code never expires behind a subscription and no server sits between the scanner and your details. If the Generate button looks greyed out for a second, that is just the QR engine loading from a CDN — give it a moment and it wakes up.

For a small laminated card on the desk, **512px** is plenty; for a poster on the wall, download the **1024px** version so the squares stay crisp when blown up. Error correction is the trade-off worth knowing: raising it from M up to H lets the code still scan after it gets scuffed or a coffee ring lands on it, but it packs in more squares, so print it a little larger to keep them readable. Always test-scan the screen with your phone before you send anything to the printer.

Once you download the PNG, [drop it onto a printable page](/image-to-pdf) next to your logo to make a finished sign. If the code points to a hosted file like a menu, [compress that PDF first](/compress-pdf) so it opens fast on a phone, and [shrink the PNG itself](/compress-png) when you only need it small on a web page.`,
        troubleshooting: [
          {
            problem: "The printed code will not scan, or only reads when the camera is very close.",
            fix: "A high error-correction level like H packs more squares into the same area, so it needs more room. Drop to M or Q, or print a larger size such as 1024px, so each square stays big enough for a phone camera to pick out.",
          },
          {
            problem: "The Generate button is greyed out and clicking does nothing.",
            fix: "The QR engine loads from a CDN the first time you open the tool, so the button stays disabled for a second or two on a slow connection. Wait for it to enable, or refresh the page if it never becomes clickable.",
          },
          {
            problem: "I already printed the code and now my link has changed, so it is dead.",
            fix: "These are static codes — the destination is baked into the pattern and cannot be edited after generating, so you will need to make a fresh one. Next time, encode a short redirect link you control rather than the raw URL, then repoint that link without reprinting.",
          },
        ],
      },
      features: [
        {
          title: "Static & Permanent",
          desc: "Say goodbye to broken links. We generate **Direct-Encoded QR Codes**, where the information is embedded permanently into the matrix itself. Unlike dynamic codes provided by marketing platforms, our codes do not rely on a redirect server. They function independently and will work for as long as the internet exists."
        },
        {
          title: "Instant & Private",
          desc: "Speed meets security. Type your text or paste your URL, and watch the QR code generate in real-time on your screen. Because the code is drawn by your own browser, you can even generate secure QR codes for sensitive data (like a private Wi-Fi password or a personal note) without fear of leaks."
        },
        {
          title: "Choose Size & Error Correction",
          desc: "Need a QR code for a giant billboard or a tiny business card? Pick your download size — **256px (S), 512px (M), or 1024px (L)** — for crisp, clean lines at any scale. You can also set the **error-correction level (M, Q, or H)**: a higher level keeps the code scannable even if part of it gets smudged, printed small, or slightly damaged."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Instant Wi-Fi Access:** Stop the struggle of dictating long, case-sensitive passwords to your visitors. Create a QR code containing your **Wi-Fi credentials**. Guests can simply scan it with their camera to connect instantly without typing a single character.",
        "**Marketing & Print Ads:** Adding a QR code to your flyers, brochures, or product packaging bridges the gap to your digital content. Direct customers to your **website, WhatsApp chat, Instagram page, or Google Maps** location instantly.",
        "**Business Cards (vCard):** Modern networking requires speed. Embed a scannable link on your printed card. When scanned, it can instantly save your **Name, Number, and Email** to the client's phone contacts.",
        "**Smart Classroom Integration:** Empower digital learning by linking physical worksheets to online resources. Teachers can direct students to quizzes, video lectures, or reference PDFs instantly, eliminating the chaos of manual URL entry."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Enter Content:** Paste a website or WhatsApp link, type the text, or enter the Wi-Fi details you want to encode.",
        "**Pick Size & Preview:** Choose your size (256, 512, or 1024px) and error-correction level, then watch the QR code appear instantly as a unique matrix barcode pattern.",
        "**Test Scan:** Open your phone's camera and scan the screen to verify the code works as expected.",
        "**Download:** Click the button to save the QR code image to your device. Your file is finalized and primed for printing or digital distribution."
      ],

      // 5. FAQ (Detailed SEO Answers)
      faq: [
        {
          q: "Will this QR code expire?",
          a: "No. Never. We generate **Static QR Codes**. Since the data is stored inside the image pattern itself, it does not depend on our servers. As long as your website URL doesn't change, the code will work forever."
        },
        {
          q: "Is there a scan limit?",
          a: "Absolutely not. Your QR code can be scanned 10 times or 10 million times. Since we don't track scans or host a redirect link, there are **unlimited scans** for free."
        },
        {
          q: "Can I use this for commercial purposes?",
          a: "Yes. You are free to use these QR codes on your products, menus, business cards, or billboards without any attribution or payment."
        },
        {
          q: "Why should I avoid 'Dynamic' QR codes from other sites?",
          a: "Many 'free' sites give you a Dynamic code that stops working after a trial period, holding your printed materials hostage until you pay. GoPDFGo eliminates this risk by giving you the direct, static code."
        },
        {
          q: "Is it safe for passwords?",
          a: "Yes. Because the generation happens **locally in your browser**, your text inputs (like Wi-Fi passwords) are never sent to the cloud. It is the safest way to generate sensitive codes."
        },
        {
          q: "What if I change the URL later?",
          a: "Since this is a Static code, you cannot change the content after generating it (that would change the pattern). You will need to generate a new QR code if your link changes."
        }
      ]
    }
  }
];