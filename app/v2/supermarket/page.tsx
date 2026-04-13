/**
 * /v2/supermarket — グロースパック for LINE スーパー・ホームセンター業界向けLP
 *
 * docs/DESIGN.md v2.1 に厳密に従う。
 * app/v2/apparel/page.tsx を雛形として、SM・HC業界固有のコンテンツに差し替え。
 *
 * 訴求の2軸（固定）:
 *   (1) 既存会員活性化（新規導入ではなく既に持っている基盤の活性化）
 *   (2) 紙チラシ削減（経営層フック：年間3,000万〜1億円規模の削減余地）
 *
 * 機能セット（DESIGN §7-6 SM・HC推奨）:
 *   採用: デジタル会員証 / スタンプカード / クーポン配信 / セグメント配信 / 抽選 / ギフト
 *   除外: 予約 / チケット / 1to1コミュニケーション
 *
 * - 価格の具体額は一切記載しない
 * - 最短3ヶ月表記（旧supermarket.tsの「最短1ヶ月」は採用しない）
 * - 和文段落は1行にまとめる（§12 和文改行禁止）
 * - 機能アイコンは /public/images/<機能名>.png を <Image> で表示
 * - CTA リンクは §10 正規 URL
 * - グッデイ公開事例のみ掲載（阪急オアシスは初期リリースでは含めない）
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

// SM・HC業界で実際に効く6機能に絞り込み
// 除外: 予約 / チケット・パス / 1to1コミュニケーション
const FEATURES = [
  // Phase 1
  {
    image: '/images/会員証.png',
    name: 'デジタル会員証',
    tagline: 'レジQRで5秒会員化。シニアでも使いやすいLINEで来店客全員をデジタル会員に。カード忘れによるポイント未付与をゼロにする。',
    phase: 'Step 1',
    id: 'membership',
  },
  {
    image: '/images/スタンプカード.png',
    name: 'スタンプカード',
    tagline: '来店・購買でスタンプ付与。紛失・不正利用のない完全デジタル管理で来店頻度向上と週次来店習慣の形成に直結する。',
    phase: 'Step 1',
    id: 'stamp-card',
  },
  // Phase 2
  {
    image: '/images/クーポン.png',
    name: 'クーポン配信',
    tagline: '折込チラシの代替として、LINEでターゲット配信。来店頻度・購買カテゴリに応じた配信で配信コストを抑えながら効果を最大化する。',
    phase: 'Step 2',
    id: 'coupon',
  },
  {
    image: '/images/セグメント配信.png',
    name: 'セグメント配信',
    tagline: '週1来店層・月1来店層・休眠層に分けて最適な内容を配信。購買カテゴリ別に生鮮・日用品・園芸で訴求を出し分けられる。',
    phase: 'Step 2',
    id: 'segment-delivery',
  },
  {
    image: '/images/抽選.png',
    name: '抽選',
    tagline: '来店・購買金額を条件に抽選イベントを設定。チラシ掲載の抽選企画をデジタルに移行し、集客効果を計測できる形にする。',
    phase: 'Step 2',
    id: 'lottery',
  },
  // Phase 3
  {
    image: '/images/ギフト.png',
    name: 'ギフト',
    tagline: 'ロイヤル会員経由の紹介で新規会員獲得。広告費をかけずに既存会員の口コミを活性化する。',
    phase: 'Step 3',
    id: 'gift',
  },
];

const PROBLEMS = [
  {
    title: '紙チラシコストの増大',
    body: '年間3,000万〜1億円規模の折込チラシ費が損益に直結する。配布エリア外には届かず効果測定もできない。デジタル移行を進めたいがシニア層への対応が課題になっている。',
  },
  {
    title: '会員カード提示率の低迷',
    body: 'カードを持ち歩かない・忘れる顧客が多く会員特典が届かない。ポイント未付与の来店データが蓄積されず顧客行動の全体像が見えない状態が続いている。',
  },
  {
    title: 'シニア層のアプリ離脱',
    body: 'スマホアプリのDL・設定が障壁となりシニア顧客がデジタル施策から取り残される。LINEはシニア世代の利用率が高く、アプリDL不要のLINEミニアプリで解決できる。',
  },
  {
    title: '紙スタンプカードの管理コスト',
    body: '紙スタンプカードの印刷・配布・集計に毎月コストと工数がかかる。紛失・不正利用の対応も現場負荷になっており、デジタル化で運用コストを削減できる。',
  },
  {
    title: '競合店増加による来店頻度低下',
    body: 'ディスカウントストアやEC競合の増加で来店頻度が低下している。スタンプ・クーポン施策を打ちたいが紙運用では管理コストがかかりすぎて継続できない。',
  },
];

const APPEAL_STEPS = [
  {
    step: 'Step 1',
    title: '会員証をスマホに移行',
    description: 'プラスチックカードをLINEミニアプリのデジタル会員証に置き換える。アプリDL不要でレジQRから5秒で会員化。シニア層も含めた既存会員基盤をそのままデジタルに移行できる。',
    icon: '📱',
  },
  {
    step: 'Step 2',
    title: 'チラシをLINEに置き換え',
    description: '折込チラシ情報をLINEのクーポン・セグメント配信に移行する。購買カテゴリ別（生鮮・日用品・園芸など）にターゲットを絞った配信に切り替え、配信コストを削減しながら効果を上げる。',
    icon: '📨',
  },
  {
    step: 'Step 3',
    title: '購買データで施策を精緻化',
    description: '来店頻度・購買カテゴリ・会員ランクをデータで把握し、施策の精度を高める。週1来店層と月1来店層で配信内容を変え、休眠会員への自動フォローで来店を促進する。',
    icon: '📊',
  },
];


const STATS = [
  {
    value: '5',
    unit: '倍',
    label: '会員証提示率（グッデイ実績）',
    sub: 'HC63店舗での月間提示率向上。LINEへの移行で提示忘れをゼロに近づけた結果',
  },
  {
    value: '15',
    unit: '万人',
    label: 'LINEの友だち増加（グッデイ実績）',
    sub: '会員証デジタル化を起点に友だち数が急増。接触可能な顧客基盤が拡大した',
  },
  {
    value: '0',
    unit: '件',
    label: 'スタッフの手作業（クーポン配信）',
    sub: 'セグメント配信は事前設定。紙チラシからデジタルへ全自動移行',
  },
  {
    value: '最短',
    unit: '3ヶ月',
    label: 'フェーズ1の立ち上げ期間',
    sub: '会員証＋スタンプカードの標準構成。既存POSや会員DBとの連携は別途ヒアリング',
  },
];

const FAQS = [
  {
    q: '導入にはどのくらいの期間がかかりますか？',
    a: '会員証とスタンプカードを含む標準構成で最短3ヶ月です。既存POSや会員DBとの連携が必要な場合は4〜6ヶ月が目安になります。まずはヒアリングで現行システム構成をお聞きします。',
  },
  {
    q: '購買カテゴリ別のセグメント配信は具体的にどう使いますか？',
    a: '生鮮食品購買層・日用品購買層・園芸資材購買層などカテゴリ別にセグメントを設定し、それぞれに最適なクーポンやイベント情報を配信できます。週1来店層と月1来店層で内容を変えることも可能です。',
  },
  {
    q: 'シニア層はLINEミニアプリを使えますか？',
    a: 'LINEは70代以上のシニア層でも利用率が高く、アプリDLが不要なLINEミニアプリはシニア向けのデジタル施策として有効です。レジスタッフが案内するQRからその場で会員登録できる設計にすることで導入障壁を下げられます。',
  },
  {
    q: '既存の会員POSや会員DBと連携できますか？',
    a: '対応可能です。既存POSシステムや会員管理DBとのAPI連携実績があります。データ構造とボリュームによって連携方式が変わるため、まずはヒアリングで詳細を確認させてください。',
  },
  {
    q: '紙チラシを完全廃止せずLINEと併用しながら移行できますか？',
    a: '併用移行に対応します。まずLINE会員向けの先行クーポン配信から始め、効果を測定しながら段階的に紙チラシの比率を下げていくアプローチが現実的です。急な全廃ではなく計画的な移行をサポートします。',
  },
];

/* ------------------------------------------------------------------ */
/* 事例                                                                  */
/* ------------------------------------------------------------------ */

