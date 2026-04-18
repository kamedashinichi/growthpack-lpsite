/**
 * /memberscard — グロースパック for LINE デジタル会員証機能ページ
 *
 * docs/DESIGN-FEATURE-PAGE.md に厳密に従う。
 * 「機能カタログ」ではなく「課題→解決のカード」を並べる構成。
 *
 * - 価格の具体額は一切記載しない
 * - 煽り語NG、丁寧体
 * - 顧客向けに「開発中」「未リリース」の表記は入れない
 */
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Award,
  UserPlus,
  Database,
  History,
  Tag,
  Award as RankIcon,
  Timer,
  Zap,
  BarChart3,
  Link2,
  MessageCircle,
  Stamp,
  Ticket,
  CalendarCheck,
} from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { Section } from '@/components/shared/ui/section';
import { Card } from '@/components/shared/ui/card';
import { FeatureScrollTracker } from '@/components/shared/feature-page/scroll-tracker';
import { TrackedExternalLink } from '@/components/shared/feature-page/tracking';

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const FEATURE_GROUPS = [
  {
    label: '会員基盤の構築',
    subtitle: '紙・属人管理からの脱却。ゼロから顧客データ基盤を立ち上げる',
    cards: [
      {
        icon: UserPlus,
        name: 'LINE友だち追加→会員ID自動発行',
        challenge: '紙の入会申込書を記入してもらっているが、面倒がって登録してくれない人が多い',
        solution: 'LINE友だち追加だけで会員IDを自動発行。記入・入力ゼロで会員母数が増える。',
        demo_url: 'https://asepro-membership-demo.vercel.app',
      },
      {
        icon: Database,
        name: '顧客IDを軸としたデータ紐付け',
        challenge: 'POSのデータ、スタッフのメモ、紙カードがバラバラで、同一顧客のデータが一元管理できていない',
        solution: '顧客IDを軸に、来店・購買・問い合わせ・スタンプ等のデータをすべて統合管理。',
      },
      {
        icon: History,
        name: '行動履歴の自動蓄積',
        challenge: 'お客様が何回来ているか、最後にいつ来たか、スタッフが都度調べないとわからない',
        solution: '来店・購買・各機能の利用履歴を自動で蓄積。誰でも瞬時に確認できる。',
      },
    ],
  },
  {
    label: '顧客プロフィール管理',
    subtitle: '一人ひとりの情報を組織の資産として蓄積・活用する',
    cards: [
      {
        icon: Tag,
        name: '顧客属性・タグ管理',
        challenge: 'お客様の好み・サイズ・アレルギーなど、担当スタッフの頭の中にしか情報がない',
        solution: '属性・タグをプロフィールに記録。誰が対応しても同じ情報をもとに接客できる。',
      },
      {
        icon: RankIcon,
        name: 'ランク自動判定エンジン',
        challenge: 'ゴールド会員とシルバー会員を手動で管理していて、判定基準もスタッフによってバラバラ',
        solution: 'ランク判定ルールを設定すれば、来店回数や購買金額に応じてランクを自動更新。',
      },
      {
        icon: Timer,
        name: '来店間隔・パターンの自動計測',
        challenge: '常連だと思っていたお客様が離脱していても、気づくのがいつも遅い',
        solution: '来店間隔の平均と最終来店日を自動計測。離脱予兆を早期に把握できる。',
      },
    ],
  },
  {
    label: '他機能への連携・データ活用',
    subtitle: '会員証が蓄積したデータを、スタンプ・配信・クーポンに活かす',
    cards: [
      {
        icon: Zap,
        name: 'イベント発火・自動連携',
        challenge: '会員登録・ランク昇格・来店などのタイミングに合わせてお知らせを送りたいが、手動で対応しきれない',
        solution: '会員登録・ランク変動・来店をイベントとして自動発火。配信シナリオのトリガーに。',
      },
      {
        icon: BarChart3,
        name: '属性・メトリクスの算出',
        challenge: '「どの会員に何を送るか」を決めるデータがなく、全員に同じ配信をしている',
        solution: 'ランク・来店回数・離脱リスクスコアを自動算出。セグメント配信の条件として活用。',
      },
      {
        icon: Link2,
        name: '外部システム連携',
        challenge: '既存のPOSや基幹システムに顧客データがあるが、LINEと別管理になっている',
        solution: 'POS・CRM等の既存システムとAPI連携。LINEと既存データを統合管理できる。',
      },
    ],
  },
];

