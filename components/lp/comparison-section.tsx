import type { ReactNode } from "react"
import type { ComparisonItem } from "@/data/types"

type ComparisonSectionProps = {
  items: ComparisonItem[]
  highlight?: { title: ReactNode; description: string }
}

export function ComparisonSection({ items, highlight }: ComparisonSectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-3 sm:mb-4">
          公式アカウントだけでは、足りない
        </h2>
        <p className="text-sm sm:text-base text-center text-[#6B7280] mb-8 sm:mb-12 md:mb-16">
          LINEミニアプリで「匿名の友だち」を「見える顧客」に
        </p>

        <div className="max-w-3xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-0 mb-0">
            <div className="p-3 sm:p-4" />
            <div className="p-3 sm:p-4 text-center bg-gray-100 rounded-t-xl border-b-2 border-gray-300">
              <p className="text-xs sm:text-sm font-bold text-[#6B7280]">LINE公式</p>
              <p className="text-xs sm:text-sm font-bold text-[#6B7280]">アカウント</p>
            </div>
            <div className="p-3 sm:p-4 text-center bg-gray-100 rounded-t-xl border-b-2 border-gray-300">
              <p className="text-xs sm:text-sm font-bold text-[#6B7280]">SaaS</p>
              <p className="text-xs sm:text-sm font-bold text-[#6B7280]">ツール</p>
            </div>
            <div className="p-3 sm:p-4 text-center bg-[#E8F8F0] rounded-t-xl border-b-2 border-[#06C755]">
              <p className="text-xs sm:text-sm font-bold text-[#06C755]">LINE</p>
              <p className="text-xs sm:text-sm font-bold text-[#06C755]">ミニアプリ</p>
            </div>
          </div>

          {/* Table Rows */}
          {items.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-0 ${
                item.highlight ? "bg-[#FFF7ED]" : index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } ${index === items.length - 1 ? "rounded-b-xl" : ""}`}
            >
              <div className="p-3 sm:p-4 flex items-center border-b border-gray-200">
                <span className={`text-xs sm:text-sm md:text-base ${item.highlight ? "font-bold text-[#FB923C]" : "text-[#1F2937]"}`}>
                  {item.label}
                </span>
              </div>
              <div className="p-3 sm:p-4 text-center border-b border-gray-200 flex items-center justify-center">
                {item.official === true ? (
                  <span className="text-lg sm:text-xl text-[#06C755]">○</span>
                ) : item.official === "partial" ? (
                  <span className="text-lg sm:text-xl text-[#FB923C]">△</span>
                ) : (
                  <span className="text-lg sm:text-xl text-[#D1D5DB]">✕</span>
                )}
              </div>
              <div className="p-3 sm:p-4 text-center border-b border-gray-200 flex items-center justify-center">
                {item.saas === true ? (
                  <span className="text-lg sm:text-xl text-[#06C755]">○</span>
                ) : item.saas === "partial" ? (
                  <span className="text-lg sm:text-xl text-[#FB923C]">△</span>
                ) : (
                  <span className="text-lg sm:text-xl text-[#D1D5DB]">✕</span>
                )}
              </div>
              <div className="p-3 sm:p-4 text-center border-b border-gray-200 flex items-center justify-center">
                <span className="text-lg sm:text-xl text-[#06C755] font-bold">○</span>
              </div>
            </div>
          ))}

          {/* Highlight box */}
          {highlight && (
            <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[#06C755] to-[#39D275] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center text-white">
              <p className="text-base sm:text-lg md:text-xl font-bold">
                {highlight.title}
              </p>
              <p className="text-xs sm:text-sm mt-1.5 sm:mt-2 opacity-90">
                {highlight.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
