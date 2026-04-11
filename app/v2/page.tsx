/**
 * /v2 — Growthpack for LINE LPサイト再構築 プロトタイプ
 *
 * 原則:
 * - docs/DESIGN.md v1.4 に厳密に従う
 * - 現LPの既存コンポーネントは一切 import しない（ゼロから構築）
 * - 共通プリミティブ Button/Section/Card のみ使用
 * - コンテンツは growthpack MCP から取得した正準情報を反映
 * - 業界中立のメインLPとして機能する
 */
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CreditCard,
  Clock,
  Calendar,
  Stamp,
  Ticket,
  Gift,
  MessageCircle,
  Users,
  Send,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { Section } from '@/components/shared/ui/section';
import { Card } from '@/components/shared/ui/card';

const FEATURES = [
  {
    icon: CreditCard,
    name: 'デジタル会員証',
    tagline: 'アプリDL不要、5秒でつながる会員体験',
    phase: 'Phase 1',
    id: 'membership',
  },
  {
    icon: Clock,
    name: '順番待ち',
    tagline: '待ち時間を会員化と顧客体験のチャンスへ',
    phase: 'Phase 1',
    id: 'queue',
  },
  {
    icon: Calendar,
    name: '予約',
    tagline: '予約から育つリピーター育成の仕組み',
    phase: 'Phase 1',
    id: 'reservation',
  },
  {
    icon: Stamp,
    name: 'スタンプカード',
    tagline: '顧客が見える、育つ、次世代スタンプカード',
    phase: 'Phase 2',
    id: 'stamp-card',
  },
  {
    icon: Ticket,
    name: 'クーポン配信',
    tagline: 'LINE公式クーポンの限界を突破する高機能配信',
    phase: 'Phase 2',
    id: 'coupon',
  },
  {
    icon: Ticket,
    name: 'チケット・パス',
    tagline: 'LINEで完結、CRMで管理する入場導線',
    phase: 'Phase 2',
    id: 'ticket',
  },
  {
    icon: Sparkles,
    name: '抽選',
    tagline: '当たるワクワクでエンゲージメントを加速',
    phase: 'Phase 2',
    id: 'lottery',
  },
  {
    icon: Send,
    name: 'セグメント配信',
    tagline: '動的リッチメニュー対応の One to One 配信',
    phase: 'Phase 3',
    id: 'segment-delivery',
  },
  {
    icon: MessageCircle,
    name: '1to1コミュニケーション',
    tagline: 'その対応を、接客以上の価値へ',
    phase: 'Phase 3',
    id: 'one-to-one',
  },
  {
    icon: Gift,
    name: 'ギフト',
    tagline: '顧客データにつながる次世代ソーシャルギフト',
    phase: 'Phase 3',
    id: 'gift',
  },
];

const PROBLEMS = [
  {
    title: '会員獲得の壁',
    body: 'ネイティブアプリのダウンロードや複雑な会員登録が障壁となり、特にライトユーザーの獲得が進みません。',
  },
  {
    title: '店舗とECの分断',
    body: '店舗会員とEC会員のデータが連携できず、オムニチャネル戦略が十分に機能していません。',
  },
  {
    title: '画一的なコミュニケーション',
    body: '顧客属性や購買履歴を活かしたセグメント配信ができず、配信の反応率が伸び悩みます。',
  },
  {
    title: 'エンゲージメント施策の断片化',
    body: 'クーポン・スタンプ・ギフト・予約などが個別システムで管理され、運用コストが増大しています。',
  },
];

const PHASES = [
  {
    phase: 'Phase 1',
    label: '顧客接点の創出',
    features: ['デジタル会員証', '順番待ち', '予約'],
    description: 'まず「つながる」ための土台を用意します。アプリDL不要の会員化で、ライトユーザーまで取り込みます。',
  },
  {
    phase: 'Phase 2',
    label: 'エンゲージメント強化',
    features: ['スタンプカード', 'クーポン配信', 'チケット・パス', '抽選'],
    description: '来店動機と再訪のきっかけを作ります。基盤の上に施策を重ね、顧客体験を段階的に厚くします。',
  },
  {
    phase: 'Phase 3',
    label: '関係性の深化',
    features: ['セグメント配信', '1to1コミュニケーション', 'ギフト'],
    description: '蓄積したデータを使って、一人ひとりに最適な接触へ。紹介による新規獲得まで広げます。',
  },
];

