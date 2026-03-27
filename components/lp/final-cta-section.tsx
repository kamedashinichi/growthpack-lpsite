"use client"

import { track } from "@vercel/analytics"
import { Download, MessageCircle } from "lucide-react"
import type { CTAContent } from "@/lib/content"

interface FinalCTASectionProps {
  content?: CTAContent
}

export function FinalCTASection({ content }: FinalCTASectionProps) {
  const headline = content?.headline ?? "まずは資料で詳しく知る"
  const subtext =
    content?.subtext ??
    "機能詳細・導入事例・料金プランなど、詳しい情報を資料でご確認いただけます"

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#E8F8F0] to-white">
      <div className="max-w-[800px] mx-auto px-4 sm:px-5 md:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2937] mb-4 sm:mb-6">
          {headline}
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#6B7280] mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          {subtext}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <a
            href="https://classmethod.jp/download/line-mini-app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 md:px-10 py-3.5 sm:py-4 md:py-5 bg-[#06C755] text-white font-bold text-base sm:text-lg md:text-xl rounded-lg shadow-xl hover:bg-[#05A847] hover:-translate-y-0.5 transition-all duration-300"
            onClick={() => track("cta_download", { location: "final_cta" })}
          >
            <Download size={18} className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" />
            資料ダウンロード（無料）
          </a>
          <a
            href="https://classmethod.jp/services/line/line-apps/#iframe-form"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 md:px-10 py-3.5 sm:py-4 md:py-5 bg-white text-[#06C755] font-bold text-base sm:text-lg md:text-xl border-2 border-[#06C755] rounded-lg hover:bg-[#E8F8F0] transition-all duration-300"
            onClick={() => track("cta_contact", { location: "final_cta" })}
          >
            <MessageCircle size={18} className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" />
            直接相談したい方はこちら
          </a>
        </div>
      </div>
    </section>
  )
}
