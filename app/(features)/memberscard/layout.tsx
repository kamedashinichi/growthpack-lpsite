import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'デジタル会員証｜友だち追加するだけで、お店が自分のことを覚えてくれる｜グロースパック for LINE',
  description:
    'LINE友だち追加で会員ID自動発行。来店履歴・ランク・属性を自動蓄積し、スタンプ・クーポン・配信など全機能のデータ基盤を構築します。',
  keywords: [
    'デジタル会員証',
    'LINE 会員証',
    'LINE 会員カード',
    '会員証 デジタル化',
    'LINE 顧客データ',
    'LINE ランク 自動判定',
    '顧客基盤 構築',
    'LINE 来店履歴',
    'LINEミニアプリ 会員証',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/memberscard',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      'デジタル会員証｜友だち追加するだけで、お店が自分のことを覚えてくれる｜グロースパック for LINE',
    description:
      'LINE友だち追加で会員ID自動発行。来店履歴・ランク・属性を自動蓄積し、全機能のデータ基盤を構築します。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'デジタル会員証｜友だち追加するだけで、お店が自分のことを覚えてくれる｜グロースパック for LINE',
    description:
      'LINE友だち追加で会員ID自動発行。来店履歴・ランク・属性を自動蓄積し、全機能のデータ基盤を構築します。',
  },
};

export default function MembersCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
