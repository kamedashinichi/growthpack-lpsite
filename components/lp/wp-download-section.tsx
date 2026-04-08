"use client"

import { track } from "@vercel/analytics"
import { Download } from "lucide-react"

const PDF_PATH = "/downloads/whitepaper-apparel-2026.pdf"

export function WPDownloadSection() {
  return (
    <section id="wp-download" className="py-12 sm:py-16 md:py-20 bg-[#F8F9FA]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row">
            {/* Left - WP Info */}
            <div className="bg-[#0a0a0a] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-center md:w-2/5">
              <span className="text-xs tracking-[0.15em] uppercase text-[#06C755] mb-3">
                無料ダウンロード
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-3">
                アパレル店舗スタッフ
                <br />
                業務実態調査 2026
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                193名調査で見えた、現場の&ldquo;見えない非効率&rdquo;と&ldquo;届かない声&rdquo;
              </p>
            </div>

            {/* Right - DL CTA */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center md:w-3/5">
              <ul className="text-sm text-[#4B5563] space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#06C755] mt-0.5">✓</span>
                  50.8%が業務時間の4割以上を接客以外に消費
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#06C755] mt-0.5">✓</span>
                  最大課題は「EC連携」ではなく「手作業オペ」
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#06C755] mt-0.5">✓</span>
                  改善意見を持つスタッフの82%が「声が届いていない」
                </li>
              </ul>

              <a
                href={PDF_PATH}
                download
                onClick={() => track("wp_download", { location: "apparel_lp", document: "apparel-2026" })}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#06C755] text-white font-bold text-sm sm:text-base rounded-lg shadow-[0_2px_8px_rgba(6,199,85,0.25)] hover:bg-[#05A847] hover:shadow-[0_4px_12px_rgba(6,199,85,0.35)] transition-all duration-300"
              >
                <Download size={18} strokeWidth={2.5} />
                無料レポートをダウンロード（PDF）
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
