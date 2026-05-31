/**
 * /hotel — グロースパック for LINE ホテル・旅館業界向けLP
 *
 * docs/DESIGN.md v2.1 に厳密に従う。
 * app/apparel/page.tsx を雛形として、ホテル業界固有のコンテンツに差し替え。
 *
 * 訴求軸（project_hotel_industry.md 確定）:
 *   OTA手数料削減・直予約率向上を経営層（CFO/社長）に直接フック。
 *   チェックインDXは旅館業法制約があるため Hero では扱わない。
 *
 * - 和文段落は1行にまとめる（§12 和文改行禁止）
 * - 機能アイコンは /public/images/<機能名>.png を <Image> で表示
 * - CTA リンクは §10 正規 URL
 * - GP事例ゼロのため caseStudies は空。STATS は「業界水準」として提示
 * - RET-166 は本 LP 非掲載
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'ホテル向けLINEミニアプリ開発｜OTA手数料削減・直予約・館内消費を伸ばす｜グロースパック for LINE',
  description: 'OTA手数料の高さ、直予約率の低さ、館内消費の取りこぼし。ホテル・旅館の経営課題をLINEミニアプリで解消。ハーフスクラッチ開発で最短3ヶ月、事業会社向けグロースパック for LINEが直予約率向上を支援。',
  keywords: ['ホテル', 'LINEミニアプリ', 'OTA', '直予約', 'リピーター', '旅館', 'LINEミニアプリ開発'],
  alternates: {
    canonical: '/hotel',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/hotel',
    title: 'ホテル向けLINEミニアプリ開発｜OTA手数料削減・直予約・館内消費を伸ばす｜グロースパック for LINE',
    description: 'OTA手数料の高さ、直予約率の低さ、館内消費の取りこぼし。ホテル・旅館の課題をLINEミニアプリで解消。ハーフスクラッチ開発で最短3ヶ月。グロースパック for LINE。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'ホテル向けLINEミニアプリ開発｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ホテル向けLINEミニアプリ開発｜OTA手数料削減・直予約・館内消費を伸ばす｜グロースパック for LINE',
    description: 'OTA手数料の高さ、直予約率の低さ、館内消費の取りこぼし。ホテル・旅館の課題をLINEミニアプリで解消。ハーフスクラッチ開発で最短3ヶ月。',
    images: ['/images/ogp-v2.jpg'],
  },
}

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  Users,
  ShieldCheck,
  Award,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { Section } from '@/components/shared/ui/section';
import { Card } from '@/components/shared/ui/card';
import { getPricingEntry, type FeatureKey } from '@/lib/pricing';
import { LpHeader } from '@/components/shared/lp-header';
import { LpFooter } from '@/components/shared/lp-footer';
import { TrackedExternalLink } from './tracking';
import { ScrollTracker } from './scroll-tracker';
import { WPDownloadButton } from './wp-download-button';
import { TargetAudienceNotice } from '@/components/shared/ui/target-audience-notice';

/* ------------------------------------------------------------------ */
/* DATA                                                                  */
/* ------------------------------------------------------------------ */

// ホテル・旅館業界で効く6機能に絞り込み
// 除外: 順番待ち / チケット・パス / 抽選 / スタンプカード（他業種向け）
const FEATURES = [
  // Phase 1
  {
    image: '/images/予約.png',
    name: '予約',
    tagline: 'LINE上で宿泊予約を受け、OTA経由を直予約に巻き取る。予約完了後の会員登録も自動化します。',
    phase: 'Step 1',
    id: 'reservation',
    url: '/reservation',
  },
  {
    image: '/images/会員証.png',
    name: 'デジタル会員証',
    tagline: '友だち追加と同時に会員化。アプリDL不要、5秒で会員登録。再来訪時の本人特定も容易に。',
    phase: 'Step 1',
    id: 'membership',
    url: '/memberscard',
  },
  // Phase 2
  {
    image: '/images/クーポン.png',
    name: 'クーポン配信',
    tagline: '館内レストラン・スパ・売店・次回宿泊のクーポンをLINEで配信。チェックイン後の消費を引き上げます。',
    phase: 'Step 2',
    id: 'coupon',
    url: '/coupon',
  },
  {
    image: '/images/1to1.png',
    name: '1to1コミュニケーション',
    tagline: 'コンシェルジュ的な個別応対をLINEに集約。要望・アレルギー・好みを蓄積して次回滞在へ引き継ぎます。',
    phase: 'Step 2',
    id: 'one-to-one',
    url: '/1to1',
  },
  // Phase 3
  {
    image: '/images/セグメント配信.png',
    name: 'セグメント配信',
    tagline: '宿泊履歴・季節・プランタイプで配信を出し分け。半年未来訪ゲストの呼び戻しに。PMS連携なしでもCSV取込で対応可能です。',
    phase: 'Step 3',
    id: 'segment-delivery',
    url: '/segment',
  },
  {
    image: '/images/ギフト.png',
    name: 'ギフト',
    tagline: 'ロイヤル顧客経由の紹介・贈答利用を促進。広告費をかけない新規獲得の仕組みを作ります。',
    phase: 'Step 3',
    id: 'gift',
    url: '/gift',
  },
];

