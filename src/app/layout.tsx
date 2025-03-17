import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FILMSEEKER",
  description: "Find movies using the power of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5913159821295093"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <NextUIProvider>
          <Suspense>{children}</Suspense>
        </NextUIProvider>
      </body>
    </html>
  );
}
