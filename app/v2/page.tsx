/**
 * /v2 — グロースパック for LINE LPサイト
 *
 * classmethod.jp の視覚DNAを反映した再構築版。
 * docs/DESIGN.md v1.5 に厳密に従う。
 *
 * - ヒーロー: 写真背景 + ダークオーバーレイ + 白テキスト
 * - 信頼バッジ帯 / クライアントロゴ帯 / 実績数字の3層信頼構築
 * - CTA全3箇所に電話番号併記
 * - 共通プリミティブ Button / Section / Card のみ使用
 * - 価格の具体額は一切記載しない
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
  Award,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { Section } from '@/components/shared/ui/section';
import { Card } from '@/components/shared/ui/card';

/* ------------------------------------------------------------------ */
/* DATA                                                                  */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: CreditCard,
    name: 'デジタル会員証',
    tagline: 'アプリDL不要。QRコードで5秒つながる次世代会員体験。',
    phase: 'Phase 1',
    id: 'membership',
  },
  {
    icon: Clock,
    name: '順番待ち',
    tagline: '待ち時間を会員化のチャンスへ。混雑状況もLINEで配信。',
    phase: 'Phase 1',
    id: 'queue',
  },
  {
    icon: Calendar,
    name: '予約',
    tagline: '予約完了から来店後まで、LINEで一貫した顧客体験を設計。',
    phase: 'Phase 1',
    id: 'reservation',
  },
  {
    icon: Stamp,
    name: 'スタンプカード',
    tagline: '来店履歴が見える、育つ。紛失ゼロのデジタルスタンプ。',
    phase: 'Phase 2',
    id: 'stamp-card',
  },
  {
    icon: Ticket,
    name: 'クーポン配信',
    tagline: 'LINE公式の配信制限を超えた、属性連動のクーポン発行。',
    phase: 'Phase 2',
    id: 'coupon',
  },
  {
    icon: Ticket,
    name: 'チケット・パス',
    tagline: 'LINEで入場管理まで完結。CRM側で利用状況を可視化。',
    phase: 'Phase 2',
    id: 'ticket',
  },
  {
    icon: Sparkles,
    name: '抽選',
    tagline: '当選体験でエンゲージメントを加速。来店動機に変える。',
    phase: 'Phase 2',
    id: 'lottery',
  },
  {
    icon: Send,
    name: 'セグメント配信',
    tagline: '属性・購買履歴に連動した動的リッチメニュー対応配信。',
    phase: 'Phase 3',
    id: 'segment-delivery',
  },
  {
    icon: MessageCircle,
    name: '1to1コミュニケーション',
    tagline: 'オペレーター対応をLINEに統合。接客以上の価値を提供。',
    phase: 'Phase 3',
    id: 'one-to-one',
  },
  {
    icon: Gift,
    name: 'ギフト',
    tagline: 'ソーシャルギフト機能で、顧客が顧客を呼ぶ循環を作る。',
    phase: 'Phase 3',
    id: 'gift',
  },
];

const PROBLEMS = [
  {
    title: '会員獲得の壁が高い',
    body: 'ネイティブアプリのダウンロードや煩雑な登録フローが障壁となり、ライトユーザーの獲得が進みません。',
  },
  {
    title: '店舗とECのデータが分断している',
    body: '店舗会員とEC会員を統合できず、オムニチャネル施策が中途半端に終わっています。',
  },
  {
    title: 'メッセージの反応率が伸び悩む',
    body: '顧客属性や購買履歴を活かせずに一斉配信を続けた結果、ブロック率が上昇しています。',
  },
  {
    title: '施策ツールが乱立して運用コストが増大',
    body: 'クーポン・スタンプ・予約・ギフトが別システムで管理され、データが分散して分析もできません。',
  },
];

