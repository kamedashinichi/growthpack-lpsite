/**
 * /reservation — グロースパック for LINE 予約機能ページ
 *
 * docs/DESIGN-FEATURE-PAGE.md に厳密に従う。
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'LINE予約｜飲食・サロン・施設の予約をLINE上で完結｜グロースパック for LINE',
  description: '電話予約の負担、予約忘れによるノーショウ、外部予約サービスへの手数料。飲食・サロン・施設の予約課題をLINEミニアプリで解消。リマインド自動化と事業会社向けハーフスクラッチ開発で最短3ヶ月。グロースパック for LINE。',
  keywords: ['LINE 予約', '予約システム', 'リマインド', 'LINEミニアプリ', '飲食予約', 'サロン予約'],
  alternates: {
    canonical: '/reservation',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/reservation',
    title: 'LINE予約｜飲食・サロン・施設の予約をLINE上で完結｜グロースパック for LINE',
    description: '電話予約の負担、予約忘れによるノーショウ、外部予約サービスへの手数料。飲食・サロン・施設の予約課題をLINEミニアプリで解消。リマインド自動化で最短3ヶ月。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'LINE予約｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINE予約｜飲食・サロン・施設の予約をLINE上で完結｜グロースパック for LINE',
    description: '電話予約の負担、予約忘れによるノーショウ、外部予約サービスへの手数料。飲食・サロン・施設の予約課題をLINEミニアプリで解消。リマインド自動化で最短3ヶ月。',
    images: ['/images/ogp-v2.jpg'],
  },
}

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Award,
  CalendarCheck,
  Bell,
  RefreshCw,
  Calendar,
  UserPlus,
  Users,
  Radio,
  BarChart3,
  CreditCard,
  Clock,
  Tag,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { Section } from '@/components/shared/ui/section';
import { Card } from '@/components/shared/ui/card';
import { FeatureScrollTracker } from '@/components/shared/feature-page/scroll-tracker';
import { TrackedExternalLink } from '@/components/shared/feature-page/tracking';
import { PriceSection } from '@/components/shared/feature-page/price-section';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const FEATURE_GROUPS = [
  {
    label: '予約受付・管理',
    subtitle: '電話・紙に頼らず、LINEで24時間予約を受け付ける',
    cards: [
      {
        icon: CalendarCheck,
        name: 'LINEからの予約受付',
        challenge: '電話が繋がらない・営業時間外に予約が取れないという理由で、他の店に流れているお客様がいる',
        solution: 'LINEリッチメニューから日時・メニュー・人数を選択して予約完結。24時間受付が自動で動く。',
        demo_url: 'https://growthpack-reservation-demo.vercel.app/demo/reserve',
      },
      {
        icon: Calendar,
        name: 'カレンダー連携・空き枠表示',
        challenge: '空き枠が電話でしか確認できず、お客様が予約をためらっている',
        solution: 'リアルタイムの空き枠をLINE上に表示。「空いていれば予約する」お客様を逃さない。',
      },
      {
        icon: RefreshCw,
        name: '予約変更・キャンセルのセルフ対応',
        challenge: '「変更したい」「キャンセルしたい」という電話が毎日かかってきてスタッフが対応に追われる',
        solution: 'お客様がLINEから自分で変更・キャンセル。スタッフへの電話問い合わせを大幅に削減。',
      },
    ],
  },
  {
    label: 'リマインドと自動配信',
    subtitle: '予約した人を確実に来店につなげる自動フォロー',
    cards: [
      {
        icon: Bell,
        name: '予約確認・リマインドの自動配信',
        challenge: '前日確認の電話をスタッフが全件かけているが、繋がらないことも多く工数がかかりすぎる',
        solution: '予約確認・前日リマインドを自動配信。スタッフの確認電話が不要になり、NoShow率が下がる。',
      },
      {
        icon: Radio,
        name: '時期ベースのリマインド',
        challenge: '車検・定期点検の時期になっても、通知を出す仕組みがなく他社に流出している',
        solution: '前回利用からの経過日数に応じて「そろそろ点検の時期では？」と自動配信。来店サイクルを維持。',
      },
    ],
  },
  {
    label: 'データ活用・他機能連携',
    subtitle: '予約データを顧客理解と施策改善に活かす',
    cards: [
      {
        icon: UserPlus,
        name: '予約→会員ID取得',
        challenge: '来店データは残っているが、同一顧客の過去の予約履歴と紐付けられていない',
        solution: '予約と同時にLINE友だち追加で会員ID取得。全予約履歴が顧客プロフィールに自動蓄積。',
      },
      {
        icon: Users,
        name: '予約客と飛び込み客の統合管理',
        description: '予約機能と順番待ち機能を連携。予約客と飛び込み客を1つの画面で統合管理し、当日オペレーションを一元化。',
        challenge: '予約台帳と当日飛び込み客の管理が分断していて、順番の公平性が保てない',
        solution: '予約機能と順番待ち機能を連携。予約客と飛び込み客を1つの画面で統合管理できる。',
      },
      {
        icon: BarChart3,
        name: '予約履歴・来店パターン分析',
        challenge: '「よく予約するメニュー」「来店サイクル」がデータとして蓄積されておらず、次の提案に活かせない',
        solution: '予約回数・利用メニュー・来店周期を自動蓄積。パーソナライズ配信とリマインドに活用。',
      },
    ],
  },
];

const COMBINATIONS = [
  {
    icon: CreditCard,
    name: '予約 × 会員証',
    description: '予約と同時に会員ID取得。予約履歴・来店履歴が会員プロフィールに蓄積され、次回予約タイミングを予測して自動リマインドを送るサイクルが動き始めます。',
    href: '/memberscard',
  },
  {
    icon: Clock,
    name: '予約 × 順番待ち',
    description: '予約なしの飛び込み客にLINE整理券を発行し、予約客と同じ画面で統合管理。「電話予約の人だけ優先されている」という現場の不公平感をなくします。',
    href: '/queue',
  },
  {
    icon: Tag,
    name: '予約 × クーポン',
    description: '予約完了時・来店後に次回予約クーポンを自動配布。「また来ようかな」のタイミングに来店動機のひと押しを自動で届けます。',
    href: '/coupon',
  },
  {
    icon: MessageCircle,
    name: '予約 × 1to1コミュニケーション',
    description: '「〇〇日に席はありますか？」というチャット相談から、そのままLINE上の予約画面に誘導。問い合わせから予約完了まで、LINE上で完結します。',
    href: '/1to1',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    title: 'ヒアリング・要件整理',
    description: '現在の予約受付方法・メニュー構成・飛び込み客との統合要否・時期ベースのリマインド必要性をお聞きします。',
  },
  {
    step: 'Step 2',
    title: '予約受付・カレンダーの構築',
    description: '予約受付ロジック・空き枠表示・変更キャンセル機能・会員ID取得を実装します。',
  },
  {
    step: 'Step 3',
    title: 'リマインド配信の設定',
    description: '予約確認・前日リマインド・時期ベースの自動配信パイプラインを設定します。',
  },
  {
    step: 'Step 4',
    title: '順番待ち連携・運用開始',
    description: '飛び込み客との統合管理を設定し、運用を開始。予約データが蓄積されていきます。',
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '予約機能',
  name: 'グロースパック for LINE（予約）',
  description: 'LINEで予約受付・リマインド・来店管理・事後配信を一気通貫で実現。24時間受付と自動リマインドで取りこぼしをなくします。',
  provider: { '@type': 'Organization', name: 'クラスメソッド株式会社', url: 'https://classmethod.jp' },
  areaServed: { '@type': 'Country', name: 'Japan' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'グロースパック for LINE', item: 'https://lp.growthpackforline.classmethod.net/' },
    { '@type': 'ListItem', position: 2, name: '予約', item: 'https://lp.growthpackforline.classmethod.net/reservation' },
  ],
};

const FAQS = [
  {
    q: 'LINEで予約できる業種はどこですか？',
    a: '飲食店、美容サロン・エステ、医療・歯科クリニック、フィットネスジム、スポーツ施設、ホテル・宿泊施設など、予約受付が発生する業種全般に対応しています。業種ごとの予約フローや項目の差異も、ヒアリングを踏まえて設計します。',
  },
  {
    q: '既存の予約システムや基幹システムと連携できますか？',
    a: '可能です。既存の予約管理システムやPOS・基幹システムとのAPI連携に対応しています。連携先の仕様確認が必要なため、初回ヒアリングで現状をお聞きし、連携方法をご提案します。',
  },
  {
    q: '開発期間と費用の目安は？',
    a: '予約受付・リマインド・会員ID取得の基本構成であれば最短3ヶ月が目安です。費用は連携先システムの数や予約項目の複雑さによって変わるため、初回ヒアリング後に概算をお出しします。',
  },
  {
    q: 'SaaSの予約ツールとの違いは何ですか？',
    a: 'グロースパック for LINEはハーフスクラッチ型のため、既存システムとの深い連携、業種固有の予約フロー設計、時期ベースのリマインド設定など、パッケージでは対応しにくいカスタマイズが可能です。予約データを会員証・スタンプ・クーポンと連携して活用する点も特徴です。',
  },
  {
    q: '実際にLINE予約を導入した業種の事例はありますか？',
    a: '飲食・サロン・施設など複数業種で導入実績があります。具体的な事例の詳細はお問い合わせいただいた後のヒアリングでご紹介しています。業種ごとの課題やフローに合わせた構成をご提案します。',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'LINE予約の導入ステップ',
  description: '3ステップで段階的に導入できます',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      name: '要件ヒアリング・見積',
      text: '予約受付方法・メニュー構成・既存システム連携の要否を確認し、概算費用と工期を提示します。',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: '設計・実装',
      text: '予約受付・カレンダー連携・リマインド自動配信・会員ID取得を設計・実装します。',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'テスト・本番リリース',
      text: '受入テスト・LINEヤフー審査・本番リリースまで伴走します。',
      position: 3,
    },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LINE予約｜飲食・サロン・施設の予約をLINE上で完結｜グロースパック for LINE',
  description: '電話予約の負担、予約忘れによるノーショウ、外部予約サービスへの手数料。飲食・サロン・施設の予約課題をLINEミニアプリで解消。リマインド自動化で最短3ヶ月。',
  author: { '@type': 'Organization', name: 'クラスメソッド株式会社', url: 'https://classmethod.jp/' },
  publisher: {
    '@type': 'Organization',
    name: 'クラスメソッド株式会社',
    logo: { '@type': 'ImageObject', url: 'https://lp.growthpackforline.classmethod.net/images/cm-logo.png' },
  },
  datePublished: '2026-04-30',
  dateModified: '2026-05-01',
  image: 'https://lp.growthpackforline.classmethod.net/images/ogp-v2.jpg',
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function ReservationPage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <FeatureScrollTracker page="reservation" />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <Image
              src="/logo_classmethod_black.png"
              alt="クラスメソッド"
              width={120}
              height={38}
              className="hidden md:block h-[34px] w-auto object-contain"
              priority
            />
            <Image
              src="/logo_classmethod_mobile.png"
              alt="クラスメソッド"
              width={32}
              height={32}
              className="md:hidden h-7 w-7 object-contain"
              priority
            />
            <div className="flex items-center gap-1">
              <span className="text-base md:text-lg font-bold text-[#1F2937]">グロースパック</span>
              <span className="text-sm md:text-base text-[#6B7280]"> for </span>
              <span className="text-base md:text-lg font-bold text-[#06C755]">LINE</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#1F2937]">
            <a href="#features" className="hover:text-[#05A847] transition-colors">できること</a>
            <a href="#combinations" className="hover:text-[#05A847] transition-colors">組み合わせ</a>
            <a href="#steps" className="hover:text-[#05A847] transition-colors">導入ステップ</a>
          </nav>
          <Button variant="primary" size="sm" asChild>
            <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="reservation_header" destination="contact">お問い合わせ</TrackedExternalLink>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative min-h-[480px] md:min-h-[560px] flex items-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 100%, rgba(6,199,85,0.22), transparent 70%), linear-gradient(135deg, #0a0a0a 0%, #1a1d21 60%, #0a0a0a 100%)' }} />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 max-w-[600px] space-y-6 md:space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#06C755]/20 border border-[#06C755]/50 rounded-full text-xs sm:text-sm font-semibold text-[#06C755]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06C755] shrink-0" />
                予約機能
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white">
                電話と紙をやめたら、<br />
                予約が<span className="text-[#06C755]">顧客データ蓄積</span>の<br className="hidden sm:block" />
                起点になる。
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">LINEで予約受付・リマインド・来店管理・事後配信を一気通貫で実現。24時間受付と自動リマインドで、取りこぼしと確認電話の工数をなくします。</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button variant="primary" size="lg" asChild>
                  <TrackedExternalLink
                    href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                    location="hero"
                    destination="contact"
                  >
                    無料で相談する
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </TrackedExternalLink>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-white/60 text-white hover:bg-white/10 hover:border-white"
                >
                  <TrackedExternalLink
                    href="https://growthpack-reservation-demo.vercel.app/demo/reserve"
                    location="hero"
                    destination="demo"
                  >
                    デモを試す</TrackedExternalLink>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['24時間受付', '自動リマインド', '取りこぼしゼロ'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#06C755]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
              <Image
                src="/images/reservation.png"
                alt="予約機能のデモ画面"
                width={300}
                height={600}
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* 信頼バッジ帯 */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-6">
          {/* 信頼帯 上段: LINEヤフー パートナー認定 */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <Image
                src="/badge_ly_tech_partner_communication.png"
                alt="LINEヤフー 2026年度 Technology Partner Communication部門"
                width={437}
                height={382}
                className="h-16 sm:h-20 w-auto object-contain shrink-0"
              />
              <div className="text-left">
                <div className="text-xs text-[#6B7280]">LINEヤフー</div>
                <div className="text-sm font-semibold text-[#1F2937] leading-snug">
                  2026年度 Technology Partner
                  <br />
                  Communication部門
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/badge_ly_tech_partner_miniapp.png"
                alt="LINEヤフー 2026年度 Technology Partner LINEミニアプリ部門"
                width={150}
                height={131}
                className="h-16 sm:h-20 w-auto object-contain shrink-0"
              />
              <div className="text-left">
                <div className="text-xs text-[#6B7280]">LINEヤフー</div>
                <div className="text-sm font-semibold text-[#1F2937] leading-snug">
                  2026年度 Technology Partner
                  <br />
                  LINEミニアプリ部門
                </div>
              </div>
            </div>
          </div>
          {/* 信頼帯 下段: その他の認定・実績 */}
          <div className="mt-5 pt-5 border-t border-[#E5E7EB] flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: Award, label: 'AWS Premier Tier Services Partner', color: '#FF9900' },
              { icon: ShieldCheck, label: 'ISO 27001 取得（クラスメソッド）', color: '#3B82F6' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-semibold text-[#1F2937] whitespace-nowrap">
                <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3行でわかる */}
      <Section id="key-takeaways" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">3行でわかる、LINE予約で何ができるか</h2>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">1</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">飲食・サロン・施設の予約をLINE上で完結。アプリのダウンロードなしに24時間受け付けられる</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">2</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">予約確認・前日リマインド・キャンセル待ち・空席通知を自動化し、スタッフの確認工数をなくす</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">3</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">既存の予約システム・POSとAPI連携するため、現場の運用フローを変えずに導入できる</p>
            </li>
          </ol>
        </div>
      </Section>

      {/* できること */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">FEATURES</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">予約でできること</h2>
          <p className="text-base text-[#4B5563]">「予約のデジタル化」ではなく、予約を起点とした顧客データ基盤の構築と来店LTV向上を支援します。</p>
        </div>
        <div className="space-y-12 md:space-y-16">
          {FEATURE_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-1">{group.label}</h3>
                <p className="text-sm text-[#6B7280]">{group.subtitle}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {group.cards.map((f) => {
                  const Icon = f.icon;
                  return (
                    <Card key={f.name} padding="md">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#05A847]" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#1F2937] leading-snug pt-1">{f.name}</h3>
                      </div>
                      <p className="text-sm text-[#9CA3AF] mb-2">「{f.challenge}」</p>
                      <p className="text-sm text-[#4B5563] leading-relaxed">{f.solution}</p>
                      {f.demo_url && (
                        <TrackedExternalLink
                          href={f.demo_url}
                          location={`reservation_card_demo_${f.name}`}
                          destination="demo"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#05A847] mt-3 hover:text-[#048838] transition-colors"
                        >
                          デモを試す
                          <ArrowRight className="w-4 h-4" />
                        </TrackedExternalLink>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <PriceSection currentFeatureKey="reservation" />

      {/* 組み合わせ */}
      <Section id="combinations" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">INTEGRATIONS</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">他の機能と組み合わせる</h2>
          <p className="text-base text-[#4B5563]">予約データを他機能と連携させることで、来店サイクルの自動維持と顧客LTVの向上が実現します。</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {COMBINATIONS.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.name} variant="elevated" padding="lg" rounded="xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#05A847]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">{c.name}</h3>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-4">{c.description}</p>
                <Link href={c.href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#05A847] hover:text-[#048838] transition-colors">
                  詳しく見る
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* 導入ステップ */}
      <Section id="steps" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">GETTING STARTED</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">導入ステップ</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STEPS.map((s, i) => (
            <Card key={s.step} variant="elevated" padding="md" rounded="xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#05A847] text-white font-bold flex items-center justify-center text-sm shrink-0">{i + 1}</div>
                <div>
                  <div className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider">{s.step}</div>
                  <h3 className="text-base font-bold text-[#1F2937]">{s.title}</h3>
                </div>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed">{s.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* よくある質問 */}
      <Section id="faq" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">FAQ</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">よくある質問</h2>
        </div>
        <div className="max-w-[800px] space-y-4">
          {FAQS.map((f) => (
            <details key={f.q} className="bg-white rounded-xl border border-[#E5E7EB] p-5 group">
              <summary className="cursor-pointer font-semibold text-[#1F2937] text-base leading-snug list-none flex justify-between items-start gap-4">
                <span>{f.q}</span>
                <span className="shrink-0 text-[#05A847] mt-0.5">+</span>
              </summary>
              <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 3ステップ導入フロー */}
      <Section id="how-to" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">HOW TO START</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">3ステップで導入できます</h2>
        </div>
        <ol className="max-w-[800px] space-y-4">
          <li className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">1. 要件ヒアリング・見積（〜2週間）</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">予約受付方法・メニュー構成・既存システム連携の要否をお聞きし、概算費用と工期をご提示します。</p>
          </li>
          <li className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">2. 設計・実装（1〜2ヶ月）</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">予約受付・カレンダー連携・リマインド自動配信・会員ID取得の設計と実装を行います。既存システム連携も並列で進行します。</p>
          </li>
          <li className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">3. テスト・本番リリース（1ヶ月）</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">受入テスト・LINEヤフー審査・本番リリースまで伴走します。リリース後の運用フォローも対応可能です。</p>
          </li>
        </ol>
      </Section>

      {/* 同じステップの他の機能 */}
      <Section id="related-features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-6">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">SAME STEP</div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">同じステップの他の機能</h2>
          <p className="text-sm text-[#6B7280]">「顧客接点の創出」ステップで一緒に検討される機能です。</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-[800px]">
          <Link
            href="/memberscard"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#05A847] hover:bg-[#F0FBF4] transition-colors group"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
              <Image src="/images/会員証.png" alt="デジタル会員証" width={24} height={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1F2937] group-hover:text-[#05A847] transition-colors">デジタル会員証</p>
              <p className="text-xs text-[#6B7280] leading-snug mt-0.5">アプリDL不要。バーコード提示で5秒つながる次世代会員体験。</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#05A847] shrink-0 transition-colors" />
          </Link>
          <Link
            href="/queue"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#05A847] hover:bg-[#F0FBF4] transition-colors group"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
              <Image src="/images/順番待ち.png" alt="順番待ち" width={24} height={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1F2937] group-hover:text-[#05A847] transition-colors">順番待ち</p>
              <p className="text-xs text-[#6B7280] leading-snug mt-0.5">待ち時間を会員化のチャンスへ。混雑状況もLINEで配信。</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#05A847] shrink-0 transition-colors" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#06C755] mb-2">CONTACT</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            予約機能の導入について、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">現在の予約受付方法・メニュー構成・外部システム連携の要否をお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" asChild>
              <TrackedExternalLink
                href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                location="footer_cta"
                destination="contact"
              >
                無料で相談する
                <ArrowRight className="w-5 h-5 ml-2" />
              </TrackedExternalLink>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white/50 text-white hover:bg-white/10 hover:border-white"
            >
              <TrackedExternalLink
                href="https://classmethod.jp/download/line-mini-app/"
                location="footer_cta"
                destination="download"
              >
                資料をダウンロード</TrackedExternalLink>
            </Button>
          </div>
          <div className="text-xs text-white/50 pt-2">※ お打ち合わせでご要件を伺ったうえで、個別にお見積もりいたします。</div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white/80 py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 md:gap-10 mb-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo_classmethod_white.png"
                  alt="クラスメソッド"
                  width={120}
                  height={38}
                  className="hidden md:block h-7 w-auto object-contain"
                />
                <Image
                  src="/icon-light-32x32.png"
                  alt="クラスメソッド"
                  width={32}
                  height={32}
                  className="md:hidden h-7 w-7 object-contain"
                />
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-white">グロースパック</span>
                  <span className="text-sm text-white/50"> for </span>
                  <span className="text-base font-bold text-[#06C755]">LINE</span>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。予約を顧客データ基盤の起点にします。</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">SERVICE</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">できること</a></li>
                <li><a href="#combinations" className="hover:text-white transition-colors">他機能との組み合わせ</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">RESOURCES</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#steps" className="hover:text-white transition-colors">導入ステップ</a></li>
                <li><a href="https://dev.classmethod.jp/tags/line/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">技術ブログ</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">CONTACT</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="reservation_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="reservation_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>&copy; Classmethod, Inc.</p>
            <div className="flex items-center gap-4">
              <a href="https://classmethod.jp/privacy/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">プライバシーポリシー</a>
              <a href="https://classmethod.jp/services/line/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">LINE総合支援サービス</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
