import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "권현우 | 양산시의회의원 후보",
  description: "1년의 약속, 확실한 변화 - 기강 ON, 특권 OFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning={true}>
      <body className={`${notoSansKr.className} overflow-x-hidden`} suppressHydrationWarning={true}>
        <div className="overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}