import { ShoppingCart, Users, Gift, TrendingUp } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const ecData: IndustryLPData = {
  industryKey: "ec",
  label: "EC・D2C",
  hero: {
    headline: (
      <>
        カゴ落ちを、
        <br />
        <span className="text-[#06C755]">自動回収</span>する。
      </>
    ),
    subheadline: (
      <>
        LINE友だちとEC会員の分断、カゴ落ちフォローの欠如、一斉配信によるブロック率増加。
        <br className="hidden sm:block" />
        購買履歴に基づくセグメント配信で、
        <br className="hidden sm:block" />
        <span className="text-[#06C755] font-bold">LINEをECの再購入エンジン</span>に変える。
      </>
    ),
    heroImage: "/images/ec-hero.png",
  },
  metrics: [
    { value: "1", unit: "ヶ月", label: "最短導入期間" },
    { value: "5", unit: "秒", label: "で会員登録完了" },
  ],
  problem: {
    heading: "EC・D2C事業者が抱える、5つの課題",
    subtitle: "友だち分断・カゴ落ち・ブロック率——ECに共通する顧客データ活用の壁",
    items: [
      {
        icon: Users,
        title: "LINE友だちとEC会員の分断",
        problem: "友だちは多いのに、誰が誰かわからない",
        detail: "LINE公式アカウントに友だちは多いがEC会員との紐付けができていない。購買履歴が配信に活かされず「宝の持ち腐れ」",
      },
      {
        icon: ShoppingCart,
        title: "カゴ落ち自動フォローの欠如",
        problem: "カゴ落ちをメールでフォローしているが、開封されない",
        detail: "国内ECのカゴ落ち率は約65%（イー・エージェンシー調査・850サイト・2022年）。メール開封率は約20%にとどまり、カゴ落ちが発生してもタイムリーな自動フォローができない",
      },
      {
        icon: TrendingUp,
        title: "一斉配信によるブロック率増加",
        problem: "配信件数に比例してコストが増え、ブロック率も増大",
        detail: "顧客データが活用できないため全員に同じメッセージを送らざるを得ない。無関係な配信が続くとブロック率が上昇し友だちリストが劣化",
      },
    ],
    bottomMessage: (
      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
        原因はシンプル。
        <br />
        LINE友だちとEC会員が<span className="text-[#FB923C]">つながっていない</span>。
      </p>
    ),
  },
  caseStudies: [],
  comparison: commonComparisonItems,
  comparisonHighlight: {
    title: (
      <>
        LINE友だちとEC会員を統合し、<span className="text-[#FCD34D]">セグメント配信を解禁</span>
      </>
    ),
    description: "LINE ID連携でカゴ落ちフォロー・リピート促進・休眠掘り起こしがすべて自動化されます",
  },
  steps: [
    {
      id: 1,
      color: "#3B82F6",
      colorLight: "#EFF6FF",
      title: "LINE友だちとEC会員を統合する",
      subtitle: "STEP 1",
      description: "LINE ID連携でEC会員IDとLINE IDを統合。誰が誰かわかるようになり、セグメント配信・カゴ落ちフォローが解禁される。",
      features: ["LINE会員証", "セグメント配信"],
      icon: Users,
    },
    {
      id: 2,
      color: "#06C755",
      colorLight: "#E8F8F0",
      title: "カゴ落ちを自動フォローする",
      subtitle: "STEP 2",
      description: "購買タイミングに連動した限定クーポンを自動配信。カゴ落ち回収・休眠掘り起こしをLINEで実現。",
      features: ["クーポン配信", "セグメント配信"],
      icon: ShoppingCart,
    },
    {
      id: 3,
      color: "#8B5CF6",
      colorLight: "#F5F3FF",
      title: "ギフト受取人を会員化する",
      subtitle: "STEP 3",
      description: "受取人が受け取りと同時に会員登録。URL一本で在庫をデジタルチケット化。住所不要、配送コスト削減。",
      features: ["ギフト", "クーポン配信"],
      icon: Gift,
    },
  ],
  featureSection: {
    heading: "EC・D2C事業者に必要な機能、すべて揃っています",
    subtitle: "LINE ID連携からギフトDXまで、アセットベースでLINEをECの再購入エンジンに",
    items: [
      { image: "/images/会員証.png", name: "デジタル会員証（LINE ID連携）", description: "EC会員IDとLINE IDを統合。セグメント配信を解禁", url: "/memberscard" },
      { image: "/images/セグメント配信.png", name: "セグメント配信", description: "購買履歴・閲覧行動に基づく精緻な配信でブロック率低減", url: "/segment" },
      { image: "/images/クーポン.png", name: "クーポン配信", description: "カゴ落ち回収・休眠掘り起こしをLINEで自動化", url: "/coupon" },
      { image: "/images/ギフト.png", name: "ギフト", description: "受取人を即時会員化。住所不要のデジタルギフト", url: "/gift" },
    ],
  },
}