const PHASES = [
  {
    phase: 'Phase 1',
    label: '顧客接点の創出',
    features: ['デジタル会員証', '順番待ち', '予約'],
    description:
      'まず「つながる」土台を作ります。アプリDL不要の会員化で、ライトユーザーを含めた顧客基盤を構築します。',
  },
  {
    phase: 'Phase 2',
    label: 'エンゲージメント強化',
    features: ['スタンプカード', 'クーポン配信', 'チケット・パス', '抽選'],
    description:
      '来店動機と再訪のきっかけを設計します。基盤の上に施策を重ねて、顧客体験を段階的に厚くします。',
  },
  {
    phase: 'Phase 3',
    label: '関係性の深化',
    features: ['セグメント配信', '1to1コミュニケーション', 'ギフト'],
    description:
      '蓄積したデータで一人ひとりに最適な接触を実現。紹介による新規獲得まで循環させます。',
  },
];

const STATS = [
  {
    value: '5,000社',
    unit: '以上',
    label: 'クラスメソッド技術支援実績',
    sub: 'AWS・クラウド・アプリ開発にわたる幅広い実績',
  },
  {
    value: '最短',
    unit: '1ヶ月',
    label: 'フェーズ1の立ち上げ期間',
    sub: 'アセット流用により意思決定から稼働までを圧縮',
  },
  {
    value: '10',
    unit: '機能',
    label: '選択可能なアセット数',
    sub: 'ビジネスに必要なものだけを選んで組み合わせ',
  },
  {
    value: '3',
    unit: 'フェーズ',
    label: '段階的なロードマップ設計',
    sub: '一度に全部入れず、フェーズで育てる設計思想',
  },
];

const FAQS = [
  {
    q: '導入にはどのくらいの期間がかかりますか？',
    a: 'フェーズ1の会員証のみであれば最短1ヶ月が目安です。機能範囲と外部システム連携の有無により変動します。複数機能＋CRM連携の場合は2〜3ヶ月を想定してください。詳細はヒアリング後にお伝えします。',
  },
  {
    q: '既存のCRMやPOSシステムと連携できますか？',
    a: 'はい、カスタマイズ領域として対応しています。Salesforce、kintone、自社会員DBなどとの連携実績があります。連携方式はお客様の既存システムに合わせて設計します。',
  },
  {
    q: 'LINE公式アカウントの標準機能と何が違いますか？',
    a: 'LINE公式アカウントはテンプレート機能の組み合わせに限られますが、グロースパックは会員IDとの完全連携、外部CRM・ECシステムとのリアルタイム連携、フルカスタムデザインが可能です。',
  },
  {
    q: '他のLINEミニアプリSaaSと比べた強みは？',
    a: 'SaaSでは実現できない柔軟なカスタマイズと高品質なサポート・性能を提供します。スクラッチ開発と比べると大幅に短い期間で立ち上がる点が評価いただいています。',
  },
];

/* ------------------------------------------------------------------ */
/* PAGE                                                                  */
/* ------------------------------------------------------------------ */

