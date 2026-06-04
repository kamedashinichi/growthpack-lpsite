import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'クーポン配信｜紙クーポンを廃止し、適切な人に適切なタイミングで届ける仕組みへ｜グロースパック for LINE',
  description:
    'トリガー連動の自動配布で、ゴール達成・離脱防止・イベント参加賞クーポンを自動化。利用率と効果をリアルタイムで可視化します。',
  keywords: [
    'クーポン配信 LINE',
    'LINE クーポン',
    'デジタルクーポン',
    'クーポン 自動配布',
    '離脱防止 クーポン',
    '紙クーポン デジタル化',
    'クーポン 効果測定',
    'LINEミニアプリ クーポン',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/coupon',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title: 'クーポン配信｜紙クーポンを廃止し、適切な人に適切なタイミングで届ける仕組みへ｜グロースパック for LINE',
    description: 'トリガー連動の自動配布で、ゴール達成・離脱防止・イベント参加賞クーポンを自動化。利用率と効果をリアルタイムで可視化します。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'クーポン配信｜紙クーポンを廃止し、適切な人に適切なタイミングで届ける仕組みへ｜グロースパック for LINE',
    description: 'トリガー連動の自動配布で、ゴール達成・離脱防止・イベント参加賞クーポンを自動化。利用率と効果をリアルタイムで可視化します。',
  },
};

export default function CouponLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