const PROBLEMS = [
  {
    title: 'OTA依存による粗利圧迫',
    body: 'OTA手数料15〜25%が恒常的にP/Lを削る。業界の直予約率は約30%で頭打ちであり、自社チャネル強化が急務です。',
  },
  {
    title: 'リピーターの取りこぼし：直予約転換が進まない',
    body: '宿泊後の接点が消え、次回もOTA経由の予約になる。退館後にLINEで接点を維持し、次回の直予約へ誘導する仕組みが必要です。',
  },
  {
    title: '館内消費の未取り込み',
    body: 'レストラン・スパ・売店の利用促進がフロントの声かけだけに依存。LINEミニアプリで館内サービスをプッシュ通知し、付帯収益を組織的に伸ばせます。',
  },
];

const STRUCTURAL_ISSUES = [
  {
    title: 'ゲストデータの分断',
    body: 'PMS・予約サイト・口コミサイトにデータが散在し、顧客像が統合されない。パーソナライズが機能しません。',
  },
  {
    title: 'アプリDL障壁',
    body: '宿泊施設の単独アプリはDL率が伸びにくく、アプリ疲れが課題に。LINEミニアプリならアプリDL不要で5秒会員化が完了し、接点を確立しやすくなります。',
  },
];

const APPEAL_STEPS = [
  {
    step: 'Step 1',
    title: '直予約チャネルを作る',
    description: 'LINE予約とデジタル会員証で「OTA経由→LINE直予約」への導線を確立。OTA手数料の発生点そのものを削減します。',
    icon: '🏨',
    duration: '初月〜1ヶ月目',
    completion: 'OTA非経由の直予約基盤が稼働する',
  },
  {
    step: 'Step 2',
    title: '滞在中の館内消費を拾う',
    description: 'クーポンと1to1でチェックイン後の接点を維持し、レストラン・スパ・売店の付帯収益を引き上げます。',
    icon: '🍽',
    duration: '1〜2ヶ月目',
    completion: '館内消費データが蓄積され次回滞在の提案精度が上がる',
  },
  {
    step: 'Step 3',
    title: '退館後にリピートを設計する',
    description: 'セグメント配信で半年未来訪・季節・プラン別に呼び戻し。紙DMからLINEへ置き換え、直予約の継続ループを作ります。',
    icon: '🔁',
    duration: '3ヶ月以降',
    completion: '直予約の好循環ループが自動で回り始める',
  },
];


const STATS = [
  {
    value: '5',
    unit: '秒',
    label: '会員登録完了時間',
    sub: 'QRコードから友だち追加と会員化が同時完了',
  },
  {
    value: '0',
    unit: '件',
    label: 'スタッフの手作業（予約リマインド）',
    sub: '予約前日のリマインドから季節配信まで全自動',
  },
  {
    value: 'DL不要',
    unit: '',
    label: 'LINEだけで会員化が完結',
    sub: 'インストール不要。友だち追加と同時に会員化',
  },
  {
    value: '最短',
    unit: '3ヶ月',
    label: 'フェーズ1の立ち上げ期間',
    sub: '直予約基盤（予約+会員証）の標準構成',
  },
];