export default function V2TopPage() {
  return (
    <main className="min-h-screen bg-white text-[#1F2937]">

      {/* ============================================================ */}
      {/* Header                                                         */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/v2" className="flex items-center gap-2">
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
            <a href="#problems" className="hover:text-[#05A847] transition-colors">課題</a>
            <a href="#positioning" className="hover:text-[#05A847] transition-colors">選ばれる理由</a>
            <a href="#features" className="hover:text-[#05A847] transition-colors">機能</a>
            <a href="#phases" className="hover:text-[#05A847] transition-colors">導入ステップ</a>
            <a href="#faq" className="hover:text-[#05A847] transition-colors">FAQ</a>
          </nav>
          <Button variant="primary" size="sm" asChild>
            <a href="https://classmethod.jp/services/line/line-apps/#iframe-form" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
          </Button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* Hero — 写真背景 + ダークオーバーレイ + 白テキスト                  */}
      {/* ============================================================ */}
      <div
        className="relative min-h-[560px] md:min-h-[640px] flex items-center bg-[#1a1d21]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.65) 60%, rgba(10,10,10,0.45) 100%), url("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-20 sm:py-24 md:py-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* 左カラム */}
            <div className="lg:col-span-7 space-y-6 md:space-y-7">
              {/* 認定バッジ */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#06C755]/20 border border-[#06C755]/50 rounded-full text-xs sm:text-sm font-semibold text-[#06C755]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06C755] shrink-0" />
                LINEヤフー Partner Program Technology Partner
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-[1.2] tracking-tight text-white">
                LINEミニアプリで、<br />
                顧客との接点を<br />
                <span className="text-[#06C755]">ひらく。</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]">
                ハーフスクラッチ開発で、SaaSの速さとフルスクラッチの柔軟性を両立。会員証・予約・クーポンなど10機能のアセットから必要なものだけを選び、<span className="font-bold text-white">最短1ヶ月</span>で立ち上げます。
              </p>

              {/* CTA — ヒーロー内（1箇所目） */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Button variant="primary" size="lg" asChild>
                  <a
                    href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    無料で相談する
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-white/60 text-white hover:bg-white/10 hover:border-white"
                >
                  <a
                    href="https://classmethod.jp/download/line-mini-app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    資料をダウンロード
                  </a>
                </Button>
              </div>

              {/* ミニチェックリスト */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70">
                {['最短1ヶ月で立ち上げ', '10機能から選択可能', 'CRM・POS連携対応'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#06C755]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* 右カラム — LINEミニアプリ画面モックアップ */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative max-w-[320px] mx-auto">
                {/* スマホ外枠 */}
                <div className="bg-[#111] rounded-[32px] p-2 shadow-2xl border border-white/10">
                  <div className="bg-white rounded-[26px] overflow-hidden">
                    {/* LINEミニアプリ ヘッダー */}
                    <div className="h-12 bg-[#06C755] flex items-center px-5 gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold text-xs">G</div>
                      <span className="text-white text-sm font-bold">グロースパック ストア</span>
                    </div>
                    {/* コンテンツエリア */}
                    <div className="p-4 space-y-3 bg-[#F8F9FA]">
                      {/* 会員証カード */}
                      <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
                        <div className="text-[10px] text-[#05A847] font-bold mb-1 uppercase tracking-wider">MEMBERSHIP</div>
                        <div className="font-bold text-[#1F2937] text-sm mb-3">デジタル会員証</div>
                        <div className="h-16 bg-[#F8F9FA] rounded-lg border border-dashed border-[#06C755]/40 flex items-center justify-center text-xs text-[#9CA3AF]">
                          QRコード
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[10px] text-[#6B7280]">
                          <span>ゴールド会員</span>
                          <span className="text-[#05A847] font-semibold">1,240pt</span>
                        </div>
                      </div>
                      {/* 機能グリッド */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { icon: Stamp, label: 'スタンプ' },
                          { icon: Ticket, label: 'クーポン' },
                          { icon: Gift, label: 'ギフト' },
                        ].map(({ icon: Icon, label }) => (
                          <div key={label} className="bg-white rounded-lg p-2.5 border border-[#E5E7EB] text-center shadow-sm">
                            <Icon className="w-4 h-4 text-[#05A847] mx-auto mb-1" />
                            <div className="text-[10px] font-semibold text-[#1F2937]">{label}</div>
                          </div>
                        ))}
                      </div>
                      {/* お知らせ */}
                      <div className="bg-[#E8F8F0] rounded-lg px-3 py-2 border border-[#06C755]/20">
                        <div className="text-[10px] text-[#05A847] font-bold">新着クーポン</div>
                        <div className="text-xs text-[#1F2937] mt-0.5">期間限定 10%OFF</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 装飾 */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#06C755] rounded-full opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#FCD34D] rounded-full opacity-20 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 信頼バッジ帯 — ヒーロー直下                                       */}
      {/* ============================================================ */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: ShieldCheck, label: 'LINEヤフー Technology Partner', color: '#06C755' },
              { icon: Award, label: 'AWS Premier Tier Services Partner', color: '#FF9900' },
              { icon: ShieldCheck, label: 'ISO 27001 取得（クラスメソッド）', color: '#3B82F6' },
              { icon: Users, label: '技術支援実績 5,000社以上', color: '#05A847' },
              { icon: Zap, label: '最短1ヶ月導入', color: '#05A847' },
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
      {/* 実績数字セクション                                               */}
      {/* ============================================================ */}
      <Section spacing="sm" container="wide" background="white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB] border border-[#E5E7EB] rounded-xl overflow-hidden">
          {STATS.map(({ value, unit, label, sub }) => (
            <div key={label} className="px-6 py-8 text-center bg-white">
              <div className="text-4xl sm:text-5xl font-bold text-[#1F2937] leading-none mb-1">
                {value}<span className="text-2xl sm:text-3xl text-[#05A847] ml-1">{unit}</span>
              </div>
              <div className="text-sm font-semibold text-[#1F2937] mt-3 mb-1">{label}</div>
              <div className="text-xs text-[#6B7280] leading-relaxed">{sub}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 課題セクション                                                   */}
      {/* ============================================================ */}
      <Section id="problems" spacing="sm" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            CHALLENGES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            こんな課題、ありませんか。
          </h2>
          <p className="text-base text-[#4B5563]">
            リテール・サービス業の現場では、顧客接点のデジタル化が進む一方で、次のような構造的な課題が繰り返し発生しています。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {PROBLEMS.map((p) => (
            <Card key={p.title} padding="md" className="border-l-4 border-l-[#06C755]">
              <h3 className="text-base sm:text-lg font-bold text-[#1F2937] mb-2">
                {p.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                {p.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* ポジショニング                                                   */}
      {/* ============================================================ */}
      <Section id="positioning" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            WHY GROWTHPACK
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            SaaSとスクラッチ、その中間に。
          </h2>
          <p className="text-base text-[#4B5563]">
            SaaSは速く安いが、拡張と連携に制約があります。フルスクラッチは自由度が高いが、期間とコストが膨らみます。グロースパックは<span className="font-bold text-[#1F2937]">速さ・柔軟性・サポート品質</span>を同時に提供するハーフスクラッチ開発です。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {/* SaaS */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Option A</div>
            <h3 className="text-base font-bold mb-4">SaaS<br /><span className="text-sm font-normal text-[#6B7280]">パッケージ型</span></h3>
            <ul className="text-sm text-[#6B7280] space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />初期コスト: 低</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />拡張性: △</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />サポート: △</li>
            </ul>
          </Card>

          {/* Growthpack — 推奨 */}
          <Card variant="accent" padding="md" className="ring-2 ring-[#06C755] shadow-lg relative">
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-[#05A847] text-white text-xs font-bold rounded-sm">
              RECOMMENDED
            </div>
            <div className="text-xs font-semibold text-[#05A847] uppercase tracking-wider mb-3">Growthpack</div>
            <h3 className="text-base font-bold mb-4">ハーフスクラッチ<br /><span className="text-sm font-normal text-[#05A847]">開発</span></h3>
            <ul className="text-sm text-[#1F2937] space-y-2 font-medium">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FCD34D] shrink-0" />初期コスト: 中</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />拡張性: ○</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />サポート: ○ / 性能: ○</li>
            </ul>
          </Card>

          {/* スクラッチ */}
          <Card variant="outline" padding="md">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Option C</div>
            <h3 className="text-base font-bold mb-4">スクラッチ<br /><span className="text-sm font-normal text-[#6B7280]">開発</span></h3>
            <ul className="text-sm text-[#6B7280] space-y-2">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />初期コスト: 高</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />拡張性: ◎</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#06C755] shrink-0" />サポート: ○</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 中盤CTA帯（2箇所目）                                             */}
      {/* ============================================================ */}
      <div className="bg-[#05A847] py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-lg sm:text-xl">
                どの選択肢が自社に合うか、まずご相談ください。
              </p>
              <p className="text-white/80 text-sm mt-1">
                業種・規模・既存システムをお聞きして最適な構成をご提案します。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="bg-white text-[#05A847] hover:bg-white/90 font-bold"
              >
                <a
                  href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  無料で相談する
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 機能一覧                                                        */}
      {/* ============================================================ */}
      <Section id="features" spacing="md" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            FEATURES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            10の機能アセットから、選んで組み合わせる。
          </h2>
          <p className="text-base text-[#4B5563]">
            全機能を導入する必要はありません。ビジネスの優先度に合わせて必要なものだけを選び、フェーズを追って拡張できます。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            const phaseColor =
              f.phase === 'Phase 1'
                ? 'bg-[#E8F8F0] text-[#05A847]'
                : f.phase === 'Phase 2'
                ? 'bg-[#FEF3C7] text-[#B45309]'
                : 'bg-[#EDE9FE] text-[#6D28D9]';
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
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${phaseColor}`}>
                      {f.phase}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {f.tagline}
                </p>
              </Card>
            );
          })}
        </div>
        <div className="mt-8 text-center text-sm text-[#6B7280]">
          ※ 各機能は選んだ組み合わせと外部システム連携の有無により個別見積もりとなります。
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 3フェーズ ロードマップ                                            */}
      {/* ============================================================ */}
      <Section id="phases" spacing="md" container="wide" background="white">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            ROADMAP
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            3フェーズで段階的に育てる。
          </h2>
          <p className="text-base text-[#4B5563]">
            一度にすべてを導入するのではなく、まず基盤を作り、施策を重ねて、関係を深化させます。各フェーズが次のフェーズのデータ基盤になります。
          </p>
        </div>

        {/* フェーズ接続ライン + カード */}
        <div className="relative">
          {/* デスクトップ接続線 */}
          <div className="hidden md:block absolute top-10 left-[calc(33.333%+0px)] right-[calc(33.333%+0px)] h-0.5 bg-[#E5E7EB] z-0" />
          <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative z-10">
            {PHASES.map((p, i) => (
              <Card key={p.phase} variant="elevated" padding="lg" rounded="xl" className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#05A847] text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider">{p.phase}</div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">{p.label}</h3>
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
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 業種別導入実績（事例セクション / 社名なし）                          */}
      {/* ============================================================ */}
      <Section spacing="sm" container="wide" background="muted">
        <div className="max-w-[720px] mb-10 md:mb-12">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847] mb-3">
            CASE STUDIES
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            業種を問わず、導入が進んでいます。
          </h2>
          <p className="text-base text-[#4B5563]">
            アパレル・飲食・小売・百貨店・ホテルなど、LINEユーザーと接点を持つさまざまな業種でご活用いただいています。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {[
            {
              industry: 'アパレル・ファッション',
              use: 'デジタル会員証 + セグメント配信',
              result: '会員化率の向上と来店頻度アップを実現',
            },
            {
              industry: '飲食・カフェ',
              use: 'スタンプカード + 順番待ち',
              result: 'ペーパーレス化と再来店促進を同時に達成',
            },
            {
              industry: '小売・量販店',
              use: 'クーポン配信 + 1to1コミュニケーション',
              result: '配信精度の向上でブロック率を低減',
            },
            {
              industry: '百貨店・商業施設',
              use: 'デジタル会員証 + チケット・パス',
              result: 'イベント動員数の可視化と集客効率化',
            },
            {
              industry: 'ホテル・旅館',
              use: '予約 + ギフト',
              result: '再予約促進と法人ギフト需要の取り込み',
            },
            {
              industry: 'サービス業全般',
              use: '抽選 + セグメント配信',
              result: 'エンゲージメント向上施策の効率的な展開',
            },
          ].map(({ industry, use, result }) => (
            <Card key={industry} padding="md">
              <div className="text-xs font-semibold text-[#05A847] uppercase tracking-wider mb-2">INDUSTRY</div>
              <h3 className="text-base font-bold text-[#1F2937] mb-2">{industry}</h3>
              <div className="text-xs text-[#9CA3AF] mb-1">主な活用機能</div>
              <p className="text-sm text-[#4B5563] mb-3">{use}</p>
              <div className="pt-3 border-t border-[#E5E7EB]">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#06C755] shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-[#1F2937]">{result}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-xs text-[#9CA3AF] text-center mt-6">
          ※ 事例は業種・活用パターンを抽象化して記載しています。具体的な実績はご商談にてご説明します。
        </p>
      </Section>

      {/* ============================================================ */}
      {/* FAQ                                                             */}
      {/* ============================================================ */}
      <Section id="faq" spacing="md" container="default" background="white">
        <div className="mb-10 md:mb-12">
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
                <span className="text-[#06C755] shrink-0 font-bold">Q.</span>
                {f.q}
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed pl-6">
                {f.a}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 最終CTA帯（3箇所目）— ダーク背景                                  */}
      {/* ============================================================ */}
      <Section id="contact" spacing="lg" container="default" background="dark">
        <div className="text-center space-y-6 md:space-y-8">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#06C755] mb-2">
            CONTACT
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            LINEミニアプリの設計から運用まで、<br />
            <span className="text-[#06C755]">一度ご相談ください。</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-[640px] mx-auto leading-relaxed">
            業種・規模・現状のシステム構成をお聞きしたうえで、最適な機能の組み合わせとフェーズ計画をご提案します。初回相談は無料です。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" asChild>
              <a
                href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                target="_blank"
                rel="noopener noreferrer"
              >
                無料で相談する
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white/50 text-white hover:bg-white/10 hover:border-white"
            >
              <a
                href="https://classmethod.jp/download/line-mini-app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                資料をダウンロード
              </a>
            </Button>
          </div>
          <div className="text-xs text-white/50 pt-2">
            ※ お打ち合わせでご要件を伺ったうえで、個別にお見積もりいたします。
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* Footer                                                          */}
      {/* ============================================================ */}
      <footer className="bg-[#0a0a0a] text-white/80 py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 md:gap-10 mb-10">
            {/* ブランド */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#06C755] flex items-center justify-center text-white font-bold text-sm">G</div>
                <div className="flex items-center gap-1">
                  <span className="text-base font-bold text-white">グロースパック</span>
                  <span className="text-sm text-white/50"> for </span>
                  <span className="text-base font-bold text-[#06C755]">LINE</span>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                クラスメソッド株式会社が提供する LINE ミニアプリ開発サービス。ハーフスクラッチ開発で、速さと柔軟性を両立します。
              </p>
            </div>

            {/* サービス */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">SERVICE</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">機能一覧</a></li>
                <li><a href="#phases" className="hover:text-white transition-colors">導入ロードマップ</a></li>
                <li><a href="#positioning" className="hover:text-white transition-colors">ハーフスクラッチとは</a></li>
              </ul>
            </div>

            {/* 事例・リソース */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">RESOURCES</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">業種別導入事例</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">よくあるご質問</a></li>
                <li><a href="#" className="hover:text-white transition-colors">技術ブログ</a></li>
              </ul>
            </div>

            {/* お問い合わせ */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">CONTACT</div>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="https://classmethod.jp/services/line/line-apps/#iframe-form"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    無料相談はこちら
                  </a>
                </li>
                <li>
                  <a
                    href="https://classmethod.jp/download/line-mini-app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    資料ダウンロード
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* コピーライト */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              © クラスメソッド株式会社 All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <a href="#" className="hover:text-white/70 transition-colors">プライバシーポリシー</a>
              <a href="#" className="hover:text-white/70 transition-colors">利用規約</a>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
