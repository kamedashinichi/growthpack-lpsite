/**
 * /v2/sports — グロースパック for LINE スポーツ・エンタメ業界向けLP
 *
 * docs/DESIGN.md v2.1 に厳密に従う。
 * app/v2/apparel/page.tsx をベースに、スポーツ・エンタメ業界固有のコンテンツへ差し替え。
 *
 * 訴求軸（15社調査・Issue #38/#50/#84/#85 確定）:
 *   コアファン vs ライト層の対比を中心に構成。
 *   ライト層（年1-2回来場）の接点創出・育成フローが業界共通の未解決課題。
 *
 * - 価格の具体額は一切記載しない
 * - 和文段落は1行にまとめる（§12 和文改行禁止）
 * - 機能アイコンは /public/images/<機能名>.png を <Image> で表示
 * - CTA リンクは §10 正規 URL
 * - 独自アプリを否定しない。LINEとの補完レイヤーとして位置付ける
 */
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
import { TrackedExternalLink } from './tracking';
import { ScrollTracker } from './scroll-tracker';

/* ------------------------------------------------------------------ */
/* DATA                                                                  */
/* ------------------------------------------------------------------ */

// スポーツ・エンタメ業界で特に効く6機能（QR+ポイント統合を先頭に）
const FEATURES = [
  // Phase 1
  {
    image: '/images/会員証.png',
    name: 'デジタル会員証',
    tagline: 'QRコード対応のデジタル会員証。アプリDL不要でライト層を即座にデータ化できます。',
    phase: 'Phase 1',
    id: 'membership',
  },
  {
    image: '/images/チケット.png',
    name: 'チケット・パス',
    tagline: 'チケット先行販売・試合当日パスをLINEで完結。ライト層の来場ハードルを下げます。',
    phase: 'Phase 1',
    id: 'ticket',
  },
  // Phase 2
  {
    image: '/images/抽選.png',
    name: '抽選',
    tagline: '限定グッズ・先行チケットの公平な電子抽選。手作業の属人化を解消します。',
    phase: 'Phase 2',
    id: 'lottery',
  },
  {
    image: '/images/スタンプカード.png',
    name: 'スタンプカード',
    tagline: '来場スタンプで次の来場動機を設計。試合・公演日以外の接点を作ります。',
    phase: 'Phase 2',
    id: 'stamp-card',
  },
  {
    image: '/images/クーポン.png',
    name: 'クーポン配信',
    tagline: '来場頻度・会員ランク別の特典配信。ライト層とコアファンで施策を出し分けます。',
    phase: 'Phase 2',
    id: 'coupon',
  },
  // Phase 3
  {
    image: '/images/セグメント配信.png',
    name: 'セグメント配信',
    tagline: '払っているが来ない会員（幽霊会員）を再活性化するセグメント別メッセージ配信。',
    phase: 'Phase 3',
    id: 'segment-delivery',
  },
];

const PROBLEMS = [
  {
    title: 'コアファンは整備済み、ライト層への接点がゼロ',
    body: '年1-2回来場のライト層はデジタルデータがほぼ存在しない。既存アプリはコアファン向けで、ライト層はDLすら起きていません。',
  },
  {
    title: '独自アプリとLINE公式が並立し、顧客データが分散',
    body: '12社中12社が独自アプリを保有しながらLINEも運用。会員IDが分散して本部管理コストが増大しています。',
  },
  {
    title: '払っているが来ない会員の離脱をメール・DMで止められない',
    body: 'フィットネス・スポーツクラブ共通の構造課題。解約のタイミングを捉えた自動フォローが機能していません。',
  },
  {
    title: 'チケット先行抽選・限定グッズ配布が手作業で属人化',
    body: '公平性の担保と当選通知がスプレッドシートと人力で回っている。ミスやクレームが発生しやすい状態です。',
  },
  {
    title: '試合・公演当日以外にファンとの接点がなく、来場動機を作れない',
    body: 'オフシーズンや公演間のコミュニケーションが途切れる。来場スタンプや先行情報で日常的な接点が必要です。',
  },
];

