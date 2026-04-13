'use client';

/**
 * 飲食業界LP (/food) 用 WP ダウンロードボタン。
 * 飲食版ホワイトペーパーは現在準備中のため、disabled 状態で表示する。
 * PDF 配置後は disabled を外し、href と DOC_ID を設定する。
 */
export function WPDownloadButton() {
  return (
    <button
      type="button"
      disabled
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#9CA3AF] text-white font-bold text-sm sm:text-base rounded-md cursor-not-allowed opacity-70"
      aria-label="飲食業界向け調査レポートは準備中です"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      調査レポート 準備中
    </button>
  );
}
