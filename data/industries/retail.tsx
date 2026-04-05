import { Users, TrendingUp, Zap, MessageSquare } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const retailData: IndustryLPData = {
  industryKey: "retail",
  label: "小売・流通",
  hero: {
    headline: (
      <>
        友だち<span className="text-[#06C755]">5万人</span>。
        <br />
        売上への貢献、<span className="text-[#FB923C]">ゼロ</span>。
      </>
    ),
    subheadline: (
      <>
        &ldquo;友だち集め&rdquo;で止まっていませんか？
        <br className="hidden sm:block" />
        <span className="text-[#06C755] font-bold">LINEミニアプリ</span>
        で、友だちを&ldquo;顧客&rdquo;に変える。
      </>
    ),
  },
  metrics: [
    { value: "3", unit: "倍", label: "会員数増加" },
    { value: "5", unit: "秒", label: "で会員登録完了" },
    { value: "15", unit: "万人", label: "友だち増加" },
    { value: "5", unit: "倍以上", label: "会員証提示率" },
  ],
  problem: {
    heading: "こんなお悩み、ありませんか？",
    subtitle: "LINE公式アカウント運用の「あるある」",
    items: [
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
    ],
    bottomMessage: (
      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
        原因はシンプル。
        <br />
        友だち ＝ <span className="text-[#FB923C]">匿名の誰か</span> のまま。
      </p>
    ),
  },
  caseStudies: [
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
  ],
  comparison: commonComparisonItems,
  comparisonHighlight: {
    title: (
      <>
        友だち追加と会員登録が<span className="text-[#FCD34D]">同時に完了</span>
      </>
    ),
    description: "アプリDL不要。LINEだけで会員化が完結します",
  },
  steps: [
    {
      id: 1,
      color: "#3B82F6",
      colorLight: "#EFF6FF",
      title: "顧客接点をつくる",
      subtitle: "STEP 1",
      description: "友だち追加と同時に会員化。来店のきっかけをLINE上でつくる。",
      features: ["LINE会員証", "予約", "順番待ち"],
      icon: Users,
    },
    {
      id: 2,
      color: "#06C755",
      colorLight: "#E8F8F0",
      title: "データで再来店を促す",
      subtitle: "STEP 2",
      description: "行動データに基づいた販促で、再来店率をUP。",
      features: ["スタンプカード", "クーポン配信", "チケット発行", "抽選"],
      icon: TrendingUp,
    },
    {
      id: 3,
      color: "#8B5CF6",
      colorLight: "#F5F3FF",
      title: "LTVを最大化する",
      subtitle: "STEP 3",
      description: "顧客データを活用したパーソナライズ配信で、売上に直結。",
      features: ["セグメント配信", "動的リッチメニュー", "1to1コミュニケーション"],
      icon: Zap,
    },
  ],
  featureSection: {
    heading: "店舗に必要な機能、すべて揃っています",
    subtitle: "必要な機能を選択して、最短3ヶ月でLINEミニアプリを構築",
    items: [
      { image: "/images/会員証.png", name: "LINE会員証", description: "5秒で会員化、アプリDL不要", url: "/memberscard" },
      { image: "/images/順番待ち.png", name: "順番待ち", description: "待ち時間を可視化", url: "/waiting" },
      { image: "/images/予約.png", name: "予約", description: "無断キャンセル削減", url: "/reservation" },
      { image: "/images/スタンプカード.png", name: "スタンプカード", description: "デジタルで紛失なし", url: "/stampcard" },
      { image: "/images/クーポン.png", name: "クーポン配信", description: "セグメント別配信", url: "/coupon" },
      { image: "/images/チケット.png", name: "チケット発行", description: "イベント・入場管理", url: "/ticket" },
      { image: "/images/抽選.png", name: "抽選", description: "キャンペーン施策に最適", url: "/lottery" },
      { image: "/images/セグメント配信.png", name: "セグメント配信", description: "動的リッチメニューで最適UI", url: "/segment" },
      { image: "/images/1to1.png", name: "1to1コミュニケーション", description: "顧客対応を記録", url: "/1to1" },
      { image: "/images/ギフト.png", name: "ギフト", description: "友人紹介プログラム", url: "/gift" },
    ],
    stepColorMap: {
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
    },
  },
}
