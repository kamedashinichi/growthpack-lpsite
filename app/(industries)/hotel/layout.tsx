import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'ホテル・旅館向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
  description:
    'OTA手数料削減・直予約率向上を軸に、宿泊施設の顧客接点をLINEで統合。会員証・セグメント配信・館内クーポンを最短3ヶ月で立ち上げます。',
  keywords: [
    'ホテル LINEミニアプリ',
    '旅館 LINEミニアプリ',
    'ホテル OTA手数料削減',
    '宿泊施設 直予約',
    'ホテル DX',
    '旅館 DX',
    'ホテル 会員証',
    'ホテル セグメント配信',
    'ハーフスクラッチ',
    'LINEミニアプリ 開発',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/hotel',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      'ホテル・旅館向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
    description:
      'OTA手数料削減・直予約率向上を軸に、宿泊施設の顧客接点をLINEで統合。会員証・セグメント配信・館内クーポンを最短3ヶ月で立ち上げます。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/hotel-hero.png',
        width: 1376,
        height: 768,
        alt: 'ホテル・旅館向けLINEミニアプリ開発サービス グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'ホテル・旅館向けLINEミニアプリ開発サービス｜ハーフスクラッチで作る グロースパック for LINE',
    description:
      'OTA手数料削減・直予約率向上を軸に、宿泊施設の顧客接点をLINEで統合。会員証・セグメント配信・館内クーポンを最短3ヶ月で立ち上げます。',
    images: ['/images/hotel-hero.png'],
  },
};

export default function HotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
