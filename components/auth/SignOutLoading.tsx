
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg-glass)] backdrop-blur-xl border border-[var(--color-5)]/50 overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[var(--bg-glass-indigo)]/70 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[var(--bg-glass-purple)]/70 rounded-full blur-3xl opacity-60" />

      {/* Center Loader Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 bg-[var(--bg-glass)]/90 backdrop-blur-2xl border border-[var(--color-5)]/75 rounded-3xl px-10 py-8 shadow-2xl flex flex-col items-center gap-4 ring-1 ring-[var(--color-5)]/30"
      >
        {/* Logo */}
        <motion.div
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "linear",
          }}
          className="flex items-center justify-center"
        >
          <Image
            src="/coin-glob.png"
            alt="Coin Global Logo"
            width={60}
            height={60}
            priority
            className="animate-scale drop-shadow-lg"
          />
        </motion.div>

        {/* Loading Text */}
        <p className="text-lg text-[var(--color-50)] tracking-wide font-medium backdrop-blur-sm">
          Signing you out...
        </p>
      </motion.div>
    </div>
  );
};
