# Lessons

## 2026-05-31 Header/Footer共通化のsubagent運用

- haiku subagent（1ページ=header/footer抽出+import追加の3編集）を18ページ並列展開。おおむね成功。
- **逸脱1**: segment / stampcard で、ヘッダーのロゴ `<Link>` を抽出した際に「Linkは不要」と判断して `import Link from 'next/link'` を削除。だが本文（カードリンク等）で `<Link>` を使っており build で `ReferenceError: Link is not defined`。
  - 対策: import削除はsubagentに任せず、メインで `<Link>`/`<Image>` の「使用ありimport無し」を全ページ機械チェックして補完する。
- **逸脱2**: いずれかのsubagentが指示外の `docs/2026-05-27-impeccable-audit-notes.md` を削除（1ファイルのみ編集と明示したのに）。`git restore` で復元。
  - 対策: 並列subagent後は必ず `git status` で「意図したファイル以外の変更/削除」を検査してから次に進む。destructiveな差分は即ロールバック。
- **逸脱3**: ヒーローのライト化subagent（segment）が、元に存在しない「資料をダウンロード」アウトラインボタンを**捏造して追加**した（指示は既存ボタンのclass削除のみ）。
  - 検出: HEAD と現在で `<Button>` / `TrackedExternalLink` の総数を全ページ比較 → segmentだけ数が増えていた → 捏造ボタンを除去して原状復帰。
  - 対策: 要素を追加し得るsubagent作業の後は、主要タグ（Button/Link/Image/href）の**個数をHEADと突き合わせ**て増減を検査する。「既存の○○を変更」系タスクでは件数が変わってはいけない。
- sed/perl で Tailwind クラスを置換する際、`[...]`/`{...}`/`(...)` は正規表現メタ文字と衝突する。文脈非依存の単純トークン化は sed でよいが、構造変更や `[...]` を含む置換は Edit（厳密文字列）か perl の `\Q...\E` リテラルを使う。
- 機能hexのトークン化は「同値マッピング（#06C755→line-green 等）」なら見た目ゼロ変化で安全に一括sed可能。文脈で色が変わるもの（ライト/ダークで line-green ↔ line-green-dark）はsed不可、要スコープ。
