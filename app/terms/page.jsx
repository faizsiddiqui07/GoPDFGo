import React from "react";
import Link from "next/link"; // Changed from react-router-dom
import {
  ShieldCheck,
  AlertCircle,
  Scale,
  Copyright,
  Gavel,
} from "lucide-react";

// --- Next.js Native SEO ---
export const metadata = {
  title: "Terms & Conditions – GoPDFGo | User Agreement",
  description:
    "Read the Terms of Service for GoPDFGo. Understanding our serverless, client-side processing model, user rights, and liability limitations.",
  keywords:
    "gopdfgo terms, pdf tools legal, user agreement, privacy policy, terms of service",
  alternates: {
    canonical: "https://gopdfgo.com/terms",
  },
};

export default function TermsAndConditionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
      <h1 className="text-[26px] sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 sm:mb-10">
        Terms & Conditions
      </h1>

      <div className="space-y-10 sm:space-y-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2 sm:mb-3 flex items-center gap-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-slate-600 leading-relaxed">
            By accessing or using <span className="font-semibold">GoPDFGo</span>
            , you acknowledge that you have read, understood, and agree to be
            bound by these Terms of Service. If you do not agree to abide by
            these terms, please do not use our services including PDF Merging,
            Compression, or Conversion tools.
          </p>
        </section>

        {/* Section 2: USP Highlight within Legal */}
        <section className="bg-orange-50 p-4 sm:p-6 rounded-xl border border-orange-100">
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            2. Privacy & Data Processing (Serverless Nature)
          </h2>
          <p className="text-slate-700 leading-relaxed">
            GoPDFGo operates on a{" "}
            <span className="font-bold">serverless, client-side model</span>.
            Your documents are never transmitted to, retained on, or inspected
            by our backend systems. All processing (e.g., compressing a PDF,
            masking an Aadhaar card) is performed locally within your browser
            on your own device. You retain full ownership, privacy, and control
            of your data at all times.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            3. User Conduct
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Your use of the Service must strictly adhere to all applicable laws
            and regulations. It is a violation of this agreement to utilize our
            platform to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>Process illegal, stolen, or malicious content.</li>
            <li>
              Attempt to reverse engineer, decompile, or copy the client-side
              code.
            </li>
            <li>
              Violate any applicable local, state, national, or international
              law.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            4. Disclaimer of Warranties
          </h2>
          <div className="flex gap-4 items-start">
            <AlertCircle
              className="hidden sm:block text-slate-400 shrink-0 mt-1"
              size={20}
            />
            <p className="text-slate-600 leading-relaxed">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
              GoPDFGo makes no representations or warranties of any kind,
              express or implied, regarding the operation of our tools (such as{" "}
              <Link
                href="/image-to-pdf"
                className="text-[#FF9933] hover:underline"
              >
                Image to PDF
              </Link>
              ). We do not guarantee that the results will be error-free,
              compatible with all devices, or suitable for specific legal
              purposes.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            5. Changes to Terms
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We reserve the right to modify these terms at any time. Your
            continued use of GoPDFGo after any such changes constitutes your
            acceptance of the new Terms & Conditions.
          </p>
        </section>

        {/* Section 6: Intellectual Property (NEW) */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Copyright className="hidden sm:block text-slate-400" size={20} />
            6. Intellectual Property Rights
          </h2>
          <p className="text-slate-600 leading-relaxed mb-3">
            <strong>Your Data:</strong> We claim no intellectual property rights
            over the files you process using our tools. Your documents remain
            yours.
          </p>
          <p className="text-slate-600 leading-relaxed">
            <strong>Our Code:</strong> The GoPDFGo website, including its
            interface, logos, code, and proprietary algorithms, is the property
            of GoPDFGo and is protected by copyright and intellectual property
            laws.
          </p>
        </section>

        {/* Section 7: Limitation of Liability (NEW) */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Scale className="hidden sm:block text-slate-400" size={20} />
            7. Limitation of Liability
          </h2>
          <p className="text-slate-600 leading-relaxed">
            To the fullest extent permitted by law, GoPDFGo shall not be liable
            for any direct, indirect, incidental, or consequential damages
            resulting from the use or inability to use the Service. Since files
            are processed on your device hardware, we are not responsible for
            any local data loss, browser crashes, or device performance issues
            during processing.
          </p>
        </section>

        {/* Section 8: Governing Law (NEW) */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Gavel className="hidden sm:block text-slate-400" size={20} />
            8. Governing Law
          </h2>
          <p className="text-slate-600 leading-relaxed">
            The validity, construction, and performance of these Terms are
            subject to the laws of India, excluding any principles of conflicts
            of law that would result in the application of the laws of another
            jurisdiction.
          </p>
        </section>

        {/* Footer Note */}
        <div className="border-t border-slate-200 pt-4 sm:pt-6 md:pt-8 mt-4 sm:mt-6 md:mt-8">
          <p className="text-slate-500 text-sm">
            Questions regarding these terms? Please contact us at{" "}
            <a
              href="mailto:contact.gopdfgo@gmail.com"
              className="text-[#FF9933] hover:underline font-medium"
            >
              contact.gopdfgo@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}