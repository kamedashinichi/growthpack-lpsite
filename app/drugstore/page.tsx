/**
 * /drugstore — グロースパック for LINE ドラッグストア業界向けLP
 *
 * docs/DESIGN.md v2.1 に厳密に従う。
 * app/apparel/page.tsx を雛形として、ドラッグストア業界固有のコンテンツに差し替え。
 *
 * 訴求順序:
 *   1. ポイントカード離脱撤廃 → 2. 調剤連携3層 → 3. セグメント配信
 *
 * 調剤連携3層（APPEAL_STEPS の核）:
 *   1. 調剤完了通知  2. 待ち時間クーポン配信  3. 事前受付（受付確認用途）
 *
 * - 和文段落は1行にまとめる（§12 和文改行禁止）
 * - 機能アイコンは /public/images/<機能名>.png を <Image> で表示
 * - CTA リンクは §10 正規 URL
 * - 「最短1ヶ月」は使わない。「最短3ヶ月」が正
 * - 薬機法ガードレール（処方内容の直接参照なし）をFAQで明示
 * - 健診データ活用は訴求しない
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'ドラッグストア向けLINEミニアプリ開発｜アプリ疲れ・ポイントカード・調剤接点｜グロースパック for LINE',
  description: 'アプリ疲れによるポイントカード離脱、調剤待ち時間の非効率、セグメント配信の未活用。ドラッグストアの課題をLINEミニアプリで解消。ハーフスクラッチ開発で最短3ヶ月、事業会社向けグロースパック for LINE。',
  keywords: ['ドラッグストア', 'LINEミニアプリ', 'ポイントカード', '調剤', '薬局', 'セグメント配信', 'LINEミニアプリ開発'],
  alternates: {
    canonical: '/drugstore',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/drugstore',
    title: 'ドラッグストア向けLINEミニアプリ開発｜アプリ疲れ・ポイントカード・調剤接点｜グロースパック for LINE',
    description: 'アプリ疲れによるポイントカード離脱、調剤待ち時間の非効率、セグメント配信の未活用。ドラッグストアの課題をLINEミニアプリで解消。ハーフスクラッチ開発で最短3ヶ月。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'ドラッグストア向けLINEミニアプリ開発｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ドラッグストア向けLINEミニアプリ開発｜アプリ疲れ・ポイントカード・調剤接点｜グロースパック for LINE',
    description: 'アプリ疲れによるポイントカード離脱、調剤待ち時間の非効率、セグメント配信の未活用。ドラッグストアの課題をLINEミニアプリで解消。ハーフスクラッチ開発で最短3ヶ月。',
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
import { FaqSection } from '@/components/shared/sections/faq-section';
import { Card } from '@/components/shared/ui/card';
import { getPricingEntry, type FeatureKey } from '@/lib/pricing';
import { LpHeader } from '@/components/shared/lp-header';
import { LpFooter } from '@/components/shared/lp-footer';
import { TrackedExternalLink } from '@/components/shared/industry-page/tracking';
import { ScrollTracker } from '@/components/shared/industry-page/scroll-tracker';
import { WPDownloadButton } from '@/components/shared/industry-page/wp-download-button';
import { TargetAudienceNotice } from '@/components/shared/ui/target-audience-notice';

/* ------------------------------------------------------------------ */
/* DATA                                                                  */
/* ------------------------------------------------------------------ */

