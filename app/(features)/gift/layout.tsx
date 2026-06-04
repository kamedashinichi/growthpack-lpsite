import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'ギフト｜住所を知らなくても、相手に「選ぶ楽しさ」ごと贈れる｜グロースパック for LINE',
  description:
    'URLを共有するだけで贈れるソーシャルギフト。受取人がサイズ・カラーを自分で選択。ギフト受取と同時に新規会員化する導線を構築します。',
  keywords: [
    'ギフト LINE',
    'ソーシャルギフト LINE',
    'LINE ギフト',
    'デジタルギフト',
    'URL ギフト',
    '住所不要 ギフト',
    'ギフト 会員獲得',
    'LINEミニアプリ ギフト',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/gift',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title: 'ギフト｜住所を知らなくても、相手に「選ぶ楽しさ」ごと贈れる｜グロースパック for LINE',
    description: 'URLを共有するだけで贈れるソーシャルギフト。受取人がサイズ・カラーを自分で選択。ギフト受取と同時に新規会員化する導線を構築します。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ギフト｜住所を知らなくても、相手に「選ぶ楽しさ」ごと贈れる｜グロースパック for LINE',
    description: 'URLを共有するだけで贈れるソーシャルギフト。受取人がサイズ・カラーを自分で選択。ギフト受取と同時に新規会員化する導線を構築します。',
  },
};

export default function GiftLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
