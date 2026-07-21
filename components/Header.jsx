"use client"; // Next.js requirement for interactive components

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Changed from react-router-dom
import {
  Layers, FileText, Menu, X, ChevronDown, ImageIcon,
  QrCode, Maximize2, RefreshCw, Palette, Wand2, BookOpen,
} from "lucide-react";
import { TOOLS_CONFIG } from "../utils/constants";
import { getToolIcon } from "../utils/icons";
import Image from "next/image";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);

  // Body scroll-lock for mobile menu — always restore on close/unmount (no leak)
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // --- FILTERING TOOLS LOGIC ---
  const pdfTools = TOOLS_CONFIG.filter((t) => t.type === "pdf");
  const imageTools = TOOLS_CONFIG.filter((t) => t.type === "image");

  const imgEssentials = imageTools.filter((t) =>
    ["compress-png", "compress-webp", "compress-jpg", "compress-jpeg", "resize", "crop"].includes(t.id)
  );

  const imgConverters = imageTools.filter(
    (t) => t.id.includes("convert") || t.id.startsWith("heic-to-")
  );

  const imgEditing = imageTools.filter(
    (t) =>
      !t.id.includes("convert") &&
      !t.id.startsWith("heic-to-") &&
      !["compress-png", "compress-webp", "compress-jpg", "compress-jpeg", "resize", "crop"].includes(t.id)
  );

  // Three columns, split by what the user is trying to DO rather than by
  // whatever balances the count. Two columns meant one of them ran to nine
  // rows, which is where the menu started to read as a wall.
  const pdfManageIds = [
    "merge-pdf",
    "split-pdf",
    "extract-pdf-pages",
    "delete-pdf-pages",
    "rearrange-pdf",
    "organize-pdf",
  ];
  const pdfConvertIds = [
    "image-to-pdf",
    "pdf-to-image",
    "pdf-to-text",
    "ocr-pdf",
  ];

  const pdfManageTools = pdfTools.filter((t) => pdfManageIds.includes(t.id));
  const pdfConvertTools = pdfTools.filter((t) => pdfConvertIds.includes(t.id));
  // Everything left over — compress, rotate, page numbers, watermark, sign,
  // unlock. Left as the remainder so a newly added PDF tool still shows up
  // somewhere instead of silently vanishing from the menu.
  const pdfEditTools = pdfTools.filter(
    (t) => !pdfManageIds.includes(t.id) && !pdfConvertIds.includes(t.id),
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleMobileAccordion = (id) => {
    setMobileAccordion(mobileAccordion === id ? null : id);
  };

  return (
    <> 
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <Image
              src="/images/logo.webp"
              width="350"
              height="77"
              className="w-40 sm:w-50 h-auto"
              alt="GoPDFGo"
              fetchPriority="high"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/merge-pdf"
              className="flex items-center gap-2 px-3 lg:px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-[#FF9933] hover:bg-orange-50 rounded-full transition-all duration-200"
            >
              Merge PDF
            </Link>
            <Link
              href="/qr-generator"
              className="flex items-center gap-2 px-3 lg:px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-[#FF9933] hover:bg-orange-50 rounded-full transition-all duration-200"
            >
              QR Code
            </Link>
            <div className="h-8 w-px bg-slate-200 mx-2 lg:mx-3"></div>

            {/* PDF Tools Dropdown */}
            <div
              className="relative group px-2 py-4"
              onMouseEnter={() => setActiveDropdown("pdf")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() =>
                  setActiveDropdown((p) => (p === "pdf" ? null : "pdf"))
                }
                aria-expanded={activeDropdown === "pdf"}
                aria-haspopup="true"
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-[#FF9933] bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50 rounded-full transition-all duration-200 shadow-sm hover:shadow-md group-hover:ring-2 ring-orange-100 ring-offset-2"
              >
                All PDF Tools{" "}
                <ChevronDown
                  size={15}
                  className="group-hover:rotate-180 transition-transform duration-300"
                />
              </button>
              <div
                className={`absolute top-full left-0 -translate-x-1/2 w-[min(47rem,calc(80vw_-_3rem))] pt-4 transition-all duration-200 transform z-50 ${
                  activeDropdown === "pdf"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2"
                }`}
              >
                <div className="bg-white border border-slate-100 shadow-2xl rounded-2xl p-5 grid grid-cols-3 gap-5 relative overflow-hidden">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-2">
                      <div className="bg-orange-100 p-1.5 rounded-lg text-[#FF9933]">
                        <FileText size={16} />
                      </div>
                      <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                        Manage Files
                      </span>
                    </div>
                    {pdfManageTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/${tool.id}`}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-3 hover:bg-slate-50 group/item transition-colors"
                      >
                        <div className="text-slate-400 group-hover/item:text-[#FF9933] transition-colors mt-0.5">
                          {getToolIcon(tool.id)}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-700 text-sm block group-hover/item:text-[#FF9933] transition-colors">
                            {tool.title}
                          </span>
                          <span className="text-[11px] text-slate-400 leading-tight block mt-0.5 truncate">
                            {tool.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-2">
                      <div className="bg-blue-100 p-1.5 rounded-lg text-blue-500">
                        <Wand2 size={16} />
                      </div>
                      <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                        Edit & Optimize
                      </span>
                    </div>
                    {pdfEditTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/${tool.id}`}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-3 hover:bg-slate-50 group/item transition-colors"
                      >
                        <div className="text-slate-400 group-hover/item:text-blue-500 transition-colors mt-0.5">
                          {getToolIcon(tool.id)}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-700 text-sm block group-hover/item:text-blue-500 transition-colors">
                            {tool.title}
                          </span>
                          <span className="text-[11px] text-slate-400 leading-tight block mt-0.5 truncate">
                            {tool.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Convert & Extract */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-2">
                      <div className="bg-green-100 p-1.5 rounded-lg text-green-600">
                        <RefreshCw size={16} />
                      </div>
                      <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                        Convert & Extract
                      </span>
                    </div>
                    {pdfConvertTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/${tool.id}`}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-3 hover:bg-slate-50 group/item transition-colors"
                      >
                        <div className="text-slate-400 group-hover/item:text-green-600 transition-colors mt-0.5">
                          {getToolIcon(tool.id)}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-700 text-sm block group-hover/item:text-green-600 transition-colors">
                            {tool.title}
                          </span>
                          <span className="text-[11px] text-slate-400 leading-tight block mt-0.5 truncate">
                            {tool.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Tools Dropdown */}
            <div
              className="relative group px-2 py-4"
              onMouseEnter={() => setActiveDropdown("image")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() =>
                  setActiveDropdown((p) => (p === "image" ? null : "image"))
                }
                aria-expanded={activeDropdown === "image"}
                aria-haspopup="true"
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-[#FF9933] bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50 rounded-full transition-all duration-200 shadow-sm hover:shadow-md group-hover:ring-2 ring-orange-100 ring-offset-2"
              >
                Image Tools{" "}
                <ChevronDown
                  size={15}
                  className="group-hover:rotate-180 transition-transform duration-300"
                />
              </button>
              <div
                className={`absolute top-full right-0 w-212.5 pt-4 transition-all duration-200 transform z-50 ${
                  activeDropdown === "image"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2"
                }`}
              >
                <div className="bg-white border border-slate-100 shadow-2xl rounded-2xl p-6 grid grid-cols-3 gap-6 relative overflow-hidden">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-2">
                      <div className="bg-orange-100 p-1.5 rounded-lg text-[#FF9933]">
                        <Maximize2 size={16} />
                      </div>
                      <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                        Essentials
                      </span>
                    </div>
                    {imgEssentials.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/${tool.id}`}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-3 hover:bg-slate-50 group/item transition-colors"
                      >
                        <div className="text-slate-400 group-hover/item:text-[#FF9933] transition-colors mt-0.5">
                          {getToolIcon(tool.id)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 text-sm block group-hover/item:text-[#FF9933] transition-colors">
                            {tool.title}
                          </span>
                          <span className="text-[11px] text-slate-400 leading-tight block mt-0.5 truncate max-w-40">
                            {tool.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-2">
                      <div className="bg-green-100 p-1.5 rounded-lg text-green-500">
                        <RefreshCw size={16} />
                      </div>
                      <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                        Converters
                      </span>
                    </div>
                    {imgConverters.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/${tool.id}`}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-3 hover:bg-slate-50 group/item transition-colors"
                      >
                        <div className="text-slate-400 group-hover/item:text-green-500 transition-colors mt-0.5">
                          {getToolIcon(tool.id)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 text-sm block group-hover/item:text-green-500 transition-colors">
                            {tool.title}
                          </span>
                          <span className="text-[11px] text-slate-400 leading-tight block mt-0.5 truncate max-w-40">
                            {tool.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-2">
                      <div className="bg-purple-100 p-1.5 rounded-lg text-purple-500">
                        <Palette size={16} />
                      </div>
                      <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                        Edit
                      </span>
                    </div>
                    {imgEditing.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/${tool.id}`}
                        onClick={() => setActiveDropdown(null)}
                        className="w-full text-left px-3 py-2.5 rounded-lg flex items-start gap-3 hover:bg-slate-50 group/item transition-colors"
                      >
                        <div className="text-slate-400 group-hover/item:text-purple-500 transition-colors mt-0.5">
                          {getToolIcon(tool.id)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 text-sm block group-hover/item:text-purple-500 transition-colors">
                            {tool.title}
                          </span>
                          <span className="text-[11px] text-slate-400 leading-tight block mt-0.5 truncate max-w-40">
                            {tool.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* The guides are the richest content on the site and were reachable
                only from the footer, so nobody landing on the homepage — a
                reviewer included — ever saw them. */}
            <Link
              href="/blogs"
              className="flex items-center gap-2 px-3 lg:px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-[#FF9933] hover:bg-orange-50 rounded-full transition-all duration-200 active:scale-[0.97] touch-manipulation"
            >
              Blog
            </Link>
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-lg active:scale-90 transition-transform duration-100 touch-manipulation"
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-60 bg-white/95 backdrop-blur-md overflow-y-auto animate-fade-in md:hidden">
          <div className="p-4 flex items-center justify-between border-b border-slate-100">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={toggleMobileMenu}
            >
              <Image src="/images/logo.webp" width="350"
                height="77" alt="GoPDFGo" className="w-40 h-auto" />
            </Link>
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full active:scale-90 transition-transform duration-100 touch-manipulation"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <Link
              href="/merge-pdf"
              className="w-full flex items-center gap-3 p-4 bg-slate-50 rounded-xl font-bold text-slate-700 hover:bg-orange-50 hover:text-[#FF9933] transition active:scale-[0.97] touch-manipulation"
              onClick={toggleMobileMenu}
            >
              <Layers size={20} className="text-[#FF9933]" /> Merge PDF
            </Link>
            <Link
              href="/qr-generator"
              className="w-full flex items-center gap-3 p-4 bg-slate-50 rounded-xl font-bold text-slate-700 hover:bg-orange-50 hover:text-[#FF9933] transition active:scale-[0.97] touch-manipulation"
              onClick={toggleMobileMenu}
            >
              <QrCode size={20} className="text-[#FF9933]" /> QR Code Generator
            </Link>
            <Link
              href="/blogs"
              className="w-full flex items-center gap-3 p-4 bg-slate-50 rounded-xl font-bold text-slate-700 hover:bg-orange-50 hover:text-[#FF9933] transition active:scale-[0.97] touch-manipulation"
              onClick={toggleMobileMenu}
            >
              <BookOpen size={20} className="text-[#FF9933]" /> Blog
            </Link>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleMobileAccordion("pdf")}
                className="w-full flex items-center justify-between p-4 bg-white font-bold text-slate-800 active:bg-slate-50 transition-colors duration-100 touch-manipulation"
              >
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-blue-500" /> PDF Tools
                </div>
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition-transform ${
                    mobileAccordion === "pdf" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileAccordion === "pdf" && (
                <div className="bg-slate-50 p-2 grid grid-cols-1 gap-2">
                  {pdfTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/${tool.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white active:bg-white active:scale-[0.98] touch-manipulation transition text-left"
                      onClick={toggleMobileMenu}
                    >
                      <div className="text-slate-500">
                        {getToolIcon(tool.id)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {tool.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleMobileAccordion("image")}
                className="w-full flex items-center justify-between p-4 bg-white font-bold text-slate-800 active:bg-slate-50 transition-colors duration-100 touch-manipulation"
              >
                <div className="flex items-center gap-2">
                  <ImageIcon size={20} className="text-green-500" /> Image Tools
                </div>
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition-transform ${
                    mobileAccordion === "image" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileAccordion === "image" && (
                <div className="bg-slate-50 p-2 grid grid-cols-1 gap-2">
                  {imageTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/${tool.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white active:bg-white active:scale-[0.98] touch-manipulation transition text-left"
                      onClick={toggleMobileMenu}
                    >
                      <div className="text-slate-500">
                        {getToolIcon(tool.id)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {tool.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;