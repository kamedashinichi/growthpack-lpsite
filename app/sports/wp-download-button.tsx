'use client';

import { Download } from 'lucide-react';

/**
 * スポーツ・エンタメ版ホワイトペーパーは現在準備中。
 * ボタンを disabled 状態で表示し、構造は維持する。
 */
export function WPDownloadButton() {
  return (
    <button
      disabled
      aria-disabled="true"
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#9CA3AF] text-white font-bold text-sm sm:text-base rounded-md cursor-not-allowed opacity-70"
    >
      <Download size={18} strokeWidth={2.5} />
      資料準備中（近日公開）
    </button>
  );
}
