"use client"

import { useEffect, useState } from "react"
import { track } from "@vercel/analytics"
import { Download, MessageCircle, ChevronDown } from "lucide-react"
import type { HeroContent, IndustryId } from "@/lib/content"

interface HeroSectionProps {
  content: HeroContent
  industry: IndustryId
}

export function HeroSection({ content, industry }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (industry !== "generic" && content.visualVariant === "typography") {
    return <ApparelHero content={content} isLoaded={isLoaded} />
  }

  return <GenericHero isLoaded={isLoaded} />
}

function ApparelHero({
  content,
  isLoaded,
}: {
  content: HeroContent
  isLoaded: boolean
}) {
  return (
    <section
      className="relative pt-16 md:pt-[72px] min-h-[600px] md:min-h-[700px] bg-[#0a0a0a] text-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Content - Left */}
          <div className="flex-[1.2]">
            {/* Industry Label */}
            <p
              className={`text-xs sm:text-sm tracking-[0.2em] uppercase text-[#06C755] mb-6 sm:mb-8 ${
                isLoaded ? "animate-fade-in" : "opacity-0"
              }`}
            >
              for Apparel &amp; Fashion
            </p>

            {/* H1 */}
            <h1
              id="hero-heading"
              className={`text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-extrabold leading-[1.15] tracking-tight mb-6 sm:mb-8 ${
                isLoaded ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {content.h1}
            </h1>

            {/* Sub Copy */}
            <p
              className={`text-sm sm:text-base md:text-lg text-neutral-400 leading-[1.8] mb-10 sm:mb-12 max-w-[540px] ${
                isLoaded ? "animate-fade-in animation-delay-200" : "opacity-0"
              }`}
            >
              {content.subCopy}
            </p>

            {/* Display Stats */}
            {content.displayStats && (
              <div
                className={`flex flex-wrap gap-6 sm:gap-10 md:gap-12 mb-10 sm:mb-12 ${
                  isLoaded ? "animate-fade-in animation-delay-400" : "opacity-0"
                }`}
              >
                {content.displayStats.map((stat, i) => (
                  <div key={i}>
                    <span className="block text-[32px] sm:text-[40px] md:text-[48px] font-extrabold leading-none tracking-tight font-['Roboto']">
                      {stat.value}
                    </span>
                    <span className="block text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-2">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${
                isLoaded ? "animate-fade-in animation-delay-600" : "opacity-0"
              }`}
            >
              <a
                href="https://classmethod.jp/download/line-mini-app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#06C755] text-white font-bold text-sm sm:text-base rounded-lg hover:bg-[#05A847] transition-all duration-300"
                onClick={() => track("cta_download", { location: "hero", industry: "apparel" })}
              >
                <Download size={18} strokeWidth={2.5} />
                資料ダウンロード（無料）
              </a>
              <a
                href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-white font-bold text-sm sm:text-base border border-neutral-600 rounded-lg hover:bg-white/5 transition-all duration-300"
                onClick={() => track("cta_contact", { location: "hero", industry: "apparel" })}
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                お問い合わせ
              </a>
            </div>
          </div>

          {/* Visual - Right: PAL CLOSET ミニアプリ画面 */}
          <div
            className={`flex-1 hidden lg:flex items-center justify-center ${
              isLoaded ? "animate-slide-in-right animation-delay-200" : "opacity-0"
            }`}
          >
            <div className="relative w-full max-w-[440px]">
              <img
                src="/images/apparel-hero.png"
                alt="アパレル店舗でLINEミニアプリの会員証を提示するお客様"
                className="w-full h-auto rounded-2xl shadow-2xl border border-neutral-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06C755]/30 to-transparent" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-600 tracking-wider">Scroll</span>
        <ChevronDown size={24} className="text-[#06C755] animate-bounce-slow" aria-hidden="true" />
      </div>
    </section>
  )
}

