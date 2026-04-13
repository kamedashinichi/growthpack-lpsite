'use client';

import { Download } from 'lucide-react';
import { track } from '@vercel/analytics';
import { trackGA4 } from '@/lib/ga4';

const PDF_PATH = '/downloads/whitepaper-apparel-2026.pdf';
const DOC_ID = 'apparel-2026';

export function WPDownloadButton() {
  return (
    <a
      href={PDF_PATH}
      download
      onClick={() => {
        track('wp_download', { location: 'v2_apparel_lp', document: DOC_ID });
        trackGA4('wp_download', { location: 'v2_apparel_lp', document: DOC_ID });
      }}
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#05A847] hover:bg-[#048838] text-white font-bold text-sm sm:text-base rounded-md shadow-[0_2px_8px_rgba(6,199,85,0.25)] hover:shadow-[0_4px_12px_rgba(6,199,85,0.35)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06C755] focus-visible:ring-offset-2"
    >
      <Download size={18} strokeWidth={2.5} />
      無料レポートをダウンロード（PDF）
    </a>
  );
}
