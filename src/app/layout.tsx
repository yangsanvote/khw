import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Script from 'next/script'
import { GA_TRACKING_ID } from '@/lib/gtag';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '700', '900']
});

export const metadata: Metadata = {
  title: "권현우 | 양산시의회의원 후보",
  description: "사는 곳을 바꿉니다, 삶을 바꿉니다",
  openGraph: {
    title: "권현우 | 양산시의회의원 후보",
    description: "사는 곳을 바꿉니다, 삶을 바꿉니다",
    url: "https://권현우.kr",
    siteName: "권현우 | 양산시의회의원 후보",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "권현우 | 양산시의회의원 후보",
    description: "사는 곳을 바꿉니다, 삶을 바꿉니다",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning={true}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
        />
        <Script id="kakao-init">
          {`
            if (typeof Kakao !== 'undefined') {
              Kakao.init('YOUR_KAKAO_APP_KEY');
            }
          `}
        </Script>
      </head>
      <body className={`${notoSansKr.className} overflow-x-hidden`} suppressHydrationWarning={true}>
        <div className="overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}