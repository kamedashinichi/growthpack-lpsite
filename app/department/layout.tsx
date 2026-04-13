import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    '百貨店・商業施設向けLINEミニアプリ開発サービス｜外商と一般顧客の二層設計 グロースパック for LINE',
  description:
    '外商顧客の関係を組織資産として引き継ぎ、一般顧客にはデジタル会員証とセグメント配信を。百貨店の顧客接点を最短3ヶ月で立ち上げます',
  keywords: [
    '百貨店 LINEミニアプリ',
    '百貨店 DX',
    '外商 デジタル化',
    '百貨店 会員証',
    '百貨店 セグメント配信',
    '催事 デジタル化',
    '商業施設 LINE',
    'LINEミニアプリ 開発',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/department',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title:
      '百貨店・商業施設向けLINEミニアプリ開発サービス｜外商と一般顧客の二層設計 グロースパック for LINE',
    description:
      '外商顧客の関係を組織資産として引き継ぎ、一般顧客にはデジタル会員証とセグメント配信を。最短3ヶ月で立ち上げます。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/department-hero.png',
        width: 1376,
        height: 768,
        alt: '百貨店・商業施設向けLINEミニアプリ開発サービス グロースパック for LINE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      '百貨店・商業施設向けLINEミニアプリ開発サービス｜外商と一般顧客の二層設計 グロースパック for LINE',
    description:
      '外商顧客の関係を組織資産として引き継ぎ、一般顧客にはデジタル会員証とセグメント配信を。最短3ヶ月で立ち上げます。',
    images: ['/images/department-hero.png'],
  },
};

export default function DepartmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
