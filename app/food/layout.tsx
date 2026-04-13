import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '飲食チェーン向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
  description:
    '行列×リピート×テイクアウトの3軸で、飲食チェーンの顧客接点を最短3ヶ月で立ち上げます。順番待ち・スタンプカード・マルチブランド統合に対応するハーフスクラッチ開発。',
  keywords: [
    'LINEミニアプリ',
    '飲食',
    '飲食チェーン',
    '順番待ち',
    'モバイルオーダー',
    'ハーフスクラッチ',
    'グロースパック for LINE',
    '飲食 デジタル会員証',
    '飲食 LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/food',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      '飲食チェーン向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
    description:
      '行列×リピート×テイクアウトの3軸で、飲食チェーンの顧客接点を最短3ヶ月で立ち上げます。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/food-hero.png',
        width: 1376,
        height: 768,
        alt: '飲食業界向けLINEミニアプリ開発サービス グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '飲食チェーン向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
    description:
      '行列×リピート×テイクアウトの3軸で、飲食チェーンの顧客接点を最短3ヶ月で立ち上げます。',
    images: ['/images/food-hero.png'],
  },
};

export default function FoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
