import { Users, Ticket, TrendingUp, Gift } from "lucide-react"
import type { IndustryLPData } from "@/data/types"
import { commonComparisonItems } from "@/data/shared"

export const departmentData: IndustryLPData = {
  industryKey: "department",
  label: "百貨店・商業施設",
  hero: {
    headline: (
      <>
        担当者が変わっても、
        <br />
        <span className="text-[#06C755]">外商顧客</span>は離れない。
      </>
    ),
    subheadline: (
      <>
        外商顧客の離反・催事管理の非効率・売場をまたいだデータ分断。
        <br className="hidden sm:block" />
        百貨店・商業施設が抱える「デジタル化の死角」に、
        <br className="hidden sm:block" />
        <span className="text-[#06C755] font-bold">グロースパック for LINE</span> は答えを持っています。
      </>
    ),
    heroImage: "/images/department-hero.png",
  },
  metrics: [
    { value: "1", unit: "ヶ月", label: "最短導入期間" },
    { value: "5", unit: "秒", label: "で会員登録完了" },
  ],
  problem: {
    heading: "百貨店・商業施設のDX担当者が抱える、3つの課題",
    subtitle: "外商属人化・催事管理・データ分断——百貨店固有の構造課題",
    items: [
      {
        icon: Users,
        title: "外商属人化",
        problem: "担当者が異動すると顧客が消える",
        detail: "年購買100万円超の外商顧客の関係は担当者の「頭の中」に入っている。デジタルで補完する手段がない",
      },
      {
        icon: Ticket,
        title: "催事管理のアナログ残存",
        problem: "招待状は紙。返信は電話。参加者は手書き台帳。",
        detail: "年30〜50回の催事を非効率に回している。先行案内した顧客が「誰で、反応がどうだったか」残らない",
      },
      {
        icon: TrendingUp,
        title: "来店頻度低下",
        problem: "一斉DMしか打てない",
        detail: "来店頻度が落ちている。でも打てる施策は「全会員に同じDM」だけ。費用は増えるのに効果は薄れていく",
      },
    ],
    bottomMessage: (
      <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
        原因はシンプル。
        <br />
        外商顧客の関係が<span className="text-[#FB923C]">担当者に依存したまま</span>。
      </p>
    ),
  },
  caseStudies: [],
  comparison: commonComparisonItems,
  comparisonHighlight: {
    title: (
      <>
        外商顧客から一般会員まで、<span className="text-[#FCD34D]">二層設計で管理</span>
      </>
    ),
    description: "SaaSでは「できない」要件も、ハーフスクラッチなら百貨店固有の業務設計に対応できます",
  },
  steps: [
    {
      id: 1,
      color: "#3B82F6",
      colorLight: "#EFF6FF",
      title: "一般顧客の会員接点をデジタル化する",
      subtitle: "STEP 1",
      description: "QRをかざすだけで提示完了。売場横断の単一IDで顧客の全購買履歴を統合。",
      features: ["LINE会員証", "クーポン配信"],
      icon: Users,
    },
    {
      id: 2,
      color: "#06C755",
      colorLight: "#E8F8F0",
      title: "催事・イベントをデジタルで管理する",
      subtitle: "STEP 2",
      description: "催事招待状・入場チケット・先行販売をLINEで発行。誰に案内し誰が来場したか、データとして残る。",
      features: ["チケット発行", "抽選"],
      icon: Ticket,
    },
    {
      id: 3,
      color: "#8B5CF6",
      colorLight: "#F5F3FF",
      title: "外商顧客の関係をデジタルで補完する",
      subtitle: "STEP 3",
      description: "外商担当者から顧客へLINEで直接コミュニケーション。担当変更時も顧客との関係履歴が引き継がれる。",
      features: ["1to1コミュニケーション", "セグメント配信"],
      icon: Gift,
    },
  ],
  featureSection: {
    heading: "百貨店・商業施設に必要な機能、すべて揃っています",
    subtitle: "外商顧客から一般顧客まで、アセットベースで顧客接点をスピード変革",
    items: [
      { image: "/images/会員証.png", name: "デジタル会員証", description: "売場横断の単一IDで全購買履歴を統合", url: "/memberscard" },
      { image: "/images/チケット.png", name: "チケット・パス発行", description: "催事招待・入場管理をLINEで完結", url: "/ticket" },
      { image: "/images/1to1.png", name: "1to1コミュニケーション", description: "外商担当者から顧客への直接メッセージ", url: "/1to1" },
      { image: "/images/セグメント配信.png", name: "セグメント配信", description: "外商/一般の二層でVIP配信から休眠掘り起こしまで", url: "/segment" },
      { image: "/images/ギフト.png", name: "ギフト", description: "歳暮・中元・慶弔ギフトをLINEで完結", url: "/gift" },
      { image: "/images/抽選.png", name: "抽選", description: "限定品・催事先行枠を公平なデジタル抽選で", url: "/lottery" },
    ],
  },
}
