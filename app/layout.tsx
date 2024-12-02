import type { Metadata } from "next";
import localFont from "next/font/local";

import { Providers } from "./providers";

import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

const mono = localFont({
  src: "./fonts/NotoSansMono.ttf",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Daily Pomo",
  description: "This is a web-based Pomodoro timer application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.variable} font-pretendard`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
