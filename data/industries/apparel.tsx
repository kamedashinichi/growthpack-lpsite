import { Users, TrendingUp, Zap, MessageSquare } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const apparelData: IndustryLPData = {
  industryKey: "apparel",
  label: "アパレル",
  hero: {
    headline: (
      <>
        <span className="text-[#06C755]">50</span>ブランド、
        <br />
        1つの<span className="text-[#FB923C]">会員証</span>。
      </>
    ),
    subheadline: (
      <>
        EC×店舗の会員データを統合し、ブランドを横断した
        <br className="hidden sm:block" />
        顧客体験を<span className="text-[#06C755] font-bold">LINEミニアプリ</span>で実現。
      </>
    ),
  },
  metrics: [
    { value: "3", unit: "倍", label: "会員数増加" },
    { value: "5", unit: "秒", label: "で会員登録完了" },
    { value: "10", unit: "万人", label: "友だち増加（1ヶ月）" },
    { value: "5", unit: "倍", label: "EC売上" },
  ],
  problem: {
    heading: "こんなお悩み、ありませんか？",
    subtitle: "アパレル業界の「あるある」",
    items: [
      {
        icon: Users,
        title: "EC×店舗の会員分断",
        problem: "同じお客様が別人として管理されている",
        detail: "ECと店舗で会員基盤が別々。ポイント・購買履歴が統合されず、最適な提案ができない",
      },
      {
        icon: MessageSquare,
        title: "担当が替わると顧客が離れる",
        problem: "個人LINEでの接客が属人化している",
        detail: "スタッフの退職や異動で、築いた顧客関係がリセットされてしまう",
      },
      {
        icon: TrendingUp,
        title: "SaaSでは対応できない",
        problem: "マルチブランドの会員統合ができない",
        detail: "複数ブランドを展開するアパレル企業に対応できるSaaS型ツールがない",
      },
    ],
    bottomMessage: (
      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
        原因はシンプル。
        <br />
        ブランドごとに顧客データが<span className="text-[#FB923C]">バラバラ</span>のまま。
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
