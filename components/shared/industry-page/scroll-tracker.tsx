'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { trackGA4 } from '@/lib/ga4';

const DEFAULT_SECTIONS = ['problems', 'appeal', 'features', 'faq', 'contact'] as const;

/**
 * IntersectionObserver で各セクションへの到達を検知し、
 * section_view イベントを GA4 + Vercel Analytics に送信する。
 * 各セクションへのイベントは初回到達時のみ発火する。
 * 業種ごとに監視するセクションが異なる場合は sections で上書きする。
 */
export function ScrollTracker({
  sections = DEFAULT_SECTIONS,
}: {
  sections?: readonly string[];
}) {
  useEffect(() => {
    const fired = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && id && !fired.has(id)) {
            fired.add(id);
            track('section_view', { section: id });
            trackGA4('section_view', { section: id });
          }
        }
      },
      { threshold: 0.3 }
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
    // sections は各ページで固定のため初回マウント時のみ監視を張る
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
