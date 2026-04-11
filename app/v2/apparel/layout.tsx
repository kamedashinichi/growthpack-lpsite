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
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      'アパレル業界のLINEミニアプリ開発｜ハーフスクラッチで作る会員証・OMO｜グロースパック for LINE',
    description:
      'マルチブランド対応の統合会員証・店頭商品シェア・自動フォローをLINEミニアプリで実現。最短3ヶ月で立ち上げます。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'アパレル業界のLINEミニアプリ開発｜ハーフスクラッチで作る会員証・OMO｜グロースパック for LINE',
    description:
      'マルチブランド対応の統合会員証・店頭商品シェア・自動フォローをLINEミニアプリで実現。最短3ヶ月で立ち上げます。',
  },
};

export default function ApparelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
