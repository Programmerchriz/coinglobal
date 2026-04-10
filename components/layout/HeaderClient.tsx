'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';

import { SearchModal } from '@/components/layout/SearchModal';
import { Menu, X } from 'lucide-react';

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

export default function HeaderClient({ session, initialTrendingCoins }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);

  const pathname = usePathname();
  const links = getNavLinks(session);

  const handleMenuClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoadingTrending(true);
        setTrendingCoins(initialTrendingCoins);
      } catch (err) {
        console.error('Trending fetch failed:', err);
        throw new Error('Failed to trending coins data');
      } finally {
        setIsLoadingTrending(false);
      }
    };

    fetchTrending();
  }, [session, initialTrendingCoins]);

  return (
    <header className="sticky top-0 z-50 bg-(--bg-app)/80 backdrop-blur-xl border-b border-(--border-standard)">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
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
            <span className="font-bold italic text-(--color-primary)">Global</span>
          </h3>
        </Link>

        {/* Desktop Nav */}
        <nav
          className={`hidden xs:flex items-center justify-end text-sm ${session ? 'gap-2 sm:gap-6 mr-2' : 'gap-5 mr-4'}`}
        >
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              aria-disabled={link.disabled}
              className={cn(
                'transition-colors hover:text-(--color-primary-hover)',
                pathname === link.href ? 'text-(--color-primary) font-medium' : 'text-(--color-70)'
              )}
            >
              {link.title}
            </Link>
          ))}

          {session && (
            <div className="">
              <SearchModal initialTrendingCoins={trendingCoins} isLoading={isLoadingTrending} />
            </div>
          )}
        </nav>

        {/* Burger Button (mobile only) */}
        <div className="xs:hidden flex gap-4 items-center">
          {session && (
            <SearchModal initialTrendingCoins={trendingCoins} isLoading={isLoadingTrending} />
          )}

          <button
            onClick={() => {
              if (isMenuOpen) {
                handleMenuClose();
              } else {
                setIsMenuOpen(true);
              }
            }}
            className="flex items-center justify-center p-2 rounded-md border border-(--color-10) hover:cursor-pointer"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {(isMenuOpen || isClosing) && (
        <>
          {/* Glass effect backdrop overlay */}
          <div
            className="xs:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-md z-40"
            onClick={handleMenuClose}
          />

          {/* Animated menu with glass effect */}
          <div
            className={`xs:hidden fixed top-16 left-0 right-0 z-50 px-4 py-4 space-y-3 border-b border-(--border-standard) ${isClosing ? 'mobile-menu-close' : 'mobile-menu-slide'} bg-slate-900/80 backdrop-blur-xl shadow-lg`}
          >
            {links.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={handleMenuClose}
                className={cn(
                  'block py-2 transition-colors hover:text-(--color-primary-hover)',
                  pathname === link.href
                    ? 'text-(--color-primary) font-medium'
                    : 'text-(--color-70)'
                )}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </>
      )}
    </header>
  );
}
