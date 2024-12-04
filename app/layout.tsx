import type { Metadata } from "next";
import localFont from "next/font/local";

import { Drawer } from "@/shared/lib/drawer";
import { Header } from "@/widgets";

import { Providers } from "./providers";
import { ServiceWorkerRegistration } from "./worker/ServiceWorkerRegistration";

import "./globals.css";
import "react-toastify/ReactToastify.min.css";

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
      <body className={`${pretendard.variable} ${mono.variable} font-pretendard flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Drawer />
        </Providers>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
