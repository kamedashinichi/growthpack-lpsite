import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'セグメント配信｜「誰に・いつ・何を送るか」をデータで決め、全員に同じ配信から卒業する｜グロースパック for LINE',
  description:
    '会員証・スタンプ・予約などのデータを組み合わせてセグメントを構築。パーソナライズ配信と自動シナリオで、配信効果を最大化します。',
  keywords: [
    'セグメント配信 LINE',
    'LINE セグメント',
    'LINE 配信 パーソナライズ',
    'LINE CRM',
    'LINE MA',
    'LINE シナリオ配信',
    '顧客セグメント LINE',
    'LINEミニアプリ 配信',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  alternates: {
    canonical: 'https://lp.growthpackforline.classmethod.net/segment',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title: 'セグメント配信｜「誰に・いつ・何を送るか」をデータで決め、全員に同じ配信から卒業する｜グロースパック for LINE',
    description: '会員証・スタンプ・予約などのデータを組み合わせてセグメントを構築。パーソナライズ配信と自動シナリオで配信効果を最大化します。',
    siteName: 'グロースパック for LINE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'セグメント配信｜「誰に・いつ・何を送るか」をデータで決め、全員に同じ配信から卒業する｜グロースパック for LINE',
    description: '会員証・スタンプ・予約などのデータを組み合わせてセグメントを構築。パーソナライズ配信と自動シナリオで配信効果を最大化します。',
  },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
