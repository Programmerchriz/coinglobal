
'use client';

import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center fade-in">
      {/* White overlay + blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Centered logo */}
      <div className="relative">
        <Image
          src="/coin-glob.png"
          alt="App Logo"
          className="text-purple-600 animate-scale"
          width={56}
          height={56}
        />
      </div>
    </div>
  );
};
