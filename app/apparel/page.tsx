/**
 * /apparel — グロースパック for LINE アパレル業界向けLP
 *
 * docs/DESIGN.md v2.0 に厳密に従う。
 * app/page.tsx を雛形として、アパレル業界固有のコンテンツ・訴求順序に差し替え。
 *
 * 訴求順序（LY 4/8ヒアリング確定）:
 *   1. 店頭商品シェア → 2. 自動フォロー → 3. 顧客カルテ
 *
 * 課題セクション（DX 5点セット）:
 *   1. 会員証DX  2. アプリ疲れ  3. OMO課題  4. 休眠会員  5. サイズ不安
 *
 * - 和文段落は1行にまとめる（§12 和文改行禁止）
 * - 機能アイコンは /public/images/<機能名>.png を <Image> で表示
 * - CTA リンクは §10 正規 URL
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'アパレル向けLINEミニアプリ開発｜試着後の購買・セグメント配信・顧客カルテ｜グロースパック for LINE',
  description: '試着後の離脱、顧客カルテの未整備、セグメント配信不足。アパレル特有の店頭×ECの分断課題をLINEミニアプリで解消。最短3ヶ月で会員IDを統合し、ブランドごとの最適配信を実現。グロースパック for LINEのハーフスクラッチ開発。',
  keywords: ['アパレル', 'LINEミニアプリ', '顧客カルテ', 'セグメント配信', '店頭OMO', 'LINEミニアプリ開発', 'ハーフスクラッチ'],
  alternates: {
    canonical: '/apparel',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/apparel',
    title: 'アパレル向けLINEミニアプリ開発｜試着後の購買・セグメント配信・顧客カルテ｜グロースパック for LINE',
    description: '試着後の離脱、顧客カルテの未整備、セグメント配信不足。アパレル特有の店頭×ECの分断課題をLINEミニアプリで解消。最短3ヶ月で会員IDを統合。グロースパック for LINE。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'アパレル向けLINEミニアプリ開発｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'アパレル向けLINEミニアプリ開発｜試着後の購買・セグメント配信・顧客カルテ｜グロースパック for LINE',
    description: '試着後の離脱、顧客カルテの未整備、セグメント配信不足。アパレル特有の店頭×ECの分断課題をLINEミニアプリで解消。最短3ヶ月で会員IDを統合。',
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
import { WPDownloadButton } from './wp-download-button';
import { TrackedExternalLink } from './tracking';
import { ScrollTracker } from './scroll-tracker';
import { TargetAudienceNotice } from '@/components/shared/ui/target-audience-notice';

/* ------------------------------------------------------------------ */
/* DATA                                                                  */
/* ------------------------------------------------------------------ */

// アパレル業界で実際に効く6機能に絞り込み
// 除外: 順番待ち / 予約 / チケット・パス / 抽選（他業種向け）
const FEATURES = [
  // Phase 1
  {
    image: '/images/会員証.png',
    name: 'デジタル会員証',
    tagline: 'ブランド横断の統合会員証。アプリDL不要、5秒で会員化。',
    phase: '顧客接点の創出',
    id: 'membership',
    url: '/memberscard',
  },
  // Phase 2
  {
    image: '/images/1to1.png',
    name: '1to1コミュニケーション',
    tagline: '接客履歴・好み・サイズを蓄積。異動後も品質を引き継げる。',
    phase: 'エンゲージメント強化',
    id: 'one-to-one',
    url: '/1to1',
  },
  {
    image: '/images/スタンプカード.png',
    name: 'スタンプカード',
    tagline: '紛失ゼロのデジタル台紙で、再来店を設計する。',
    phase: 'エンゲージメント強化',
    id: 'stamp-card',
    url: '/stampcard',
  },
  {
    image: '/images/クーポン.png',
    name: 'クーポン配信',
    tagline: '来店頻度と購買履歴に応じた配信。休眠会員の掘り起こしに。',
    phase: 'エンゲージメント強化',
    id: 'coupon',
    url: '/coupon',
  },
  // Phase 3
  {
    image: '/images/セグメント配信.png',
    name: 'セグメント配信',
    tagline: 'ブランド嗜好・購買帯・来店チャネルで動的に配信を出し分け。',
    phase: '関係性の深化',
    id: 'segment-delivery',
    url: '/segment',
  },
  {
    image: '/images/ギフト.png',
    name: 'ギフト',
    tagline: 'ロイヤル顧客経由の紹介で、広告費ゼロの新規獲得へ。',
    phase: '関係性の深化',
    id: 'gift',
    url: '/gift',
  },
];

