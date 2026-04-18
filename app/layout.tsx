import type React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_JP, Roboto } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-noto-sans-jp",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

export const viewport: Viewport = {
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL("https://lp.growthpackforline.classmethod.net"),
  title: 'グロースパック for LINE｜ハーフスクラッチで作るLINEミニアプリ開発サービス',
  description:
    'SaaSの速さとフルスクラッチの柔軟性を両立する「ハーフスクラッチ開発」のLINEミニアプリ。会員証・予約・クーポンなど10機能から選び、最短3ヶ月で立ち上げます。クラスメソッド提供。',
  keywords: [
    'LINEミニアプリ',
    'LINEミニアプリ 開発',
    'ハーフスクラッチ',
    'LINE 会員証',
    'LINE OMO',
    'LINE リテール',
    'グロースパック for LINE',
    'クラスメソッド',
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    title: 'グロースパック for LINE｜ハーフスクラッチで作るLINEミニアプリ開発サービス',
    description:
      'SaaSの速さとフルスクラッチの柔軟性を両立。会員証・予約・クーポンなど10機能から選び、最短3ヶ月で立ち上げます。',
    siteName: 'グロースパック for LINE',
    images: [
      {
        url: '/images/ogp-v2.jpg',
        width: 1024,
        height: 537,
        alt: 'グロースパック for LINE｜機能アセットで実現するスピード×柔軟性のLINEミニアプリ開発',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'グロースパック for LINE｜ハーフスクラッチで作るLINEミニアプリ開発サービス',
    description:
      'SaaSの速さとフルスクラッチの柔軟性を両立。会員証・予約・クーポンなど10機能から選び、最短3ヶ月で立ち上げます。',
    images: ['/images/ogp-v2.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
      </head>
      <body className={`${notoSansJP.variable} ${roboto.variable} font-sans antialiased`}>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "クラスメソッド株式会社",
              url: "https://classmethod.jp",
              logo: "https://classmethod.jp/wp-content/themes/flavor/images/logo_classmethod.svg",
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
