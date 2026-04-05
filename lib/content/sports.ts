import type { IndustryContent } from "./types"

export const sports: IndustryContent = {
  id: "sports",
  seo: {
    title: "スポーツ・エンタメ向けLINEミニアプリ | グロースパック for LINE",
    description: "チケット発行・入場管理・ファン会員化をLINEで一本化。スポーツ・エンタメのDXを最短1ヶ月で実現。",
    ogTitle: "スポーツ・エンタメ向けLINEミニアプリ | グロースパック for LINE",
    ogDescription: "手作業の抽選、紙の会員証、30分の入場待ちを解消する。",
  },
  hero: {
    h1: "手作業の抽選、紙の会員証、30分の入場待ち。",
    subCopy: "スポーツ・エンタメのDXは、LINEから始まる。チケット・会員証・抽選・スタンプをLINEで一本化し、ファンとの接点を最大化します。",
    visualVariant: "typography",
    displayStats: [
      { value: "1ヶ月", label: "最短導入期間" },
      { value: "5秒", label: "会員登録完了" },
    ],
  },
  problems: [
    {
      title: "入場待ちと運営負荷",
      description: "紙チケットの確認・もぎりに時間がかかり、入場に30分以上。スタッフの手作業が多く、大規模イベントで運営が回らない。",
    },
    {
      title: "抽選・グッズ配布の属人化",
      description: "限定グッズ・シート抽選を手作業で管理。公平性の担保が難しく、当選通知・配布オペレーションに工数がかかる。",
    },
    {
      title: "ファンとの接点が試合・公演当日だけ",
      description: "チケット購入後、次の来場まで接点がない。ファンクラブ会員を増やしたいが、アプリDLのハードルが高く会員化が進まない。",
    },
  ],
  featureHighlights: [
    {
      featureId: "ticket",
      name: "チケット発行",
      industryContext: "LINEでデジタルチケットを発行・管理。QRコードでもぎり不要の入場確認。転売対策・入場スピード向上を同時に実現する。",
    },
    {
      featureId: "lottery",
      name: "抽選",
      industryContext: "限定グッズ・プレミアムシートの抽選をLINEで完結。当選通知・外れ通知の自動配信で、公平かつ低コストな抽選運営を実現する。",
    },
    {
      featureId: "memberscard",
      name: "ファン会員証",
      industryContext: "アプリDL不要でファンクラブ会員化。来場スタンプ・観戦回数に応じた特典付与で、コアファンの育成と来場頻度向上を促進する。",
    },
    {
      featureId: "stampcard",
      name: "スタンプカード",
      industryContext: "来場ごとにスタンプ付与。累計来場数に応じた限定特典・シートアップグレードで、リピーターのロイヤリティを高める。",
    },
  ],
  caseStudies: [],
  cta: {
    headline: "製品資料をダウンロード",
    subtext: "機能詳細・導入事例・料金プランなど、詳しい情報を資料でご確認いただけます",
  },
}
