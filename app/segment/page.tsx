/**
 * /segment — グロースパック for LINE セグメント配信機能ページ
 *
 * docs/DESIGN-FEATURE-PAGE.md に厳密に従う。
 */
import Link from 'next/link';
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
import { FeatureScrollTracker } from '@/components/shared/feature-page/scroll-tracker';
import { TrackedExternalLink } from '@/components/shared/feature-page/tracking';

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

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function SegmentPage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <FeatureScrollTracker page="segment" />
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
            <a href="https://classmethod.jp/services/line/line-apps/#iframe-form" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <div className="relative min-h-[480px] md:min-h-[560px] flex items-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 100%, rgba(6,199,85,0.22), transparent 70%), linear-gradient(135deg, #0a0a0a 0%, #1a1d21 60%, #0a0a0a 100%)' }} />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="max-w-[720px] space-y-6 md:space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#06C755]/20 border border-[#06C755]/50 rounded-full text-xs sm:text-sm font-semibold text-[#06C755]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06C755] shrink-0" />
              セグメント配信機能
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white">
              「誰に・いつ・何を送るか」を<br />
              <span className="text-[#06C755]">データで決め</span>、<br />
              全員に同じ配信から卒業する。
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">会員証・スタンプ・予約などのデータを組み合わせてセグメントを構築。パーソナライズ配信と自動シナリオで、配信効果を最大化します。</p>
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
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
              {['全機能データを一元管理', 'シナリオ配信の自動化', '開封率・クリック率の可視化'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#06C755]" />
                  {t}
                </div>
              ))}
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">セグメント配信でできること</h2>
          <p className="text-base text-[#4B5563]">会員証と必ずセットで導入。会員証がデータを蓄積し、セグメント配信が管理画面とデータ活用を担います。</p>
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
          <p className="text-base text-[#4B5563]">セグメント配信は全機能のデータを集約する中枢です。連携する機能が増えるほど、配信の精度と自動化の範囲が広がります。</p>
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
            セグメント配信の導入について、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">既存のCRM/MAツール・最初に自動化したい配信シナリオをお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供するLINEミニアプリ開発サービス。セグメント配信で全機能のデータを施策に活かします。</p>
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
                <li><a href="https://classmethod.jp/services/line/line-apps/#iframe-form" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">お問い合わせ</a></li>
                <li><a href="https://classmethod.jp/download/line-mini-app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">資料ダウンロード</a></li>
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
