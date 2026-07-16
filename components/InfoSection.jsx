import React from "react";
import { Zap, Shield, ThumbsUp, CheckCircle2, ChevronDown } from "lucide-react";

// **text** ko bold karne ke liye (sirf UI display ke liye)
const parseText = (text) => {
  if (!text || typeof text !== "string") return text;
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

// JSON-LD ke liye markdown stars hata kar plain text
const plainText = (text) =>
  typeof text === "string" ? text.replace(/\*\*/g, "") : "";

const InfoSection = ({ info }) => {
  if (!info) return null;

  // FAQ Structured Data (Google rich results ke liye)
  const faqSchema =
    info.faq && info.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: info.faq.map((item) => ({
            "@type": "Question",
            name: plainText(item.q),
            acceptedAnswer: {
              "@type": "Answer",
              text: plainText(item.a),
            },
          })),
        }
      : null;

  return (
    <article className="max-w-7xl mx-auto px-4 mt-8 sm:mt-12 md:mt-14 pb-8 sm:pb-12">
      {/* 🔹 FAQ SCHEMA (JSON-LD) */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* 🔹 INTRO */}
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
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-8 sm:mb-12">
            {info.sectionHeadings?.features || "Why use this tool?"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-8">
            {info.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition"
              >
                {/* ✅ Title ab sirf EK baar render hota hai.
                    Mobile pe icon ke bagal (row), desktop pe icon ke neeche (column) */}
                <div className="flex flex-row sm:flex-col items-center sm:items-start gap-x-4">
                  <div className="w-12 h-12 bg-orange-50 text-[#FF9933] rounded-xl flex items-center justify-center mb-0 sm:mb-4 shrink-0">
                    {idx === 0 ? (
                      <Zap size={24} />
                    ) : idx === 1 ? (
                      <Shield size={24} />
                    ) : (
                      <ThumbsUp size={24} />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-0 sm:mb-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mt-3 sm:mt-0">
                  {parseText(feature.desc)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🔹 USE CASES */}
      {info.useCases && info.useCases.length > 0 && (
        <section className="mb-12 sm:mb-16 mt-12">
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
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-10 sm:mb-20 md:mb-16">
            {info.sectionHeadings?.steps || "How to use this tool"}
          </h2>

          {/* MOBILE: vertical timeline */}
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

          {/* DESKTOP: zigzag timeline with an animated left-to-right connector line. */}
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
            {/* connector line — gray track with an orange highlight flowing left → right */}
            <div
              className="absolute top-1/2 left-4 right-4 sm:left-10 sm:right-10 h-0.5 sm:h-1 -translate-y-1/2 rounded-full z-0 animate-line-flow"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #e2e8f0 0%, #e2e8f0 38%, #FF9933 50%, #e2e8f0 62%, #e2e8f0 100%)",
                backgroundSize: "200% 100%",
              }}
            />

            {info.steps.map((step, idx) => {
              const isTextTop = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="relative flex flex-col group h-32 sm:h-64"
                >
                  {/* Top text region (equal half — never pushes the number) */}
                  <div className="flex-1 min-h-0 flex items-end justify-center pb-5 sm:pb-9">
                    {isTextTop && (
                      <p className="text-slate-700 font-medium text-center px-0.5 text-[10px] sm:text-sm lg:text-base leading-3 sm:leading-normal">
                        {parseText(step)}
                      </p>
                    )}
                  </div>

                  {/* Bottom text region (equal half) */}
                  <div className="flex-1 min-h-0 flex items-start justify-center pt-5 sm:pt-9">
                    {!isTextTop && (
                      <p className="text-slate-700 font-medium text-center px-0.5 text-[10px] sm:text-sm lg:text-base leading-3 sm:leading-normal">
                        {parseText(step)}
                      </p>
                    )}
                  </div>

                  {/* Number — pinned dead-center ON the line, no matter how long the text is */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 bg-[#FF9933] text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-md sm:shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                    {idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 🔹 FAQ (visible content) */}
      {info.faq && info.faq.length > 0 && (
        <section className="mt-14 sm:mt-10 md:mt-16">
          <h2 className="text-2xl text-center font-bold text-slate-800 mb-6 sm:mb-8 flex items-center justify-center gap-2">
            {info.sectionHeadings?.faq || "Frequently Asked Questions"}
          </h2>

          {/* Native <details>, deliberately: this file is a server component, so
              the accordion ships ZERO JavaScript and every answer stays in the
              static HTML for crawlers. The first one opens so the block never
              reads as empty. Until now these were plain divs — six always-open
              answers per tool — while still carrying a hover:border affordance
              that promised an interaction that didn't exist. */}
          <div className="space-y-3">
            {info.faq.map((item, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="gpg-faq bg-white border border-slate-200 rounded-xl shadow-sm hover:border-orange-200 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none rounded-xl active:bg-slate-50 touch-manipulation">
                  <h3 className="font-bold text-lg text-slate-800">{item.q}</h3>
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <p className="text-slate-600 leading-relaxed">
                    {parseText(item.a)}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default InfoSection;