const PROBLEMS = [
  {
    title: '試着後の購買意欲を逃す：店頭でLINE会員化できず、帰宅後に忘れられる',
    body: '試着・検討中に「また今度」で帰宅すると購買転換できない。QRコードで即座に友だち追加と会員化を同時完了させ、退店後も接点を維持します。',
  },
  {
    title: '季節セール・再入荷の通知が届かない：セグメント配信基盤なし',
    body: '購買嗜好・来店チャネルに応じた配信ができず、全会員に同じメッセージを送り続けている。ブランド嗜好・購買帯ごとのセグメント配信で売上機会の損失を防ぎます。',
  },
  {
    title: 'スタッフが接客データを残せない：顧客カルテ未整備でパーソナライズ不可',
    body: '好み・サイズ・試着履歴がスタッフの記憶にしかない。接客情報をシステムに蓄積することで、次回来店時の精度と担当引き継ぎの質を高めます。',
  },
];

const STRUCTURAL_ISSUES = [
  {
    title: 'OMO課題：店舗とECで顧客が別人扱い',
    body: '店舗POS・EC・LINEに会員IDが散在。購買履歴が統合できず、パーソナライズが機能しません。',
  },
  {
    title: '休眠会員：6〜7割が年1回未満来店',
    body: '誕生日・離脱直後・季節の自動トリガーで、眠っている会員を起こす仕組みが必要です。',
  },
];

const APPEAL_STEPS = [
  {
    step: 'Step 1',
    title: '店頭の検討層をLINE友だちにする',
    description: '試着・検討中のお客様にQRコードを提示。スタッフはQRを見せるだけで、複雑な説明トークは不要です。5秒で友だち追加と会員登録が同時に完了します。',
    icon: '🛍',
  },
  {
    step: 'Step 2',
    title: '退店後に自動フォローで購買転換する',
    description: '試着3日後の在庫確認、再入荷時の即時通知など、検討状況に応じたメッセージを自動配信。スタッフの手作業はゼロで、シナリオは事前設定です。',
    icon: '📨',
  },
  {
    step: 'Step 3',
    title: '接客品質を継続的に高めてリピート化する',
    description: '購買・試着・接客の履歴を蓄積し、次回来店時の接客精度を向上。担当が替わっても対話履歴が引き継がれ、顧客との関係が店舗の資産になります。',
    icon: '📋',
  },
];


const STATS = [
  {
    value: 'DL不要',
    unit: '',
    label: 'LINEだけで会員化が完結',
    sub: 'インストール不要。お客様のスマホにLINEがあればOK',
  },
  {
    value: '5',
    unit: '秒',
    label: '会員登録完了時間',
    sub: 'QRコードから友だち追加と会員化が同時完了',
  },
  {
    value: '0',
    unit: '件',
    label: 'スタッフの手作業（自動フォロー）',
    sub: 'シナリオ配信は事前設定。退店後のフォローは全自動',
  },
  {
    value: '最短',
    unit: '3ヶ月',
    label: 'フェーズ1の立ち上げ期間',
    sub: '会員証を含む標準構成。マルチブランドは4〜6ヶ月',
  },
];

