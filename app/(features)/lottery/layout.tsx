import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '抽選｜当たっても外れても、次の来店につながる体験を自動化する｜グロースパック for LINE',
  description:
    'LINE上で抽選から当選通知・クーポン配布・会員データ蓄積まで一気通貫。ハズレ参加賞で全員に来店動機を残します。',
  keywords: [
    '抽選 LINE',
    'LINE 抽選',
    'デジタル抽選',
    'ガラポン デジタル',
    'イベント 抽選 LINE',
    'キャンペーン 抽選',
    'LINEミニアプリ 抽選',
    '当選通知 自動',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/lottery',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title: '抽選｜当たっても外れても、次の来店につながる体験を自動化する｜グロースパック for LINE',
    description: 'LINE上で抽選から当選通知・クーポン配布・会員データ蓄積まで一気通貫。ハズレ参加賞で全員に来店動機を残します。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title: '抽選｜当たっても外れても、次の来店につながる体験を自動化する｜グロースパック for LINE',
    description: 'LINE上で抽選から当選通知・クーポン配布・会員データ蓄積まで一気通貫。ハズレ参加賞で全員に来店動機を残します。',
  },
};

export default function LotteryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
