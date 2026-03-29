import type { FeatureHighlight } from "@/lib/content"

interface FeatureHighlightSectionProps {
  highlights: FeatureHighlight[]
}

const CATEGORY_ORDER = [
  "顧客接点の創出",
  "エンゲージメント強化",
  "関係性深化",
  "すべてをつなぐ",
]

export function FeatureHighlightSection({ highlights }: FeatureHighlightSectionProps) {
  // カテゴリ付きならグループ表示、なければフラット表示
  const hasCategories = highlights.some((h) => h.category)

  if (!hasCategories) {
    return <FlatHighlights highlights={highlights} />
  }

  // カテゴリ順にグループ化
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: highlights.filter((h) => h.category === cat),
  })).filter((g) => g.items.length > 0)

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
        <p className="text-xs sm:text-sm tracking-[0.15em] uppercase text-neutral-400 mb-3 sm:mb-4">
          Features
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#1F2937] leading-tight mb-12 sm:mb-16 md:mb-20">
          3つのカテゴリと、
          <br />
          すべてをつなぐセグメントマネージャー
        </h2>

        <div className="space-y-12 sm:space-y-16">
          {grouped.map((group) => (
            <div key={group.category}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-[#1F2937]">
                  {group.category}
                </h3>
                {group.category === "すべてをつなぐ" && (
                  <span className="text-xs bg-[#06C755]/10 text-[#06C755] font-bold px-2.5 py-1 rounded-full">
                    差別化の核
                  </span>
                )}
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {group.items.map((highlight) => (
                  <div
                    key={highlight.featureId}
                    className={`rounded-xl p-5 sm:p-6 border ${
                      group.category === "すべてをつなぐ"
                        ? "bg-[#0a0a0a] border-neutral-800 text-white sm:col-span-2"
                        : "bg-white border-neutral-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <h4
                        className={`text-base sm:text-lg font-bold ${
                          group.category === "すべてをつなぐ"
                            ? "text-white"
                            : "text-[#1F2937]"
                        }`}
                      >
                        {highlight.name}
                      </h4>
                      {highlight.isNew && (
                        <span className="text-[10px] bg-[#06C755] text-white font-bold px-2 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm leading-[1.8] ${
                        group.category === "すべてをつなぐ"
                          ? "text-neutral-400"
                          : "text-neutral-500"
                      }`}
                    >
                      {highlight.industryContext}
                    </p>
                    {highlight.proof && (
                      <div className="mt-3 inline-flex items-center gap-2 bg-[#E8F8F0] text-[#06C755] text-xs font-bold px-3 py-1.5 rounded-full">
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlatHighlights({ highlights }: { highlights: FeatureHighlight[] }) {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
        <p className="text-xs sm:text-sm tracking-[0.15em] uppercase text-neutral-400 mb-3 sm:mb-4">
          Features
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#1F2937] leading-tight mb-12 sm:mb-16 md:mb-20">
          主要な機能
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
