"use client"

import { useState, useEffect } from "react"
import { Download, MessageCircle, ChevronDown, ShieldCheck, Cloud, Award, Users, TrendingUp, Zap, MessageSquare, ArrowRight, FileText, Clock, CheckCircle2, Headphones, Rocket } from "lucide-react"
import Image from "next/image"
import { LPHeader } from "@/components/lp/header"
import { LPFooter } from "@/components/lp/footer"
import { MobileFABButtons } from "@/components/lp/mobile-fab-buttons"

// ─── Data ─────────────────────────────────────────

const CTA_DOWNLOAD = "https://classmethod.jp/download/line-mini-app/"
const CTA_CONTACT = "https://classmethod.jp/services/line/line-apps/#iframe-form"

const troubles = [
  {
    icon: Users,
    title: "友だちは増えた",
    problem: "クーポンを送る以外にやることがない",
    detail: "友だち登録はゴールではなくスタート。でも次の一手が見えない…",
  },
  {
    icon: MessageSquare,
    title: "全員にクーポン配信",
    problem: "配信するたびにブロックが増える",
    detail: "一斉配信は手軽だけど、興味のない人にはノイズでしかない",
  },
  {
    icon: TrendingUp,
    title: "誰に何を送ればいいか",
    problem: "打ち手がないまま時間だけ過ぎる",
    detail: "属性も購買データもないから、セグメントの切りようがない",
  },
]

const caseStudies = [
  {
    company: "PAL様",
    industry: "アパレル・雑貨",
    scale: "約900店舗",
    timeline: "導入後6ヶ月",
    metrics: [
      { value: "3", unit: "倍", label: "会員数増加" },
      { value: "5", unit: "秒", label: "で会員登録完了" },
      { value: "10", unit: "万人", label: "友だち増加" },
    ],
  },
  {
    company: "グッデイ様",
    industry: "ホームセンター",
    scale: "63店舗",
    timeline: "導入後1年",
    metrics: [
      { value: "15", unit: "万人", label: "友だち増加" },
      { value: "11", unit: "万人", label: "会員数増加" },
      { value: "5", unit: "倍以上", label: "会員証提示率" },
    ],
  },
]

const comparisonItems = [
  { label: "友だち追加", official: true, mini: true },
  { label: "会員登録（同時）", official: false, mini: true, highlight: true },
  { label: "属性情報の取得", official: false, mini: true },
  { label: "購買データ連携", official: false, mini: true },
  { label: "セグメント配信", official: "partial" as const, mini: true },
]

type StepData = {
  id: number
  color: string
  colorLight: string
  title: string
  subtitle: string
  description: string
  features: string[]
}

const steps: StepData[] = [
  {
    id: 1,
    color: "#3B82F6",
    colorLight: "#EFF6FF",
    title: "顧客接点をつくる",
    subtitle: "STEP 1",
    description: "友だち追加と同時に会員化。来店のきっかけをLINE上でつくる。",
    features: ["LINE会員証", "予約", "順番待ち"],
  },
  {
    id: 2,
    color: "#06C755",
    colorLight: "#E8F8F0",
    title: "データで再来店を促す",
    subtitle: "STEP 2",
    description: "行動データに基づいた販促で、再来店率をUP。",
    features: ["スタンプカード", "クーポン配信", "チケット発行", "抽選"],
  },
  {
    id: 3,
    color: "#8B5CF6",
    colorLight: "#F5F3FF",
    title: "LTVを最大化する",
    subtitle: "STEP 3",
    description: "顧客データを活用したパーソナライズ配信で、売上に直結。",
    features: ["セグメント配信", "動的リッチメニュー", "1to1コミュニケーション"],
  },
]

const stepColorMap: Record<string, { step: number; color: string; label: string }> = {
  "LINE会員証": { step: 1, color: "#3B82F6", label: "STEP1" },
  "順番待ち": { step: 1, color: "#3B82F6", label: "STEP1" },
  "予約": { step: 1, color: "#3B82F6", label: "STEP1" },
  "スタンプカード": { step: 2, color: "#06C755", label: "STEP2" },
  "クーポン配信": { step: 2, color: "#06C755", label: "STEP2" },
  "チケット発行": { step: 2, color: "#06C755", label: "STEP2" },
  "抽選": { step: 2, color: "#06C755", label: "STEP2" },
  "セグメント配信": { step: 3, color: "#8B5CF6", label: "STEP3" },
  "1to1コミュニケーション": { step: 3, color: "#8B5CF6", label: "STEP3" },
  "ギフト": { step: 3, color: "#8B5CF6", label: "STEP3" },
}

