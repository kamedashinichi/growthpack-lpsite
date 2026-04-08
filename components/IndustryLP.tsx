"use client"

import { useState, useEffect } from "react"
import { Download, MessageCircle, ChevronDown, ArrowRight } from "lucide-react"
import Image from "next/image"
import { retailData } from "@/data/industries/retail"
import { apparelData } from "@/data/industries/apparel"
import { foodData } from "@/data/industries/food"
import { drugstoreData } from "@/data/industries/drugstore"
import { departmentData } from "@/data/industries/department"
import { supermarketData } from "@/data/industries/supermarket"
import { ecData } from "@/data/industries/ec"
import { sportsData } from "@/data/industries/sports"
import type { IndustryLPData } from "@/data/types"
import { CTA_DOWNLOAD, CTA_CONTACT } from "@/data/shared"
import { LandingPageLayout } from "@/components/LandingPageLayout"
import { MetricsBar } from "@/components/lp/metrics-bar"
import { ComparisonSection } from "@/components/lp/comparison-section"
import { StepsSection } from "@/components/lp/steps-section"
import { SecuritySection } from "@/components/lp/security-section"
import { FlowSection } from "@/components/lp/flow-section"
import { FinalCTASection } from "@/components/lp/final-cta-section"
import { WPDownloadForm } from "@/components/lp/wp-download-form"

const industryMap: Record<string, IndustryLPData> = {
  retail: retailData,
  apparel: apparelData,
  food: foodData,
  drugstore: drugstoreData,
  department: departmentData,
  supermarket: supermarketData,
  ec: ecData,
  sports: sportsData,
}

export function IndustryLP({ industry }: { industry: string }) {
  const data = industryMap[industry]
  if (!data) return null

  return (
    <LandingPageLayout>
      <IndustryHeroSection data={data} />
      <IndustryProblemSection data={data} />
      {data.caseStudies.length > 0 && <IndustryCaseStudySection data={data} />}
      {data.comparison && (
        <ComparisonSection items={data.comparison} highlight={data.comparisonHighlight} />
      )}
      {data.steps && <StepsSection steps={data.steps} />}
      <IndustryFeaturesSection data={data} />
      {industry === "apparel" && <WPDownloadForm />}
      <SecuritySection />
      <FlowSection />
      <FinalCTASection withDocumentPreview />
    </LandingPageLayout>
  )
}

// ─── Hero Section (industry-specific layout with phone mockup) ─────────

