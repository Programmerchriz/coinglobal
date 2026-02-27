
'use client';

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Dark blurred overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

      {/* Glass container */}
      <div className="relative flex flex-col items-center gap-4 rounded-2xl border border-border/50 bg-background/70 px-10 py-8 shadow-2xl backdrop-blur-md">
        <Image
          src="/coin-glob.png"
          alt="App Logo"
          width={60}
          height={60}
          className="animate-pulse"
        />

        <p className="text-sm text-muted-foreground tracking-wide">
          Loading market data...
        </p>
      </div>
    </div>
  );
};