const FAQS = [
  {
    q: '導入にはどのくらいの期間がかかりますか？',
    a: '最短3ヶ月（Step 1標準構成）。既存PMSや予約エンジンとの連携有無によって前後します。まずはヒアリングで確認させてください。',
  },
  {
    q: '既存のPMS（宿泊管理システム）と連携できますか？',
    a: '対応します。PMSベンダーのAPI公開状況によって連携方式が変わるため、初期ヒアリングで確認させてください。API非公開の場合はCSV取込などの代替方式を提案します。',
  },
  {
    q: 'LINEミニアプリでチェックイン手続きまで完結できますか？',
    a: '旅館業法の本人確認義務があり、フロント対面確認の代替要件は施設・自治体により異なります。法務確認の後に実装範囲を決める前提で進めます。本LPで主に提案しているのは、チェックインDXではなく直予約率向上と滞在中の顧客接点強化です。',
  },
  {
    q: '会員データや宿泊履歴がまだPMSに集約されていませんが、セグメント配信は使えますか？',
    a: '使えます。PMS連携なしでも、宿泊後のCSV取込でリピーター判定・再来訪セグメント作成が可能です。まずはCSV取込で始め、段階的にPMS連携へ移行することもできます。',
  },
  {
    q: '国内旅行客向けとインバウンド向けで提案内容は変わりますか？',
    a: '変わります。国内客は直予約率向上とリピーター育成、インバウンドは多言語配信と館内消費促進を主軸にします。ターゲット比率に応じて最適な構成をご提案します。',
  },
  {
    q: '代理店・パートナーとして相談したいのですが、対象になりますか？',
    a: '本サービスは、自社サービスとしてLINEミニアプリの導入をご検討の事業会社さまを対象としています。代理店・パートナーさま経由でのご提案や、エンドクライアントを別企業とする受託開発でのご利用は対象外とさせていただいております。事業会社さまから直接お問い合わせいただける場合は対応可能です。',
  },
];

/* ------------------------------------------------------------------ */
/* KEY TAKEAWAYS (AIO §A)                                               */
/* ------------------------------------------------------------------ */

const KEY_TAKEAWAYS = [
  'OTA手数料に依存していたリピーターを、LINE直予約に移行する設計（最短3ヶ月）',
  '滞在中の館内消費（レストラン/スパ/物販）をLINE接点で取りこぼさない',
  'ID連携で会員データを統合し、再来訪率を高めるセグメント配信に活かす',
];

/* ------------------------------------------------------------------ */
/* JSON-LD (structured data for SEO)                                     */
/* ------------------------------------------------------------------ */

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'ホテル・旅館業界向けLINEミニアプリ開発サービス',
  name: 'グロースパック for LINE（ホテル・旅館業界向け）',
  description:
    'OTA手数料削減・直予約率向上を軸に、宿泊施設の顧客接点をLINEで統合。会員証・セグメント配信・館内クーポンを最短3ヶ月で立ち上げます。',
  provider: {
    '@type': 'Organization',
    name: 'クラスメソッド株式会社',
    url: 'https://classmethod.jp',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Japan',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'グロースパック for LINE 機能アセット',
    itemListElement: [
      'デジタル会員証',
      '予約',
      'クーポン配信',
      '1to1コミュニケーション',
      'セグメント配信',
      'ギフト',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'グロースパック for LINE',
      item: 'https://lp.growthpackforline.classmethod.net/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'ホテル・旅館業界',
      item: 'https://lp.growthpackforline.classmethod.net/hotel',
    },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'ホテル×LINEミニアプリの導入ステップ',
  description: 'OTA手数料削減から館内消費最大化、リピート設計まで3ステップで段階導入する流れ',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '直予約チャネルを作る',
      text: 'LINE予約とデジタル会員証で「OTA経由→LINE直予約」への導線を確立。OTA手数料の発生点そのものを削減します。',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '滞在中の館内消費を拾う',
      text: 'クーポンと1to1でチェックイン後の接点を維持し、レストラン・スパ・売店の付帯収益を引き上げます。',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '退館後にリピートを設計する',
      text: 'セグメント配信で半年未来訪・季節・プラン別に呼び戻し。紙DMからLINEへ置き換え、直予約の継続ループを作ります。',
    },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'ホテル向けLINEミニアプリ開発｜OTA手数料削減・直予約・館内消費を伸ばす｜グロースパック for LINE',
  description: 'OTA手数料の高さ、直予約率の低さ、館内消費の取りこぼし。ホテル・旅館の経営課題をLINEミニアプリで解消。ハーフスクラッチ開発で最短3ヶ月、事業会社向けグロースパック for LINEが直予約率向上を支援。',
  author: {
    '@type': 'Organization',
    name: 'クラスメソッド株式会社',
    url: 'https://classmethod.jp/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'クラスメソッド株式会社',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lp.growthpackforline.classmethod.net/images/cm-logo.png',
    },
  },
  datePublished: '2026-04-30',
  dateModified: new Date().toISOString().split('T')[0],
  image: 'https://lp.growthpackforline.classmethod.net/images/ogp-v2.jpg',
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                  */
/* ------------------------------------------------------------------ */

