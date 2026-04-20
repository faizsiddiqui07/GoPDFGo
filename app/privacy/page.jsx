import React from "react";
import {
  ShieldCheck,
  EyeOff,
  ServerOff,
  Database,
  HelpCircle,
} from "lucide-react";

// --- Next.js Native SEO ---
export const metadata = {
  title: "Privacy Policy – Your Files Stay on Your Device | GoPDFGo",
  description:
    "Read GoPDFGo’s privacy policy. All files are processed locally in your browser and never uploaded or stored on servers.",
  keywords:
    "pdf privacy policy, secure pdf tools, no upload pdf, no upload pdf tools, client side pdf processing, secure pdf tools online, private pdf editor, browser based pdf tools, data safe pdf tools",
  alternates: {
    canonical: "https://gopdfgo.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-16 pb-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Privacy Policy – Your Files Stay on Your Device
        </h1>
        <p className="text-base sm:text-lg text-slate-500">
          The short version:{" "}
          <span className="text-[#FF9933] font-bold">
            We don't see, store, or upload your files.
          </span>
        </p>
      </div>

      {/* Privacy Promise Box */}
      <div className="bg-[#FF9933]/10 border border-[#FF9933] rounded-2xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row gap-6 items-center">
        <div className="bg-white p-3 sm:p-4 rounded-full shadow-sm text-[#FF9933]">
          <ShieldCheck className="w-8 sm:w-10 h-8 sm:h-10" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Our Privacy Promise
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Unlike other PDF tools, we do not transfer your files to our
            servers. All processing (compression, merging, masking) happens{" "}
            <strong>locally in your web browser</strong>. This means your PDFs
            and images are processed using your device’s CPU, not our servers.
            Your documents literally never leave your device.
          </p>
        </div>
      </div>

      {/* Detailed Grid */}
      <div className="grid gap-8">
        <div className="flex gap-4">
          <ServerOff className="w-8 h-8 text-slate-400 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              No Server Uploads
            </h3>
            <p className="text-slate-600">
              When you "upload" a file on GoPDFGo, it is simply being loaded
              into your browser's memory. We do not have a backend database
              storing your PDFs, images, or credit card statements.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <EyeOff className="w-8 h-8 text-slate-400 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              No Human Access
            </h3>
            <p className="text-slate-600">
              Since we don't have your files, we can't read them. There is no
              admin panel where our team can view what you are working on.
              Total privacy by design.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Database className="w-8 h-8 text-slate-400 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Data Collection
            </h3>
            <p className="text-slate-600">
              We only collect anonymous usage data (e.g., "someone visited the
              Compress PDF page") using Google Analytics with IP anonymization
              enabled to improve our website. We do not track your personal
              identity or document contents.
            </p>
          </div>
        </div>
      </div>

      {/* Mini FAQ for Long-tail SEO */}
      <div className="mt-6 sm:mt-10 bg-slate-100 rounded-xl p-4 sm:p-6 border border-slate-200 flex gap-4">
        <HelpCircle className="w-6 h-6 text-[#FF9933] shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-slate-800 mb-2">
            Does GoPDFGo store my files?
          </h3>
          <p className="text-slate-600">
            No. Your files are processed locally in your browser and are never
            uploaded, stored, or logged on our servers.
          </p>
        </div>
      </div>

      {/* =========================================
           ANALYTICS & ADVERTISING DISCLOSURE
      ========================================= */}
      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Analytics and Advertising
        </h2>

        <p className="text-slate-600 leading-relaxed mb-4">
          GoPDFGo uses privacy-focused analytics tools to understand how visitors
          interact with our website. These analytics collect only anonymous
          information, such as page visits and device type, and do not include
          personal data or document contents.
        </p>

        <p className="text-slate-600 leading-relaxed">
          If and when advertising is displayed on GoPDFGo, it may be served by
          third-party advertising partners such as Google AdSense. These partners may
          use cookies or similar technologies to show relevant ads based on general
          browsing behavior. Users can manage or disable personalized advertising
          through their browser or Google ad settings.
        </p>
      </div>

      {/* =========================================
           CHILDREN’S PRIVACY & POLICY UPDATES
      ========================================= */}
      <div className="mt-4 sm:mt-6 bg-slate-100 rounded-xl p-5 sm:p-6 border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          Children’s Information
        </h2>

        <p className="text-slate-600 leading-relaxed mb-3">
          GoPDFGo does not knowingly collect any Personal Identifiable Information
          from children under the age of 13. If you believe that your child has
          provided personal information on our website, please contact us and we will
          promptly remove such information from our records.
        </p>

        <p className="text-slate-600 leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will be
          reflected on this page, and continued use of the website indicates
          acceptance of the updated policy.
        </p>
      </div>
    </div>
  );
}