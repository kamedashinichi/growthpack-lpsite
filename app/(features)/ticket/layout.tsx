import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'チケット・パス｜並ばなくていい、偽造されない、そして終わった後もつながれる｜グロースパック for LINE',
  description:
    'デジタルチケット発行と同時に会員ID取得。QR入場チェック・転売防止・時間枠管理で、紙整理券を完全に置き換えます。',
  keywords: [
    'チケット LINE',
    'LINE チケット',
    'デジタルチケット',
    '電子チケット',
    '整理券 デジタル',
    'イベント 入場管理',
    '転売防止 チケット',
    'LINEミニアプリ チケット',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/ticket',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title: 'チケット・パス｜並ばなくていい、偽造されない、そして終わった後もつながれる｜グロースパック for LINE',
    description: 'デジタルチケット発行と同時に会員ID取得。QR入場チェック・転売防止・時間枠管理で、紙整理券を完全に置き換えます。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'チケット・パス｜並ばなくていい、偽造されない、そして終わった後もつながれる｜グロースパック for LINE',
    description: 'デジタルチケット発行と同時に会員ID取得。QR入場チェック・転売防止・時間枠管理で、紙整理券を完全に置き換えます。',
  },
};

export default function TicketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