function GenericHero({ isLoaded }: { isLoaded: boolean }) {
  return (
    <section
      className="relative pt-16 md:pt-[72px] min-h-[500px] sm:min-h-[600px] md:min-h-[700px] bg-gradient-to-b from-[#E8F8F0] to-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-12 sm:py-16 md:py-24 lg:py-[100px]">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
          {/* Text Content - Left 55% */}
          <div className="flex-[1.2] text-center lg:text-left">
            <h1
              id="hero-heading"
              className={`text-[26px] sm:text-[32px] md:text-[44px] lg:text-[52px] font-extrabold text-[#1F2937] leading-[1.3] mb-4 sm:mb-6 ${
                isLoaded ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <span className="text-[#06C755]">LINE公式アカウント</span>、
              <br />
              持っているだけになっていませんか？
            </h1>

            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl text-[#6B7280] leading-[1.75] mb-6 sm:mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 ${
                isLoaded ? "animate-fade-in animation-delay-200" : "opacity-0"
              }`}
            >
              通常<span className="text-[#FB923C] font-bold">6ヶ月</span>の開発を
              <span className="text-[#FB923C] font-bold">3ヶ月</span>で。
              <br className="hidden sm:block" />
              機能アセットで実現する、
              <span className="text-[#06C755] font-bold">スピード×柔軟性</span>
              のLINEミニアプリ開発
            </p>

            <div
              className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 ${
                isLoaded ? "animate-fade-in animation-delay-400" : "opacity-0"
              }`}
            >
              <a
                href="https://classmethod.jp/download/line-mini-app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 lg:px-10 py-3.5 sm:py-4 lg:py-[18px] bg-[#06C755] text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg shadow-[0_4px_12px_rgba(6,199,85,0.3)] hover:bg-[#05A847] hover:shadow-[0_6px_16px_rgba(6,199,85,0.4)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:ring-offset-2 transition-all duration-300"
                aria-label="資料ダウンロード（無料）を申し込む"
              >
                <Download size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                資料ダウンロード（無料）
              </a>

              <a
                href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 lg:px-10 py-3 sm:py-[14px] lg:py-4 bg-white text-[#06C755] font-bold text-sm sm:text-base lg:text-lg border-2 border-[#06C755] rounded-lg hover:bg-[#E8F8F0] hover:border-[#05A847] focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:ring-offset-2 transition-all duration-300"
                aria-label="お問い合わせフォームを開く"
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                お問い合わせ
              </a>
            </div>

            <p
              className={`text-xs sm:text-sm text-[#9CA3AF] mt-3 sm:mt-4 text-center lg:text-left ${
                isLoaded ? "animate-fade-in animation-delay-600" : "opacity-0"
              }`}
            ></p>
          </div>

          {/* Visual - Right 45% */}
          <div
            className={`flex-1 flex items-center justify-center w-full max-w-[280px] sm:max-w-[350px] md:max-w-md lg:max-w-[500px] ${
              isLoaded ? "animate-slide-in-right animation-delay-200" : "opacity-0"
            }`}
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-[#06C755]/15 via-[#39D275]/10 to-[#E8F8F0] rounded-full scale-110" />

              <div className="absolute inset-3 sm:inset-4 lg:inset-6 bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl overflow-hidden border border-[#E5E7EB]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-4 sm:h-5 md:h-6 bg-[#1F2937] rounded-b-xl sm:rounded-b-2xl" />

                <div className="pt-6 sm:pt-8 md:pt-10 px-2.5 sm:px-3 md:px-4 pb-2.5 sm:pb-3 md:pb-4 h-full flex flex-col">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 md:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[#06C755] rounded-lg sm:rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor">
                        <path d="M12 2C6.48 2 2 5.58 2 10.14c0 2.58 1.57 4.87 4.03 6.36-.18.65-.64 2.34-.73 2.7-.12.45.16.44.35.32.15-.1 2.3-1.56 3.24-2.2.93.14 1.88.22 2.86.22h.25c5.52 0 10-3.58 10-8.14S17.52 2 12 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-[#1F2937]">グロースパック ストア</p>
                      <p className="text-[8px] sm:text-[10px] text-[#9CA3AF]">公式アカウント</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5 flex-1">
                    <div className="bg-gradient-to-r from-[#06C755] to-[#39D275] rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 text-white">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-[10px] sm:text-xs font-bold">会員証</span>
                        <span className="text-[8px] sm:text-[10px] bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">Gold</span>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg font-bold font-mono">1234 5678 9012</p>
                      <p className="text-[8px] sm:text-[10px] opacity-80 mt-0.5 sm:mt-1">山田 太郎 様</p>
                    </div>

                    <div className="bg-[#FCD34D]/20 border border-[#FCD34D] rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-base sm:text-lg md:text-xl">🎁</span>
                        <div>
                          <p className="text-[10px] sm:text-xs font-bold text-[#1F2937]">バースデークーポン</p>
                          <p className="text-sm sm:text-base md:text-lg font-bold text-[#FB923C]">20%OFF</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3">
                      <p className="text-[10px] sm:text-xs font-bold text-[#1F2937] mb-1 sm:mb-2">スタンプカード</p>
                      <div className="flex gap-1 sm:gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs md:text-sm ${
                              i < 3 ? "bg-[#06C755] text-white" : "bg-[#E5E7EB]"
                            }`}
                          >
                            {i < 3 ? "✓" : ""}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 bg-[#FCD34D] rounded-full opacity-70 blur-sm" />
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 bg-[#3B82F6] rounded-full opacity-50 blur-sm" />
              <div className="absolute top-1/4 -left-3 sm:-left-6 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#06C755] rounded-full opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-[#9CA3AF] tracking-wider">Scroll</span>
        <ChevronDown size={24} className="text-[#06C755] animate-bounce-slow" aria-hidden="true" />
      </div>
    </section>
  )
}
