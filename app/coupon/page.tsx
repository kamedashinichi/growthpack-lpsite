/**
 * /coupon — グロースパック for LINE クーポン配信機能ページ
 *
 * docs/DESIGN-FEATURE-PAGE.md に厳密に従う。
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'LINEクーポン配信｜セグメント別クーポン・ブロック率を下げる配信設計｜グロースパック for LINE',
  description: '一斉配信によるブロック率上昇、クーポンの多用による値引き依存、配信効果の可視化不足。LINEクーポンをセグメント別に最適配信してブロック率を抑制。ハーフスクラッチ開発で最短3ヶ月、事業会社向けグロースパック for LINE。',
  keywords: ['LINE クーポン', 'セグメント配信', 'ブロック率', 'LINEミニアプリ', 'クーポン配信'],
  alternates: {
    canonical: '/coupon',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/coupon',
    title: 'LINEクーポン配信｜セグメント別クーポン・ブロック率を下げる配信設計｜グロースパック for LINE',
    description: '一斉配信によるブロック率上昇、クーポンの多用による値引き依存、配信効果の可視化不足。LINEクーポンをセグメント別に最適配信してブロック率を抑制。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'LINEクーポン配信｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINEクーポン配信｜セグメント別クーポン・ブロック率を下げる配信設計｜グロースパック for LINE',
    description: '一斉配信によるブロック率上昇、クーポンの多用による値引き依存、配信効果の可視化不足。LINEクーポンをセグメント別に最適配信してブロック率を抑制。',
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
  Tag,
  Zap,
  ScanLine,
  BarChart3,
  Users,
  Clock,
  Send,
  Stamp,
  Ticket,
  CalendarCheck,
  Radio,
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
    label: 'クーポンの作成・管理',
    subtitle: '割引種別・有効期限・利用条件を柔軟に設定する',
    cards: [
      {
        icon: Tag,
        name: 'クーポンの作成・管理',
        challenge: '紙クーポンの印刷・配布コストがかさむ一方で、誰が使ったか・利用率は何%か、まったく把握できていない',
        solution: 'クーポン種別・割引内容・有効期限を管理画面で設定。印刷コストゼロで、利用状況をリアルタイム把握。',
        demo_url: 'https://prototype-coupon-function.vercel.app/demo',
      },
      {
        icon: Users,
        name: '属性・ランク別の出し分け',
        challenge: '全員に同じクーポンを配っているが、ゴールド会員と新規会員への特典に差をつけたい',
        solution: '会員ランク・属性・来店パターンによってクーポン内容を自動で出し分け。パーソナライズが自動化。',
      },
      {
        icon: Clock,
        name: 'クーポン有効期限の自動管理',
        challenge: '有効期限が近いクーポンを持っているお客様に連絡したいが、誰が持っているか管理できていない',
        solution: '有効期限の自動管理と期限接近通知を設定。使ってもらうまでをクーポン側が自動フォロー。',
      },
    ],
  },
  {
    label: 'トリガー連動の自動配布',
    subtitle: '「誰に・いつ・何を」をトリガーで自動化し、手動対応をなくす',
    cards: [
      {
        icon: Zap,
        name: 'トリガー連動の自動配布エンジン',
        challenge: '離脱しそうなお客様にクーポンを出したいが、タイミングを特定してリスト作成・配布する工数が毎回かかる',
        solution: 'スタンプゴール達成・離脱予兆・抽選当選・時期到達などのトリガーで自動配布。工数ゼロで適切なタイミングに。',
      },
      {
        icon: Send,
        name: '配信メッセージへのクーポン添付',
        challenge: '「今月末まで使えます」という配信を送っても、クーポンを別途探して来店するお客様が少ない',
        solution: '配信メッセージにクーポンを直接添付。メッセージを受け取ったその場でクーポンが手元に届く。',
      },
    ],
  },
  {
    label: '消込と効果測定',
    subtitle: 'クーポン配布から来店転換までのROIを可視化する',
    cards: [
      {
        icon: ScanLine,
        name: 'クーポン消込',
        challenge: 'スタッフが画面を目視確認して消込しているが、二重利用や不正利用を完全には防げていない',
        solution: 'QR・バーコード読み取りでクーポンを使用済みに更新。二重利用を自動防止し、消込ログが残る。',
      },
      {
        icon: BarChart3,
        name: '利用状況ダッシュボード',
        challenge: 'クーポンを配布しても利用率・転換率が把握できず、次のクーポン設計に活かせていない',
        solution: '配布数・利用率・来店転換率をリアルタイム集計。データに基づくクーポン設計の改善ができる。',
      },
    ],
  },
];

const COMBINATIONS = [
  {
    icon: Stamp,
    name: 'クーポン × スタンプカード',
    description: 'スタンプゴール達成時にリワードクーポンを自動発行、離脱予兆検知時に限定クーポンを自動配信。スタンプカードと組み合わせることでリテンション施策が自動で回ります。',
    href: '/stampcard',
  },
  {
    icon: Ticket,
    name: 'クーポン × 抽選',
    description: '抽選の当選景品・ハズレ参加賞として自動配布。「当たっても外れても何かもらえる」体験で、抽選参加率と来店動機を高めます。',
    href: '/lottery',
  },
  {
    icon: CalendarCheck,
    name: 'クーポン × 予約',
    description: '予約完了時・来店後に次回予約クーポンを自動配布。「また予約しよう」のタイミングに来店動機のひと押しを届けます。',
    href: '/reservation',
  },
  {
    icon: Radio,
    name: 'クーポン × セグメント配信',
    description: '会員ランク・来店頻度・行動履歴でセグメントを切り、それぞれに最適なクーポンを自動配布。一律配布から脱却し、ROIを最大化します。',
    href: '/segment',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    title: 'ヒアリング・要件整理',
    description: '消込方式・まず自動化したいトリガー・POS連動の要否をお聞きします。',
  },
  {
    step: 'Step 2',
    title: 'クーポン基盤の構築',
    description: 'クーポン作成・管理・消込・利用状況ダッシュボードの基本機能を実装します。',
  },
  {
    step: 'Step 3',
    title: 'トリガー配布の設定',
    description: 'スタンプ・離脱予兆・抽選などのトリガーと自動配布エンジンを設定します。',
  },
  {
    step: 'Step 4',
    title: '配信連携・運用開始',
    description: '配信メッセージへのクーポン添付と属性別出し分けを設定し、運用を開始します。',
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'クーポン配信機能',
  name: 'グロースパック for LINE（クーポン配信）',
  description: 'トリガー連動の自動配布で、ゴール達成・離脱防止・イベント参加賞クーポンを自動化。利用率と効果をリアルタイムで可視化します。',
  provider: { '@type': 'Organization', name: 'クラスメソッド株式会社', url: 'https://classmethod.jp' },
  areaServed: { '@type': 'Country', name: 'Japan' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'グロースパック for LINE', item: 'https://lp.growthpackforline.classmethod.net/' },
    { '@type': 'ListItem', position: 2, name: 'クーポン配信', item: 'https://lp.growthpackforline.classmethod.net/coupon' },
  ],
};

const FAQS = [
  {
    q: 'クーポン配信の最大数や上限はありますか？',
    a: 'グロースパック for LINEはハーフスクラッチ型のため、クーポン数や配信数の上限はシステム設計によって設定します。大量配信が想定される場合は、インフラスケーリングを含めてご提案します。',
  },
  {
    q: 'セグメントの条件はどのように設定できますか？',
    a: '会員ランク・来店回数・最終来店日・スタンプ進捗・購買金額など、蓄積した顧客データを条件として組み合わせられます。具体的な条件設計はヒアリングをもとにご提案します。',
  },
  {
    q: 'LINE通知メッセージとクーポン配信機能の違いは何ですか？',
    a: 'LINE通知メッセージは1通あたりの料金が発生するプッシュ配信です。グロースパック for LINEのクーポン機能はミニアプリ内でクーポンを管理・消込し、トリガー連動の自動配布やセグメント別の出し分けを行う仕組みです。両者を組み合わせて使うことが一般的です。',
  },
  {
    q: '開発期間と費用の目安は？',
    a: 'クーポン作成・消込・利用状況ダッシュボードの基本構成であれば最短3ヶ月が目安です。費用はトリガー数・セグメント条件の複雑さ・POS連動の要否によって変わるため、初回ヒアリング後に概算をご提示します。',
  },
  {
    q: '業界別の活用事例はありますか？',
    a: '小売（アパレル・ドラッグストア）、飲食、ホテル・宿泊など複数業種での導入実績があります。業種別の活用パターンはお問い合わせ後のヒアリングでご紹介します。',
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
  name: 'LINEクーポン配信の導入ステップ',
  description: '3ステップで段階的に導入できます',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      name: '要件ヒアリング・見積',
      text: '消込方式・自動化したいトリガー・POS連動の要否を確認し、概算費用と工期を提示します。',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: '設計・実装',
      text: 'クーポン作成・管理・消込・利用状況ダッシュボード・トリガー連動の自動配布を設計・実装します。',
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
  headline: 'LINEクーポン配信｜セグメント別クーポン・ブロック率を下げる配信設計｜グロースパック for LINE',
  description: '一斉配信によるブロック率上昇、クーポンの多用による値引き依存、配信効果の可視化不足。LINEクーポンをセグメント別に最適配信してブロック率を抑制。',
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

export default function CouponPage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <FeatureScrollTracker page="coupon" />
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
            <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="coupon_header" destination="contact">お問い合わせ</TrackedExternalLink>
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
                クーポン配信機能
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white">
                紙クーポンを廃止し、<br />
                <span className="text-[#06C755]">適切な人に適切な</span><br />
                タイミングで届ける仕組みへ。
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">トリガー連動の自動配布で、ゴール達成・離脱防止・イベント参加賞クーポンを自動化。利用率と効果をリアルタイムで可視化します。</p>
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
                    href="https://prototype-coupon-function.vercel.app/demo"
                    location="hero"
                    destination="demo"
                  >
                    デモを試す</TrackedExternalLink>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['印刷コストゼロ', '自動配布', '利用率の可視化'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#06C755]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
              <Image
                src="/images/coupon.png"
                alt="クーポン配信機能のデモ画面"
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
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">3行でわかる、LINEクーポン配信で何ができるか</h2>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">1</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">会員ランク・来店頻度・購買履歴でセグメントを切り、最適なクーポンを適切なタイミングに絞って配信することでブロック率を抑制できる</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">2</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">一斉配信から、購買履歴・属性別の精度配信へシフトすることで、値引き依存を抑えながら来店転換率を高められる</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">3</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">配布数・利用率・来店転換率をLINE上でリアルタイム計測し、次のクーポン設計にすぐ活かせるPDCAが回せる</p>
            </li>
          </ol>
        </div>
      </Section>

      {/* できること */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">FEATURES</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">クーポン配信でできること</h2>
          <p className="text-base text-[#4B5563]">「クーポンのデジタル化」ではなく、配布→来店転換→効果測定のサイクル全体を自動化します。</p>
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
                          location={`coupon_card_demo_${f.name}`}
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

      <PriceSection currentFeatureKey="coupon" />

      {/* 組み合わせ */}
      <Section id="combinations" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">INTEGRATIONS</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">他の機能と組み合わせる</h2>
          <p className="text-base text-[#4B5563]">クーポンはスタンプ・抽選・配信など他機能の「成果を来店に変換する最終ピース」として機能します。</p>
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
            <p className="text-sm text-[#4B5563] leading-relaxed">消込方式・最初に自動化したいトリガー・POS連動の要否をお聞きし、概算費用と工期をご提示します。</p>
          </li>
          <li className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">2. 設計・実装（1〜2ヶ月）</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">クーポン作成・管理・消込・利用状況ダッシュボード・トリガー連動の自動配布を設計・実装します。</p>
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
          <p className="text-sm text-[#6B7280]">「エンゲージメント強化」ステップで一緒に検討される機能です。</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 max-w-[900px]">
          <Link
            href="/stampcard"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#05A847] hover:bg-[#F0FBF4] transition-colors group"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
              <Image src="/images/スタンプカード.png" alt="スタンプカード" width={24} height={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1F2937] group-hover:text-[#05A847] transition-colors">スタンプカード</p>
              <p className="text-xs text-[#6B7280] leading-snug mt-0.5">来店履歴が見える、育つ。紛失ゼロのデジタルスタンプ。</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#05A847] shrink-0 transition-colors" />
          </Link>
          <Link
            href="/ticket"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#05A847] hover:bg-[#F0FBF4] transition-colors group"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
              <Image src="/images/チケット.png" alt="チケット・パス" width={24} height={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1F2937] group-hover:text-[#05A847] transition-colors">チケット・パス</p>
              <p className="text-xs text-[#6B7280] leading-snug mt-0.5">LINEで入場管理まで完結。CRM側で利用状況を可視化。</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#05A847] shrink-0 transition-colors" />
          </Link>
          <Link
            href="/lottery"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#05A847] hover:bg-[#F0FBF4] transition-colors group"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
              <Image src="/images/抽選.png" alt="抽選" width={24} height={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1F2937] group-hover:text-[#05A847] transition-colors">抽選</p>
              <p className="text-xs text-[#6B7280] leading-snug mt-0.5">当選体験でエンゲージメントを加速。来店動機に変える。</p>
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
            クーポン配信の導入について、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">消込方式・最初に自動化したいトリガー・POS連動の要否をお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。クーポン配信を自動化し、来店転換ROIを最大化します。</p>
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
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="coupon_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="coupon_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
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
