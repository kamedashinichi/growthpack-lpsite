/**
 * /v2/food — グロースパック for LINE 飲食業界向けLP
 *
 * docs/DESIGN.md v2.1 に厳密に従う。
 * app/v2/apparel/page.tsx を雛形として、飲食業界固有のコンテンツに差し替え。
 *
 * 訴求3軸: 行列（時間）× リピート（頻度）× テイクアウト（チャネル）
 *
 * 課題セクション（飲食5点セット）:
 *   1. 行列×人手不足  2. 紙スタンプの限界  3. テイクアウト手数料
 *   4. 複数ブランド分断  5. 幽霊会員・休眠会員
 *
 * - 価格の具体額は一切記載しない
 * - 和文段落は1行にまとめる（§12 和文改行禁止）
 * - 機能アイコンは /public/images/<機能名>.png を <Image> で表示
 * - CTA リンクは §10 正規 URL
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

// 飲食業界で特に効く7機能に絞り込み（DESIGN §7-6 推奨: 会員証/順番待ち/スタンプ/クーポン/セグメント配信/予約）
// 1to1は飲食では優先度低めだが、マルチブランドCRM文脈で追加
const FEATURES = [
  // Phase 1
  {
    image: '/images/会員証.png',
    name: 'デジタル会員証',
    tagline: 'アプリDL不要、5秒で会員化。マルチブランドを1つのIDで統合。',
    phase: 'Step 1',
    id: 'membership',
  },
  {
    image: '/images/順番待ち.png',
    name: '順番待ち',
    tagline: '行列をLINE通知に変換。「並ばなくていい体験」でロイヤルティ向上。',
    phase: 'Step 1',
    id: 'queue',
  },
  // Phase 2
  {
    image: '/images/スタンプカード.png',
    name: 'スタンプカード',
    tagline: '紙カード紛失ゼロ。来店データが蓄積され再来店サイクルを設計できる。',
    phase: 'Step 2',
    id: 'stamp-card',
  },
  {
    image: '/images/クーポン.png',
    name: 'クーポン配信',
    tagline: '来店頻度と購買履歴に応じた配信。テイクアウト誘導にも活用。',
    phase: 'Step 2',
    id: 'coupon',
  },
  {
    image: '/images/予約.png',
    name: '予約',
    tagline: '電話不要のLINE予約で機会損失を防止。ピーク時の着席率を改善。',
    phase: 'Step 2',
    id: 'reservation',
  },
  // Phase 3
  {
    image: '/images/セグメント配信.png',
    name: 'セグメント配信',
    tagline: '来店間隔・業態・注文パターンで配信を出し分け。休眠会員の掘り起こしに。',
    phase: 'Step 3',
    id: 'segment-delivery',
  },
  {
    image: '/images/1to1.png',
    name: '1to1コミュニケーション',
    tagline: 'マルチブランドのCRM基盤として、複数業態にまたがる顧客データを一元管理。',
    phase: 'Step 3',
    id: 'one-to-one',
  },
];

const PROBLEMS = [
  {
    title: '行列×人手不足：繁忙時間の客離れに手が打てない',
    body: '混雑のピーク時に行列が伸びるほど客が離れるが、デジタルで解消する手段がない。LINEの順番待ち通知で「並ばなくていい体験」を提供できます。',
  },
  {
    title: '紙スタンプの限界：顧客データが蓄積されない',
    body: '紙スタンプカードは紛失・不正・来店確認不可の三重苦。デジタル化すれば来店履歴・頻度・好みが蓄積され、次の施策に活用できます。',
  },
  {
    title: 'テイクアウト・デリバリー手数料：マージンが圧迫される',
    body: 'デリバリープラットフォーム依存で手数料が経営を圧迫。LINEを起点にした自社テイクアウト導線を整備し、プラットフォーム手数料依存から脱却できます。',
  },
  {
    title: '複数ブランドのLINE乱立：管理コストが膨張する',
    body: 'グループ内の複数ブランドでLINE公式アカウントが乱立し、会員基盤が分断。ハーフスクラッチなら1つのLINE会員基盤でブランドを横断管理できます。',
  },
  {
    title: '幽霊会員・休眠会員：登録後に来店しない顧客を可視化できない',
    body: '登録だけして来店しない顧客の割合が見えず、育成施策が打てない。セグメント配信で「来店間隔が空いた顧客」だけに特別クーポンを自動配信できます。',
  },
];

const APPEAL_STEPS = [
  {
    step: 'Step 1',
    title: '待ち時間の可視化',
    description: '順番待ちLINE通知で「並ばなくていい体験」を実現。行列をデジタルの接点に変換し、顧客ロイヤルティの改善につなげます。',
    icon: '⏱',
  },
  {
    step: 'Step 2',
    title: '再来店の設計',
    description: 'スタンプカード＋クーポン配信で「また行きたい」サイクルを仕組みで回します。来店間隔が空いた顧客への自動フォローも設計できます。',
    icon: '🔄',
  },
  {
    step: 'Step 3',
    title: 'テイクアウト自社化',
    description: 'LINEを起点にしたテイクアウト・予約導線を整備。デリバリープラットフォームへの手数料依存を減らし、自社の顧客接点を強化します。',
    icon: '📦',
  },
];


const STATS = [
  {
    value: 'DL不要',
    unit: '',
    label: 'LINEだけで会員化が完結',
    sub: 'インストール不要。マルチブランドを1つのIDで統合',
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
    sub: '来店間隔が空いた顧客への自動クーポン配信',
  },
  {
    value: '最短',
    unit: '3ヶ月',
    label: 'Step 1の立ち上げ期間',
    sub: '会員証＋順番待ちの標準構成。マルチブランドは4〜6ヶ月',
  },
];

const FAQS = [
  {
    q: '導入期間はどのくらいかかりますか？',
    a: 'Step 1（会員証＋順番待ち）は最短3ヶ月から。スコープや既存システム連携の有無によって異なります。まずはヒアリングしてご提案します。',
  },
  {
    q: '複数ブランドをまとめて管理できますか？',
    a: '1つのLINE会員基盤でブランドを横断管理できるのがグロースパック for LINEの強みです。SaaS系競合では技術的に対応できないケースが多いため、マルチブランド展開の飲食グループに特に適しています。',
  },
  {
    q: '既存POSやモバイルオーダーシステムと連携できますか？',
    a: 'ハーフスクラッチ構造のため柔軟に対応できます。事前にシステム構成をヒアリングし、連携方式を設計します。まずは現在の構成をお聞かせください。',
  },
  {
    q: '業態によって提案内容は変わりますか？',
    a: 'はい。「デリバリー手数料削減型（テイクアウト最適化）」「テーブルオーダー省力化型（ホール人件費削減）」「CRM統合型（マルチブランド顧客統合）」の3パターンで業態に合わせた提案をします。',
  },
  {
    q: '休眠会員の掘り起こしはできますか？',
    a: 'セグメント配信機能で「来店間隔が空いた顧客」だけに特別クーポンを自動配信できます。配信条件や頻度は運用に合わせて設計します。',
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
  serviceType: '飲食業界向けLINEミニアプリ開発サービス',
  name: 'グロースパック for LINE（飲食業界向け）',
  description:
    '行列×リピート×テイクアウトの3軸で、飲食チェーンの顧客接点をLINEミニアプリで実現。順番待ち・スタンプカード・マルチブランド統合に対応するハーフスクラッチ開発で、最短3ヶ月で立ち上げます。',
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
      name: '飲食業界',
      item: 'https://lp.growthpackforline.classmethod.net/v2/food',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                  */
