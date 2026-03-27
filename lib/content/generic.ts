import type { IndustryContent } from "./types"

export const generic: IndustryContent = {
  id: "generic",
  seo: {
    title: "グロースパック for LINE",
    description:
      "通常6ヶ月の開発を3ヶ月で。機能アセットで実現するスピード×柔軟性のLINEミニアプリ開発",
    ogTitle: "グロースパック for LINE",
    ogDescription: "高速かつ柔軟なLINE開発サービス",
  },
  hero: {
    h1: "",
    subCopy: "",
    visualVariant: "phone-mockup",
  },
  problems: [],
  featureHighlights: [],
  caseStudies: [
    {
      company: "PAL様",
      industry: "アパレル・小売業",
      quote:
        "Native appはアプリDLが必要な為、ライトユーザーや操作に不慣れなお客様に導入が進まず、スタッフ/ユーザー双方に課題感があった。LINE Mini appはライトユーザーへのリーチ＆会員化という棲み分けができた",
      metrics: [
        { value: "200", unit: "%", label: "新規会員数増加" },
        { value: "3", unit: "倍", label: "友だち数増加" },
        { value: "5", unit: "倍", label: "EC売上成長" },
      ],
    },
    {
      company: "グッデイ様",
      industry: "ホームセンター",
      quote:
        "以前はチャットボットのSaaSサービスを導入していましたが、問い合わせやカスタマイズにより柔軟に対応するため、フルスクラッチでの開発を検討していました",
      metrics: [
        { value: "1.9", unit: "%", label: "提示率向上" },
        { value: "15", unit: "万人", label: "友だち増加" },
        { value: "11", unit: "万人", label: "会員数増加" },
      ],
    },
  ],
  cta: {
    headline: "まずは資料で詳しく知る",
    subtext:
      "機能詳細・導入事例・料金プランなど、詳しい情報を資料でご確認いただけます",
  },
}
