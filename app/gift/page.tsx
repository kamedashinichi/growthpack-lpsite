/**
 * /gift — グロースパック for LINE ギフト機能ページ
 *
 * docs/DESIGN-FEATURE-PAGE.md に厳密に従う。
 */
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'LINEソーシャルギフト｜受取人自動会員化でCACを下げる送付スキーム｜グロースパック for LINE',
  description: '新規顧客獲得コストの高さ、ギフト送付後の受取人フォロー不足、贈答機会の未活用。LINEソーシャルギフトで受取人を自動会員化しCACを削減。ハーフスクラッチ開発で最短3ヶ月、事業会社向けグロースパック for LINE。',
  keywords: ['LINE ギフト', 'ソーシャルギフト', '受取人会員化', 'LINEミニアプリ', 'CAC', '新規獲得'],
  alternates: {
    canonical: '/gift',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/gift',
    title: 'LINEソーシャルギフト｜受取人自動会員化でCACを下げる送付スキーム｜グロースパック for LINE',
    description: '新規顧客獲得コストの高さ、ギフト送付後の受取人フォロー不足、贈答機会の未活用。LINEソーシャルギフトで受取人を自動会員化しCACを削減。ハーフスクラッチ開発で最短3ヶ月。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'LINEソーシャルギフト｜グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LINEソーシャルギフト｜受取人自動会員化でCACを下げる送付スキーム｜グロースパック for LINE',
    description: '新規顧客獲得コストの高さ、ギフト送付後の受取人フォロー不足、贈答機会の未活用。LINEソーシャルギフトで受取人を自動会員化しCACを削減。ハーフスクラッチ開発で最短3ヶ月。',
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
  Gift,
  UserPlus,
  Palette,
  ScanLine,
  Bell,
  Shield,
  Radio,
  CreditCard,
  MessageCircle,
  Shuffle,
  CalendarCheck,
} from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { Section } from '@/components/shared/ui/section';
import { Card } from '@/components/shared/ui/card';
import { FeatureScrollTracker } from '@/components/shared/feature-page/scroll-tracker';
import { TrackedExternalLink } from '@/components/shared/feature-page/tracking';
import { PriceSection } from '@/components/shared/feature-page/price-section';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const FEATURE_GROUPS = [
  {
    label: '贈る体験',
    subtitle: '住所不要・配送不要。URLを共有するだけで贈れる体験を作る',
    cards: [
      {
        icon: Gift,
        name: 'URL共有でギフト送信',
        challenge: '住所を聞くのが気まずくて、贈りたいのに購入を諦めているお客様が一定数いる',
        solution: 'URLをLINEで送るだけでギフト送信完結。住所不要・配送手配不要で贈る体験のハードルを下げる。',
        demo_url: 'https://gift-demo-one.vercel.app/demo/gift-top',
      },
      {
        icon: Palette,
        name: '受取人がサイズ・カラーを選択',
        challenge: 'サイズや好みがわからず、贈っても使ってもらえないかもと思って購入をためらわれる',
        solution: '受取人が自分でサイズ・カラー・タイプを選択。ミスマッチをなくし、返品コストもなくなる。',
      },
    ],
  },
  {
    label: '新規顧客の獲得',
    subtitle: 'ギフトを受け取った瞬間に、新しい顧客との接点が生まれる',
    cards: [
      {
        icon: UserPlus,
        name: 'ギフト受取→友だち追加→会員化',
        challenge: 'ギフトを受け取ったお客様がそのまま終わりで、その後に何もアプローチできない',
        solution: 'LIFF初回起動時にLINE友だち追加を促進。ギフト受取と同時に新規会員化する導線を構築。',
      },
      {
        icon: Radio,
        name: '受取ギフトの好みを会員プロフィールに登録',
        challenge: '初めて来てくれたお客様の好みがわからず、次のアプローチで何を薦めていいかわからない',
        solution: '受取人が選んだサイズ・カラー・タイプを会員プロフィールに自動登録。初回から好みがわかる状態で接客できる。',
      },
    ],
  },
  {
    label: 'ギフトの管理と追跡',
    subtitle: '受取状況を可視化し、未受取へのフォローを自動化する',
    cards: [
      {
        icon: ScanLine,
        name: 'チケット表示と店頭消込',
        challenge: '紙のギフト券は偽造・コピーのリスクがあり、スタッフが目視で真偽を確認する負担がかかる',
        solution: 'QRコード・バーコード表示で店頭消込。使用済みフラグで二重利用を自動防止。',
      },
      {
        icon: Bell,
        name: '未受取リマインド・受取完了通知',
        challenge: 'ギフトURLを送っても相手が受け取ったかどうか贈り主にわからず、確認するのも気まずい',
        solution: '未受取が続くと贈り主に通知。受取完了時には自動でサンクスメッセージを配信。',
      },
      {
        icon: Shield,
        name: 'セキュリティ・なりすまし防止',
        challenge: 'LINEのURL共有形式でギフトを配布すると、なりすましやURLの不正利用が心配',
        solution: '共通URL＋認証コード方式で本人確認。LIFFサーバーサイド検証でLINE IDを確実に照合。',
      },
    ],
  },
];

