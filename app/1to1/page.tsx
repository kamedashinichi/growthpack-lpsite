/**
 * /1to1 — グロースパック for LINE 1to1コミュニケーション機能ページ
 *
 * docs/DESIGN.md に厳密に従う。
 * 「機能カタログ」ではなく「課題→解決のカード」を並べる構成。
 *
 * 構成:
 *   1. ヒーロー — 機能の価値を1文で
 *   2. できること（カード一覧） — ベース機能をカード形式で（課題→解決）
 *   3. 組み合わせ — 他機能との連携で何が実現するか（クロスセル）
 *   4. 導入ステップ — 4ステップ
 *   5. CTA — お問い合わせ
 *
 * - 煽り語NG、丁寧体
 * - 顧客向けに「開発中」「未リリース」の表記は入れない
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'LINE 1to1コミュニケーション｜双方向のチャット・お客様対応｜グロースパック for LINE',
  description: 'LINEを使った顧客との個別チャット対応、問い合わせ管理の煩雑さ、スタッフ対応品質のばらつき。LINE 1to1コミュニケーションで双方向の顧客接点を実現。ハーフスクラッチ開発で最短3ヶ月、事業会社向けグロースパック for LINE。',
  keywords: ['LINE 1to1', '双方向', 'チャット', 'カスタマーサポート', 'LINEミニアプリ', '1to1コミュニケーション'],
  alternates: {
    canonical: '/1to1',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/1to1',
    title: 'LINE 1to1コミュニケーション｜双方向のチャット・お客様対応｜グロースパック for LINE',
    description: 'LINEを使った顧客との個別チャット対応、問い合わせ管理の煩雑さ、スタッフ対応品質のばらつき。LINE 1to1コミュニケーションで双方向の顧客接点を実現。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'LINE 1to1コミュニケーション｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINE 1to1コミュニケーション｜双方向のチャット・お客様対応｜グロースパック for LINE',
    description: 'LINEを使った顧客との個別チャット対応、問い合わせ管理の煩雑さ、スタッフ対応品質のばらつき。LINE 1to1コミュニケーションで双方向の顧客接点を実現。',
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
  MessageCircle,
  Users,
  Clock,
  FileText,
  Bot,
  Tag,
  BarChart3,
  Zap,
  Send,
  Workflow,
  HelpCircle,
  BrainCircuit,
  CreditCard,
  Radio,
  Gift,
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
    label: '基本のチャット機能',
    subtitle: '個人LINEを脱却し、組織として顧客と対話する',
    cards: [
      {
        icon: MessageCircle,
        name: 'スタッフ⇔顧客チャット',
        challenge: '個人LINEでやり取りしていて、退職で顧客との関係がリセットされる',
        solution: '公式チャットで対話。履歴は組織に残り、誰が対応しても文脈がわかる。',
        demo_url: 'https://1to1demo.vercel.app',
      },
      {
        icon: FileText,
        name: '対話履歴の永続保存',
        challenge: '担当者の頭の中にしか顧客情報がない',
        solution: '全対話を自動保存。スタッフ間で共有され、引き継ぎ時も全文読める。',
      },
      {
        icon: Users,
        name: '担当アサイン・引き継ぎ',
        challenge: '異動・退職のたびに顧客対応がゼロからやり直し',
        solution: 'ワンクリックで担当変更。履歴・タグ・サマリが新担当に自動引き継ぎ。',
      },
      {
        icon: Tag,
        name: '顧客タグ・メモ',
        challenge: 'お客様の好みやサイズを覚えておけない',
        solution: 'チャット中にタグとメモを付与。次回以降、誰が対応しても好みがわかる。',
      },
    ],
  },
  {
    label: '自動化',
    subtitle: 'スタッフの負荷を減らし、対応品質を底上げする',
    cards: [
      {
        icon: Clock,
        name: '時間外自動応答',
        challenge: '営業時間外の問い合わせに対応できず、取りこぼしている',
        solution: 'ボットが24時間即応答。翌営業日にスタッフへ自動引き継ぎ。',
      },
      {
        icon: Send,
        name: 'テンプレートメッセージ',
        challenge: '営業時間・在庫・アクセスなど、同じ内容の返答を毎回手打ちしている',
        solution: '定型文をワンクリック送信。対応スピードと品質を底上げ。',
      },
      {
        icon: BrainCircuit,
        name: '対話サマリ自動要約',
        challenge: '引き継ぎ時に過去の全チャットを読み返す時間がない',
        solution: 'AIが直近の対話を3行で要約。新担当が一目で文脈を把握。',
      },
      {
        icon: Bot,
        name: 'チャットボット会話フロー',
        challenge: '「予約の変更は？」「修理の流れは？」など定型の問い合わせにもスタッフが毎回対応している',
        solution: '分岐フロー付きボットが自動対応。必要な場合だけスタッフに転送。',
      },
      {
        icon: HelpCircle,
        name: 'FAQ自動応答',
        challenge: '営業時間・アクセス・返品ポリシーなど、同じ質問にスタッフが何度も答えている',
        solution: 'よくある質問をFAQとして登録。キーワードマッチで即回答。',
      },
      {
        icon: BrainCircuit,
        name: 'AI自動回答',
        challenge: 'FAQに載っていない商品仕様や個別の相談への対応が遅れる',
        solution: 'ナレッジベースを検索し、AIが適切な回答を自動生成。',
      },
    ],
  },
  {
    label: 'データ活用',
    subtitle: '個別の接客で得た顧客理解を、組織の施策に変える',
    cards: [
      {
        icon: BarChart3,
        name: '対話頻度の自動計測',
        challenge: '常連だったお客様と最後にいつやり取りしたか、誰も把握できていない',
        solution: '最終対話日・対話頻度を自動記録。休眠顧客を自動検知。',
      },
      {
        icon: Zap,
        name: '他機能への誘導',
        challenge: 'チャットでお客様の好みを聞いても、ギフトや予約の提案にその場でつなげられない',
        solution: 'チャット内からギフト提案・予約誘導をワンタップで実行。',
      },
      {
        icon: Radio,
        name: 'MA連携（イベント送信）',
        challenge: '担当変更や休眠化など、チャットで起きた変化が配信やCRM施策に反映されない',
        solution: 'チャット開始・タグ付与・担当変更・休眠をイベントとして配信基盤に自動送信。',
      },
      {
        icon: Workflow,
        name: 'MA連携（属性・メトリクス）',
        challenge: 'スタッフが接客で把握した好み・相談傾向が、配信やキャンペーンの設計に使われていない',
        solution: '担当スタッフ・タグ・対話頻度をセグメント配信の条件に利用可能。',
      },
    ],
  },
];


const COMBINATIONS = [
  {
    icon: CreditCard,
    name: '1to1 × 会員証',
    description: 'チャット開始時に会員ランク・購買履歴・前回来店日を自動表示。スタッフは「初めまして」のやり取りなしに、お客様の文脈を把握した状態で対話を始められます。',
    href: '/memberscard',
  },
  {
    icon: Radio,
    name: '1to1 × セグメント配信',
    description: 'チャットで付けたタグ・好み・対話頻度がセグメント配信の条件に。「カジュアル好き」のタグが付いた顧客にだけ新作カジュアルの案内を自動配信できます。',
    href: '/segment',
  },
  {
    icon: Gift,
    name: '1to1 × ギフト',
    description: 'チャットで聞いた好みをもとに、その場でギフト提案。「お連れ様へのプレゼントをお探しですか？」から購買完了まで、対話の流れを切らずに実行できます。',
    href: '/gift',
  },
  {
    icon: CalendarCheck,
    name: '1to1 × 予約',
    description: '「いつ頃ご来店されますか？」の会話から、チャット内で予約画面に直接誘導。問い合わせから予約完了までをLINE上で完結させ、電話の取りこぼしをなくします。',
    href: '/reservation',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    title: 'ヒアリング・要件整理',
    description: '対応チャネル・スタッフ体制・既存システムをお聞きし、最適な構成を設計します。',
  },
  {
    step: 'Step 2',
    title: 'チャット基盤の構築',
    description: 'スタッフ⇔顧客チャット・対話履歴保存・担当アサインの基本機能を実装します。',
  },
  {
    step: 'Step 3',
    title: 'ボット・自動応答の設定',
    description: 'FAQ登録・チャットボットフロー・時間外応答を設定。スタッフの負荷を軽減します。',
  },
  {
    step: 'Step 4',
    title: 'MA連携・運用開始',
    description: 'セグメント配信との連携を設定し、運用を開始。対話データが施策に活きる状態にします。',
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '1to1コミュニケーション機能',
  name: 'グロースパック for LINE（1to1コミュニケーション）',
  description:
    'スタッフと顧客の1対1チャットをLINE公式アカウント上で実現。対話履歴・顧客タグ・AIサマリで、担当が替わっても接客品質を維持します。',
  provider: {
    '@type': 'Organization',
    name: 'クラスメソッド株式会社',
    url: 'https://classmethod.jp',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Japan',
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
      name: '1to1コミュニケーション',
      item: 'https://lp.growthpackforline.classmethod.net/1to1',
    },
  ],
};

const FAQS = [
  {
    q: '対応可能な業種は？',
    a: '小売・飲食・ホテル・スポーツ・エンタメなど、顧客との継続的なコミュニケーションが発生する業種全般に対応しています。業種固有のシナリオ設計もご相談ください。',
  },
  {
    q: 'オペレーターを複数人体制で運用できますか？',
    a: 'はい。スタッフごとのアカウント管理・担当アサイン・権限設定に対応しています。シフト制の運用やチーム間の引き継ぎフローも設計可能です。',
  },
  {
    q: '自動応答（チャットボット）と有人対応を併用できますか？',
    a: '可能です。時間外はボットが即応答し、翌営業日にスタッフへ自動引き継ぎするフローが標準的な構成です。問い合わせ種別に応じた振り分けフローも設定できます。',
  },
  {
    q: '導入期間と費用の目安は？',
    a: '基本チャット機能であれば最短3ヶ月での立ち上げが可能です。費用はスタッフ数・連携システム・ボットの複雑さによって変わるため、初回ヒアリングで概算をご提示します。',
  },
  {
    q: '業界別の活用事例を教えてください。',
    a: 'アパレルでは購買相談・スタイリング提案、飲食では予約変更・アレルギー確認、ホテルでは宿泊前後のフォローアップなど、業種ごとに活用パターンが異なります。詳細はご商談でご説明します。',
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
  name: 'LINE 1to1コミュニケーションの導入ステップ',
  description: '4ステップで段階的に導入できます',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      name: '要件ヒアリング・見積',
      text: '対応チャネル・スタッフ体制・既存システムをお聞きし、概算費用と工期を提示します。',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'チャット基盤の構築',
      text: 'スタッフ対顧客チャット・対話履歴保存・担当アサインの基本機能を実装します。',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'ボット・自動応答の設定',
      text: 'FAQ登録・チャットボットフロー・時間外応答を設定します。',
      position: 3,
    },
    {
      '@type': 'HowToStep',
      name: 'テスト・本番リリース',
      text: '受入テスト・LINEヤフー審査・本番リリースまで伴走します。',
      position: 4,
    },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LINE 1to1コミュニケーション｜双方向のチャット・お客様対応｜グロースパック for LINE',
  description: 'スタッフと顧客の1対1チャットをLINE公式アカウント上で実現。対話履歴・顧客タグ・AIサマリで、担当が替わっても接客品質を維持します。',
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

export default function OneToOnePage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <FeatureScrollTracker page="1to1" />

      {/* ============================================================ */}
      {/* Header                                                         */}
      {/* ============================================================ */}
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
              location="1to1_header"
              destination="contact"
            >
              お問い合わせ
            </TrackedExternalLink>
          </Button>
        }
      />

      {/* ============================================================ */}
      {/* Hero — ダーク背景（§7-1）                                       */}
      {/* ============================================================ */}
      <div className="relative min-h-[480px] md:min-h-[560px] flex items-center bg-[#f5f5f5] overflow-hidden">
        {/* ドットグリッド */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #1F2937 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="max-w-[720px] space-y-6 md:space-y-7">
            {/* バッジ */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-line-green-extra-light border border-line-green/40 rounded-full text-xs sm:text-sm font-semibold text-line-green-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-line-green-dark shrink-0" />
              1to1コミュニケーション機能
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-foreground">
              担当が替わっても、<br />
              お客様との<span className="text-line-green-dark">対話の歴史</span>と<br className="hidden sm:block" />
              <span className="text-line-green-dark">好み</span>が組織に残る。
            </h1>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-[600px]">スタッフと顧客の1対1チャットをLINE公式アカウント上で実現。対話履歴・顧客タグ・AIサマリで、異動や退職があっても接客品質を維持します。</p>

            {/* CTA */}
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
              <Button variant="outline" size="lg" asChild>
                <TrackedExternalLink
                  href="https://1to1demo.vercel.app"
                  location="hero"
                  destination="demo"
                >
                  デモを試す
                </TrackedExternalLink>
              </Button>
            </div>

            {/* チェックリスト */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              {['個人LINE脱却', '担当引き継ぎ', '24時間対応'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-line-green-dark" />
                  {t}
                </div>
              ))}
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
      {/* 3行でわかる                                                     */}
      {/* ============================================================ */}
      <Section id="key-takeaways" spacing="md" container="wide" background="white">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">3行でわかる、LINE 1to1コミュニケーションで何ができるか</h2>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-line-green text-white font-bold flex items-center justify-center text-sm">1</span>
              <p className="text-base text-foreground leading-relaxed pt-1">顧客との双方向チャットをLINE上で完結。個人LINEに頼らず、対話履歴を組織の資産として蓄積できる</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-line-green text-white font-bold flex items-center justify-center text-sm">2</span>
              <p className="text-base text-foreground leading-relaxed pt-1">問い合わせ対応・予約確認・オーダー受付をLINE一元化し、チャネルの分散を解消する</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-line-green text-white font-bold flex items-center justify-center text-sm">3</span>
              <p className="text-base text-foreground leading-relaxed pt-1">オペレーター負荷を分散し、担当アサインとAIサマリでCSスタッフの応答品質を統一する</p>
            </li>
          </ol>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* できること — 課題→解決カード一覧                                  */}
      {/* ============================================================ */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">
            FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            1to1コミュニケーションでできること
          </h2>
          <p className="text-base text-muted-foreground">個人LINEに頼らない、組織として顧客と対話する仕組みを構築します。</p>
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
                          location={`1to1_card_demo_${f.name}`}
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

      <PriceSection currentFeatureKey="1to1" />

      {/* ============================================================ */}
      {/* 他機能との組み合わせ                                             */}
      {/* ============================================================ */}
      <Section id="combinations" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">
            INTEGRATIONS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            他の機能と組み合わせる
          </h2>
          <p className="text-base text-muted-foreground">1to1コミュニケーションで蓄積した顧客理解を、他の機能と連携させることで施策の精度が変わります。</p>
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
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-link underline underline-offset-4 decoration-link/40 hover:text-link-hover hover:decoration-link-hover transition-colors"
                >
                  詳しく見る
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 導入ステップ                                                    */}
      {/* ============================================================ */}
      <Section id="steps" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">
            GETTING STARTED
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            導入ステップ
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STEPS.map((s, i) => (
            <Card key={s.step} variant="elevated" padding="md" rounded="xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-line-green-dark text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {i + 1}
                </div>
                <h3 className="text-base font-bold text-foreground">{s.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* よくある質問                                                    */}
      {/* ============================================================ */}
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

      {/* ============================================================ */}
      {/* 3ステップ導入フロー                                             */}
      {/* ============================================================ */}
      <Section id="how-to" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">HOW TO START</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">4ステップで導入できます</h2>
        </div>
        <ol className="max-w-[800px] space-y-4">
          <li className="bg-secondary rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">1. 要件ヒアリング・見積（〜2週間）</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">対応チャネル・スタッフ体制・既存システムをお聞きし、概算費用と工期をご提示します。</p>
          </li>
          <li className="bg-secondary rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">2. チャット基盤の構築（1〜2ヶ月）</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">スタッフ対顧客チャット・対話履歴保存・担当アサインの基本機能を実装します。</p>
          </li>
          <li className="bg-secondary rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">3. ボット・自動応答の設定（2〜4週間）</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">FAQ登録・チャットボットフロー・時間外応答を設定。スタッフの負荷を軽減します。</p>
          </li>
          <li className="bg-secondary rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">4. テスト・本番リリース（1ヶ月）</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">受入テスト・LINEヤフー審査・本番リリースまで伴走します。リリース後の運用フォローも対応可能です。</p>
          </li>
        </ol>
      </Section>

      {/* 同じステップの他の機能 */}
      <Section id="related-features" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green-dark mb-3">RELATED FEATURES</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">あわせて検討したい機能</h2>
          <p className="text-base text-muted-foreground">1to1コミュニケーションと組み合わせることで、顧客との関係性をさらに深める施策が設計できます。</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
          {[
            { name: 'セグメント配信', tagline: '属性・購買履歴に連動した動的リッチメニュー対応配信。', url: '/segment' },
            { name: 'ギフト', tagline: 'ソーシャルギフト機能で、顧客が顧客を呼ぶ循環を作る。', url: '/gift' },
            { name: 'スタンプカード', tagline: '来店履歴が見える、育つ。紛失ゼロのデジタルスタンプ。', url: '/stampcard' },
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

      {/* ============================================================ */}
      {/* 最終CTA（§7-10 ダーク背景）                                     */}
      {/* ============================================================ */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-line-green mb-2">
            CONTACT
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            1to1コミュニケーションの導入について、<br />
            <span className="text-line-green">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">対応チャネル・スタッフ体制・既存システムをお聞きして、最適な構成をご提案します。<span className="font-bold text-white">初回相談は無料です。</span></p>
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
        description="クラスメソッド株式会社が提供する LINE ミニアプリ開発サービス。1to1コミュニケーションで顧客との対話を組織の資産にします。"
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
                  <TrackedExternalLink
                    href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                    location="1to1_footer_contact"
                    destination="contact"
                    className="hover:text-white transition-colors"
                  >
                    お問い合わせ
                  </TrackedExternalLink>
                </li>
                <li>
                  <TrackedExternalLink
                    href="https://classmethod.jp/download/line-mini-app/"
                    location="1to1_footer_download"
                    destination="download"
                    className="hover:text-white transition-colors"
                  >
                    資料ダウンロード
                  </TrackedExternalLink>
                </li>
              </>
            ),
          },
        ]}
      />
    </main>
  );
}