const features = [
  { image: "/images/会員証.png", name: "LINE会員証", description: "5秒で会員化、アプリDL不要" },
  { image: "/images/順番待ち.png", name: "順番待ち", description: "待ち時間を可視化" },
  { image: "/images/予約.png", name: "予約", description: "無断キャンセル削減" },
  { image: "/images/スタンプカード.png", name: "スタンプカード", description: "デジタルで紛失なし" },
  { image: "/images/クーポン.png", name: "クーポン配信", description: "セグメント別配信" },
  { image: "/images/チケット.png", name: "チケット発行", description: "イベント・入場管理" },
  { image: "/images/抽選.png", name: "抽選", description: "キャンペーン施策に最適" },
  { image: "/images/セグメント配信.png", name: "セグメント配信", description: "動的リッチメニューで最適UI" },
  { image: "/images/1to1.png", name: "1to1コミュニケーション", description: "顧客対応を記録" },
  { image: "/images/ギフト.png", name: "ギフト", description: "友人紹介プログラム" },
]

const securityItems = [
  { icon: ShieldCheck, title: "LINE公認テクノロジーパートナー", description: "LINE社から技術力を認定されたパートナー企業として、高品質な開発を提供" },
  { icon: Cloud, title: "AWS上のセキュアな基盤", description: "AWS Premierパートナーとして、堅牢なインフラ環境で運用" },
  { icon: Award, title: "200社以上の導入実績", description: "小売・飲食・サービス業を中心に、幅広い業種での実績" },
]

// ─── Component ────────────────────────────────────