const APPEAL_STEPS = [
  {
    step: 'Step 1',
    title: 'ライト層をLINEで捕まえる',
    description: '会員証とチケット・パスで、これまでデータがなかったライト層（年1-2回来場）をLINE IDに紐づけます。独自アプリを持っているファンはそのまま継続利用、ライト層はLINEが窓口になります。',
    icon: '📱',
  },
  {
    step: 'Step 2',
    title: '来場動機を設計する',
    description: 'チケット先行抽選・限定グッズ配布・来場スタンプを組み合わせ、次の来場理由を継続的に作ります。試合・公演日以外にもLINEで接点を持ち続けることがライト層育成の核心です。',
    icon: '🎫',
  },
  {
    step: 'Step 3',
    title: '払っているが来ない会員を再活性化する',
    description: 'セグメント配信で幽霊会員を検知し、自動フォローで解約前に介入します。解約1件を阻止するコストは新規獲得よりはるかに小さく、フィットネス業界では最も即効性の高い施策です。',
    icon: '🔄',
  },
];

const PHASES = [
  {
    phase: 'Phase 1',
    label: 'ライト層接点の創出',
    features: ['デジタル会員証', 'チケット・パス'],
    description: 'まず「つながる」土台を作ります。LINEでライト層をデータ化し、独自アプリとの二層運用を整備します。',
  },
  {
    phase: 'Phase 2',
    label: '来場動機の設計',
    features: ['抽選', 'スタンプカード', 'クーポン配信'],
    description: '先行抽選・来場スタンプ・セグメント別特典で次の来場理由を作ります。ライト層の来場頻度を引き上げます。',
  },
  {
    phase: 'Phase 3',
    label: '幽霊会員の再活性化と関係性深化',
    features: ['セグメント配信'],
    description: '来場データと会員ステータスを掛け合わせて幽霊会員を特定し、自動フォローで解約を防ぎます。',
  },
];

const STATS = [
  {
    value: 'アプリ',
    unit: 'DL不要',
    label: 'LINEでライト層を即データ化',
    sub: 'インストール不要。QRから会員登録が完了',
  },
  {
    value: 'ほぼ',
    unit: '0%',
    label: 'ライト層のデータ化率（業界現状）',
    sub: '15社調査で大多数がライト層接点ゼロ',
  },
  {
    value: '最短',
    unit: '3ヶ月',
    label: 'Phase 1立ち上げ期間',
    sub: '会員証＋チケット・パスを含む標準構成',
  },
  {
    value: '独自アプリ',
    unit: '併用対応',
    label: '既存アプリとの並行運用サポート',
    sub: 'LINEはライト層向け補完レイヤーとして機能',
  },
];

