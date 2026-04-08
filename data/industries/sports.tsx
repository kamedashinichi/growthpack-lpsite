import { Ticket, Users, Zap, CreditCard } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const sportsData: IndustryLPData = {
  industryKey: "sports",
  label: "スポーツ・エンタメ",
  hero: {
    headline: (
      <>
        手作業の抽選、紙の会員証、
        <br />
        <span className="text-[#06C755]">30分の入場待ち</span>。
      </>
    ),
    subheadline: (
      <>
        スポーツ・エンタメのDXは、LINEから始まる。
        <br className="hidden sm:block" />
        ファンクラブ先行抽選・デジタル会員証・入場QR管理をLINEに統合。
        <br className="hidden sm:block" />
        スタッフがファン対応に集中できる環境を、<span className="text-[#06C755] font-bold">アセットベース</span>でスピード構築。
      </>
    ),
    heroImage: "/images/sports-hero.png",
  },
  metrics: [
    { value: "1", unit: "ヶ月", label: "最短導入期間" },
    { value: "5", unit: "秒", label: "で会員登録完了" },
  ],
  problem: {
    heading: "スポーツ・エンタメ施設が抱える、5つの課題",
    subtitle: "会員証・チケット・抽選・入場管理——手作業で限界を迎えている現場",
    items: [
      {
        icon: Ticket,
        title: "会員証・チケットのアナログ運用",
        problem: "紙カード・電話窓口がまだ主流になっていませんか？",
        detail: "カード紛失・忘れによる受付対応がスタッフ工数を圧迫。ネイティブアプリのDL率が伸び悩み、デジタル化が進まない",
      },
      {
        icon: Zap,
        title: "高コストなキャンペーン・抽選運用",
        problem: "抽選・キャンペーン運用に毎月多大な工数がかかっていませんか？",
        detail: "ファンクラブ向けチケット先行抽選・スタンプラリーを手作業で運用。応募受付・当落通知・景品発送管理に多大な工数が発生している",
      },
      {
        icon: Users,
        title: "来場頻度の低下とリピーター流出",
        problem: "「払っているが来ない会員」の離脱を手をこまねいて見ていませんか？",
        detail: "来館しなくなった会員への接触手段がメールやDMに限られ、開封率が低く再活性化できていない",
      },
    ],
    bottomMessage: (
      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
        原因はシンプル。
        <br />
        ファンとの接点が<span className="text-[#FB923C]">アナログのまま</span>放置されている。
      </p>
    ),
  },
  caseStudies: [],
  comparison: commonComparisonItems,
  comparisonHighlight: {
    title: (
      <>
        チケット・抽選・会員証を、<span className="text-[#FCD34D]">LINEに統合</span>
      </>
    ),
    description: "アプリDL不要。LINEを「ファンとの接点インフラ」に変えてスタッフ工数を大幅削減",
  },
  steps: [
    {
      id: 1,
      color: "#3B82F6",
      colorLight: "#EFF6FF",
      title: "会員証・入場チケットをLINEに集約する",
      subtitle: "STEP 1",
      description: "紙カードをLINEに集約。来場QRで入館履歴を自動取得し、CRM活用の基盤を構築。",
      features: ["LINE会員証", "チケット発行"],
      icon: CreditCard,
    },
    {
      id: 2,
      color: "#06C755",
      colorLight: "#E8F8F0",
      title: "抽選・キャンペーンをシステム化する",
      subtitle: "STEP 2",
      description: "チケット先行抽選・スタンプラリー連動抽選をシステム化。手作業工数を解消し、スタッフをファン対応に集中させる。",
      features: ["抽選", "スタンプカード"],
      icon: Zap,
    },
    {
      id: 3,
      color: "#8B5CF6",
      colorLight: "#F5F3FF",
      title: "来場頻度を高めてリピーターを育てる",
      subtitle: "STEP 3",
      description: "来場ごとにスタンプ付与。来館しなくなった会員にはセグメント配信で再活性化。ファン体験と運営効率を同時に改善。",
      features: ["スタンプカード", "セグメント配信"],
      icon: Users,
    },
  ],
  featureSection: {
    heading: "スポーツ・エンタメ施設に必要な機能、すべて揃っています",
    subtitle: "チケット管理から会員リテンションまで、アセットベースでスピード導入",
    items: [
      { image: "/images/チケット.png", name: "チケット・パス発行", description: "ファンクラブ先行販売から入場管理までLINEで完結", url: "/ticket" },
      { image: "/images/抽選.png", name: "抽選", description: "公平・透明なデジタル抽選で手作業工数を解消", url: "/lottery" },
      { image: "/images/会員証.png", name: "デジタル会員証", description: "紙カードを廃止し来場データを自動収集", url: "/memberscard" },
      { image: "/images/スタンプカード.png", name: "スタンプカード", description: "来場ごとにスタンプ。リピート来場を自然に促す", url: "/stampcard" },
      { image: "/images/セグメント配信.png", name: "セグメント配信", description: "来場頻度・会員ランク別に最適な内容を配信", url: "/segment" },
    ],
  },
}
