import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'グロースパック for LINE｜ハーフスクラッチで作るLINEミニアプリ開発サービス',
  description:
    'SaaSの速さとフルスクラッチの柔軟性を両立する「ハーフスクラッチ開発」のLINEミニアプリ。会員証・予約・クーポンなど10機能から選び、最短3ヶ月で立ち上げます。クラスメソッド提供。',
  keywords: [
    'LINEミニアプリ',
    'LINEミニアプリ 開発',
    'ハーフスクラッチ',
    'LINE 会員証',
    'LINE OMO',
    'LINE リテール',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  // /v2 はプロトタイプ段階のため検索エンジンにインデックスさせない。
  // 本番置換（/ に昇格）時に robots の noindex/nofollow を外す。
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
      'グロースパック for LINE｜ハーフスクラッチで作るLINEミニアプリ開発サービス',
    description:
      'SaaSの速さとフルスクラッチの柔軟性を両立。会員証・予約・クーポンなど10機能から選び、最短3ヶ月で立ち上げます。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'グロースパック for LINE｜ハーフスクラッチで作るLINEミニアプリ開発サービス',
    description:
      'SaaSの速さとフルスクラッチの柔軟性を両立。会員証・予約・クーポンなど10機能から選び、最短3ヶ月で立ち上げます。',
  },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
