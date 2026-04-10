import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Header from '../components/layout/header';
import { getTheme } from '@/lib/actions/theme-actions';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://coin-global.vercel.app'),

  title: {
    default: 'Coin Global',
    template: '%s | Coin Global',
  },

  description:
    'Crypto Screener App with a built-in High-Frequency Trading Terminal, Portfolio Dashboard, and Real-Time Market Analytics.',

  applicationName: 'Coin Global',

  keywords: [
    'crypto',
    'cryptocurrency',
    'trading',
    'bitcoin',
    'ethereum',
    'crypto screener',
    'trading dashboard',
    'crypto analytics',
  ],

  authors: [{ name: 'Coin Global' }],
  creator: 'Coin Global',
  publisher: 'Coin Global',

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/favicon-192.png', sizes: '192x192', type: 'image/png' }],
  },

  openGraph: {
    type: 'website',
    url: 'https://coin-global.vercel.app',
    locale: 'en_US',
    title: 'Coin Global',
    description:
      "Track cryptocurrency prices in real-time with Coin Global's high-performance trading dashboard.",
    siteName: 'Coin Global',
    images: [
      {
        url: 'https://pub-239d85d80e03475bbf7f2b188c85c146.r2.dev/coinglobal-assets/coin-glob.png',
        width: 1200,
        height: 630,
        alt: 'Coin Global Crypto Dashboard',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@coinglobal',
    creator: '@coinglobal',
    title: 'Coin Global',
    description: 'Real-time crypto screener and high-frequency trading dashboard.',
    images: ['https://pub-239d85d80e03475bbf7f2b188c85c146.r2.dev/coinglobal-assets/coin-glob.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <ThemeProvider> */}
        <Header />
        {children}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          theme={theme as 'dark' | 'light'}
          toastOptions={{
            classNames: {
              toast: 'bg-(--bg-surface) border border-(--color-10) text-(--text-primary)',
              description: 'text-(--color-60)',
              actionButton:
                'bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--text-primary)',
            },
          }}
        />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
