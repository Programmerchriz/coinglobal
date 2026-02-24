import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { fetcher } from '@/lib/coingecko.actions';

import './globals.css';
import Header from '../components/layout/header';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Error from './(protected)/coins/[id]/error';

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
              toast: 'bg-[#111827] border border-white/10 text-white',
              description: 'text-white/60',
              actionButton: 'bg-indogo-600 hover:bg-indigo-500 text-white',
            },
          }}
        />
      </body>
    </html>
  );
}
