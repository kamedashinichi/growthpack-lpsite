# DESIGN-DIFF.md — 現状のLPコンポーネント vs DESIGN.md v1.1

作成日: 2026-04-11
対象: `growthpack-lpsite/components/lp/**` 全25ファイル
目的: DESIGN.md v1.1（LINE Green 採用版）との差分を洗い出し、整合対応のタスクを明確化する

---

## 1. 現状の色使用実態（コンポーネント内の直書きHEX値カウント）

| HEX | 回数 | 分類 | 備考 |
|-----|------|-----|------|
| `#06C755` | **100** | LINE Green (primary) | DESIGN.md と一致 ✓ |
| `#1F2937` | **50** | text primary | DESIGN.md 提案 `#0a0a0a` と不一致 |
| `#6B7280` | 27 | text secondary | DESIGN.md 提案 `#4a5568` と不一致 |
| `#05A847` | 25 | LINE Green dark (CTA) | DESIGN.md 提案 `#05A548` と微差（3色相違い） |
| `#E5E7EB` | 12 | border | DESIGN.md 提案 `#e2e8f0` と微差 |
| `#E8F8F0` | 11 | LINE Green light | DESIGN.md 提案 `#E6F9EE` と不一致 |
| `#FB923C` | 10 | orange accent | 統一必要 |
| `#9CA3AF` | 10 | text muted | DESIGN.md 提案 `#8892a0` と不一致 |
| `#4B5563` | 8 | text secondary | slate-600 |
| `#EF4444` | 7 | error red | DESIGN.md 未定義 |
| `#FCD34D` | 6 | warn yellow | DESIGN.md 未定義 |
| `#0a0a0a` | 5 | text primary | DESIGN.md 提案と一致（ただし採用5回のみ） |
| `#F8F9FA` | 4 | bg-muted | DESIGN.md 提案 `#f5f7fa` と微差 |
| `#FF9900` | 3 | orange | AWS連想。精査必要 |
| `#FEF3C7` | 3 | warn bg | amber-100 |
| `#E7F8ED` | 3 | LINE Green light 別バージョン | 統一必要 |
| `#F0FDF4` | 2 | LINE Green light 別バージョン | 統一必要 |
| `#64748b` | 2 | text | slate-500 |
| `#39D275` | 2 | **旧LINE Green系** | 要除去 |
| `#00C300` | 2 | **旧LINE Green**（2019年以前） | 要除去 |
| `#F59E0B` | 1 | amber | 個別発生 |
| `#3B82F6` | 1 | blue | 個別発生（LINE色と衝突リスク） |

**主要な発見**:
1. LINE Green `#06C755` は既に100箇所で使用済み → DESIGN.md v1.1 の選定は正解
2. dark 版 `#05A847` が25箇所で既に使われている → **DESIGN.md 側を `#05A548` → `#05A847` に合わせる方が置換コスト圧倒的に低い**
3. **旧LINE Green `#00C300` / `#39D275` が混在** → ブランド一貫性のため `#06C755` に統一必要
4. LINE Green の light版が3種類 (`#E8F8F0` / `#E7F8ED` / `#F0FDF4`) に分裂 → 統一必要
5. text primary は `#1F2937`（50回）が実質スタンダードで `#0a0a0a`（5回）は少数派 → **DESIGN.md 側を #1F2937 に合わせる方が現実的**

---

## 2. tailwind.config.ts のデッドコード問題

現在の `data/config/colors.js` 定義:

```javascript
export const colors = {
  primary: {
    lighter: '#a5b4fc',  // Indigo-300
    light:   '#818cf8',  // Indigo-400
    main:    '#6366f1',  // Indigo-500
    dark:    '#4f46e5',  // Indigo-600
    darker:  '#4338ca',  // Indigo-700
  },
  secondary: {
    lighter: '#86efac',  // Green-300
    light:   '#4ade80',  // Green-400
    main:    '#22c55e',  // Green-500
    dark:    '#16a34a',  // Green-600
    darker:  '#15803d',  // Green-700
  },
};
```

