import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'スーパー・ホームセンター向けLINEミニアプリ開発サービス｜既存会員活性化と紙チラシ削減を実現 グロースパック for LINE',
  description:
    '既にある会員基盤を活性化する。紙チラシコストをLINE配信に置き換える。スーパー・ホームセンターの顧客接点課題を最短3ヶ月で解決します。',
  keywords: [
    'LINEミニアプリ',
    'スーパー',
    'ホームセンター',
    'デジタル会員証',
    'チラシDX',
    'シニア',
    'ハーフスクラッチ',
    'グロースパック for LINE',
    'スーパー LINEミニアプリ',
    'ホームセンター LINEミニアプリ',
    '会員証活性化',
    '折込チラシ削減',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/supermarket',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      'スーパー・ホームセンター向けLINEミニアプリ開発サービス｜既存会員活性化と紙チラシ削減を実現 グロースパック for LINE',
    description:
      '既にある会員基盤を活性化する。紙チラシコストをLINE配信に置き換える。最短3ヶ月で立ち上げます。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/supermarket-hero.png',
        width: 1376,
        height: 768,
        alt: 'スーパー・ホームセンター向けLINEミニアプリ開発サービス グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'スーパー・ホームセンター向けLINEミニアプリ開発サービス｜既存会員活性化と紙チラシ削減を実現 グロースパック for LINE',
    description:
      '既にある会員基盤を活性化する。紙チラシコストをLINE配信に置き換える。最短3ヶ月で立ち上げます。',
    images: ['/images/supermarket-hero.png'],
  },
};

export default function SupermarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
