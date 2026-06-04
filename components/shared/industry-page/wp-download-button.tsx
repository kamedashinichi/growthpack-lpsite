'use client';

import { Download } from 'lucide-react';
import { track } from '@vercel/analytics';
import { trackGA4 } from '@/lib/ga4';
import { getUTMParams } from '@/lib/utm';

interface WPDownloadButtonProps {
  /** 業種スラッグ。PDFパス・ドキュメントID・計測 location を導出する（例: 'apparel'） */
  industry: string;
  /** PDF 未公開時は「近日公開」の無効ボタンを表示する */
  available?: boolean;
}

export function WPDownloadButton({ industry, available = true }: WPDownloadButtonProps) {
  if (!available) {
    return (
      <button
        disabled
        aria-disabled="true"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#9CA3AF] text-white font-bold text-sm sm:text-base rounded-md cursor-not-allowed opacity-60"
      >
        <Download size={18} strokeWidth={2.5} />
        無料レポート 近日公開
      </button>
    );
  }

  const pdfPath = `/downloads/whitepaper-${industry}-2026.pdf`;
  const docId = `${industry}-2026`;

  return (
    <a
      href={pdfPath}
      download
      onClick={() => {
        const payload = { location: `v2_${industry}_lp`, document: docId, ...getUTMParams() };
        track('wp_download', payload);
        trackGA4('wp_download', payload);
      }}
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#05A847] hover:bg-[#048838] text-white font-bold text-sm sm:text-base rounded-md shadow-[0_2px_8px_rgba(6,199,85,0.25)] hover:shadow-[0_4px_12px_rgba(6,199,85,0.35)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06C755] focus-visible:ring-offset-2"
    >
      <Download size={18} strokeWidth={2.5} />
      無料レポートをダウンロード（PDF）
    </a>
  );
}
