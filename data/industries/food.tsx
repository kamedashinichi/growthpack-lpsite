import { Users, Clock, Smartphone, Database } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const foodData: IndustryLPData = {
  industryKey: "food",
  label: "飲食チェーン",
  hero: {
    headline: (
      <>
        行列を、
        <br />
        <span className="text-[#06C755]">会員データ</span>に変える。
      </>
    ),
    subheadline: (
      <>
        グロースパック for LINEは、飲食チェーンの「人手不足」と「顧客接点の断絶」を
        <br className="hidden sm:block" />
        LINEだけで解決する<span className="text-[#06C755] font-bold">ハーフスクラッチ型LINEミニアプリ</span>です。
        <br className="hidden sm:block" />
        順番待ち・スタンプ・クーポン・予約、必要な機能を選んで最短1ヶ月で導入。
      </>
    ),
  },
  metrics: [
    { value: "1", unit: "ヶ月", label: "最短導入期間" },
    { value: "5", unit: "秒", label: "会員登録時間" },
  ],
  problem: {
    heading: "飲食チェーンのDX担当者が抱える、4つの課題",
    subtitle: "売上100億円以上の飲食チェーンに共通する「人手不足×顧客接点の断絶」",
    items: [
      {
        icon: Clock,
        title: "行列×人手不足",
        problem: "ランチの行列、誰が並んでいるか分かりますか？",
        detail: "呼び出しをスタッフが肉声で行い、去っても気づかない。並んだ顧客が会員化されないまま帰っていく",
      },
      {
        icon: Users,
        title: "リピート施策の限界",
        problem: "紙スタンプカード、誰が貯めているか分かりますか？",
        detail: "スタンプ数に関わらず全員に同じクーポン。不正利用・スクリーンショット転用の対策が取れない",
      },
      {
        icon: Smartphone,
        title: "テイクアウト・予約の非効率",
        problem: "フードデリバリーへの手数料、30%超を払い続けますか？",
        detail: "電話予約の取り違えリスク。フードデリバリー依存で手数料が常態化。ノーショー対策も取れない",
      },
      {
        icon: Database,
        title: "顧客データの断絶",
        problem: "LINE友だちと会員DBが、つながっていますか？",
        detail: "複数ブランドで会員基盤が分断。CRMデータを集めても分析に使えない状態が続く",
      },
    ],
    bottomMessage: (
      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
        原因はシンプル。
        <br />
        並んだ顧客が<span className="text-[#FB923C]">データ化されないまま</span>帰っていく。
      </p>
    ),
  },
  caseStudies: [],
  comparison: commonComparisonItems,
  comparisonHighlight: {
    title: (
      <>
        行列が、そのまま<span className="text-[#FCD34D]">会員データ</span>になる
      </>
    ),
    description: "アプリDL不要。QRコードをかざした瞬間から会員化が始まります",
  },
  steps: [
    {
      id: 1,
      color: "#3B82F6",
      colorLight: "#EFF6FF",
      title: "行列を会員化のチャンスに変える",
      subtitle: "STEP 1",
      description: "順番待ちしながらLINE友だち登録→会員化を自動化。スタッフの呼び出し業務も削減。",
      features: ["順番待ち", "スタンプカード"],
      icon: Clock,
    },
    {
      id: 2,
      color: "#06C755",
      colorLight: "#E8F8F0",
      title: "「値引き」から「来店動機」へ",
      subtitle: "STEP 2",
      description: "スクラッチ・ガチャ・抽選でゲーム性を付加。もぎり機能でスクリーンショット不正を防止。",
      features: ["クーポン配信", "セグメント配信"],
      icon: Users,
    },
    {
      id: 3,
      color: "#8B5CF6",
      colorLight: "#F5F3FF",
      title: "自社チャネルで顧客データを蓄積する",
      subtitle: "STEP 3",
      description: "テイクアウト予約をLINEで自社回収。フードデリバリー依存から脱却し、顧客データを蓄積。",
      features: ["予約", "デジタル会員証"],
      icon: Database,
    },
  ],
  featureSection: {
    heading: "飲食チェーンに選ばれる、4つのコア機能",
    subtitle: "行列管理からリピーター育成まで、必要な機能を最短1ヶ月で導入",
    items: [
      {
        image: "/images/順番待ち.png",
        name: "順番待ち",
        description: "待ち時間を会員化のチャンスに。LINE通知で自動呼び出し",
        url: "/waiting",
      },
      {
        image: "/images/スタンプカード.png",
        name: "スタンプカード",
        description: "会員IDと紐づいたデジタルスタンプ。誰が何回来たか可視化",
        url: "/stampcard",
      },
      {
        image: "/images/クーポン.png",
        name: "クーポン配信",
        description: "スクラッチ・ガチャ・抽選の3形式。もぎり機能で不正防止",
        url: "/coupon",
      },
      {
        image: "/images/予約.png",
        name: "テイクアウト予約",
        description: "自社チャネルでテイクアウト予約を回収。手数料依存から脱却",
        url: "/reservation",
      },
      {
        image: "/images/会員証.png",
        name: "デジタル会員証",
        description: "複数ブランド統合会員基盤。アプリDL不要で5秒登録",
        url: "/memberscard",
      },
      {
        image: "/images/セグメント配信.png",
        name: "セグメント配信",
        description: "来店回数・金額に応じた優良顧客へのターゲット配信",
        url: "/segment",
      },
    ],
  },
}