export default function HotelPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ScrollTracker />

      {/* ============================================================ */}
      {/* Header                                                         */}
      {/* ============================================================ */}
      <LpHeader
        navItems={[
          { href: '#problems', label: '課題' },
          { href: '#appeal', label: '訴求' },
          { href: '#features', label: '機能' },
          { href: '#wp-download', label: '調査レポート' },
          { href: '#faq', label: 'FAQ' },
        ]}
        cta={
          <Button variant="primary" size="sm" asChild>
            <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="header" destination="contact">お問い合わせ</TrackedExternalLink>
          </Button>
        }
      />

      {/* ============================================================ */}
      {/* Hero — 写真背景バリエーション（§7-1b）                           */}
      {/* ============================================================ */}
      <div className="relative min-h-[560px] md:min-h-[700px] flex items-center bg-[#0a0a0a] overflow-hidden">
        {/* 背景: ホテル実務シーン写真 */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/hotel-hero.png')" }}
        />
        {/* ダークオーバーレイ（左濃→右薄） */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(10,10,10,0.80) 0%, rgba(10,10,10,0.52) 45%, rgba(10,10,10,0.20) 85%, rgba(10,10,10,0.06) 100%), radial-gradient(ellipse 60% 60% at 85% 100%, rgba(6,199,85,0.18) 0%, transparent 70%)',
          }}
        />
        {/* 背景グリッド */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* 左カラム */}
            <div className="lg:col-span-7 space-y-6 md:space-y-7">
              {/* 認定バッジ pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-line-green/20 border border-line-green/50 rounded-full text-xs sm:text-sm font-semibold text-line-green">
                <Award className="w-4 h-4 shrink-0" />
                LINEヤフー Technology Partner × ホテル・旅館業界向け
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight text-white">
                OTA手数料を、<br />
                直予約に<span className="text-line-green">置き換える。</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">LINEで作る宿泊施設の直販チャネル。OTA依存の粗利圧迫・リピーターの取りこぼし・館内消費の未取り込み。3つの課題を、<span className="font-bold text-white">最短3ヶ月</span>で解きます。</p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button variant="primary" size="lg" asChild>
                  <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/?utm_source=organic&utm_medium=lp&utm_campaign=hypothesis-v1&utm_content=hotel-ota#iframe-form" location="hero_primary" destination="contact">
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
                  <TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="hero_secondary" destination="download">
                    資料をダウンロード
                  </TrackedExternalLink>
                </Button>
              </div>

              {/* ミニチェックリスト */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['OTA手数料削減', '直予約率向上'].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-line-green" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* 右カラム — 放射型タッチポイント図（§7-1） */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative h-[560px] w-full">
                {/* 放射接続線 */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 500 560"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="lineFadeHotel" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#06C755" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#06C755" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {[
                    { x: 90, y: 100 },
                    { x: 410, y: 100 },
                    { x: 0, y: 280 },
                    { x: 500, y: 280 },
                    { x: 90, y: 460 },
                    { x: 410, y: 460 },
                  ].map((p, i) => (
                    <line
                      key={i}
                      x1="250"
                      y1="280"
                      x2={p.x}
                      y2={p.y}
                      stroke="#06C755"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                      opacity="0.35"
                    />
                  ))}
                  <circle cx="250" cy="280" r="140" fill="url(#lineFadeHotel)" />
                </svg>

                {/* 中心スマホ */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px]">
                  <div className="bg-[#111] rounded-[28px] p-1.5 shadow-[0_20px_60px_rgba(6,199,85,0.25)] border border-white/10">
                    <div className="bg-white rounded-[22px] overflow-hidden">
                      <div className="h-10 bg-line-green flex items-center px-4 gap-2">
                        <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-white font-bold text-[10px]">G</div>
                        <span className="text-white text-xs font-bold">グロースパック</span>
                      </div>
                      <div className="p-3 space-y-2.5 bg-secondary">
                        <div className="bg-white rounded-lg p-3 border border-border shadow-sm">
                          <div className="text-[9px] text-line-green-dark font-bold mb-1 uppercase tracking-wider">MEMBERSHIP</div>
                          <div className="font-bold text-foreground text-xs mb-2">デジタル会員証</div>
                          <div className="h-10 bg-white rounded border border-border flex flex-col items-center justify-center gap-0.5 px-2">
                            <svg
                              viewBox="0 0 100 20"
                              className="w-full h-5"
                              preserveAspectRatio="none"
                              aria-hidden="true"
                            >
                              {[
                                2, 1, 3, 1, 2, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1,
                                2, 3, 1, 1, 2, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1,
                              ].map((w, i, arr) => {
                                const x = arr.slice(0, i).reduce((s, n) => s + n, 0) * 2;
                                return i % 2 === 0 ? (
                                  <rect key={i} x={x} y="0" width={w * 2} height="20" fill="#1F2937" />
                                ) : null;
                              })}
                            </svg>
                            <div className="text-[7px] tracking-[0.15em] text-muted-foreground font-mono">4901234 567890</div>
                          </div>
                        </div>
                        <div className="bg-line-green-extra-light rounded-md px-2 py-1.5 border border-line-green/20">
                          <div className="text-[9px] text-line-green-dark font-bold">新着</div>
                          <div className="text-[10px] text-foreground">館内レストランクーポン</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6つの接点カード */}
                {[
                  { top: '10%', left: '5%', image: '/images/予約.png', label: '予約', delay: '0s' },
                  { top: '10%', right: '5%', image: '/images/会員証.png', label: '会員証', delay: '0.1s' },
                  { top: '45%', left: '-10%', image: '/images/クーポン.png', label: 'クーポン', delay: '0.2s' },
                  { top: '45%', right: '-10%', image: '/images/1to1.png', label: '1to1', delay: '0.3s' },
                  { bottom: '10%', left: '5%', image: '/images/セグメント配信.png', label: 'セグメント', delay: '0.4s' },
                  { bottom: '10%', right: '5%', image: '/images/ギフト.png', label: 'ギフト', delay: '0.5s' },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="absolute bg-white/95 backdrop-blur rounded-xl border border-white/30 shadow-[0_8px_24px_rgba(0,0,0,0.3)] p-3 w-[110px] flex flex-col items-center gap-1"
                    style={{
                      top: card.top,
                      bottom: card.bottom,
                      left: card.left,
                      right: card.right,
                    }}
                  >
                    <div className="relative w-8 h-8">
                      <Image src={card.image} alt={card.label} fill className="object-contain" />
                    </div>
                    <div className="text-[11px] font-bold text-foreground">{card.label}</div>
                  </div>
                ))}

                <div className="absolute top-0 right-0 w-32 h-32 bg-line-green rounded-full opacity-10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-line-green rounded-full opacity-10 blur-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 信頼バッジ帯（§7-2）                                            */}
      {/* ============================================================ */}
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
              { icon: Users, label: 'OTA手数料削減・直予約率向上に特化', color: '#05A847' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground whitespace-nowrap">
                <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 実績数字セクション（§7-3、ホテル特化）                              */}
      {/* ============================================================ */}
      <Section spacing="sm" container="wide" background="white">
        <div className="grid grid-cols-1 sm:grid-cols-2 border border-border rounded-xl overflow-hidden">
          {STATS.map(({ value, unit, label, sub }) => (
            <div key={label} className="px-6 py-10 sm:py-12 text-center bg-white border-b border-border last:border-b-0 sm:odd:border-r sm:[&:nth-child(3)]:border-b-0">
              <div className="text-4xl sm:text-5xl font-bold text-foreground leading-none mb-1 whitespace-nowrap">
                {value}<span className="text-2xl sm:text-3xl text-line-green-dark ml-1">{unit}</span>
              </div>
              <div className="text-sm font-semibold text-foreground mt-3 mb-1">{label}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{sub}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* Key Takeaways（AIO §A — 結論先出し）                            */}
      {/* ============================================================ */}
      <Section spacing="sm" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            3行でわかる、ホテル×LINEミニアプリで何が変わるか
          </h2>
          <ol className="space-y-4">
            {KEY_TAKEAWAYS.map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-base text-foreground leading-relaxed pt-1">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 課題セクション（§7-4、ホテル PROBLEMS 3点）                        */}
      {/* ============================================================ */}
      <Section id="problems" spacing="sm" container="wide" background="muted">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            OTA手数料・リピーター離脱・館内機会損失—直予約化を阻む3つの壁。
          </h2>
          <p className="text-base text-muted-foreground">粗利を削るOTA依存を出発点に、リピーター育成と館内消費の最大化を3段階で解消します。</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {PROBLEMS.map((p) => (
            <Card key={p.title} padding="md">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 構造課題セクション（主旨外 2点）                                   */}
      {/* ============================================================ */}
      <Section id="structural-issues" spacing="sm" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
            業界全体の構造課題
          </h3>
          <p className="text-base text-muted-foreground">あわせて解決できる構造的な課題</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {STRUCTURAL_ISSUES.map((p) => (
            <Card key={p.title} padding="md">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 対象明示（Issue #223）                                           */}
      {/* ============================================================ */}
      <TargetAudienceNotice />

      {/* ============================================================ */}
      {/* 訴求セクション（ホテル固有 3ステップ、経営層訴求の骨格）              */}
      {/* ============================================================ */}
      <Section id="appeal" spacing="md" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            3つのステップで、直予約の好循環を作る。
          </h2>
          <p className="text-base text-muted-foreground">直販チャネルを作り、館内消費を最大化し、退館後の再来訪を設計する。OTA依存を段階的に解消するロードマップです。</p>
        </div>
        <ol className="grid md:grid-cols-3 gap-4 md:gap-5 list-none">
          {APPEAL_STEPS.map((s, i) => (
            <li key={s.step}>
              <Card variant="elevated" padding="lg" rounded="xl" className="relative h-full">
                <div className="flex items-start gap-4 mb-3">
                  <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-foreground pt-1">{s.title}</h3>
                </div>
                <p className="text-[11px] font-semibold text-line-green-dark mb-2">{s.duration}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">{s.completion}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* ============================================================ */}
      {/* ポジショニング（§7-5）                                          */}
      {/* ============================================================ */}
      <Section id="positioning" spacing="md" container="wide" background="muted">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            SaaSとスクラッチ、その中間に。
          </h2>
          <p className="text-base text-muted-foreground">SaaSはPMS連携や宿泊施設固有の要件で詰まり、フルスクラッチは期間とコストが膨らむ。グロースパックは<span className="font-bold text-foreground">速さ・柔軟性・既存PMS対応</span>を同時に提供するハーフスクラッチ開発です。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {/* SaaS */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Option A</div>
            <h3 className="text-base font-bold mb-4">SaaS<br /><span className="text-sm font-normal text-muted-foreground">パッケージ型</span></h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-line-green shrink-0" />初期コスト: 低</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-accent-yellow shrink-0" />PMS連携: △</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-accent-yellow shrink-0" />拡張性: △</li>
            </ul>
          </Card>

          {/* Growthpack */}
          <Card variant="accent" padding="md" className="ring-2 ring-line-green shadow-lg relative">
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-line-green-dark text-white text-xs font-bold rounded-sm">
              RECOMMENDED
            </div>
            <div className="text-xs font-semibold text-line-green-dark uppercase tracking-wider mb-3">グロースパック</div>
            <h3 className="text-base font-bold mb-4">ハーフスクラッチ<br /><span className="text-sm font-normal text-line-green-dark">開発</span></h3>
            <ul className="text-sm text-foreground space-y-2 font-medium">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-accent-yellow shrink-0" />初期コスト: 中</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-line-green shrink-0" />PMS連携: ◎</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-line-green shrink-0" />拡張性: ○ / サポート: ○</li>
            </ul>
          </Card>

          {/* スクラッチ */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Option C</div>
            <h3 className="text-base font-bold mb-4">スクラッチ<br /><span className="text-sm font-normal text-muted-foreground">開発</span></h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />初期コスト: 高</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-line-green shrink-0" />PMS連携: ◎</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-line-green shrink-0" />拡張性: ◎</li>
            </ul>
          </Card>
        </div>

        {/* 比較表（AIO §B — AI抽出最適化） */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-sm border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-foreground text-white">
                <th className="px-4 py-3 text-left font-semibold">比較項目</th>
                <th className="px-4 py-3 text-center font-semibold">SaaS（パッケージ型）</th>
                <th className="px-4 py-3 text-center font-semibold bg-line-green-dark">グロースパック for LINE</th>
                <th className="px-4 py-3 text-center font-semibold">フルスクラッチ開発</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['初期費用', '低', '中', '高'],
                ['月額費用', '低〜中', '中', '中〜高'],
                ['PMS連携', '△（制約あり）', '◎（柔軟に対応）', '◎（全て対応可）'],
                ['OTA手数料削減設計', '△', '◎（直予約導線を設計）', '◎'],
                ['立ち上げ期間', '1〜2ヶ月', '最短3ヶ月', '6ヶ月〜'],
                ['運用負荷', '低', '低〜中', '高'],
              ].map(([label, saas, gp, scratch], idx) => (
                <tr key={label} className={idx % 2 === 0 ? 'bg-white' : 'bg-secondary'}>
                  <td className="px-4 py-3 font-medium text-foreground">{label}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{saas}</td>
                  <td className="px-4 py-3 text-center font-semibold text-line-green-dark bg-line-green-pale">{gp}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{scratch}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2">※ 費用感は「低／中／高」の目安表記です。詳細はヒアリング後にご提示します。</p>
        </div>
      </Section>

      {/* 中盤CTA帯 */}
      <div className="bg-line-green-dark py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-lg sm:text-xl">どの構成が宿泊施設に合うか、まずご相談ください。</p>
              <p className="text-white/80 text-sm mt-1">施設規模・PMS・既存予約エンジンをお聞きして最適な構成をご提案します。</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-white text-line-green-dark hover:bg-white/90 font-bold"
              >
                <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/?utm_source=organic&utm_medium=lp&utm_campaign=hypothesis-v1&utm_content=hotel-ota#iframe-form" location="midband" destination="contact">
                  無料で相談する
                  <ArrowRight className="w-5 h-5 ml-2" />
                </TrackedExternalLink>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 機能グリッド（§7-6、ホテル向けタグライン）                         */}
      {/* ============================================================ */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            10の機能アセットから、ホテル向けに選んで組み合わせる。
          </h2>
          <p className="text-base text-muted-foreground">宿泊業界で特に効く6機能。必要なものだけを選び、フェーズを追って拡張できます。</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((f) => {
            const phaseColor =
              f.phase === 'Step 1'
                ? 'bg-line-green-extra-light text-line-green-dark'
                : f.phase === 'Step 2'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-violet-100 text-violet-700';
            const phaseLabel =
              f.phase === 'Step 1'
                ? '顧客接点の創出'
                : f.phase === 'Step 2'
                ? 'エンゲージメント強化'
                : '関係性の深化';
            const pricing = getPricingEntry(f.url.slice(1) as FeatureKey);
            return (
              <Link key={f.id} href={f.url} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2">
                <Card padding="md" className="h-full flex flex-col border-2 border-border group-hover:border-line-green transition-colors">
                  <span className={`inline-block self-start text-sm font-semibold px-2.5 py-1 rounded-full mb-3 whitespace-nowrap ${phaseColor}`}>
                    {phaseLabel}
                  </span>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="shrink-0 relative w-11 h-11">
                      <Image src={f.image} alt={f.name} fill sizes="44px" className="object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-foreground">{f.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{f.tagline}</p>
                  {pricing && (
                    <div className="mt-auto pt-3 border-t border-border flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">初期費用</span>
                      <span className="text-sm font-bold text-foreground">
                        {pricing.price}
                        <span className="text-xs font-normal text-muted-foreground ml-1">（税抜）</span>
                      </span>
                    </div>
                  )}
                  <div className="mt-2 text-right">
                    <span className="text-sm font-semibold text-link underline underline-offset-4 decoration-link/40 group-hover:text-link-hover group-hover:decoration-link-hover transition-colors">
                      詳細を見る →
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* FAQ（§7-9）                                                    */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* WP（ホワイトペーパー）ダウンロード                                   */}
      {/* ============================================================ */}
      <Section id="wp-download" spacing="sm" container="default" background="muted">
        <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm">
          <div className="flex flex-col md:flex-row">
            <div className="bg-[#0a0a0a] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-center md:w-2/5">
              <span className="text-xs tracking-[0.15em] uppercase font-semibold text-line-green mb-3">
                無料ダウンロード
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-3">
                ホテル・旅館業界<br />LINEミニアプリ活用ガイド 2026
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">OTA手数料の構造的負担と、直予約・リピート設計の現実解。</p>
            </div>
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center md:w-3/5">
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-line-green mt-0.5 font-bold">✓</span>
                  OTA経由比率と手数料コストの構造を解像度高く整理
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-line-green mt-0.5 font-bold">✓</span>
                  直予約とリピート率を上げるためのCRM接続
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-line-green mt-0.5 font-bold">✓</span>
                  既存PMSと無理なくつなげる実装の論点
                </li>
              </ul>
              <WPDownloadButton />
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq" spacing="md" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            よくあるご質問
          </h2>
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

      {/* ============================================================ */}
      {/* 最終CTA（§7-10 ダーク背景）                                     */}
      {/* ============================================================ */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green mb-2">
            CONTACT
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            宿泊施設の直予約チャネル構築について、<br />
            <span className="text-line-green">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">施設規模・PMS・既存予約エンジンをお聞きして、最適な構成をご提案します。<span className="font-bold text-white">初回相談は無料です。</span></p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" asChild>
              <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/?utm_source=organic&utm_medium=lp&utm_campaign=hypothesis-v1&utm_content=hotel-ota#iframe-form" location="final_primary" destination="contact">
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
              <TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="final_secondary" destination="download">
                資料をダウンロード
              </TrackedExternalLink>
            </Button>
          </div>
          <div className="text-xs text-white/50 pt-2">
            ※ お打ち合わせでご要件を伺ったうえで、個別にお見積もりいたします。
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* Footer（§7-11）                                               */}
      {/* ============================================================ */}
      <LpFooter
        description="クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。ホテル・旅館業界のOTA手数料削減・直予約率向上・リピーター育成に対応します。"
        columns={[
          {
            heading: 'SERVICE',
            links: (
              <>
                <li><a href="#features" className="hover:text-white transition-colors">機能一覧</a></li>
                <li><a href="#positioning" className="hover:text-white transition-colors">ハーフスクラッチとは</a></li>
              </>
            ),
          },
          {
            heading: 'RESOURCES',
            links: (
              <>
                <li><a href="#problems" className="hover:text-white transition-colors">ホテル業界の課題</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">よくあるご質問</a></li>
                <li>
                  <a
                    href="https://dev.classmethod.jp/tags/line/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    技術ブログ
                  </a>
                </li>
              </>
            ),
          },
          {
            heading: 'CONTACT',
            links: (
              <>
                <li>
                  <a
                    href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    お問い合わせ
                  </a>
                </li>
                <li>
                  <a
                    href="https://classmethod.jp/download/line-mini-app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    資料ダウンロード
                  </a>
                </li>
              </>
            ),
          },
        ]}
      />
    </main>
  );
}