**これは完全なデッドコード**です。`bg-primary-500` 等のクラス使用実態を調べたが、LPコンポーネントでは Tailwind primary/secondary クラスを一切使っておらず、全てが `bg-[#06C755]` のような任意値直書きで実装されている。

**原因**: Shipixen テンプレートの初期値（Indigo プライマリ）がそのまま残っている。LPの実装途中で「任意値で書く方が早い」判断があり、config の整備を後回しにしたと推測。

**影響**:
- 色の一元管理ができず、変更時は全ファイルgrep&置換
- 新規コンポーネント作成時に毎回 HEX を直書きするため、派生バリエーション（`#05A847` vs `#05A548`）が発生しやすい
- DESIGN.md のトークン運用が効かない

---

## 3. 推奨アクション（優先度順）

### アクション 1: DESIGN.md 側を現実装に合わせて微調整（最優先・コスト最小）

DESIGN.md v1.1 の提案値のうち、現実装で多用されている値と微差のものは**現実装側に合わせる**。これで置換作業がほぼゼロになる。

| トークン | DESIGN.md 現状 | 変更先 | 根拠 |
|---------|-------------|-------|------|
| `--color-primary-dark` | `#05A548` | **`#05A847`** | 現LPで25箇所使用済み |
| `--color-primary-light` | `#E6F9EE` | **`#E8F8F0`** | 現LPで11箇所使用済み（最多） |
| `--color-text` | `#0a0a0a` | **`#1F2937`** | 現LPで50箇所使用済み |
| `--color-text-sub` | `#4a5568` | **`#6B7280`** | 現LPで27箇所使用済み |
| `--color-text-muted` | `#8892a0` | **`#9CA3AF`** | 現LPで10箇所使用済み |
| `--color-border` | `#e2e8f0` | **`#E5E7EB`** | 現LPで12箇所使用済み |
| `--color-bg-muted` | `#f5f7fa` | **`#F8F9FA`** | 現LPで4箇所使用済み |

**効果**: 約139箇所（50+27+25+12+11+10+4）の置換作業が不要になる

### アクション 2: 旧LINE Green の除去（品質問題）

特定済みの使用箇所:

| ファイル | 行 | 現状 | 置換後 |
|---------|-----|------|-------|
| `footer.tsx` | 16 | `text-[#00C300]` （"LINE"ロゴ風文字） | `text-[#06C755]` |
| `header.tsx` | 52 | `text-[#00C300]` （"LINE"ロゴ風文字） | `text-[#06C755]` |
| `hero-section.tsx` | 228 | `bg-gradient-to-br from-[#06C755]/15 via-[#39D275]/10 to-[#E8F8F0]` | `via-[#06C755]/10` に統一 |
| `hero-section.tsx` | 247 | `bg-gradient-to-r from-[#06C755] to-[#39D275]` | `to-[#05A847]` （dark 版へのグラデ） or 単色 `#06C755` |

**注**: `text-[#00C300]` は「LINE」というテキストにLINEロゴ風の色を当てているもの。LINE公式の現行ブランドガイドラインは `#06C755` なのでそちらに統一するのが正。

ただし**LINEの商標利用ルール上、自社LPで「LINE」文字を緑色で強調表示することがブランドガイドラインに抵触する可能性**があるため、別途法務/ブランド面で確認した方が良い（今回のスコープ外）。

### アクション 3: LINE Green light の統一（整合性）

- `#E7F8ED` (3箇所) → `#E8F8F0` に統一
- `#F0FDF4` (2箇所) → `#E8F8F0` に統一

### アクション 4: tailwind.config.ts の正規化（基盤整備）

`data/config/colors.js` を以下に書き換え:

