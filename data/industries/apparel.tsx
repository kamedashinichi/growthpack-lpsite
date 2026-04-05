import { Users, TrendingUp, Zap, MessageSquare, Smartphone } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const apparelData: IndustryLPData = {
  industryKey: "apparel",
  label: "アパレル",
  hero: {
    headline: (
      <>
        「アプリを入れてもらえない」時代の
        <br />
        <span className="text-[#06C755]">会員DX</span>、答えが出ました。
      </>
    ),
    subheadline: (
      <>
        ポイントカード離れ・アプリ疲れが進む今、
        <br className="hidden sm:block" />
        アパレル大手が会員数を3倍にした方法は
        <br className="hidden sm:block" />
        「インストール不要の<span className="text-[#06C755] font-bold">LINEミニアプリ</span>」でした。
      </>
    ),
  },
  metrics: [
    { value: "3", unit: "倍", label: "会員数増加（PAL様）" },
    { value: "5", unit: "秒", label: "で会員登録完了" },
    { value: "10", unit: "万人", label: "友だち増加（1ヶ月）" },
  ],
  problem: {
    heading: "アパレル業界のDX担当者が「限界だ」と感じる、4つの壁",
    subtitle: "ポイントカード離れ・アプリ疲れ・データ分断が重なっている",
    items: [
      {
        icon: Users,
        title: "会員証DX",
        problem: "「ポイントカード忘れました」の連続",
        detail: "レジで手書き記入→途中離脱→会員化できない。アプリDLを促しても「後で」と断られる",
      },
      {
        icon: Smartphone,
        title: "アプリ疲れ",
        problem: "DL数が伸び悩み、起動率は10〜20%",
        detail: "スマートフォンの画面はすでに満員。インストールを頼む施策は、もう限界",
      },
      {
        icon: TrendingUp,
        title: "データ分断",
        problem: "同じ顧客が「3人」に見える",
        detail: "店舗購買・ECカート・LINE友だちの3つのIDが別管理。パーソナライズできない",
      },
      {
        icon: MessageSquare,
        title: "休眠会員",
        problem: "会員の6〜7割が年1回未満の来店",
        detail: "セグメント配信できず一斉DM。費用は増えるのに効果は薄れていく",
      },
    ],
    bottomMessage: (
      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
        原因はシンプル。
        <br />
        顧客データが<span className="text-[#FB923C]">バラバラのまま</span>蓄積されている。
      </p>
    ),
  },
  caseStudies: [
    {
      company: "PAL様",
      industry: "アパレル・雑貨",
      scale: "約900店舗・50ブランド",
      timeline: "導入後6ヶ月",
      metrics: [
        { value: "3", unit: "倍", label: "会員数増加" },
        { value: "5", unit: "秒", label: "で会員登録完了" },
        { value: "10", unit: "万人", label: "友だち増加（1ヶ月）" },
      ],
    },
  ],
  comparison: commonComparisonItems,
  comparisonHighlight: {
    title: (
      <>
        ブランド横断の会員データが<span className="text-[#FCD34D]">同時に統合</span>
      </>
    ),
    description: "アプリDL不要。LINEだけで全ブランド共通の会員化が完結します",
  },
  steps: [
    {
      id: 1,
      color: "#3B82F6",
      colorLight: "#EFF6FF",
      title: "ブランド横断の顧客接点をつくる",
      subtitle: "STEP 1",
      description: "友だち追加と同時に全ブランド共通の会員化。",
      features: ["LINE会員証", "クーポン配信"],
      icon: Users,
    },
    {
      id: 2,
      color: "#06C755",
      colorLight: "#E8F8F0",
      title: "1to1で顧客関係を深める",
      subtitle: "STEP 2",
      description: "担当が替わっても対話履歴が引き継がれる接客体験。",
      features: ["1to1コミュニケーション", "ギフト"],
      icon: TrendingUp,
    },
    {
      id: 3,
      color: "#8B5CF6",
      colorLight: "#F5F3FF",
      title: "データで売上を最大化する",
      subtitle: "STEP 3",
      description: "全ブランドの購買データを統合したパーソナライズ配信。",
      features: ["セグメント配信", "動的リッチメニュー"],
      icon: Zap,
    },
  ],
  featureSection: {
    heading: "アパレルに必要な機能、すべて揃っています",
    subtitle: "ブランド横断の顧客体験を、最短3ヶ月で構築",
    items: [
      { image: "/images/会員証.png", name: "LINE会員証", description: "全ブランド共通の会員証で5秒登録", url: "/memberscard" },
      { image: "/images/1to1.png", name: "1to1コミュニケーション", description: "担当交代しても対話履歴を引き継ぎ", url: "/1to1" },
      { image: "/images/クーポン.png", name: "クーポン配信", description: "購買データに基づくセグメント配信", url: "/coupon" },
      { image: "/images/ギフト.png", name: "ギフト", description: "友人紹介でブランドファンを拡大", url: "/gift" },
      { image: "/images/順番待ち.png", name: "順番待ち", description: "待ち時間を可視化", url: "/waiting" },
      { image: "/images/予約.png", name: "予約", description: "無断キャンセル削減", url: "/reservation" },
      { image: "/images/スタンプカード.png", name: "スタンプカード", description: "デジタルで紛失なし", url: "/stampcard" },
      { image: "/images/チケット.png", name: "チケット発行", description: "イベント・入場管理", url: "/ticket" },
      { image: "/images/抽選.png", name: "抽選", description: "キャンペーン施策に最適", url: "/lottery" },
      { image: "/images/セグメント配信.png", name: "セグメント配信", description: "動的リッチメニューで最適UI", url: "/segment" },
    ],
    stepColorMap: {
      "LINE会員証": { step: 1, color: "#3B82F6", label: "STEP1" },
      "クーポン配信": { step: 1, color: "#3B82F6", label: "STEP1" },
      "1to1コミュニケーション": { step: 2, color: "#06C755", label: "STEP2" },
      "ギフト": { step: 2, color: "#06C755", label: "STEP2" },
      "セグメント配信": { step: 3, color: "#8B5CF6", label: "STEP3" },
    },
  },
}
