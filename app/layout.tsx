
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';


import './globals.css';
import { getServerSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { Toaster } from '@/components/ui/sonner';
import Header from '../components/layout/header';
import { ThemeProvider } from "@/components/layout/theme-provider";

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
  openGraph: {
    title: "CoinGlobal",
    description: "Track cryptocurrency prices in real-time.",
    images: [
      {
        url: "/coin-glob.png",
        width: 1200,
        height: 630,
      },
    ],
  }, // Bigger Logo
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession();
  // let theme: "light" | "dark" = "dark";

  // if (session?.user?.id) {
  //   const user = await prisma.user.findUnique({
  //     where: { id: session.user.id },
  //     select: { theme: true },
  //   });

  //   theme = (user?.theme?.toLowerCase() as "light" | "dark") ?? "dark";
  // }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <ThemeProvider> */}
          <Header />
          {children}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            theme={"dark"}
            toastOptions={{
              classNames: {
                toast: 'bg-(--bg-surface) border border-(--color-10) text-(--text-primary)',
                description: 'text-(--color-60)',
                actionButton: 'bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--text-primary)',
              },
            }}
          />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
