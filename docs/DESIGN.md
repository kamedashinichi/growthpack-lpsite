# DESIGN.md — Growthpack LPサイト デザインシステム

**対象実装**: `app/v2/page.tsx`（トップページ / FIX 版）+ `components/shared/ui/*`
**正準**: このファイルが正。新規ページ・リファクタはすべて本書に従う。

出典: クラスメソッド株式会社 公式サイト（https://classmethod.jp/）の構造・トーン・配色観察をベースに、Growthpack LPサイトで再現可能な形へ落とし込んだ仕様書。LINE連携プロダクトであることを視覚的に即伝えるため、プライマリに LINE 公式ブランドカラー **LINE Green (#06C755)** を採用。

---

## 0. デザイン原則

classmethod.jp の視覚DNA調査と `/v2` トップページの FIX 実装から抽出した、同社らしさ × LINE ブランドの核:

**LP の核となる原則**

1. **ダーク系ヒーロー × 製品中心の視覚メタファー** — 写真ではなく、ダークグラデ + ドットグリッド + SVG で製品を中心に据えた放射図で「LINEを軸に顧客接点が広がる」を 1 枚絵で伝える（v1.5 の「写真背景」アプローチは FIX 時に廃止）
2. **信頼の層を重ねる** — ヒーロー直下に認定バッジ帯（LINEヤフー/AWS/ISO/実績数/期間）、次いで大数字の実績セクションを置く
3. **情報密度で信頼を作る** — 空白で上品さを出すより、整理された密度で「ちゃんと調べて作った」印象を優先
4. **CTAは LINE Green dark 1色で統一** — ブランド色 `#06C755` そのものは色面単独でのみ使い、テキストを載せる面は AA 確保の `#05A847`（dark 版）を必ず使う。focus ring だけブランド色に戻す
5. **技術者向けの実直さ** — 煽り語NG、丁寧体、数値根拠を並べる
6. **モノクロ基調 × LINE Green 差し色** — 本文は白黒、LINE Green はブランド色として限定使用
7. **レイアウトは中央寄せグリッド** — コンテンツ幅 `max-w-[1200px]` (wide) / `max-w-[900px]` (default)
8. **顧客向けに具体額を出さない** — 全機能で「Phase ラベル」までの表記に留める。個別見積もりを原則とし、最低予算ライン等も LP に書かない
9. **実装期間は会員証を含む現実値（最短3ヶ月〜）を標準表記** — フェーズ1の標準構成に会員証が入る前提
10. **未確認の事実を書かない** — 未許諾のクライアントロゴ・未検証の技術連携・未確定の実績数値は載せない。MCP など一次ソースで確認済みの情報のみ

---

## 1. カラーパレット

（2026-04-11 現実装に整合: DESIGN-DIFF.md のアクション1で値を統一済み）

### ベース

| 用途 | トークン | HEX | 使用箇所 |
|-----|---------|-----|---------|
| 背景（白） | `--color-bg` | `#ffffff` | 基本背景 |
| 背景（淡グレー） | `--color-bg-muted` | `#F8F9FA` | セクション交互塗り、カード背景 |
| 背景（ダーク） | `--color-bg-dark` | `#1a1d21` | フッター、コントラストセクション |
| テキスト（主） | `--color-text` | `#1F2937` | 本文、見出し |
| テキスト（副） | `--color-text-sub` | `#6B7280` | キャプション、meta情報 |
| テキスト（淡） | `--color-text-muted` | `#9CA3AF` | 補助、placeholder |
| ボーダー | `--color-border` | `#E5E7EB` | 区切り線、カード枠 |

### アクセント（ブランド）

| 用途 | トークン | HEX | 使用箇所 |
|-----|---------|-----|---------|
| プライマリ（LINE Green） | `--color-primary` | `#06C755` | ブランドCI、バッジ、リンクホバー、アクセント装飾 |
| プライマリ dark | `--color-primary-dark` | `#05A847` | **CTAボタン本体・本文リンク**（#06C755 は白文字のコントラストがAA未達のため、文字を載せる面にはこちらを使う） |
| プライマリ darker | `--color-primary-darker` | `#048838` | ボタンhover、押下時 |
| プライマリ light | `--color-primary-light` | `#E8F8F0` | 背景タグ、アイコン背景円 |
| セカンダリ | `--color-secondary` | `#32373c` | サブCTA、ダークボタン |
| 成功・注目 | `--color-accent` | `#FB923C` | 期間限定バッジ、キャンペーン、new表示 |

### Semantic accent（警告・エラー・注意）

| 用途 | トークン | HEX | 使用箇所 |
|-----|---------|-----|---------|
| エラー | `--color-error` | `#EF4444` | 入力エラー、必須警告 |
| 注意 | `--color-caution` | `#FCD34D` | 注意表示、hero装飾円 |
| 注意背景 | `--color-caution-bg` | `#FEF3C7` | 注意文の背景塗り |
| Award/実績 | `--color-award` | `#F59E0B` | 実績バッジのAwardアイコン（慣習的な金色） |

### ブランド例外: AWS関連セクション

| 用途 | HEX | 使用箇所 | 根拠 |
|-----|-----|---------|------|
| AWSブランドオレンジ | `#FF9900` | strength-section.tsx のAWS Premier Tierブロック | Amazon公式ブランドカラー。AWS連携実績を示す**意味的な色使用**のため、LINE Greenパレットに統一せず例外として残す |

**原則**: LINE Green パレットと AWS オレンジは**同一セクション内で競合させない**。AWS ブロックは独立した区画で提示し、周囲は LINE Green 系にする。

### コントラスト運用の原則（重要）

- `#06C755` は白文字を載せると **コントラスト比 ~3.0** で WCAG AA 未達
- したがって**テキストを載せる面（ボタン・リンク・見出し強調）には `--color-primary-dark #05A847` を使う**
- `#06C755` 自体は「色面の単独表現」（ロゴ隣接のアクセント、アイコン、下線装飾、ライン装飾、バッジ背景でテキストなし）に限定
- light トークン `#E8F8F0` はタグ背景・強調ブロックの塗り用

**配色原則**: 1画面のCTAは `--color-primary-dark` か `--color-secondary` のどちらか1色に統一。`--color-accent` はバッジ専用。3色を同じ画面で競わせない。

---

## 2. タイポグラフィ

### フォントファミリー（globals.css で body にグローバル適用済み）

