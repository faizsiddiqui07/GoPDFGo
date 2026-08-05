import React from "react";
import Link from "next/link"; // Changed from react-router-dom
import {
  Coffee,
  DollarSign,
  Heart,
  Lock,
  Zap,
  ShieldCheck,
  ServerOff,
  CheckCircle2,
  XCircle,
  FileText,
  Briefcase,
  GraduationCap,
} from "lucide-react";

// --- Next.js Native SEO ---
export const metadata = {
  title: "Why GoPDFGo? The Future of Private & Secure PDF Tools",
  description:
    "Discover the technology behind GoPDFGo. We provide 100% serverless, browser-based PDF tools. Learn why millions trust our privacy-first architecture for secure document processing.",
  keywords:
    "why gopdfgo, secure pdf editor, serverless document tools, client side pdf processing, privacy first pdf tools, free online pdf converter, no upload pdf tools, browser based pdf technology",
  alternates: {
    canonical: "https://gopdfgo.com/why-gopdfgo",
  },
};

export default function WhyGoPdfGoPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-700 leading-relaxed">
      {/* =========================================
           1. HERO SECTION (High Impact)
      ========================================= */}
      <div className="bg-slate-900 text-white pt-20 pb-10 px-4 text-center relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Why the World Needs <br />{" "}
            <span className="text-[#FF9933]">GoPDFGo</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            In an age of data leaks and surveillance, we built a sanctuary for
            your documents.
            <strong>GoPDFGo</strong> is one of the very few platforms that
            processes files <em>exclusively</em> on your device, ensuring that
            your data remains 100% yours.
          </p>
        </div>
      </div>

      {/* =========================================
           2. THE PROBLEM: THE DATA PRIVACY CRISIS
      ========================================= */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 md:py-8 lg:py-10 border-b border-slate-200">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mt-2">
            Where do your files actually go?
          </h2>
        </div>

        <div className="prose prose-lg text-slate-600 mx-auto space-y-6">
          <p>
            Every single day, millions of students, lawyers, and business
            owners search for tools like "Merge PDF" or "Compress Image." They
            click the first result, upload their most sensitive documents—bank
            statements, tax returns, legal contracts, and personal IDs—and
            wait for the magic to happen.
          </p>
          <p>
            But here is the uncomfortable truth:{" "}
            <strong>Most online PDF tools act as a middleman.</strong> When
            you use them, you are physically uploading your file to a remote
            server located in a different country. This server processes your
            file and sends it back to you.
          </p>
          <h3 className="text-xl font-bold text-slate-900">
            Why is this dangerous?
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Data Retention Risks:</strong> While many sites claim to
              delete files after "1 hour," you have no way to verify this.
              Server logs, backups, and cached data can persist for months.
            </li>
            <li>
              <strong>Security Breaches:</strong> Centralized servers are
              honeypots for hackers. If the website you use gets hacked, your
              uploaded documents could be leaked to the dark web.
            </li>
            <li>
              <strong>Corporate Surveillance:</strong> Some "free" tools
              monetize by analyzing user data, reading document metadata, or
              selling usage patterns to third-party advertisers.
            </li>
          </ul>
          <p className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-slate-800 font-medium">
            We believe this model is broken. You shouldn't have to trade your
            privacy for convenience. That is why we built GoPDFGo from the
            ground up to be different.
          </p>
        </div>
      </div>

      {/* =========================================
           3. THE SOLUTION: CLIENT-SIDE ARCHITECTURE
      ========================================= */}
      <div className="bg-white py-4 sm:py-6 md:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mt-2">
              The Power of Serverless Processing
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg">
              We don't just protect your data; we ensure we never touch it in
              the first place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center">
            <div className="space-y-6 text-lg">
              <p>
                GoPDFGo uses{" "}
                <strong>cutting-edge browser-based technology</strong> to run
                powerful, desktop-grade code directly inside your web browser
                (Chrome, Edge, Safari, or Firefox) — nothing is installed and
                nothing is uploaded.
              </p>
              <p>
                When you use our{" "}
                <Link
                  href="/compress-pdf"
                  className="text-[#FF9933] font-bold hover:underline"
                >
                  PDF Compressor
                </Link>{" "}
                or{" "}
                <Link
                  href="/image-to-pdf"
                  className="text-[#FF9933] font-bold hover:underline"
                >
                  Image Converter
                </Link>
                , your browser acts as the computer. Your CPU does the math.
                Your RAM stores the temporary data.
              </p>
              <p>
                <strong>The Result?</strong> The file never leaves your
                device. It is mathematically impossible for us, or any hacker
                intercepting the connection, to see your file because it is
                never transmitted over the internet. It's as secure as using
                offline software, but with the convenience of a website.
              </p>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-100 relative">
              <div className="hidden sm:block absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                How It Works
              </div>
              <ul className="space-y-6 mt-4">
                <li className="flex gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                    <Lock className="text-blue-500" size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      1. Local Loading
                    </h4>
                    <p className="text-sm">
                      You select a file. Your browser loads it into local
                      memory. No upload bar.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                    <Zap className="text-[#FF9933]" size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      2. Instant Processing
                    </h4>
                    <p className="text-sm">
                      Our in-browser engine edits the file instantly using
                      your device&apos;s power.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm h-fit">
                    <CheckCircle2 className="text-green-500" size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      3. Secure Download
                    </h4>
                    <p className="text-sm">
                      You save the new file. The data is wiped from memory
                      immediately.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
           5. USE CASES BY INDUSTRY (New Section)
      ========================================= */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 md:py-8 lg:py-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-6 md:mb-8 lg:mb-10">
          Trusted by Professionals Everywhere
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-x-3 mb-3 sm:mb-0">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center sm:mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="block sm:hidden text-xl font-bold text-slate-900">
                Legal & Corporate
              </h3>
            </div>
            <h3 className="hidden sm:block text-xl font-bold text-slate-900 mb-3">
              Legal & Corporate
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Lawyers and accountants handle sensitive contracts and financial
              audits. Uploading these to a public server breaks
              confidentiality (NDA) agreements.
            </p>
            <p className="text-sm font-medium text-slate-800">
              <strong>Solution:</strong> Use GoPDFGo’s{" "}
              <Link
                href="/aadhaar-masking"
                className="text-[#FF9933] hover:underline"
              >
                ID Masking
              </Link>{" "}
              and Merge tools to process confidential client data locally
              without breaching trust.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-x-3 mb-3 sm:mb-0">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center sm:mb-6">
                <GraduationCap size={24} />
              </div>
              <h3 className="block sm:hidden text-xl font-bold text-slate-900">
                Education & Research
              </h3>
            </div>
            <h3 className="hidden sm:block text-xl font-bold text-slate-900 mb-3">
              Education & Research
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Students often work with massive thesis papers and scanned
              textbooks that exceed the "100MB limit" on other sites.
            </p>
            <p className="text-sm font-medium text-slate-800">
              <strong>Solution:</strong> GoPDFGo has no file size limits.
              Compress or{" "}
              <Link
                href="/split-pdf"
                className="text-[#FF9933] hover:underline"
              >
                Split heavy textbooks
              </Link>{" "}
              instantly, regardless of your internet connection speed.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-x-3 mb-3 sm:mb-0">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center sm:mb-6">
                <FileText size={24} />
              </div>
              <h3 className="block sm:hidden text-xl font-bold text-slate-900">
                Design & Creative
              </h3>
            </div>
            <h3 className="hidden sm:block text-xl font-bold text-slate-900 mb-3">
              Design & Creative
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Designers need to convert high-res assets without losing
              quality. Standard converters often compress aggressively,
              ruining the image.
            </p>
            <p className="text-sm font-medium text-slate-800">
              <strong>Solution:</strong> Use our{" "}
              <Link
                href="/convert-png"
                className="text-[#FF9933] hover:underline"
              >
                Lossless PNG Converter
              </Link>{" "}
              to maintain pixel-perfect quality for portfolios and client
              deliverables.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
           6. THE FOUNDER'S VISION (Storytelling)
      ========================================= */}
      <div className="bg-slate-50 py-4 sm:py-6 md:py-8 lg:py-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Heart className="w-10 sm:w-12 h-10 sm:h-12 text-red-500 mx-auto mb-4 sm:mb-5 md:mb-6 fill-current" />
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Built with Code, Coffee, and Ethics
          </h2>
          <div className="prose prose-lg text-slate-600 mx-auto leading-relaxed">
            <p>
              GoPDFGo was started as a passionate response to the state of the
              modern web. We were tired of seeing useful tools hidden behind
              paywalls, riddled with intrusive ads, or designed to harvest
              user data. We believed that basic digital utilities—like the
              ability to merge two PDF files or crop an image—should be a
              public good, accessible to everyone, everywhere.
            </p>
            <p>
              We spent months optimizing open-source libraries to run in the
              browser environment. We removed the backend database entirely.
              We stripped away the tracking cookies.
            </p>
            <p>
              Today, GoPDFGo stands as a testament to the{" "}
              <strong>Privacy-First Internet</strong>. We are proud to serve a
              global community of users who value their digital sovereignty.
              Whether you are masking an ID card for a hotel check-in or
              compressing a presentation for a boardroom meeting, we are
              honored to be your trusted tool.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
           7. FINAL CTA
      ========================================= */}
      <div className="bg-slate-900 text-white py-10 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Ready to experience the difference?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of users who have switched to the faster, safer,
            and freer way to manage documents. No signup. No installation.
            Just start.
          </p>

          <div className="flex gap-2 sm:gap-6 justify-center items-center">
            <Link
              href="/"
              className="bg-[#FF9933] text-white px-2 sm:px-6 md:px-10 py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:bg-[#e68a2e] transition shadow-lg shadow-orange-500/30 w-auto"
            >
              Explore All Tools
            </Link>

            <Link
              href="/contact"
              className="bg-slate-800 border border-slate-700 text-white px-2 sm:px-6 md:px-10 py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:bg-slate-700 transition w-auto"
            >
              Support Our Mission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}