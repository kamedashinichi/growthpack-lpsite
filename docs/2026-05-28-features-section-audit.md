# /impeccable audit: 機能アセットセクション単体監査

検証日: 2026-05-28
対象: `app/page.tsx` の「10の機能アセットから、選んで組み合わせる。」セクション（`app/page.tsx:896-965`）
ブランチ: `try/impeccable`
Skill: impeccable v2.1.9

## はじめに

トップページ全体ではなく、1セクションだけを切り出して `/impeccable audit` をかけた。
セクション単位なら指摘が散らばらず、ブログでも追いやすいはず、という意図。

対象は「10の機能アセットから、選んで組み合わせる。」セクション。
アイコン+機能名+ステップバッジ+一文+価格+「詳細を見る →」を含むカードが、3カラムで10枚並んでいる構成。

## 結論

| 項目               | 結果                                      |
| ------------------ | ----------------------------------------- |
| Audit Health Score | 13/20（Acceptable - 要改善あり）          |
| P1 Major           | 2件                                       |
| P2 Minor           | 3件                                       |
| P3 Polish          | 2件                                       |
| Anti-Patterns 判定 | ⚠ Half-fail（identical card grid に該当） |

「致命的ではないが、緑テキストのコントラスト不足と、10連の均一カードグリッドが弱点」というフィードバック。
特にカードグリッドは impeccable の絶対バンに明記されている「**Identical card grids**: Same-sized cards with icon + heading + text, repeated endlessly」にそのまま該当する形だった。

## 検証環境

| 項目           | 内容                                    |
| -------------- | --------------------------------------- |
| フレームワーク | Next.js 16.0.10 (App Router, Turbopack) |
| スタイリング   | Tailwind CSS v4                         |
| Claude Code    | Opus 4.7                                |
| Skill          | impeccable v2.1.9                       |
| 対象範囲       | 単一セクション（70行）                  |

## Audit Health Score（5観点）

