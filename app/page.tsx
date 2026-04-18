/**
 * /v2 — グロースパック for LINE LPサイト
 *
 * classmethod.jp の視覚DNAを反映した再構築版。
 * docs/DESIGN.md v1.5 に厳密に従う。
 *
 * - ヒーロー: 写真背景 + ダークオーバーレイ + 白テキスト
 * - 信頼バッジ帯 / クライアントロゴ帯 / 実績数字の3層信頼構築
 * - CTA全3箇所に電話番号併記
 * - 共通プリミティブ Button / Section / Card のみ使用
 * - 価格の具体額は一切記載しない
 */
import Link from 'next/link';
import Image from 'next/image';
import { TopHeader } from '@/components/shared/top-header';
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

/* ------------------------------------------------------------------ */
/* DATA                                                                  */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    image: '/images/会員証.png',
    name: 'デジタル会員証',
    tagline: 'アプリDL不要。バーコード提示で5秒つながる次世代会員体験。',
    phase: 'Step 1',
    id: 'membership',
    url: '/memberscard',
  },
  {
    image: '/images/順番待ち.png',
    name: '順番待ち',
    tagline: '待ち時間を会員化のチャンスへ。混雑状況もLINEで配信。',
    phase: 'Step 1',
    id: 'queue',
    url: '/queue',
  },
  {
    image: '/images/予約.png',
    name: '予約',
    tagline: '予約完了から来店後まで、LINEで一貫した顧客体験を設計。',
    phase: 'Step 1',
    id: 'reservation',
    url: '/reservation',
  },
  {
    image: '/images/スタンプカード.png',
    name: 'スタンプカード',
    tagline: '来店履歴が見える、育つ。紛失ゼロのデジタルスタンプ。',
    phase: 'Step 2',
    id: 'stamp-card',
    url: '/stampcard',
  },
  {
    image: '/images/クーポン.png',
    name: 'クーポン配信',
    tagline: 'LINE公式の配信制限を超えた、属性連動のクーポン発行。',
    phase: 'Step 2',
    id: 'coupon',
    url: '/coupon',
  },
  {
    image: '/images/チケット.png',
    name: 'チケット・パス',
    tagline: 'LINEで入場管理まで完結。CRM側で利用状況を可視化。',
    phase: 'Step 2',
    id: 'ticket',
    url: '/ticket',
  },
  {
    image: '/images/抽選.png',
    name: '抽選',
    tagline: '当選体験でエンゲージメントを加速。来店動機に変える。',
    phase: 'Step 2',
    id: 'lottery',
    url: '/lottery',
  },
  {
    image: '/images/セグメント配信.png',
    name: 'セグメント配信',
    tagline: '属性・購買履歴に連動した動的リッチメニュー対応配信。',
    phase: 'Step 3',
    id: 'segment-delivery',
    url: '/segment',
  },
  {
    image: '/images/1to1.png',
    name: '1to1コミュニケーション',
    tagline: 'オペレーター対応をLINEに統合。接客以上の価値を提供。',
    phase: 'Step 3',
    id: 'one-to-one',
    url: '/1to1',
  },
  {
    image: '/images/ギフト.png',
    name: 'ギフト',
    tagline: 'ソーシャルギフト機能で、顧客が顧客を呼ぶ循環を作る。',
    phase: 'Step 3',
    id: 'gift',
    url: '/gift',
  },
];

const PROBLEMS = [
  {
    title: '会員獲得の壁が高い',
    body: 'ネイティブアプリのダウンロードや煩雑な登録フローが障壁となり、ライトユーザーの獲得が進みません。',
  },
  {
    title: '店舗とECのデータが分断している',
    body: '店舗会員とEC会員を統合できず、オムニチャネル施策が中途半端に終わっています。',
  },
  {
    title: 'メッセージの反応率が伸び悩む',
    body: '顧客属性や購買履歴を活かせずに一斉配信を続けた結果、ブロック率が上昇しています。',
  },
  {
    title: '施策ツールが乱立して運用コストが増大',
    body: 'クーポン・スタンプ・予約・ギフトが別システムで管理され、データが分散して分析もできません。',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    label: '顧客接点の創出',
    features: ['デジタル会員証', '順番待ち', '予約'],
    description:
      'まず「つながる」土台を作ります。アプリDL不要の会員化で、ライトユーザーを含めた顧客基盤を構築します。',
  },
  {
    step: 'Step 2',
    label: 'エンゲージメント強化',
    features: ['スタンプカード', 'クーポン配信', 'チケット・パス', '抽選'],
    description:
      '来店動機と再訪のきっかけを設計します。基盤の上に施策を重ねて、顧客体験を段階的に厚くします。',
  },
  {
    step: 'Step 3',
    label: '関係性の深化',
    features: ['セグメント配信', '1to1コミュニケーション', 'ギフト'],
    description:
      '蓄積したデータで一人ひとりに最適な接触を実現。紹介による新規獲得まで循環させます。',
  },
];

