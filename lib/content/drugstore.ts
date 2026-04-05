import type { IndustryContent } from "./types"

export const drugstore: IndustryContent = {
  id: "drugstore",
  seo: {
    title: "ドラッグストア・薬局向けLINEミニアプリ | グロースパック for LINE",
    description: "プラカード廃止・調剤通知・セグメント配信をLINEで一本化。ドラッグストアの顧客接点DXを最短1ヶ月で実現。",
    ogTitle: "ドラッグストア向けLINEミニアプリ | グロースパック for LINE",
    ogDescription: "プラカードをやめる日。来店客全員をLINE会員に。",
  },
  hero: {
    h1: "プラカードを、やめる日。",
    subCopy: "アプリを入れてもらえなくても、LINEは使っている。来店客全員を会員化し、購買属性でセグメント配信する。ドラッグストア・薬局のための顧客接点DXを、最短1ヶ月で。",
    visualVariant: "typography",
    displayStats: [
      { value: "1ヶ月", label: "最短導入期間" },
      { value: "5秒", label: "会員登録完了" },
    ],
  },
  problems: [
    {
      title: "プラカードのコスト",
      description: "発行・管理・再発行コストが毎年かかる。来店時に忘れる顧客が多く、会員メリットが届かない。アプリのDL率も伸び悩んでいる。",
    },
    {
      title: "調剤の待ち時間",
      description: "処方箋受付〜調剤完了まで平均20〜40分。「完成したら声をかけます」が今も続いている。待機中の顧客に何も提供できていない。",
    },
    {
      title: "会員データの断絶",
      description: "ポイントカードはあるが、LINEと紐づいていない。全会員に同じ内容を配信→開封率・クーポン利用率が低迷。購買属性別の精緻な配信ができない。",
    },
  ],
  featureHighlights: [
    {
      featureId: "memberscard",
      name: "デジタル会員証",
      industryContext: "レジQRで5秒会員化。アプリDL不要で来店客全員をLINE会員に。プラスチックカード不要、スマホが会員証になる。",
    },
    {
      featureId: "coupon",
      name: "クーポン配信",
      industryContext: "不正利用ゼロ。ユニークIDで1回限り制御。OTC薬・健康食品・日用品の買い回りを促進。",
    },
    {
      featureId: "segment",
      name: "セグメント配信",
      industryContext: "処方箋利用者・健康食品愛好者・一般購買者別に最適な内容を配信。ブロック率を下げながらリピートを促進する。",
    },
    {
      featureId: "1to1",
      name: "1to1コミュニケーション",
      industryContext: "調剤完了通知など個別対応をLINEで完結。顧客ごとの対応履歴を記録し、次回来店時の接客に活かす。",
    },
  ],
  caseStudies: [],
  cta: {
    headline: "製品資料をダウンロード",
    subtext: "機能詳細・導入事例・料金プランなど、詳しい情報を資料でご確認いただけます",
  },
}
