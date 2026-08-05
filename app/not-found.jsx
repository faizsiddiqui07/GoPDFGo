import React from "react";
import Link from "next/link"; // Next.js Link use karenge fast routing ke liye

export const metadata = {
  title: "404 - Page Not Found | GoPDFGo",
  description: "The page or tool you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="text-center py-32 min-h-[60vh] flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-slate-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        The tool you are looking for doesn't exist, has been moved, or the URL is incorrect.
      </p>
      <Link 
        href="/" 
        className="text-[#FF9933] hover:text-[#e68a2e] hover:underline font-bold transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}