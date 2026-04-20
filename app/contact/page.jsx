import React from "react";
import Link from "next/link"; // Changed from react-router-dom
import {
  Mail,
  MessageSquare,
  FileText,
  Clock,
  ShieldAlert,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

// --- Next.js Native SEO ---
export const metadata = {
  title: "Contact GoPDFGo – Support, Feedback & Partnership",
  description:
    "Get in touch with the GoPDFGo team. We offer email support for our privacy-first PDF tools. Check our FAQ or report bugs directly.",
  keywords:
    "contact gopdfgo, pdf tool support, report bug, feature request, gopdfgo email, privacy feedback",
  alternates: {
    canonical: "https://gopdfgo.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16 font-sans text-slate-700">
      {/* =========================================
           1. HEADER SECTION
      ========================================= */}
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          We'd love to hear from you
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          GoPDFGo is built by developers who care about privacy. Whether you
          have a feature request for our{" "}
          <Link href="/" className="text-[#FF9933] font-medium hover:underline">
            PDF tools
          </Link>
          , found a bug, or just want to say hi, we are listening.
        </p>
      </div>

      {/* =========================================
           2. PRIMARY CONTACT METHODS (Grid)
      ========================================= */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-16">
        {/* Card 1: Email Support */}
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-x-3 mb-3 md:mb-0">
              <div className="w-10 sm:w-14 h-10 sm:h-14 bg-orange-100 rounded-2xl flex items-center justify-center md:mb-6">
                <Mail className="w-5 sm:w-7 h-5 sm:h-7 text-[#FF9933]" />
              </div>
              <h2 className="block md:hidden text-2xl font-bold text-slate-900">
                General Support
              </h2>
            </div>
            <h2 className="hidden md:block text-2xl font-bold text-slate-900 mb-3">
              General Support
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              For bug reports, partnership inquiries, or general feedback. We
              are a small team, but we read every single email.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <Clock size={16} /> Response Time:
              </div>
              <div className="font-medium text-slate-800">24 - 48 Hours</div>
            </div>

            <a
              href="mailto:contact.gopdfgo@gmail.com"
              className="inline-flex items-center gap-2 text-[#FF9933] font-bold text-lg hover:underline"
            >
              contact.gopdfgo@gmail.com
            </a>
          </div>
        </div>

        {/* Card 2: Quick Help / FAQ */}
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition duration-300 relative overflow-hidden">
          <div className="flex items-center gap-x-3 mb-3 md:mb-0">
            <div className="w-10 sm:w-14 h-10 sm:h-14 bg-blue-50 rounded-2xl flex items-center justify-center md:mb-6">
              <MessageSquare className="w-5 sm:w-7 h-5 sm:h-7 text-blue-600" />
            </div>
            <h2 className="block md:hidden text-2xl font-bold text-slate-900">
              Before you email...
            </h2>
          </div>
          <h2 className="hidden md:block text-2xl font-bold text-slate-900 mb-3">
            Before you email...
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Most questions are answered instantly in our Help Center. Check
            these common topics first:
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition cursor-default">
              <ShieldAlert className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
              <span className="text-sm font-medium">
                I can't open my processed file.
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition cursor-default">
              <FileText className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
              <span className="text-sm font-medium">
                Why is the conversion taking time?
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition cursor-default">
              <HeartHandshake className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
              <span className="text-sm font-medium">
                Is GoPDFGo really free?
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* =========================================
           3. PRIVACY NOTICE (Critical for Trust)
      ========================================= */}
      <div className="bg-blue-50 rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-100 flex flex-col sm:flex-row gap-6 items-start mb-10 sm:mb-12 md:mb-16">
        <ShieldAlert className="w-8 h-8 text-blue-600 shrink-0" />
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            Important Privacy Notice
          </h3>
          <p className="text-blue-800 leading-relaxed text-sm sm:text-base">
            Please remember that GoPDFGo operates on a{" "}
            <strong>Serverless Architecture</strong>. We do not have access to
            your files. We cannot recover lost documents, view your{" "}
            <Link
              href="/aadhaar-masking"
              className="underline hover:text-blue-950"
            >
              Aadhaar Masking
            </Link>{" "}
            history, or restore deleted files. Please do not attach sensitive
            personal documents in your emails to us.
          </p>
        </div>
      </div>

      {/* =========================================
           4. DETAILED FAQ SECTION (SEO Content)
      ========================================= */}
      <div className="max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-500" />
              Do you offer API access?
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Currently, we do not offer a public API. GoPDFGo is designed as
              a direct-to-consumer web tool. However, if you are an enterprise
              looking for a custom on-premise solution, please reach out to us
              via email.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-500" />I found a
              bug. How do I report it?
            </h3>
            <p className="text-slate-600 leading-relaxed">
              We appreciate bug reports! Please email us with the subject line
              "Bug Report". Include the browser you are using (e.g., Chrome,
              Safari) and the type of file (e.g., PDF, JPG) that caused the
              issue. Screenshots are very helpful.
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-500" />
              Can I suggest a new feature?
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Absolutely! Many of our tools, like the{" "}
              <Link
                href="/image-to-pdf"
                className="text-[#FF9933] hover:underline"
              >
                Image to PDF converter
              </Link>
              , were built because users asked for them. Let us know what you
              need, and we might build it next.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
           5. TRANSPARENCY & VALUES (Footer Content)
      ========================================= */}
      <div className="border-t border-slate-200 pt-6 sm:pt-10 mt-8 sm:mt-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Our Commitment
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              We are committed to maintaining GoPDFGo as a transparent, open
              utility for the internet community. We do not sell user data, we
              do not use dark patterns, and we do not hide features behind
              paywalls.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Legal Inquiries
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              If you believe any content on this website violates applicable
              laws or policies, please contact us immediately. We take
              intellectual property and digital rights seriously and will
              review the matter responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}