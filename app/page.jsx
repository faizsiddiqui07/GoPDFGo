import React from "react";
import Link from "next/link"; // Changed from react-router-dom
import {
  Shield,
  Globe,
  CheckCircle2,
  Lock,
  WifiOff,
  Users,
  Briefcase,
  GraduationCap,
  FileText,
  ServerOff,
  Laptop,
  Zap,
} from "lucide-react";
import { TOOLS_CONFIG } from "../utils/constants";

export const metadata = {
  title: "GoPDFGo – Free Secure PDF Tools | Merge, Split, Compress & Convert",
  description:
    "Use the safest free online PDF tools. Merge, Split, and Compress PDFs directly in your browser without uploading files. Perfect for students, professionals, and privacy-conscious users.",
  keywords:
    "secure pdf merge, client side pdf tools, private pdf converter, no upload pdf compressor, browser based pdf editor, offline pdf tools online",
  alternates: {
    canonical: "https://gopdfgo.com",
  },
}; 

export default function Home() {
  const getToolsByType = (type) =>
    TOOLS_CONFIG.filter((tool) => tool.type === type);

  const categories = [
    {
      title: "PDF Management Tools",
      type: "pdf",
      desc: "Merge, split, compress, and organize your documents securely.",
    },
    {
      title: "Image Converters & Editors",
      type: "image",
      desc: "Convert, resize, and optimize visuals without losing quality.",
    },
    {
      title: "Utility & Security",
      type: "utility",
      desc: "Generate QR codes, protect files, and more.",
    },
  ];

  const faqs = [
    {
      question: "Are free PDF tools safe to use for sensitive documents?",
      answer:
        "Safety depends on how the tool processes your data. Unlike traditional websites that upload your files to a cloud server, GoPDFGo uses 'Client-Side Processing'. This means your sensitive documents (like bank statements or ID proofs) never leave your device. The code runs entirely inside your browser, making it as safe as editing a file offline on your computer.",
    },
    {
      question: "What is the difference between Offline and Online PDF tools?",
      answer:
        "Offline tools require you to download and install heavy software, which consumes disk space and may require updates. Traditional Online tools require you to upload files to the internet, which takes time and data. GoPDFGo offers the best of both worlds: it runs in your browser (no installation) but processes files locally (no uploading), giving you the speed of offline software with the convenience of an online tool.",
    },
    {
      question: "Who should use GoPDFGo?",
      answer:
        "GoPDFGo is designed for everyone. Students use it to merge assignments into a single PDF. Office workers use it to compress large reports for emailing. Freelancers use it to create professional invoices, and government job applicants use it to resize photos and signatures to meet specific dimension requirements.",
    },
    {
      question: "Do I need an internet connection to use these tools?",
      answer:
        "You only need internet to load the website initially. Once the tool is loaded in your browser, many of our functions (like Image to PDF or Merge PDF) can actually work offline because the processing engine is downloaded to your device's temporary memory. This ensures maximum privacy and reliability.",
    },
    {
      question: "How many documents can I combine in a single batch?",
      answer:
        "Since we don't host your files on a server, we don't impose artificial limits. The maximum number of files depends solely on your computer's available RAM and processing speed, not on our servers. This allows you to combine dozens of documents in seconds without hitting a 'daily limit' or 'paywall'.",
    },
    {
      question: "Does GoPDFGo work on mobile phones?",
      answer:
        "Yes! Our platform is fully responsive and optimized for touch devices. Whether you are using an Android smartphone, an iPhone, an iPad, or a Windows tablet, you can compress, convert, and edit files directly from your mobile browser without installing any apps.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* =========================================
             1. HERO HEADER SECTION
        ========================================= */}
      <div className="relative overflow-hidden py-10">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-150 h-150 bg-orange-200/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-125 h-125 bg-blue-200/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Free Online PDF &amp; Image Tools{" "}
            <br className="hidden md:block" />
            <span className="text-[#FF9933]">Simple &amp; Secure</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            We&apos;ve rebuilt online PDF tools from the ground up.
            <strong> GoPDFGo</strong> lets you merge, split, compress and convert
            PDFs and images directly on your device — the privacy of offline
            software with the convenience of the web. No upload, no sign-up.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <Link
              href="/merge-pdf"
              className="bg-[#FF9933] text-white px-5 sm:px-6 md:px-8 py-3 rounded-full font-bold text-sm sm:text-base hover:bg-[#e68a2e] transition shadow-xl shadow-orange-200 hover:-translate-y-1 active:scale-95 active:translate-y-0 touch-manipulation"
            >
              Start Merging PDFs
            </Link>
            <Link
              href="/split-pdf"
              className="bg-white text-slate-700 border border-slate-200 px-5 sm:px-6 md:px-8 py-3 rounded-full font-bold text-sm sm:text-base hover:bg-slate-50 transition shadow-sm hover:shadow-md active:scale-95 touch-manipulation"
            >
              Split PDF
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================
             2. TOOLS GRID SECTION
        ========================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-6 sm:pb-10 space-y-10 sm:space-y-16">
        {categories.map((cat) => {
          const tools = getToolsByType(cat.type);

          if (tools.length === 0) return null;

          return (
            <div key={cat.type}>
              <div className="flex items-center gap-4 mb-8 px-2">
                <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-[#FF9933] pl-3">
                  {cat.title}
                </h2>

                <span className="text-sm text-slate-500 hidden sm:block bg-slate-100 px-3 py-1 rounded-full">
                  {cat.desc}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {tools.map((tool) => (
                  <Link
                    href={`/${tool.id}`}
                    key={tool.id}
                    className="group bg-white rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 active:scale-[0.97] touch-manipulation transition-[scale,box-shadow,border-color] duration-200 relative overflow-hidden flex flex-col  h-full"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[80px] -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500 opacity-50"></div>

                    <div className="flex items-center gap-x-4 mb-4 sm:mb-0">
                      <div
                        className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl sm:mb-5 flex items-center justify-center transition-colors duration-300 shadow-sm ${
                          tool.color === "orange"
                            ? "bg-orange-50 text-[#FF9933] group-hover:bg-[#FF9933] group-hover:text-white"
                            : tool.color === "blue"
                              ? "bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
                              : "bg-purple-50 text-purple-500 group-hover:bg-purple-500 group-hover:text-white"
                        }`}
                      >
                        <tool.icon size={24} strokeWidth={2} />
                      </div>

                      <h3 className="block sm:hidden text-lg font-bold text-slate-800 group-hover:text-[#FF9933] transition-colors">
                        {tool.title}
                      </h3>
                    </div>

                    <h3 className="hidden sm:block text-lg font-bold text-slate-800 mb-2 group-hover:text-[#FF9933] transition-colors">
                      {tool.title}
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed">
                      {tool.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================
             3. WHY BROWSER BASED IS SAFER (NEW SEO SECTION)
        ========================================= */}
      <div className="bg-white py-10 md:py-12 lg:py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Why Browser-Based PDF Tools Are{" "}
                <span className="text-[#FF9933]">Safer</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Most "free" PDF websites work by uploading your document to
                their server, processing it, and sending it back. This creates
                a risk: your data leaves your control.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                <strong>GoPDFGo is different.</strong> We use advanced
                browser-based technology to run the processing engine right
                inside your web browser.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mt-1 mr-4">
                    <ServerOff className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      Zero Server Uploads
                    </h4>
                    <p className="text-slate-500">
                      Your files physically cannot be stolen from our servers
                      because they never reach our servers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mt-1 mr-4">
                    <WifiOff className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      Works Offline
                    </h4>
                    <p className="text-slate-500">
                      Once loaded, you can disconnect your internet and the
                      tools will still work perfectly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200 relative">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                Data Journey Comparison
              </h3>

              <div className="space-y-6">
                {/* Bad Way */}
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm opacity-70">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-red-500 text-sm">
                      OTHER WEBSITES
                    </span>
                    <span className="text-xs text-slate-400">
                      Slow & Risky
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Laptop size={16} />
                    <span className="h-0.5 flex-1 bg-red-200"></span>
                    <div className="bg-red-50 p-1 rounded">
                      <Globe size={16} className="text-red-400" />
                    </div>
                    <span className="h-0.5 flex-1 bg-red-200"></span>
                    <Laptop size={16} />
                  </div>
                  <p className="text-xs text-center mt-2 text-slate-400">
                    Your file travels across the internet twice.
                  </p>
                </div>

                {/* Good Way */}
                <div className="bg-white p-6 rounded-xl border border-green-200 shadow-lg scale-105 ring-4 ring-green-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[#FF9933] text-sm">
                      GOPDFGO (YOU)
                    </span>
                    <span className="text-xs text-[#FF9933] font-bold">
                      Instant & Safe
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Laptop size={20} className="text-[#FF9933]" />
                    <span className="h-1 flex-1 bg-[#FF9933] rounded-full animate-pulse"></span>
                    <div className="p-2 rounded-full">
                      <Lock size={20} className="text-[#FF9933]" />
                    </div>
                  </div>
                  <p className="text-xs text-center mt-2 text-slate-500 font-medium">
                    Your file stays on your Laptop/Mobile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
             4. WHO SHOULD USE (PERSONAS)
        ========================================= */}
      <div className="py-10 md:py-12 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Who uses GoPDFGo?
            </h2>
            <p className="text-slate-600 mt-2">
              Tailored solutions for every user type.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-4 lg:gap-6">
            {/* Student */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-x-3 mb-3 sm:mb-0">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center sm:mb-4">
                  <GraduationCap size={24} />
                </div>
                <h3 className="block sm:hidden font-bold text-lg text-slate-900">
                  Students
                </h3>
              </div>
              <h3 className="hidden sm:block font-bold text-lg text-slate-900 mb-2">
                Students
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Merge lecture notes into one PDF, organize thesis chapters,
                and submit assignments in the correct format without needing
                paid software.
              </p>
            </div>

            {/* Office */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-x-3 mb-3 sm:mb-0">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center sm:mb-4">
                  <Briefcase size={24} />
                </div>
                <h3 className="block sm:hidden font-bold text-lg text-slate-900">
                  Professionals
                </h3>
              </div>
              <h3 className="hidden sm:block font-bold text-lg text-slate-900 mb-2">
                Professionals
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Compress heavy reports to send via email constraints, merge
                invoices for monthly accounting, and split contract pages
                securely.
              </p>
            </div>

            {/* Govt */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-x-3 mb-3 sm:mb-0">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center sm:mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="block sm:hidden font-bold text-lg text-slate-900">
                  Govt. Aspirants
                </h3>
              </div>
              <h3 className="hidden sm:block font-bold text-lg text-slate-900 mb-2">
                Govt. Aspirants
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Resize and compress photos and signatures to the exact size
                (e.g. 20KB–50KB) that SSC, UPSC, IBPS, NEET and other online
                exam and government application forms demand — instantly.
              </p>
            </div>

            {/* Freelancer */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-x-3 mb-3 sm:mb-0">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center sm:mb-4">
                  <Users size={24} />
                </div>
                <h3 className="block sm:hidden font-bold text-lg text-slate-900">
                  Freelancers
                </h3>
              </div>
              <h3 className="hidden sm:block font-bold text-lg text-slate-900 mb-2">
                Freelancers
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Manage client documents on the go using your mobile. No
                subscriptions, no watermarks, just professional results every
                time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= 
               WHY CHOOSE US (FEATURES)
        ========================================= */}
      <div className="py-8 sm:py-12 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why use our free PDF &amp; image tools?
            </h2>

            <p className="text-slate-600">
              We make working with PDF files and images easy, fast, and secure
              — free, with no upload and no sign-up.
            </p>
          </div>

          {/* Features Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {/* Feature 1: Secure */}

            <div className="group relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield
                  size={64}
                  className="text-blue-600 transform rotate-12"
                />
              </div>

              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                <Shield size={24} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                100% Secure Processing
              </h3>

              <p className="text-slate-600 leading-relaxed mb-4">
                Your privacy is our priority. Files are processed locally
                within your browser and never uploaded to any external server.
              </p>

              <ul className="space-y-2">
                <li className="flex items-center text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500 mr-2" />{" "}
                  No server uploads
                </li>

                <li className="flex items-center text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500 mr-2" />{" "}
                  Files never leave your device
                </li>
              </ul>
            </div>

            {/* Feature 2: Fast */}

            <div className="group relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap
                  size={64}
                  className="text-orange-500 transform -rotate-12"
                />
              </div>

              <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                <Zap size={24} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                Lightning Fast Speed
              </h3>

              <p className="text-slate-600 leading-relaxed mb-4">
                Skip the queue. With zero upload time and optimized local
                processing, your edits happen instantly without any lag.
              </p>

              <ul className="space-y-2">
                <li className="flex items-center text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500 mr-2" />{" "}
                  Instant rendering
                </li>

                <li className="flex items-center text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500 mr-2" />{" "}
                  Zero latency
                </li>
              </ul>
            </div>

            {/* Feature 3: Universal */}

            <div className="group relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe
                  size={64}
                  className="text-emerald-500 transform rotate-6"
                />
              </div>

              <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <Globe size={24} className="text-white" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                Universal Access
              </h3>

              <p className="text-slate-600 leading-relaxed mb-4">
                Work from anywhere. Whether you're on Windows, Mac, Linux, or
                mobile, our tools work seamlessly across all platforms.
              </p>

              <ul className="space-y-2">
                <li className="flex items-center text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500 mr-2" />{" "}
                  Works on any OS
                </li>

                <li className="flex items-center text-sm text-slate-500">
                  <CheckCircle2 size={16} className="text-green-500 mr-2" />{" "}
                  Mobile optimized
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
             5. CONTENT FOOTER (SEO TEXT)
        ========================================= */}
      <section className="bg-white pb-8 sm:pb-10">
        <div className="max-w-4xl mx-auto px-4 text-slate-700 leading-relaxed space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Are Free PDF Tools Safe?
            </h2>
            <p>
              Safety is the number one concern for users when dealing with
              online file converters. The truth is,{" "}
              <strong>not all free tools are safe.</strong> Many require you
              to upload your files to unknown servers where they could
              potentially be stored, viewed, or hacked.
            </p>
            <p className="mt-4">
              However, <strong>GoPDFGo redefines safety</strong> by removing
              the server from the equation entirely. By utilizing
              browser-based processing, we ensure that your file remains in
              your own computer's memory (RAM) throughout the entire editing
              process. Our serverless architecture ensures that your files stay strictly in your control—invisible to us and safe from external access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Offline vs Online Tools
              </h3>
              <p className="text-sm">
                <strong>Offline Tools (Desktop Software):</strong> Secure and
                fast, but expensive and require installation (Adobe Acrobat,
                etc.).
                <br />
                <br />
                <strong>Online Tools (Cloud Converters):</strong> Convenient
                but often slow and less secure due to uploading.
                <br />
                <br />
                <strong>GoPDFGo (Hybrid):</strong> We combine the security of
                offline tools with the convenience of online tools. No
                install, no upload.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Why Choose Us?
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <CheckCircle2
                    size={16}
                    className="text-green-500 mr-2 shrink-0"
                  />{" "}
                  No file uploads to external servers
                </li>
                <li className="flex items-center">
                  <CheckCircle2
                    size={16}
                    className="text-green-500 mr-2 shrink-0"
                  />{" "}
                  No account or sign-up required
                </li>
                <li className="flex items-center">
                  <CheckCircle2
                    size={16}
                    className="text-green-500 mr-2 shrink-0"
                  />{" "}
                  No watermarks on downloaded files
                </li>
                <li className="flex items-center">
                  <CheckCircle2
                    size={16}
                    className="text-green-500 mr-2 shrink-0"
                  />{" "}
                  Works on Windows, macOS, Linux, Android, and iOS
                </li>
                <li className="flex items-center">
                  <CheckCircle2
                    size={16}
                    className="text-green-500 mr-2 shrink-0"
                  />{" "}
                  Completely free to use
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* =========================================
             6. FAQ SECTION
        ========================================= */}
      <div className="pt-4 pb-8 sm:py-10 md:py-14 lg:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Everything you need to know about our privacy and tools.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <h3 className="font-bold text-slate-800 text-lg sm:text-xl mb-2 flex items-start">
                  <span className="text-[#FF9933] mr-3 mt-1">Q.</span>
                  {faq.question}
                </h3>
                <div className="text-slate-600 leading-relaxed pl-8">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}