import type { IndustryContent } from "./types"

export const supermarket: IndustryContent = {
  id: "supermarket",
  seo: {
    title: "スーパー・ホームセンター向けLINEミニアプリ | グロースパック for LINE",
    description: "会員カードをスマホに変える。チラシコスト削減・会員提示率向上をLINEで実現。最短1ヶ月で導入。",
    ogTitle: "スーパー・HC向けLINEミニアプリ | グロースパック for LINE",
    ogDescription: "会員カードを、スマホに変える。",
  },
  hero: {
    h1: "会員カードを、スマホに変える。",
    subCopy: "チラシコストの増大、会員カード提示率の低迷、シニアのデジタル離れ。スーパー・ホームセンターの顧客接点課題をLINEミニアプリで解決します。",
    visualVariant: "typography",
    displayStats: [
      { value: "1ヶ月", label: "最短導入期間" },
      { value: "5秒", label: "会員登録完了" },
    ],
  },
  problems: [
    {
      title: "チラシコストの増大",
      description: "毎週の折込チラシに年間数千万円。配布エリア外には届かず、効果測定もできない。デジタル移行を進めたいが、シニア層への対応が課題。",
    },
    {
      title: "会員カード提示率の低迷",
      description: "カードを持ち歩かない・忘れる顧客が多く、会員特典が届かない。ポイント未付与の来店データが蓄積されず、顧客行動の全体像が見えない。",
    },
    {
      title: "来店頻度の低下",
      description: "競合店舗の増加で来店頻度が低下。スタンプ・クーポン施策を打ちたいが、紙運用では管理コストがかかりすぎる。",
    },
  ],
  featureHighlights: [
    {
      featureId: "memberscard",
      name: "デジタル会員証",
      industryContext: "レジQRで5秒会員化。シニアでも使いやすいLINEで、来店客全員をデジタル会員に。カード持参忘れによる未付与をゼロにする。",
      proof: "グッデイ：会員証提示率5倍以上（月間）",
    },
    {
      featureId: "stampcard",
      name: "スタンプカード",
      industryContext: "来店・購買でスタンプ付与。紛失・不正利用のない完全デジタル管理。来店頻度向上と週次来店習慣の形成に直結する。",
    },
    {
      featureId: "coupon",
      name: "クーポン配信",
      industryContext: "チラシの代替として、LINEでターゲット配信。来店頻度・購買カテゴリに応じたセグメント配信で、配信コストを抑えながら効果を最大化する。",
    },
    {
      featureId: "segment",
      name: "セグメント配信",
      industryContext: "週1来店層・月1来店層・休眠層に分けて最適な内容を配信。一律のチラシ配布から卒業し、顧客ごとに来店動機を設計する。",
    },
  ],
  caseStudies: [
    {
      company: "グッデイ",
      industry: "ホームセンター",
      quote: "以前はチャットボットのSaaSサービスを導入していましたが、問い合わせやカスタマイズにより柔軟に対応するため、フルスクラッチでの開発を検討していました",
      metrics: [
        { value: "5", unit: "倍", label: "会員証提示率（月間）" },
        { value: "15", unit: "万人", label: "友だち増加" },
        { value: "11", unit: "万人", label: "会員数増加" },
      ],
    },
  ],
  cta: {
    headline: "製品資料をダウンロード",
    subtext: "機能詳細・導入事例・料金プランなど、詳しい情報を資料でご確認いただけます",
  },
}
