'use client';

/**
 * SM・HC版ホワイトペーパーは未整備のため、準備中表示で disabled 運用。
 * PDF が整備され次第 href と disabled を更新する。
 */
export function WPDownloadButton() {
  return (
    <button
      disabled
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#9CA3AF] text-white font-bold text-sm sm:text-base rounded-md cursor-not-allowed opacity-70"
      aria-label="スーパー・ホームセンター向けレポートは準備中です"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      資料は準備中です（近日公開予定）
    </button>
  );
}
