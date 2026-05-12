import React from "react";
import Link from "next/link"; // Changed from react-router-dom
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-10 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Grid: Mobile pe 1 column, Tablet pe 2, Desktop pe 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {/* Column 1: Brand Info & Privacy Badge */}
          <div className="space-y-6 flex flex-col justify-center items-center sm:block">
            <Link href="/" className="block">
              <Image
                src="/images/logo.webp"
                width="160"
                height="40"
                className="w-40 h-10 object-contain"
                alt="GoPDFGo"
              />
            </Link>
            <p className="text-center sm:text-start text-sm text-slate-500 leading-relaxed">
              Secure, serverless, and free digital tools for everyone. We
              process your files locally in your browser.
            </p>
          </div>

          <div className="hidden md:block">
            <h4 className="text-slate-900 font-bold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href="/merge-pdf"
                  className="hover:text-[#FF9933] transition"
                >
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/compress-pdf"
                  className="hover:text-[#FF9933] transition"
                >
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/image-to-pdf"
                  className="hover:text-[#FF9933] transition"
                >
                  Image to PDF
                </Link>
              </li>
              <li>
                <Link
                  href="/aadhaar-masking"
                  className="hover:text-[#FF9933] transition"
                >
                  Mask Aadhaar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (Separated) */}
          <div className="hidden md:block">
            <h4 className="text-slate-900 font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-[#FF9933] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#FF9933] transition">
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/why-gopdfgo"
                  className="hover:text-[#FF9933] transition"
                >
                  Why GoPDFGo?
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-[#FF9933] transition"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#FF9933] transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex justify-around md:hidden">
            <div>
              <h4 className="text-slate-900 font-bold mb-4">Popular Tools</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="/merge-pdf"
                    className="hover:text-[#FF9933] transition"
                  >
                    Merge PDF
                  </Link>
                </li>
                <li>
                  <Link
                    href="/compress-pdf"
                    className="hover:text-[#FF9933] transition"
                  >
                    Compress PDF
                  </Link>
                </li>
                <li>
                  <Link
                    href="/image-to-pdf"
                    className="hover:text-[#FF9933] transition"
                  >
                    Image to PDF
                  </Link>
                </li>
                <li>
                  <Link
                    href="/aadhaar-masking"
                    className="hover:text-[#FF9933] transition"
                  >
                    Mask Aadhaar
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company (Separated) */}
            <div>
              <h4 className="text-slate-900 font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#FF9933] transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="hover:text-[#FF9933] transition"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/why-gopdfgo"
                    className="hover:text-[#FF9933] transition"
                  >
                    Why GoPDFGo?
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-[#FF9933] transition"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#FF9933] transition"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Legal (Separated as requested) */}
          <div className="hidden md:block">
            <h4 className="text-slate-900 font-bold mb-4">Legal & Support</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#FF9933] transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FF9933] transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            <a
              href="https://sellwithboost.com"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="Listed on Sell With Boost"
            >
              <img
                src="https://sellwithboost.com/badge/listing.svg"
                alt="Listed on Sell With boost"
                style={{ height: "40px", width: "auto" }}
                className="mt-2"
              />
            </a>
          </div>
        </div>

        <div className="block md:hidden mb-2">
          <h4 className="text-slate-900 font-bold mb-4 text-center">
            Legal & Support
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 flex justify-around items-center gap-x-2 md:hidden">
            <li>
              <Link href="/privacy" className="hover:text-[#FF9933] transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#FF9933] transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
          <a
              href="https://sellwithboost.com"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="Listed on Sell With Boost"
            >
              <img
                src="https://sellwithboost.com/badge/listing.svg"
                alt="Listed on Sell With boost"
                style={{ height: "40px", width: "auto" }}
                className="mt-2 mx-auto"
              />
            </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-6 flex justify-center items-center gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} GoPDFGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