// ドラッグストア業界で実際に効く6機能に絞り込み（DESIGN §7-6 DS推奨）
// 除外: 順番待ち / 予約 / チケット・パス / 抽選（他業種向け）
const FEATURES = [
  // Phase 1
  {
    image: '/images/会員証.png',
    name: 'デジタル会員証',
    tagline: 'レジ前5秒でLINE会員化。ポイントカード携帯率の低下を一気に解消します。',
    phase: '顧客接点の創出',
    id: 'membership',
    url: '/memberscard',
  },
  // Phase 2
  {
    image: '/images/スタンプカード.png',
    name: 'スタンプカード',
    tagline: '紙カード不要のデジタル台紙で、再来店を設計する。',
    phase: 'エンゲージメント強化',
    id: 'stamp-card',
    url: '/stampcard',
  },
  {
    image: '/images/クーポン.png',
    name: 'クーポン配信',
    tagline: '調剤完了後の待ち時間に配信。滞在中の購買機会を収益に変えます。',
    phase: 'エンゲージメント強化',
    id: 'coupon',
    url: '/coupon',
  },
  {
    image: '/images/1to1.png',
    name: '1to1コミュニケーション',
    tagline: '調剤完了通知・受付案内を個別に届け、待ち時間ストレスを低減します。',
    phase: 'エンゲージメント強化',
    id: 'one-to-one',
    url: '/1to1',
  },
  // Phase 3
  {
    image: '/images/セグメント配信.png',
    name: 'セグメント配信',
    tagline: 'POSデータ×購買属性で配信を出し分け。一斉配信によるブロック率を抑制します。',
    phase: '関係性の深化',
    id: 'segment-delivery',
    url: '/segment',
  },
  {
    image: '/images/ギフト.png',
    name: 'ギフト',
    tagline: 'ロイヤル顧客からの紹介で、広告費ゼロの新規会員獲得へ。',
    phase: '関係性の深化',
    id: 'gift',
    url: '/gift',
  },
];

const PROBLEMS = [
  {
    title: 'ポイントカード離脱：アプリ疲れと紙カードの携帯率低下',
    body: '独自アプリはDLされず、紙カードは財布に入らない。LINEミニアプリならアプリDL不要で5秒会員化が完了し、会員化のハードルを大幅に下げられます。',
  },
  {
    title: '一斉配信によるブロック率と開封率の低迷',
    body: '全会員に同じメッセージを送る一斉配信はブロックにつながりやすい。顧客が必要とするタイミングで届ける配信設計に切り替えることで開封率とブロック率を同時に改善します。',
  },
  {
    title: 'マルチブランド・フォーマット分断：HC併設・食品強化・調剤高比率の3型',
    body: 'ドラッグストアはブランドごとに顧客IDが分断されがちです。LINEミニアプリで統一会員基盤を構築すれば、傘下チェーンをまとめて管理できます。',
  },
];

const STRUCTURAL_ISSUES = [
  {
    title: '調剤の待ち時間：20〜40分の死角',
    body: '「呼ばれるまで待つ」構造が患者満足度とスタッフ負荷を同時に悪化させます。完了通知と事前受付で、この死角を接点に変えられます。',
  },
  {
    title: 'POS連携不足：購買属性セグメントの不在',
    body: 'POSデータが活用できていないため、配信は一律になりがちです。購買頻度・カテゴリ嗜好でセグメントを切ることで、配信精度を上げられます。',
  },
];

// 調剤連携3層をAPPEAL_STEPSの核に配置
const APPEAL_STEPS = [
  {
    step: 'Step 1',
    title: '調剤完了通知',
    description: '処方箋受付後、調剤が完了したタイミングでLINEに通知を送信。「呼ばれるまで待つ」ストレスを解消し、顧客が必要とするタイミングでの接点を構築します。',
  },
  {
    step: 'Step 2',
    title: '待ち時間クーポン配信',
    description: '完了通知と同時に、店内商品のクーポンや季節提案を配信。調剤待ちの20〜40分を購買機会に転換し、1回あたりの客単価向上につなげます。',
  },
  {
    step: 'Step 3',
    title: '事前受付（受付確認用途）',
    description: '来店前にLINEから受付番号を取得できる事前受付機能を提供します。処方箋内容の直接参照は行わず、受付確認用途に特化した設計で薬機法ガードレールを守ります。',
  },
];


const STATS = [
  {
    value: 'DL不要',
    unit: '',
    label: 'LINEだけで会員化が完結',
    sub: 'インストール不要。レジ前5秒で会員証が手に入る',
  },
  {
    value: '0',
    unit: '件',
    label: 'スタッフの手作業（調剤完了通知）',
    sub: '通知配信は全自動。スタッフは調剤業務に集中できる',
  },
  {
    value: '5',
    unit: '秒',
    label: '会員登録完了時間',
    sub: 'QRコードから友だち追加と会員化が同時完了',
  },
  {
    value: '最短',
    unit: '3ヶ月',
    label: 'フェーズ1の立ち上げ期間',
    sub: '会員証を含む標準構成。調剤連携を加えると4〜6ヶ月が目安',
  },
];

