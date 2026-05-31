/**
 * /queue — グロースパック for LINE 順番待ち機能ページ
 *
 * docs/DESIGN-FEATURE-PAGE.md に厳密に従う。
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'LINE順番待ち通知｜行列・呼び出し・ピーク時の客離れを防ぐ｜グロースパック for LINE',
  description: '行列による待ち時間での客離れ、ピーク時の呼び出し管理、人手不足での対応限界。LINEで順番待ち通知を実現し来店体験を改善。ハーフスクラッチ開発で最短3ヶ月、事業会社向けグロースパック for LINE。',
  keywords: ['LINE 順番待ち', '呼び出し', '行列', '飲食', 'ウェイティング', 'LINEミニアプリ'],
  alternates: {
    canonical: '/queue',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/queue',
    title: 'LINE順番待ち通知｜行列・呼び出し・ピーク時の客離れを防ぐ｜グロースパック for LINE',
    description: '行列による待ち時間での客離れ、ピーク時の呼び出し管理、人手不足での対応限界。LINEで順番待ち通知を実現し来店体験を改善。ハーフスクラッチ開発で最短3ヶ月。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'LINE順番待ち通知｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINE順番待ち通知｜行列・呼び出し・ピーク時の客離れを防ぐ｜グロースパック for LINE',
    description: '行列による待ち時間での客離れ、ピーク時の呼び出し管理、人手不足での対応限界。LINEで順番待ち通知を実現し来店体験を改善。',
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
  Ticket,
  Clock,
  Bell,
  CheckCircle,
  Monitor,
  UserPlus,
  LayoutGrid,
  Users,
  BarChart3,
  Radio,
  CreditCard,
  Tag,
  CalendarCheck,
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
    label: '整理券の発行と待ち状況表示',
    subtitle: '紙の番号札を廃止し、スマホで完結する待ち体験を実現する',
    cards: [
      {
        icon: Ticket,
        name: 'LINE整理券の発行',
        challenge: '入口にQRを貼っているのに紙の番号札を配り続けている。スタッフが配布に拘束されている',
        solution: 'QRスキャンまたはリッチメニューでLINE整理券を即発行。スタッフ対応ゼロで行列エントリーが完結。',
        demo_url: 'https://strongest-waiting.vercel.app',
      },
      {
        icon: Clock,
        name: '待ち人数・推定待ち時間の表示',
        challenge: '「あと何分ですか？」の問い合わせが受付に殺到して、本来の業務が止まる',
        solution: 'LIFF画面に待ち人数と推定時間をリアルタイム表示。問い合わせゼロで受付業務を本来の仕事に集中できる。',
      },
      {
        icon: Bell,
        name: '順番接近のプッシュ通知',
        challenge: '整理券を渡しても「いつ呼ばれるかわからない」と不安になって離脱するお客様が続出している',
        solution: '「あと3組です」のタイミングでLINEにプッシュ通知。安心感が生まれ、離脱率が下がる。',
      },
    ],
  },
  {
    label: 'スタッフ管理・オペレーション',
    subtitle: '呼び出し・スキップ・複数列管理をスタッフ画面で一元操作する',
    cards: [
      {
        icon: CheckCircle,
        name: '呼び出し後の応答確認',
        challenge: '呼び出したお客様が来なくても気づけず、次の人を呼べないまま待機時間が増える',
        solution: '来た/来ない/スキップをワンタップで操作。NoShowを即検知して次の順番に進める。',
      },
      {
        icon: Monitor,
        name: 'スタッフ管理画面',
        challenge: '紙の番号札では現在の順番・待ち人数・スキップ状況をスタッフ全員がリアルタイムで把握できない',
        solution: '呼び出し・スキップ・一時停止・手動追加をスタッフ画面から操作。全員が同じ情報を共有。',
      },
      {
        icon: LayoutGrid,
        name: '複数窓口・列の管理',
        challenge: 'フロア・診療科・座席種別で列が分かれているが、紙では別々に管理していて混乱が生じる',
        solution: '複数の待ち列を設定で管理。窓口ごとに順番・待ち状況を独立して管理できる。',
      },
    ],
  },
  {
    label: '顧客獲得・データ活用',
    subtitle: '待ち時間を顧客データ蓄積と来店促進の機会に変える',
    cards: [
      {
        icon: UserPlus,
        name: '待機中の会員登録導線',
        challenge: '行列には来てくれているのに、誰が来たかわからず事後のコミュニケーションができない',
        solution: '整理券発行と同時に会員登録を案内。待ち時間を活用して友だち追加・会員化が自然に進む。',
      },
      {
        icon: Users,
        name: '予約客と飛び込み客の統合管理',
        challenge: '予約台帳と当日の飛び込み客を別々に管理していて、ダブルブッキングや順番混乱が起きる',
        solution: '予約機能と連携し、予約客と飛び込み客を1つの画面で統合管理。順番の公平性を自動で担保。',
      },
      {
        icon: BarChart3,
        name: '待ち時間統計・分析',
        challenge: '混んでいる曜日・時間帯のデータがなく、スタッフシフトを勘で組んでいる',
        solution: '待ち時間・NoShow率・来店パターンを自動集計。データに基づくシフト最適化と混雑緩和が可能。',
      },
      {
        icon: Radio,
        name: 'MA連携（イベント送信）',
        challenge: '整理券発行・呼び出し・完了など、待ちのステータス変化が配信やCRM施策に反映されない',
        solution: '整理券発行・接近・呼び出し・完了をイベントとして配信基盤に自動送信。待ち中クーポンなど連携施策が可能。',
      },
    ],
  },
];

const COMBINATIONS = [
  {
    icon: CreditCard,
    name: '順番待ち × 会員証',
    description: '整理券発行と同時に会員登録を案内。今まで「匿名の行列」だった来店客が、LINEの友だちかつ会員として記録され、次回以降の配信・施策に活用できます。',
    href: '/memberscard',
  },
  {
    icon: Tag,
    name: '順番待ち × クーポン',
    description: '推定待ち時間が長いとき、待ち中限定のクーポンを自動配布。「せっかく待っているなら周辺の売場を見ていこう」という来場動機を生み出せます。',
    href: '/coupon',
  },
  {
    icon: CalendarCheck,
    name: '順番待ち × 予約',
    description: '予約なしの飛び込み客に整理券を発行し、予約客と同じ画面で統合管理。紙の番号札・手作業照合をなくし、予約と当日来店を一元管理します。',
    href: '/reservation',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    title: 'ヒアリング・要件整理',
    description: '業種・現在の列管理方法・複数窓口の有無・予約との統合要否をお聞きし、構成を設計します。',
  },
  {
    step: 'Step 2',
    title: '整理券発行・通知の構築',
    description: 'LINE整理券発行・リアルタイム待ち表示・順番接近通知・スタッフ管理画面を実装します。',
  },
  {
    step: 'Step 3',
    title: '複数列・予約連携の設定',
    description: '複数窓口の設定と予約機能との統合管理を設定。当日オペレーションの一元化を実現します。',
  },
  {
    step: 'Step 4',
    title: '会員連携・運用開始',
    description: '会員登録導線・配信連携を設定し、運用を開始。待ち時間のデータが蓄積されていきます。',
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '順番待ち機能',
  name: 'グロースパック for LINE（順番待ち）',
  description: 'LINE整理券で物理行列を解消。待ち人数・推定待ち時間のリアルタイム表示と順番接近通知で、お客様の時間を奪わない待ち体験を実現します。',
  provider: { '@type': 'Organization', name: 'クラスメソッド株式会社', url: 'https://classmethod.jp' },
  areaServed: { '@type': 'Country', name: 'Japan' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'グロースパック for LINE', item: 'https://lp.growthpackforline.classmethod.net/' },
    { '@type': 'ListItem', position: 2, name: '順番待ち', item: 'https://lp.growthpackforline.classmethod.net/queue' },
  ],
};

const FAQS = [
  {
    q: 'LINE順番待ちはどのような仕組みですか？',
    a: 'お客様がLINEで整理券を取得すると、待ち人数と推定待ち時間がリアルタイムで確認できます。順番が近づくとLINEに通知が届くため、店外で自由に待つことができます。',
  },
  {
    q: '既存の呼び出しシステムや予約台帳と連携できますか？',
    a: '可能です。既存のPOSや予約管理システムとのAPI連携により、ウェイティングリストとオーダー情報を一元管理できる構成をご提案します。',
  },
  {
    q: '開発期間と費用の目安は？',
    a: '順番待ち単機能であれば最短3ヶ月で導入可能です。店舗数・連携先システムの複雑さにより費用は変わりますので、初回ヒアリングで概算をご提示します。',
  },
  {
    q: 'SaaS型の順番待ちシステムとの違いは何ですか？',
    a: 'グロースパック for LINEはハーフスクラッチ型です。既存POSや会員証との深い連携、業態固有の待ち順ルール設定、複数店舗管理など、SaaSでは対応が難しいカスタマイズが可能です。',
  },
  {
    q: 'どのような業種で活用できますか？',
    a: '飲食店・フードコート・ホテルのチェックイン、病院・クリニック、百貨店の催事・接客対応など、行列や待ち時間が発生するあらゆる業種に対応します。',
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
  name: 'LINE順番待ちの導入ステップ',
  description: '3ステップで段階的に導入できます',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      name: '要件ヒアリング・見積',
      text: '店舗数・ピーク時の来客数・既存システムを確認し、概算費用と工期を提示します。',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: '設計・実装',
      text: 'LINE整理券・リアルタイム表示・呼び出し通知の設計と実装を行います。',
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
  headline: 'LINE順番待ち通知｜行列・呼び出し・ピーク時の客離れを防ぐ｜グロースパック for LINE',
  description: '行列による待ち時間での客離れ、ピーク時の呼び出し管理、人手不足での対応限界。LINEで順番待ち通知を実現し来店体験を改善。',
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

export default function QueuePage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <FeatureScrollTracker page="queue" />
      <LpHeader
        navItems={[
          { href: '#features', label: 'できること' },
          { href: '#combinations', label: '組み合わせ' },
          { href: '#steps', label: '導入ステップ' },
        ]}
        cta={
          <Button variant="primary" size="sm" asChild>
            <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="queue_header" destination="contact">お問い合わせ</TrackedExternalLink>
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
                順番待ち機能
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-foreground">
                並ばなくていい。<br />
                LINEが、<span className="text-line-green-dark">ちょうどのタイミング</span>で<br className="hidden sm:block" />
                呼んでくれる。
              </h1>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-[600px]">LINE整理券で物理行列を解消。待ち人数・推定待ち時間のリアルタイム表示と順番接近通知で、お客様の時間を奪わない待ち体験を実現します。</p>
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
                >
                  <TrackedExternalLink
                    href="https://strongest-waiting.vercel.app"
                    location="hero"
                    destination="demo"
                  >
                    デモを試す</TrackedExternalLink>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
                {['行列の解消', '問い合わせゼロ', '待ち時間を有効活用'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-line-green-dark" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
              <Image
                src="/images/queue.png"
                alt="順番待ち機能のデモ画面"
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">3行でわかる、LINE順番待ちで何ができるか</h2>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">01</span>
              <p className="text-base text-foreground leading-relaxed pt-1">LINEで整理券を取得するだけ。店外で自由に待ちながら、順番が近づいたらスマホに通知が届く</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">02</span>
              <p className="text-base text-foreground leading-relaxed pt-1">スタッフはLINE管理画面から呼び出し・キャンセル・順番変更を操作でき、呼び出し機器のレンタルが不要</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">03</span>
              <p className="text-base text-foreground leading-relaxed pt-1">順番待ちをきっかけに会員証・スタンプカードと連携し、待ち時間を次の来店接点に変える</p>
            </li>
          </ol>
        </div>
      </Section>

      {/* できること */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">順番待ちでできること</h2>
          <p className="text-base text-muted-foreground">紙の番号札と「あと何分？」の問い合わせをなくし、お客様とスタッフ双方の体験を改善します。</p>
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
                          location={`queue_card_demo_${f.name}`}
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

      <PriceSection currentFeatureKey="queue" />

      {/* 組み合わせ */}
      <Section id="combinations" spacing="md" container="wide" background="muted">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">他の機能と組み合わせる</h2>
          <p className="text-base text-muted-foreground">順番待ちで蓄積したデータを他機能と連携することで、待ち時間が顧客獲得と来店促進の機会に変わります。</p>
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
              { title: '要件ヒアリング・見積（〜2週間）', body: '店舗数・ピーク時の来客数・既存呼び出しシステムを確認し、概算費用と工期をご提示します。' },
              { title: '設計・実装（1〜2ヶ月）', body: 'LINE整理券・リアルタイム待ち状況表示・順番接近通知の設計と実装を行います。既存システム連携も並列で進行します。' },
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
            順番待ちの導入について、<br />
            <span className="text-line-green">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">業種・現在の列管理方法・複数窓口の有無をお聞きして、最適な構成をご提案します。<span className="font-bold text-white">初回相談は無料です。</span></p>
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
        description="クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。LINE整理券で行列をなくします。"
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
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="queue_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="queue_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
              </>
            ),
          },
        ]}
      />
    </main>
  );
}