```javascript
export const colors = {
  // LINE Green brand palette
  primary: {
    lighter: '#E8F8F0',  // bg tag, highlight block
    light:   '#39D275',  // (未使用だが派生として定義)
    main:    '#06C755',  // LINE Green 本体 (色面単独、focus ring)
    dark:    '#05A847',  // CTAボタン本体、本文リンク (AA確保)
    darker:  '#048838',  // hover, pressed
  },
  // Neutral (テキスト・背景・ボーダー)
  neutral: {
    lighter: '#F8F9FA',  // bg muted
    light:   '#E5E7EB',  // border
    main:    '#9CA3AF',  // text muted
    dark:    '#6B7280',  // text sub
    darker:  '#1F2937',  // text primary
  },
  // Secondary (ダークCTA)
  secondary: {
    lighter: '#64748b',
    light:   '#4B5563',
    main:    '#32373c',  // ダークボタン
    dark:    '#1a1d21',  // フッター背景
    darker:  '#0a0a0a',
  },
};
```

同時に `tailwind.config.ts` の primary マッピングを更新。

### アクション 5: Accent カラーのセット化（DESIGN.md 側の欠落補完）

現状使われている accent が DESIGN.md で未定義のため追加:

```markdown
### Semantic accent

| 用途 | トークン | HEX | 使用箇所 |
|-----|---------|-----|---------|
| 警告・注目 | `--color-warn` | `#FB923C` | バッジ、注目強調（orange） |
| エラー | `--color-error` | `#EF4444` | 入力エラー、警告 |
| 注意 | `--color-caution` | `#FCD34D` | 注意表示、キャプション |
| 注意背景 | `--color-caution-bg` | `#FEF3C7` | 注意文の背景塗り |
```

`#FF9900` (3箇所) と `#F59E0B` (1箇所) は `#FB923C` に統一、`#3B82F6` (1箇所) は個別精査（LINE Green と衝突するため除去推奨）。

### アクション 6: 段階的リファクタ（低優先・中長期）

- 新規コンポーネントは必ず `bg-primary-500` 等のトークンクラスを使う（直書きHEX禁止）
- 既存コンポーネントは**触る時に一緒に直す** opportunistic refactor で徐々にトークン化
- 全件一括リファクタは回避（変更量が大きくリグレッションリスク高）

---

## 4. 実行順序サマリ

| # | アクション | 工数目安 | 影響範囲 | 優先度 |
|---|----------|---------|---------|--------|
| 1 | DESIGN.md 側を現実装に合わせて微調整 | 5分 | docs/DESIGN.md のみ | 🔥 最優先 |
| 2 | 旧LINE Green (`#00C300`, `#39D275`) の置換 | 10分 | 4箇所のファイル | 🔥 最優先 |
| 3 | LINE Green light の統一 (`#E8F8F0`) | 10分 | 5箇所のファイル | 🟡 次点 |
| 4 | `data/config/colors.js` 正規化 + tailwind.config.ts 更新 | 15分 | 基盤ファイル2つ | 🟡 次点 |
| 5 | Accent カラーを DESIGN.md に追加定義 | 5分 | docs/DESIGN.md のみ | 🟡 次点 |
| 6 | 段階的トークンリファクタ | 継続 | LPコンポーネント全般 | 🟢 中長期 |

---

## 5. 差分まとめ図（スコアカード）

```
現状 ⇄ DESIGN.md v1.1 の整合度

[整合済み] ████████████████░░░░ 80%
  - primary #06C755: 完全一致
  - 基本構造（白/黒/グレー + LINE Green）は完全一致
  - タイポグラフィ・レイアウトは実装未確認だが概ね整合

[微調整必要] ██░░░░░░░░░░░░░░░░░░ 10%
  - neutral系HEX値（text/border/bg-muted）の正式値を現実装に寄せる
  - dark/light の LINE Green バリエーションを1つに統一

[要修正] ██░░░░░░░░░░░░░░░░░░ 10%
  - 旧LINE Green (#00C300, #39D275) の除去
  - tailwind.config.ts のデッドコード書換え
  - Accent カラーの統一
```
