'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { trackGA4 } from '@/lib/ga4';

/** 機能ページ共通のセクションID */
const SECTIONS = [
  'features',
  'combinations',
  'steps',
  'contact',
] as const;

/**
 * IntersectionObserver で各セクションへの到達を検知し、
 * section_view イベントを GA4 + Vercel Analytics に送信する。
 * 機能ページ共通。各セクションへのイベントは初回到達時のみ発火。
 */
export function FeatureScrollTracker({ page }: { page: string }) {
  useEffect(() => {
    const fired = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && id && !fired.has(id)) {
            fired.add(id);
            track('section_view', { section: id, page });
            trackGA4('section_view', { section: id, page });
          }
        }
      },
      { threshold: 0.3 }
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [page]);

  return null;
}
