import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { blogsData } from "../../utils/BlogData"; // Ensure path is correct

export const metadata = {
  title: "PDF Tips & Guides | GoPDFGo Blog",
  description:
    "Read our latest guides on how to manage, compress, and edit PDF files easily and securely.",
  alternates: {
    canonical: "https://gopdfgo.com/blogs",
  },
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            Resources & Guides
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Expert tips, tutorials, and updates to help you manage your
            digital documents securely.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 xl:gap-8">
          {[...blogsData].reverse().map((blog) => (
            <Link
              href={`/blog/${blog.id}`}
              key={blog.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-300 group flex flex-col"
            >
              {/* Image Area */}
              <div className="relative overflow-hidden bg-slate-100">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  width={800} // Image ki max width (Ratio ke liye)
                  height={450} // Aspect ratio maintain karne ke liye
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content Area */}
              <div className="p-4 md:p-6 flex flex-col flex-1">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-[#FF9933]" />{" "}
                    {blog.date}
                  </span>
                </div>

                {/* Title */}
                <div className="block group-hover:text-[#FF9933] transition-colors">
                  <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {blog.excerpt}
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
    </div>
  );
}