import React from "react";
import {
  Star,
  HelpCircle,
  Zap,
  Shield,
  ThumbsUp,
  CheckCircle2,
} from "lucide-react";

// ✅ Helper function: **text** ko bold karne ke liye
const parseText = (text) => {
  if (!text || typeof text !== "string") return text;

  // String ko split karte hain jahan bhi ** ho
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const InfoSection = ({ info }) => {
  if (!info) return null;

  return (
    <article className="max-w-7xl mx-auto mt-8 sm:mt-12 md:mt-14  pb-8 sm:pb-12">
      {/* 🔹 INTRO (SEO OPTIMIZED) */}
      {info.intro && (
        <section className="max-w-4xl mx-auto">
          <p className="whitespace-pre-line text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            {parseText(info.intro)}
          </p>
        </section>
      )}

      {/* 🔹 FEATURES */}
      {info.features && (
        <section className="mt-12">
          {/* ✅ DYNAMIC HEADING ADDED HERE */}
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-8 sm:mb-12">
            {info.sectionHeadings?.features || "Why use this tool?"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-8">
            {info.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-x-4">
                  <div className="w-12 h-12 bg-orange-50 text-[#FF9933] rounded-xl flex items-center justify-center mb-4">
                    {idx === 0 ? (
                      <Zap size={24} />
                    ) : idx === 1 ? (
                      <Shield size={24} />
                    ) : (
                      <ThumbsUp size={24} />
                    )}
                  </div>
                  <h3 className="block sm:hidden text-xl font-bold text-slate-800 mb-3">
                    {feature.title}
                  </h3>
                </div>
                <h3 className="hidden sm:block text-xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {parseText(feature.desc)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🔹 USE CASES (NEW - FOR ADSENSE INTENT) */}
      {info.useCases && info.useCases.length > 0 && (
        <section className="mb-12 sm:mb-16 mt-12">
          {/* ✅ DYNAMIC HEADING ADDED HERE */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-5 sm:mb-8">
            {info.sectionHeadings?.useCases || "When to use this tool?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {info.useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="flex items-center sm:items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-orange-200 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                <p className="text-slate-700 font-medium text-sm sm:text-base">
                  {parseText(useCase)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🔹 HOW TO USE */}
      {info.steps && (
        <section className="mt-12 mb-8 sm:mb-20">
          {/* ✅ DYNAMIC HEADING ADDED HERE */}
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-10 sm:mb-20 md:mb-16">
            {info.sectionHeadings?.steps || "How to use this tool"}
          </h2>

          <div className="block sm:hidden max-w-md mx-auto px-4">
            <div className="relative space-y-8">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100 z-0" />

              {info.steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-5 z-10">
                  <div className="w-8 h-8 shrink-0 bg-[#FF9933] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white">
                    {idx + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-slate-700 font-medium text-base leading-relaxed">
                      {parseText(step)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative hidden sm:grid gap-2 sm:gap-8 mx-auto
          ${
            info.steps.length === 3
              ? "grid-cols-3 max-w-5xl"
              : info.steps.length === 4
                ? "grid-cols-4 max-w-6xl"
                : "grid-cols-2 max-w-4xl"
          }`}
          >
            <div className="absolute top-1/2 left-4 right-4 sm:left-10 sm:right-10 h-0.5 sm:h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0" />

            {info.steps.map((step, idx) => {
              const isTextTop = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="relative flex flex-col items-center justify-center group h-32 sm:h-64"
                >
                  <div
                    className={`flex flex-1 w-full items-end justify-center pb-2 sm:pb-6 ${
                      isTextTop ? "" : "invisible"
                    }`}
                  >
                    <p className="text-slate-700 font-medium text-center px-0.5 text-[10px] sm:text-sm lg:text-base leading-3 sm:leading-normal">
                      {parseText(step)}
                    </p>
                  </div>

                  <div className="relative z-10 shrink-0">
                    <div className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 bg-[#FF9933] text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-md sm:shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                      {idx + 1}
                    </div>
                  </div>

                  <div
                    className={`flex flex-1 w-full items-start justify-center pt-2 sm:pt-6 ${
                      !isTextTop ? "" : "invisible"
                    }`}
                  >
                    <p className="text-slate-700 font-medium text-center px-0.5 text-[10px] sm:text-sm lg:text-base leading-3 sm:leading-normal">
                      {parseText(step)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 🔹 FAQ */}
      {info.faq && info.faq.length > 0 && (
        <section className="mt-14 sm:mt-10 md:mt-16">
          {/* ✅ DYNAMIC HEADING ADDED HERE */}
          <h2 className="text-2xl text-center font-bold text-slate-800 mb-6 sm:mb-8 flex items-center justify-center gap-2">
            {info.sectionHeadings?.faq || "Frequently Asked Questions"}
          </h2>

          <div className="space-y-4">
            {info.faq.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm hover:border-orange-200 transition"
              >
                <h3 className="font-bold text-lg text-slate-800 mb-2">
                  {item.q}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {parseText(item.a)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default InfoSection;