```css
font-family:
  var(--font-noto-sans-jp),
  "Hiragino Kaku Gothic ProN",
  "Hiragino Sans",
  -apple-system,
  BlinkMacSystemFont,
  "Helvetica Neue",
  Arial,
  sans-serif;
```

- 和文優先（Noto Sans JP → ヒラギノ角ゴ ProN）、欧文は system-ui フォールバック
- 数値・英語はプロポーショナルでOK。等幅は `code` 要素のみ
- **body の line-height は 1.75 をグローバル既定**（globals.css `@layer base` 参照）
- **見出し h1〜h3 は line-height 1.3 + letter-spacing -0.01em、h4〜h6 は 1.4** がグローバル既定

### 見出しスケール（現LPで実際に使われているパターンを標準化）

| 用途 | 推奨クラス | モバイル〜デスクトップサイズ |
|-----|----------|---------------------------|
| h1 hero 大 | `text-4xl md:text-5xl font-bold` | 36→48px |
| h1 hero 標準 | `text-3xl sm:text-4xl md:text-5xl font-bold` | 30→36→48px |
| h2 section | `text-2xl sm:text-3xl md:text-4xl font-bold` | 24→30→36px **（LP標準・12箇所で使用中）** |
| h2 小 | `text-xl sm:text-2xl md:text-3xl font-bold` | 20→24→30px |
| h3 subsection | `text-lg sm:text-xl md:text-2xl font-bold` | 18→20→24px |
| h3 小 | `text-base sm:text-lg md:text-xl font-bold` | 16→18→20px |
| h4 小見出し | `text-sm sm:text-base md:text-lg font-bold` | 14→16→18px |
| 強調キャプション | `text-xs sm:text-sm font-bold` | 12→14px |
| body 本文 | `text-sm sm:text-base leading-relaxed` | 14→16px |
| body 大 | `text-base sm:text-lg leading-relaxed` | 16→18px |
| meta | `text-xs` | 12px |

**許容パターンは上記10種類のみ**。新規コードではこのセットから選び、独自の `text-X sm:text-Y md:text-Z` を新設しない。

### 見出しの装飾パターン

- 装飾なしが基本。下線・色塗りは使わない
- セクション見出しの上に小さな英語キャプション（`text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#05A847]`）を置くパターンを標準とする
  ```
  SERVICE
  サービス一覧
  ```

### Weight ルール

- 見出し: `font-bold` (700) が標準、`font-semibold` (600) は補助見出しのみ
- 本文: `font-normal` (400)
- 強調: `font-bold` (700) をインラインで使う。`font-medium` (500) は**ラベル・バッジ限定**

---

## 3. レイアウト & グリッド

### コンテナ（現LPで実際に使われている値を標準化）

| 幅 | 用途 | 使用箇所 |
|---|------|---------|
| `max-w-[1200px]` | ヘッダー・フッター・ワイドセクション | 14箇所で使用、LP標準 |
| `max-w-[900px]` | 標準コンテンツ（本文・カード・フォーム） | 10箇所で使用、LP標準 |
| `max-w-[720px]` | 読み物（ブログ・記事本文） | 新設。今後 MDX 本文で使う想定 |

全てセンタリング (`mx-auto`) + 左右パディング `px-4 sm:px-5 md:px-6`

**ルール**: 新規セクションを作るときは上記3種以外の任意値 `max-w-[540px]` 等を使わない。`<Section container="wide|default|narrow">` コンポーネント（`components/shared/ui/section.tsx`）を使用すること。

### 縦リズム（現LPで実際に使われている値を標準化）

| サイズ | 値 | 用途 | 使用箇所 |
|-------|-----|------|---------|
| `sm` | `py-12 sm:py-16 md:py-20` | 標準セクション | 11箇所で使用、LP標準 |
| `md` | `py-16 sm:py-20 md:py-28` | 主要セクション | 7箇所で使用 |
| `lg` | `py-20 sm:py-24 md:py-32` | ヒーロー・最終CTA帯 | 新設 |

**ルール**: 新規セクションは `<Section spacing="sm|md|lg">` を使用。手書き py-* を直接書かない。

### 要素間余白

- 段落間: `space-y-4`（16px）
- 見出しと本文: `mt-4`〜`mt-6`
- ボタンと直前テキスト: `mt-8`
- カードグリッドの gap: `gap-6 md:gap-8`
- セクションヘッダー（見出し）と中身の間: `mb-8 sm:mb-12 md:mb-16`

### ブレークポイント（Tailwind デフォルト準拠）

| ブレークポイント | 幅 | 用途 |
|---------------|-----|------|
| (default) | 〜639px | スマホ縦 |
| `sm:` | 640px〜 | スマホ横・小タブ |
| `md:` | 768px〜 | タブレット |
| `lg:` | 1024px〜 | ノートPC |
| `xl:` | 1280px〜 | デスクトップ |

---

## 4. コンポーネント

**重要**: セクション4のボタン・カード・セクションは**共通プリミティブで実装済み**です。LPの新規コードでは以下のプリミティブを使用し、独自の button/card/section 要素を書かないでください。

- `components/shared/ui/button.tsx` — `<Button variant="primary|secondary|outline|ghost|link|destructive" size="default|sm|lg">`
- `components/shared/ui/section.tsx` — `<Section spacing="sm|md|lg" container="wide|default|narrow" background="white|muted|accent|dark">`
- `components/shared/ui/card.tsx` — `<Card variant="default|elevated|outline|accent" rounded="lg|xl|2xl" padding="sm|md|lg">`

### ボタン (`<Button>`)

```tsx
import { Button } from '@/components/shared/ui/button';

<Button variant="primary">お問い合わせ</Button>
<Button variant="secondary">資料ダウンロード</Button>
<Button variant="outline">詳しく見る</Button>
<Button variant="primary" size="lg">無料で試す</Button>
<Button variant="link" asChild><a href="/features">機能一覧へ →</a></Button>
```

**仕様**:
- 角丸: `rounded-md`（6px）
- padding: default = `px-6 py-3`, sm = `px-4 py-2`, lg = `px-8 py-4`
- 最小幅: default = 160px, sm = 120px, lg = 200px
- font: `font-semibold` (600) / サイズは size に連動
- transition: `150ms`
- focus ring: `#06C755` (LINE Green brand)
- primary 背景: `#05A847` (AA 確保)、hover `#048838`
- secondary 背景: `#32373c`、hover `#1a1d21`
- outline: `#05A847` 2pxボーダー + 同色テキスト、hover で塗り

