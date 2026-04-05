import type { IndustryContent } from "./types"

export const food: IndustryContent = {
  id: "food",
  seo: {
    title: "飲食チェーン向けLINEミニアプリ | グロースパック for LINE",
    description: "行列・スタンプ・テイクアウト予約をLINEで一本化。飲食チェーンの顧客接点DXを最短1ヶ月で実現。",
    ogTitle: "飲食チェーン向けLINEミニアプリ | グロースパック for LINE",
    ogDescription: "行列を会員データに変える。顧客接点DXを最短1ヶ月で。",
  },
  hero: {
    h1: "行列を、会員データに変える。",
    subCopy: "グロースパック for LINEは、飲食チェーンの「人手不足」と「顧客接点の断絶」をLINEだけで解決します。順番待ち・スタンプ・クーポン・予約、必要な機能を選んで最短1ヶ月で導入。",
    visualVariant: "typography",
    displayStats: [
      { value: "1ヶ月", label: "最短導入期間" },
      { value: "5秒", label: "会員登録完了" },
    ],
  },
  problems: [
    {
      title: "行列×人手不足",
      description: "呼び出しをスタッフが肉声で行い、去っても気づかない。並んだ顧客が会員化されないまま帰っていく。",
    },
    {
      title: "リピート施策の限界",
      description: "紙スタンプカードは誰が貯めているか不明。スタンプ数に関わらず全員に同じクーポン。不正利用・スクリーンショット転用の対策が取れない。",
    },
    {
      title: "テイクアウト・予約の非効率",
      description: "フードデリバリー依存で手数料が常態化。電話予約の取り違えリスク。ノーショー対策も取れない。",
    },
    {
      title: "顧客データの断絶",
      description: "複数ブランドで会員基盤が分断。LINE友だちと会員DBが紐づいていない。CRMデータを集めても分析に使えない状態が続く。",
    },
  ],
  featureHighlights: [
    {
      featureId: "waiting",
      name: "順番待ち",
      industryContext: "待ち時間を会員化のチャンスに。LINEで整理券発行→完了通知まで自動化。スタッフの呼び出し業務を削減しながら、来店客全員を会員化する。",
    },
    {
      featureId: "stampcard",
      name: "スタンプカード",
      industryContext: "会員IDと紐づいたデジタルスタンプ。誰が何回来たか可視化。不正利用ゼロで、リピーター育成施策の精度が上がる。",
    },
    {
      featureId: "coupon",
      name: "クーポン配信",
      industryContext: "スクラッチ・ガチャ・抽選の3形式。もぎり機能でスクリーンショット不正を防止。来店頻度・金額に応じたセグメント配信で効果を最大化。",
    },
    {
      featureId: "reservation",
      name: "テイクアウト予約",
      industryContext: "自社チャネルでテイクアウト予約を回収。フードデリバリー依存から脱却し、手数料コストを削減しながら顧客データを自社で蓄積する。",
    },
  ],
  caseStudies: [],
  cta: {
    headline: "製品資料をダウンロード",
    subtext: "機能詳細・導入事例・料金プランなど、詳しい情報を資料でご確認いただけます",
  },
}
