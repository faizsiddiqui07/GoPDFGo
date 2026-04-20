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
  ShieldAlert
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
    icon: Minimize2,
    color: "orange",
    config: { mode: "compress", accept: ".pdf" },
    info: {
      // 1. INTRO SECTION (SEO Optimized Long Form)
      // Design Note: Ye text aapke Hero section ke niche ya page ke bottom me SEO footer ki tarah aa sakta hai.
      intro: `Struggling with large PDF files that refuse to upload? You are not alone. Whether you are a student trying to submit an assignment, a job seeker applying on a government portal, or a professional sending a report via email, file size limits are a constant hurdle. Most platforms restrict uploads to 100KB, 2MB, or 25MB, leaving you stuck with heavy documents.

GoPDFGo’s **Compress PDF** tool is engineered to solve this problem instantly and securely. Unlike traditional tools that force you to upload your personal files to a remote server, our tool utilizes **Serverless Client-Side Technology**. This means the compression engine is downloaded to your browser and runs directly on your device (laptop or mobile). Your sensitive bank statements, Aadhaar cards, and contracts never leave your system, guaranteeing 100% privacy.

**How does GoPDFGo achieve high compression without quality loss?**
Our advanced algorithm uses a multi-layered approach to shrink files by up to 90%:
1.  **DPI Optimization:** We intelligently identify high-resolution images within the document and adjust their Dots Per Inch (DPI) to a web-optimized standard (144 DPI or 72 DPI). This reduces bulk without making images look blurry on screens.
2.  **Metadata Stripping:** PDFs often carry invisible weight like thumbnail caches, edit history, and XML metadata. We strip this unnecessary data to shave off kilobytes.
3.  **Font Subsetting:** Instead of embedding an entire font family, we only keep the characters used in your document, significantly reducing file size while keeping text razor-sharp.

Experience the fastest, safest, and most efficient way to optimize your documents with GoPDFGo.`,

      // 2. WHY USE THIS TOOL? (Matches Screenshot 2 - 3 Cards)
      features: [
        {
          title: "Smart Hybrid Compression",
          desc: "We don't just lower quality blindly. Our engine balances image compression with vector preservation. This ensures that while images are optimized to save space, your text remains selectable, searchable, and crystal clear at any zoom level."
        },
        {
          title: "100% Privacy-First Architecture",
          desc: "Your security is our #1 priority. GoPDFGo operates entirely in your browser using WebAssembly. Unlike other sites, we have no 'upload' server. You can literally turn off your internet after the page loads, and the tool will still compress your files perfectly."
        },
        {
          title: "Preserve Visual Quality",
          desc: "Worrying about blurry documents? Don't be. Our tool removes 'invisible' data (metadata, unused fonts) first. When image compression is needed, it uses bicubic resampling to maintain visual fidelity, so your compressed PDF looks professional for printing and viewing."
        }
      ],

      // 3. WHEN TO USE THIS TOOL? (Matches Screenshot 3 - 4 Checkpoints)
      useCases: [
        "**Official Document Submission:** Applying for a government job or visa? These sites strictly limit uploads to small sizes like 500KB. Instantly shrink your PDFs or images to fit these quotas perfectly while keeping them readable.",
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
          a: "For most documents, the difference is invisible to the human eye. We remove non-visual data (metadata) first. If your PDF contains heavy images, we optimize them for screens. Crucially, text elements retain their full vector integrity, ensuring razor-sharp clarity at any zoom level—ideal for high-stakes business documents."
        },
        {
          q: "Is it safe to upload private documents like Bank Statements?",
          a: "Yes, GoPDFGo is safer than offline software. Why? Because **no upload happens.** Your file stays in your browser's memory (RAM) and is processed by your own CPU. We physically cannot see, copy, or store your data. It vanishes when you close the tab."
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
        }
      ]
    }
  },
  {
    id: "merge-pdf",
    type: "pdf",
    title: "Merge PDF",
    desc: "Combine multiple PDFs into one unified document.",
    icon: Layers,
    color: "orange",
    config: { mode: "merge", accept: ".pdf", allowBatch: true },
    info: {
      // 1. INTRO SECTION (High SEO Value)
      intro: `Managing multiple PDF files can be a nightmare. Whether you are a student submitting a thesis with separate chapters, an accountant organizing monthly invoices, or a professional combining reports, keeping track of scattered files is inefficient. You need a way to **stitch them together** into a single, organized document.

GoPDFGo’s **Merge PDF** tool is the ultimate solution to combine unlimited PDF files online. Unlike other platforms that restrict you to 10 or 20 files per day, our tool offers **unlimited merging** capabilities completely for free. We utilize advanced **Browser-Based Technology** (WebAssembly), which means the merging process happens entirely on your device (laptop or mobile). We do not upload your documents to any cloud server, ensuring that your sensitive contracts, bank statements, and personal IDs remain 100% private.

**Why is our Client-Side Merger better?**
Traditional PDF websites work by uploading your files, processing them on a remote server, and sending them back. This is slow and risky.
**GoPDFGo changes the game:**
1.  **Zero Upload Time:** Since files aren't sent to a server, the process starts instantly.
2.  **Unlimited Pages:** Merge a 500-page book with a 2-page cover instantly. The only limit is your device's memory.
3.  **Visual Reordering:** Our interactive editor allows you to drag and drop files to rearrange them in the exact order you want before binding them together.

Stop wasting time with slow uploads and daily limits. Combine your PDFs securely and instantly with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
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
          a: "Yes! You can combine a **Landscape A3 chart** with a **Portrait A4 letter** without any issues. Our tool stitches them together while preserving the original dimensions and formatting of each individual page."
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
          a: "Yes. Since we use **Client-Side Processing**, your confidential legal agreements or financial records are never sent to a cloud server. It is as safe as using offline software like Adobe Acrobat, but free and without installation."
        },
        {
          q: "Does this tool work on mobile?",
          a: "Yes, our interface is fully **mobile-optimized**. You can select files from your Android or iPhone storage, rearrange them with a touch, and download the merged PDF directly to your phone."
        }
      ]
    }
  },
  {
    id: "split-pdf",
    type: "pdf",
    title: "Split PDF",
    desc: "Extract pages from a PDF or split into multiple files.",
    icon: Scissors,
    color: "orange",
    config: { mode: "split", accept: ".pdf" },
    info: {
      // 1. INTRO SECTION (Deep SEO Content)
      intro: `Have you ever downloaded a massive 100-page PDF document just to use **one single page**? It is a common frustration. You might have a large bank statement but only need the last month's transaction history, or a heavy textbook where you only need chapter 5. Sharing the entire file is unprofessional, slow, and confusing for the receiver. You need a tool to **extract exactly what you need**.

GoPDFGo’s **Split PDF** tool gives you surgical precision over your documents. It allows you to separate PDF pages, extract specific ranges, or remove unwanted sections instantly. Unlike traditional splitters that require you to upload your sensitive file to a server, wait for processing, and then download the result, our tool works **locally on your device**.

**The Power of Client-Side Splitting:**
We utilize cutting-edge **WebAssembly technology** to bring desktop-class performance to your browser.
1.  **Instant Extraction:** Since we don't upload your file, the splitting happens the moment you click the button. No buffering, no waiting.
2.  **100% Privacy:** Your legal contracts, medical reports, or financial data never leave your computer. The splitting engine runs inside your browser (Chrome, Edge, Safari, etc.), ensuring your data remains invisible to the internet.
3.  **Flexible Control:** Whether you want to extract a single page (e.g., "5"), a range (e.g., "1-10"), or a mix of both, GoPDFGo handles it with ease.

Take control of your documents. Stop sharing bulky files and start sharing only what matters.`,

      // 2. FEATURES (3 Cards)
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
        "**Download:** Your new, smaller PDF containing only the selected pages is ready. Download it immediately."
      ],

      // 5. FAQ (Detailed Answers)
      faq: [
        {
          q: "Does splitting delete the original file?",
          a: "No, absolutely not. Your original file on your computer remains **untouched and safe**. GoPDFGo creates a *new* copy containing only the pages you selected. You will end up with two files: your original (full) PDF and your new (extracted) PDF."
        },
        {
          q: "Can I extract non-consecutive pages (e.g., Page 1 and Page 5)?",
          a: "Yes. Our tool is flexible. You can often perform multiple splits to get exactly the combination you need, or define custom ranges depending on the specific mode selected."
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
    icon: RotateCw,
    color: "orange",
    config: { mode: "rotate", accept: ".pdf" },
    info: {
      // 1. INTRO SECTION (Focus on "Permanent Save" vs "View Only")
      intro: `There is nothing more annoying than opening a PDF document and realizing it is upside down or sideways. You crane your neck, turn your head, or rotate your laptop screen just to read it. While most PDF viewers allow you to "view" the file correctly, they often **fail to save** that rotation. The moment you close and reopen the file, it reverts to the wrong orientation.

GoPDFGo’s **Rotate PDF** tool is designed to fix this problem once and for all. It allows you to change the orientation of your PDF pages permanently. Whether you have scanned a document upside down, merged landscape and portrait pages incorrectly, or converted mobile photos that are rotated 90 degrees, our tool corrects the layout instantly.

**The GoPDFGo Privacy Advantage:**
Unlike other online tools that ask you to upload your private files to a server just to rotate them, we use **Client-Side Processing**. Your PDF never leaves your browser. The rotation logic runs locally on your device using WebAssembly technology.
1.  **Permanent Fix:** We rewrite the file's internal structure so that when you send it to someone else, it opens correctly on their device too.
2.  **No Uploads:** Rotate legal contracts, medical scans, or personal IDs without fear. Your data stays invisible to the internet.
3.  **Instant Result:** Since there is no heavy processing or uploading involved, the rotation happens in the blink of an eye.

Stop struggling with sideways documents. Make your PDFs professional and readable with a single click.`,

      // 2. FEATURES (3 Cards)
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
          title: "Secure Local Processing",
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
          a: "Absolutely. With GoPDFGo, **uploading never happens**. The file is loaded into your browser's memory, rotated by your processor, and saved back to your disk. It never travels over the internet."
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
    icon: FileText,
    color: "orange",
    config: { mode: "page-numbers", accept: ".pdf" },
    info: {
      // 1. INTRO SECTION (Focus on Organization & Professionalism)
      intro: `Imagine printing a 50-page contract or a university thesis, and accidentally dropping the papers on the floor. If those pages aren't numbered, putting them back in the correct order is a nightmare. Page numbers are not just a design element; they are the backbone of document organization. They make your files referable, professional, and easy to navigate.

GoPDFGo’s **Add Page Numbers** tool allows you to insert professional numbering into your PDF documents instantly. Whether you have a scanned file, a converted Word document, or a merged report, our tool calculates the total page count and stamps sequential numbers (e.g., "1", "2", "3" or "Page 1 of 50") directly onto the footer.

**Why choose Client-Side Numbering?**
Most online tools force you to upload your document to a server just to add a tiny number. This is a huge privacy risk for legal contracts or unpublished research papers.
**GoPDFGo is different.** We use **Browser-Based Processing**.
1.  **100% Private:** Your document never leaves your device. The numbering engine runs inside your browser.
2.  **No Overwriting:** Our smart algorithm places numbers in the safe margin areas (headers/footers) so they don't overlap with your text.
3.  **Universal Compatibility:** Works on scanned PDFs, digital PDFs, and even files that previously had no margins.

Turn your chaotic pile of digital pages into a structured, professional document in seconds.`,

      // 2. FEATURES (3 Cards)
      features: [
        {
          title: "Smart Positioning",
          desc: "We don't just stamp numbers randomly. Our tool targets the **Footer Center**—the international standard for page numbering. This ensures your document looks professional and consistent, whether it's for a court submission, a corporate report, or a book publishing."
        },
        {
          title: "Safe Margin Tech",
          desc: "Worried about the number covering your text? Our engine identifies the **safe whitespace** at the bottom of the page. It inserts the number cleanly in the margin, ensuring that your original content, signatures, and footnotes remain 100% visible and untouched."
        },
        {
          title: "Secure Local Processing",
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
        "**Configure:** The tool automatically sets the numbering to the standard 'Bottom-Center' position for maximum readability.",
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
          a: "Yes. GoPDFGo uses **Client-Side Processing**. Your legal agreements or thesis papers are processed in your browser's memory. We never see, store, or copy your files."
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
    icon: ImageIcon,
    color: "orange",
    config: { mode: "image-to-pdf", accept: "image/*", allowBatch: true },
    info: {
      // 1. INTRO SECTION (Focus on Convenience & Organization)
      intro: `A picture is worth a thousand words, but sending twenty separate picture files in an email is a nightmare. It looks unprofessional, clutters the recipient's inbox, and makes printing a hassle. Whether you are a designer sharing a portfolio, a student submitting handwritten notes, or an employee filing expense receipts, you need a way to **combine these images into a single, professional document**.

GoPDFGo’s **Image to PDF** converter is the fastest way to turn your chaotic collection of JPG, PNG, or WebP photos into a polished PDF file. Unlike other tools that stretch your images or ruin the aspect ratio, our smart engine **auto-scales** your photos to fit perfectly on standard page sizes while maintaining their original quality.

**The Privacy Revolution:**
Most "free" converters require you to upload your personal photos to a cloud server. This is risky, especially for personal photos or ID proofs.
**GoPDFGo works differently.** We use **Client-Side Processing**.
1.  **Zero Uploads:** Your photos never leave your device. The conversion happens directly in your browser using your computer's power.
2.  **Lightning Fast:** Since there is no upload time, you can convert 50 images in seconds, even on a slow internet connection.
3.  **High Quality:** We don't compress your images unless you ask. Your PDF will look as crisp as the original photos.

Stop zipping files. Start creating professional PDFs instantly.`,

      // 2. FEATURES (3 Cards)
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
        "**Convert:** Click the **'Convert to PDF'** button. Our browser engine instantly places each image onto a separate PDF page.",
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
          a: "Absolutely. We use **Client-Side Technology**. Your photos are processed in your browser's temporary memory and are wiped as soon as you close the tab. No one else ever sees them."
        },
        {
          q: "Does it work on mobile?",
          a: "Yes. You can select photos directly from your phone's **Gallery or Camera Roll**, convert them, and share the PDF on WhatsApp or Email instantly."
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
    icon: Minimize2,
    color: "blue",
    config: { showQuality: true, defaultQuality: 0.8, defaultFormat: "image/jpeg", lockFormat: true, allowBatch: true, accept: ".jpg,.jpeg,image/jpeg" },
    info: {
      // 1. INTRO SECTION (Focus on Speed & Storage)
      intro: `In the digital age, speed is everything. High-resolution photos are beautiful, but they are also heavy. A single 5MB JPG image can slow down your website, clog your email outbox, and eat up your phone's storage in no time. If you are a web developer, a photographer, or just someone trying to send a holiday album to family, you know the struggle of the "File Too Large" error.

GoPDFGo’s **Compress JPG** tool is the ultimate solution to optimize your images instantly. We use advanced compression algorithms to significantly reduce the file size of your JPEG photos (often by up to 80%) while maintaining excellent visual quality.

**The GoPDFGo Difference: Client-Side Compression**
Most online compressors work by uploading your photos to a remote server. This is slow and raises privacy concerns—who else is seeing your personal photos?
**We do it differently.** Our tool uses **WebAssembly technology** to compress images directly inside your browser.
1.  **Maximum Privacy:** Your photos never leave your device. The compression happens on your CPU, not our servers.
2.  **Unbeatable Speed:** Since there is no upload time, you can compress 50 images in the time it takes other sites to upload just one.
3.  **Custom Control:** You decide the balance. Use our quality slider to find the perfect sweet spot between file size and image clarity.

Make your web pages load faster and your emails send instantly with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
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
          title: "100% Secure & Private",
          desc: "Security is built into our architecture. Whether you are compressing personal family photos or confidential product prototypes, **no data is ever uploaded**. The processing is local to your device, making it the safest way to compress images online."
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Web Development & SEO:** Large images are the #1 killer of website speed. Compressing your JPG assets improves your **Core Web Vitals** scores, leading to better Google rankings and a happier user experience.",
        "**Social Media Uploads:** Platforms like Twitter, Facebook, and Instagram compress your images aggressively, often making them look bad. **Compress them yourself** first to maintain control over the final look while ensuring faster uploads.",
        "**Email Attachments:** Trying to send 10 photos in an email? You will likely hit the 25MB limit. Compress your JPGs to attach **more photos** in a single email without using third-party links.",
        "**Storage Management:** Running out of space on your iPhone or Google Photos? Compressing your image library can recover **gigabytes of free space** without forcing you to delete your precious memories."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select Images:** Click 'Upload' or drag and drop your JPG/JPEG files. You can process multiple images simultaneously.",
        "**Adjust Quality:** Use the **Quality Slider** to choose your compression level. (Recommended: 80% offers the best balance of size and quality).",
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
          a: "Yes. We use **Client-Side Technology**. Your photos are processed in your browser's temporary memory. We physically cannot see, copy, or sell your photos because they never touch our servers."
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
    icon: Minimize2,
    color: "blue",
    config: { showQuality: true, defaultQuality: 0.8, defaultFormat: "image/jpeg", lockFormat: true, allowBatch: true, accept: ".jpg,.jpeg,image/jpeg" },
    info: {
      // 1. INTRO SECTION (Focus on "JPEG" specifics & Photography)
      intro: `You have likely noticed that some image files end in ".jpg" while others end in ".jpeg". While they are technically the same format, handling heavy JPEG files can still be a massive headache. A single raw JPEG from a modern DSLR or smartphone can easily exceed 10MB. Whether you are a photographer trying to upload a portfolio, an e-commerce store owner managing product images, or a student submitting scanned notes, file size limits are everywhere.

GoPDFGo’s **Compress JPEG** tool is precision-engineered to shrink these files without ruining their beauty. We understand that JPEG users often care deeply about image quality. That is why our tool provides a **customizable quality slider**, giving you full control over the balance between file size and visual fidelity.

**Why trust GoPDFGo with your JPEGs?**
Unlike standard compressors that blindly crush your images into pixelated messes, our tool uses **Intelligent Perceptual Compression**. It runs directly in your browser using WebAssembly.
1.  **Photographer-Friendly Privacy:** Professional photographers worry about image theft. With GoPDFGo, your high-res originals never touch a server. Processing happens on your machine, protecting your intellectual property.
2.  **Web-Ready Speed:** We optimize JPEGs specifically for faster web loading, helping you pass Google's Core Web Vitals assessments.
3.  **No Limits:** Batch compress unlimited JPEG files instantly.

Shrink your files, not your quality. Experience the safest JPEG compressor online.`,

      // 2. FEATURES (3 Cards)
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
        "**Government Forms:** Many official forms specifically ask for `.jpeg` format under 50KB. Our tool lets you fine-tune the quality to hit that exact **target file size** for successful submission."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select JPEGs:** Click 'Upload' or drag your `.jpeg` files into the tool. You can mix `.jpg` and `.jpeg` files; the tool handles both.",
        "**Fine-Tune:** Adjust the **Quality Slider**. Lowering the percentage reduces size but may lower quality. We recommend **80%** for the best balance.",
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
    icon: Minimize2,
    color: "blue",
    config: { showQuality: true, defaultQuality: 0.8, defaultFormat: "image/webp", lockFormat: true, allowBatch: true, accept: ".webp,image/webp" },
    info: {
      // 1. INTRO SECTION (Focus on Modern Web & Speed)
      intro: `The internet is evolving, and so are image formats. You likely use WebP because it offers superior quality at smaller file sizes compared to traditional JPGs and PNGs. However, simply using WebP isn't enough. Exporting a WebP image from tools like Photoshop or Canva at 100% quality can still result in bloated files that hurt your website's loading speed. If you care about **Google PageSpeed Insights**, **Core Web Vitals**, or mobile app performance, every kilobyte counts.

GoPDFGo’s **Compress WebP** tool is designed for the modern web. It allows you to squeeze the maximum performance out of your next-gen images. By intelligently adjusting the compression quality, we can often reduce WebP file sizes by an additional **30% to 70%** without any noticeable difference to the human eye.

**Why optimize WebP with GoPDFGo?**
Unlike generic image compressors that treat all files the same, our engine is tuned for WebP's unique algorithms. Plus, we use **Client-Side Processing**:
1.  **Zero Server Latency:** We don't upload your assets to a slow backend. The optimization happens instantly on your device using WebAssembly.
2.  **Transparency Support:** Unlike JPG compression which turns transparent backgrounds black or white, our tool **preserves the Alpha Channel** (transparency), making it perfect for logos and product cutouts.
3.  **Developer-Grade Privacy:** Working on confidential client assets or unreleased app designs? Keep them safe. Your files never leave your computer.

Maximize your site speed and SEO rankings by serving the lightest possible WebP images.`,

      // 2. FEATURES (3 Cards)
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
        "**Digital Marketing:** Ad banners and email graphics often have strict file size limits (e.g., Google Ads < 150KB). Shrink your high-quality WebP creatives to meet these requirements without compromising visual impact."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Select WebP Files:** Click 'Upload' or drag your `.webp` images into the dashboard. Batch processing is supported.",
        "**Set Compression Level:** Use the slider to control the quality. We recommend **80%** for web use, which offers significant savings with virtually no visual loss.",
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
          a: "Yes. We use **Client-Side Technology**. If you are working on a secret project or an NDA-protected website, you can safely use GoPDFGo because the files are processed locally on your machine, never uploaded."
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
    id: "resize",
    type: "image",
    title: "Resize Image",
    desc: "Change image dimensions and resolution.",
    icon: Maximize2,
    color: "blue",
    config: { showResize: true, showFormat: true, defaultQuality: 0.9, allowBatch: false },
    info: {
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
        "**Official Documents:** Applying for a visa or exam? You often need to resize your passport photo and signature to exact dimensions (e.g., **3.5cm x 4.5cm** or specific pixel counts). Do it here with zero privacy risk.",
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
          a: "Absolutely. With GoPDFGo, **no file transfer occurs**. Your photos are resized in your browser's memory. We never see, copy, or store your images."
        },
        {
          q: "How do I resize for Instagram?",
          a: "For a standard square post, set the width and height to **1080 x 1080** pixels. For a portrait post, use **1080 x 1350**. Our tool lets you type these exact numbers."
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
    icon: CropIcon,
    color: "blue",
    config: { showVisualCrop: true, allowBatch: false },
    info: {
      // 1. INTRO SECTION (Focus on Composition & Privacy)
      intro: `We take hundreds of photos, but rarely is the raw shot perfect. Maybe there is a stranger photobombing the background, too much empty sky above your subject, or clutter on the desk that ruins a professional product shot. Often, the best picture is hiding *inside* the bigger picture. You need a tool to **trim the fat** and focus on what matters.

GoPDFGo’s **Crop Image** tool is the simplest and safest way to re-frame your photos online. Forget complicated desktop software like Photoshop just for a simple cut. Our intuitive **Visual Editor** allows you to draw a box over the area you want to keep and discard the rest instantly.

**Why Crop Locally in Your Browser?**
Cropping often involves personal photos—your selfies, family pictures, or documents. Uploading these to an unknown server for editing is a privacy risk.
**GoPDFGo solves this:**
1.  **100% Private Editing:** Your image never leaves your device. The cropping engine runs right here in your browser using your CPU. We cannot see or store your photo.
2.  **Zero Quality Loss:** Unlike resizing, cropping does not stretch or compress pixels. It simply removes the outer edges, ensuring the remaining part of your image retains its original crispness.
3.  **Instant Results:** No upload bars, no download queues. The edit happens immediately.

Take control of your photo's composition and create the perfect frame with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
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
          desc: "Editing personal photos should not mean sharing them with the world. Because we use **Serverless Client-Side Technology**, your photos remain on your computer or phone throughout the entire editing process. It's as safe as editing offline."
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
          a: "Yes. GoPDFGo uses **Client-Side Processing**. Your photo is loaded into your browser's memory, edited there, and saved back to your disk. It never travels over the internet to a server."
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
    icon: RefreshCw,
    color: "blue",
    config: { showFormat: true, defaultFormat: "image/webp", lockFormat: true, allowBatch: true },
    info: {
      // 1. INTRO SECTION (Focus on Modern Web Standards & Speed)
      intro: `Is your website loading slowly? Are your high-quality PNGs and JPGs taking up too much storage space? It is time to upgrade to the future of digital imagery. **WebP** is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web.

GoPDFGo’s **Convert to WebP** tool allows you to transform your legacy image files (JPG, PNG, JPEG) into the next-generation WebP format instantly. Why does this matter? Because WebP images are typically **25% to 35% smaller** than comparable JPGs and PNGs while maintaining the exact same visual quality.

**The GoPDFGo Advantage: Client-Side Conversion**
Many developers and designers hesitate to use online converters because of privacy risks or slow upload speeds.
**We solve this with Browser-Based Technology:**
1.  **Instant Transformation:** We don't upload your files to a server queue. The conversion logic runs inside your browser, turning your images into WebP files instantly.
2.  **Privacy Guaranteed:** Your unreleased designs, personal photos, or client assets never leave your computer.
3.  **Transparency Support:** Unlike converting to JPG (which loses transparency), converting a PNG to WebP with our tool **preserves the transparent background** while drastically reducing the file size.

Make the switch to WebP today and watch your digital assets become lighter and faster.`,

      // 2. FEATURES (3 Cards)
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
          a: "Absolutely. GoPDFGo uses **Client-Side Processing**. Your images are converted by your own computer's processor within the browser window. They are never sent to any external server."
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
    icon: RefreshCw,
    color: "blue",
    config: { showFormat: true, defaultFormat: "image/jpeg", lockFormat: true, allowBatch: true },
    info: {
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
          a: "Absolutely. We use **Client-Side Processing**. Your photos are converted in your browser's memory and saved back to your disk. They are never sent to the cloud, so your privacy is guaranteed."
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
    icon: RefreshCw,
    color: "blue",
    config: { showFormat: true, defaultFormat: "image/png", lockFormat: true, allowBatch: true },
    info: {
      // 1. INTRO SECTION (Focus on Quality & Graphics)
      intro: `Have you ever saved a logo or a screenshot as a JPG, only to see it become blurry, pixelated, or surrounded by "noise" artifacts? That is the price of compression. When quality matters more than file size, there is only one clear winner: **PNG (Portable Network Graphics)**.

GoPDFGo’s **Convert to PNG** tool is the ultimate solution for preserving visual fidelity. Whether you have a compressed JPG photograph or a modern WebP graphic, our tool transforms it into the **Lossless PNG format**. This means every single pixel is preserved exactly as it is, with zero quality degradation. It is the gold standard for designers, photographers, and anyone who refuses to compromise on clarity.

**Why choose GoPDFGo for PNG conversion?**
While many online converters are slow and insecure, we utilize **Client-Side Technology** to offer a superior experience:
1.  **Pixel-Perfect Accuracy:** We re-encode your images into PNG without adding any compression artifacts. We guarantee 100% visual fidelity in the final output.
2.  **Privacy Guaranteed:** Your high-value assets (like brand logos or legal scans) never leave your computer. The conversion happens locally in your browser.
3.  **Modern Format Support:** Easily convert newer formats like WebP (or older ones like BMP) into the universally supported PNG standard.

Stop settling for blurry JPEGs. Upgrade your images to crystal-clear PNGs instantly.`,

      // 2. FEATURES (3 Cards)
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
          a: "Yes. GoPDFGo uses **Client-Side Processing**. Your scanned IDs or contracts are converted inside your browser's memory and saved back to your disk. We never see or store your files."
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
    id: "rotate",
    type: "image",
    title: "Rotate Image",
    desc: "Rotate images 90, 180, or 270 degrees.",
    icon: RotateCw,
    color: "blue",
    config: { showRotate: true, showFormat: true, allowBatch: false },
    info: {
      // 1. INTRO SECTION (Focus on Orientation & Permanence)
      intro: `Taking a great photo is satisfying, but opening it on your computer only to find it is sideways or upside down is frustrating. This often happens with photos taken on smartphones or documents scanned in a hurry. While image viewers let you "turn" the image to see it, they often fail to **save that orientation permanently**. The moment you upload that photo to a website or email it, it reverts to being sideways.

GoPDFGo’s **Rotate Image** tool is the permanent fix for your orientation woes. It allows you to rotate your JPG, PNG, or WebP images by **90 degrees clockwise or counter-clockwise** instantly. Unlike basic viewers, our tool rewrites the image data to ensure that "Up" is truly "Up," no matter where you view the file next.

**Why Rotate with GoPDFGo?**
We prioritize speed, quality, and privacy using **Client-Side Technology**:
1.  **Permanent Correction:** We don't just rotate the view; we rotate the pixels. Your image stays fixed forever.
2.  **Lossless Rotation:** Concerned about quality? Our engine performs rotation without unnecessary re-compression, keeping your image crisp.
3.  **100% Private:** Your personal photos, selfies, and scanned documents never leave your device. The rotation happens right in your browser.

Stop craning your neck. Fix your photo's orientation instantly with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
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
          a: "Yes. GoPDFGo uses **Client-Side Processing**. Your family photos or private scans are edited in your browser's memory. We never upload, store, or view your images."
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
    icon: FlipHorizontal,
    color: "blue",
    config: { showFlip: true, showFormat: true, allowBatch: false },
    info: {
      // 1. INTRO SECTION (Focus on Selfies & Symmetry)
      intro: `Have you ever taken the perfect selfie, only to realize later that the text on your T-shirt is backwards? Or perhaps you have scanned an old photo negative and it looks reversed? This happens because cameras and mirrors often flip our perspective. To fix this, you don't need to retake the shot—you simply need to **mirror it back**.

GoPDFGo’s **Flip Image** tool is the easiest way to create a mirror image online. Whether you need to flip a photo **Horizontally** (left to right) to fix a selfie, or **Vertically** (top to bottom) for a creative reflection effect, our tool handles it instantly.

**The GoPDFGo Privacy Promise:**
Most online editors demand that you upload your files to their servers just to apply a simple effect. We believe that is unnecessary and unsafe.
**We use Client-Side Technology:**
1.  **Instant Mirroring:** Your image loads directly in your browser. When you click "Flip," the change happens instantly on your screen using your device's power.
2.  **Zero Quality Loss:** Flipping is a mathematical operation. We rearrange the pixels without compressing them, ensuring your photo stays sharp.
3.  **100% Private:** Your photos, selfies, and designs never leave your computer. You can flip confidential images safely because no one else can see them.

Correct your perspective and create stunning symmetrical art with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
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
          a: "**Rotating** turns the image (like turning a steering wheel). **Flipping** creates a mirror reflection (like looking in a mirror). Crucially, simply turning the image upside down (180°) produces a different result than mirroring it vertically"
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
          a: "Yes. GoPDFGo uses **Browser-Based Processing**. Your image is loaded into your browser's memory, flipped there, and saved back. It never travels over the internet to a server."
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
    icon: Palette,
    color: "blue",
    config: { mode: "picker", allowBatch: false },
    info: {
      // 1. INTRO SECTION (Focus on Precision & Design Utility)
      intro: `Have you ever looked at a beautiful sunset photo, a corporate logo, or a website design and wondered, "What is that exact shade of blue?" Color precision is often the defining factor that separates a polished masterpiece from a chaotic draft. Whether you are a web developer trying to match a button to a background, or a designer building a brand palette, guessing the color isn't enough—you need the exact code.

GoPDFGo’s **Image Color Picker** is your digital eyedropper. It allows you to upload any image and extract the precise **Hex, RGB, or HSL** color code from any pixel. No need to take a screenshot, open Photoshop, and use the eyedropper tool there. We bring that professional functionality directly to your browser.

**The Privacy Advantage:**
Color picking often involves proprietary brand assets or personal photos.
**GoPDFGo ensures total privacy:**
1.  **Client-Side Scanning:** We don't upload your image to a server to analyze the colors. The scanning happens entirely in your browser using the HTML5 Canvas API.
2.  **Zero-Latency Privacy:** Since all processing happens locally within your browser, the results are generated immediately. You can analyze confidential product mockups without fear of leaks.
3.  **Pixel Precision:** Our built-in **Magnifier (Zoom)** tool lets you see individual pixels, ensuring you pick the exact color you want, not a blurry mix of neighboring pixels.

Stop guessing colors. Get the exact code instantly with GoPDFGo.`,

      // 2. FEATURES (3 Cards)
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
        "**Concept Art & Design:**Great artwork often begins with a strong reference image or mood board. Upload a reference image to build a **custom color palette** based on the mood and tones of that photograph.",
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
          a: "Yes. GoPDFGo uses **Client-Side Technology**. Your client's logos or UI mockups are analyzed in your browser's memory. We never upload or store these images, protecting your intellectual property."
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
    icon: ShieldAlert,
    color: "blue",
    config: { mode: "mask", showVisualCrop: false, showMaskTool: true, allowBatch: false },
    info: {
      // 1. INTRO SECTION (Focus on Security, Identity Theft & Compliance)
      intro: `Your Aadhaar card is the most critical identity document you own. It links to your bank account, your phone number, and your tax records. Yet, we are often asked to hand over photocopies or digital scans of our Aadhaar for simple things like hotel check-ins, buying a SIM card, or renting a car. Sharing your full 12-digit UID number everywhere exposes you to a significant risk of **Identity Theft** and financial fraud.

The UIDAI (Unique Identification Authority of India) and RBI explicitly recommend using a **"Masked Aadhaar"**—a version of your card where the first 8 digits are hidden, and only the last 4 digits are visible. This is valid for proof of identity but useless for hackers trying to steal your data.

GoPDFGo’s **ID Masking Tool** allows you to create a valid Masked Aadhaar instantly and securely. Unlike other editors that might save a copy of your ID, our tool is built with a **Privacy-First Architecture**.
1.  **Zero-Knowledge Processing:** We do not know who you are. Your ID card is loaded directly into your browser's memory.
2.  **No Server Uploads:** We never upload your sensitive documents to a cloud server. The masking happens locally on your device (laptop or mobile).
3.  **Permanent Redaction:** We don't just put a removable layer on top. Our tool replaces the pixels of the first 8 digits with solid black color, permanently destroying the data in the file so it cannot be recovered.

Protect your identity today. Mask your Aadhaar before you share it.`,

      // 2. FEATURES (3 Cards)
      features: [
        { 
          title: "Visual Redaction Tool", 
          desc: "You don't need to be a Photoshop expert. Our intuitive interface lets you simply **click and drag** a black box over the sensitive areas of your document. You can resize and move the mask precisely to cover the first 8 digits while keeping the name and photo visible." 
        },
        { 
          title: "Permanent Data Destruction", 
          desc: "Some PDF tools simply place a black image 'over' the text, which can be removed by a clever hacker. GoPDFGo performs **destructive editing**. We overwrite the actual pixel data of the image. Once you save the file, the numbers underneath the black box are gone forever." 
        },
        { 
          title: "100% Client-Side Safety", 
          desc: "This is the most secure way to edit an ID card. Because we use **WebAssembly**, the code runs on your own computer. Your Aadhaar card never travels over the internet, eliminating the risk of 'Man-in-the-Middle' attacks or server data breaches." 
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
        "**Upload ID:** Select the image of your Aadhaar card (or any other ID). JPG, PNG, and WebP formats are supported.",
        "**Draw Mask:** Use your mouse (or finger on mobile) to draw a black box over the **first 8 digits** of the UID number. You can also mask the QR code if needed.",
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
          a: "Standard practice is to mask the **first 8 digits** of the 12-digit number. The last 4 digits must remain visible so the verification officer can match it with their records." 
        },
        { 
          q: "Can I mask other documents like PAN Card?", 
          a: "Yes. This tool works on any image. You can use it to redact sensitive financial figures from bank statements, hide your signature on public forms, or mask the PAN number on ID copies." 
        },
        { 
          q: "Does this work on PDF files?", 
          a: "Currently, this specific tool is optimized for **Image files** (scans/photos). If you have a PDF Aadhaar, please use our 'PDF to Image' converter first, mask it, and then save it back as a PDF." 
        }
      ]
    }
  },
  {
    id: "qr-generator",
    type: "utility",
    title: "QR Generator",
    desc: "Create custom QR codes for URLs and text.",
    icon: QrCode,
    color: "purple",
    config: { mode: "qr" },
    info: {
      // 1. INTRO SECTION (Focus on Permanence & Privacy)
      intro: `From restaurant menus to digital payments, QR codes have become the bridge between the physical and digital worlds. Whether you want to share your Wi-Fi password without spelling it out, direct customers to your website, or share your contact details instantly, a QR code is the fastest way to do it. But not all generators are created equal. Many online tools trick you into creating "Dynamic" QR codes that expire after a week unless you pay a subscription fee.

GoPDFGo’s **Free QR Code Generator** is different. We generate **Static QR Codes**. This ensures the data is embedded directly within the visual matrix of the code.
1.  **No Expiration:** Your QR code will work forever. It will never "stop working" because you didn't pay a monthly fee.
2.  **No Tracking:** We don't track who scans your code or when. The direct link is between your user and your data.
3.  **100% Private:** Unlike other generators that send your data to a server to create the image, our tool generates the QR code **locally in your browser**. Your Wi-Fi passwords or personal messages remain strictly on your device.

Create professional, high-resolution QR codes instantly without signing up.`,

      // 2. FEATURES (3 Cards)
      features: [
        { 
          title: "Static & Permanent", 
          desc: "Say goodbye to broken links. We generate **Direct-Encoded QR Codes**, where the information is embedded permanently into the matrix itself. Unlike dynamic codes provided by marketing platforms, our codes do not rely on a redirect server. They function independently and will work for as long as the internet exists." 
        },
        { 
          title: "Instant & Private", 
          desc: "Speed meets security. Type your text or paste your URL, and watch the QR code generate in real-time on your screen. Because we use **Client-Side Technology**, you can even generate secure QR codes for sensitive data (like crypto wallet addresses) without fear of leaks." 
        },
        { 
          title: "High-Resolution Download", 
          desc: "Need a QR code for a giant billboard or a tiny business card? GoPDFGo ensures crisp, clean lines. Download your code as a high-quality image that remains scannable even when printed at different sizes or displayed on screens." 
        }
      ],

      // 3. USE CASES (4 Checkpoints)
      useCases: [
        "**Instant Wi-Fi Access:** Stop the struggle of dictating long, case-sensitive passwords to your visitors. Create a QR code containing your **Wi-Fi credentials**. Guests can simply scan it with their camera to connect instantly without typing a single character.",
        "**Marketing & Print Ads:** Adding a QR code to your flyers, brochures, or product packaging bridges the gap to your digital content. Direct customers to your **website, Instagram page, or Google Maps** location instantly.",
        "**Business Cards (vCard):** Modern networking requires speed. Embed a scannable link on your printed card. When scanned, it can instantly save your **Name, Number, and Email** to the client's phone contacts.",
        "**Smart Classroom Integration:** Empower digital learning by linking physical worksheets to online resources. Teachers can direct students to quizzes, video lectures, or reference PDFs instantly, eliminating the chaos of manual URL entry."
      ],

      // 4. STEPS (4 Steps)
      steps: [
        "**Enter Content:** Paste the website URL, type the text, or enter the Wi-Fi details you want to encode.",
        "**Live Preview:** The tool instantly translates your text into a unique matrix barcode pattern. You will see it appear immediately.",
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
  },
];