const FAQS = [
  {
    q: '導入にはどのくらいの期間がかかりますか？',
    a: '会員証を含む標準構成で最短3ヶ月。複数ブランド統合や既存EC連携が必要な場合は4〜6ヶ月が目安です。',
  },
  {
    q: '複数ブランドで一つのLINEミニアプリを運用できますか？',
    a: '対応可能です。単一のLINE IDでブランド横断の統合会員証を設計できます。マルチブランド管理はハーフスクラッチの強みです。',
  },
  {
    q: '既存のECや基幹システムと連携できますか？',
    a: '対応します。Shopify・ecbeing・自社EC・基幹POS等と連携実績があり、既存構成に合わせて設計します。',
  },
  {
    q: '既存のポイントや会員データはそのまま移行できますか？',
    a: '連携・移行とも対応範囲です。データ構造とボリュームによって方式が変わるため、まずはヒアリングさせてください。',
  },
  {
    q: 'SPAブランドとセレクトショップで提案内容は変わりますか？',
    a: '変わります。SPA型はセグメント配信とアップセル、セレクト型は統合IDと紹介獲得が主軸です。',
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
  '試着→帰宅後の購買離脱を、QR会員化＋自動フォローで止める（最短3ヶ月）',
  'ブランド・購買帯ごとのセグメント配信で、一斉配信のブロック率を下げる',
  '接客履歴をシステムに残し、担当者が変わっても顧客との関係を組織資産化する',
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
  serviceType: 'アパレル業界向けLINEミニアプリ開発サービス',
  name: 'グロースパック for LINE（アパレル業界向け）',
  description:
    'マルチブランド対応の統合会員証・店頭商品シェア・自動フォロー・顧客カルテをLINEミニアプリで実現。SaaSの速さとフルスクラッチの柔軟性を両立するハーフスクラッチ開発で、最短3ヶ月で立ち上げます。',
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
      '順番待ち',
      '予約',
      'スタンプカード',
      'クーポン配信',
      'チケット・パス',
      '抽選',
      'セグメント配信',
      '1to1コミュニケーション',
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
      name: 'アパレル業界',
      item: 'https://lp.growthpackforline.classmethod.net/apparel',
    },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'アパレル×LINEミニアプリの導入ステップ',
  description: '店頭での会員化から自動フォロー、顧客カルテ構築まで3ステップで段階導入する流れ',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '店頭の検討層をLINE友だちにする',
      text: '試着・検討中のお客様にQRコードを提示。5秒で友だち追加と会員登録が同時に完了します。',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '退店後に自動フォローで購買転換する',
      text: '試着3日後の在庫確認、再入荷時の即時通知など、検討状況に応じたメッセージを自動配信します。',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '接客品質を継続的に高めてリピート化する',
      text: '購買・試着・接客の履歴を蓄積し、次回来店時の接客精度を向上。担当が替わっても対話履歴が引き継がれます。',
    },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'アパレル向けLINEミニアプリ開発｜試着後の購買・セグメント配信・顧客カルテ｜グロースパック for LINE',
  description: '試着後の離脱、顧客カルテの未整備、セグメント配信不足。アパレル特有の店頭×ECの分断課題をLINEミニアプリで解消。最短3ヶ月で会員IDを統合し、ブランドごとの最適配信を実現。グロースパック for LINEのハーフスクラッチ開発。',
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

