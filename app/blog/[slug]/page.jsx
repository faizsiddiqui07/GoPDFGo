"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react"; 
import { blogsData } from "@/utils/BlogData";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contentRef = useRef(null);

  // 1. Current blog ka "Index" nikalna
  const currentIndex = blogsData.findIndex((b) => b.id === params.slug);
  const blog = blogsData[currentIndex];

  // 2. Related blogs nikalna (Theek pehle wale 3)
  let relatedBlogs = [];
  if (currentIndex !== -1) {
    // Current blog se pehle ke saare blogs
    const previousBlogs = blogsData.slice(0, currentIndex);
    
    if (previousBlogs.length >= 3) {
      // Agar current blog se pehle 3 ya zyada blogs hain, toh theek pehle wale 3 utha lo
      relatedBlogs = previousBlogs.slice(-3);
    } else {
      // Agar user pehla ya doosra blog hi open kar le (jiske pehle 3 blogs nahi hain),
      // toh hum design maintain karne ke liye baaki array me se pehle 3 dikha denge.
      relatedBlogs = blogsData.filter(b => b.id !== params.slug).slice(0, 3);
    }
  }

  // Related blogs ko reverse kar dete hain taaki un 3 mein se jo sabse latest hai wo grid me pehle dikhe
  relatedBlogs = relatedBlogs.reverse();

  // Link interceptor (Aapka custom logic Next.js router ke hisaab se)
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
          href="/blogs"
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
          href="/blogs"
          className="text-slate-500 hover:text-[#FF9933] inline-flex items-center gap-1 text-sm font-medium mb-4 sm:mb-6 transition cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to all articles
        </Link>

        {/* --- MAIN ARTICLE SECTION --- */}
        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          {/* Header Image */}
          <div className="w-full bg-slate-100 overflow-hidden relative">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={1200}
              height={675}
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

        {/* --- RELATED BLOGS SECTION --- */}
        {relatedBlogs.length > 0 && (
          <div className="mt-6 sm:mt-10 border-t border-slate-200 pt-6 sm:pt-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6 sm:mb-8">
              Read Previous Guides
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 xl:gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  href={`/blog/${relatedBlog.id}`}
                  key={relatedBlog.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300 group flex flex-col cursor-pointer"
                >
                  {/* Image Area */}
                  <div className="relative overflow-hidden bg-slate-100">
                    <Image
                      src={relatedBlog.imageUrl}
                      alt={relatedBlog.title}
                      width={800}
                      height={450}
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 md:p-6 flex flex-col flex-1">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-[#FF9933]" />{" "}
                        {relatedBlog.date}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="block group-hover:text-[#FF9933] transition-colors">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                    </div>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                      {relatedBlog.excerpt}
                    </p>

                    {/* Read More Text */}
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF9933] group-hover:text-[#e68a2e] transition-colors">
                        Read Article{" "}
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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