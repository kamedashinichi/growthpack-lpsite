'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { trackGA4 } from '@/lib/ga4';

const SECTIONS = [
  'problems',
  'appeal',
  'features',
  'phases',
  'wp-download',
  'faq',
  'contact',
] as const;

/**
 * IntersectionObserver で各セクションへの到達を検知し、
 * section_view イベントを GA4 + Vercel Analytics に送信する。
 * 各セクションへのイベントは初回到達時のみ発火する。
 */
export function ScrollTracker() {
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

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
