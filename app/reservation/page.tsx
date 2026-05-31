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
import { LpHeader } from '@/components/shared/lp-header';
import { LpFooter } from '@/components/shared/lp-footer';
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
    <main className="min-h-screen bg-white text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <FeatureScrollTracker page="reservation" />
      <LpHeader
        navItems={[
          { href: '#features', label: 'できること' },
          { href: '#combinations', label: '組み合わせ' },
          { href: '#steps', label: '導入ステップ' },
        ]}
        cta={
          <Button variant="primary" size="sm" asChild>
            <TrackedExternalLink
              href="https://classmethod.jp/services/line/line-apps/#iframe-form"
              location="reservation_header"
              destination="contact"
            >
              お問い合わせ
            </TrackedExternalLink>
          </Button>
        }
      />

      {/* Hero */}
      <div className="relative min-h-[480px] md:min-h-[560px] flex items-center bg-[#f5f5f5] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, #1F2937 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 max-w-[600px] space-y-6 md:space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-line-green-extra-light border border-line-green/40 rounded-full text-xs sm:text-sm font-semibold text-line-green-dark">
                <span className="w-1.5 h-1.5 rounded-full bg-line-green-dark shrink-0" />
                予約機能
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-foreground">
                電話と紙をやめたら、<br />
                予約が<span className="text-line-green-dark">顧客データ蓄積</span>の<br className="hidden sm:block" />
                起点になる。
              </h1>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-[600px]">LINEで予約受付・リマインド・来店管理・事後配信を一気通貫で実現。24時間受付と自動リマインドで、取りこぼしと確認電話の工数をなくします。</p>
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
                <Button variant="outline" size="lg" asChild>
                  <TrackedExternalLink
                    href="https://growthpack-reservation-demo.vercel.app/demo/reserve"
                    location="hero"
                    destination="demo"
                  >
                    デモを試す</TrackedExternalLink>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
                {['24時間受付', '自動リマインド', '取りこぼしゼロ'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-line-green-dark" />
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
      <div className="bg-white border-b border-border">
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
                <div className="text-xs text-muted-foreground">LINEヤフー</div>
                <div className="text-sm font-semibold text-foreground leading-snug">
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
                <div className="text-xs text-muted-foreground">LINEヤフー</div>
                <div className="text-sm font-semibold text-foreground leading-snug">
                  2026年度 Technology Partner
                  <br />
                  LINEミニアプリ部門
                </div>
              </div>
            </div>
          </div>
          {/* 信頼帯 下段: その他の認定・実績 */}
          <div className="mt-5 pt-5 border-t border-border flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: Award, label: 'AWS Premier Tier Services Partner', color: '#FF9900' },
              { icon: ShieldCheck, label: 'ISO 27001 取得（クラスメソッド）', color: '#3B82F6' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground whitespace-nowrap">
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">3行でわかる、LINE予約で何ができるか</h2>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">01</span>
              <p className="text-base text-foreground leading-relaxed pt-1">飲食・サロン・施設の予約をLINE上で完結。アプリのダウンロードなしに24時間受け付けられる</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">02</span>
              <p className="text-base text-foreground leading-relaxed pt-1">予約確認・前日リマインド・キャンセル待ち・空席通知を自動化し、スタッフの確認工数をなくす</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">03</span>
              <p className="text-base text-foreground leading-relaxed pt-1">既存の予約システム・POSとAPI連携するため、現場の運用フローを変えずに導入できる</p>
            </li>
          </ol>
        </div>
      </Section>

      {/* できること */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">予約でできること</h2>
          <p className="text-base text-muted-foreground">「予約のデジタル化」ではなく、予約を起点とした顧客データ基盤の構築と来店LTV向上を支援します。</p>
        </div>
        <div className="space-y-12 md:space-y-16">
          {FEATURE_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{group.label}</h3>
                <p className="text-sm text-muted-foreground">{group.subtitle}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {group.cards.map((f) => {
                  const Icon = f.icon;
                  return (
                    <Card key={f.name} padding="md">
                      <div className="flex items-start gap-4 mb-3">
                        <Icon className="shrink-0 w-6 h-6 text-line-green-dark mt-0.5" />
                        <h3 className="text-base sm:text-lg font-bold text-foreground">{f.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">「{f.challenge}」</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.solution}</p>
                      {f.demo_url && (
                        <TrackedExternalLink
                          href={f.demo_url}
                          location={`reservation_card_demo_${f.name}`}
                          destination="demo"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-link underline underline-offset-4 decoration-link/40 mt-3 hover:text-link-hover hover:decoration-link-hover transition-colors"
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
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">他の機能と組み合わせる</h2>
          <p className="text-base text-muted-foreground">予約データを他機能と連携させることで、来店サイクルの自動維持と顧客LTVの向上が実現します。</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {COMBINATIONS.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.name} variant="elevated" padding="lg" rounded="xl">
                <div className="flex items-center gap-4 mb-4">
                  <Icon className="shrink-0 w-6 h-6 text-line-green-dark" />
                  <h3 className="text-base sm:text-lg font-bold text-foreground">{c.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.description}</p>
                <Link href={c.href} className="inline-flex items-center gap-1 text-sm font-semibold text-link underline underline-offset-4 decoration-link/40 hover:text-link-hover hover:decoration-link-hover transition-colors">
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
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">導入ステップ</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STEPS.map((s, i) => (
            <Card key={s.step} variant="elevated" padding="md" rounded="xl">
              <div className="flex items-start gap-4 mb-4">
                <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-foreground pt-1">{s.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* よくある質問 */}
      <Section id="faq" spacing="md" container="wide" background="muted">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">よくある質問</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <Card key={f.q} padding="md">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 flex items-start gap-2">
                <span className="text-line-green shrink-0 font-bold">Q.</span>
                {f.q}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-6">{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>





      {/* CTA */}
      <Section id="contact" spacing="md" container="wide" background="dark">
        {/* 3ステップで導入できますで導入できます */}
        <div className="mb-16 md:mb-24">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">3ステップで導入できます</h2>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: '要件ヒアリング・見積（〜2週間）', body: '予約受付方法・メニュー構成・既存システム連携の要否をお聞きし、概算費用と工期をご提示します。' },
              { title: '設計・実装（1〜2ヶ月）', body: '予約受付・カレンダー連携・リマインド自動配信・会員ID取得の設計と実装を行います。既存システム連携も並列で進行します。' },
              { title: 'テスト・本番リリース（1ヶ月）', body: '受入テスト・LINEヤフー審査・本番リリースまで伴走します。リリース後の運用フォローも対応可能です。' },
            ].map((s, i) => (
              <li key={s.title} className="bg-white/5 rounded-xl border border-white/10 p-6">
                <span className="block text-3xl font-bold text-line-green leading-none tabular-nums mb-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* CONTACT 本体 */}
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green mb-2">CONTACT</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            予約機能の導入について、<br />
            <span className="text-line-green">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">現在の予約受付方法・メニュー構成・外部システム連携の要否をお聞きして、最適な構成をご提案します。<span className="font-bold text-white">初回相談は無料です。</span></p>
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

      <LpFooter
        description="クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。予約を顧客データ基盤の起点にします。"
        columns={[
          {
            heading: 'SERVICE',
            links: (
              <>
                <li><a href="#features" className="hover:text-white transition-colors">できること</a></li>
                <li><a href="#combinations" className="hover:text-white transition-colors">他機能との組み合わせ</a></li>
              </>
            ),
          },
          {
            heading: 'RESOURCES',
            links: (
              <>
                <li><a href="#steps" className="hover:text-white transition-colors">導入ステップ</a></li>
                <li><a href="https://dev.classmethod.jp/tags/line/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">技術ブログ</a></li>
              </>
            ),
          },
          {
            heading: 'CONTACT',
            links: (
              <>
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="reservation_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="reservation_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
              </>
            ),
          },
        ]}
      />
    </main>
  );
}