function IndustryHeroSection({ data }: { data: IndustryLPData }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative pt-16 md:pt-[72px] min-h-[500px] sm:min-h-[600px] md:min-h-[700px] bg-gradient-to-b from-[#E8F8F0] to-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-12 sm:py-16 md:py-24 lg:py-[100px]">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
          {/* Text Content */}
          <div className="flex-[1.2] text-center lg:text-left">
            <h1
              className={`text-[26px] sm:text-[32px] md:text-[44px] lg:text-[52px] font-extrabold text-[#1F2937] leading-[1.3] mb-4 sm:mb-6 ${
                isLoaded ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {data.hero.headline}
            </h1>

            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl text-[#6B7280] leading-[1.75] mb-6 sm:mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 ${
                isLoaded ? "animate-fade-in animation-delay-200" : "opacity-0"
              }`}
            >
              {data.hero.subheadline}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 ${
                isLoaded ? "animate-fade-in animation-delay-400" : "opacity-0"
              }`}
            >
              <a
                href={CTA_DOWNLOAD}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 lg:px-10 py-3.5 sm:py-4 lg:py-[18px] bg-[#06C755] text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg shadow-[0_4px_12px_rgba(6,199,85,0.3)] hover:bg-[#05A847] hover:shadow-[0_6px_16px_rgba(6,199,85,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <Download size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                資料ダウンロード（無料）
              </a>
              <a
                href={CTA_CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 lg:px-10 py-3 sm:py-[14px] lg:py-4 bg-white text-[#06C755] font-bold text-sm sm:text-base lg:text-lg border-2 border-[#06C755] rounded-lg hover:bg-[#E8F8F0] hover:border-[#05A847] transition-all duration-300"
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                お問い合わせ
              </a>
            </div>
          </div>

          {/* Visual - Hero Image or Phone Mockup */}
          <div
            className={`flex-1 flex items-center justify-center w-full max-w-[280px] sm:max-w-[350px] md:max-w-md lg:max-w-[500px] ${
              isLoaded ? "animate-slide-in-right animation-delay-200" : "opacity-0"
            }`}
          >
            {data.hero.heroImage ? (
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image src={data.hero.heroImage} alt={`${data.label}のイメージ`} fill className="object-cover" />
              </div>
            ) : (
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-[#06C755]/15 via-[#39D275]/10 to-[#E8F8F0] rounded-full scale-110" />
              <div className="absolute inset-3 sm:inset-4 lg:inset-6 bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl overflow-hidden border border-[#E5E7EB]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-4 sm:h-5 md:h-6 bg-[#1F2937] rounded-b-xl sm:rounded-b-2xl" />
                <div className="pt-6 sm:pt-8 md:pt-10 px-2.5 sm:px-3 md:px-4 pb-2.5 sm:pb-3 md:pb-4 h-full flex flex-col">
                  {/* Store Header */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 md:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[#06C755] rounded-lg sm:rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor">
                        <path d="M12 2C6.48 2 2 5.58 2 10.14c0 2.58 1.57 4.87 4.03 6.36-.18.65-.64 2.34-.73 2.7-.12.45.16.44.35.32.15-.1 2.3-1.56 3.24-2.2.93.14 1.88.22 2.86.22h.25c5.52 0 10-3.58 10-8.14S17.52 2 12 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold text-[#1F2937]">ストア公式</p>
                      <p className="text-[8px] sm:text-[10px] text-[#9CA3AF]">ミニアプリ</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5 flex-1">
                    {/* Member Card */}
                    <div className="bg-gradient-to-r from-[#06C755] to-[#39D275] rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 text-white">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-[10px] sm:text-xs font-bold">会員証</span>
                        <span className="text-[8px] sm:text-[10px] bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">Gold</span>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg font-bold font-mono">1234 5678 9012</p>
                      <p className="text-[8px] sm:text-[10px] opacity-80 mt-0.5 sm:mt-1">山田 太郎 様</p>
                    </div>

                    {/* Stamp Card */}
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

                    {/* Coupon */}
                    <div className="bg-[#FCD34D]/20 border border-[#FCD34D] rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-base sm:text-lg md:text-xl">🎁</span>
                        <div>
                          <p className="text-[10px] sm:text-xs font-bold text-[#1F2937]">来店クーポン</p>
                          <p className="text-sm sm:text-base md:text-lg font-bold text-[#FB923C]">20%OFF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 bg-[#FCD34D] rounded-full opacity-70 blur-sm" />
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 bg-[#3B82F6] rounded-full opacity-50 blur-sm" />
              <div className="absolute top-1/4 -left-3 sm:-left-6 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#06C755] rounded-full opacity-60" />
            </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-[#9CA3AF] tracking-wider">Scroll</span>
        <ChevronDown size={24} className="text-[#06C755] animate-bounce-slow" />
      </div>
    </section>
  )
}

// ─── Problem Section (industry-specific card layout) ─────────

function IndustryProblemSection({ data }: { data: IndustryLPData }) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-3 sm:mb-4">
          {data.problem.heading}
        </h2>
        <p className="text-sm sm:text-base text-center text-[#6B7280] mb-8 sm:mb-12 md:mb-16">
          {data.problem.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {data.problem.items.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-[#F8F9FA] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#E5E7EB]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FB923C]/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <Icon size={20} className="sm:w-6 sm:h-6 text-[#FB923C]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1F2937] mb-1.5 sm:mb-2">{item.title}</h3>
                <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
                  <ArrowRight size={14} className="text-[#FB923C] shrink-0" />
                  <p className="text-sm sm:text-base font-semibold text-[#FB923C]">{item.problem}</p>
                </div>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">{item.detail}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom message */}
        {data.problem.bottomMessage && (
          <div className="mt-8 sm:mt-12 md:mt-16 max-w-2xl mx-auto">
            <div className="bg-[#1F2937] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center">
              {data.problem.bottomMessage}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Case Study Section (industry-specific metrics layout) ─────────

function IndustryCaseStudySection({ data }: { data: IndustryLPData }) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#F0FDF4]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-3 sm:mb-4">
          導入企業の成果
        </h2>
        <p className="text-sm sm:text-base text-center text-[#6B7280] mb-8 sm:mb-12 md:mb-16">
          友だちを「顧客」に変えた企業の実績
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {data.caseStudies.map((study, index) => (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-1 sm:mb-2">{study.company}</h3>
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  {study.industry}
                  {study.scale && ` / ${study.scale}`}
                </p>
                {study.timeline && (
                  <span className="inline-block mt-1.5 sm:mt-2 px-2.5 py-0.5 bg-[#E8F8F0] text-[#06C755] text-xs sm:text-sm font-semibold rounded-full">
                    {study.timeline}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {study.metrics.map((metric, mIndex) => (
                  <div key={mIndex} className="text-center">
                    <div className="text-lg sm:text-2xl md:text-3xl font-bold text-[#FB923C] mb-0.5 sm:mb-1">
                      <span className="font-['Roboto']">{metric.value}</span>
                      <span className="text-sm sm:text-base md:text-lg">{metric.unit}</span>
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-[#6B7280]">{metric.label}</div>
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

// ─── Features Section (industry-specific with STEP color coding) ─────────

function IndustryFeaturesSection({ data }: { data: IndustryLPData }) {
  const { heading, subtitle, items } = data.featureSection

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-3 sm:mb-4">
          {heading}
        </h2>
        <p className="text-sm sm:text-base text-center text-[#6B7280] mb-8 sm:mb-12 md:mb-16">
          {subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {items.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#06C755] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-4 sm:p-5 md:p-6">
                <div className="mb-2 sm:mb-3">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                    <Image src={feature.image} alt={feature.name} fill className="object-contain" />
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1F2937] mb-1.5 sm:mb-2">
                  {feature.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] mb-2 sm:mb-3">{feature.description}</p>
                {feature.url && (
                  <a href={feature.url} className="text-[#06C755] text-xs sm:text-sm font-semibold hover:text-[#05A847] transition-colors">
                    詳しく見る →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <p className="text-sm sm:text-base text-[#6B7280]">上記以外にも、ニーズに合わせた機能開発が可能です</p>
        </div>
      </div>
    </section>
  )
}