### カード (`<Card>`)

```tsx
import { Card } from '@/components/shared/ui/card';

<Card>標準カード（白背景+薄ボーダー+hover シャドウ）</Card>
<Card variant="elevated" rounded="xl" padding="lg">目立たせたい注目カード</Card>
<Card variant="accent">事例・メッセージカード（LINE Green light 背景）</Card>
```

**仕様**:
- 角丸: `rounded-lg`（8px）が default、`rounded-xl` `rounded-2xl` も選択可
- padding: `md`（p-6 md:p-8）が default
- default variant: 白背景 + `#E5E7EB` 薄ボーダー + hover で shadow-lg + `#06C755/40` ボーダー
- accent variant: `#E8F8F0` 背景 + `#06C755/20` ボーダー

### セクション (`<Section>`)

```tsx
import { Section } from '@/components/shared/ui/section';

<Section spacing="sm" container="wide">
  <h2>セクション見出し</h2>
  {/* ... */}
</Section>

<Section spacing="md" container="default" background="muted">
  {/* 標準コンテンツ幅 + 淡グレー背景 */}
</Section>

<Section spacing="lg" background="dark">
  {/* 最終CTA帯 */}
</Section>
```

**仕様**:
- `spacing`: sm (py-12 sm:py-16 md:py-20) / md (py-16 sm:py-20 md:py-28) / lg (py-20 sm:py-24 md:py-32)
- `container`: wide (max-w-[1200px]) / default (max-w-[900px]) / narrow (max-w-[720px])
- `background`: white / muted (#F8F9FA) / accent (#E8F8F0) / dark (#1a1d21 + text-white)
- `noContainer={true}` でコンテナを外してフルブリードにできる

### ナビゲーション（既存 header.tsx で実装）

- ヘッダー高さ: `h-16 md:h-20`（64–80px）
- 背景: 白 + 下部 `border-b border-[#E5E7EB]`
- スクロール追従: `sticky top-0 z-50 bg-white/95 backdrop-blur`
- ナビリンク色: `text-[#1F2937]` / hover `text-[#06C755]` + hover bg `#E8F8F0`
- モバイル: 768px 未満はハンバーガーメニュー、右からスライドイン

### リンク（本文中）

```tsx
<a className="text-[#05A847] underline underline-offset-2 hover:text-[#048838]">
  テキスト
</a>
```

または `<Button variant="link" asChild><a>...</a></Button>` を使用。

- 本文中のリンクは**下線あり**（classmethod.jp 同様）
- 色は `#05A847`（dark 版）を使用し、白背景での可読性を確保

---

## 5. 画像・アイコン・メディア

- **画像形式**: WebP優先。`<Image>` コンポーネント（Next.js）で幅固定＋`quality={85}`
- **角丸**: 写真は `rounded-lg`（8px）、アバターのみ `rounded-full`
- **シャドウ**: hover時の `shadow-lg`（`shadow: 0 10px 30px rgba(0,0,0,0.12)`）
- **ヒーロー画像**: 16:9 または 4:3。上下余白を確保し、背景と馴染ませる
- **アイコン**: Lucide-react 統一。サイズは `w-5 h-5`（20px）を標準、ヒーローアクセントのみ `w-8 h-8`
- **装飾グラデーション**: `#06C755` と `#05A847` の2色までに限定。3色以上のグラデは使わない

---

## 6. トーン & ボイス

### 語調

- **敬語・丁寧体**: 「〜します」「〜いたします」「〜を支援します」
- **断定を避けすぎない**: 数値を伴う事実は断定で書く（例: 「導入10,000社以上」）
- **専門用語は避けない**: 読者は意思決定者（部長〜役員）。技術用語は正確に使い、必要箇所のみ注釈
- **煽り語NG**: 「今すぐ」「革命」「絶対」「完全自動化」など

### 見出しの書き方

- 課題起点: 「〇〇にお困りではありませんか？」→ 次見出しで解決
- 機能名 + 価値: 「LINEミニアプリ対応 — 会員証から接客まで一貫対応」
- 数値訴求: 「会員化率3〜5倍 / ブロック率2.5-7%」
- 疑問形見出しで読み進ませる: 「なぜ LINE が選ばれるのか？」

### CTA文言

| シーン | 標準文言 |
|-------|---------|
| 問い合わせ | お問い合わせ / ご相談はこちら |
| 資料請求 | 資料ダウンロード（無料） |
| 事例 | 導入事例を見る |
| 詳細 | 詳しく見る / 機能一覧へ |

- 「無料」「今だけ」は最小限。ボタン下の補助テキストに回す

---

## 7. 画面ごとの構成パターン（`/v2` FIX 版準拠）

トップページは `app/v2/page.tsx` に FIX 版が実装済み。以下は他ページで同パターンを再利用するときのリファレンス。

### 7-1. ヒーロー（ダーク + 放射型タッチポイント図）

**背景**
- 写真は使わない
- ベース: `bg-[#0a0a0a]` + `radial-gradient(ellipse 80% 60% at 80% 100%, rgba(6,199,85,0.22), transparent 70%), linear-gradient(135deg, #0a0a0a 0%, #1a1d21 60%, #0a0a0a 100%)`
- レイヤー: 細ドットグリッド（`radial-gradient(circle, #ffffff 1px, transparent 1px)` + `backgroundSize: 28px 28px` + `opacity 0.07`）
- 高さ: `min-h-[560px] md:min-h-[700px]`

**構成**
- lg以上で2カラム `grid lg:grid-cols-12` / 左 `col-span-7` / 右 `col-span-5`
- モバイルは右カラムを `hidden lg:block` で非表示、左のみ縦積み

**左カラム（テキスト + CTA）**
1. 認定バッジ pill: `bg-[#E8F8F0] border border-[#06C755]/30 text-[#05A847]` に緑ドット + 「LINEヤフー Partner Program Technology Partner」
2. H1: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white`、キーフレーズを `<span className="text-[#05A847]">` で強調
3. サブコピー: `text-base sm:text-lg text-white/80 leading-relaxed max-w-[600px]`
4. CTA 2個（横並び→sm: でも縦積み）: primary（無料で相談する）+ 白枠 outline（資料をダウンロード）
5. ミニチェックリスト 3項目: `Check` アイコン + `text-white/70 text-sm`

**右カラム（放射型タッチポイント図）**
- `relative h-[560px] w-full` の中に中心スマホと6つの接点カードを絶対配置
- **中心スマホ**（220px 幅）: `bg-[#111] rounded-[28px] border border-white/10 shadow-[0_20px_60px_rgba(6,199,85,0.25)]` 内に LINE ミニアプリのミニモック（緑ヘッダー + 会員証カード + 新着通知）
- **会員証カード内**: SVG で 1 次元バーコードを描画、下に `font-mono text-[7px] text-[#6B7280] tracking-[0.15em]` で13桁数字
- **6つの接点カード**: 上左/上右/中左/中右/下左/下右 に絶対配置
  - 左右中央のカードは `left: -10%` / `right: -10%` でコンテナ外へ張り出させる
  - カード: `bg-white/95 backdrop-blur rounded-xl border border-white/30 shadow-[0_8px_24px_rgba(0,0,0,0.3)] p-3 w-[110px]` に PNG アイコン + ラベル
  - `animate-fade-in` + `animationDelay` を 0s〜0.5s で 0.1s 刻み
- **SVG接続線**: 中心(250,280)から各カードへ `stroke="#06C755" strokeDasharray="4 6" opacity 0.35` の点線
- **中心グロー**: `<circle cx="250" cy="280" r="140" fill="url(#lineFade)" />` で radial gradient

### 7-1b. ヒーロー 写真背景バリエーション（業種別LP 用）

業種別LPでは業種の文脈を視覚的に伝えるため、**ダークグラデの代わりに業種固有の写真を背景**にしてよい（トップ `/v2` はダークグラデのまま維持）。

**背景レイヤーの積み順**（下から上）:

1. 背景写真: `bg-center bg-cover` で `/public/images/<industry>-hero.png` を指定（1376x768 以上、16:9 推奨）
2. ダークオーバーレイ: 左濃→右薄のグラデで写真を沈める
   ```ts
   background:
     'linear-gradient(to right, rgba(10,10,10,0.90) 0%, rgba(10,10,10,0.70) 45%, rgba(10,10,10,0.35) 85%, rgba(10,10,10,0.15) 100%), ' +
     'radial-gradient(ellipse 60% 60% at 85% 100%, rgba(6,199,85,0.18) 0%, transparent 70%)',
   ```
3. ドットグリッド: `opacity-[0.05]`（ダークグラデ版より薄め、0.07 → 0.05 に）
4. `relative z-10` のコンテンツ

**運用ルール**
- 左カラム（テキスト）は引き続き `text-white` 基調。左側の濃いオーバーレイで可読性を確保する
- 右カラム（放射型タッチポイント図）は写真の上に重ねる。写真は右側で薄くなるため、放射型のコントラストが維持される
- 写真は **classmethod らしい実務シーン**（店舗・工場・オフィス・物流等）。人物顔出しなし、ストックフォト感の強いものは避ける
- 写真が用意できない業種はダークグラデ版（§7-1）にフォールバックする

### 7-2. 信頼バッジ帯（ヒーロー直下）

- `bg-white border-b border-[#E5E7EB]` の薄い帯 `py-6`
- 横 flex で4〜5項目を中央寄せ `gap-6 md:gap-10`
- 各項目: Lucide アイコン（色は項目ごとに固有: LINE Green / AWS #FF9900 / 認証系 #3B82F6）+ `text-sm font-semibold text-[#1F2937] whitespace-nowrap`
- 項目例: LINEヤフー Technology Partner / AWS Premier Tier Services Partner / ISO 27001 / 技術支援実績 5,000社以上 / 最短3ヶ月導入

### 7-3. 実績数字セクション

- `grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB] border border-[#E5E7EB] rounded-xl overflow-hidden`
- 各セル: `px-6 py-8 text-center bg-white`
  - 大数字 `text-4xl sm:text-5xl font-bold text-[#1F2937]` + 単位 `text-2xl sm:text-3xl text-[#05A847]`
  - ラベル `text-sm font-semibold text-[#1F2937] mt-3`
  - サブ `text-xs text-[#6B7280]`

### 7-4. 課題カード（左ボーダー強調）

- `<Section spacing="sm" container="wide" background="muted">`
- セクションヘッダー: 英字キャプション `text-xs sm:text-sm uppercase tracking-wider text-[#05A847]` + h2 + 説明文（`max-w-[720px]`）
- カード: `<Card padding="md" className="border-l-4 border-l-[#06C755]">` に h3 + body
- 縦バーを上に置いて下に積む形は**禁止**（見栄えが悪い）。必ず左ボーダーで見出しと本文が右に流れる構造

### 7-5. ポジショニング 3カラム比較

- `grid md:grid-cols-3 gap-4 md:gap-5`（旧 4 カラムから 3 カラムに縮約）
- カード3種: Option A = SaaS / Growthpack = ハーフスクラッチ / Option C = スクラッチ
- 中央の Growthpack カードは `variant="accent"` + `ring-2 ring-[#06C755] shadow-lg relative` で強調、左上に `RECOMMENDED` バッジ
- 各カードに比較軸を `<li>` で3項目（初期コスト / 拡張性 / サポート）+ 状態ドット（緑○/黄△/赤✗）

### 7-6. 機能グリッド（PNG アイコン + Phase ラベル）

- `grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5`
- 各カード: `<Card padding="md">` に左寄せヘッダー
  - 左に Next.js `<Image>` `w-11 h-11 relative object-contain` で `/public/images/<機能名>.png` を表示（現LP と共通）
  - 右に機能名 + Phase チップ
  - 下に 1 行タグライン
- Phase チップ色:
  - Phase 1: `bg-[#E8F8F0] text-[#05A847]`
  - Phase 2: `bg-[#FEF3C7] text-[#B45309]`
  - Phase 3: `bg-[#EDE9FE] text-[#6D28D9]`
- セクション末尾に免責 `※ 各機能は選んだ組み合わせと外部システム連携の有無により個別見積もりとなります。`
- **機能ごとの具体価格を出さない**（04-08 ルール）

**業種別LPの機能絞り込みルール**（重要）:

トップ `/v2` は10機能全てを載せるが、**業種別LPは6〜8機能に絞る**。その業種と関係の薄い機能を並べると訴求が弱まる。以下は業種別の推奨セット（nina-level.md のアパレルDX5点セット等のパターン知識に基づく）:

| 業種 | 推奨機能数 | 除外推奨 | コア |
|-----|-----------|--------|------|
| アパレル | 6 | 順番待ち / 予約 / チケット / 抽選 | 会員証 / 1to1 / スタンプ / クーポン / セグメント配信 / ギフト |
| 飲食チェーン | 6-7 | 1to1 / ギフト（優先度低） | 会員証 / 順番待ち / スタンプ / クーポン / セグメント配信 / 予約 |
| ドラッグストア | 6 | 予約 / チケット / 抽選 | 会員証 / スタンプ / クーポン / セグメント配信 / 1to1 / ギフト |
| 百貨店 | 6-7 | 順番待ち / 抽選 | 会員証 / 1to1 / チケット / クーポン / セグメント配信 / ギフト / 予約 |
| スポーツ・エンタメ | 5-6 | 1to1 / 予約 | 会員証 / チケット / スタンプ / クーポン / セグメント配信 / 抽選 |
| ホテル・旅館 | 5-6 | チケット / 抽選 / 順番待ち | 予約 / 会員証 / 1to1 / クーポン / セグメント配信 / ギフト |
| EC | 5 | 予約 / チケット / 順番待ち / 抽選 | 会員証 / セグメント配信 / クーポン / ギフト / 1to1 |
| スーパー・HC | 5-6 | 予約 / チケット / 1to1 | 会員証 / スタンプ / クーポン / セグメント配信 / 抽選 / ギフト |

この表は**出発点**で、各LPで取材した結果に応じて調整する。PHASES 配列の `features` リストも同時に更新すること（トップでは10機能全てを Phase 分けするが、業種別では使う6-8機能のみが Phase に並ぶ）。

### 7-7. Phase フロー 3カラム

- `grid md:grid-cols-3 gap-5 md:gap-6`
- 各カード `<Card variant="elevated" padding="lg" rounded="xl">` に番号バッジ + Phase ラベル + 説明 + チェックリスト（含まれる機能）

### 7-8. 業種事例グリッド（社名なしの抽象化）

- `grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5` で 6 業種
- 各カードは業種タグ + 一般化した成果文（例: 「アパレル — 会員化率 X 倍、休眠会員の再接触」）
- **個別企業名は LP 本文に出さない**。公開許諾が取れた事例のみ別途ケーススタディで出す

### 7-9. FAQ アコーディオン風

- `<Section spacing="md" container="default" background="muted">` で幅を 900px に絞る
- 各 Q&A を `<Card padding="md">` に格納、h3 に `<span className="text-[#06C755]">Q.</span>` を先頭に置く
- 回答本文は `pl-6` でインデント

### 7-10. 最終 CTA 帯（ダーク）

- `<Section id="contact" spacing="lg" container="default" background="dark">`
- 中央寄せで小さい英字キャプション `CONTACT` + h2（LINE Green 強調含む）+ 説明文
- CTA 2個: primary 背景白 + 緑文字（resolve 注: ダーク上で LINE Green のボタンはコントラスト落ちるので白ボタンに緑文字の反転）+ outline 白枠
- リンク先: classmethod.jp の問い合わせフォーム / 資料DL（§10 参照）

### 7-11. フッター

- `bg-[#0a0a0a] text-white/80 pt-12 pb-10`
- 4カラム `grid md:grid-cols-4 gap-8 md:gap-10`: BRAND（ロゴ+説明）/ SERVICE / RESOURCES / CONTACT
- 各カラムの見出しは `text-xs font-semibold uppercase tracking-wider text-white/40 mb-4`
- 下段: `border-t border-white/10` で区切り、左に copyright `© Classmethod, Inc.`、右に legal リンク（プライバシーポリシー / 会社情報）
- **copyright は必ず `© Classmethod, Inc.`**（「クラスメソッド株式会社 All rights reserved.」ではない）

### 7-12. WP（ホワイトペーパー）ダウンロードセクション

業種別LPで業界調査レポート等の PDF を配布するためのブロック。FAQ の直前、または Phase ロードマップの直後に配置する。

**構成**
- `<Section id="wp-download" spacing="sm" container="default" background="muted">` で中央寄せ 900px
- 外枠: `bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm`
- 内部を2カラム（`flex flex-col md:flex-row`）に分割

**左カラム（`md:w-2/5` ダーク）**
- `bg-[#0a0a0a] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-center`
- ラベル: `<span className="text-xs tracking-[0.15em] uppercase font-semibold text-[#06C755]">無料ダウンロード</span>`
- H3: `text-lg sm:text-xl md:text-2xl font-bold leading-tight`（WPタイトル 2〜3行）
- 説明: `text-sm text-white/60 leading-relaxed` 1行

**右カラム（`md:w-3/5` 白）**
- `p-6 sm:p-8 md:p-10 flex flex-col justify-center`
- 上: `<ul>` で WP の主要数字・ファインディングス 3 項目（`✓` アイコン + 緑）
- 下: **ダウンロードボタンを client component に分離**（GA4 計測のため）

**GA4 計測**
- 専用 client component `app/v2/<industry>/wp-download-button.tsx` を作成
- `onClick` で `track()`（Vercel Analytics）+ `trackGA4()` の両方に送信
- イベント: `wp_download` / parameters: `location: 'v2_<industry>_lp'` / `document: '<doc-id>'`
- ボタン自体は `bg-[#05A847] hover:bg-[#048838] text-white font-bold rounded-md` で LINE Green dark（focus ring は `#06C755`）

**配置ルール**
- 1 LP につき WP ダウンロードは 1 箇所のみ（複数配置しない）
- PDF は `/public/downloads/<industry>-<year>.pdf` に配置
- ヘッダーナビに「調査レポート」等の追加アンカーを入れて誘導する

---

## 8. アクセシビリティ

- **コントラスト**: 本文は WCAG AA 以上（`#1F2937` on `#ffffff`）
- **フォーカス可視化**: 全インタラクティブ要素に `focus:ring-2`
- **代替テキスト**: 全画像に `alt` 必須。装飾画像は `alt=""`
- **見出し階層**: h1→h2→h3 を飛ばさない
- **ダークセクションの文字**: `text-white` + `opacity-90` 以上
- **タップ領域**: 最小 `44×44px`（`py-3 px-6` が目安）
- **LINE Green の扱い**: テキストを載せる面は必ず `#05A847` 以上の暗さを使う。`#06C755` 直にテキストを載せない

---

## 9. 実装タスク（`/v2` FIX 版 完了済みリスト）

- [x] `data/config/colors.js` を LINE Green 構造に書き換え（DESIGN-DIFF.md アクション4）
- [x] `tailwind.config.ts` の primary マッピング更新 + `neutral` 追加
- [x] `globals.css` にフォントファミリー・本文デフォルト line-height 1.75・見出し行間を設定
- [x] 共通ボタンコンポーネント `<Button variant="primary|secondary|outline|ghost|link|destructive">` を作成
- [x] 共通カードコンポーネント `<Card variant="default|elevated|outline|accent">` を作成
- [x] セクションラッパー `<Section spacing="sm|md|lg" container="wide|default|narrow" background="white|muted|accent|dark">` を作成
- [x] `app/v2/page.tsx` をこのDESIGN.mdに沿って新規構築（トップページFIX版）

### 残タスク（Stage 2 以降）

- [ ] `/v2` を `/` に昇格（現 `/` を置き換え）
- [ ] 業種別 LP（8業種）を FIX 版のパターンで順次再構築
- [ ] 昇格時に `app/v2/layout.tsx` の `robots: noindex` を外す
- [ ] sitemap.ts に業種別 LP を登録
- [ ] 既存 `components/lp/*.tsx` の段階的廃止（新プリミティブへの置換）

---

## 10. 外部リンク・CTA 規約

### 10-1. CTA リンク先の正規URL

| アクション | 正規URL |
|----------|--------|
| お問い合わせ / 無料で相談する | `https://classmethod.jp/services/line/line-apps/#iframe-form` |
| 資料ダウンロード | `https://classmethod.jp/download/line-mini-app/` |
| 技術ブログ | `https://dev.classmethod.jp/tags/line/` |
| プライバシーポリシー | `https://classmethod.jp/privacy/` |
| 会社情報 | `https://classmethod.jp/` |

**これらの URL は全ての CTA / フッターで統一**。mailto: や内部アンカーにフォールバックしない。

### 10-2. 外部リンクの書き方

```tsx
<a
  href="https://classmethod.jp/services/line/line-apps/#iframe-form"
  target="_blank"
  rel="noopener noreferrer"
>
  お問い合わせ
</a>
```

- `target="_blank"` + `rel="noopener noreferrer"` を**必ず**セットで付ける
- `<Button asChild>` でラップする場合も同様

### 10-3. CTA を置く場所

1. ヘッダー右端（小サイズ primary: お問い合わせ）
2. ヒーロー内（lg サイズ primary + outline: 無料で相談する + 資料DL）
3. 中盤のグリーン帯 or ポジショニング直後のグリーン帯（1個）
4. 最終ダーク CTA 帯（lg サイズ 2個）
5. フッター CONTACT カラム（テキストリンク 2個）

### 10-4. 電話番号

掲載しない（実番号が確定するまで）。classmethod.jp 本体には `0120-991-668` があるが、LP 側には載せず問い合わせフォームに誘導する。

---

## 11. SEO & 構造化データ

### 11-1. メタデータ（各ページの layout.tsx）

必須フィールド:

```ts
export const metadata: Metadata = {
  title: 'グロースパック for LINE｜ハーフスクラッチで作るLINEミニアプリ開発サービス',
  description: '…最短3ヶ月で立ち上げます。',
  keywords: [
    'LINEミニアプリ',
    'LINEミニアプリ 開発',
    'ハーフスクラッチ',
    'LINE 会員証',
    'LINE OMO',
    'LINE リテール',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } }, // プロトタイプ中のみ
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/v2/<industry>',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title,
    description,
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/<industry>-hero.png',
        width: 1376,
        height: 768,
        alt: '<業種>業界向けLINEミニアプリ開発サービス グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/<industry>-hero.png'],
  },
};
```

**必須追加項目**:
- **`alternates.canonical`**: 各ページ URL を明示的に canonical 宣言。本番昇格時のカノニカル重複防止
- **`openGraph.images`**: ページ固有 hero 画像を指定。width/height/alt 付き。相対パスで書けば Root の `metadataBase` が絶対URLに解決する
- **`twitter.images`**: 同画像（`summary_large_image` カード用）

**SEO空白地帯の占有**: memory `project_seo_gap.md` の調査結果「ハーフスクラッチに言及した記事が30記事中ゼロ」「TCO比較記事ゼロ」を受け、**title の先頭近くに「ハーフスクラッチ」を必ず入れる**。

### 11-2. 構造化データ（JSON-LD）

**FAQPage** — FAQ がある全ページで必須:

```tsx
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
```

**Service** — トップページ / サービス紹介ページで必須:

```tsx
const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'LINEミニアプリ開発サービス',
  name: 'グロースパック for LINE',
  description: '…',
  provider: { '@type': 'Organization', name: 'クラスメソッド株式会社', url: 'https://classmethod.jp' },
  areaServed: { '@type': 'Country', name: 'Japan' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'グロースパック for LINE 機能アセット',
    itemListElement: ['デジタル会員証', '順番待ち', ...].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};
```

**Organization** — Root Layout `app/layout.tsx` で既に設定済み。継承されるため各ページで個別記述不要。

**BreadcrumbList** — 階層ページ（業種別LP 等）で必須:

```tsx
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
      name: '<業種>業界',
      item: 'https://lp.growthpackforline.classmethod.net/v2/<industry>',
    },
  ],
};
```

業種別LPは **FAQPage + Service + BreadcrumbList の 3 種すべて**を注入する（トップは FAQPage + Service の 2 種）。

### 11-3. GA4 / Analytics

- `NEXT_PUBLIC_GA_ID` 環境変数で Root Layout に gtag を注入済み
- `@vercel/analytics/next` の `<Analytics />` も Root で挿入済み
- **Next.js の layout 継承により全サブページで自動動作**。新規ページで追加実装は不要
- LP固有のイベント計測（CTA クリック / スクロール深度 / WP DL 等）は §15 参照

### 11-4. noindex 運用

- プロトタイプ段階の新ページは必ず `robots: noindex+nofollow+noimageindex` を layout.tsx で設定
- 本番公開時に metadata から robots フィールドを削除（= Next.js デフォルトの index+follow に戻る）
- `sitemap.ts` にもこのタイミングで登録する

---

## 12. JSX 和文の改行禁止ルール

JSX テキストノード内で和文を改行すると、改行位置に半角スペースが混入し、和文字間に妙な隙間が出る。**和文の本文段落は必ず 1 行にまとめる**。

❌ NG
```tsx
<p>
  SaaSは速く安いが、拡張と連携に制約があります。
  フルスクラッチは自由度が高いが、期間とコストが膨らみます。
</p>
```

✅ OK（長くても 1 行）
```tsx
<p>
  SaaSは速く安いが、拡張と連携に制約があります。フルスクラッチは自由度が高いが、期間とコストが膨らみます。
</p>
```

✅ OK（テンプレートリテラルで明示的に制御）
```tsx
<p>{`SaaSは速く安いが、拡張と連携に制約があります。フルスクラッチは自由度が高いが、期間とコストが膨らみます。`}</p>
```

欧文は単語区切りの空白が意味を持つため改行OK。日本語のみの制約。

---

## 13. 画像・アイコン ルール

### 13-1. 機能アイコン

機能グリッド等で機能を表現するアイコンは**必ず `/public/images/<機能名>.png` の PNG を Next.js `<Image>` で表示**する。Lucide React アイコンで代用しない。

- 会員証: `/images/会員証.png`
- 順番待ち: `/images/順番待ち.png`
- 予約: `/images/予約.png`
- スタンプカード: `/images/スタンプカード.png`
- クーポン: `/images/クーポン.png`
- チケット: `/images/チケット.png`
- 抽選: `/images/抽選.png`
- セグメント配信: `/images/セグメント配信.png`
- 1to1: `/images/1to1.png`
- ギフト: `/images/ギフト.png`

### 13-2. UI アイコン

機能を表現しないUI用アイコン（矢印/チェック/バッジ/シールド 等）は Lucide React を使う。Growthpack のブランド色と噛み合わない色（純青など）は避ける。

### 13-3. ストック写真

**原則使用しない**。ヒーローのダークグラデ+ SVG 構成、Phase/機能カードの PNG アイコン、背景のドットグリッドで視覚的リッチさを担保する。業種別LPで実務シーン写真を使う場合は §7-1b（写真背景バリエーション）に従い、必ずダークオーバーレイを重ねる。

---

## 14. 業種別LP の作り方（テンプレート）

新しい業種別LPを立てるときの手順。`/v2/apparel` を雛形として参考にする。

### 14-1. 事前準備

- `scripts/pattern_lookup.py <業種名>` で業界パターンを引く（必須）
- 業種別のヒーロー画像 `/public/images/<industry>-hero.png` を用意（16:9、1376x768 以上推奨）
- 業種別WP PDF があれば `/public/downloads/<industry>-<year>.pdf` に配置

### 14-2. ファイル構成

```
app/v2/<industry>/
├── layout.tsx           — metadata（canonical + og:image + robots noindex）
├── page.tsx             — server component（§7 のパターンを業種コンテンツで埋める）
├── tracking.tsx         — client: TrackedExternalLink（§15-2）
├── scroll-tracker.tsx   — client: ScrollTracker（§15-3）
└── wp-download-button.tsx — client: WP ダウンロードボタン（§7-12 + §15）
```

### 14-3. コンテンツ差し替えポイント

| セクション | 差し替え内容 |
|---------|------------|
| Hero | 業種別 H1 + サブコピー + 認定バッジ + 業種特有のミニチェックリスト |
| 信頼バッジ帯 | 業種調査実績等の業種特有ラベルを含める |
| 実績数字 | 業種 KPI 4 指標（ROI 根拠になる数値） |
| 課題 | 業種固有の課題 4〜5 枚（nina-level.md のパターンを参照） |
| 訴求セクション（任意） | 業種別の訴求フロー 3 ステップ |
| ポジショニング | 中央カード比較軸を業種課題に寄せる |
| 機能グリッド | §7-6 の推奨機能表から 6〜8 機能を選ぶ |
| Phase ロードマップ | 業種 Phase 設計 |
| WP ダウンロード | 業種調査 WP があれば配置 |
| FAQ | 業種固有の5問（期間・連携・既存システム・業種分類 等） |
| 最終 CTA | コピーだけ業種向けに |
| フッター | 業種 LP 内アンカーでナビを書き換え |

### 14-4. チェックリスト

- [ ] `pattern_lookup.py` で業界パターンを引いた
- [ ] ヒーロー画像が `/public/images/<industry>-hero.png` にある
- [ ] layout.tsx の title に「<業種>」「ハーフスクラッチ」「LINEミニアプリ」が入っている
- [ ] canonical / og:image / twitter:image が設定されている
- [ ] robots: noindex+nofollow+noimageindex が入っている（本番昇格まで）
- [ ] FAQPage + Service + BreadcrumbList の 3 種 JSON-LD
- [ ] 機能は 6〜8 個に絞られている（全10機能を出していない）
- [ ] 和文段落に不要改行が入っていない
- [ ] 機能アイコンは `/public/images/<機能名>.png`
- [ ] CTA リンクは classmethod.jp 正規URL（§10）
- [ ] 具体額の記載がない
- [ ] 煽り語がない
- [ ] コピーライト `© Classmethod, Inc.`
- [ ] TrackedExternalLink で CTA 6 箇所を計測対応
- [ ] ScrollTracker でセクション 6〜7 を計測対応
- [ ] WP DL ボタンは client component に分離
- [ ] `pnpm build` が成功する

---

## 15. GA4 計測パターン

### 15-1. イベント命名規則

- snake_case
- **汎用イベント名 × パラメータ**で構造化（ページ別にイベント名を増やさない）

| イベント | パラメータ | 使途 |
|---------|----------|------|
| `page_view` | —（GA4 標準） | ページビュー |
| `cta_click` | `location`, `destination` | CTA ボタンクリック |
| `section_view` | `section_id` | セクション 30% 到達 |
| `wp_download` | `location`, `document` | ホワイトペーパー DL |

**location の値**: `header` / `hero_primary` / `hero_secondary` / `midband` / `final_primary` / `final_secondary` / `footer` / `v2_<industry>_lp` 等
**destination の値**: `contact` / `download` の2値に統一

### 15-2. TrackedExternalLink（CTA ラッパー）

page.tsx を server component に保持しつつ CTA クリックを計測するための最小 client コンポーネント。業種LPごとに `app/v2/<industry>/tracking.tsx` を作成する:

```tsx
'use client';

import { track } from '@vercel/analytics';
import { trackGA4 } from '@/lib/ga4';

type Destination = 'contact' | 'download';

export function TrackedExternalLink({
  href,
  location,
  destination,
  children,
  className,
}: {
  href: string;
  location: string;
  destination: Destination;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        track('cta_click', { location, destination });
        trackGA4('cta_click', { location, destination });
      }}
    >
      {children}
    </a>
  );
}
```

**使い方**: 既存の `<Button variant="primary" asChild>` の子として入れる。`<Button>` の見た目は維持される。

```tsx
<Button variant="primary" size="lg" asChild>
  <TrackedExternalLink
    href="https://classmethod.jp/services/line/line-apps/#iframe-form"
    location="hero_primary"
    destination="contact"
  >
    無料で相談する
    <ArrowRight className="w-5 h-5 ml-2" />
  </TrackedExternalLink>
</Button>
```

### 15-3. ScrollTracker（section_view）

IntersectionObserver で各セクションが画面に 30% 入ったタイミングで `section_view` を 1 回だけ発火する。業種LPごとに `app/v2/<industry>/scroll-tracker.tsx` を作成:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';
import { trackGA4 } from '@/lib/ga4';

const SECTION_IDS = [
  'problems',
  'appeal', // 業種によって名称が異なる場合あり
  'features',
  'phases',
  'wp-download',
  'faq',
  'contact',
];

export function ScrollTracker() {
  const fired = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fired.current.has(entry.target.id)) {
            fired.current.add(entry.target.id);
            const params = { section_id: entry.target.id };
            track('section_view', params);
            trackGA4('section_view', params);
          }
        });
      },
      { threshold: 0.3 },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
