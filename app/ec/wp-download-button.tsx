'use client';

/**
 * EC版ホワイトペーパーは未整備のため「準備中」表示。
 * public/downloads/whitepaper-ec-*.pdf を配置すれば即稼働する。
 */
export function WPDownloadButton() {
  return (
    <button
      disabled
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#9CA3AF] text-white font-bold text-sm sm:text-base rounded-md cursor-not-allowed opacity-60"
    >
      ダウンロード準備中
    </button>
  );
}
