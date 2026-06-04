'use client';

import { track } from '@vercel/analytics';
import { trackGA4 } from '@/lib/ga4';

type Destination = 'contact' | 'download';

interface TrackedExternalLinkProps {
  href: string;
  location: string;
  destination: Destination;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  /** 一部業種で cta_click payload に付与する page 識別子（例: 'v2_supermarket'） */
  page?: string;
}

/**
 * GA4 + Vercel Analytics の cta_click イベントを送信する外部リンクラッパー。
 * <Button asChild> の子要素として使用することで既存の見た目を保ったまま計測できる。
 */
export function TrackedExternalLink({
  href,
  location,
  destination,
  children,
  className,
  target = '_blank',
  rel = 'noopener noreferrer',
  page,
}: TrackedExternalLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => {
        const payload: Record<string, string> = { location, destination };
        if (page) payload.page = page;
        track('cta_click', payload);
        trackGA4('cta_click', payload);
      }}
    >
      {children}
    </a>
  );
}
