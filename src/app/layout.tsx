import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Script from 'next/script'
import { GA_TRACKING_ID } from '@/lib/gtag';

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "권현우 | 양산시의회의원 후보",
  description: "사는 곳을 바꿉니다, 삶을 바꿉니다",
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
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
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
        <link 
          href="https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className={`${notoSansKr.className} overflow-x-hidden`} suppressHydrationWarning={true}>
        <div className="overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}