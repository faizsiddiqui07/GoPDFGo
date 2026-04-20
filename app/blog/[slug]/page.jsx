"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { blogsData } from "@/utils/BlogData";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contentRef = useRef(null);

  // URL slug se data nikalna
  const blog = blogsData.find((b) => b.id === params.slug);

  // Link interceptor (Aapka custom logic Next.js router ke hisaab se updated)
  useEffect(() => {
    const handleLinkClick = (e) => {
      const anchor = e.target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");

        // Agar internal link hai (starts with /), toh Next.js router use karo
        if (href && href.startsWith("/")) {
          e.preventDefault();
          router.push(href);
          window.scrollTo(0, 0);
        }
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener("click", handleLinkClick);
    }

    return () => {
      if (container) {
        container.removeEventListener("click", handleLinkClick);
      }
    };
  }, [router]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Article not found
        </h2>
        <Link
          href="/blog/"
          className="bg-[#FF9933] text-white px-6 py-3 rounded-full font-bold hover:bg-[#e68a2e] transition cursor-pointer"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:py-10 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/blog/"
          className="text-slate-500 hover:text-[#FF9933] inline-flex items-center gap-1 text-sm font-medium mb-4 sm:mb-6 transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to all articles
        </Link>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Image */}
          <div className="w-full bg-slate-100 overflow-hidden relative">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={1200} // High quality for detail page
              height={675} // 16:9 Aspect ratio
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content Area */}
          <div className="p-5 sm:p-8 md:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-slate-500 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-slate-100">
              <span className="flex items-center gap-1.5">
                <Calendar size={16} className="text-[#FF9933]" /> {blog.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6 sm:mb-8 leading-tight">
              {blog.title}
            </h1>

            {/* Content body */}
            <div
              ref={contentRef}
              className="blog-content text-base sm:text-lg text-slate-600 leading-relaxed space-y-4 sm:space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      </div>

      {/* Global CSS for Blog content formatting */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .blog-content h2 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-top: 1.5rem; margin-bottom: 0.75rem; }
            .blog-content h3 { font-size: 1.25rem; font-weight: 700; color: #334155; margin-top: 1.25rem; margin-bottom: 0.5rem; }
            @media (min-width: 640px) {
              .blog-content h2 { font-size: 1.875rem; margin-top: 2rem; margin-bottom: 1rem; }
              .blog-content h3 { font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem; }
            }
            .blog-content p { margin-bottom: 1rem; }
            @media (min-width: 640px) {
              .blog-content p { margin-bottom: 1.25rem; }
            }
            .blog-content a { color: #FF9933; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; transition: color 0.2s; cursor: pointer; }
            .blog-content a:hover { color: #e68a2e; }
            .blog-content ul { list-style-type: disc; padding-left: 1.25rem; margin-bottom: 1rem; }
            @media (min-width: 640px) {
               .blog-content ul { padding-left: 1.5rem; margin-bottom: 1.25rem; }
            }
            .blog-content li { margin-bottom: 0.5rem; }
            .blog-content .tool-box { background: #fff7ed; border: 1px solid #fed7aa; padding: 1rem; border-radius: 0.5rem; margin: 1.5rem 0; }
            @media (min-width: 640px) {
               .blog-content .tool-box { padding: 1.5rem; border-radius: 0.75rem; margin: 2rem 0; }
            }
            .blog-content strong { color: #0f172a; font-weight: 700; }
            .blog-content code { background: #f1f5f9; color: #ef4444; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.875em; font-family: monospace; }
          `,
        }}
      />
    </div>
  );
}