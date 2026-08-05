import React from "react";
import Link from "next/link"; // Next.js link imported
import {
  Users,
  Shield,
  Zap,
  Globe,
  Lock,
  Cpu,
  Server,
  Code,
  Heart,
} from "lucide-react";

// --- Next.js Native SEO ---
export const metadata = {
  title: "About Us – GoPDFGo | The Future of Secure PDF Tools",
  description:
    "GoPDFGo is a 100% serverless, privacy-first platform. We process files directly in your browser, ensuring your sensitive data never leaves your device.",
  keywords:
    "about gopdfgo, serverless pdf tools, privacy first pdf editor, secure document processing, client side pdf tools, browser based pdf converter, free online pdf tools",
  alternates: {
    canonical: "https://gopdfgo.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 sm:py-16 font-sans">
      {/* =========================================
           1. HERO HEADER SECTION
      ========================================= */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          We are redefining <span className="text-[#FF9933]">Privacy</span> in{" "}
          <br className="hidden md:block" />
          Document Processing.
        </h1>
        <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
          GoPDFGo isn't just another PDF tool website; it is a paradigm shift
          in how the internet handles sensitive data. We are a pioneer in{" "}
          <span className="font-semibold text-slate-800">
            Serverless Document Technology
          </span>
          . We empower students, legal professionals, and businesses to{" "}
          <Link
            href="/merge-pdf"
            className="text-[#FF9933] font-medium hover:underline"
          >
            Merge
          </Link>
          ,{" "}
          <Link
            href="/compress-pdf"
            className="text-[#FF9933] font-medium hover:underline"
          >
            Compress
          </Link>
          , and{" "}
          <Link
            href="/split-pdf" // Link corrected (assuming /split-pdf or similar exists, updated from /edit-pdf if needed, but left as your text requested)
            className="text-[#FF9933] font-medium hover:underline"
          >
            Edit
          </Link>{" "}
          documents without their data ever touching a cloud server.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500">
          <span className="bg-slate-100 px-4 py-2 rounded-full flex items-center gap-2">
            <Server size={16} /> No Backend Servers
          </span>
          <span className="bg-slate-100 px-4 py-2 rounded-full flex items-center gap-2">
            <Code size={16} /> Runs in Your Browser
          </span>
          <span className="bg-slate-100 px-4 py-2 rounded-full flex items-center gap-2">
            <Globe size={16} /> 100% Free Forever
          </span>
        </div>
      </div>

      {/* =========================================
           2. THE PROBLEM WE SOLVE (STORYTELLING)
      ========================================= */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center mb-10 sm:mb-12 md:mb-16">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            The "Free Tool" Trap
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
            <p>
              For years, the internet has been flooded with "free" online PDF
              converters. But have you ever questioned what actually happens behind the scenes? The uncomfortable truth is that most standard converters force you to transmit your private documents to external cloud servers.
            </p>
            <p>
              This traditional architecture is fundamentally flawed for the
              modern user:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Privacy Risk:</strong> Your bank statements, legal
                contracts, and Aadhaar cards are stored on a stranger's
                computer. Even if they promise to delete it, the data has
                already left your control.
              </li>
              <li>
                <strong>Slow Performance:</strong> You waste valuable time
                waiting for uploads and downloads. A 50MB file can take
                minutes to process on a slow connection.
              </li>
              <li>
                <strong>Arbitrary Restrictions:</strong> They frustrate you
                with "2 files per hour" limits, watermarks, or "File too
                large" errors to force you into a paid subscription.
              </li>
            </ul>
          </div>
        </div>
        <div className="order-1 md:order-2 bg-orange-50 rounded-3xl p-4 sm:p-6 md:p-8 border border-orange-100 relative">
          <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-slate-100">
            <Lock size={32} className="text-[#FF9933]" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            GoPDFGo is Different.
          </h3>
          <p className="text-slate-700 mb-4">
            We challenged the industry standard:{" "}
            <em>
              "Why must your private data travel to a remote server for tasks your own browser can handle?"
            </em>
          </p>
          <p className="text-slate-700 font-medium">
            The answer is: <strong>It doesn't.</strong>
          </p>
          <div className="mt-6 p-4 bg-white rounded-xl border border-orange-200 shadow-sm">
            <p className="text-sm text-slate-500">
              <span className="font-bold text-[#FF9933]">
                Our Architecture:
              </span>{" "}
              Your Browser (Chrome/Edge/Safari) acts as the server. The
              processing power comes from your own CPU, not ours. This is why
              we can offer unlimited, secure tools for free, forever.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
           3. CORE VALUES GRID (YOUR DESIGN PRESERVED)
      ========================================= */}
      <div className="mb-6 sm:mb-10 md:mb-14">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Our Core Principles
          </h2>
          <p className="text-slate-600 mt-4">
            Built on trust, speed, and open accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-10 md:mb-14">
          {/* Card 1: Zero-Upload Policy */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-[#FF9933]/30 transition duration-300">
            <div className="mb-2 sm:mb-0 flex items-center gap-x-4">
              <div className="bg-slate-50 w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center shadow-sm mb-0 sm:mb-6">
                <Shield className="w-7 h-7 text-[#FF9933]" />
              </div>
              <h3 className="block sm:hidden text-xl font-bold text-slate-900">
                Zero-Upload Policy
              </h3>
            </div>
            <h3 className="hidden sm:block text-xl font-bold text-slate-900 mb-3">
              Zero-Upload Policy
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Unlike traditional tools, we don't store your files. We operate
              on a strict <strong>Zero-Knowledge Policy</strong>. Whether you
              use our{" "}
              <Link
                href="/aadhaar-masking"
                className="text-[#FF9933] hover:underline"
              >
                Aadhaar Masking
              </Link>{" "}
              tool for identity protection or our converters for business
              documents, the processing happens locally on your device, right
              inside your browser. There is no database to hack, no cloud
              storage to breach, and no server logs to track you. Your data
              stays on your own hardware.
            </p>
          </div>
          {/* Card 2: Lightning Fast */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-[#FF9933]/30 transition duration-300">
            <div className="mb-2 sm:mb-0 flex items-center gap-x-4">
              <div className="bg-slate-50 w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center shadow-sm mb-0 sm:mb-6">
                <Zap className="w-7 h-7 text-[#FF9933]" />
              </div>
              <h3 className="block sm:hidden text-xl font-bold text-slate-900">
                Lightning Fast
              </h3>
            </div>
            <h3 className="hidden sm:block text-xl font-bold text-slate-900 mb-3">
              Lightning Fast
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Skip the upload and download wait times. Our algorithms optimize
              tools like{" "}
              <Link
                href="/image-to-pdf"
                className="text-[#FF9933] hover:underline"
              >
                Image to PDF
              </Link>{" "}
              to run instantly. By running{" "}
              <strong>high-performance code directly in your browser</strong>,
              heavy tasks like compression and merging happen on your own
              device, eliminating network latency entirely. A 100-page document
              merges in milliseconds, not minutes.
            </p>
          </div>

          {/* Card 3: Accessible to All */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-[#FF9933]/30 transition duration-300">
            <div className="mb-2 sm:mb-0 flex items-center gap-x-4">
              <div className="bg-slate-50 w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center shadow-sm mb-0 sm:mb-6">
                <Globe className="w-7 h-7 text-[#FF9933]" />
              </div>
              <h3 className="block sm:hidden text-xl font-bold text-slate-900">
                Accessible to All
              </h3>
            </div>
            <h3 className="hidden sm:block text-xl font-bold text-slate-900 mb-3">
              Accessible to All
            </h3>
            <p className="text-slate-600 leading-relaxed">
              We believe privacy is a fundamental human right, not a luxury
              product. That's why high-end features like{" "}
              <Link
                href="/compress-pdf"
                className="text-[#FF9933] hover:underline"
              >
                PDF Compression
              </Link>
              , which other sites charge for, are completely free and
              accessible globally on GoPDFGo. Our platform is designed to be
              lightweight and responsive, working seamlessly on low-end
              Android devices, high-end MacBooks, and everything in between.
            </p>
          </div>
        </div>
      </div>
      {/* =========================================
           4. MISSION STATEMENT (DARK SECTION)
      ========================================= */}
      <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 md:p-10 lg:p-16 text-center md:text-left flex flex-col lg:flex-row items-center gap-12 mb-8 sm:mb-12 md:mb-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933] opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>

        <div className="flex-1 relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            Our Mission for the Future
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            We are on a mission to build a{" "}
            <strong className="text-white">Decentralized Digital Utility</strong>
            . We envision a web where users don&apos;t have to trade their
            privacy for convenience.
            <br />
            <br />
            We are constantly evolving our tech stack to bring desktop-class
            features—like OCR, PDF Editing, and Digital Signing—to the web
            browser, making expensive software obsolete.
          </p>
          <div className="flex gap-2 sm:gap-4 justify-center md:justify-start">
            <Link
              href="/contact"
              className="text-sm sm:text-base inline-flex items-center gap-2 bg-[#FF9933] text-white px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20"
            >
              Contact Our Team
            </Link>
            <Link
              href="/"
              className="text-sm sm:text-base inline-flex items-center gap-2 bg-slate-800 text-white border border-slate-700 px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold hover:bg-slate-700 transition"
            >
              Explore Tools
            </Link>
          </div>
        </div>

        <div className="hidden shrink-0 sm:grid grid-cols-2 gap-6 opacity-80">
          <div className="bg-slate-800 p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-700">
            <Cpu size={40} className="text-[#FF9933] mb-3" />
            <div className="text-white font-bold text-xl">100%</div>
            <div className="text-slate-400 text-sm">Serverless</div>
          </div>
          <div className="bg-slate-800 p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-700 mt-8">
            <Users size={40} className="text-blue-400 mb-3" />
            <div className="text-white font-bold text-xl">Global</div>
            <div className="text-slate-400 text-sm">Community</div>
          </div>
        </div>
      </div>

      {/* =========================================
           5. FOUNDER & TRANSPARENCY (TEXT CONTENT)
      ========================================= */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {/* Section 1 */}
        <div className="bg-slate-50 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <Heart className="text-red-500" size={24} /> Why GoPDFGo Exists
          </h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              GoPDFGo was created out of frustration. As developers and
              students, we were tired of "free" tools that suddenly asked for
              a credit card after one use, or worse, tools that felt unsafe to
              use with personal documents.
            </p>
            <p>
              We wanted to build the tool <em>we</em> wanted to use: Clean,
              Fast, Honest, and Safe.
            </p>
            <p>
              By shifting the processing to the client-side, we removed the
              massive server costs that other companies face. This allows us
              to keep GoPDFGo completely free without relying on aggressive
              ads or selling user data.
            </p>
            <p className="pt-2 border-t border-slate-200">
              GoPDFGo is built and maintained by{" "}
              <strong className="text-slate-900">Faiz Siddiqui</strong>, a
              developer from India. It is an independent project, which is what
              makes the promise above workable: because your files are
              processed by your own browser, there are no servers to pay for
              and no reason to put everyday document tools behind a paywall. If
              something breaks or a tool you need is missing,{" "}
              <Link
                href="/contact"
                className="text-[#FF9933] font-semibold hover:underline"
              >
                the contact page
              </Link>{" "}
              reaches him directly.
            </p>
          </div>
        </div>
        {/* Section 2 */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <Shield className="text-green-600" size={24} /> User
            Responsibility
          </h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              <strong>Transparency is key.</strong> While our architecture
              ensures privacy, users should always practice digital safety.
            </p>
            <p>
              GoPDFGo operates as a tool provider, not a data custodian. Since
              we do not store files, we cannot recover lost documents for you.
              Once you close your browser tab, the processed data is wiped
              from memory instantly.
            </p>
            <p>
              We are committed to maintaining this platform as a transparent,
              open utility for the internet community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}