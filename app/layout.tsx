import type React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_JP, Roboto } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
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