const COMBINATIONS = [
  {
    icon: CreditCard,
    name: 'ギフト × 会員証',
    description: 'ギフト受取→友だち追加→会員ID発行が自動で連動。贈り主と受取人の紹介ネットワークが可視化され、ギフトが「紹介経由の新規獲得チャネル」として機能します。',
    href: '/memberscard',
  },
  {
    icon: MessageCircle,
    name: 'ギフト × 1to1コミュニケーション',
    description: 'チャットで聞いた好みをもとに、その場でギフト提案。「お連れ様へのプレゼントをお探しですか？」から購買完了まで、対話の流れを切らずに実行できます。',
    href: '/1to1',
  },
  {
    icon: Shuffle,
    name: 'ギフト × 抽選',
    description: '抽選の当選景品としてギフトを自動配布。「当たったらどのアイテムを選ぼう？」という楽しみが、抽選参加意欲とイベントへの期待感を高めます。',
    href: '/lottery',
  },
  {
    icon: CalendarCheck,
    name: 'ギフト × 予約',
    description: '宿泊・飲食ギフトの受取人が、受取画面から予約日時を直接選択。ギフトの受取から来店・利用確定までをLINE上で完結させられます。',
    href: '/reservation',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    title: 'ヒアリング・要件整理',
    description: '商品形態・決済方法・消込方式・受取人の選択機能の要否をお聞きします。',
  },
  {
    step: 'Step 2',
    title: 'ギフト基盤の構築',
    description: 'URL共有方式のギフト発行・受取・チケット表示・店頭消込・セキュリティ機能を実装します。',
  },
  {
    step: 'Step 3',
    title: '会員連携・受取体験の設定',
    description: '受取時の友だち追加促進・好みの自動登録・受取通知・未受取リマインドを設定します。',
  },
  {
    step: 'Step 4',
    title: '他機能との連携・運用開始',
    description: '1to1・抽選・予約との連携を設定し、運用を開始します。',
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'ギフト機能',
  name: 'グロースパック for LINE（ギフト）',
  description: 'URLを共有するだけで贈れるソーシャルギフト。受取人がサイズ・カラーを自分で選択。ギフト受取と同時に新規会員化する導線を構築します。',
  provider: { '@type': 'Organization', name: 'クラスメソッド株式会社', url: 'https://classmethod.jp' },
  areaServed: { '@type': 'Country', name: 'Japan' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'グロースパック for LINE', item: 'https://lp.growthpackforline.classmethod.net/' },
    { '@type': 'ListItem', position: 2, name: 'ギフト', item: 'https://lp.growthpackforline.classmethod.net/gift' },
  ],
};

