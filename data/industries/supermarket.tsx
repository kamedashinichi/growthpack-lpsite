import { ShoppingCart, CreditCard, Users, TrendingUp } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const supermarketData: IndustryLPData = {
  industryKey: "supermarket",
  label: "食品スーパー・ホームセンター",
  hero: {
    headline: (
      <>
        会員カードを、
        <br />
        <span className="text-[#06C755]">スマホ</span>に変える。
      </>
    ),
    subheadline: (
      <>
        チラシコストの増大、会員カード提示率の低迷、シニアのデジタル離れ。
        <br className="hidden sm:block" />
        アプリDL不要。QRコードを読み取るだけ。
        <br className="hidden sm:block" />
        シニアのお客様でも<span className="text-[#06C755] font-bold">5秒で会員証発行</span>。
      </>
    ),
    heroImage: "/images/supermarket-hero.png",
  },
  metrics: [
    { value: "1", unit: "ヶ月", label: "最短導入期間" },
    { value: "5", unit: "秒", label: "で会員登録完了" },
  ],
  problem: {
    heading: "食品スーパー・ホームセンターのDX担当者が抱える、5つの課題",
    subtitle: "チラシ依存・カード提示率低迷・シニア対応——SM・HC共通の構造課題",
    items: [
      {
        icon: ShoppingCart,
        title: "チラシDX",
        problem: "印刷・配布コストは増え、到達率は下がる一方",
        detail: "週次チラシを続けているが折込の到達率は年々低下。デジタルチラシに移行しても「誰が見た・誰が来た」がわからない",
      },
      {
        icon: CreditCard,
        title: "会員カード低提示率",
        problem: "「カード忘れました」が毎日のように起きている",
        detail: "プラスチックカードは財布を圧迫する。持ち歩かない。ポイントが貯まらないから会員のメリットが伝わらない悪循環",
      },
      {
        icon: Users,
        title: "シニアのデジタル離れ",
        problem: "アプリを作ったが、シニアのお客様がDLしてくれない",
        detail: "スマートフォンは持っている。でもアプリのインストールは難しいと感じている。LINEは使っているのに独自アプリは使ってもらえない",
      },
    ],
    bottomMessage: (
      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
        原因はシンプル。
        <br />
        来店客が<span className="text-[#FB923C]">会員として認識されないまま</span>帰っていく。
      </p>
    ),
  },
  caseStudies: [],
  comparison: commonComparisonItems,
  comparisonHighlight: {
    title: (
      <>
        カード忘れゼロ、<span className="text-[#FCD34D]">全来店客を会員化</span>
      </>
    ),
    description: "LINEはすでに使っている。QRコードを読み取るだけで会員証発行。シニアでも5秒で完了",
  },
  steps: [
    {
      id: 1,
      color: "#3B82F6",
      colorLight: "#EFF6FF",
      title: "会員証をスマホに移行する",
      subtitle: "STEP 1",
      description: "QRコードを読み取るだけ。アプリDL不要で来店客を即時会員化。カード忘れゼロへ。",
      features: ["LINE会員証", "スタンプカード"],
      icon: CreditCard,
    },
    {
      id: 2,
      color: "#06C755",
      colorLight: "#E8F8F0",
      title: "チラシをLINEに置き換える",
      subtitle: "STEP 2",
      description: "週次チラシの代替となるデジタルクーポンをLINEで配信。開封・来店・購買を計測できる。",
      features: ["クーポン配信", "セグメント配信"],
      icon: ShoppingCart,
    },
    {
      id: 3,
      color: "#8B5CF6",
      colorLight: "#F5F3FF",
      title: "購買データで施策を精緻化する",
      subtitle: "STEP 3",
      description: "「よく来るお客様」「久しぶりのお客様」に別々のメッセージ。PB商品・季節商品の訴求も抽選で。",
      features: ["セグメント配信", "抽選"],
      icon: TrendingUp,
    },
  ],
  featureSection: {
    heading: "食品スーパー・ホームセンターに必要な機能、すべて揃っています",
    subtitle: "会員証デジタル化からチラシDXまで、アセットベースでスピード導入",
    items: [
      { image: "/images/会員証.png", name: "デジタル会員証", description: "QRで5秒会員化。シニアでもアプリDL不要", url: "/memberscard" },
      { image: "/images/クーポン.png", name: "クーポン配信", description: "週次チラシ代替。開封・来店・購買を計測", url: "/coupon" },
      { image: "/images/セグメント配信.png", name: "セグメント配信", description: "来店頻度・購買カテゴリ別に最適な内容を配信", url: "/segment" },
      { image: "/images/スタンプカード.png", name: "スタンプカード", description: "シニアに馴染みのスタンプ体験をデジタルで再現", url: "/stampcard" },
      { image: "/images/抽選.png", name: "抽選", description: "新商品・PB商品を抽選でデジタル配布。反応を計測", url: "/lottery" },
    ],
  },
}