/* ------------------------------------------------------------------ */

export default function FoodPage() {
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
            <a href="#faq" className="hover:text-[#05A847] transition-colors">FAQ</a>
          </nav>
          <Button variant="primary" size="sm" asChild>
            <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="header" destination="contact">お問い合わせ</TrackedExternalLink>
          </Button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* Hero — 写真背景バリエーション（§7-1b）                            */}
      {/* ============================================================ */}
      <div className="relative min-h-[560px] md:min-h-[700px] flex items-center bg-[#0a0a0a] overflow-hidden">
        {/* 背景: 飲食実務シーン写真 */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/food-hero.png')" }}
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
                LINEヤフー Technology Partner × 飲食チェーン向け
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight text-white">
                行列、リピート、テイクアウト。<br />
                飲食の顧客接点を<span className="text-[#06C755]">LINEで設計する。</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">順番待ちのデジタル化からマルチブランドのCRM統合まで。飲食チェーンの3つの課題軸を、ハーフスクラッチの柔軟性で解きます。<span className="font-bold text-white">最短3ヶ月</span>で立ち上げ。</p>

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
                {['行列×リピート×テイクアウトに対応', 'マルチブランド統合'].map((t) => (
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
                    <radialGradient id="lineFadeFood" cx="50%" cy="50%" r="50%">
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
                  <circle cx="250" cy="280" r="140" fill="url(#lineFadeFood)" />
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
                          <div className="text-[9px] text-[#05A847] font-bold">新着</div>
                          <div className="text-[10px] text-[#1F2937]">スタンプ獲得</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6つの接点カード */}
                {[
                  { top: '10%', left: '5%', image: '/images/会員証.png', label: '会員証', delay: '0s' },
                  { top: '10%', right: '5%', image: '/images/順番待ち.png', label: '順番待ち', delay: '0.1s' },
                  { top: '45%', left: '-10%', image: '/images/予約.png', label: '予約', delay: '0.2s' },
                  { top: '45%', right: '-10%', image: '/images/クーポン.png', label: 'クーポン', delay: '0.3s' },
                  { bottom: '10%', left: '5%', image: '/images/スタンプカード.png', label: 'スタンプ', delay: '0.4s' },
                  { bottom: '10%', right: '5%', image: '/images/セグメント配信.png', label: 'セグメント', delay: '0.5s' },
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
      {/* 実績数字セクション（§7-3、飲食特化）                               */}
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
        <p className="text-xs text-[#9CA3AF] text-center mt-4">※ 導入効果は企業規模・既存システム・施策設計によって異なります。</p>
      </Section>

      {/* ============================================================ */}
      {/* 課題セクション（§7-4、飲食5点セット）                             */}
      {/* ============================================================ */}
      <Section id="problems" spacing="sm" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            CHALLENGES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            飲食チェーンのDX担当者が直面する、5つの構造課題。
          </h2>
          <p className="text-base text-[#4B5563]">個別ツールでは解決できない、飲食業界の構造的な課題です。</p>
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
      {/* 訴求セクション（飲食固有 3ステップ訴求）                            */}
      {/* ============================================================ */}
      <Section id="appeal" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            HOW IT WORKS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            行列・リピート・テイクアウトの3軸で、顧客接点を設計する。
          </h2>
          <p className="text-base text-[#4B5563]">デジタルの接点から始め、再来店を仕組みで回し、自社の収益基盤を強化する。飲食チェーンに合わせた導入順序です。</p>
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
          <p className="text-base text-[#4B5563]">SaaSはマルチブランドや既存POSとの連携で詰まり、フルスクラッチは期間とコストが膨らむ。グロースパックは<span className="font-bold text-[#1F2937]">速さ・柔軟性・マルチブランド対応</span>を同時に提供するハーフスクラッチ開発です。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {/* SaaS */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Option A</div>
            <h3 className="text-base font-bold mb-4">SaaS<br /><span className="text-sm font-normal text-[#6B7280]">パッケージ型</span></h3>
            <ul className="text-sm text-[#6B7280] space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />初期コスト: 低</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />マルチブランド: △</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />POS連携: △</li>
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
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />マルチブランド: ◎</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />POS連携: ○ / 拡張性: ○</li>
            </ul>
          </Card>

          {/* スクラッチ */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Option C</div>
            <h3 className="text-base font-bold mb-4">スクラッチ<br /><span className="text-sm font-normal text-[#6B7280]">開発</span></h3>
            <ul className="text-sm text-[#6B7280] space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />初期コスト: 高</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />マルチブランド: ◎</li>
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
              <p className="text-white font-bold text-lg sm:text-xl">飲食チェーンのシステム構成に合わせて最適な構成をご提案します。</p>
              <p className="text-white/80 text-sm mt-1">業態・ブランド数・既存POSをお聞きして、導入スコープを一緒に設計します。</p>
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
      {/* 機能グリッド（§7-6、飲食向けタグライン）                            */}
      {/* ============================================================ */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            10の機能アセットから、飲食チェーン向けに選んで組み合わせる。
          </h2>
          <p className="text-base text-[#4B5563]">飲食業界で特に効く7機能。必要なものだけを選び、フェーズを追って拡張できます。</p>
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
            飲食チェーンの顧客接点設計について、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">業態・ブランド数・既存POSをお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。飲食業界の順番待ちデジタル化・マルチブランド統合に対応します。</p>
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
                <li><a href="#problems" className="hover:text-white transition-colors">飲食業界の課題</a></li>
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
                href="https://classmethod.jp/services/line/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                LINE総合支援サービス
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
