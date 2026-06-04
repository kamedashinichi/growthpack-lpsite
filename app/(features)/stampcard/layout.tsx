import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'スタンプカード｜離脱しそうなお客様に、ちょうどいいタイミングで「また来る理由」を届ける｜グロースパック for LINE',
  description:
    'デジタルスタンプで来店回数を可視化。ゴール接近通知・離脱予兆検知・クーポン自動配布で、リピート率を仕組みで高めます。',
  keywords: [
    'スタンプカード LINE',
    'LINE スタンプカード',
    'デジタルスタンプカード',
    'リピート 来店 仕組み',
    '離脱防止 LINE',
    'LINE ショップカード 移行',
    'スタンプ ランク',
    'LINEミニアプリ スタンプ',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/stampcard',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title: 'スタンプカード｜離脱しそうなお客様に、ちょうどいいタイミングで「また来る理由」を届ける｜グロースパック for LINE',
    description: 'デジタルスタンプで来店回数を可視化。ゴール接近通知・離脱予兆検知・クーポン自動配布でリピート率を仕組みで高めます。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'スタンプカード｜離脱しそうなお客様に、ちょうどいいタイミングで「また来る理由」を届ける｜グロースパック for LINE',
    description: 'デジタルスタンプで来店回数を可視化。ゴール接近通知・離脱予兆検知・クーポン自動配布でリピート率を仕組みで高めます。',
  },
};

export default function StampCardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