const COMBINATIONS = [
  {
    icon: MessageCircle,
    name: '会員証 × 1to1コミュニケーション',
    description: 'チャット開始時に会員ランク・購買履歴・前回来店日を自動表示。スタッフは「初めまして」のやり取りなしに、お客様の文脈を把握した状態で対話を始められます。',
    href: '/1to1',
  },
  {
    icon: Stamp,
    name: '会員証 × スタンプカード',
    description: '来店スタンプが貯まるたびに会員プロフィールが更新。ランク×スタンプ進捗を組み合わせたボーナス特典や優先案内で、常連への育成サイクルが回ります。',
    href: '/stampcard',
  },
  {
    icon: Ticket,
    name: '会員証 × チケット・パス',
    description: 'チケット発行と同時に会員ID取得。イベント来場者を即座に会員化し、参加履歴を蓄積。「一夜限りの接点」をリピート来店の起点に変えます。',
    href: '/ticket',
  },
  {
    icon: CalendarCheck,
    name: '会員証 × 予約',
    description: '予約と同時に会員IDを取得し、予約履歴・来店履歴を自動蓄積。次回予約タイミングを計算して、ちょうどよい時期にリマインドを自動配信できます。',
    href: '/reservation',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    title: 'ヒアリング・要件整理',
    description: '既存の会員基盤・POS・ランク判定ルールをお聞きし、会員証の設計を行います。',
  },
  {
    step: 'Step 2',
    title: '会員ID発行・データ基盤の構築',
    description: 'LINE友だち追加→会員ID自動発行・行動履歴蓄積・プロフィール管理の基本機能を実装します。',
  },
  {
    step: 'Step 3',
    title: 'ランク・属性設定',
    description: 'ランク判定ルールと業界固有の顧客属性を設定。自動計測が動き始めます。',
  },
  {
    step: 'Step 4',
    title: '他機能との連携・運用開始',
    description: 'スタンプ・配信・クーポン等との連携を設定。会員データが施策の意思決定に活きる状態にします。',
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'デジタル会員証機能',
  name: 'グロースパック for LINE（デジタル会員証）',
  description:
    'LINE友だち追加で会員ID自動発行。来店履歴・ランク・属性を自動蓄積し、スタンプ・クーポン・配信など全機能のデータ基盤を構築します。',
  provider: {
    '@type': 'Organization',
    name: 'クラスメソッド株式会社',
    url: 'https://classmethod.jp',
  },
  areaServed: { '@type': 'Country', name: 'Japan' },
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
      name: 'デジタル会員証',
      item: 'https://lp.growthpackforline.classmethod.net/memberscard',
    },
  ],
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function MembersCardPage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <FeatureScrollTracker page="memberscard" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
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
            <a href="#features" className="hover:text-[#05A847] transition-colors">できること</a>
            <a href="#combinations" className="hover:text-[#05A847] transition-colors">組み合わせ</a>
            <a href="#steps" className="hover:text-[#05A847] transition-colors">導入ステップ</a>
          </nav>
          <Button variant="primary" size="sm" asChild>
            <TrackedExternalLink
              href="https://classmethod.jp/services/line/line-apps/#iframe-form"
              location="memberscard_header"
              destination="contact"
            >
              お問い合わせ
            </TrackedExternalLink>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative min-h-[480px] md:min-h-[560px] flex items-center bg-[#0a0a0a] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 80% 100%, rgba(6,199,85,0.22), transparent 70%), linear-gradient(135deg, #0a0a0a 0%, #1a1d21 60%, #0a0a0a 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 max-w-[600px] space-y-6 md:space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#06C755]/20 border border-[#06C755]/50 rounded-full text-xs sm:text-sm font-semibold text-[#06C755]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06C755] shrink-0" />
                デジタル会員証機能
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white">
                友だち追加するだけで、<br />
                お店が<span className="text-[#06C755]">自分のことを覚えて</span><br className="hidden sm:block" />
                くれる。
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">LINE友だち追加で会員ID自動発行。来店履歴・ランク・顧客属性を自動蓄積し、スタンプ・配信・クーポンなど全機能の顧客データ基盤を構築します。</p>
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
                <Button variant="outline" size="lg" asChild className="border-white/60 text-white hover:bg-white/10 hover:border-white">
                  <TrackedExternalLink
                    href="https://asepro-membership-demo.vercel.app"
                    location="hero"
                    destination="demo"
                  >
                    デモを試す
                  </TrackedExternalLink>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['登録ハードルゼロ', 'データ基盤の構築', '全機能の共通基盤'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#06C755]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
              <Image
                src="/images/member.png"
                alt="デジタル会員証のデモ画面"
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

      {/* できること */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">FEATURES</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">デジタル会員証でできること</h2>
          <p className="text-base text-[#4B5563]">紙・属人管理を脱却し、LINE上に顧客データ基盤を構築します。会員証は他の全機能の共通基盤として機能します。</p>
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
                          location={`memberscard_card_demo_${f.name}`}
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

      {/* 組み合わせ */}
      <Section id="combinations" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">INTEGRATIONS</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">他の機能と組み合わせる</h2>
          <p className="text-base text-[#4B5563]">会員証が蓄積した顧客データを他の機能に連携することで、施策の精度と自動化の範囲が広がります。</p>
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
                <div className="w-10 h-10 rounded-full bg-[#05A847] text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {i + 1}
                </div>
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

      {/* CTA */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#06C755] mb-2">CONTACT</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            デジタル会員証の導入について、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">既存の会員基盤・POSとの連携要件をお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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
            <Button variant="outline" size="lg" asChild className="border-white/50 text-white hover:bg-white/10 hover:border-white">
              <TrackedExternalLink
                href="https://classmethod.jp/download/line-mini-app/"
                location="footer_cta"
                destination="download"
              >
                資料をダウンロード
              </TrackedExternalLink>
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
                <div className="w-8 h-8 rounded-lg bg-[#06C755] flex items-center justify-center text-white font-bold text-sm">G</div>
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-white">グロースパック</span>
                  <span className="text-sm text-white/50"> for </span>
                  <span className="text-base font-bold text-[#06C755]">LINE</span>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。デジタル会員証で顧客データ基盤を構築します。</p>
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
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="memberscard_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="memberscard_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
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
