/**
 * /lottery — グロースパック for LINE 抽選機能ページ
 *
 * docs/DESIGN-FEATURE-PAGE.md に厳密に従う。
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'LINE抽選｜キャンペーン抽選・スタンプラリー・ライト層育成｜グロースパック for LINE',
  description: 'キャンペーン応募のハードル、スタンプラリーの管理コスト、ライト層とのLINE接点創出。LINE抽選でキャンペーン参加率と友だち登録を同時に伸ばす。ハーフスクラッチ開発で最短3ヶ月、事業会社向けグロースパック for LINE。',
  keywords: ['LINE 抽選', 'キャンペーン', 'スタンプラリー', 'LINEミニアプリ', 'ライト層'],
  alternates: {
    canonical: '/lottery',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/lottery',
    title: 'LINE抽選｜キャンペーン抽選・スタンプラリー・ライト層育成｜グロースパック for LINE',
    description: 'キャンペーン応募のハードル、スタンプラリーの管理コスト、ライト層とのLINE接点創出。LINE抽選でキャンペーン参加率と友だち登録を同時に伸ばす。ハーフスクラッチ開発で最短3ヶ月。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'LINE抽選｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINE抽選｜キャンペーン抽選・スタンプラリー・ライト層育成｜グロースパック for LINE',
    description: 'キャンペーン応募のハードル、スタンプラリーの管理コスト、ライト層とのLINE接点創出。LINE抽選でキャンペーン参加率と友だち登録を同時に伸ばす。ハーフスクラッチ開発で最短3ヶ月。',
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
  Shuffle,
  Bell,
  Tag,
  Users,
  Database,
  Radio,
  Ticket,
  CreditCard,
  Stamp,
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
    label: '抽選の実施と通知',
    subtitle: '参加から当落通知・景品配布まで、LINE上で完結させる',
    cards: [
      {
        icon: Shuffle,
        name: 'デジタル抽選ロジック',
        challenge: '紙のスクラッチやガラポンは集計に数週間かかり、当選通知の郵送コストも大きくてキャンペーン頻度を上げられない',
        solution: 'LINE上で抽選・当落判定が即完結。集計と通知コストをゼロにし、キャンペーン頻度を高められる。',
        demo_url: 'https://growthpack-lottery-demo.vercel.app/demo/entry',
      },
      {
        icon: Bell,
        name: '当選通知→クーポン自動配布',
        challenge: '当選者への個別連絡が手動で、1件ずつ対応しているとスタッフの工数が膨大になる',
        solution: '当選を検知して通知とクーポンを自動配布。参加人数に関わらずスタッフ対応ゼロで完結。',
      },
      {
        icon: Tag,
        name: 'ハズレ参加賞クーポン',
        challenge: '抽選で外れたお客様がそのままイベントを終えてしまい、次の来店動機が何も残らない',
        solution: '落選者にも参加賞クーポンを自動配布。「外れたけど何かもらえた」体験で来店動機を残す。',
      },
    ],
  },
  {
    label: '参加資格と確率の制御',
    subtitle: '会員属性やチケット種別を使って、抽選をより価値ある体験に設計する',
    cards: [
      {
        icon: Users,
        name: '会員属性による参加資格設定',
        challenge: '全員対象のキャンペーンを繰り返しているが、特定の層に響いているかどうかわからない',
        solution: '会員ランク・属性・来店回数などを参加条件に設定。「20代女性のみ」「ゴールド会員は確率2倍」など設計できる。',
      },
      {
        icon: Database,
        name: '抽選結果の会員プロフィール蓄積',
        challenge: '抽選キャンペーンを実施しても、参加者がその後来店しているか、景品を使ったかまったく追えない',
        solution: '当選/落選・景品内容・引換ステータスを会員プロフィールに蓄積。次の施策の意思決定に活用できる。',
      },
    ],
  },
  {
    label: 'データ活用と事後フォロー',
    subtitle: '抽選後の行動を追跡し、次のキャンペーンの設計精度を高める',
    cards: [
      {
        icon: Radio,
        name: 'MA連携（当選・落選イベント送信）',
        challenge: 'イベント抽選が終わると参加者との接点が完全に途切れ、次回イベントへの誘導が何もできない',
        solution: '当選・落選・景品引換をイベントとして自動送信。当選者へのお礼、落選者への「次回は当たるかも」配信が自動で動く。',
      },
    ],
  },
];

const COMBINATIONS = [
  {
    icon: Ticket,
    name: '抽選 × チケット・パス',
    description: '入場済みフラグで「実際に来場した人だけ抽選参加可能」に設定。チケット種別（VIP等）で当選確率を変えることもでき、来場価値を高められます。',
    href: '/ticket',
  },
  {
    icon: Tag,
    name: '抽選 × クーポン',
    description: '当選景品・参加賞として自動配布されるクーポンを事前に設定。「当たっても外れても何かもらえる」体験が抽選参加率を高め、来店動機を全員に残します。',
    href: '/coupon',
  },
  {
    icon: CreditCard,
    name: '抽選 × 会員証',
    description: '当選/落選結果・景品内容・引換ステータスを会員プロフィールに蓄積。「どの層に何が刺さるか」のデータが積み上がり、次回キャンペーンの設計精度が上がります。',
    href: '/memberscard',
  },
  {
    icon: Stamp,
    name: '抽選 × スタンプカード',
    description: 'スタンプゴール達成を抽選参加の資格条件に設定。「10スタンプ貯めると抽選に参加できる」という仕組みが、ゴールへの動機をさらに高めます。',
    href: '/stampcard',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    title: 'ヒアリング・要件整理',
    description: '抽選のユースケース・景品形態・チケットとの入場制御連携の要否をお聞きします。',
  },
  {
    step: 'Step 2',
    title: '抽選基盤の構築',
    description: '抽選ロジック・当落判定・当選通知・クーポン自動配布・参加賞クーポンを実装します。',
  },
  {
    step: 'Step 3',
    title: '参加資格・確率制御の設定',
    description: '会員属性・チケット種別による参加資格と当選確率の設定を行います。',
  },
  {
    step: 'Step 4',
    title: '会員連携・事後配信の設定',
    description: '抽選結果の会員プロフィール蓄積と事後フォロー配信を設定し、運用を開始します。',
  },
];

const FAQS = [
  {
    q: '抽選方式はどのような種類がありますか？',
    a: '応募後に即時当落を通知する即時抽選、期間内の応募を締め切ってから一括で実施する期間別抽選、スタンプ数や来店回数に応じて当選確率が上がる累積ポイント連動抽選に対応しています。',
  },
  {
    q: '景品の配布はどのような仕組みですか？',
    a: '当選通知と同時にクーポン・QRコード・デジタルギフトを自動配布できます。物品景品の場合は引換番号の発行と引換ステータス管理に対応。落選者への参加賞クーポンも自動配布可能です。',
  },
  {
    q: '不正対策はどうなっていますか？',
    a: '1LINE IDにつき1エントリーの制限、VPNや複数アカウントによる重複応募の検知、当選後の二重引換防止フラグを実装しています。参加資格を会員ランクや来店履歴で絞ることで、なりすまし参加も防止できます。',
  },
  {
    q: '開発期間と費用の目安は？',
    a: '即時抽選と当選通知・クーポン配布の基本構成であれば最短3ヶ月で立ち上げが可能です。参加資格の複雑な設定やMA連携など要件により期間と費用が変わるため、初回ヒアリングで概算をご提示します。',
  },
  {
    q: 'どのような業界で活用されていますか？',
    a: '小売（百貨店・アパレル・食品スーパー）、スポーツ・エンタメ、飲食など、キャンペーン施策を定期的に実施している事業会社さまで活用いただいています。ライト層のLINE友だち獲得とコアファン育成を両立したい場合に特に効果的です。',
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '抽選機能',
  name: 'グロースパック for LINE（抽選）',
  description: 'LINE上で抽選から当選通知・クーポン配布・会員データ蓄積まで一気通貫。ハズレ参加賞で全員に来店動機を残します。',
  provider: { '@type': 'Organization', name: 'クラスメソッド株式会社', url: 'https://classmethod.jp' },
  areaServed: { '@type': 'Country', name: 'Japan' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'グロースパック for LINE', item: 'https://lp.growthpackforline.classmethod.net/' },
    { '@type': 'ListItem', position: 2, name: '抽選', item: 'https://lp.growthpackforline.classmethod.net/lottery' },
  ],
};

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
  name: 'LINE抽選機能の導入ステップ',
  description: '3ステップで段階的に導入できます',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      name: '要件ヒアリング・見積',
      text: '抽選のユースケース・景品形態・チケットとの入場制御連携の要否を確認し、概算費用と工期を提示します。',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: '設計・実装',
      text: '抽選ロジック・当落判定・当選通知・クーポン自動配布・参加賞クーポンの設計と実装を行います。',
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
  headline: 'LINE抽選｜キャンペーン抽選・スタンプラリー・ライト層育成｜グロースパック for LINE',
  description: 'キャンペーン応募のハードル、スタンプラリーの管理コスト、ライト層とのLINE接点創出。LINE抽選でキャンペーン参加率と友だち登録を同時に伸ばす。ハーフスクラッチ開発で最短3ヶ月。',
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

export default function LotteryPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <FeatureScrollTracker page="lottery" />

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
              location="lottery_header"
              destination="contact"
            >
              お問い合わせ
            </TrackedExternalLink>
          </Button>
        }
      />

      {/* Hero */}
      <div className="relative min-h-[480px] md:min-h-[560px] flex items-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 100%, rgba(6,199,85,0.22), transparent 70%), linear-gradient(135deg, #0a0a0a 0%, #1a1d21 60%, #0a0a0a 100%)' }} />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 max-w-[600px] space-y-6 md:space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-line-green/20 border border-line-green/50 rounded-full text-xs sm:text-sm font-semibold text-line-green">
                <span className="w-1.5 h-1.5 rounded-full bg-line-green shrink-0" />
                抽選機能
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white">
                当たっても外れても、<br />
                次の来店につながる体験を<br />
                <span className="text-line-green">自動化する。</span>
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">LINE上で抽選から当選通知・クーポン配布・会員データ蓄積まで一気通貫。ハズレ参加賞で全員に来店動機を残します。</p>
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
                    href="https://growthpack-lottery-demo.vercel.app/demo/entry"
                    location="hero"
                    destination="demo"
                  >
                    デモを試す</TrackedExternalLink>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['即時当落判定', 'ハズレにも参加賞', 'キャンペーンROIの可視化'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-line-green" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
              <Image
                src="/images/lottery.png"
                alt="抽選機能のデモ画面"
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">3行でわかる、LINE抽選で何ができるか</h2>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-line-green text-white font-bold flex items-center justify-center text-sm">1</span>
              <p className="text-base text-foreground leading-relaxed pt-1">キャンペーン抽選・スタンプラリーを手作業からシステム化し、集計と通知コストをゼロにする</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-line-green text-white font-bold flex items-center justify-center text-sm">2</span>
              <p className="text-base text-foreground leading-relaxed pt-1">ライト層獲得とコアファン育成の両方を1つの機能で実現し、参加賞でハズレの人にも来店動機を残す</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-line-green text-white font-bold flex items-center justify-center text-sm">3</span>
              <p className="text-base text-foreground leading-relaxed pt-1">当選通知・特典配布まで自動化し、キャンペーン頻度を上げても運用工数が増えない体制を作る</p>
            </li>
          </ol>
        </div>
      </Section>

      {/* できること */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">FEATURES</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">抽選でできること</h2>
          <p className="text-base text-muted-foreground">「抽選のデジタル化」ではなく、抽選を起点とした顧客データ基盤の構築と来店LTV向上を支援します。</p>
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
                      <div className="flex items-start gap-3 mb-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-line-green-extra-light flex items-center justify-center">
                          <Icon className="w-5 h-5 text-line-green-dark" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug pt-1">{f.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">「{f.challenge}」</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.solution}</p>
                      {f.demo_url && (
                        <TrackedExternalLink
                          href={f.demo_url}
                          location={`lottery_card_demo_${f.name}`}
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

      <PriceSection currentFeatureKey="lottery" />

      {/* 組み合わせ */}
      <Section id="combinations" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">INTEGRATIONS</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">他の機能と組み合わせる</h2>
          <p className="text-base text-muted-foreground">抽選はチケット・クーポン・会員証と連携することで、イベント起点のLTV向上サイクルの中核になります。</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {COMBINATIONS.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.name} variant="elevated" padding="lg" rounded="xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-line-green-extra-light flex items-center justify-center">
                    <Icon className="w-5 h-5 text-line-green-dark" />
                  </div>
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
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">GETTING STARTED</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">導入ステップ</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STEPS.map((s, i) => (
            <Card key={s.step} variant="elevated" padding="md" rounded="xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-line-green-dark text-white font-bold flex items-center justify-center text-sm shrink-0">{i + 1}</div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{s.step}</div>
                  <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* よくある質問 */}
      <Section id="faq" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">FAQ</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">よくある質問</h2>
        </div>
        <div className="max-w-[800px] space-y-4">
          {FAQS.map((f) => (
            <details key={f.q} className="bg-white rounded-xl border border-border p-5 group">
              <summary className="cursor-pointer font-semibold text-foreground text-base leading-snug list-none flex justify-between items-start gap-4">
                <span>{f.q}</span>
                <span className="shrink-0 text-line-green-dark mt-0.5">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 3ステップ導入フロー */}
      <Section id="how-to" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">HOW TO START</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">3ステップで導入できます</h2>
        </div>
        <ol className="max-w-[800px] space-y-4">
          <li className="bg-secondary rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">1. 要件ヒアリング・見積（〜2週間）</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">抽選のユースケース・景品形態・チケットとの入場制御連携の要否をお聞きし、概算費用と工期をご提示します。</p>
          </li>
          <li className="bg-secondary rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">2. 設計・実装（1〜2ヶ月）</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">抽選ロジック・当落判定・当選通知・クーポン自動配布・参加賞クーポンの設計と実装を行います。不正対策・参加資格制御も並列で進行します。</p>
          </li>
          <li className="bg-secondary rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">3. テスト・本番リリース（1ヶ月）</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">受入テスト・LINEヤフー審査・本番リリースまで伴走します。リリース後の運用フォローも対応可能です。</p>
          </li>
        </ol>
      </Section>

      {/* 同じステップの他の機能 */}
      <Section id="related-features" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">RELATED FEATURES</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">同じステップの他の機能</h2>
          <p className="text-base text-muted-foreground">抽選と同じ「エンゲージメント強化」ステップの機能です。組み合わせることで来店動機の設計がより多彩になります。</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
          {[
            { name: 'スタンプカード', tagline: '来店履歴が見える、育つ。紛失ゼロのデジタルスタンプ。', url: '/stampcard' },
            { name: 'クーポン配信', tagline: 'LINE公式の配信制限を超えた、属性連動のクーポン発行。', url: '/coupon' },
            { name: 'チケット・パス', tagline: 'LINEで入場管理まで完結。CRM側で利用状況を可視化。', url: '/ticket' },
          ].map((f) => (
            <Link
              key={f.name}
              href={f.url}
              className="block bg-white rounded-xl border border-border p-5 hover:border-line-green-dark hover:shadow-md transition-all group"
            >
              <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-line-green-dark transition-colors">{f.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{f.tagline}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-line-green-dark">
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
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green mb-2">CONTACT</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            抽選機能の導入について、<br />
            <span className="text-line-green">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">抽選のユースケース・景品形態・チケットとの連携要否をお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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
        description="クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。抽選を起点とした顧客データ基盤を構築します。"
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
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="lottery_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="lottery_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
              </>
            ),
          },
        ]}
      />
    </main>
  );
}
