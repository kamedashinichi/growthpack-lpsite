/**
 * /reservation — グロースパック for LINE 予約機能ページ
 *
 * docs/DESIGN-FEATURE-PAGE.md に厳密に従う。
 */
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Award,
  CalendarCheck,
  Bell,
  RefreshCw,
  Calendar,
  UserPlus,
  Users,
  Radio,
  BarChart3,
  CreditCard,
  Clock,
  Tag,
  MessageCircle,
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
    label: '予約受付・管理',
    subtitle: '電話・紙に頼らず、LINEで24時間予約を受け付ける',
    cards: [
      {
        icon: CalendarCheck,
        name: 'LINEからの予約受付',
        challenge: '電話が繋がらない・営業時間外に予約が取れないという理由で、他の店に流れているお客様がいる',
        solution: 'LINEリッチメニューから日時・メニュー・人数を選択して予約完結。24時間受付が自動で動く。',
        demo_url: 'https://growthpack-reservation-demo.vercel.app/demo/reserve',
      },
      {
        icon: Calendar,
        name: 'カレンダー連携・空き枠表示',
        challenge: '空き枠が電話でしか確認できず、お客様が予約をためらっている',
        solution: 'リアルタイムの空き枠をLINE上に表示。「空いていれば予約する」お客様を逃さない。',
      },
      {
        icon: RefreshCw,
        name: '予約変更・キャンセルのセルフ対応',
        challenge: '「変更したい」「キャンセルしたい」という電話が毎日かかってきてスタッフが対応に追われる',
        solution: 'お客様がLINEから自分で変更・キャンセル。スタッフへの電話問い合わせを大幅に削減。',
      },
    ],
  },
  {
    label: 'リマインドと自動配信',
    subtitle: '予約した人を確実に来店につなげる自動フォロー',
    cards: [
      {
        icon: Bell,
        name: '予約確認・リマインドの自動配信',
        challenge: '前日確認の電話をスタッフが全件かけているが、繋がらないことも多く工数がかかりすぎる',
        solution: '予約確認・前日リマインドを自動配信。スタッフの確認電話が不要になり、NoShow率が下がる。',
      },
      {
        icon: Radio,
        name: '時期ベースのリマインド',
        challenge: '車検・定期点検の時期になっても、通知を出す仕組みがなく他社に流出している',
        solution: '前回利用からの経過日数に応じて「そろそろ点検の時期では？」と自動配信。来店サイクルを維持。',
      },
    ],
  },
  {
    label: 'データ活用・他機能連携',
    subtitle: '予約データを顧客理解と施策改善に活かす',
    cards: [
      {
        icon: UserPlus,
        name: '予約→会員ID取得',
        challenge: '来店データは残っているが、同一顧客の過去の予約履歴と紐付けられていない',
        solution: '予約と同時にLINE友だち追加で会員ID取得。全予約履歴が顧客プロフィールに自動蓄積。',
      },
      {
        icon: Users,
        name: '予約客と飛び込み客の統合管理',
        description: '予約機能と順番待ち機能を連携。予約客と飛び込み客を1つの画面で統合管理し、当日オペレーションを一元化。',
        challenge: '予約台帳と当日飛び込み客の管理が分断していて、順番の公平性が保てない',
        solution: '予約機能と順番待ち機能を連携。予約客と飛び込み客を1つの画面で統合管理できる。',
      },
      {
        icon: BarChart3,
        name: '予約履歴・来店パターン分析',
        challenge: '「よく予約するメニュー」「来店サイクル」がデータとして蓄積されておらず、次の提案に活かせない',
        solution: '予約回数・利用メニュー・来店周期を自動蓄積。パーソナライズ配信とリマインドに活用。',
      },
    ],
  },
];

