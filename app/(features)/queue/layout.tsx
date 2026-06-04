import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '順番待ち｜並ばなくていい。LINE通知が、ちょうどのタイミングで呼んでくれる｜グロースパック for LINE',
  description:
    'LINE整理券で物理行列を解消。待ち人数・推定待ち時間のリアルタイム表示と順番接近通知で、お客様の時間を奪わない待ち体験を実現します。',
  keywords: [
    '順番待ち LINE',
    'LINE 整理券',
    'デジタル整理券',
    '行列解消',
    '順番待ち システム',
    '待ち時間 通知',
    'LINEミニアプリ 順番待ち',
    '飲食店 順番待ち',
    'クリニック 順番待ち',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/queue',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      '順番待ち｜並ばなくていい。LINE通知が、ちょうどのタイミングで呼んでくれる｜グロースパック for LINE',
    description:
      'LINE整理券で物理行列を解消。リアルタイム待ち状況表示と順番接近通知で、お客様の時間を奪わない待ち体験を実現します。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '順番待ち｜並ばなくていい。LINE通知が、ちょうどのタイミングで呼んでくれる｜グロースパック for LINE',
    description:
      'LINE整理券で物理行列を解消。リアルタイム待ち状況表示と順番接近通知で、お客様の時間を奪わない待ち体験を実現します。',
  },
};

export default function QueueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