export function RetailLP() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <LPHeader />
      <main className="pb-20 md:pb-0">
        {/* ① Hero Section */}
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
                  友だち<span className="text-[#06C755]">5万人</span>。
                  <br />
                  売上への貢献、<span className="text-[#FB923C]">ゼロ</span>。
                </h1>

                <p
                  className={`text-sm sm:text-base md:text-lg lg:text-xl text-[#6B7280] leading-[1.75] mb-6 sm:mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 ${
                    isLoaded ? "animate-fade-in animation-delay-200" : "opacity-0"
                  }`}
                >
                  &ldquo;友だち集め&rdquo;で止まっていませんか？
                  <br className="hidden sm:block" />
                  <span className="text-[#06C755] font-bold">LINEミニアプリ</span>
                  で、友だちを&ldquo;顧客&rdquo;に変える。
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

              {/* Visual - Phone Mockup */}
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
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-xs text-[#9CA3AF] tracking-wider">Scroll</span>
            <ChevronDown size={24} className="text-[#06C755] animate-bounce-slow" />
          </div>
        </section>

        {/* Metrics Bar */}
        <section className="py-6 sm:py-8 bg-[#1F2937]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
            <p className="text-xs sm:text-sm text-center text-gray-400 mb-3 sm:mb-4">導入企業の実績</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: "3", unit: "倍", label: "会員数増加" },
                { value: "5", unit: "秒", label: "で会員登録完了" },
                { value: "15", unit: "万人", label: "友だち増加" },
                { value: "5", unit: "倍以上", label: "会員証提示率" },
              ].map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5">
                    <span className="font-['Roboto'] text-[#06C755]">{m.value}</span>
                    <span className="text-base sm:text-lg md:text-xl text-gray-300">{m.unit}</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ② Trouble Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-3 sm:mb-4">
              こんなお悩み、ありませんか？
            </h2>
            <p className="text-sm sm:text-base text-center text-[#6B7280] mb-8 sm:mb-12 md:mb-16">
              LINE公式アカウント運用の「あるある」
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {troubles.map((item, index) => {
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
            <div className="mt-8 sm:mt-12 md:mt-16 max-w-2xl mx-auto">
              <div className="bg-[#1F2937] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-center">
                <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
                  原因はシンプル。
                  <br />
                  友だち ＝ <span className="text-[#FB923C]">匿名の誰か</span> のまま。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ③ Before/After Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-[#F0FDF4]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-3 sm:mb-4">
              導入企業の成果
            </h2>
            <p className="text-sm sm:text-base text-center text-[#6B7280] mb-8 sm:mb-12 md:mb-16">
              友だちを「顧客」に変えた企業の実績
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-1 sm:mb-2">{study.company}</h3>
                    <p className="text-xs sm:text-sm text-[#6B7280]">{study.industry} / {study.scale}</p>
                    <span className="inline-block mt-1.5 sm:mt-2 px-2.5 py-0.5 bg-[#E8F8F0] text-[#06C755] text-xs sm:text-sm font-semibold rounded-full">
                      {study.timeline}
                    </span>
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

        {/* ④ What Section - Comparison Table */}
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
              <div className="grid grid-cols-3 gap-0 mb-0">
                <div className="p-3 sm:p-4" />
                <div className="p-3 sm:p-4 text-center bg-gray-100 rounded-t-xl border-b-2 border-gray-300">
                  <p className="text-xs sm:text-sm font-bold text-[#6B7280]">LINE公式</p>
                  <p className="text-xs sm:text-sm font-bold text-[#6B7280]">アカウント</p>
                </div>
                <div className="p-3 sm:p-4 text-center bg-[#E8F8F0] rounded-t-xl border-b-2 border-[#06C755]">
                  <p className="text-xs sm:text-sm font-bold text-[#06C755]">LINE</p>
                  <p className="text-xs sm:text-sm font-bold text-[#06C755]">ミニアプリ</p>
                </div>
              </div>

              {/* Table Rows */}
              {comparisonItems.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-0 ${
                    item.highlight ? "bg-[#FFF7ED]" : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } ${index === comparisonItems.length - 1 ? "rounded-b-xl" : ""}`}
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
                    <span className="text-lg sm:text-xl text-[#06C755] font-bold">○</span>
                  </div>
                </div>
              ))}

              {/* Highlight box */}
              <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[#06C755] to-[#39D275] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center text-white">
                <p className="text-base sm:text-lg md:text-xl font-bold">
                  友だち追加と会員登録が<span className="text-[#FCD34D]">同時に完了</span>
                </p>
                <p className="text-xs sm:text-sm mt-1.5 sm:mt-2 opacity-90">
                  アプリDL不要。LINEだけで会員化が完結します
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ⑤ Steps Section (Tab Switching) */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-3 sm:mb-4">
              3ステップで売上につなげる
            </h2>
            <p className="text-sm sm:text-base text-center text-[#6B7280] mb-8 sm:mb-12 md:mb-16">
              友だちを集めて終わりにしない、段階的な顧客育成
            </p>

            {/* Tab Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`flex-1 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 border-2 ${
                    activeStep === index
                      ? "text-white shadow-lg scale-[1.02]"
                      : "bg-white text-[#6B7280] border-[#E5E7EB] hover:border-gray-300"
                  }`}
                  style={
                    activeStep === index
                      ? { backgroundColor: step.color, borderColor: step.color }
                      : {}
                  }
                >
                  <span className="block text-xs sm:text-sm opacity-80">{step.subtitle}</span>
                  <span className="block">{step.title}</span>
                </button>
              ))}
            </div>

            {/* Active Step Content */}
            <div
              className="max-w-3xl mx-auto rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-10 border-2"
              style={{
                backgroundColor: steps[activeStep].colorLight,
                borderColor: steps[activeStep].color,
              }}
            >
              <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-1">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4"
                    style={{ backgroundColor: steps[activeStep].color }}
                  >
                    {steps[activeStep].subtitle}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F2937] mb-2 sm:mb-3">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed mb-4 sm:mb-6">
                    {steps[activeStep].description}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {steps[activeStep].features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-white"
                        style={{ backgroundColor: steps[activeStep].color }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Step illustration */}
                <div className="w-full md:w-48 flex items-center justify-center">
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: steps[activeStep].color }}
                  >
                    {activeStep === 0 && <Users size={48} className="sm:w-14 sm:h-14 md:w-16 md:h-16" />}
                    {activeStep === 1 && <TrendingUp size={48} className="sm:w-14 sm:h-14 md:w-16 md:h-16" />}
                    {activeStep === 2 && <Zap size={48} className="sm:w-14 sm:h-14 md:w-16 md:h-16" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ⑥ Features Section (with STEP color coding) */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-3 sm:mb-4">
              店舗に必要な機能、すべて揃っています
            </h2>
            <p className="text-sm sm:text-base text-center text-[#6B7280] mb-8 sm:mb-12 md:mb-16">
              必要な機能を選択して、最短3ヶ月でLINEミニアプリを構築
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {features.map((feature, index) => {
                const stepInfo = stepColorMap[feature.name]
                return (
                  <div
                    key={index}
                    className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#06C755] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* STEP color bar */}
                    {stepInfo && (
                      <div className="h-1" style={{ backgroundColor: stepInfo.color }} />
                    )}
                    <div className="p-4 sm:p-5 md:p-6">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                          <Image src={feature.image} alt={feature.name} fill className="object-contain" />
                        </div>
                        {stepInfo && (
                          <span
                            className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: stepInfo.color }}
                          >
                            {stepInfo.label}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1F2937] mb-1.5 sm:mb-2">
                        {feature.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B7280]">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-8 sm:mt-10 md:mt-12">
              <p className="text-sm sm:text-base text-[#6B7280]">上記以外にも、ニーズに合わせた機能開発が可能です</p>
            </div>
          </div>
        </section>

        {/* ⑦ Security Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-8 sm:mb-12 md:mb-16">
              安心の開発体制
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {securityItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#E5E7EB] text-center hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#E8F8F0] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icon size={24} className="sm:w-7 sm:h-7 text-[#06C755]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1F2937] mb-1.5 sm:mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ⑧ 導入の流れ */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-3 sm:mb-4">
              導入の流れ
            </h2>
            <p className="text-sm sm:text-base text-center text-[#6B7280] mb-8 sm:mb-12 md:mb-16">
              最短3ヶ月で本番稼働
            </p>

            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                {[
                  { icon: Headphones, step: "01", title: "ヒアリング", period: "2週間", desc: "課題・要件の整理と最適な機能の選定" },
                  { icon: FileText, step: "02", title: "設計・開発", period: "2ヶ月", desc: "機能アセットをベースにスピード開発" },
                  { icon: Rocket, step: "03", title: "テスト・リリース", period: "2週間", desc: "動作検証と本番環境への展開" },
                  { icon: CheckCircle2, step: "04", title: "運用サポート", period: "継続", desc: "データ分析と改善提案を伴走支援" },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="relative flex md:flex-col items-start md:items-center text-center gap-4 md:gap-0 pb-6 md:pb-0">
                      {/* Connector line (desktop) */}
                      {index < 3 && (
                        <div className="hidden md:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-[#E5E7EB]" />
                      )}
                      {/* Connector line (mobile) */}
                      {index < 3 && (
                        <div className="md:hidden absolute left-[23px] top-[52px] w-0.5 h-[calc(100%-52px)] bg-[#E5E7EB]" />
                      )}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#06C755] rounded-full flex items-center justify-center shrink-0 relative z-10">
                        <Icon size={22} className="sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="md:mt-3 text-left md:text-center">
                        <p className="text-[10px] sm:text-xs text-[#06C755] font-bold mb-0.5">STEP {item.step}</p>
                        <h3 className="text-sm sm:text-base font-bold text-[#1F2937] mb-0.5 sm:mb-1">{item.title}</h3>
                        <span className="inline-block px-2 py-0.5 bg-[#E8F8F0] text-[#06C755] text-[10px] sm:text-xs font-semibold rounded-full mb-1 sm:mb-2">
                          {item.period}
                        </span>
                        <p className="text-[10px] sm:text-xs text-[#6B7280] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ⑨ CTA Section with Document Preview */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#E8F8F0] to-white">
          <div className="max-w-[900px] mx-auto px-4 sm:px-5 md:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-4 sm:mb-6">まずは資料で詳しく知る</h2>

            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10">
              {/* Document Preview */}
              <div className="flex-1 bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#E5E7EB] shadow-sm">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <FileText size={20} className="text-[#06C755]" />
                  <p className="text-sm sm:text-base font-bold text-[#1F2937]">資料でわかること</p>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "導入企業の具体的な成果数値",
                    "10機能の詳細と活用シーン",
                    "料金プラン・開発スケジュール",
                    "他社サービスとの比較",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#06C755] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1F2937]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex-1 text-center">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <a
                    href={CTA_DOWNLOAD}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 sm:px-6 md:px-10 py-3.5 sm:py-4 md:py-5 bg-[#06C755] text-white font-bold text-base sm:text-lg md:text-xl rounded-lg shadow-xl hover:bg-[#05A847] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Download size={18} className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" />
                    資料ダウンロード（無料）
                  </a>
                  <a
                    href={CTA_CONTACT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-5 sm:px-6 md:px-10 py-3.5 sm:py-4 md:py-5 bg-white text-[#06C755] font-bold text-base sm:text-lg md:text-xl border-2 border-[#06C755] rounded-lg hover:bg-[#E8F8F0] transition-all duration-300"
                  >
                    <MessageCircle size={18} className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" />
                    直接相談したい方はこちら
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-[#9CA3AF] mt-3 sm:mt-4">
                  ※ 30秒で完了。営業電話はいたしません
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LPFooter />
      <MobileFABButtons />
    </div>
  )
}
