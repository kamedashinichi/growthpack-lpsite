'use client';

import { track } from '@vercel/analytics';
import { trackGA4 } from '@/lib/ga4';

type Destination = 'contact' | 'download' | 'demo';

interface TrackedExternalLinkProps {
  href: string;
  location: string;
  destination: Destination;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

/**
 * GA4 + Vercel Analytics の cta_click イベントを送信する外部リンクラッパー。
 * 機能ページ共通。
 */
export function TrackedExternalLink({
  href,
  location,
  destination,
  children,
  className,
  target = '_blank',
  rel = 'noopener noreferrer',
}: TrackedExternalLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => {
        track('cta_click', { location, destination });
        trackGA4('cta_click', { location, destination });
      }}
    >
      {children}
    </a>
  );
}
