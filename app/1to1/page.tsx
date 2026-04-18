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
 * - 価格の具体額は一切記載しない
 * - 煽り語NG、丁寧体
 * - 顧客向けに「開発中」「未リリース」の表記は入れない
 */
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
import { FeatureScrollTracker } from '@/components/shared/feature-page/scroll-tracker';
import { TrackedExternalLink } from '@/components/shared/feature-page/tracking';

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
        demo_url: 'https://1to1demo-496glb3ku-classmethod-8335c27a.vercel.app',
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

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */

export default function OneToOnePage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <FeatureScrollTracker page="1to1" />

      {/* ============================================================ */}
      {/* Header                                                         */}
      {/* ============================================================ */}
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
              location="1to1_header"
              destination="contact"
            >
              お問い合わせ
            </TrackedExternalLink>
          </Button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* Hero — ダーク背景（§7-1）                                       */}
      {/* ============================================================ */}
      <div className="relative min-h-[480px] md:min-h-[560px] flex items-center bg-[#0a0a0a] overflow-hidden">
        {/* 背景グラデ */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 80% 100%, rgba(6,199,85,0.22), transparent 70%), linear-gradient(135deg, #0a0a0a 0%, #1a1d21 60%, #0a0a0a 100%)',
          }}
        />
        {/* ドットグリッド */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="max-w-[720px] space-y-6 md:space-y-7">
            {/* バッジ */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#06C755]/20 border border-[#06C755]/50 rounded-full text-xs sm:text-sm font-semibold text-[#06C755]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06C755] shrink-0" />
              1to1コミュニケーション機能
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-white">
              担当が替わっても、<br />
              お客様との<span className="text-[#06C755]">対話の歴史</span>と<br className="hidden sm:block" />
              <span className="text-[#06C755]">好み</span>が組織に残る。
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">スタッフと顧客の1対1チャットをLINE公式アカウント上で実現。対話履歴・顧客タグ・AIサマリで、異動や退職があっても接客品質を維持します。</p>

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
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white/60 text-white hover:bg-white/10 hover:border-white"
              >
                <TrackedExternalLink
                  href="https://1to1demo-496glb3ku-classmethod-8335c27a.vercel.app"
                  location="hero"
                  destination="demo"
                >
                  デモを試す
                </TrackedExternalLink>
              </Button>
            </div>

            {/* チェックリスト */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
              {['個人LINE脱却', '担当引き継ぎ', '24時間対応'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#06C755]" />
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

      {/* ============================================================ */}
      {/* できること — 課題→解決カード一覧                                  */}
      {/* ============================================================ */}
      <Section id="features" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            1to1コミュニケーションでできること
          </h2>
          <p className="text-base text-[#4B5563]">個人LINEに頼らない、組織として顧客と対話する仕組みを構築します。</p>
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
                          location={`1to1_card_demo_${f.name}`}
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

      {/* ============================================================ */}
      {/* 他機能との組み合わせ                                             */}
      {/* ============================================================ */}
      <Section id="combinations" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            INTEGRATIONS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            他の機能と組み合わせる
          </h2>
          <p className="text-base text-[#4B5563]">1to1コミュニケーションで蓄積した顧客理解を、他の機能と連携させることで施策の精度が変わります。</p>
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
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#05A847] hover:text-[#048838] transition-colors"
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
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
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

      {/* ============================================================ */}
      {/* 最終CTA（§7-10 ダーク背景）                                     */}
      {/* ============================================================ */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#06C755] mb-2">
            CONTACT
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            1to1コミュニケーションの導入について、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">対応チャネル・スタッフ体制・既存システムをお聞きして、最適な構成をご提案します。初回相談は無料です。</p>
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
              <p className="text-xs text-white/50 leading-relaxed">クラスメソッド株式会社が提供する LINE ミニアプリ開発サービス。1to1コミュニケーションで顧客との対話を組織の資産にします。</p>
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
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">CONTACT</div>
              <ul className="space-y-2 text-sm text-white/60">
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
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>&copy; Classmethod, Inc.</p>
            <div className="flex items-center gap-4">
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