const FAQS = [
  {
    q: '独自アプリを既に持っているが、LINE併用は必要か？',
    a: '独自アプリはコアファン向けに維持しつつ、ライト層（年1-2回来場）の接点としてLINEを補完レイヤーとして使う構成を推奨しています。DL不要のLINEはライト層の会員化率が大幅に改善するため、両立することで全体の顧客基盤が広がります。',
  },
  {
    q: '払っているが来ない会員（幽霊会員）の離脱率を下げる仕組みはどう作るのか？',
    a: '来場データと在籍期間をもとに離脱リスクの高い会員をセグメント化し、自動フォローメッセージを送る仕組みを設計します。解約1件を阻止するコストは新規獲得よりも小さく、フィットネス業界では特に即効性の高い施策です。',
  },
  {
    q: 'チケット先行抽選の公平性はどう担保するのか？',
    a: '電子抽選機能で当選ロジックをシステム化し、手作業の介在を排除します。当選通知から受け取りまでLINEで完結するため、クレームリスクと運用工数を同時に削減できます。',
  },
  {
    q: 'フィットネス・プロスポーツ・エンタメで提案内容は変わるのか？',
    a: '変わります。フィットネスは幽霊会員の解約防止が主軸、プロスポーツはチケット先行・来場スタンプによるライト層育成、エンタメはグッズ抽選・公演当日パスが有効です。業態・会員構成に合わせてフェーズ設計を調整します。',
  },
  {
    q: '既存のチケッティングシステム・会員管理システムとの連携は可能か？',
    a: '対応します。既存の会員管理・チケッティング・ポイント管理システムとのAPI連携を設計します。システム構成と連携方式はヒアリング後に個別でご提案します。',
  },
  {
    q: '実装期間と立ち上げ後の運用体制について教えてほしい。',
    a: 'Phase 1（会員証＋チケット・パス）は最短3ヶ月が目安です。立ち上げ後の運用はクラスメソッドがサポート体制を提供します。セグメント配信等の設定変更はダッシュボードから自社で運用できる構成を基本とします。',
  },
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
  serviceType: 'スポーツ・エンタメ業界向けLINEミニアプリ開発サービス',
  name: 'グロースパック for LINE（スポーツ・エンタメ業界向け）',
  description:
    'コアファンは整備済み、ライト層はゼロ。年1-2回来場のファンを育てる接点インフラをLINEで構築。チケット先行抽選・来場スタンプ・幽霊会員再活性化をハーフスクラッチで実現し、最短3ヶ月で立ち上げます。',
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
      name: 'スポーツ・エンタメ業界',
      item: 'https://lp.growthpackforline.classmethod.net/v2/sports',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                  */
/* ------------------------------------------------------------------ */

export default function SportsPage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
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
      <ScrollTracker />

      {/* ============================================================ */}
      {/* Header                                                         */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/v2/sports" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#06C755] flex items-center justify-center text-white font-bold text-sm">
              G
            </div>
            <div className="flex items-center gap-1">
              <span className="text-base md:text-lg font-bold text-[#1F2937]">グロースパック</span>
              <span className="text-sm md:text-base text-[#6B7280]"> for </span>
              <span className="text-base md:text-lg font-bold text-[#06C755]">LINE</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#1F2937]">
            <a href="#problems" className="hover:text-[#05A847] transition-colors">課題</a>
            <a href="#appeal" className="hover:text-[#05A847] transition-colors">訴求</a>
            <a href="#features" className="hover:text-[#05A847] transition-colors">機能</a>
            <a href="#phases" className="hover:text-[#05A847] transition-colors">導入ステップ</a>
            <a href="#faq" className="hover:text-[#05A847] transition-colors">FAQ</a>
          </nav>
          <Button variant="primary" size="sm" asChild>
            <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="header" destination="contact">お問い合わせ</TrackedExternalLink>
          </Button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* Hero — ダーク放射型（§7-1）                                      */}
      {/* ============================================================ */}
      <div className="relative min-h-[560px] md:min-h-[700px] flex items-center bg-[#0a0a0a] overflow-hidden">
        {/* 背景: スポーツ・エンタメシーン写真 */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/sports-hero.png')" }}
        />
        {/* ダークオーバーレイ（左濃→右薄） */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.70) 45%, rgba(10,10,10,0.35) 85%, rgba(10,10,10,0.15) 100%), radial-gradient(ellipse 60% 60% at 85% 100%, rgba(6,199,85,0.18) 0%, transparent 70%)',
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#06C755]/20 border border-[#06C755]/50 rounded-full text-xs sm:text-sm font-semibold text-[#06C755]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06C755] shrink-0" />
                LINEヤフー Technology Partner × スポーツ・エンタメ業界 15社以上調査実績
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight text-white">
                コアファンは整備済み。<br />
                ライト層を<span className="text-[#06C755]">育てる。</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">年1-2回来場のファンが、デジタルデータとして存在しない。チケット先行・来場スタンプ・幽霊会員再活性化を組み合わせたライト層育成インフラを、<span className="font-bold text-white">最短3ヶ月</span>で立ち上げます。</p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button variant="primary" size="lg" asChild>
                  <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="hero_primary" destination="contact">
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
                {['ライト層育成フロー設計', '独自アプリとの併用対応', '最短3ヶ月導入'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#06C755]" />
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
                    <radialGradient id="lineFadeSports" cx="50%" cy="50%" r="50%">
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
                  <circle cx="250" cy="280" r="140" fill="url(#lineFadeSports)" />
                </svg>

                {/* 中心スマホ */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px]">
                  <div className="bg-[#111] rounded-[28px] p-1.5 shadow-[0_20px_60px_rgba(6,199,85,0.25)] border border-white/10">
                    <div className="bg-white rounded-[22px] overflow-hidden">
                      <div className="h-10 bg-[#06C755] flex items-center px-4 gap-2">
                        <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center text-white font-bold text-[10px]">G</div>
                        <span className="text-white text-xs font-bold">グロースパック</span>
                      </div>
                      <div className="p-3 space-y-2.5 bg-[#F8F9FA]">
                        <div className="bg-white rounded-lg p-3 border border-[#E5E7EB] shadow-sm">
                          <div className="text-[9px] text-[#05A847] font-bold mb-1 uppercase tracking-wider">MEMBERSHIP</div>
                          <div className="font-bold text-[#1F2937] text-xs mb-2">デジタル会員証</div>
                          <div className="h-10 bg-white rounded border border-[#E5E7EB] flex flex-col items-center justify-center gap-0.5 px-2">
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
                            <div className="text-[7px] tracking-[0.15em] text-[#6B7280] font-mono">4901234 567890</div>
                          </div>
                        </div>
                        <div className="bg-[#E8F8F0] rounded-md px-2 py-1.5 border border-[#06C755]/20">
                          <div className="text-[9px] text-[#05A847] font-bold">チケット先行</div>
                          <div className="text-[10px] text-[#1F2937]">抽選エントリー受付中</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6つの接点カード */}
                {[
                  { top: '10%', left: '5%', image: '/images/会員証.png', label: '会員証', delay: '0s' },
                  { top: '10%', right: '5%', image: '/images/チケット.png', label: 'チケット', delay: '0.1s' },
                  { top: '45%', left: '-10%', image: '/images/抽選.png', label: '抽選', delay: '0.2s' },
                  { top: '45%', right: '-10%', image: '/images/クーポン.png', label: 'クーポン', delay: '0.3s' },
                  { bottom: '10%', left: '5%', image: '/images/スタンプカード.png', label: 'スタンプ', delay: '0.4s' },
                  { bottom: '10%', right: '5%', image: '/images/セグメント配信.png', label: '配信', delay: '0.5s' },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="absolute bg-white/95 backdrop-blur rounded-xl border border-white/30 shadow-[0_8px_24px_rgba(0,0,0,0.3)] p-3 w-[110px] flex flex-col items-center gap-1 animate-fade-in"
                    style={{
                      top: card.top,
                      bottom: card.bottom,
                      left: card.left,
                      right: card.right,
                      animationDelay: card.delay,
                    }}
                  >
                    <div className="relative w-8 h-8">
                      <Image src={card.image} alt={card.label} fill className="object-contain" />
                    </div>
                    <div className="text-[11px] font-bold text-[#1F2937]">{card.label}</div>
                  </div>
                ))}

                <div className="absolute top-0 right-0 w-32 h-32 bg-[#06C755] rounded-full opacity-10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#06C755] rounded-full opacity-10 blur-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 信頼バッジ帯（§7-2）                                            */}
      {/* ============================================================ */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: ShieldCheck, label: 'LINEヤフー Technology Partner', color: '#06C755' },
              { icon: Award, label: 'AWS Premier Tier Services Partner', color: '#FF9900' },
              { icon: ShieldCheck, label: 'ISO 27001 取得（クラスメソッド）', color: '#3B82F6' },
              { icon: Users, label: 'スポーツ・エンタメ 15社以上 業界調査実績', color: '#05A847' },
              { icon: Users, label: 'ハーフスクラッチで柔軟対応', color: '#05A847' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-semibold text-[#1F2937] whitespace-nowrap">
                <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 実績数字セクション（§7-3、スポーツ・エンタメ特化）                    */}
      {/* ============================================================ */}
      <Section spacing="sm" container="wide" background="white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB] border border-[#E5E7EB] rounded-xl overflow-hidden">
          {STATS.map(({ value, unit, label, sub }) => (
            <div key={label} className="px-6 py-8 text-center bg-white">
              <div className="text-4xl sm:text-5xl font-bold text-[#1F2937] leading-none mb-1">
                {value}<span className="text-2xl sm:text-3xl text-[#05A847] ml-1">{unit}</span>
              </div>
              <div className="text-sm font-semibold text-[#1F2937] mt-3 mb-1">{label}</div>
              <div className="text-xs text-[#6B7280] leading-relaxed">{sub}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#9CA3AF] text-center mt-4">※ 業界内で報告されている事例に基づく参考値です。導入効果は企業規模・既存システム・施策設計によって異なります。</p>
      </Section>

      {/* ============================================================ */}
      {/* 課題セクション（§7-4）                                           */}
      {/* ============================================================ */}
      <Section id="problems" spacing="sm" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            CHALLENGES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            スポーツ・エンタメのDX担当者が「限界だ」と感じる、5つの壁。
          </h2>
          <p className="text-base text-[#4B5563]">個別ツールでは解決できない、スポーツ・エンタメ業界の構造的な課題です。</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {PROBLEMS.map((p) => (
            <Card key={p.title} padding="md" className="border-l-4 border-l-[#06C755]">
              <h3 className="text-base sm:text-lg font-bold text-[#1F2937] mb-2">{p.title}</h3>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 訴求セクション（3ステップ: ライト層育成フロー）                      */}
      {/* ============================================================ */}
      <Section id="appeal" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            HOW IT WORKS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            3つのステップで、ライト層を育てる。
          </h2>
          <p className="text-base text-[#4B5563]">LINEで捕まえる→来場動機を設計する→幽霊会員を再活性化する。コアファン施策とは独立したライト層育成フローです。</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {APPEAL_STEPS.map((s, i) => (
            <Card key={s.step} variant="elevated" padding="lg" rounded="xl" className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#05A847] text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {i + 1}
                </div>
                <div>
                  <div className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider">{s.step}</div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">{s.title}</h3>
                </div>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed">{s.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* ポジショニング（§7-5）                                          */}
      {/* ============================================================ */}
      <Section id="positioning" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            WHY GROWTHPACK
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            SaaSとスクラッチ、その中間に。
          </h2>
          <p className="text-base text-[#4B5563]">SaaSは独自アプリとの連携やセグメント設計で詰まり、フルスクラッチは期間とコストが膨らむ。グロースパックは<span className="font-bold text-[#1F2937]">速さ・柔軟性・既存システム連携</span>を同時に提供するハーフスクラッチ開発です。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {/* SaaS */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Option A</div>
            <h3 className="text-base font-bold mb-4">SaaS<br /><span className="text-sm font-normal text-[#6B7280]">パッケージ型</span></h3>
            <ul className="text-sm text-[#6B7280] space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />初期コスト: 低</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />既存システム連携: △</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />拡張性: △</li>
            </ul>
          </Card>

          {/* Growthpack */}
          <Card variant="accent" padding="md" className="ring-2 ring-[#06C755] shadow-lg relative">
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-[#05A847] text-white text-xs font-bold rounded-sm">
              RECOMMENDED
            </div>
            <div className="text-xs font-semibold text-[#05A847] uppercase tracking-wider mb-3">Growthpack</div>
            <h3 className="text-base font-bold mb-4">ハーフスクラッチ<br /><span className="text-sm font-normal text-[#05A847]">開発</span></h3>
            <ul className="text-sm text-[#1F2937] space-y-2 font-medium">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />初期コスト: 中</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />既存システム連携: ◎</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />拡張性: ○ / サポート: ○</li>
            </ul>
          </Card>

          {/* スクラッチ */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Option C</div>
            <h3 className="text-base font-bold mb-4">スクラッチ<br /><span className="text-sm font-normal text-[#6B7280]">開発</span></h3>
            <ul className="text-sm text-[#6B7280] space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />初期コスト: 高</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />既存システム連携: ◎</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />拡張性: ◎</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* 中盤CTA帯 */}
      <div className="bg-[#05A847] py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-lg sm:text-xl">ライト層育成の構成について、まずご相談ください。</p>
              <p className="text-white/80 text-sm mt-1">業態・会員構成・既存システムをお聞きして最適な構成をご提案します。</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-white text-[#05A847] hover:bg-white/90 font-bold"
              >
                <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="midband" destination="contact">
                  無料で相談する
                  <ArrowRight className="w-5 h-5 ml-2" />
                </TrackedExternalLink>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 機能グリッド（§7-6、スポーツ・エンタメ向けタグライン）               */}
      {/* ============================================================ */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            10の機能アセットから、スポーツ・エンタメ向けに選んで組み合わせる。
          </h2>
          <p className="text-base text-[#4B5563]">スポーツ・エンタメ業界で特に効く6機能。必要なものだけを選び、フェーズを追って拡張できます。</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((f) => {
            const phaseColor =
              f.phase === 'Phase 1'
                ? 'bg-[#E8F8F0] text-[#05A847]'
                : f.phase === 'Phase 2'
                ? 'bg-[#FEF3C7] text-[#B45309]'
                : 'bg-[#EDE9FE] text-[#6D28D9]';
            return (
              <Card key={f.id} padding="md">
                <div className="flex items-start gap-4 mb-3">
                  <div className="shrink-0 relative w-11 h-11">
                    <Image src={f.image} alt={f.name} fill className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">{f.name}</h3>
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${phaseColor}`}>
                      {f.phase}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed">{f.tagline}</p>
              </Card>
            );
          })}
        </div>
        <div className="mt-8 text-center text-sm text-[#6B7280]">
          ※ 各機能は選んだ組み合わせと外部システム連携の有無により個別見積もりとなります。
        </div>
      </Section>

      {/* ============================================================ */}
      {/* Phase ロードマップ（§7-7）                                       */}
      {/* ============================================================ */}
      <Section id="phases" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            ROADMAP
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            3フェーズで段階的に育てる。
          </h2>
          <p className="text-base text-[#4B5563]">ライト層接点の創出→来場動機の設計→幽霊会員の再活性化。各フェーズが次のデータ基盤になります。</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-10 left-[calc(33.333%+0px)] right-[calc(33.333%+0px)] h-0.5 bg-[#E5E7EB] z-0" />
          <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative z-10">
            {PHASES.map((p, i) => (
              <Card key={p.phase} variant="elevated" padding="lg" rounded="xl" className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#05A847] text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider">{p.phase}</div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">{p.label}</h3>
                  </div>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-4">{p.description}</p>
                <div className="pt-4 border-t border-[#E5E7EB] space-y-1.5">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-[#1F2937]">
                      <Check className="w-4 h-4 text-[#06C755] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* FAQ（§7-9）                                                    */}
      {/* ============================================================ */}
      <Section id="faq" spacing="md" container="default" background="white">
        <div className="mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            よくあるご質問
          </h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <Card key={f.q} padding="md">
              <h3 className="text-base sm:text-lg font-bold text-[#1F2937] mb-2 flex items-start gap-2">
                <span className="text-[#06C755] shrink-0 font-bold">Q.</span>
                {f.q}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed pl-6">{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 最終CTA（§7-10 ダーク背景）                                     */}
      {/* ============================================================ */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#06C755] mb-2">
            CONTACT
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            ライト層育成の仕組みについて、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">業態・会員構成・既存システムをお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" asChild>
              <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="final_primary" destination="contact">
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
      <footer className="bg-[#0a0a0a] text-white/80 py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 md:gap-10 mb-10">
            {/* ブランド */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#06C755] flex items-center justify-center text-white font-bold text-sm">G</div>
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-white">グロースパック</span>
                  <span className="text-sm text-white/50"> for </span>
                  <span className="text-base font-bold text-[#06C755]">LINE</span>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。スポーツ・エンタメ業界のライト層育成・チケット先行・幽霊会員再活性化に対応します。</p>
            </div>

            {/* サービス */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">SERVICE</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">機能一覧</a></li>
                <li><a href="#phases" className="hover:text-white transition-colors">導入ロードマップ</a></li>
                <li><a href="#positioning" className="hover:text-white transition-colors">ハーフスクラッチとは</a></li>
              </ul>
            </div>

            {/* リソース */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">RESOURCES</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#problems" className="hover:text-white transition-colors">スポーツ・エンタメ業界の課題</a></li>
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
              </ul>
            </div>

            {/* お問い合わせ */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">CONTACT</div>
              <ul className="space-y-2 text-sm text-white/60">
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
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>© Classmethod, Inc.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://classmethod.jp/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                プライバシーポリシー
              </a>
              <a
                href="https://classmethod.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                会社情報
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