const FAQS = [
  {
    q: '導入にはどのくらいの期間がかかりますか？',
    a: '約1ヶ月からです。機能範囲と外部システム連携の有無により変動します。フェーズ1の会員証のみであれば最短1ヶ月、複数機能+CRM連携の場合は2〜3ヶ月が目安です。',
  },
  {
    q: '既存のCRMやPOSシステムと連携できますか？',
    a: 'はい、カスタマイズ領域として対応しています。Salesforce、Kintone、自社会員DBなどとの連携実績があります。連携方式はお客様の既存システムに合わせて設計します。',
  },
  {
    q: 'LINE公式アカウントの標準機能と何が違いますか？',
    a: 'LINE公式アカウントはテンプレート機能の組み合わせに限られますが、グロースパックは会員IDとの完全連携、外部CRM/ECシステムとのリアルタイム連携、フルカスタムデザインが可能です。',
  },
  {
    q: '他のLINEミニアプリSaaSと比べた強みは？',
    a: 'SaaSでは実現できない柔軟なカスタマイズと、高品質なサポート・性能を提供します。初期コストはSaaSよりかかりますが、スクラッチ開発と比べると半分以下の期間と費用で立ち上がります。',
  },
];

export default function V2TopPage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">
      {/* ============================================ */}
      {/* Header (minimal) */}
      {/* ============================================ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/v2" className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#06C755] flex items-center justify-center text-white font-bold">
              G
            </div>
            <div className="flex items-center gap-1">
              <span className="text-base md:text-lg font-bold text-[#1F2937]">グロースパック</span>
              <span className="text-sm md:text-base text-[#6B7280]">for</span>
              <span className="text-base md:text-lg font-bold text-[#06C755]">LINE</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#1F2937]">
            <a href="#problems" className="hover:text-[#05A847]">課題</a>
            <a href="#positioning" className="hover:text-[#05A847]">選ばれる理由</a>
            <a href="#features" className="hover:text-[#05A847]">機能</a>
            <a href="#phases" className="hover:text-[#05A847]">導入ステップ</a>
            <a href="#faq" className="hover:text-[#05A847]">FAQ</a>
          </nav>
          <Button variant="primary" size="sm" asChild>
            <a href="#contact">お問い合わせ</a>
          </Button>
        </div>
      </header>

      {/* ============================================ */}
      {/* Hero */}
      {/* ============================================ */}
      <Section spacing="lg" container="wide" background="white">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F8F0] border border-[#06C755]/30 rounded-full text-xs sm:text-sm font-semibold text-[#05A847]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06C755]" />
              LINEヤフー Partner Program Technology Partner
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight">
              LINEミニアプリで、<br />
              顧客との接点を<br className="sm:hidden" />
              <span className="text-[#05A847]">ひらく。</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-[640px]">
              ハーフスクラッチ開発で、SaaSの速さとフルスクラッチの柔軟性を両立。
              会員証・予約・クーポンなど10機能のアセットから、あなたのビジネスに必要なものだけを選び、
              <span className="font-bold text-[#1F2937]">最短1ヶ月</span>で立ち上げます。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button variant="primary" size="lg" asChild>
                <a href="#contact">
                  無料で相談する
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#features">機能と価格を見る</a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#06C755]" />
                最短1ヶ月で立ち上げ
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#06C755]" />
                10機能から選択可能
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#06C755]" />
                CRM・POS連携対応
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-square max-w-[480px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#06C755]/15 via-[#06C755]/5 to-[#E8F8F0] rounded-[32px]" />
              <div className="absolute inset-4 bg-white rounded-[24px] shadow-xl border border-[#E5E7EB] overflow-hidden">
                <div className="h-12 bg-[#06C755] flex items-center px-5 gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold text-sm">G</div>
                  <div className="text-white text-sm font-bold">グロースパック ストア</div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-[#E8F8F0] rounded-xl p-4 border border-[#06C755]/20">
                    <div className="text-xs text-[#05A847] font-bold mb-1">MEMBERSHIP</div>
                    <div className="font-bold text-[#1F2937] mb-2">デジタル会員証</div>
                    <div className="h-20 bg-white rounded-lg border border-dashed border-[#06C755]/40 flex items-center justify-center text-xs text-[#6B7280]">
                      QRコード
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                      <Stamp className="w-5 h-5 text-[#05A847] mb-1" />
                      <div className="text-xs font-semibold">スタンプ</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                      <Ticket className="w-5 h-5 text-[#05A847] mb-1" />
                      <div className="text-xs font-semibold">クーポン</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#FCD34D] rounded-full opacity-60 blur-sm" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-[#06C755] rounded-full opacity-40 blur-sm" />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* Problems */}
      {/* ============================================ */}
      <Section id="problems" spacing="sm" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-14">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            CHALLENGES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            こんな課題、ありませんか。
          </h2>
          <p className="text-base text-[#4B5563]">
            リテール・サービス業の現場では、顧客接点のデジタル化が進む一方で、
            次のような構造的な課題が繰り返し発生しています。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {PROBLEMS.map((p) => (
            <Card key={p.title} padding="md">
              <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] mb-3">
                {p.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                {p.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* Positioning */}
      {/* ============================================ */}
      <Section id="positioning" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-14">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            WHY GROWTHPACK
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            SaaS と スクラッチ、その間に。
          </h2>
          <p className="text-base text-[#4B5563]">
            SaaSは速く安いが、拡張と連携に制約があります。フルスクラッチは自由度が高いが、
            期間とコストが膨らみます。グロースパックは両者の中間に立ち、
            <span className="font-bold text-[#1F2937]">速さ・柔軟性・サポート</span>を同時に提供します。
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-4 md:gap-5">
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Option A</div>
            <h3 className="text-lg font-bold mb-2">SaaS<br />（拡張性なし）</h3>
            <div className="text-sm text-[#6B7280] space-y-1">
              <div>初期コスト: 低</div>
              <div>拡張性: △</div>
              <div>サポート: △</div>
            </div>
          </Card>
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Option B</div>
            <h3 className="text-lg font-bold mb-2">SaaS<br />（拡張性あり）</h3>
            <div className="text-sm text-[#6B7280] space-y-1">
              <div>初期コスト: 低</div>
              <div>拡張性: ○</div>
              <div>サポート: △</div>
            </div>
          </Card>
          <Card variant="accent" padding="md" className="ring-2 ring-[#06C755] shadow-lg relative">
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-[#05A847] text-white text-xs font-bold rounded">
              RECOMMENDED
            </div>
            <div className="text-xs font-semibold text-[#05A847] uppercase tracking-wider mb-2">Growthpack</div>
            <h3 className="text-lg font-bold mb-2">ハーフスクラッチ<br />開発</h3>
            <div className="text-sm text-[#1F2937] space-y-1 font-medium">
              <div>初期コスト: 中</div>
              <div>拡張性: ○</div>
              <div>サポート: ○ / 性能: ○</div>
            </div>
          </Card>
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Option D</div>
            <h3 className="text-lg font-bold mb-2">スクラッチ<br />開発</h3>
            <div className="text-sm text-[#6B7280] space-y-1">
              <div>初期コスト: 高</div>
              <div>拡張性: ◎</div>
              <div>サポート: ○</div>
            </div>
          </Card>
        </div>
      </Section>

      {/* ============================================ */}
      {/* Features */}
      {/* ============================================ */}
      <Section id="features" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-14">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            10の機能アセットから、選んで組み合わせる。
          </h2>
          <p className="text-base text-[#4B5563]">
            すべての機能を入れる必要はありません。
            ビジネスの優先度に合わせて必要なものだけを選び、段階的に拡張できます。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.id} padding="md">
                <div className="flex items-start gap-4 mb-3">
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-[#E8F8F0] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#05A847]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">
                      {f.name}
                    </h3>
                    <div className="text-xs text-[#05A847] font-semibold mt-0.5">{f.phase}</div>
                  </div>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {f.tagline}
                </p>
              </Card>
            );
          })}
        </div>
        <div className="mt-8 md:mt-10 text-center text-sm text-[#6B7280]">
          ※ 各機能は選んだ組み合わせと外部システム連携の有無により個別見積もりとなります。
        </div>
      </Section>

      {/* ============================================ */}
      {/* Phase Flow */}
      {/* ============================================ */}
      <Section id="phases" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-14">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            ROADMAP
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            3フェーズで段階的に育てる。
          </h2>
          <p className="text-base text-[#4B5563]">
            一度にすべてを導入するのではなく、まず基盤を作り、次に施策を重ね、
            最後に関係を深化させます。それぞれのフェーズが次のフェーズのデータ基盤になります。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative">
          {PHASES.map((p, i) => (
            <Card key={p.phase} variant="elevated" padding="lg" rounded="xl" className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#05A847] text-white font-bold flex items-center justify-center text-sm">
                  {i + 1}
                </div>
                <div>
                  <div className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider">{p.phase}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1F2937]">{p.label}</h3>
                </div>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                {p.description}
              </p>
              <div className="pt-4 border-t border-[#E5E7EB] space-y-1.5">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#1F2937]">
                    <Check className="w-4 h-4 text-[#06C755] shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* Trust / Signals */}
      {/* ============================================ */}
      <Section spacing="sm" container="wide" background="white">
        <div className="grid sm:grid-cols-3 gap-5 md:gap-8">
          <div className="text-center p-6 border-t-2 border-[#06C755]">
            <ShieldCheck className="w-8 h-8 text-[#05A847] mx-auto mb-3" />
            <div className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold mb-2">PARTNER</div>
            <div className="text-base sm:text-lg font-bold text-[#1F2937] leading-snug">
              LINEヤフー<br />Technology Partner
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              LINE Partner Program 認定。プラットフォームの最新機能・制約に即した実装を行います。
            </p>
          </div>
          <div className="text-center p-6 border-t-2 border-[#06C755]">
            <Users className="w-8 h-8 text-[#05A847] mx-auto mb-3" />
            <div className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold mb-2">TRACK RECORD</div>
            <div className="text-base sm:text-lg font-bold text-[#1F2937] leading-snug">
              クラスメソッド<br />技術支援実績 5,000社以上
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              クラウド・アプリ開発の支援実績に裏打ちされた設計品質と運用基盤を提供します。
            </p>
          </div>
          <div className="text-center p-6 border-t-2 border-[#06C755]">
            <Sparkles className="w-8 h-8 text-[#05A847] mx-auto mb-3" />
            <div className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold mb-2">SPEED</div>
            <div className="text-base sm:text-lg font-bold text-[#1F2937] leading-snug">
              最短1ヶ月で<br />フェーズ1を立ち上げ
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              アセット化された基盤を流用することで、意思決定から稼働までの期間を圧縮します。
            </p>
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* FAQ */}
      {/* ============================================ */}
      <Section id="faq" spacing="md" container="default" background="muted">
        <div className="mb-10 md:mb-14">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            よくあるご質問
          </h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <Card key={f.q} padding="md">
              <h3 className="text-base sm:text-lg font-bold text-[#1F2937] mb-2 flex items-start gap-2">
                <span className="text-[#06C755] shrink-0">Q.</span>
                {f.q}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed pl-6">
                {f.a}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================ */}
      {/* Final CTA */}
      {/* ============================================ */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            LINEミニアプリの設計から運用まで、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">
            業種・規模・現状のシステム構成をお聞きしたうえで、あなたのビジネスに
            最適な機能の組み合わせとフェーズ計画をご提案します。初回相談は無料です。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" asChild>
              <a href="mailto:growthpack@classmethod.jp">
                無料で相談する
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-[#1a1d21]">
              <a href="#features">資料をダウンロード</a>
            </Button>
          </div>
          <div className="text-xs text-white/60 pt-4">
            ※ お打ち合わせでご要件を伺ったうえで、個別にお見積もりいたします。
          </div>
        </div>
      </Section>

      {/* ============================================ */}
      {/* Footer */}
      {/* ============================================ */}
      <footer className="bg-[#0a0a0a] text-white/80 py-10 md:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#06C755] flex items-center justify-center text-white font-bold">
                G
              </div>
              <div className="flex items-center gap-1">
                <span className="text-base font-bold text-white">グロースパック</span>
                <span className="text-sm text-white/60">for</span>
                <span className="text-base font-bold text-[#06C755]">LINE</span>
              </div>
            </div>
            <div className="text-xs text-white/60">
              © クラスメソッド株式会社
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
