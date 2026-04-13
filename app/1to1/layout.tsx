import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '1to1コミュニケーション｜担当が替わっても対話の歴史が残る｜グロースパック for LINE',
  description:
    'スタッフと顧客の1対1チャットをLINE公式アカウント上で実現。対話履歴・顧客タグ・AIサマリで、担当が替わっても接客品質を維持します。',
  keywords: [
    '1to1コミュニケーション',
    'LINE 1対1',
    'LINE チャット 接客',
    'LINE スタッフチャット',
    '顧客対応 LINE',
    'チャットボット LINE',
    'LINE FAQ 自動応答',
    'LINE 時間外対応',
    '担当引き継ぎ LINE',
    'LINEミニアプリ 開発',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/1to1',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      '1to1コミュニケーション｜担当が替わっても対話の歴史が残る｜グロースパック for LINE',
    description:
      'スタッフと顧客の1対1チャットをLINE公式アカウント上で実現。対話履歴・タグ・AIサマリで接客品質を維持します。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '1to1コミュニケーション｜担当が替わっても対話の歴史が残る｜グロースパック for LINE',
    description:
      'スタッフと顧客の1対1チャットをLINE公式アカウント上で実現。対話履歴・タグ・AIサマリで接客品質を維持します。',
  },
};

export default function OneToOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
