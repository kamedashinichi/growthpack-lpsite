'use client';

/**
 * ドラッグストア業界向けホワイトペーパーダウンロードボタン。
 * WP未整備のため初期リリースは「準備中」表示。
 * PDF が用意できたら PDF_PATH を差し替えて disabled を外すだけで有効化できる。
 */
export function WPDownloadButton() {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#9CA3AF] text-white font-bold text-sm sm:text-base rounded-md cursor-not-allowed opacity-70"
    >
      調査レポート 準備中
    </button>
  );
}