const caseStudies = [
  {
    company: 'グッデイ',
    industry: 'ホームセンター（63店舗）',
    metrics: [
      { value: '5倍', label: '会員証提示率（月間）' },
      { value: '15万人', label: '友だち増加' },
      { value: '11万人', label: '会員数増加' },
    ],
    summary: 'プラスチックカードからLINEミニアプリのデジタル会員証に移行。レジQR読み取りで会員証提示率が月間5倍以上に向上した。',
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
  serviceType: 'スーパー・ホームセンター向けLINEミニアプリ開発サービス',
  name: 'グロースパック for LINE（スーパー・ホームセンター向け）',
  description: '既存会員基盤の活性化と紙チラシのLINE配信への移行を実現するLINEミニアプリ開発サービス。ハーフスクラッチ開発で最短3ヶ月で立ち上げます。',
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
    name: 'グロースパック for LINE 機能アセット（SM・HC向け）',
    itemListElement: [
      'デジタル会員証',
      'スタンプカード',
      'クーポン配信',
      'セグメント配信',
      '抽選',
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
      name: 'スーパー・ホームセンター業界',
      item: 'https://lp.growthpackforline.classmethod.net/v2/supermarket',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                  */
/* ------------------------------------------------------------------ */

export default function SupermarketPage() {
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
          <Link href="/v2" className="flex items-center gap-2">
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
            <a href="#case-studies" className="hover:text-[#05A847] transition-colors">事例</a>
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
        {/* 背景: SM・HC実務シーン写真 */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/supermarket-hero.png')" }}
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
                LINEヤフー Technology Partner × グッデイ（HC63店舗）導入実績
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight text-white">
                既存会員を活性化し、<br />
                紙チラシを<span className="text-[#06C755]">LINEに変える。</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">プラスチックカードの提示率低迷、年間数千万円の折込チラシ、シニア層のデジタル離れ。SM・HCの3つの顧客接点課題を、既に持っている会員基盤を活かして解決します。<span className="font-bold text-white">最短3ヶ月</span>で立ち上げ。</p>

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
                {['既存会員基盤をそのまま活性化', '紙チラシのLINE移行対応', '最短3ヶ月導入'].map((t) => (
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
                    <radialGradient id="lineFadeSupermarket" cx="50%" cy="50%" r="50%">
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
                  <circle cx="250" cy="280" r="140" fill="url(#lineFadeSupermarket)" />
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
                          <div className="text-[9px] text-[#05A847] font-bold">今週のチラシ</div>
                          <div className="text-[10px] text-[#1F2937]">週末限定クーポン</div>
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
                  { top: '45%', right: '-10%', image: '/images/セグメント配信.png', label: 'セグメント', delay: '0.3s' },
                  { bottom: '10%', left: '5%', image: '/images/抽選.png', label: '抽選', delay: '0.4s' },
                  { bottom: '10%', right: '5%', image: '/images/ギフト.png', label: 'ギフト', delay: '0.5s' },
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
              { icon: Users, label: 'グッデイ（HC63店舗）導入実績', color: '#05A847' },
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
      {/* 実績数字セクション（§7-3、SM・HC特化）                             */}
      {/* ============================================================ */}
      <Section spacing="sm" container="wide" background="white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB] border border-[#E5E7EB] rounded-xl overflow-hidden">
          {STATS.map(({ value, unit, label, sub }) => (
            <div key={label} className="px-6 py-8 text-center bg-white">
              <div className="text-3xl sm:text-4xl font-bold text-[#1F2937] leading-none mb-1">
                {value}<span className="text-xl sm:text-2xl text-[#05A847] ml-1">{unit}</span>
              </div>
              <div className="text-sm font-semibold text-[#1F2937] mt-3 mb-1">{label}</div>
              <div className="text-xs text-[#6B7280] leading-relaxed">{sub}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#9CA3AF] text-center mt-4">※ グッデイの実績は公開情報に基づく数値です。チラシコスト削減余地は業界の一般的な目安です。導入効果は企業規模・既存システム・施策設計によって異なります。</p>
      </Section>

      {/* ============================================================ */}
      {/* 課題セクション（§7-4）                                          */}
      {/* ============================================================ */}
      <Section id="problems" spacing="sm" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            CHALLENGES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            SM・HC企業が「このままでは限界だ」と感じる、5つの壁。
          </h2>
          <p className="text-base text-[#4B5563]">個別施策では解決できない、スーパー・ホームセンター業界の構造的な課題です。</p>
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
      {/* 訴求セクション（SM・HC固有 3ステップ訴求）                          */}
      {/* ============================================================ */}
      <Section id="appeal" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            HOW IT WORKS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            3つのステップで、既存会員基盤を収益に変える。
          </h2>
          <p className="text-base text-[#4B5563]">新規導入ではなく、今すでに持っている会員基盤を活性化するアプローチです。会員証のデジタル移行から始め、チラシをLINEに置き換え、購買データで施策を精緻化する。</p>
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
          <p className="text-base text-[#4B5563]">SaaSは既存POSや会員DBとの連携で詰まり、フルスクラッチは期間とコストが膨らむ。グロースパックは<span className="font-bold text-[#1F2937]">速さ・柔軟性・既存システム連携</span>を同時に提供するハーフスクラッチ開発です。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {/* SaaS */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Option A</div>
            <h3 className="text-base font-bold mb-4">SaaS<br /><span className="text-sm font-normal text-[#6B7280]">パッケージ型</span></h3>
            <ul className="text-sm text-[#6B7280] space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />初期コスト: 低</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />POS連携: △</li>
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
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />POS連携: ◎</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />拡張性: ○ / サポート: ○</li>
            </ul>
          </Card>

          {/* スクラッチ */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Option C</div>
            <h3 className="text-base font-bold mb-4">スクラッチ<br /><span className="text-sm font-normal text-[#6B7280]">開発</span></h3>
            <ul className="text-sm text-[#6B7280] space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />初期コスト: 高</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />POS連携: ◎</li>
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
              <p className="text-white font-bold text-lg sm:text-xl">どの構成がSM・HC事業に合うか、まずご相談ください。</p>
              <p className="text-white/80 text-sm mt-1">店舗数・既存会員DBの規模・POSシステムをお聞きして最適な構成をご提案します。</p>
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
      {/* 機能グリッド（§7-6、SM・HC向けタグライン）                          */}
      {/* ============================================================ */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            10の機能アセットから、SM・HC向けに選んで組み合わせる。
          </h2>
          <p className="text-base text-[#4B5563]">SM・HC業界で特に効く6機能。予約・チケット・1to1は業態に合わないため除外し、会員活性化とチラシ移行に特化した構成にしています。</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((f) => {
            const phaseColor =
              f.phase === 'Step 1'
                ? 'bg-[#E8F8F0] text-[#05A847]'
                : f.phase === 'Step 2'
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
      </Section>

      {/* ============================================================ */}
      {/* 事例セクション（グッデイ公開事例のみ）                              */}
      {/* ============================================================ */}
      <Section id="case-studies" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            CASE STUDY
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            導入事例
          </h2>
          <p className="text-base text-[#4B5563]">HC業界でのLINEミニアプリ導入実績です。</p>
        </div>
        <div className="grid md:grid-cols-1 gap-6 max-w-[900px]">
          {caseStudies.map((c) => (
            <Card key={c.company} variant="elevated" padding="lg" rounded="xl">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                <div className="md:w-1/3">
                  <div className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider mb-1">COMPANY</div>
                  <h3 className="text-xl font-bold text-[#1F2937] mb-1">{c.company}</h3>
                  <p className="text-sm text-[#6B7280]">{c.industry}</p>
                </div>
                <div className="md:w-2/3">
                  <div className="grid grid-cols-3 gap-4 mb-5">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[#05A847]">{m.value}</div>
                        <div className="text-xs text-[#6B7280] mt-1 leading-tight">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-[#4B5563] leading-relaxed">{c.summary}</p>
                </div>
              </div>
            </Card>
          ))}
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
            SM・HCの会員活性化とチラシDXについて、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">店舗数・現行会員DB・POSシステムをお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供する LINE ミニアプリ開発サービス。SM・HC業界の既存会員活性化と紙チラシのLINE移行に対応します。</p>
            </div>

            {/* サービス */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">SERVICE</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">機能一覧</a></li>                <li><a href="#positioning" className="hover:text-white transition-colors">ハーフスクラッチとは</a></li>
              </ul>
            </div>

            {/* リソース */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">RESOURCES</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#problems" className="hover:text-white transition-colors">SM・HC業界の課題</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">導入事例</a></li>
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
                href="https://classmethod.jp/services/line/line-apps/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                グロースパック for LINE
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
