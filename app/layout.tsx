import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_JP, Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { SiteLoader } from "@/components/ui/SiteLoader";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-serif",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif-ja",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Kitaoケータリング | 出張ケータリングサービス",
    template: "%s | Kitaoケータリング",
  },
  description: "法人向け出張ケータリングサービス。企業イベント・懇親会・セミナー・パーティーのフード・ドリンク・テーブルコーディネートをトータルプロデュース。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Kitaoケータリング",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${cormorantGaramond.variable} ${notoSerifJP.variable} ${notoSansJP.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Kitaoケータリング",
              description: "法人向け出張ケータリングサービス",
              url: process.env.NEXT_PUBLIC_SITE_URL,
              "@id": process.env.NEXT_PUBLIC_SITE_URL,
              serviceType: "ケータリング",
              areaServed: {
                "@type": "Country",
                name: "Japan",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans"><MotionProvider><SiteLoader />{children}</MotionProvider></body>
    </html>
  );
}