const FAQS = [
  {
    q: '導入にはどのくらいの期間がかかりますか？',
    a: 'デジタル会員証を含む標準構成で最短3ヶ月。調剤連携（完了通知・事前受付）を追加する場合や複数ブランド統合が必要な場合は4〜6ヶ月が目安です。',
  },
  {
    q: '調剤を併設していない店舗でも提案は成立しますか？',
    a: '成立します。調剤非併設の場合はデジタル会員証・スタンプカード・セグメント配信を主軸に据えた構成を提案します。調剤高比率チェーン向けには調剤連携3層がキラー機能になります。',
  },
  {
    q: '既存のポイントカードやCRMとの連携はできますか？',
    a: '対応しています。既存のポイントデータ・会員IDの移行・連携とも対応範囲です。データ構造とボリュームによって方式が変わるため、まずはヒアリングさせてください。',
  },
  {
    q: '傘下に複数チェーンがある場合、統合会員基盤を作れますか？',
    a: '作れます。単一のLINE IDでマルチブランド・マルチフォーマットをまとめた統合会員基盤を設計できます。ハーフスクラッチの柔軟性で、チェーン固有のルールにも対応します。',
  },
  {
    q: '調剤連携で処方箋の内容を参照したパーソナライズ配信はできますか？',
    a: '処方箋内容の直接参照を用いた配信は薬機法・個人情報保護の観点からグレーゾーンとなるため、本サービスでは対象外としています。提供するのは調剤完了通知・待ち時間クーポン配信・事前受付（受付確認用途）の3層です。健診データを活用したポイント設計も現時点では対象外です。',
  },
  {
    q: 'POSデータを使ったセグメント配信はどこまで対応できますか？',
    a: '購買頻度・カテゴリ嗜好・来店サイクルなど購買属性に基づくセグメントに対応します。POS連携の方式（API・バッチ・CSVインポート等）はご利用のシステムに合わせて設計します。',
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
  'ポイントカード離脱・アプリ疲れを、DL不要のLINEデジタル会員証でレジ前5秒の会員化に変え、顧客基盤のデジタル化を加速する（最短3ヶ月）',
  '一斉配信によるブロック率を下げる、POSデータ×購買履歴を活用した購買属性別セグメント配信に切り替える',
  'マルチブランド・複数フォーマットを横断する1つのLINE会員基盤を構築し、傘下チェーンの顧客データを統合する',
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
  serviceType: 'ドラッグストア・薬局向けLINEミニアプリ開発サービス',
  name: 'グロースパック for LINE（ドラッグストア業界向け）',
  description:
    'ポイントカード離脱・調剤待ち時間・一斉配信ブロック率の3課題を、LINEミニアプリで解決。調剤完了通知・待ち時間クーポン・事前受付の3層でDS固有の接点を構築します。最短3ヶ月でStep 1を立ち上げます。',
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
      'スタンプカード',
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
      name: 'ドラッグストア業界',
      item: 'https://lp.growthpackforline.classmethod.net/drugstore',
    },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'ドラッグストア×LINEミニアプリの導入ステップ',
  description: '調剤完了通知から始まる3ステップで、待ち時間を接点に変え顧客LTVを高める流れ',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '調剤完了通知',
      text: '処方箋受付後、調剤が完了したタイミングでLINEに通知を送信。「呼ばれるまで待つ」ストレスを解消し、顧客が必要とするタイミングでの接点を構築します。',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '待ち時間クーポン配信',
      text: '完了通知と同時に、店内商品のクーポンや季節提案を配信。調剤待ちの20〜40分を購買機会に転換し、1回あたりの客単価向上につなげます。',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '事前受付（受付確認用途）',
      text: '来店前にLINEから受付番号を取得できる事前受付機能を提供します。処方箋内容の直接参照は行わず、受付確認用途に特化した設計で薬機法ガードレールを守ります。',
    },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'ドラッグストア向けLINEミニアプリ開発｜アプリ疲れ・ポイントカード・調剤接点｜グロースパック for LINE',
  description: 'アプリ疲れによるポイントカード離脱、調剤待ち時間の非効率、セグメント配信の未活用。ドラッグストアの課題をLINEミニアプリで解消。ハーフスクラッチ開発で最短3ヶ月、事業会社向けグロースパック for LINE。',
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