const STATS = [
  {
    value: '5,000社',
    unit: '以上',
    label: 'クラスメソッド技術支援実績',
    sub: 'AWS・クラウド・アプリ開発にわたる幅広い実績',
  },
  {
    value: '最短',
    unit: '3ヶ月',
    label: 'Step 1の立ち上げ期間',
    sub: '会員証を含む標準構成。機能範囲と連携要件で変動します',
  },
  {
    value: '10',
    unit: '機能',
    label: '選択可能なアセット数',
    sub: 'ビジネスに必要なものだけを選んで組み合わせ',
  },
  {
    value: '3',
    unit: 'ステップ',
    label: '段階的なロードマップ設計',
    sub: '一度に全部入れず、ステップで育てる設計思想',
  },
];

const FAQS = [
  {
    q: '導入にはどのくらいの期間がかかりますか？',
    a: '会員証を含む標準的なフェーズ1構成で、最短3ヶ月が目安です。機能範囲と外部システム連携の有無により変動します。複数機能＋CRM連携の場合はそれ以上を想定してください。詳細はヒアリング後にお伝えします。',
  },
  {
    q: '既存のCRMやPOSシステムと連携できますか？',
    a: 'はい、カスタマイズ領域として対応しています。Salesforce、kintone、自社会員DBなどとの連携実績があります。連携方式はお客様の既存システムに合わせて設計します。',
  },
  {
    q: 'LINE公式アカウントの標準機能と何が違いますか？',
    a: 'LINE公式アカウントはテンプレート機能の組み合わせに限られますが、グロースパックは会員IDとの完全連携、外部CRM・ECシステムとのリアルタイム連携、フルカスタムデザインが可能です。',
  },
  {
    q: '他のLINEミニアプリSaaSと比べた強みは？',
    a: 'SaaSでは実現できない柔軟なカスタマイズと高品質なサポート・性能を提供します。スクラッチ開発と比べると大幅に短い期間で立ち上がる点が評価いただいています。',
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
  serviceType: 'LINEミニアプリ開発サービス',
  name: 'グロースパック for LINE',
  description:
    'SaaSの速さとフルスクラッチの柔軟性を両立する、ハーフスクラッチ開発のLINEミニアプリ開発サービス。会員証・予約・クーポンなど10の機能アセットから必要なものを選び、最短3ヶ月で立ち上げます。',
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

/* ------------------------------------------------------------------ */
/* PAGE                                                                  */
/* ------------------------------------------------------------------ */

export default function V2TopPage() {
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

      {/* ============================================================ */}
      {/* Header                                                         */}
      {/* ============================================================ */}
      <TopHeader />

      {/* ============================================================ */}
      {/* Hero — 写真背景 + ダークオーバーレイ + 白テキスト                  */}
      {/* ============================================================ */}
      <div className="relative min-h-[560px] md:min-h-[700px] flex items-center bg-[#0a0a0a] overflow-hidden">
        {/* 背景グラデ（LINE Green の光を右下から） */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 80% 100%, rgba(6,199,85,0.22) 0%, rgba(6,199,85,0.06) 40%, transparent 70%), linear-gradient(135deg, #0a0a0a 0%, #1a1d21 60%, #0a0a0a 100%)',
          }}
        />
        {/* 背景グリッド（細かいドット） */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* 左カラム */}
            <div className="lg:col-span-7 space-y-6 md:space-y-7">
              {/* 認定バッジ */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#06C755]/20 border border-[#06C755]/50 rounded-full text-xs sm:text-sm font-semibold text-[#06C755]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06C755] shrink-0" />
                LINEヤフー Partner Program Technology Partner
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight text-white">
                LINEミニアプリで、<br />
                顧客との接点を<br />
                <span className="text-[#06C755]">ひらく。</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">
                ハーフスクラッチ開発で、SaaSの速さとフルスクラッチの柔軟性を両立。会員証・予約・クーポンなど10機能のアセットから必要なものだけを選び、<span className="font-bold text-white">最短3ヶ月</span>で立ち上げます。
              </p>

              {/* CTA — ヒーロー内（1箇所目） */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button variant="primary" size="lg" asChild>
                  <TrackedExternalLink
                    href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                    location="top_lp_hero_primary"
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
                    href="https://classmethod.jp/download/line-mini-app/"
                    location="top_lp_hero_secondary"
                    destination="download"
                  >
                    資料をダウンロード
                  </TrackedExternalLink>
                </Button>
              </div>

              {/* ミニチェックリスト */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['最短3ヶ月で立ち上げ', '10機能から選択可能', 'CRM・POS連携対応'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#06C755]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* 右カラム — スマホ中心に顧客接点が放射状に広がる視覚表現 */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative h-[560px] w-full">
                {/* 放射する接続線（SVG） */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 500 560"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="lineFade" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#06C755" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#06C755" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* 中心から6方向へ */}
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
                  {/* 中心のグロー */}
                  <circle cx="250" cy="280" r="140" fill="url(#lineFade)" />
                </svg>

                {/* 中心のスマホ */}
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
                          {/* 1次元バーコード（疑似） */}
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
                            <div className="text-[7px] tracking-[0.15em] text-[#6B7280] font-mono">
                              4901234 567890
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#E8F8F0] rounded-md px-2 py-1.5 border border-[#06C755]/20">
                          <div className="text-[9px] text-[#05A847] font-bold">新着</div>
                          <div className="text-[10px] text-[#1F2937]">期間限定クーポン</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6つの接点カード — スマホから放射状に配置 */}
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

                {/* 装飾グロー */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#06C755] rounded-full opacity-10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#06C755] rounded-full opacity-10 blur-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 信頼バッジ帯 — ヒーロー直下                                       */}
      {/* ============================================================ */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: ShieldCheck, label: 'LINEヤフー Technology Partner', color: '#06C755' },
              { icon: Award, label: 'AWS Premier Tier Services Partner', color: '#FF9900' },
              { icon: ShieldCheck, label: 'ISO 27001 取得（クラスメソッド）', color: '#3B82F6' },
              { icon: Users, label: '技術支援実績 5,000社以上', color: '#05A847' },
              { icon: Zap, label: 'Step 1最短3ヶ月', color: '#05A847' },
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
      {/* 実績数字セクション                                               */}
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
      </Section>

      {/* ============================================================ */}
      {/* 課題セクション                                                   */}
      {/* ============================================================ */}
      <Section id="problems" spacing="sm" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            CHALLENGES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            こんな課題、ありませんか。
          </h2>
          <p className="text-base text-[#4B5563]">
            リテール・サービス業の現場では、顧客接点のデジタル化が進む一方で、次のような構造的な課題が繰り返し発生しています。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {PROBLEMS.map((p) => (
            <Card key={p.title} padding="md" className="border-l-4 border-l-[#06C755]">
              <h3 className="text-base sm:text-lg font-bold text-[#1F2937] mb-2">
                {p.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                {p.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* ポジショニング                                                   */}
      {/* ============================================================ */}
      <Section id="positioning" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            WHY GROWTHPACK
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            SaaSとスクラッチ、その中間に。
          </h2>
          <p className="text-base text-[#4B5563]">
            SaaSは速く安いが、拡張と連携に制約があります。フルスクラッチは自由度が高いが、期間とコストが膨らみます。グロースパックは<span className="font-bold text-[#1F2937]">速さ・柔軟性・サポート品質</span>を同時に提供するハーフスクラッチ開発です。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {/* SaaS */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Option A</div>
            <h3 className="text-base font-bold mb-4">SaaS<br /><span className="text-sm font-normal text-[#6B7280]">パッケージ型</span></h3>
            <ul className="text-sm text-[#6B7280] space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />初期コスト: 低</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />拡張性: △</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />サポート: △</li>
            </ul>
          </Card>

          {/* Growthpack — 推奨 */}
          <Card variant="accent" padding="md" className="ring-2 ring-[#06C755] shadow-lg relative">
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-[#05A847] text-white text-xs font-bold rounded-sm">
              RECOMMENDED
            </div>
            <div className="text-xs font-semibold text-[#05A847] uppercase tracking-wider mb-3">Growthpack</div>
            <h3 className="text-base font-bold mb-4">ハーフスクラッチ<br /><span className="text-sm font-normal text-[#05A847]">開発</span></h3>
            <ul className="text-sm text-[#1F2937] space-y-2 font-medium">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />初期コスト: 中</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />拡張性: ○</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />サポート: ○ / 性能: ○</li>
            </ul>
          </Card>

          {/* スクラッチ */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Option C</div>
            <h3 className="text-base font-bold mb-4">スクラッチ<br /><span className="text-sm font-normal text-[#6B7280]">開発</span></h3>
            <ul className="text-sm text-[#6B7280] space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />初期コスト: 高</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />拡張性: ◎</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />サポート: ○</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 中盤CTA帯（2箇所目）                                             */}
      {/* ============================================================ */}
      <div className="bg-[#05A847] py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-lg sm:text-xl">
                どの選択肢が自社に合うか、まずご相談ください。
              </p>
              <p className="text-white/80 text-sm mt-1">
                業種・規模・既存システムをお聞きして最適な構成をご提案します。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-white text-[#05A847] hover:bg-white/90 font-bold"
              >
                <TrackedExternalLink
                  href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                  location="top_lp_midband"
                  destination="contact"
                >
                  無料で相談する
                  <ArrowRight className="w-5 h-5 ml-2" />
                </TrackedExternalLink>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 機能一覧                                                        */}
      {/* ============================================================ */}
      <Section id="features" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            10の機能アセットから、選んで組み合わせる。
          </h2>
          <p className="text-base text-[#4B5563]">
            全機能を導入する必要はありません。ビジネスの優先度に合わせて必要なものだけを選び、フェーズを追って拡張できます。
          </p>
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
              <Link key={f.id} href={f.url} className="block hover:shadow-lg transition-shadow rounded-xl">
                <Card padding="md">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="shrink-0 relative w-11 h-11">
                      <Image
                        src={f.image}
                        alt={f.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">
                        {f.name}
                      </h3>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${phaseColor}`}>
                        {f.phase}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {f.tagline}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 3フェーズ ロードマップ                                            */}
      {/* ============================================================ */}
      <Section id="steps" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            ROADMAP
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            3ステップで段階的に育てる。
          </h2>
          <p className="text-base text-[#4B5563]">
            一度にすべてを導入するのではなく、まず基盤を作り、施策を重ねて、関係を深化させます。各ステップが次のステップのデータ基盤になります。
          </p>
        </div>

        {/* ステップ接続ライン + カード */}
        <div className="relative">
          {/* デスクトップ接続線 */}
          <div className="hidden md:block absolute top-10 left-[calc(33.333%+0px)] right-[calc(33.333%+0px)] h-0.5 bg-[#E5E7EB] z-0" />
          <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative z-10">
            {STEPS.map((p, i) => (
              <Card key={p.step} variant="elevated" padding="lg" rounded="xl" className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#05A847] text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider">{p.step}</div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">{p.label}</h3>
                  </div>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                  {p.description}
                </p>
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
      {/* 業種別導入実績（事例セクション / 社名なし）                          */}
      {/* ============================================================ */}
      <Section id="case-studies" spacing="sm" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            CASE STUDIES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            業種を問わず、導入が進んでいます。
          </h2>
          <p className="text-base text-[#4B5563]">
            各業界の詳細ページで、業界固有の課題と解決策をご覧いただけます。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {[
            {
              industry: 'アパレル・ファッション',
              use: 'デジタル会員証 + セグメント配信',
              result: '会員化率の向上と来店頻度アップを実現',
              href: '/apparel',
            },
            {
              industry: '飲食・カフェ',
              use: 'スタンプカード + 順番待ち',
              result: 'ペーパーレス化と再来店促進を同時に達成',
              href: '/food',
            },
            {
              industry: '百貨店・商業施設',
              use: 'デジタル会員証 + チケット・パス',
              result: 'イベント動員数の可視化と集客効率化',
              href: '/department',
            },
            {
              industry: 'ドラッグストア・薬局',
              use: 'デジタル会員証 + 調剤完了通知',
              result: '会員化と待ち時間ストレスの同時解消',
              href: '/drugstore',
            },
            {
              industry: 'EC・D2C',
              use: 'LINE ID連携 + カゴ落ちレスキュー',
              result: 'カート放棄後の自動フォローで購買転換',
              href: '/ec',
            },
            {
              industry: 'ホテル・旅館',
              use: '予約 + セグメント配信',
              result: '直予約率の向上とリピーター育成',
              href: '/hotel',
            },
            {
              industry: 'スポーツ・エンタメ',
              use: 'デジタル会員証 + チケット・パス',
              result: 'ライト層のデータ化とファン育成',
              href: '/sports',
            },
            {
              industry: 'スーパー・ホームセンター',
              use: 'デジタル会員証 + クーポン配信',
              result: 'プラスチックカードからの移行と来店促進',
              href: '/supermarket',
            },
          ].map(({ industry, use, result, href }) => (
            <Link key={industry} href={href} className="block hover:shadow-lg transition-shadow rounded-xl">
              <Card key={industry} padding="md">
                <div className="text-xs font-semibold text-[#05A847] uppercase tracking-wider mb-2">INDUSTRY</div>
                <h3 className="text-base font-bold text-[#1F2937] mb-2">{industry}</h3>
                <div className="text-xs text-[#9CA3AF] mb-1">主な活用機能</div>
                <p className="text-sm text-[#4B5563] mb-3">{use}</p>
                <div className="pt-3 border-t border-[#E5E7EB]">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#06C755] shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-[#1F2937]">{result}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <p className="text-xs text-[#9CA3AF] text-center mt-6">
          ※ 事例は業種・活用パターンを抽象化して記載しています。具体的な実績はご商談にてご説明します。
        </p>
      </Section>

      {/* ============================================================ */}
      {/* FAQ                                                             */}
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
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed pl-6">
                {f.a}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 最終CTA帯（3箇所目）— ダーク背景                                  */}
      {/* ============================================================ */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#06C755] mb-2">
            CONTACT
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            LINEミニアプリの設計から運用まで、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">
            業種・規模・現状のシステム構成をお聞きしたうえで、最適な機能の組み合わせとフェーズ計画をご提案します。初回相談は無料です。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" asChild>
              <TrackedExternalLink
                href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                location="top_lp_final_primary"
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
                location="top_lp_final_secondary"
                destination="download"
              >
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
      {/* Footer                                                          */}
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
              <p className="text-xs text-white/50 leading-relaxed">
                クラスメソッド株式会社が提供する LINE ミニアプリ開発サービス。ハーフスクラッチ開発で、速さと柔軟性を両立します。
              </p>
            </div>

            {/* サービス */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">SERVICE</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">機能一覧</a></li>
                <li><a href="#steps" className="hover:text-white transition-colors">導入ロードマップ</a></li>
                <li><a href="#positioning" className="hover:text-white transition-colors">ハーフスクラッチとは</a></li>
              </ul>
            </div>

            {/* 事例・リソース */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">RESOURCES</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#case-studies" className="hover:text-white transition-colors">業種別導入事例</a></li>
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
                  <TrackedExternalLink
                    href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                    location="top_lp_footer_contact"
                    destination="contact"
                    className="hover:text-white transition-colors"
                  >
                    無料相談はこちら
                  </TrackedExternalLink>
                </li>
                <li>
                  <TrackedExternalLink
                    href="https://classmethod.jp/download/line-mini-app/"
                    location="top_lp_footer_download"
                    destination="download"
                    className="hover:text-white transition-colors"
                  >
                    資料ダウンロード
                  </TrackedExternalLink>
                </li>
              </ul>
            </div>
          </div>

          {/* コピーライト */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              © Classmethod, Inc.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/40">
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
