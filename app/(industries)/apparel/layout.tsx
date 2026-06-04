import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'アパレル業界のLINEミニアプリ開発｜ハーフスクラッチで作る会員証・OMO｜グロースパック for LINE',
  description:
    'マルチブランド対応の統合会員証・店頭商品シェア・自動フォローをLINEミニアプリで実現。アパレル業界の会員証DX・OMO課題を最短3ヶ月で解決します。',
  keywords: [
    'アパレル LINEミニアプリ',
    'アパレル OMO',
    'アパレル 会員証',
    'アパレル DX',
    'LINE アパレル',
    'アパレル デジタル会員証',
    'マルチブランド 会員証',
    'ハーフスクラッチ',
    'LINEミニアプリ 開発',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/apparel',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      'アパレル業界のLINEミニアプリ開発｜ハーフスクラッチで作る会員証・OMO｜グロースパック for LINE',
    description:
      'マルチブランド対応の統合会員証・店頭商品シェア・自動フォローをLINEミニアプリで実現。最短3ヶ月で立ち上げます。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/apparel-hero.png',
        width: 1376,
        height: 768,
        alt: 'アパレル業界向けLINEミニアプリ開発サービス グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'アパレル業界のLINEミニアプリ開発｜ハーフスクラッチで作る会員証・OMO｜グロースパック for LINE',
    description:
      'マルチブランド対応の統合会員証・店頭商品シェア・自動フォローをLINEミニアプリで実現。最短3ヶ月で立ち上げます。',
    images: ['/images/apparel-hero.png'],
  },
};

export default function ApparelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
