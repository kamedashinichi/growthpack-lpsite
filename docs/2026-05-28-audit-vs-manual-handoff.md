# 亀田さんへ: impeccable audit と人間判断の対比まとめ

作成日: 2026-05-28
対象 PR: [feat/lp-top-audit-20260528](https://github.com/kamedashinichi/growthpack-lpsite/compare/main...feat/lp-top-audit-20260528)
作成者: 鈴木ふみ子
目的: スキル化検討用の素材

LP トップ（`app/page.tsx`）に `/impeccable audit` をかけた結果と、その後に鈴木が手作業で出した指示を並べたもの。
audit が拾える範囲と拾えない範囲を分けたかった。

## まとめ表

| カテゴリ                         | impeccable audit | 人間判断 |
| -------------------------------- | :--------------: | :------: |
| コントラスト比（WCAG）           |        ◯         |          |
| 画像配信サイズ（sizes 属性）     |        ◯         |          |
| デザイントークン整合性           |        ◯         |          |
| Identical card grid 検出         |        ◯         |          |
| ブランド整合（親会社の色との一致）|                  |    ◯     |
| AI 臭の排除（ドット→アイコン）   |                  |    ◯     |
| 視覚バランス（情報の左上配置）   |                  |    ◯     |
| LP 慣習との折り合い（カード均一）|                  |    ◯     |
| 文脈に応じた色トーン選択         |                  |    ◯     |
| マウス vs キーボードの focus 差   |                  |    ◯     |

## impeccable audit が拾ってくれたこと

数値で測れる、または明確なルールに照らして判定できる項目。

### 1. コントラスト比

- 「詳細を見る →」: `text-line-green` (#06C755) on white = 2.4:1（AA 不合格 4.5:1 未満）
- 「初期費用 ¥XX万」: `text-line-green-dark` (#05A847) on white = 3.3:1（AA 不合格）
- どちらも `text-sm` で大文字例外（3:1）も適用外

### 2. 画像配信サイズ

- 機能アイコンの `<Image fill />` に `sizes` 未指定
- 表示は 44x44px なのに、デフォルト 100vw 想定で配信される

### 3. デザイントークン整合性

- `text-[#4B5563]` の散在（`muted-foreground` を迂回）
- バッジ色が hex 直書き（`bg-[#FEF3C7] text-[#B45309]` など）

### 4. アンチパターン検出

- Identical card grid（同一テンプレ10連発）を「絶対バン」項目として検出
- shared design laws に明記されている形にそのまま該当

### 5. セクション説明の重複

- 見出しと同じ意味のことを説明文で繰り返している

## impeccable audit では拾えなかったこと（鈴木の手作業）

audit が指摘しなかったが、デザイン上明らかに直すべきと判断した項目。

### 1. ステップラベルの位置とサイズ

- before: アイコン+見出しの「下」に小さく配置
- after: 「左上」（カードの一番上）に配置、フォントサイズを2段階アップ
- 理由: 顧客接点の創出 / エンゲージメント強化 / 関係性の深化 のフェーズ分けを最優先で伝えたい

### 2. リンク色の親会社統一

- audit は「緑のコントラストが弱い」までは指摘するが、「では何色にすべきか」までは指示しない
- 鈴木判断: classmethod.jp のリンク色 `#2D8DE0` を取り込んで使う
- globals.css に `--link` / `--link-hover` トークンを新設

### 3. AI 臭の排除（バッジの形）

- before: 「・LINEヤフー Partner Program Technology Partner」（・ドット記号）
- after: Award アイコン + 「LINEヤフー Partner Program Technology Partner認定」
- 理由: ドット記号は AI 生成 LP に頻出するパターンに見えた

### 4. 業種カードの hover フィードバック

- audit はインタラクションの欠如までは指摘しない
- 鈴木判断: 業種カードに緑ボーダー hover + focus-visible リングを統一適用

### 5. クリック時の focus 枠ノイズ除去

- PRODUCT PREVIEW の横スクロール領域をクリックすると不要な focus 枠が出ていた
- 原因: `focus:` でアウトラインが出ていた
- 修正: `focus:` → `focus-visible:` に変更（キーボード操作時のみ表示）

### 6. ステップラベルのコントラスト微調整

- PRODUCT PREVIEW（dark 背景時）の「顧客接点の創出」バッジが透明気味で見えにくかった
- `--color-line-green` → `--color-line-green-light` に切り替えて視認性アップ
- 後でライト背景化したタイミングで `--color-line-green-dark` に再調整

### 7. SaaS 比較カードの shadow 削除

- 「RECOMMENDED」カードに `shadow-lg` がついていたが、視覚的に主張しすぎ
- 鈴木判断: ring（緑枠）だけで十分目立つので shadow は不要

### 8. フッターのキャッチコピー強調

- 「初回相談は無料です。」を太字に
- 営業上の訴求を視覚的に立たせたかった

### 9. トップ背景の親会社統一

- ヒーロー（`#0a0a0a` 黒）と PRODUCT PREVIEW（`#0d0d0d` 黒）→ `#f5f5f5`（classmethod.jp と同じライトグレー）
- 連動して: 白テキスト → foreground、緑テキスト → line-green-dark、装飾の緑グロー削除
- 理由: 親会社サイトと同じトーンで統一したかった

### 10. Identical card grid を「直さない」判断

- audit は「10連カードは絶対バン」と指摘
- 鈴木判断: LP の機能一覧は構造的に均一になるのが慣習。網羅性を犠牲にしてまで構造を崩すと LP としての機能が壊れる
- audit の指摘どおりに直すべきでない場合がある、という観察

## スキル化の観点

亀田さんへ。スキル化するならこんな構造かと。

### 「audit 自動」と「人間判断」を 2 段階で見せる

audit を機械的に走らせる → 数値で測れる問題を粗削り
人間が後から「指摘どおりに直すか / 残すか」を判断 → 意図を入れる

### audit の指摘を「採用 / 不採用」で記録する仕組み

「Identical card grid」のように、指摘どおりだと LP として機能しなくなるケースがある。
不採用の理由をメモとして残せると、次回 audit 時にノイズを減らせる。

### 親会社（classmethod.jp）との整合チェックを別軸で持つ

audit はプロジェクト単独で見るので、「親会社サイトと色を揃える」のような外部基準は拾えない。
別チェックリストとして:

- リンク色は classmethod.jp と同じか
- ベース背景は #f5f5f5 か
- フォントは univia-pro + Noto Sans JP か

### AI 臭の検出チェック（人間の目）

- ・記号でバッジを表現していないか
- グラデーションテキスト
- glassmorphism
- 同一テンプレのカードグリッド
- ヒーローメトリック（大きい数字 + ラベル）の使いすぎ

audit でも一部拾えるが、人間の目で最終確認が必要。

## 関連ファイル

- `docs/2026-05-27-impeccable-audit-notes.md` — トップページ全体の audit ブログ下書き
- `docs/2026-05-28-features-section-audit.md` — features セクション単体監査ログ（13/20 → 18/20）
- `app/page.tsx` — 実装本体
- `app/globals.css` — link カラートークン追加
