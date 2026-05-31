/**
 * /segment — グロースパック for LINE セグメント配信機能ページ
 *
 * docs/DESIGN-FEATURE-PAGE.md に厳密に従う。
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'LINEセグメント配信｜購買履歴・属性別の最適配信でブロック率を下げる｜グロースパック for LINE',
  description: '一斉配信によるブロック率上昇、購買履歴を活かしきれない配信設計、配信効果の属性別可視化不足。LINEセグメント配信で顧客属性・購買履歴に応じた最適なメッセージを届ける。ハーフスクラッチ開発で最短3ヶ月、グロースパック for LINE。',
  keywords: ['LINE セグメント配信', 'セグメント', '配信最適化', 'LINEミニアプリ', 'ブロック率'],
  alternates: {
    canonical: '/segment',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/segment',
    title: 'LINEセグメント配信｜購買履歴・属性別の最適配信でブロック率を下げる｜グロースパック for LINE',
    description: '一斉配信によるブロック率上昇、購買履歴を活かしきれない配信設計、属性別可視化不足。LINEセグメント配信で最適なメッセージを届ける。ハーフスクラッチ開発で最短3ヶ月。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'LINEセグメント配信｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINEセグメント配信｜購買履歴・属性別の最適配信でブロック率を下げる｜グロースパック for LINE',
    description: '一斉配信によるブロック率上昇、購買履歴を活かしきれない配信設計、属性別可視化不足。LINEセグメント配信で最適なメッセージを届ける。ハーフスクラッチ開発で最短3ヶ月。',
    images: ['/images/ogp-v2.jpg'],
  },
}

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Award,
  Users,
  Radio,
  Workflow,
  BarChart3,
  Database,
  UserCheck,
  LayoutDashboard,
  CreditCard,
  MessageCircle,
  Tag,
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
    label: 'CRM基盤（顧客データの管理）',
    subtitle: '全機能のデータを一元管理し、顧客の全体像を把握する',
    cards: [
      {
        icon: UserCheck,
        name: '顧客一覧・詳細画面',
        challenge: '顧客IDだけが並んでいて、誰が誰なのか管理画面を見ても把握できない',
        solution: 'LINEアイコン・表示名付きで顧客を一覧表示。詳細画面では行動タイムラインを時系列で確認。',
      },
      {
        icon: Database,
        name: '機能連携カラムの自動蓄積',
        challenge: 'スタンプカード・予約・クーポンのデータがバラバラで、同一顧客の全体像を見る画面がない',
        solution: '導入している機能に応じてカラムが自動追加。会員証・スタンプ・予約・クーポンの全データを1画面で確認。',
      },
      {
        icon: LayoutDashboard,
        name: '基本ダッシュボード',
        challenge: '友だち数・ブロック数・配信残数などの基本指標を毎回LINEの管理画面で調べていて手間がかかる',
        solution: '友だち数推移・ブロック数・配信残数・機能別イベント数をまとめて表示。毎日の確認をワンストップに。',
      },
    ],
  },
  {
    label: 'セグメント構築と配信',
    subtitle: 'データを組み合わせてセグメントを作り、最適な人に最適なメッセージを届ける',
    cards: [
      {
        icon: Users,
        name: 'セグメントビルダー',
        challenge: '全員に同じ配信を送っているが、開封率が下がり続けていてどうすればいいかわからない',
        solution: '属性・来店回数・最終来店日・スタンプ数などをAND/OR条件で組み合わせてセグメントを構築。',
      },
      {
        icon: Radio,
        name: '一斉配信・セグメント配信',
        description: 'テキスト・画像・Flex Messageを使って、セグメントごとに異なるメッセージを配信。',
        challenge: '「ゴールドランク向け新作案内」と「休眠客向け再来店促進」を同じ配信で出してしまっている',
        solution: 'テキスト・画像・Flex Messageを使って、セグメントごとに異なるメッセージを配信。',
      },
      {
        icon: Workflow,
        name: 'シナリオ配信',
        challenge: '「来店後3日で感謝メッセージ、1週間でクーポン、1ヶ月で呼び戻し」という流れを作りたいが、手動では無理',
        solution: 'トリガー→条件→アクションのシナリオをGUIで設定。来店・購買・ランク変動を起点に自動配信が動く。',
      },
    ],
  },
  {
    label: '分析と最適化',
    subtitle: '配信効果をデータで追跡し、施策の精度を継続的に高める',
    cards: [
      {
        icon: BarChart3,
        name: '配信履歴・開封率・クリック率レポート',
        challenge: 'どの配信が効果的だったか開封率で比較したいが、LINEの管理画面で毎回集計する手間がかかる',
        solution: '配信履歴・開封率・クリック率・URL別クリック数を自動集計。施策の効果比較がすぐできる。',
      },
      {
        icon: Radio,
        name: 'リッチメニューのセグメント切り替え',
        challenge: 'ランクや来店回数に応じてリッチメニューを変えたいが、全員同じメニューしか設定できていない',
        solution: 'セグメント条件に応じてリッチメニューを自動切り替え。ゴールド会員と新規会員で異なる導線を設計できる。',
      },
    ],
  },
];

const COMBINATIONS = [
  {
    icon: CreditCard,
    name: 'セグメント配信 × 会員証',
    description: '会員証が生成するランク・来店回数・離脱リスクスコアがセグメント条件に。「ゴールドで3ヶ月来ていない人に限定オファー」のような精緻な施策が自動化できます。',
    href: '/memberscard',
  },
  {
    icon: MessageCircle,
    name: 'セグメント配信 × 1to1コミュニケーション',
    description: 'チャットで付けたタグ・対話頻度・担当スタッフをセグメント条件に。「カジュアル好き」のタグが付いた顧客にだけ新作カジュアルの案内を自動配信できます。',
    href: '/1to1',
  },
  {
    icon: Tag,
    name: 'セグメント配信 × クーポン',
    description: 'セグメントごとに異なるクーポンを自動配布。一律配布からの脱却で、クーポンのコストを適切な顧客への集中投資に変えます。',
    href: '/coupon',
  },
  {
    icon: Stamp,
    name: 'セグメント配信 × スタンプカード',
    description: 'スタンプ数・ランク・離脱予兆アラートをセグメント条件に。「あと2スタンプで達成の人」「2週間来ていない人」に絞った配信でリテンション施策を自動化します。',
    href: '/stampcard',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    title: 'ヒアリング・要件整理',
    description: '既存のCRM/MAツール・まず自動化したい配信シナリオ・データを見る人の役職をお聞きします。',
  },
  {
    step: 'Step 2',
    title: 'CRM基盤の構築',
    description: '顧客一覧・詳細画面・機能連携カラムの自動蓄積・基本ダッシュボードを実装します。',
  },
  {
    step: 'Step 3',
    title: 'セグメント・配信の設定',
    description: 'セグメントビルダー・一斉配信・シナリオ配信を設定します。最初の1本のシナリオを一緒に設計します。',
  },
  {
    step: 'Step 4',
    title: '分析・改善サイクルの構築',
    description: '開封率・クリック率レポートの確認フローを設定し、データに基づく改善サイクルを構築します。',
  },
];

const FAQS = [
  {
    q: 'セグメント条件はどのような例がありますか？',
    a: '「来店回数5回以上・ゴールドランク・最終来店から60日以内」のような複合条件や、「スタンプ残り2枚以下」「特定商品の購買履歴あり」「チャットで付けたタグ」など、導入している機能のデータをAND/OR条件で自由に組み合わせられます。',
  },
  {
    q: '個人情報の取り扱いはどうなっていますか？',
    a: 'LINE IDと顧客データの連携はLINEヤフーのガイドラインに準拠した設計で行います。個人を特定する情報はグロースパック for LINEのシステム内で管理し、第三者に提供することはありません。詳細は初回ヒアリング時にご説明します。',
  },
  {
    q: '配信回数の上限はありますか？',
    a: 'LINEの仕様上、月間配信数はLINE公式アカウントのプランに依存します。グロースパック for LINEのシステムに独自の上限設定はありませんが、ブロック率を下げるためにセグメント配信・シナリオ配信の設計を最適化するご支援も行っています。',
  },
  {
    q: '開発期間と費用の目安は？',
    a: 'CRM基盤とセグメント配信の基本構成は最短3ヶ月で立ち上げが可能です。シナリオ配信の本数、連携する既存システムの数、分析レポートの詳細度により期間と費用が変わるため、初回ヒアリングで概算をご提示します。',
  },
  {
    q: 'どのような業界で活用されていますか？',
    a: '小売（百貨店・アパレル・食品スーパー・ドラッグストア）、飲食、ホテル、スポーツ・エンタメなど、LINE友だち基盤を持ち一斉配信のブロック率に課題を感じている事業会社さま全般でご利用いただいています。',
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'セグメント配信機能',
  name: 'グロースパック for LINE（セグメント配信）',
  description: '会員証・スタンプ・予約などのデータを組み合わせてセグメントを構築。パーソナライズ配信と自動シナリオで配信効果を最大化します。',
  provider: { '@type': 'Organization', name: 'クラスメソッド株式会社', url: 'https://classmethod.jp' },
  areaServed: { '@type': 'Country', name: 'Japan' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'グロースパック for LINE', item: 'https://lp.growthpackforline.classmethod.net/' },
    { '@type': 'ListItem', position: 2, name: 'セグメント配信', item: 'https://lp.growthpackforline.classmethod.net/segment' },
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
  name: 'LINEセグメント配信の導入ステップ',
  description: '3ステップで段階的に導入できます',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      name: '要件ヒアリング・見積',
      text: '既存のCRM/MAツール・自動化したい配信シナリオ・データを見る人の役職を確認し、概算費用と工期を提示します。',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: '設計・実装',
      text: 'CRM基盤・セグメントビルダー・一斉配信・シナリオ配信の設計と実装を行います。既存システムとのデータ連携も並列で進行します。',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'テスト・本番リリース',
      text: '受入テスト・LINEヤフー審査・本番リリースまで伴走します。開封率・クリック率の確認フローも初期設定します。',
      position: 3,
    },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LINEセグメント配信｜購買履歴・属性別の最適配信でブロック率を下げる｜グロースパック for LINE',
  description: '一斉配信によるブロック率上昇、購買履歴を活かしきれない配信設計、属性別可視化不足。LINEセグメント配信で最適なメッセージを届ける。ハーフスクラッチ開発で最短3ヶ月。',
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

export default function SegmentPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <FeatureScrollTracker page="segment" />

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
              location="segment_header"
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
          <div className="max-w-[720px] space-y-6 md:space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-line-green-extra-light border border-line-green/40 rounded-full text-xs sm:text-sm font-semibold text-line-green-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-line-green-dark shrink-0" />
              セグメント配信機能
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-foreground">
              「誰に・いつ・何を送るか」を<br />
              <span className="text-line-green-dark">データで決め</span>、<br />
              全員に同じ配信から卒業する。
            </h1>
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-[600px]">会員証・スタンプ・予約などのデータを組み合わせてセグメントを構築。パーソナライズ配信と自動シナリオで、配信効果を最大化します。</p>
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
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              {['全機能データを一元管理', 'シナリオ配信の自動化', '開封率・クリック率の可視化'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-line-green-dark" />
                  {t}
                </div>
              ))}
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">3行でわかる、LINEセグメント配信で何ができるか</h2>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">01</span>
              <p className="text-base text-foreground leading-relaxed pt-1">購買履歴・属性別の最適配信でブロック率を下げ、一斉配信から脱却する</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">02</span>
              <p className="text-base text-foreground leading-relaxed pt-1">適切な人への配信集中で配信あたりの開封率・クリック率を上昇させる</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 text-3xl font-bold text-line-green leading-none tabular-nums pt-0.5">03</span>
              <p className="text-base text-foreground leading-relaxed pt-1">配信効果をLINE上で計測しPDCAを高速化する仕組みを整備する</p>
            </li>
          </ol>
        </div>
      </Section>

      {/* できること */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">セグメント配信でできること</h2>
          <p className="text-base text-muted-foreground">会員証と必ずセットで導入。会員証がデータを蓄積し、セグメント配信が管理画面とデータ活用を担います。</p>
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
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <PriceSection currentFeatureKey="segment" />

      {/* 組み合わせ */}
      <Section id="combinations" spacing="md" container="wide" background="muted">
        <div className="mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">他の機能と組み合わせる</h2>
          <p className="text-base text-muted-foreground">セグメント配信は全機能のデータを集約する中枢です。連携する機能が増えるほど、配信の精度と自動化の範囲が広がります。</p>
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
              { title: '要件ヒアリング・見積（〜2週間）', body: '既存のCRM/MAツール・最初に自動化したい配信シナリオ・データを見る人の役職をお聞きし、概算費用と工期をご提示します。' },
              { title: '設計・実装（1〜2ヶ月）', body: 'CRM基盤・セグメントビルダー・一斉配信・シナリオ配信の設計と実装を行います。既存システムとのデータ連携も並列で進行します。' },
              { title: 'テスト・本番リリース（1ヶ月）', body: '受入テスト・LINEヤフー審査・本番リリースまで伴走します。開封率・クリック率の確認フローを初期設定し、改善サイクルを開始します。' },
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
            セグメント配信の導入について、<br />
            <span className="text-line-green">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">既存のCRM/MAツール・最初に自動化したい配信シナリオをお聞きして、最適な構成をご提案します。<span className="font-bold text-white">初回相談は無料です。</span></p>
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
        description="クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。セグメント配信で全機能のデータを施策に活かします。"
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
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="segment_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="segment_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
              </>
            ),
          },
        ]}
      />
    </main>
  );
}
