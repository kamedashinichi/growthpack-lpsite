"use client"

import { track } from "@vercel/analytics"
import { Download } from "lucide-react"

interface InlineCTAProps {
  text?: string
  location?: string
}

export function InlineCTA({
  text = "料金・導入プロセスの詳細を資料で確認する",
  location = "inline",
}: InlineCTAProps) {
  return (
    <div className="py-6 sm:py-8 bg-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6 text-center">
        <a
          href="https://classmethod.jp/download/line-mini-app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#06C755] text-sm sm:text-base font-semibold hover:text-[#05A847] transition-colors"
          onClick={() => track("cta_download", { location, industry: "apparel" })}
        >
          <Download size={16} strokeWidth={2.5} />
          {text} →
        </a>
      </div>
    </div>
  )
}
