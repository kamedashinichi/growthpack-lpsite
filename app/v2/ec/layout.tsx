import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'EC・D2C向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
  description:
    'LINE ID連携で友だちとEC会員を統合。カゴ落ちレスキュー・再入荷通知・ソーシャルギフトでリピートと新規獲得を最大化。最短3ヶ月〜で立ち上げます。',
  keywords: [
    'EC LINEミニアプリ',
    'D2C LINE',
    'カゴ落ち 対策',
    'LINE ID連携',
    'ソーシャルギフト',
    'EC リピート',
    'ハーフスクラッチ',
    'LINEミニアプリ 開発',
    'グロースパック for LINE',
    'クラスメソッド',
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
    canonical: 'https://lp.growthpackforline.classmethod.net/v2/ec',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      'EC・D2C向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
    description:
      'LINE ID連携で友だちとEC会員を統合。カゴ落ちレスキュー・再入荷通知・ソーシャルギフトでリピートと新規獲得を最大化。最短3ヶ月〜で立ち上げます。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ec-hero.png',
        width: 1376,
        height: 768,
        alt: 'EC・D2C向けLINEミニアプリ開発サービス グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'EC・D2C向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
    description:
      'LINE ID連携で友だちとEC会員を統合。カゴ落ちレスキュー・再入荷通知・ソーシャルギフトでリピートと新規獲得を最大化。最短3ヶ月〜で立ち上げます。',
    images: ['/images/ec-hero.png'],
  },
};

export default function EcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
