import type { IndustryContent } from "./types"

export const ec: IndustryContent = {
  id: "ec",
  seo: {
    title: "EC・通販向けLINEミニアプリ | グロースパック for LINE",
    description: "カゴ落ちを自動回収。LINE ID連携でEC会員とLINE友だちを統合。リピート購入を最大化するLINEミニアプリ。",
    ogTitle: "EC向けLINEミニアプリ | グロースパック for LINE",
    ogDescription: "カゴ落ちを、自動回収する。",
  },
  hero: {
    h1: "カゴ落ちを、自動回収する。",
    subCopy: "LINE友だちとEC会員の分断、カゴ落ちフォローの欠如、一斉配信によるブロック率増加。ECのリピート課題をLINEミニアプリで解決します。",
    visualVariant: "typography",
    displayStats: [
      { value: "1ヶ月", label: "最短導入期間" },
      { value: "5秒", label: "会員登録完了" },
    ],
  },
  problems: [
    {
      title: "LINE友だちとEC会員の分断",
      description: "LINE公式アカウントの友だちとECサイトの会員が別管理。同一顧客でも購買履歴が紐づかず、パーソナライズ配信ができない。",
    },
    {
      title: "カゴ落ちフォローの欠如",
      description: "商品をカートに入れたまま離脱した顧客へのフォローができない。リターゲティング広告だけでは取り戻しきれず、機会損失が続く。",
    },
    {
      title: "一斉配信によるブロック率増加",
      description: "全員に同じメッセージを配信することでブロック率が上昇。配信リストが減り続け、メルマガ・LINE配信の到達率が低下している。",
    },
  ],
  featureHighlights: [
    {
      featureId: "memberscard",
      name: "LINE ID連携会員証",
      industryContext: "EC会員登録とLINE友だち追加を同時に完了。購買履歴・閲覧履歴とLINE IDを統合し、行動に基づいたパーソナライズ配信を実現する。",
    },
    {
      featureId: "coupon",
      name: "クーポン配信",
      industryContext: "カゴ落ち顧客・休眠顧客・高LTV顧客に絞ったクーポン配信。一斉配信をやめることでブロック率を下げながら、ROIを最大化する。",
    },
    {
      featureId: "segment",
      name: "セグメント配信",
      industryContext: "購買回数・購入カテゴリ・最終購入日でセグメントを切り、最適なタイミングで最適なメッセージを届ける。LTVの高い顧客を優先的に育成する。",
    },
    {
      featureId: "gift",
      name: "ギフト（友人紹介）",
      industryContext: "既存顧客がLINEで友人にギフトを贈ると、受け取った友人も会員登録。広告費をかけずに新規顧客を獲得する友人紹介の仕組みを構築する。",
    },
  ],
  caseStudies: [],
  cta: {
    headline: "製品資料をダウンロード",
    subtext: "機能詳細・導入事例・料金プランなど、詳しい情報を資料でご確認いただけます",
  },
}
