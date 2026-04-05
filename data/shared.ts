import { ShieldCheck, Cloud, Award, Headphones, FileText, Rocket, CheckCircle2 } from "lucide-react"
import type { SecurityItem, FlowStep } from "./types"

export const CTA_DOWNLOAD = "https://classmethod.jp/download/line-mini-app/"
export const CTA_CONTACT = "https://classmethod.jp/services/line/line-apps/#iframe-form"

export const securityItems: SecurityItem[] = [
  { icon: ShieldCheck, title: "LINE公認テクノロジーパートナー", description: "LINE社から技術力を認定されたパートナー企業として、高品質な開発を提供" },
  { icon: Cloud, title: "AWS上のセキュアな基盤", description: "AWS Premierパートナーとして、堅牢なインフラ環境で運用" },
  { icon: Award, title: "200社以上の導入実績", description: "小売・飲食・サービス業を中心に、幅広い業種での実績" },
]

export const flowSteps: FlowStep[] = [
  { icon: Headphones, step: "01", title: "ヒアリング", period: "2週間", desc: "課題・要件の整理と最適な機能の選定" },
  { icon: FileText, step: "02", title: "設計・開発", period: "2ヶ月", desc: "機能アセットをベースにスピード開発" },
  { icon: Rocket, step: "03", title: "テスト・リリース", period: "2週間", desc: "動作検証と本番環境への展開" },
  { icon: CheckCircle2, step: "04", title: "運用サポート", period: "継続", desc: "データ分析と改善提案を伴走支援" },
]

export const commonComparisonItems = [
  { label: "友だち追加", official: true as const, saas: false as const, mini: true },
  { label: "会員登録（同時）", official: false as const, saas: "partial" as const, mini: true, highlight: true },
  { label: "属性情報の取得", official: false as const, saas: "partial" as const, mini: true },
  { label: "購買データ連携", official: false as const, saas: false as const, mini: true },
  { label: "セグメント配信", official: "partial" as const, saas: "partial" as const, mini: true },
]