```

**使い方**: page.tsx の `<main>` 内先頭に `<ScrollTracker />` を置くだけ。

### 15-4. WPダウンロードボタン

§7-12 に従って `wp-download-button.tsx` を作成。`wp_download` イベントを両方のアナリティクスに送信。

### 15-5. GA4 プロパティ側で必要な設定

- **Custom dimension 登録**: `location` / `destination` / `section_id` / `document` の 4 つをプロパティ設定 → カスタム定義 → カスタムディメンション登録
- これをしないと探索レポートでこれらのパラメータが選べない
- 登録後 24 時間程度で計測画面に反映される

### 15-6. 検証フロー

1. Preview デプロイ後、GA4 Realtime を開く
2. Preview をブラウザで開いて CTA クリック・スクロール・WP DL を実行
3. Realtime の**イベント一覧**に `cta_click` `section_view` `wp_download` が出るか確認
4. 各イベントをタップして **パラメータ**画面を開き、`destination` や `location` の値が出るか確認
5. DevTools Network タブで `g/collect?v=2&tid=G-XXXXX&en=cta_click...` のリクエストが飛んでいるかを確認

---

## 16. 更新履歴

- 2026-04-11 v1 初版。classmethod.jp 観察ベース
- 2026-04-11 v1.1 プライマリをLINE公式ブランドカラー (LINE Green #06C755) に変更。AA可読性確保のためボタン/リンクのテキスト面は dark 版 #05A847 を使う2段構えに
- 2026-04-11 v1.2 DESIGN-DIFF.md アクション1反映。現実装に合わせて neutral 系 HEX (text/border/bg-muted) と LINE Green dark/light を統一。Semantic accent (error/caution) を追加定義
- 2026-04-11 v1.3 DESIGN-DIFF.md アクション3-5反映。LINE Green light を #E8F8F0 に統一（5箇所置換）、tailwind.config.ts と colors.js を LINE Green 構造に書き換え（Indigoデッドコード除去）、hero装飾円の青 #3B82F6 を LINE Green に変更、AWS #FF9900 を意味的例外として明文化、Award #F59E0B をトークンとして追加
- 2026-04-11 v1.4 セクション2〜4を現LP実装値に整合。globals.css にフォントスタック・行間1.75・見出し行間デフォルトを注入。共通プリミティブ `<Button>` `<Section>` `<Card>` を DESIGN.md §4 準拠で新設（components/shared/ui/）。タイポグラフィスケールを現LP使用パターンに合わせて10種に絞り込み、コンテナ幅 900px / section padding 3段 (sm/md/lg) を標準化
- 2026-04-11 v1.5 **classmethod.jp の視覚DNA再調査結果を反映**。原則を「情報密度で信頼を作る」「写真背景ヒーロー」「認定バッジ帯 + クライアントロゴ帯 + 実績数字の3層信頼構築」「電話番号併記のCTA」等に刷新。§7 画面構成パターンを classmethod.jp 準拠で全面書き換え（ヒーロー白背景→写真背景、信頼バッジ帯追加、CTAに電話番号併記）
- 2026-04-11 **v2.0 `/v2` トップページ FIX 版との整合**。ヒーローを「写真背景」から「ダークグラデ + SVG 放射型タッチポイント図」に変更（写真を撤廃、スマホを中心に6接点カードが放射する構図）。クライアントロゴ帯と電話番号 CTA は実データ未整備のため削除。ポジショニング比較を 4 → 3 カラムに縮約（Option B 統合）。会員証バーコード表示を QR → 1 次元に変更。実装期間表記を「最短1ヶ月」→「**最短3ヶ月**」（会員証含む現実値）に統一。§0 原則を FIX 版に合わせて刷新。§7 画面構成パターンを `/v2` 実装準拠で全面書き直し。新規章として §10（外部リンク・CTA 規約: classmethod.jp の正規URL / target="_blank" / 電話番号非掲載）、§11（SEO & 構造化データ: metadata / FAQPage + Service JSON-LD / noindex運用）、§12（JSX 和文の改行禁止ルール）、§13（画像・アイコン ルール: 機能PNG必須 / UI は Lucide / ストック写真原則禁止）を追加
- 2026-04-12 **v2.1 `/v2/apparel` の実装から抽出した業種別LPの再利用パターンを反映**。§7-1b「ヒーロー写真背景バリエーション」を追加（業種別LPに限り `/public/images/<industry>-hero.png` + ダークオーバーレイを許容）。§7-6 機能グリッドに「業種別LPの機能絞り込みルール」を追加（10機能→6〜8機能、業種別推奨セットの早見表付き）。§7-12「WPダウンロードセクション」を新規追加（ダーク左+白右の2カラム + GA4 `wp_download` 計測）。§11 SEO に `alternates.canonical` / `openGraph.images` / `twitter.images` / `BreadcrumbList` JSON-LD を必須として追加。§14「業種別LPの作り方（テンプレート）」を新設（ファイル構成 / 差し替えポイント / 18項目チェックリスト）。§15「GA4計測パターン」を新設（cta_click/section_view/wp_download のイベント命名・TrackedExternalLink/ScrollTrackerの実装テンプレ・GA4プロパティ側のカスタムディメンション登録手順・検証フロー）。§14 更新履歴は §16 に繰り下げ