export default function DrugstorePage() {
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
          { href: '#appeal', label: '調剤連携' },
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
      {/* Hero — 写真背景バリエーション（§7-1b）                            */}
      {/* ============================================================ */}
      <div className="relative min-h-[560px] md:min-h-[700px] flex items-center bg-[#0a0a0a] overflow-hidden">
        {/* 背景: ドラッグストア実務シーン写真 */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/drugstore-hero.png')" }}
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
                LINEヤフー Technology Partner × ドラッグストア業界
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight text-white">
                ドラッグストアの顧客接点、<br />
                LINEで<span className="text-line-green">つなげる。</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">ポイントカード・調剤待ち時間・一斉配信。ドラッグストアの3つの壁を、アプリDL不要のLINEミニアプリで解きます。<span className="font-bold text-white">最短3ヶ月</span>で立ち上げ。</p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button variant="primary" size="lg" asChild>
                  <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/?utm_source=organic&utm_medium=lp&utm_campaign=hypothesis-v1&utm_content=drugstore-fatigue#iframe-form" location="hero_primary" destination="contact">
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
                {['調剤連携3層対応', '薬機法ガードレール設計'].map((t) => (
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
                    <radialGradient id="lineFadeDrugstore" cx="50%" cy="50%" r="50%">
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
                  <circle cx="250" cy="280" r="140" fill="url(#lineFadeDrugstore)" />
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
                          <div className="text-[9px] text-line-green-dark font-bold">調剤完了</div>
                          <div className="text-[10px] text-foreground">お薬が準備できました</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6つの接点カード */}
                {[
                  { top: '10%', left: '5%', image: '/images/会員証.png', label: '会員証', delay: '0s' },
                  { top: '10%', right: '5%', image: '/images/スタンプカード.png', label: 'スタンプ', delay: '0.1s' },
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
                      <Image src={card.image} alt={card.label} fill sizes="32px" className="object-contain" />
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
              { icon: Users, label: 'ドラッグストア業界', color: '#05A847' },
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
      {/* 実績数字セクション（§7-3、DS特化）                                */}
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
            3行でわかる、ドラッグストア×LINEミニアプリで何が変わるか
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
      {/* 課題セクション（§7-4、DS PROBLEMS 3点）                          */}
      {/* ============================================================ */}
      <Section id="problems" spacing="sm" container="wide" background="muted">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            アプリ疲れ・ブロック増加・ブランド分断—LINE移行で解くべき3つの壁。
          </h2>
          <p className="text-base text-muted-foreground">独自アプリと紙カードからの脱却を起点に、配信精度向上とブランド横断の統一会員基盤を実現します。</p>
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
      {/* 訴求セクション（調剤連携3層、DS固有キラー機能）                      */}
      {/* ============================================================ */}
      <Section id="appeal" spacing="md" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            調剤連携3層で、待ち時間を接点に変える。
          </h2>
          <p className="text-base text-muted-foreground">調剤完了通知から始まる3ステップが、ドラッグストア固有のキラー機能です。薬機法ガードレールを設計に組み込み、商談初動から安心して提案できます。</p>
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
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
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
          <p className="text-base text-muted-foreground">SaaSは調剤連携やマルチチェーン統合で詰まり、フルスクラッチは期間とコストが膨らむ。グロースパックは<span className="font-bold text-foreground">速さ・柔軟性・業界固有機能</span>を同時に提供するハーフスクラッチ開発です。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {/* SaaS */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Option A</div>
            <h3 className="text-base font-bold mb-4">SaaS<br /><span className="text-sm font-normal text-muted-foreground">パッケージ型</span></h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-line-green shrink-0" />初期コスト: 低</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-accent-yellow shrink-0" />調剤連携: △</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-accent-yellow shrink-0" />マルチチェーン: △</li>
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
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-line-green shrink-0" />調剤連携: ◎</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-line-green shrink-0" />マルチチェーン: ◎</li>
            </ul>
          </Card>

          {/* スクラッチ */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Option C</div>
            <h3 className="text-base font-bold mb-4">スクラッチ<br /><span className="text-sm font-normal text-muted-foreground">開発</span></h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />初期コスト: 高</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-line-green shrink-0" />調剤連携: ◎</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-line-green shrink-0" />マルチチェーン: ◎</li>
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
                ['調剤連携（完了通知・事前受付）', '△（制約あり）', '◎（3層対応）', '◎（全て対応可）'],
                ['マルチチェーン統合', '△（制約あり）', '○（柔軟に対応）', '◎（全て対応可）'],
                ['立ち上げ期間', '1〜2ヶ月', '最短3ヶ月', '6ヶ月〜'],
                ['POS連携・セグメント配信', '△', '○（購買属性対応）', '◎'],
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
              <p className="text-white font-bold text-lg sm:text-xl">調剤連携の構成について、まずご相談ください。</p>
              <p className="text-white/80 text-sm mt-1">調剤併設の有無・チェーン数・既存システムをお聞きして最適な構成をご提案します。</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-white text-line-green-dark hover:bg-white/90 font-bold"
              >
                <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/?utm_source=organic&utm_medium=lp&utm_campaign=hypothesis-v1&utm_content=drugstore-fatigue#iframe-form" location="midband" destination="contact">
                  無料で相談する
                  <ArrowRight className="w-5 h-5 ml-2" />
                </TrackedExternalLink>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 機能グリッド（§7-6、DS向けタグライン）                             */}
      {/* ============================================================ */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            10の機能アセットから、ドラッグストア向けに選んで組み合わせる。
          </h2>
          <p className="text-base text-muted-foreground">ドラッグストア業界で特に効く6機能。必要なものだけを選び、フェーズを追って拡張できます。</p>
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
                ドラッグストア・薬局業界<br />LINEミニアプリ活用ガイド 2026
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">処方箋来局者のリピート化と、薬機法を踏まえたLINE運用設計。</p>
            </div>
            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center md:w-3/5">
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-line-green mt-0.5 font-bold">✓</span>
                  処方箋来局者のリピート化を阻む要因
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-line-green mt-0.5 font-bold">✓</span>
                  PBとMD連携で動く販促設計
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-line-green mt-0.5 font-bold">✓</span>
                  薬機法とLINE発信ガイドラインの線引き
                </li>
              </ul>
              <WPDownloadButton industry="drugstore" />
            </div>
          </div>
        </div>
      </Section>

      <FaqSection faqs={FAQS} background="white" heading="よくあるご質問" />

      {/* ============================================================ */}
      {/* 最終CTA（§7-10 ダーク背景）                                     */}
      {/* ============================================================ */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green mb-2">
            CONTACT
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            ドラッグストアの顧客接点DXについて、<br />
            <span className="text-line-green">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">調剤併設の有無・チェーン数・既存システムをお聞きして、最適な構成をご提案します。<span className="font-bold text-white">初回相談は無料です。</span></p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" asChild>
              <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/?utm_source=organic&utm_medium=lp&utm_campaign=hypothesis-v1&utm_content=drugstore-fatigue#iframe-form" location="final_primary" destination="contact">
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
        description="クラスメソッド株式会社が提供する LINE ミニアプリ開発サービス。ドラッグストア・薬局の調剤連携・会員証DX・マルチチェーン統合に対応します。"
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
                <li><a href="#problems" className="hover:text-white transition-colors">ドラッグストア業界の課題</a></li>
                <li><a href="#appeal" className="hover:text-white transition-colors">調剤連携3層</a></li>
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