export default function ApparelPage() {
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
      {/* Hero — ダーク放射型（§7-1）                                      */}
      {/* ============================================================ */}
      <div className="relative min-h-[560px] md:min-h-[700px] flex items-center bg-[#0a0a0a] overflow-hidden">
        {/* 背景: アパレル実務シーン写真 */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/apparel-hero.png')" }}
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
                <span className="w-1.5 h-1.5 rounded-full bg-line-green shrink-0" />
                LINEヤフー Technology Partner × アパレル業界
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight text-white">
                アパレルの顧客接点、<br />
                LINEで<span className="text-line-green">ひらく。</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">アプリ疲れ・OMO・休眠会員・EC返品率。アパレルの5つの壁を、マルチブランド対応の統合会員証で解きます。<span className="font-bold text-white">最短3ヶ月</span>で立ち上げ。</p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button variant="primary" size="lg" asChild>
                  <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/?utm_source=organic&utm_medium=lp&utm_campaign=hypothesis-v1&utm_content=apparel-153#iframe-form" location="hero_primary" destination="contact">
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
                {['マルチブランド対応', '50ブランド横断の会員証'].map((t) => (
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
                    <radialGradient id="lineFadeApparel" cx="50%" cy="50%" r="50%">
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
                  <circle cx="250" cy="280" r="140" fill="url(#lineFadeApparel)" />
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
                          <div className="text-[10px] text-foreground">誕生日クーポン</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6つの接点カード */}
                {[
                  { top: '10%', left: '5%', image: '/images/会員証.png', label: '会員証', delay: '0s' },
                  { top: '10%', right: '5%', image: '/images/スタンプカード.png', label: 'スタンプ', delay: '0.1s' },
                  { top: '45%', left: '-10%', image: '/images/予約.png', label: '予約', delay: '0.2s' },
                  { top: '45%', right: '-10%', image: '/images/クーポン.png', label: 'クーポン', delay: '0.3s' },
                  { bottom: '10%', left: '5%', image: '/images/1to1.png', label: '1to1', delay: '0.4s' },
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
      {/* 実績数字セクション（§7-3、アパレル特化）                           */}
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
            3行でわかる、アパレル×LINEミニアプリで何が変わるか
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
      {/* 課題セクション（§7-4、DX 5点セット）                             */}
      {/* ============================================================ */}
      <Section id="problems" spacing="sm" container="wide" background="muted">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            試着・セール・接客—店頭の購買機会が今日も取りこぼされている。
          </h2>
          <p className="text-base text-muted-foreground">店頭での商品シェアを最大化するために、会員化・配信・顧客カルテの3層を順に整備します。</p>
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
      {/* 訴求セクション（アパレル固有 3ステップ訴求 — HowTo構造化）           */}
      {/* ============================================================ */}
      <Section id="appeal" spacing="md" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            3つのステップで、顧客との関係を積み上げる。
          </h2>
          <p className="text-base text-muted-foreground">店頭での接点づくりから始め、仕組みで関係を深め、データで接客を引き継ぐ。現場に受け入れられやすい導入順序です。</p>
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
                <p className="text-[11px] font-semibold text-line-green-dark mb-2">
                  {i === 0 ? '初月〜1ヶ月目' : i === 1 ? '1〜2ヶ月目' : '3ヶ月以降'}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                  {i === 0 ? '退店後も接点が維持できるようになる' : i === 1 ? '自動フォローで購買転換が起きるようになる' : '担当を超えた接客継続ができるようになる'}
                </p>
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
          <p className="text-base text-muted-foreground">SaaSはマルチブランドや既存EC連携で詰まり、フルスクラッチは期間とコストが膨らむ。グロースパックは<span className="font-bold text-foreground">速さ・柔軟性・マルチブランド対応</span>を同時に提供するハーフスクラッチ開発です。</p>
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
                ['カスタマイズ性', '低（制約あり）', '高（業界特化設計）', '最高（要工数）'],
                ['既存システム連携', '△（制約あり）', '○（柔軟に対応）', '◎（全て対応可）'],
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
              <p className="text-white font-bold text-lg sm:text-xl">どの構成がアパレル事業に合うか、まずご相談ください。</p>
              <p className="text-white/80 text-sm mt-1">ブランド数・規模・既存システムをお聞きして最適な構成をご提案します。</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-white text-line-green-dark hover:bg-white/90 font-bold"
              >
                <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/?utm_source=organic&utm_medium=lp&utm_campaign=hypothesis-v1&utm_content=apparel-153#iframe-form" location="midband" destination="contact">
                  無料で相談する
                  <ArrowRight className="w-5 h-5 ml-2" />
                </TrackedExternalLink>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 機能グリッド（§7-6、アパレル向けタグライン）                        */}
      {/* ============================================================ */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            10の機能アセットから、アパレル向けに選んで組み合わせる。
          </h2>
          <p className="text-base text-muted-foreground">アパレル業界で特に効く6機能。必要なものだけを選び、フェーズを追って拡張できます。</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((f) => {
            const phaseColor =
              f.phase === '顧客接点の創出'
                ? 'bg-line-green-extra-light text-line-green-dark'
                : f.phase === 'エンゲージメント強化'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-violet-100 text-violet-700';
            const pricing = getPricingEntry(f.url.slice(1) as FeatureKey);
            return (
              <Link key={f.id} href={f.url} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2">
                <Card padding="md" className="h-full flex flex-col border-2 border-border group-hover:border-line-green transition-colors">
                  <span className={`inline-block self-start text-sm font-semibold px-2.5 py-1 rounded-full mb-3 whitespace-nowrap ${phaseColor}`}>
                    {f.phase}
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
      {/* WP（ホワイトペーパー）ダウンロード                                   */}
      {/* ============================================================ */}
      <Section id="wp-download" spacing="sm" container="default" background="muted">
        <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm">
          <div className="flex flex-col md:flex-row">
            {/* 左: WP概要（ダーク） */}
            <div className="bg-[#0a0a0a] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-center md:w-2/5">
              <span className="text-xs tracking-[0.15em] uppercase font-semibold text-line-green mb-3">
                無料ダウンロード
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-3">
                アパレル・ファッション業界<br />LINEミニアプリ活用ガイド 2026
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">会員獲得・ID連携を起点にした、店舗とECをつなぐLINEの設計。</p>
            </div>
            {/* 右: 内容+CTA */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center md:w-3/5">
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-line-green mt-0.5 font-bold">✓</span>
                  LINEタッチ・クイック入力で本会員化を成果につなげる導線
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-line-green mt-0.5 font-bold">✓</span>
                  店頭商品シェアで「検討層」をLINEに引き戻す施策
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-line-green mt-0.5 font-bold">✓</span>
                  既存EC・会員DBと無理なくつなぐ実装の論点
                </li>
              </ul>
              <WPDownloadButton />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* FAQ（§7-9）                                                    */}
      {/* ============================================================ */}
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
            アパレルの顧客接点DXについて、<br />
            <span className="text-line-green">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">ブランド数・会員システム・EC構成をお聞きして、最適な構成をご提案します。<span className="font-bold text-white">初回相談は無料です。</span></p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" asChild>
              <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/?utm_source=organic&utm_medium=lp&utm_campaign=hypothesis-v1&utm_content=apparel-153#iframe-form" location="final_primary" destination="contact">
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
        description="クラスメソッド株式会社が提供する LINE ミニアプリ開発サービス。アパレル業界のOMO・会員証DX・マルチブランド統合に対応します。"
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
                <li><a href="#problems" className="hover:text-white transition-colors">アパレル業界の課題</a></li>
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
