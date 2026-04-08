import { ShoppingBag, Smartphone, Database, CreditCard } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const drugstoreData: IndustryLPData = {
  industryKey: "drugstore",
  label: "ドラッグストア・薬局",
  hero: {
    headline: (
      <>
        プラカードを、
        <br />
        <span className="text-[#06C755]">やめる日</span>。
      </>
    ),
    subheadline: (
      <>
        アプリを入れてもらえなくても、LINEは使っている。
        <br className="hidden sm:block" />
        来店客全員を会員化し、購買属性でセグメント配信する。
        <br className="hidden sm:block" />
        ドラッグストア・薬局のための顧客接点DXを、<span className="text-[#06C755] font-bold">アセットベース</span>でスピード構築。
      </>
    ),
    heroImage: "/images/drugstore-hero.png",
  },
  metrics: [
    { value: "5", unit: "秒", label: "で会員登録完了" },
  ],
  problem: {
    heading: "こんなお悩み、ありませんか？",
    subtitle: "ドラッグストア・薬局業界の「あるある」",
    items: [
      {
        icon: CreditCard,
        title: "プラカードのコスト",
        problem: "発行・管理・再発行コストが毎年かかる",
        detail: "来店時にカードを忘れる顧客が多く、会員メリットが届かない。アプリのDL率も伸び悩んでいる",
      },
      {
        icon: Smartphone,
        title: "調剤の待ち時間",
        problem: "「完成したら声をかけます」が今も続いている",
        detail: "処方箋受付〜調剤完了まで平均20〜40分。待機中の顧客に何も提供できていない",
      },
      {
        icon: Database,
        title: "会員データの断絶",
        problem: "ポイントカードはあるが、LINEと紐づいていない",
        detail: "全会員に同じ内容を配信 → 開封率・クーポン利用率が低迷。購買属性別の精緻な配信ができない",
      },
    ],
    bottomMessage: (
      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
        原因はシンプル。
        <br />
        来店客が<span className="text-[#FB923C]">データ化されないまま</span>帰っていく。
      </p>
    ),
  },
  caseStudies: [],
  comparison: commonComparisonItems,
  comparisonHighlight: {
    title: (
      <>
        プラカードを廃止し、<span className="text-[#FCD34D]">全来店客をデータ化</span>
      </>
    ),
    description: "アプリDL不要。レジQRをかざした瞬間から会員化が始まります",
  },
  steps: [
    {
      id: 1,
      color: "#3B82F6",
      colorLight: "#EFF6FF",
      title: "来店客全員を会員化する",
      subtitle: "STEP 1",
      description: "レジQRをスキャンするだけ。アプリDL不要で来店客を即時会員化。プラカード不要。",
      features: ["LINE会員証", "クーポン配信"],
      icon: CreditCard,
    },
    {
      id: 2,
      color: "#06C755",
      colorLight: "#E8F8F0",
      title: "購買属性でセグメント配信する",
      subtitle: "STEP 2",
      description: "処方箋利用者・健康食品愛好者・一般購買者別に最適な内容を配信。ブロック率を下げる。",
      features: ["セグメント配信", "スタンプカード"],
      icon: Database,
    },
    {
      id: 3,
      color: "#8B5CF6",
      colorLight: "#F5F3FF",
      title: "調剤連携で来店体験を向上する",
      subtitle: "STEP 3",
      description: "調剤完了をLINEで通知。待ち時間中に関連商品のクーポンを配信して買い回りを促進。",
      features: ["1to1コミュニケーション", "セグメント配信"],
      icon: Smartphone,
    },
  ],
  featureSection: {
    heading: "ドラッグストア・薬局に必要な機能、すべて揃っています",
    subtitle: "プラカード廃止から調剤連携まで、アセットベースでスピード導入",
    items: [
      { image: "/images/会員証.png", name: "デジタル会員証", description: "レジQRで5秒会員化。アプリDL不要", url: "/memberscard" },
      { image: "/images/クーポン.png", name: "クーポン配信", description: "不正利用ゼロ。ユニークIDで1回限り制御", url: "/coupon" },
      { image: "/images/セグメント配信.png", name: "セグメント配信", description: "処方箋利用者・健康食品愛好者別に最適配信", url: "/segment" },
      { image: "/images/スタンプカード.png", name: "スタンプカード", description: "来店頻度を可視化。リピート促進", url: "/stampcard" },
      { image: "/images/1to1.png", name: "1to1コミュニケーション", description: "調剤完了通知など個別対応をLINEで完結", url: "/1to1" },
      { image: "/images/予約.png", name: "予約", description: "調剤・カウンセリングの予約受付", url: "/reservation" },
    ],
  },
}
