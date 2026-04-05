import type { IndustryContent } from "./types"

export const department: IndustryContent = {
  id: "department",
  seo: {
    title: "百貨店・商業施設向けLINEミニアプリ | グロースパック for LINE",
    description: "外商顧客の離反防止・催事管理・館内データ統合をLINEで実現。百貨店の顧客DXを最短3ヶ月で。",
    ogTitle: "百貨店向けLINEミニアプリ | グロースパック for LINE",
    ogDescription: "担当者が変わっても、外商顧客は離れない。",
  },
  hero: {
    h1: "担当者が変わっても、外商顧客は離れない。",
    subCopy: "外商顧客の離反・催事管理の非効率・売場をまたいだデータ分断。百貨店固有の顧客接点課題をLINEミニアプリで解決します。",
    visualVariant: "typography",
    displayStats: [
      { value: "3ヶ月", label: "最短導入期間" },
      { value: "5秒", label: "会員登録完了" },
    ],
  },
  problems: [
    {
      title: "外商顧客の離反リスク",
      description: "担当者の異動・退職で外商顧客との関係がリセットされる。顧客の嗜好・購買履歴が個人管理のため、組織として引き継げない。",
    },
    {
      title: "催事管理の非効率",
      description: "催事ごとの来場管理・チケット発行が紙とExcelで属人的に運用。当日の入場混雑・無断キャンセルへの対応が取れない。",
    },
    {
      title: "売場をまたいだデータ分断",
      description: "食品・ファッション・レストランで顧客IDが別管理。館内回遊データが取得できず、テナント横断の施策が打てない。",
    },
  ],
  featureHighlights: [
    {
      featureId: "1to1",
      name: "1to1コミュニケーション",
      industryContext: "外商担当の接客履歴・顧客嗜好を組織で共有。担当交代後も途切れない関係を維持し、VIP顧客の離反を防ぐ。",
    },
    {
      featureId: "ticket",
      name: "チケット発行",
      industryContext: "催事・展覧会の入場チケットをLINEで発行・管理。来場予約・入場確認・キャンセル対応をデジタルで完結。",
    },
    {
      featureId: "memberscard",
      name: "デジタル会員証",
      industryContext: "館内全テナント共通の会員証で来館客を統合管理。売場をまたいだ購買データを一元化し、精緻なセグメント施策を実現する。",
    },
    {
      featureId: "segment",
      name: "セグメント配信",
      industryContext: "VIP・一般・催事来場者など属性別に最適なコンテンツを配信。一斉配信から脱却し、ブロック率を抑えながらエンゲージメントを高める。",
    },
  ],
  caseStudies: [],
  cta: {
    headline: "製品資料をダウンロード",
    subtext: "機能詳細・導入事例・料金プランなど、詳しい情報を資料でご確認いただけます",
  },
}
