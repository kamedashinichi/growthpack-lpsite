# DESIGN.md — Growthpack LPサイト デザインシステム

出典: クラスメソッド株式会社 公式サイト（https://classmethod.jp/）の構造・トーン・配色観察をベースに、Growthpack LPサイトで再現可能な形へ落とし込んだ仕様書。

LINE連携プロダクトであることを視覚的に即伝えるため、プライマリに LINE 公式ブランドカラー **LINE Green (#06C755)** を採用。

---

## 0. デザイン原則

1. **ミニマル＆信頼性優先** — 装飾は最小限。空白とタイポグラフィで情報階層を作る
2. **技術者向けの実直さ** — 訴求は感情煽りではなく事実と数値。語尾は丁寧体
3. **CTAはアクセント色1色で一貫** — 複数色で競わせず、1画面1メインCTA
4. **モノクロ基調 × LINE Green 差し色** — 本文はほぼ白黒、LINE Green は限定使用でブランド感を出す
5. **レイアウトは中央寄せグリッド** — コンテンツ幅 `max-w-[1200px]`、内部は `max-w-[960px]` が標準

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

### フォントファミリー

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

### スケール（Tailwind ユーティリティ互換）

| 用途 | サイズ | line-height | weight | Tailwindクラス例 |
|-----|-------|------------|-------|----------------|
| h1 (hero) | 42–56px | 1.2 | 700 | `text-5xl md:text-6xl font-bold leading-tight` |
| h2 (section) | 32–40px | 1.3 | 700 | `text-3xl md:text-4xl font-bold` |
| h3 (subsection) | 24–28px | 1.4 | 600 | `text-2xl font-semibold` |
| h4 | 20px | 1.5 | 600 | `text-xl font-semibold` |
| body (大) | 18px | 1.75 | 400 | `text-lg leading-relaxed` |
| body | 16px | 1.75 | 400 | `text-base leading-relaxed` |
| caption | 14px | 1.6 | 400 | `text-sm` |
| meta | 13px | 1.5 | 400 | `text-xs` |

- 本文の行間は **1.75**（和文可読性重視）
- 見出しの行間は **1.2–1.4**
- 見出しは `font-weight: 700`、本文は `400`。`500`〜`600`は中見出し限定

### 見出しの装飾パターン

- 装飾なしが基本。下線・色塗りは使わない
- セクション見出しの上に小さな英語キャプション（14px / uppercase / primary dark 色）を置くパターンを標準とする
  ```
  SERVICE
  サービス一覧
  ```

---

## 3. レイアウト & グリッド

### コンテナ

| 幅 | 用途 |
|---|------|
| `max-w-[1200px]` | ヘッダー・フッター・ワイドセクション |
| `max-w-[960px]` | 標準コンテンツ（本文・カード・フォーム） |
| `max-w-[720px]` | 読み物（ブログ・記事本文） |

全てセンタリング (`mx-auto`) + 左右パディング `px-4 md:px-6 lg:px-8`

### 縦リズム（セクション間余白）

| サイズ | 値 | 用途 |
|-------|-----|------|
| `section-gap-sm` | `py-12 md:py-16` | 小セクション・CTA帯 |
| `section-gap-md` | `py-16 md:py-24` | 標準セクション |
| `section-gap-lg` | `py-24 md:py-32` | ヒーロー・主要セクション |

### 要素間余白

- 段落間: `space-y-4`（16px）
- 見出しと本文: `mt-4`〜`mt-6`
- ボタンと直前テキスト: `mt-8`
- カードグリッドの gap: `gap-6 md:gap-8`

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

### ボタン

**プライマリCTA**（LINE Green dark）
```tsx
<button className="
  inline-flex items-center justify-center
  px-6 py-3
  bg-[#05A847] hover:bg-[#048838]
  text-white text-base font-semibold
  rounded-md
  transition-colors duration-150
  focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:ring-offset-2
">
  お問い合わせ
</button>
```

※ ボタン本体の背景は `#05A847`（dark 版）を使用。focus ring はブランド色 `#06C755` を使って LINE 感を出す。

**セカンダリ（ダーク）**
```tsx
<button className="
  inline-flex items-center justify-center
  px-6 py-3
  bg-[#32373c] hover:bg-[#1a1d21]
  text-white text-base font-semibold
  rounded-md
">
  資料ダウンロード
</button>
```

**アウトライン**
```tsx
<button className="
  inline-flex items-center justify-center
  px-6 py-3
  border-2 border-[#05A847] text-[#05A847] hover:bg-[#05A847] hover:text-white
  text-base font-semibold
  rounded-md
">
  詳しく見る
</button>
```

**共通仕様**
- 角丸: `rounded-md`（6px）が基本。ピル型 (`rounded-full`) は補助CTA限定
- パディング: 縦 `py-3`（12px）、横 `px-6`（24px）が標準
- 最小幅: `min-w-[160px]` を推奨
- フォントサイズ: `text-base`（16px） / weight `600`
- transition: `150ms` で統一

### カード

```tsx
<div className="
  bg-white
  border border-[#E5E7EB]
  rounded-lg
  p-6 md:p-8
  hover:shadow-lg hover:border-[#06C755]/40
  transition-all duration-200
">
  {/* content */}
</div>
```

- 角丸: `rounded-lg`（8px）
- 影: デフォルト無し、hover時に `shadow-lg`
- 内側パディング: `p-6`〜`p-8`
- ボーダー: `border` + `#E5E7EB`

### ナビゲーション

- ヘッダー高さ: `h-16 md:h-20`（64–80px）
- 背景: 白 + 下部 `border-b border-[#E5E7EB]`
- スクロール追従: `sticky top-0 z-50 bg-white/95 backdrop-blur`
- ナビリンク色: `text-[#1F2937]` / hover `text-[#05A847]`
- モバイル: 768px 未満はハンバーガーメニュー、右からスライドイン

### リンク（本文中）

```tsx
<a className="
  text-[#05A847]
  underline underline-offset-2
  hover:text-[#048838]
">
  テキスト
</a>
```

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

## 7. 画面ごとの構成パターン

### ヒーロー

- 左右2カラム（md:以上）、スマホは縦積み
- 左: H1 + サブコピー + CTAボタン2個（primary + secondary）
- 右: 製品スクリーンショット or イラスト
- 背景: 白 or 淡グレー。グラデは `#06C755` → `#E8F8F0` の LINE Green 系のみ許容

### 機能紹介セクション

- 3〜4カラムのカードグリッド
- 各カードに: アイコン（上） / 見出し（中） / 説明文（下） / リンク（下）
- カード間 `gap-6 md:gap-8`

### 事例セクション

- 横スクロール or 3カラムグリッド
- ロゴ + 企業名 + 1行で成果（数値）
- hover時にカード浮き上がり（`hover:shadow-lg`）

### 問い合わせ前のCTA帯

- ダーク背景 `bg-[#1a1d21]` + 白文字 で視線を切り替える
- 見出し + 1行サブコピー + 大きなCTAボタン

### フッター

- 背景 `bg-[#1a1d21]` / 文字 `text-white`
- 4〜5カラム: 会社情報 / サービス / 事例 / リソース / SNS
- 最下段 copyright は中央寄せ `text-xs text-white/60`

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

## 9. 実装タスク（初期整備チェックリスト）

- [ ] `data/config/colors.js` を LINE Green 構造に書き換え（DESIGN-DIFF.md アクション4）
- [ ] `tailwind.config.ts` の primary マッピング更新
- [ ] `globals.css` にフォントファミリー・本文デフォルト line-height 1.75 を設定
- [ ] 共通ボタンコンポーネント `<Button variant="primary|secondary|outline">` を作成
- [ ] 共通カードコンポーネント `<Card>` を作成
- [ ] セクションラッパー `<Section spacing="sm|md|lg">` を作成
- [ ] 既存LPのHero/Feature/Case/FooterをこのDESIGN.mdに沿ってリファクタ

---

## 10. 更新履歴

- 2026-04-11 v1 初版。classmethod.jp 観察ベース
- 2026-04-11 v1.1 プライマリをLINE公式ブランドカラー (LINE Green #06C755) に変更。AA可読性確保のためボタン/リンクのテキスト面は dark 版 #05A847 を使う2段構えに
- 2026-04-11 v1.2 DESIGN-DIFF.md アクション1反映。現実装に合わせて neutral 系 HEX (text/border/bg-muted) と LINE Green dark/light を統一。Semantic accent (error/caution) を追加定義
- 2026-04-11 v1.3 DESIGN-DIFF.md アクション3-5反映。LINE Green light を #E8F8F0 に統一（5箇所置換）、tailwind.config.ts と colors.js を LINE Green 構造に書き換え（Indigoデッドコード除去）、hero装飾円の青 #3B82F6 を LINE Green に変更、AWS #FF9900 を意味的例外として明文化、Award #F59E0B をトークンとして追加