| #         | Dimension     | Score     | Key Finding                                                                           |
| --------- | ------------- | --------- | ------------------------------------------------------------------------------------- |
| 1         | Accessibility | 2         | `text-line-green` (#06C755) on white で「詳細を見る →」が contrast 2.4:1（AA 不合格） |
| 2         | Performance   | 3         | next/image に `sizes` 未指定で過大配信の可能性                                        |
| 3         | Responsive    | 4         | 不具合なし                                                                            |
| 4         | Theming       | 2         | 3色バッジが hex 直書き、`text-[#4B5563]` が `muted-foreground` を迂回                 |
| 5         | Anti-Patterns | 2         | 「アイコン+見出し+説明+矢印」を10連発する identical card grid                         |
| **Total** |               | **13/20** | **Acceptable**                                                                        |

## Anti-Patterns 判定

impeccable の絶対バン（shared design laws）に明記されている項目のうち、以下に該当した。

> **Identical card grids.** Same-sized cards with icon + heading + text, repeated endlessly.

10枚のカードが完全に同一テンプレート。
アイコン+名前+バッジ+一文+価格+「詳細を見る →」の組み合わせを繰り返す形は、AI 生成 LP に頻出するパターン。
他のテル（gradient text / glassmorphism / hero metric / side-stripe border）はクリアできていた。

## 詳細所見（Severity 別）

### [P1] 「詳細を見る →」の緑色がコントラスト不足

- Location: `app/page.tsx:956-957`
- Category: Accessibility
- `text-line-green` (#06C755) on white は contrast ~2.4:1
- WCAG 1.4.3 Contrast (Minimum) の AA 基準（4.5:1）を未達
- `text-sm` の通常テキストなので、大文字例外（3:1）も適用外
- Fix 案: 矢印だけ緑にして、テキスト本体は `text-foreground` で黒系にする

### [P1] 価格表示「初期費用 ¥XX万」の緑も同じ問題

- Location: `app/page.tsx:949-952`
- Category: Accessibility
- `text-line-green-dark` (#05A847) on white で ~3.3:1、AA 未達
- `text-sm font-bold` のサイズで例外も効かない
- Fix 案: 価格自体は `text-foreground`、ラベル「初期費用」だけ緑にする

### [P2] アイコン画像に `sizes` 未指定

- Location: `app/page.tsx:925-930`
- Category: Performance
- next/image の `fill` + `sizes` 未指定は、デフォルトで `100vw` 想定の画像が配信される
- 実表示サイズは 44x44px なので、過大配信の状態
- Fix 案: `sizes="44px"` を追加

### [P2] バッジ3色が hex 直書き

- Location: `app/page.tsx:907-912`
- Category: Theming
- `bg-[#FEF3C7] text-[#B45309]`、`bg-[#EDE9FE] text-[#6D28D9]` が token 未経由
- globals.css にもエンゲージメント色・ロイヤルティ色のトークンが定義されていない
- Fix 案: 専用トークンを追加するか、Tailwind 標準パレット（amber / violet）に統一

### [P2] Identical card grid アンチパターン

- Location: `app/page.tsx:905-964`
- Category: Anti-Pattern
- 10カード全てが同一テンプレート
- LPの「機能一覧」は構造的に均一になりやすいが、impeccable 的にはカードは「怠惰な答え」扱い
- Fix の方向性:
  - Phase 1 / 2 / 3 でグループ化して見出しを挟む（既存のバッジ色を活用）
  - 主力3〜4機能を大きめカードで提示、残りはリスト+リンクに格下げ
  - 「組み合わせ例」を最初に提示して、個別機能は補足扱いに

### [P3] `text-[#4B5563]` の散在

- Location: `app/page.tsx:901, 941`
- Category: Theming
- `muted-foreground` (#6B7280) が用意済みなのに、別の灰色を直書きしている
- Fix 案: `text-muted-foreground` または `text-foreground/70`

### [P3] セクション説明テキストの情報密度

- Location: `app/page.tsx:901-903`
- Category: Anti-Pattern（Copy）
- 「全機能を導入する必要はありません。ビジネスの優先度に合わせて必要なものだけを選び、フェーズを追って拡張できます。」が見出しとほぼ同義
- Fix 案: 削除、または見出しが言っていないこと（例: 段階導入が前提）を補足する

## Positive Findings（うまくいっている点）

- focus-visible リング（`#05A847`）+ `outline-none` の組み合わせで、クリック時のノイズ枠を消しつつキーボードアクセシビリティを維持できている
- `group-hover:border-line-green` で hover フィードバックを border に統一、影に頼らない造形は impeccable 的に正解
- `Card` の variant/padding/rounded プロップ設計が共有プリミティブとして再利用されている
- グリッド `sm:grid-cols-2 lg:grid-cols-3` のブレイクポイントがシンプル

## Recommended Actions（impeccable コマンドへの誘導）

1. [P1] `/impeccable polish` — 緑テキストのコントラスト（「詳細を見る」「価格」）を AA 準拠に
2. [P2] `/impeccable shape` — 10連カードを Phase 別グループ or 主力+補足の階層に再設計
3. [P2] `/impeccable typeset` — バッジ色のトークン化、`muted-foreground` 統一
4. [P3] `/impeccable clarify` — セクション説明文の重複削除
5. [P2] `/impeccable optimize` — `<Image fill sizes="44px" />`
6. [最終] `/impeccable polish` — 仕上げ

## 観察メモ（ブログ用）

- セクション単位の audit はトップページ全体（1302行）に対して走らせた前回より、指摘がフォーカスされて読みやすい
- 「identical card grid」は LP の機能一覧という構造上避けにくい anti-pattern
  - impeccable の指摘どおり直すと、機能一覧の網羅性（10機能を一覧で見せる目的）を損なう可能性がある
  - 前回の audit でも「指摘どおり直すと LP として機能しなくなる」ケースを観察したが、今回も同じ構造の指摘
- 一方、コントラストの指摘は機械的に修正可能で、AA 準拠を満たすメリットが明確
- audit を全体に当てるか、セクション単位で当てるかで、得られる気づきの粒度が変わる
