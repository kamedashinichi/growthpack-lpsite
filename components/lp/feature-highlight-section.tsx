import type { FeatureHighlight } from "@/lib/content"

const featureDemoLinks: Record<string, string> = {
  memberscard: "/memberscard",
  "1to1": "/1to1",
  coupon: "/coupon",
  gift: "/gift",
}

interface FeatureHighlightSectionProps {
  highlights: FeatureHighlight[]
}

export function FeatureHighlightSection({ highlights }: FeatureHighlightSectionProps) {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
        <p className="text-xs sm:text-sm tracking-[0.15em] uppercase text-neutral-400 mb-3 sm:mb-4">
          Features
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#1F2937] leading-tight mb-12 sm:mb-16 md:mb-20">
          アパレルに効く4つの機能
        </h2>

        <div className="space-y-10 sm:space-y-12 md:space-y-16">
          {highlights.map((highlight, index) => (
            <div key={index}>
              <span className="text-xs text-neutral-400 mb-2 block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-[28px] font-bold text-[#1F2937] mb-3 sm:mb-4 leading-snug">
                {highlight.name}
              </h3>
              <p className="text-sm sm:text-base text-neutral-500 leading-[1.8] mb-4 sm:mb-6">
                {highlight.industryContext}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                {highlight.proof && (
                  <div className="inline-flex items-center gap-2 bg-[#E8F8F0] text-[#06C755] text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {highlight.proof}
                  </div>
                )}
                <a
                  href={featureDemoLinks[highlight.featureId] ?? "#"}
                  className="text-[#06C755] text-xs sm:text-sm font-semibold hover:text-[#05A847] transition-colors"
                >
                  デモを見る →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
