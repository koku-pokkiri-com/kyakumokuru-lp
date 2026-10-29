import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kyakumokuru.buzz-ence.com"),
  title: {
    default:
      "#キャクモクルー｜飲食店特化SNSマーケティング｜月5万円〜で集客を最大化",
    template: "%s｜#キャクモクルー",
  },
  description:
    "現役グルメインフルエンサーが、飲食店の集客と認知を最大化。キャスティング・ブランディング・コンサルティングの3プランで、月5万円〜で本気の集客をサポート。",
  openGraph: {
    title: "#キャクモクルー｜飲食店特化のSNSマーケティング",
    description:
      "現役グルメインフルエンサーがお店の魅力を発信。短期集客から中長期ブランディングまで、飲食店の売上を最大化。",
    type: "website",
    locale: "ja_JP",
    siteName: "#キャクモクルー",
  },
  twitter: {
    card: "summary_large_image",
    title: "#キャクモクルー｜飲食店特化のSNSマーケティング",
    description: "現役グルメインフルエンサーで飲食店の集客と認知を最大化。",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#3DA9FC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-body text-[#333] antialiased">{children}  <script src="/js/form-relay.js" defer></script>
      </body>
    </html>
  );
}
