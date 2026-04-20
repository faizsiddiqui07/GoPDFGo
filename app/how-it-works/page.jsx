import React from "react";
import Link from "next/link"; // Changed from react-router-dom
import {
  UploadCloud,
  Cpu,
  Download,
  Laptop,
  HelpCircle,
  ShieldCheck,
  FileCode,
  Layers,
  ServerOff,
  Zap,
} from "lucide-react";

// --- Next.js Native SEO ---
export const metadata = {
  title: "How GoPDFGo Works – The Technology Behind Serverless PDF Tools",
  description:
    "Understand the browser-based technology behind GoPDFGo. Learn how WebAssembly enables secure, offline-ready PDF processing without file uploads.",
  keywords:
    "how gopdfgo works, webassembly pdf processing, client side pdf tools, secure document processing technology, browser based pdf editor architecture, no upload pdf converter",
  alternates: {
    canonical: "https://gopdfgo.com/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-700 leading-relaxed">
      {/* =========================================
           1. HERO HEADER (Educational Hook)
      ========================================= */}
      <div className="bg-white pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-12 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            The Engine Under the Hood: <br />
            <span className="text-[#FF9933]">Browser-Based Processing</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Most PDF websites function like a restaurant: You give them your
            ingredients (files), they cook it in their kitchen (server), and
            bring it back.
            <br />
            <br />
            <strong>GoPDFGo functions like a personal chef.</strong> We send
            the recipe and the chef to <em>your</em> kitchen. The cooking
            happens right in front of you, on your own stove.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* =========================================
             2. VISUAL PROCESS FLOW (Step-by-Step)
        ========================================= */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            The Zero-Upload Workflow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 relative">
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-1 bg-linear-to-r from-orange-200 via-blue-200 to-green-200 z-0"></div>

            {/* Step 1: Selection */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white border-4 border-[#FF9933] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <UploadCloud size={40} className="text-[#FF9933]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
                1. Local Loading
              </h3>
              <p className="text-slate-600 text-sm px-4 leading-relaxed">
                When you select a file, your browser (Chrome/Edge) reads the
                data into its temporary memory (RAM). The file is{" "}
                <strong>never sent</strong> over the internet.
              </p>
            </div>

            {/* Step 2: Processing */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Cpu size={40} className="text-blue-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
                2. WASM Execution
              </h3>
              <p className="text-slate-600 text-sm px-4 leading-relaxed">
                Our website downloads a tiny engine called{" "}
                <strong>WebAssembly (WASM)</strong>. This engine uses your
                computer's CPU to edit, merge, or compress the PDF locally.
              </p>
            </div>

            {/* Step 3: Saving */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white border-4 border-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Download size={40} className="text-green-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
                3. Instant Save
              </h3>
              <p className="text-slate-600 text-sm px-4 leading-relaxed">
                The processed file is generated within milliseconds. Your
                browser creates a download link instantly. Once you close the
                tab, the data is wiped forever.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
             3. TECHNICAL DEEP DIVE (Authority Content)
        ========================================= */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12 sm:mb-14 md:mb-16 lg:mb-18 xl:mb-20 bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              What is WebAssembly (WASM)?
            </h2>
            <div className="prose text-slate-600 space-y-4">
              <p>
                For decades, web browsers could only run JavaScript, which is
                great for interactivity but slow for heavy tasks like video
                editing or PDF manipulation.
              </p>
              <p>
                <strong>WebAssembly</strong> changed the game. It allows
                developers to run high-performance languages like C++ and Rust
                directly inside the browser at near-native speeds.
              </p>
              <p>
                GoPDFGo utilizes customized WASM libraries (based on
                Ghostscript and PDF-Lib) to perform complex mathematical
                operations—like compressing a 50MB PDF to 5MB—without needing
                a powerful backend server. This is why our tools work even if
                you disconnect your internet after loading the page.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl sm:blur-3xl opacity-20 rounded-full"></div>
              <Laptop
                size={200}
                className="text-slate-800 relative z-10"
                strokeWidth={1}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 border border-slate-100">
                <FileCode className="text-[#FF9933]" size={32} />
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">
                    Processing...
                  </div>
                  <div className="font-bold text-slate-900">
                    100% Client-Side
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
             4. COMPARISON TABLE (SEO Rich)
        ========================================= */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-6 sm:mb-10">
            Traditional vs. GoPDFGo Architecture
          </h2>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 sm:py-5 px-3 sm:px-6 text-slate-500 font-bold uppercase text-sm">
                    Feature
                  </th>
                  <th className="py-2.5 sm:py-5 px-3 sm:px-6 text-red-500 font-bold text-sm sm:text-lg">
                    Server-Side (Others)
                  </th>
                  <th className="py-2.5 sm:py-5 px-3 sm:px-6 text-green-600 font-bold text-sm sm:text-lg">
                    Client-Side (GoPDFGo)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 font-medium text-slate-800">
                    File Journey
                  </td>
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 text-slate-600">
                    Your Device ➝ Internet ➝ Server ➝ Internet ➝ You
                  </td>
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 font-bold text-slate-800">
                    Your Device ➝ Your Browser ➝ You
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 font-medium text-slate-800">
                    Data Privacy
                  </td>
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 text-slate-600">
                    Requires trust in the server admin
                  </td>
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 font-bold text-slate-800">
                    Zero Trust required (Mathematically secure)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 font-medium text-slate-800">
                    Large Files
                  </td>
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 text-slate-600">
                    Fails on slow internet; Upload limits apply
                  </td>
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 font-bold text-slate-800">
                    Works instantly; No size limits
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 font-medium text-slate-800">
                    Offline Capability
                  </td>
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 text-slate-600">
                    Impossible
                  </td>
                  <td className="py-2.5 sm:py-5 px-3 sm:px-6 font-bold text-slate-800">
                    Yes (Once page is loaded)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================
             5. FAQ / COMMON MISCONCEPTIONS
        ========================================= */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-6 sm:mb-10">
            Common Technical Questions
          </h2>
          <div className="grid gap-3 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="flex items-center gap-3 text-lg font-bold text-slate-900 mb-3">
                <Zap className="text-[#FF9933]" size={20} />
                Does this drain my battery?
              </h3>
              <p className="text-slate-600">
                Processing heavy PDFs (like compressing a 100MB file) does use
                your CPU power, similar to editing a photo on your phone.
                However, because it finishes in seconds, the battery impact is
                negligible compared to the time and data wasted uploading
                files to a server.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="flex items-center gap-3 text-lg font-bold text-slate-900 mb-3">
                <ShieldCheck className="text-green-500" size={20} />
                Are you sure you don't save my files?
              </h3>
              <p className="text-slate-600">
                Yes. Our architecture literally has no database to store user
                files. Even if we wanted to see your document, we couldn't.
                You can verify this by disconnecting your internet after the
                page loads—the tools will still work perfectly!
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="flex items-center gap-3 text-lg font-bold text-slate-900 mb-3">
                <Layers className="text-blue-500" size={20} />
                Does it work on mobile phones?
              </h3>
              <p className="text-slate-600">
                Absolutely. Modern smartphones have incredibly powerful
                processors. In fact, an iPhone or high-end Android often
                processes PDFs faster than older laptops. GoPDFGo is fully
                optimized for touch interfaces and mobile processors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
           6. FOOTER CTA
      ========================================= */}
      <div className="bg-slate-900 text-white py-10 md:py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Experience the Difference
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Now that you know how it works, why risk your data elsewhere?
            Start using the secure, fast, and free alternative today.
          </p>
          <div className="flex gap-2 sm:gap-6 justify-center items-center">
            <Link
              href="/"
              className="bg-[#FF9933] hover:bg-orange-600 text-white text-sm sm:text-base font-bold py-3 px-5 sm:px-8 rounded-xl transition shadow-lg shadow-orange-500/30"
            >
              Try Our Tools
            </Link>
            <Link
              href="/about"
              className="bg-transparent border border-slate-600 hover:bg-slate-800 text-white text-sm sm:text-base font-bold py-3 px-5 sm:px-8 rounded-xl transition"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}