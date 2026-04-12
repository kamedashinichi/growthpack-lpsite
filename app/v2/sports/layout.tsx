import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'スポーツ・エンタメ向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
  description:
    'コアファンは整備済み、ライト層はゼロ。年1-2回来場のファンを育てる接点インフラを、最短3ヶ月でLINEに統合します。',
  keywords: [
    'LINEミニアプリ',
    'スポーツ',
    'エンタメ',
    'Jリーグ',
    'プロ野球',
    'フィットネス',
    'チケット',
    '抽選',
    'ファンクラブ',
    '幽霊会員',
    'ハーフスクラッチ',
    'グロースパック for LINE',
  ],
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/v2/sports',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      'スポーツ・エンタメ向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
    description:
      'コアファンは整備済み、ライト層はゼロ。年1-2回来場のファンを育てる接点インフラを、最短3ヶ月でLINEに統合します。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/sports-hero.png',
        width: 1376,
        height: 768,
        alt: 'スポーツ・エンタメ業界向けLINEミニアプリ開発サービス グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'スポーツ・エンタメ向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
    description:
      'コアファンは整備済み、ライト層はゼロ。年1-2回来場のファンを育てる接点インフラを、最短3ヶ月でLINEに統合します。',
    images: ['/images/sports-hero.png'],
  },
};

export default function SportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
