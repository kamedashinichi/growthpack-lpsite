import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '予約｜電話と紙をやめたら、予約が顧客データ蓄積の起点になる｜グロースパック for LINE',
  description:
    'LINEで予約受付・リマインド・来店管理・事後配信を一気通貫で実現。24時間受付と自動リマインドで取りこぼしをなくします。',
  keywords: [
    '予約 LINE',
    'LINE 予約 システム',
    '予約 リマインド 自動',
    'LINE予約 飲食',
    'LINE予約 カーディーラー',
    '予約 電話 廃止',
    'LINEミニアプリ 予約',
    '予約 キャンセル セルフ',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/reservation',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title: '予約｜電話と紙をやめたら、予約が顧客データ蓄積の起点になる｜グロースパック for LINE',
    description: 'LINEで予約受付・リマインド・来店管理・事後配信を一気通貫で実現。24時間受付と自動リマインドで取りこぼしをなくします。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title: '予約｜電話と紙をやめたら、予約が顧客データ蓄積の起点になる｜グロースパック for LINE',
    description: 'LINEで予約受付・リマインド・来店管理・事後配信を一気通貫で実現。24時間受付と自動リマインドで取りこぼしをなくします。',
  },
};

export default function ReservationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