const FAQS = [
  {
    q: '受取人の会員化はどのような仕組みですか？',
    a: 'ギフトURLを開いた受取人のLIFF初回起動時にLINE友だち追加を促す導線を設置します。友だち追加と同時に会員IDが自動発行され、受取時の選択情報（サイズ・カラー等）も会員プロフィールに自動登録されます。',
  },
  {
    q: '既存のECサイトやショッピングカートと連携できますか？',
    a: '可能です。既存ECの商品DBやカート・決済フローとAPI連携する設計が可能です。連携方式はお客様のシステム構成に合わせてご提案します。',
  },
  {
    q: 'ギフトの種類は物品とデジタルのどちらに対応していますか？',
    a: '両方に対応しています。物品ギフトは受取人の住所入力不要でURLを送るだけ、デジタルギフトはQRコード・バーコード形式でLINE上に表示し店頭で消込できます。',
  },
  {
    q: '導入期間と費用の目安は？',
    a: 'ギフト基本機能であれば最短3ヶ月での立ち上げが可能です。費用は商品種別・決済連携・消込方式によって変わるため、初回ヒアリングで概算をご提示します。',
  },
  {
    q: '業界別の活用事例を教えてください。',
    a: 'アパレルではサイズ選択型ギフト、飲食・ホテルでは体験型ギフト（受取後に予約画面へ誘導）、スポーツ・エンタメではチケット型ギフトとして活用されています。詳細はご商談でご説明します。',
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
  name: 'LINEソーシャルギフトの導入ステップ',
  description: '4ステップで段階的に導入できます',
  totalTime: 'P3M',
  step: [
    {
      '@type': 'HowToStep',
      name: '要件ヒアリング・見積',
      text: '商品形態・決済方法・消込方式・受取人の選択機能の要否をお聞きします。',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: 'ギフト基盤の構築',
      text: 'URL共有方式のギフト発行・受取・チケット表示・店頭消込・セキュリティ機能を実装します。',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: '会員連携・受取体験の設定',
      text: '受取時の友だち追加促進・好みの自動登録・受取通知・未受取リマインドを設定します。',
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
  headline: 'LINEソーシャルギフト｜受取人自動会員化でCACを下げる送付スキーム｜グロースパック for LINE',
  description: 'URLを共有するだけで贈れるソーシャルギフト。受取人がサイズ・カラーを自分で選択。ギフト受取と同時に新規会員化する導線を構築します。',
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

export default function GiftPage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <FeatureScrollTracker page="gift" />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <Image
              src="/logo_classmethod_black.png"
              alt="クラスメソッド"
              width={120}
              height={38}
              className="hidden md:block h-[34px] w-auto object-contain"
              priority
            />
            <Image
              src="/logo_classmethod_mobile.png"
              alt="クラスメソッド"
              width={32}
              height={32}
              className="md:hidden h-7 w-7 object-contain"
              priority
            />
            <div className="flex items-center gap-1">
              <span className="text-base md:text-lg font-bold text-[#1F2937]">グロースパック</span>
              <span className="text-sm md:text-base text-[#6B7280]"> for </span>
              <span className="text-base md:text-lg font-bold text-[#06C755]">LINE</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#1F2937]">
            <a href="#features" className="hover:text-[#05A847] transition-colors">できること</a>
            <a href="#combinations" className="hover:text-[#05A847] transition-colors">組み合わせ</a>
            <a href="#steps" className="hover:text-[#05A847] transition-colors">導入ステップ</a>
          </nav>
          <Button variant="primary" size="sm" asChild>
            <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="gift_header" destination="contact">お問い合わせ</TrackedExternalLink>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative min-h-[480px] md:min-h-[560px] flex items-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 100%, rgba(6,199,85,0.22), transparent 70%), linear-gradient(135deg, #0a0a0a 0%, #1a1d21 60%, #0a0a0a 100%)' }} />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 max-w-[600px] space-y-6 md:space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#06C755]/20 border border-[#06C755]/50 rounded-full text-xs sm:text-sm font-semibold text-[#06C755]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06C755] shrink-0" />
                ギフト機能
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white">
                住所を知らなくても、<br />
                相手に<span className="text-[#06C755]">「選ぶ楽しさ」</span>ごと<br />
                贈れる。
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">URLを共有するだけで贈れるソーシャルギフト。受取人がサイズ・カラーを自分で選択。ギフト受取と同時に新規会員化する導線を構築します。</p>
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
                    href="https://gift-demo-one.vercel.app/demo/gift-top"
                    location="hero"
                    destination="demo"
                  >
                    デモを試す</TrackedExternalLink>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['住所不要', '受取人が自分で選ぶ', '受取と同時に会員化'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#06C755]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
              <Image
                src="/images/gift.png"
                alt="ギフト機能のデモ画面"
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
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-6">
          {/* 信頼帯 上段: LINEヤフー パートナー認定 */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <Image
                src="/badge_ly_tech_partner_communication.png"
                alt="LINEヤフー 2026年度 Technology Partner Communication部門"
                width={437}
                height={382}
                className="h-16 sm:h-20 w-auto object-contain shrink-0"
              />
              <div className="text-left">
                <div className="text-xs text-[#6B7280]">LINEヤフー</div>
                <div className="text-sm font-semibold text-[#1F2937] leading-snug">
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
                width={150}
                height={131}
                className="h-16 sm:h-20 w-auto object-contain shrink-0"
              />
              <div className="text-left">
                <div className="text-xs text-[#6B7280]">LINEヤフー</div>
                <div className="text-sm font-semibold text-[#1F2937] leading-snug">
                  2026年度 Technology Partner
                  <br />
                  LINEミニアプリ部門
                </div>
              </div>
            </div>
          </div>
          {/* 信頼帯 下段: その他の認定・実績 */}
          <div className="mt-5 pt-5 border-t border-[#E5E7EB] flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
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

      {/* 3行でわかる */}
      <Section id="key-takeaways" spacing="md" container="wide" background="white">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">3行でわかる、LINEソーシャルギフトで何ができるか</h2>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">1</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">受取人の自動会員化でCACをゼロに近づける送付スキーム。住所不要でURLを送るだけで贈れる</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">2</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">ギフト受取→会員化→再来訪のフローをLINE上で完結させ、一度きりの接点をリピートに変える</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#06C755] text-white font-bold flex items-center justify-center text-sm">3</span>
              <p className="text-base text-[#1F2937] leading-relaxed pt-1">既存EC・通販と連携し、贈り物市場を新規顧客獲得チャネルとして設計できる</p>
            </li>
          </ol>
        </div>
      </Section>

      {/* できること */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">FEATURES</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">ギフトでできること</h2>
          <p className="text-base text-[#4B5563]">「贈りたいのに購入をためらわれる」「受取人との接点が一度きり」という2つの機会損失を解消します。</p>
        </div>
        <div className="space-y-12 md:space-y-16">
          {FEATURE_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-1">{group.label}</h3>
                <p className="text-sm text-[#6B7280]">{group.subtitle}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {group.cards.map((f) => {
                  const Icon = f.icon;
                  return (
                    <Card key={f.name} padding="md">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#05A847]" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#1F2937] leading-snug pt-1">{f.name}</h3>
                      </div>
                      <p className="text-sm text-[#9CA3AF] mb-2">「{f.challenge}」</p>
                      <p className="text-sm text-[#4B5563] leading-relaxed">{f.solution}</p>
                      {f.demo_url && (
                        <TrackedExternalLink
                          href={f.demo_url}
                          location={`gift_card_demo_${f.name}`}
                          destination="demo"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#05A847] mt-3 hover:text-[#048838] transition-colors"
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

      <PriceSection currentFeatureKey="gift" />

      {/* 組み合わせ */}
      <Section id="combinations" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">INTEGRATIONS</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">他の機能と組み合わせる</h2>
          <p className="text-base text-[#4B5563]">ギフトで獲得した新規顧客を会員証・1to1・抽選と連携することで、一度きりの接点をリピート来店につなげます。</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {COMBINATIONS.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.name} variant="elevated" padding="lg" rounded="xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#05A847]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">{c.name}</h3>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-4">{c.description}</p>
                <Link href={c.href} className="inline-flex items-center gap-1 text-sm font-semibold text-[#05A847] hover:text-[#048838] transition-colors">
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
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">GETTING STARTED</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">導入ステップ</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STEPS.map((s, i) => (
            <Card key={s.step} variant="elevated" padding="md" rounded="xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#05A847] text-white font-bold flex items-center justify-center text-sm shrink-0">{i + 1}</div>
                <div>
                  <div className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider">{s.step}</div>
                  <h3 className="text-base font-bold text-[#1F2937]">{s.title}</h3>
                </div>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed">{s.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* よくある質問 */}
      <Section id="faq" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">FAQ</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">よくある質問</h2>
        </div>
        <div className="max-w-[800px] space-y-4">
          {FAQS.map((f) => (
            <details key={f.q} className="bg-white rounded-xl border border-[#E5E7EB] p-5 group">
              <summary className="cursor-pointer font-semibold text-[#1F2937] text-base leading-snug list-none flex justify-between items-start gap-4">
                <span>{f.q}</span>
                <span className="shrink-0 text-[#05A847] mt-0.5">+</span>
              </summary>
              <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 4ステップ導入フロー */}
      <Section id="how-to" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">HOW TO START</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">4ステップで導入できます</h2>
        </div>
        <ol className="max-w-[800px] space-y-4">
          <li className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">1. 要件ヒアリング・見積（〜2週間）</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">商品形態・決済方法・消込方式・受取人の選択機能の要否をお聞きします。</p>
          </li>
          <li className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">2. ギフト基盤の構築（1〜2ヶ月）</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">URL共有方式のギフト発行・受取・チケット表示・店頭消込・セキュリティ機能を実装します。</p>
          </li>
          <li className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">3. 会員連携・受取体験の設定（2〜4週間）</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">受取時の友だち追加促進・好みの自動登録・受取通知・未受取リマインドを設定します。</p>
          </li>
          <li className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6">
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">4. テスト・本番リリース（1ヶ月）</h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">受入テスト・LINEヤフー審査・本番リリースまで伴走します。リリース後の運用フォローも対応可能です。</p>
          </li>
        </ol>
      </Section>

      {/* 同じステップの他の機能 */}
      <Section id="related-features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-6">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">SAME STEP</div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">あわせて検討したい機能</h2>
          <p className="text-sm text-[#6B7280]">「関係性の深化」ステップの機能と、連携効果の高い機能です。</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 max-w-[900px]">
          <Link
            href="/segment"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#05A847] hover:bg-[#F0FBF4] transition-colors group"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
              <Image src="/images/セグメント配信.png" alt="セグメント配信" width={24} height={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1F2937] group-hover:text-[#05A847] transition-colors">セグメント配信</p>
              <p className="text-xs text-[#6B7280] leading-snug mt-0.5">属性・購買履歴に連動した動的リッチメニュー対応配信。</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#05A847] shrink-0 transition-colors" />
          </Link>
          <Link
            href="/1to1"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#05A847] hover:bg-[#F0FBF4] transition-colors group"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
              <Image src="/images/1to1.png" alt="1to1コミュニケーション" width={24} height={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1F2937] group-hover:text-[#05A847] transition-colors">1to1コミュニケーション</p>
              <p className="text-xs text-[#6B7280] leading-snug mt-0.5">オペレーター対応をLINEに統合。接客以上の価値を提供。</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#05A847] shrink-0 transition-colors" />
          </Link>
          <Link
            href="/memberscard"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#05A847] hover:bg-[#F0FBF4] transition-colors group"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
              <Image src="/images/会員証.png" alt="デジタル会員証" width={24} height={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1F2937] group-hover:text-[#05A847] transition-colors">デジタル会員証</p>
              <p className="text-xs text-[#6B7280] leading-snug mt-0.5">アプリDL不要。バーコード提示で5秒つながる次世代会員体験。</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#05A847] shrink-0 transition-colors" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#06C755] mb-2">CONTACT</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            ギフト機能の導入について、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">商品形態・決済方法・消込方式をお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white/80 py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 md:gap-10 mb-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo_classmethod_white.png"
                  alt="クラスメソッド"
                  width={120}
                  height={38}
                  className="hidden md:block h-7 w-auto object-contain"
                />
                <Image
                  src="/icon-light-32x32.png"
                  alt="クラスメソッド"
                  width={32}
                  height={32}
                  className="md:hidden h-7 w-7 object-contain"
                />
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-white">グロースパック</span>
                  <span className="text-sm text-white/50"> for </span>
                  <span className="text-base font-bold text-[#06C755]">LINE</span>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。ギフトを新規顧客獲得チャネルに変えます。</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">SERVICE</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">できること</a></li>
                <li><a href="#combinations" className="hover:text-white transition-colors">他機能との組み合わせ</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">RESOURCES</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#steps" className="hover:text-white transition-colors">導入ステップ</a></li>
                <li><a href="https://dev.classmethod.jp/tags/line/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">技術ブログ</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">CONTACT</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="gift_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="gift_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>&copy; Classmethod, Inc.</p>
            <div className="flex items-center gap-4">
              <a href="https://classmethod.jp/privacy/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">プライバシーポリシー</a>
              <a href="https://classmethod.jp/services/line/" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">LINE総合支援サービス</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
