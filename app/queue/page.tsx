/**
 * /queue — グロースパック for LINE 順番待ち機能ページ
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
import { FeatureScrollTracker } from '@/components/shared/feature-page/scroll-tracker';
import { TrackedExternalLink } from '@/components/shared/feature-page/tracking';

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

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function QueuePage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <FeatureScrollTracker page="queue" />
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
            <TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="queue_header" destination="contact">お問い合わせ</TrackedExternalLink>
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
                順番待ち機能
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white">
                並ばなくていい。<br />
                LINEが、<span className="text-[#06C755]">ちょうどのタイミング</span>で<br className="hidden sm:block" />
                呼んでくれる。
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">LINE整理券で物理行列を解消。待ち人数・推定待ち時間のリアルタイム表示と順番接近通知で、お客様の時間を奪わない待ち体験を実現します。</p>
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
                    href="https://strongest-waiting.vercel.app"
                    location="hero"
                    destination="demo"
                  >
                    デモを試す</TrackedExternalLink>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['行列の解消', '問い合わせゼロ', '待ち時間を有効活用'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#06C755]" />
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">順番待ちでできること</h2>
          <p className="text-base text-[#4B5563]">紙の番号札と「あと何分？」の問い合わせをなくし、お客様とスタッフ双方の体験を改善します。</p>
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
                          location={`queue_card_demo_${f.name}`}
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
          <p className="text-base text-[#4B5563]">順番待ちで蓄積したデータを他機能と連携することで、待ち時間が顧客獲得と来店促進の機会に変わります。</p>
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
            順番待ちの導入について、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">業種・現在の列管理方法・複数窓口の有無をお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。LINE整理券で行列をなくします。</p>
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
                <li><TrackedExternalLink href="https://classmethod.jp/services/line/line-apps/#iframe-form" location="queue_footer_contact" destination="contact" className="hover:text-white transition-colors">お問い合わせ</TrackedExternalLink></li>
                <li><TrackedExternalLink href="https://classmethod.jp/download/line-mini-app/" location="queue_footer_download" destination="download" className="hover:text-white transition-colors">資料ダウンロード</TrackedExternalLink></li>
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
