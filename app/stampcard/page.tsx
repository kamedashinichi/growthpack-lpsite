/**
 * /stampcard — グロースパック for LINE スタンプカード機能ページ
 *
 * docs/DESIGN-FEATURE-PAGE.md に厳密に従う。
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'LINEスタンプカード｜紙のスタンプカードをデジタル化・自動付与・特典管理｜グロースパック for LINE',
  description: '紙スタンプの紛失・管理コスト、来店ごとの手動付与の手間、特典管理の煩雑さ。LINEスタンプカードで来店リピートを促進。ハーフスクラッチ開発で最短3ヶ月、事業会社向けグロースパック for LINE。',
  keywords: ['LINE スタンプカード', 'デジタルスタンプ', 'リピート', 'LINEミニアプリ', 'ポイントカード'],
  alternates: {
    canonical: '/stampcard',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/stampcard',
    title: 'LINEスタンプカード｜紙のスタンプカードをデジタル化・自動付与・特典管理｜グロースパック for LINE',
    description: '紙スタンプの紛失・管理コスト、来店ごとの手動付与の手間、特典管理の煩雑さ。LINEスタンプカードで来店リピートを促進。ハーフスクラッチ開発で最短3ヶ月。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'LINEスタンプカード｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINEスタンプカード｜紙のスタンプカードをデジタル化・自動付与・特典管理｜グロースパック for LINE',
    description: '紙スタンプの紛失・管理コスト、来店ごとの手動付与の手間、特典管理の煩雑さ。LINEスタンプカードで来店リピートを促進。ハーフスクラッチ開発で最短3ヶ月。',
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
  Stamp,
  Bell,
  AlertTriangle,
  Tag,
  BarChart3,
  Award as RankIcon,
  Coins,
  Calendar,
  Radio,
  CreditCard,
  Gift,
  Ticket,
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
    label: 'スタンプ付与・ゴール設計',
    subtitle: '来店するたびに「あと何回」が見える仕組みを作る',
    cards: [
      {
        icon: Stamp,
        name: 'QRスキャンでスタンプ付与',
        challenge: '紙のスタンプカードを忘れてきたお客様に毎回記録できず、来店履歴がまったく残っていない',
        solution: 'スタッフがQRをスキャンするだけでデジタルスタンプを付与。カード不要でどの来店も記録。',
        demo_url: 'https://prototype-stampcard-function.vercel.app/demo/home',
      },
      {
        icon: Bell,
        name: 'ゴール接近の自動通知',
        challenge: '紙カードでは「あと1回で特典！」と気づかせる手段がなく、ゴール直前で来なくなるお客様が多い',
        solution: '「あと1回で特典！」のタイミングでLINEに自動通知。来店動機を自動生成する。',
      },
      {
        icon: Tag,
        name: 'ゴール達成→クーポン自動配布',
        challenge: '10スタンプ達成したお客様にクーポンを渡す作業が手動で、スタッフが都度対応している',
        solution: 'ゴール達成を検知してクーポンを自動発行・配布。スタッフ対応ゼロで特典が届く。',
      },
    ],
  },
  {
    label: '離脱予兆検知とリテンション',
    subtitle: '来なくなりそうなお客様を、離脱する前に自動で検知して引き戻す',
    cards: [
      {
        icon: AlertTriangle,
        name: '離脱予兆検知エンジン',
        challenge: '常連だったお客様がいつの間にか来なくなっても、気づいた頃には手遅れになっている',
        solution: '来店間隔を自動計測し、平均より大幅に空いたタイミングでアラートを発火。離脱前に対策できる。',
      },
      {
        icon: Radio,
        name: '離脱防止クーポンの自動配信',
        challenge: '「最近来ていないお客様リスト」を手動で作って連絡しているが、工数がかかりすぎる',
        solution: '離脱予兆を検知したお客様に限定クーポンを自動配信。手動作業ゼロで呼び戻し施策が動く。',
      },
    ],
  },
  {
    label: 'ランクと多様なスタンプルール',
    subtitle: '公平なリワード設計と全店舗横断の一元管理を実現する',
    cards: [
      {
        icon: RankIcon,
        name: 'ランクシステム',
        challenge: '常連と新規を同じように扱っていて、常連が優遇されていると感じられず離れていく',
        solution: 'ブロンズ・シルバー・ゴールドなどランクを設定。来店継続で特典が増える仕組みで定着率を高める。',
      },
      {
        icon: Coins,
        name: '金額連動スタンプ付与',
        challenge: 'LINE公式ショップカードは購入金額に関わらず1スタンプで、高額購入のお客様に不公平感がある',
        solution: '購入金額に連動してスタンプ数を変動。「たくさん使うほど得をする」公平な設計にできる。',
      },
      {
        icon: Calendar,
        name: '平日・時間帯ボーナスルール',
        challenge: '週末に客が集中して平日は閑散としているが、平日来店を促す手段がない',
        solution: '平日・指定曜日・特定時間帯にボーナススタンプを設定。来場分散と閑散時間帯の活性化に。',
      },
      {
        icon: BarChart3,
        name: '全店舗統一管理・ダッシュボード',
        challenge: '各店舗で紙スタンプの運用がバラバラで、本部が横串でデータを見て施策比較できない',
        solution: '全店舗のスタンプデータを一元管理。本部ダッシュボードで店舗別リピート率を横断比較。',
      },
    ],
  },
];

const COMBINATIONS = [
  {
    icon: CreditCard,
    name: 'スタンプカード × 会員証',
    description: '来店スタンプが貯まるたびに会員プロフィールが更新。ランク×スタンプ進捗を組み合わせた施策や、来店間隔の自動計測で離脱予兆をより精度高く検知できます。',
    href: '/memberscard',
  },
  {
    icon: Tag,
    name: 'スタンプカード × クーポン',
    description: 'ゴール達成・離脱予兆のタイミングで適切なクーポンを自動配布。「もう1回来る理由」を必要なお客様にだけ、最適なタイミングで届けます。',
    href: '/coupon',
  },
  {
    icon: Gift,
    name: 'スタンプカード × 抽選',
    description: 'スタンプゴール達成を抽選参加の資格条件に設定。「10スタンプで抽選に参加できる」という仕組みで、ゴールへの動機をさらに高められます。',
    href: '/lottery',
  },
  {
    icon: Ticket,
    name: 'スタンプカード × チケット・パス',
    description: 'ランク到達や一定スタンプ達成時に特別チケットを自動発行。VIP向けの特別イベントへの招待など、常連顧客への特別体験を設計できます。',
    href: '/ticket',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    title: 'ヒアリング・要件整理',
    description: 'スタンプ付与条件・ランク設計・既存POSとの連携要否・複数店舗か単店舗かをお聞きします。',
  },
  {
    step: 'Step 2',
    title: 'スタンプ基盤の構築',
    description: 'QRスキャンでのスタンプ付与・ゴール接近通知・クーポン自動配布の基本機能を実装します。',
  },
  {
    step: 'Step 3',
    title: '離脱予兆検知・ランク設定',
    description: '来店間隔の自動計測・離脱アラートの閾値・ランクルールを設定します。',
  },
  {
    step: 'Step 4',
    title: '全店舗統合・運用開始',
    description: '本部ダッシュボードと全店舗データを統合し、運用を開始。来店データが蓄積されていきます。',
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'スタンプカード機能',
  name: 'グロースパック for LINE（スタンプカード）',
  description: 'デジタルスタンプで来店回数を可視化。ゴール接近通知・離脱予兆検知・クーポン自動配布でリピート率を仕組みで高めます。',
  provider: { '@type': 'Organization', name: 'クラスメソッド株式会社', url: 'https://classmethod.jp' },
  areaServed: { '@type': 'Country', name: 'Japan' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'グロースパック for LINE', item: 'https://lp.growthpackforline.classmethod.net/' },
    { '@type': 'ListItem', position: 2, name: 'スタンプカード', item: 'https://lp.growthpackforline.classmethod.net/stampcard' },
  ],
};

const FAQS = [
  {
    q: 'スタンプ付与のトリガーはどのように設定できますか？',
    a: 'QRコードのスキャンによる来店時付与が基本です。加えて、購入金額連動・特定時間帯ボーナス・平日加算など、業態に合わせた複数の付与ルールを設定できます。トリガーの組み合わせはヒアリングをもとに設計します。',
  },
  {
    q: 'QR・NFC・POS連携など、どの方式に対応していますか？',
    a: 'QRコードスキャンを標準としています。POS連携によるスタンプ自動付与も要件に応じて対応可能です。NFCへの対応は個別にご相談ください。',
  },
  {
    q: '不正利用（スタンプの二重付与など）への対策はありますか？',
    a: '同一LINEユーザーIDへの付与ログを管理しており、一定時間内の重複付与を防ぐ設計が可能です。具体的な不正対策の設計はヒアリングをもとにご提案します。',
  },
  {
    q: '開発期間と費用の目安は？',
    a: 'QRスタンプ付与・ゴール接近通知・クーポン自動配布の基本構成であれば最短3ヶ月が目安です。費用はランク設計の複雑さや連携先システムの数によって変わるため、初回ヒアリング後に概算をご提示します。',
  },
  {
    q: '業界別の導入事例はありますか？',
    a: '飲食、小売（アパレル・ドラッグストア）、スポーツ・フィットネス施設など複数業種での導入実績があります。業種ごとのスタンプ設計の特徴は、お問い合わせ後のヒアリングでご紹介します。',
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
  name: 'LINEスタンプカードの導入ステップ',
  description: '3ステップで段階的に導入できます',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      name: '要件ヒアリング・見積',
      text: 'スタンプ付与条件・ランク設計・既存POSとの連携要否を確認し、概算費用と工期を提示します。',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: '設計・実装',
      text: 'QRスタンプ付与・ゴール接近通知・クーポン自動配布・離脱予兆検知を設計・実装します。',
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
  headline: 'LINEスタンプカード｜紙のスタンプカードをデジタル化・自動付与・特典管理｜グロースパック for LINE',
  description: '紙スタンプの紛失・管理コスト、来店ごとの手動付与の手間、特典管理の煩雑さ。LINEスタンプカードで来店リピートを促進。ハーフスクラッチ開発で最短3ヶ月。',
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

export default function StampCardPage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <FeatureScrollTracker page="stampcard" />
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
            <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="stampcard_header" destination="contact">お問い合わせ</TrackedExternalLink>
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
                スタンプカード機能
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white">
                離脱しそうなお客様に、<br />
                ちょうどいいタイミングで<br />
                <span className="text-[#06C755]">「また来る理由」</span>を届ける。
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">デジタルスタンプで来店回数を可視化。ゴール接近通知・離脱予兆検知・クーポン自動配布で、リピート率を仕組みで高めます。</p>
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
                    href="https://prototype-stampcard-function.vercel.app/demo/home"
                    location="hero"
                    destination="demo"
                  >
                    デモを試す</TrackedExternalLink>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['離脱の事前検知', 'ゴール接近通知', '全店舗一元管理'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#06C755]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
              <Image
                src="/images/stamp.png"
                alt="スタンプカード機能のデモ画面"
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
                className="h-20 sm:h-24 w-auto object-contain shrink-0"
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
                width={437}
                height={382}
                className="h-20 sm:h-24 w-auto object-contain shrink-0"
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">3行でわかる、LINEスタンプカードで何ができるか</h2>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">1</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">紙のスタンプカードをLINE上でデジタル化し、QRスキャンで来店スタンプを自動付与できる</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">2</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">来店履歴・購買金額に応じたランク設定や特典管理が可能で、常連顧客への優遇施策を自動化できる</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">3</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">POS・会員ID連携で「いつ・誰が・何回来たか」を可視化し、離脱予兆の早期検知とリテンション施策に活用できる</p>
            </li>
          </ol>
        </div>
      </Section>

      {/* できること */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">FEATURES</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">スタンプカードでできること</h2>
          <p className="text-base text-[#4B5563]">「スタンプカードのデジタル化」ではなく、来店データを起点としたリピート率向上の仕組みを構築します。</p>
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
                          location={`stampcard_card_demo_${f.name}`}
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

      <PriceSection currentFeatureKey="stampcard" />

      {/* 組み合わせ */}
      <Section id="combinations" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">INTEGRATIONS</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">他の機能と組み合わせる</h2>
          <p className="text-base text-[#4B5563]">スタンプカードで蓄積した来店データを他機能と連携することで、リテンション施策の自動化範囲が広がります。</p>
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
            <p className="text-sm text-[#4B5563] leading-relaxed">スタンプ付与条件・ランク設計・既存POSとの連携要否をお聞きし、概算費用と工期をご提示します。</p>
          </li>
          <li className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">2. 設計・実装（1〜2ヶ月）</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">QRスタンプ付与・ゴール接近通知・クーポン自動配布・離脱予兆検知の設計と実装を行います。</p>
          </li>
          <li className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">3. テスト・本番リリース（1ヶ月）</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">受入テスト・LINEヤフー審査・本番リリースまで伴走します。リリース後の運用フォローも対応可能です。</p>
          </li>
        </ol>
      </Section>

      {/* 同じステップの他の機能 */}
      <Section id="related-features" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">RELATED FEATURES</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">同じステップの他の機能</h2>
          <p className="text-base text-[#4B5563]">スタンプカードと同じ「エンゲージメント強化」ステップの機能です。組み合わせることでリピート施策の精度が高まります。</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
          {[
            { name: 'クーポン配信', tagline: 'LINE公式の配信制限を超えた、属性連動のクーポン発行。', url: '/coupon' },
            { name: 'チケット・パス', tagline: 'LINEで入場管理まで完結。CRM側で利用状況を可視化。', url: '/ticket' },
            { name: '抽選', tagline: '当選体験でエンゲージメントを加速。来店動機に変える。', url: '/lottery' },
          ].map((f) => (
            <Link
              key={f.name}
              href={f.url}
              className="block bg-white rounded-xl border border-[#E5E7EB] p-5 hover:border-[#05A847] hover:shadow-md transition-all group"
            >
              <h3 className="text-base font-bold text-[#1F2937] mb-2 group-hover:text-[#05A847] transition-colors">{f.name}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-3">{f.tagline}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#05A847]">
                詳しく見る
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#06C755] mb-2">CONTACT</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            スタンプカードの導入について、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">スタンプ付与条件・ランク設計・複数店舗の管理要件をお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。スタンプカードでリピート来店を仕組み化します。</p>
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
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="stampcard_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="stampcard_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
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
