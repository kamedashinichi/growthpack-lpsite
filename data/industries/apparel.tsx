import { Users, TrendingUp, Zap, MessageSquare, Smartphone, ShoppingBag } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const apparelData: IndustryLPData = {
  industryKey: "apparel",
  label: "アパレル",
  hero: {
    headline: (
      <>
        試着して、気に入って、
        <br />
        <span className="text-[#06C755]">連絡先がわからないまま帰る</span>。
        <br />
        その課題、LINEで解決できます。
      </>
    ),
    subheadline: (
      <>
        店頭で商品を気に入った検討層が退店後に離脱する。
        <br className="hidden sm:block" />
        スタッフがLINEで商品を送るだけで友だち化が完結し、
        <br className="hidden sm:block" />
        退店後も<span className="text-[#06C755] font-bold">パーソナライズされた自動フォロー</span>で購買転換できます。
      </>
    ),
    heroImage: "/images/apparel-hero.png",
  },
  metrics: [
    { value: "3", unit: "倍", label: "会員数増加（PAL様 3COINS）" },
    { value: "5", unit: "秒", label: "で会員登録完了" },
    { value: "約3", unit: "倍", label: "友だち数増加（1ヶ月）" },
  ],
  problem: {
    heading: "アパレル業界のDX担当者が「もったいない」と感じる、4つの機会損失",
    subtitle: "検討層が購買せず退店し、その後の接点が完全に切れている",
    items: [
      {
        icon: ShoppingBag,
        title: "検討層の退店離脱",
        problem: "試着した顧客が「今日は買わない」で帰る",
        detail: "気に入っているのに購入しない検討層は最も購買意欲が高い。退店後の接点がゼロのため、再アプローチできないまま機会損失になる",
      },
      {
        icon: Smartphone,
        title: "アプリ疲れ",
        problem: "DL数が伸び悩み、起動率は10〜20%",
        detail: "スマートフォンの画面はすでに満員。インストールを頼む施策は、もう限界",
      },
      {
        icon: MessageSquare,
        title: "一斉配信の限界",
        problem: "全員に同じメッセージ送信でブロック率が上昇",
        detail: "試着した商品・検討中のサイズに関係なく全会員へ同じ配信。関係ないメッセージほどブロックにつながりやすい",
      },
      {
        icon: TrendingUp,
        title: "データ分断",
        problem: "同じ顧客が「3人」に見える",
        detail: "店舗購買・ECカート・LINE友だちの3つのIDが別管理。パーソナライズできない",
      },
    ],
    bottomMessage: (
      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
        原因はシンプル。
        <br />
        試着した検討層を<span className="text-[#FB923C]">LINEに流入させる動線がない</span>。
      </p>
    ),
  },
  caseStudies: [
    {
      company: "PAL様",
      industry: "アパレル・小売業（約900店舗）",
      scale: "約900店舗・50ブランド",
      timeline: undefined,
      quote: "Native appはアプリDLが必要な為、ライトユーザーや操作に不慣れなお客様に導入が進まず、スタッフ/ユーザー双方に課題感があった。LINE Mini appはライトユーザーへのリーチ＆会員化という棲み分けができた",
      metrics: [
        { value: "約3", unit: "倍", label: "会員数増加（3COINS）" },
        { value: "約3", unit: "倍", label: "友だち数増加（1ヶ月）" },
        { value: "5", unit: "秒", label: "会員登録時間" },
      ],
    },
  ],
  comparison: commonComparisonItems,
  comparisonHighlight: {
    title: (
      <>
        店頭の接客がそのまま<span className="text-[#FCD34D]">LINEの接点</span>になる
      </>
    ),
    description: "アプリDL不要。スタッフが商品をLINEで送るだけで友だち追加と会員化が同時に完結します",
  },
  steps: [
    {
      id: 1,
      color: "#3B82F6",
      colorLight: "#EFF6FF",
      title: "店頭で検討層をLINE友だちにする",
      subtitle: "STEP 1",
      description: "試着・商品検討のタイミングにスタッフがLINEで商品情報を送付。QRコードから5秒で友だち追加と会員登録が同時に完了。アプリDL不要で心理的障壁を排除できます。",
      features: ["LINE会員証", "クーポン配信"],
      icon: Users,
    },
    {
      id: 2,
      color: "#06C755",
      colorLight: "#E8F8F0",
      title: "退店後に自動フォローで購買転換する",
      subtitle: "STEP 2",
      description: "商品シェアのデータを起点に、検討期間に合わせたシナリオ配信を自動実行。「3日後に在庫確認」「再入荷時に即時通知」など、検討状況に応じたメッセージで再来店を後押しします。",
      features: ["セグメント配信", "動的リッチメニュー"],
      icon: Zap,
    },
    {
      id: 3,
      color: "#8B5CF6",
      colorLight: "#F5F3FF",
      title: "接客品質を継続的に高めてリピート化する",
      subtitle: "STEP 3",
      description: "購買・試着・接客の履歴を統合し、次回来店時の接客精度を向上。担当スタッフが替わっても対話履歴が引き継がれ、顧客との関係が店舗の資産として蓄積されます。",
      features: ["1to1コミュニケーション", "ギフト"],
      icon: TrendingUp,
    },
  ],
  featureSection: {
    heading: "アパレルに必要な機能、すべて揃っています",
    subtitle: "店頭接点から自動フォローまで、一貫した顧客体験をスピード構築",
    items: [
      { image: "/images/会員証.png", name: "LINE会員証", description: "試着・商品検討のタイミングに5秒で友だち追加と会員化が完結。アプリDL不要", url: "/memberscard" },
      { image: "/images/クーポン.png", name: "クーポン配信", description: "購買履歴に基づくセグメント別配信。紙クーポン不要", url: "/coupon" },
      { image: "/images/セグメント配信.png", name: "セグメント配信", description: "試着データ起点のシナリオ配信。再入荷通知・在庫確認を最適タイミングで自動送信", url: "/segment" },
      { image: "/images/スタンプカード.png", name: "スタンプカード", description: "来店・購買でスタンプ付与。来店頻度の向上に直結", url: "/stampcard" },
      { image: "/images/1to1.png", name: "1to1コミュニケーション", description: "担当交代しても対話履歴を引き継ぎ。属人化を解消し店舗の接客資産として蓄積", url: "/1to1" },
      { image: "/images/ギフト.png", name: "ギフト", description: "友人紹介プログラムでブランドファンを拡大", url: "/gift" },
    ],
    stepColorMap: {
      "LINE会員証": { step: 1, color: "#3B82F6", label: "STEP1" },
      "クーポン配信": { step: 1, color: "#3B82F6", label: "STEP1" },
      "セグメント配信": { step: 2, color: "#06C755", label: "STEP2" },
      "動的リッチメニュー": { step: 2, color: "#06C755", label: "STEP2" },
      "1to1コミュニケーション": { step: 3, color: "#8B5CF6", label: "STEP3" },
      "ギフト": { step: 3, color: "#8B5CF6", label: "STEP3" },
    },
  },
}
