import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'グロースパック for LINE｜LINEミニアプリで顧客接点を拡張する',
  description:
    'ハーフスクラッチ開発で、SaaSの速さとフルスクラッチの柔軟性を両立。会員証・予約・クーポンなど10機能から選び、最短1ヶ月で LINE ミニアプリを立ち上げます。クラスメソッド提供。',
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
