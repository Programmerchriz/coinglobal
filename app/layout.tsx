import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import Header from '../components/layout/header';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Coin Global',
  description: 'Crypto Screener App with a built-in High-Frequency Terminal & Dashboard',
  icons: {
    icon: '/coin-glob.png',
    shortcut: '/coin-glob.png',
    apple: '/coin-glob.png',
  },
  // openGraph: {
  //   title: "CoinGlobal",
  //   description: "Track cryptocurrency prices in real-time.",
  //   images: [
  //     {
  //       url: "/coin-glob.png",
  //       width: 1200,
  //       height: 630,
  //     },
  //   ],
  // }, // Bigger Logo
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          theme="dark"
          toastOptions={{
            classNames: {
              toast: 'bg-(--bg-surface) border border-(--color-10) text-(--text-primary)',
              description: 'text-(--color-60)',
              actionButton: 'bg-(--color-primary) hover:(--color-primary-hover) text-(--text-primary)',
            },
          }}
        />
      </body>
    </html>
  );
}
