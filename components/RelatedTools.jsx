import React from "react";
import Link from "next/link"; // Next.js Link imported
import { TOOLS_CONFIG } from "../utils/constants";
import { ArrowRight } from "lucide-react";

const RelatedTools = ({ currentToolId, toolType }) => {
  const relatedTools = TOOLS_CONFIG.filter(
    (t) => t.type === toolType && t.id !== currentToolId
  ).slice(0, 4);

  if (relatedTools.length === 0) return null;

  return (
    <div className="mt-0 mb-8 border-t border-slate-200 pt-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
          More {toolType === "pdf" ? "PDF" : "Image"} Tools
        </h3>
        <Link
          href="/" // Changed from 'to'
          className="text-sm sm:text-base text-[#FF9933] font-medium hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {relatedTools.map((tool) => (
          <Link
            href={`/${tool.id}`} // Changed from 'to'
            key={tool.id}
            className="group bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#FF9933]/30 transition-all duration-300 flex flex-col h-full"
            // Removed onClick scroll to top as Next.js handles it automatically
          >
            <div className="flex items-center gap-x-3 mb-2 sm:mb-0">
              <div
                className={`w-10 h-10 rounded-lg mb-0 sm:mb-3 flex items-center justify-center transition-colors duration-300 ${
                  tool.color === "orange"
                    ? "bg-orange-50 text-[#FF9933] group-hover:bg-[#FF9933] group-hover:text-white"
                    : tool.color === "blue"
                    ? "bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
                    : "bg-purple-50 text-purple-500 group-hover:bg-purple-500 group-hover:text-white"
                }`}
              >
                <tool.icon size={18} />
              </div>

              <h4 className="block sm:hidden font-bold text-slate-800 group-hover:text-[#FF9933] transition-colors">
                {tool.title}
              </h4>
            </div>
            <h4 className="hidden sm:block font-bold text-slate-800 mb-1 group-hover:text-[#FF9933] transition-colors">
              {tool.title}
            </h4>
            <p className="text-xs text-slate-500 line-clamp-2">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;