const COMBINATIONS = [
  {
    icon: CreditCard,
    name: '予約 × 会員証',
    description: '予約と同時に会員ID取得。予約履歴・来店履歴が会員プロフィールに蓄積され、次回予約タイミングを予測して自動リマインドを送るサイクルが動き始めます。',
    href: '/memberscard',
  },
  {
    icon: Clock,
    name: '予約 × 順番待ち',
    description: '予約なしの飛び込み客にLINE整理券を発行し、予約客と同じ画面で統合管理。「電話予約の人だけ優先されている」という現場の不公平感をなくします。',
    href: '/queue',
  },
  {
    icon: Tag,
    name: '予約 × クーポン',
    description: '予約完了時・来店後に次回予約クーポンを自動配布。「また来ようかな」のタイミングに来店動機のひと押しを自動で届けます。',
    href: '/coupon',
  },
  {
    icon: MessageCircle,
    name: '予約 × 1to1コミュニケーション',
    description: '「〇〇日に席はありますか？」というチャット相談から、そのままLINE上の予約画面に誘導。問い合わせから予約完了まで、LINE上で完結します。',
    href: '/1to1',
  },
];

const STEPS = [
  {
    step: 'Step 1',
    title: 'ヒアリング・要件整理',
    description: '現在の予約受付方法・メニュー構成・飛び込み客との統合要否・時期ベースのリマインド必要性をお聞きします。',
  },
  {
    step: 'Step 2',
    title: '予約受付・カレンダーの構築',
    description: '予約受付ロジック・空き枠表示・変更キャンセル機能・会員ID取得を実装します。',
  },
  {
    step: 'Step 3',
    title: 'リマインド配信の設定',
    description: '予約確認・前日リマインド・時期ベースの自動配信パイプラインを設定します。',
  },
  {
    step: 'Step 4',
    title: '順番待ち連携・運用開始',
    description: '飛び込み客との統合管理を設定し、運用を開始。予約データが蓄積されていきます。',
  },
];

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '予約機能',
  name: 'グロースパック for LINE（予約）',
  description: 'LINEで予約受付・リマインド・来店管理・事後配信を一気通貫で実現。24時間受付と自動リマインドで取りこぼしをなくします。',
  provider: { '@type': 'Organization', name: 'クラスメソッド株式会社', url: 'https://classmethod.jp' },
  areaServed: { '@type': 'Country', name: 'Japan' },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'グロースパック for LINE', item: 'https://lp.growthpackforline.classmethod.net/' },
    { '@type': 'ListItem', position: 2, name: '予約', item: 'https://lp.growthpackforline.classmethod.net/reservation' },
  ],
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function ReservationPage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <FeatureScrollTracker page="reservation" />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#06C755] flex items-center justify-center text-white font-bold text-sm">G</div>
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
            <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="reservation_header" destination="contact">お問い合わせ</TrackedExternalLink>
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
                予約機能
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white">
                電話と紙をやめたら、<br />
                予約が<span className="text-[#06C755]">顧客データ蓄積</span>の<br className="hidden sm:block" />
                起点になる。
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">LINEで予約受付・リマインド・来店管理・事後配信を一気通貫で実現。24時間受付と自動リマインドで、取りこぼしと確認電話の工数をなくします。</p>
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
                    href="https://growthpack-reservation-demo.vercel.app/demo/reserve"
                    location="hero"
                    destination="demo"
                  >
                    デモを試す</TrackedExternalLink>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['24時間受付', '自動リマインド', '取りこぼしゼロ'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#06C755]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-1 justify-center">
              <Image
                src="/images/reservation.png"
                alt="予約機能のデモ画面"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">予約でできること</h2>
          <p className="text-base text-[#4B5563]">「予約のデジタル化」ではなく、予約を起点とした顧客データ基盤の構築と来店LTV向上を支援します。</p>
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
                          location={`reservation_card_demo_${f.name}`}
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
          <p className="text-base text-[#4B5563]">予約データを他機能と連携させることで、来店サイクルの自動維持と顧客LTVの向上が実現します。</p>
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

      {/* CTA */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#06C755] mb-2">CONTACT</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            予約機能の導入について、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">現在の予約受付方法・メニュー構成・外部システム連携の要否をお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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
                <div className="w-8 h-8 rounded-lg bg-[#06C755] flex items-center justify-center text-white font-bold text-sm">G</div>
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-white">グロースパック</span>
                  <span className="text-sm text-white/50"> for </span>
                  <span className="text-base font-bold text-[#06C755]">LINE</span>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。予約を顧客データ基盤の起点にします。</p>
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
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="reservation_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="reservation_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
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
