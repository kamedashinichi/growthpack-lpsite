import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'ドラッグストア・薬局向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
  description:
    'ポイントカード離脱・調剤待ち時間・セグメント配信未整備の3課題を、LINEミニアプリで一本化。ドラッグストア・薬局のデジタル会員化を、最短3ヶ月で。',
  keywords: [
    'LINEミニアプリ',
    'ドラッグストア',
    '薬局',
    '調剤',
    '会員証',
    'セグメント配信',
    'ハーフスクラッチ',
    'グロースパック for LINE',
    'LINEミニアプリ 開発',
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
    canonical: 'https://lp.growthpackforline.classmethod.net/v2/drugstore',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      'ドラッグストア・薬局向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
    description:
      'ポイントカード離脱・調剤待ち時間・セグメント配信未整備の3課題を、LINEミニアプリで一本化。ドラッグストア・薬局のデジタル会員化を、最短3ヶ月で。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/drugstore-hero.png',
        width: 1376,
        height: 768,
        alt: 'ドラッグストア・薬局向けLINEミニアプリ開発サービス グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'ドラッグストア・薬局向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
    description:
      'ポイントカード離脱・調剤待ち時間・セグメント配信未整備の3課題を、LINEミニアプリで一本化。ドラッグストア・薬局のデジタル会員化を、最短3ヶ月で。',
    images: ['/images/drugstore-hero.png'],
  },
};

export default function DrugstoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
