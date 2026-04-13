'use client';

/**
 * ホテル・旅館業界向けホワイトペーパーDLボタン。
 * ホワイトペーパーが未整備のため、現在は「準備中」表示で disabled。
 * WP完成後に href・onClick を有効化する。
 */
export function WPDownloadButton() {
  return (
    <button
      disabled
      aria-disabled="true"
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#9CA3AF] text-white font-bold text-sm sm:text-base rounded-md cursor-not-allowed opacity-60"
    >
      準備中
    </button>
  );
}
