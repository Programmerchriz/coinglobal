
'use client';

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';

import { SearchModal } from '@/components/layout/SearchModal';
import { getTrendingCoins } from "@/lib/api/trendingCoins";

const getNavLinks = (session: Session | null | undefined) => {
  if (!session) {
    return [
      {
        title: 'Home',
        href: '/',
        disabled: false,
      },
      {
        title: 'Markets',
        href: '/markets',
          disabled: false,
      },
      {
        title: 'Sign Up',
        href: '/signup',
        disabled: false,
      },
    ];
  }

  return [
    {
      title: 'Dashboard',
      href: '/dashboard',
        disabled: false,
    },
    {
      title: 'Coins',
      href: '/coins',
        disabled: false,
    },
    {
      title: 'Markets',
      href: '/markets',
        disabled: false,
    },
  ];
};

type Session = typeof auth.$Infer.Session;

export default function HeaderClient ({ session }: HeaderProps) {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);

  const pathname = usePathname();
  const links = getNavLinks(session);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoadingTrending(true);
        const data = getTrendingCoins();

        setTrendingCoins((await data).coins || []);
      } catch (err) {
        console.error("Trending fetch failed:", err);
        throw new Error("Failed to trending coins data");
      } finally {
        setIsLoadingTrending(false);
      }
    };

    fetchTrending();
  }, [session]);

  return (
    <header className="sticky top-0 z-50 bg-(--bg-app)/80 backdrop-blur-xl border-b border-(--border-standard)">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-1 md:gap-3">

          <Image
            src="/coin-glob.png"
            alt="CoinGlobal Logo"
            width={40}
            height={40}
            className="mt-2 rounded-md"
          />

          <h3 className="text-lg mt-1 font-semibold tracking-tight text-(--text-primary)">
            Coin
            <span className="font-bold italic text-(--color-primary)">
              Global
            </span>
          </h3>

        </Link>

        <nav className={`flex items-center justify-end text-sm ${session ? "gap-2 sm:gap-6 mr-2" : "gap-5 mr-4"}`}>

          {links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              aria-disabled={link.disabled}
              className={cn(
                "transition-colors hover:text-(--color-primary-hover)",
                pathname === link.href
                  ? "text-(--color-primary) font-medium"
                  : "text-(--color-70)"
              )}
            >
              {link.title}
            </Link>
          ))}

          {session && (
            <div className="md:block">
              <SearchModal
                initialTrendingCoins={trendingCoins}
                isLoading={isLoadingTrending}
              />
            </div>
          )}

        </nav>
      </div>
    </header>
  );
};
