
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-(--bg-app) overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute -top-50 -left-50 w-100 h-100 bg-(--bg-glass-indigo) rounded-full blur-3xl" />
      <div className="absolute -bottom-50 -right-50 w-150 h-100 bg-(--bg-glass-purple) rounded-full blur-3xl" />

      {/* Center Loader Card (--color-5) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 bg-(--bg-surface) border border-(--color-5) rounded-2xl px-10 shadow-2xl flex flex-col items-center gap-4 h-40 w-50"
      >
        {/* Logo */}
        <motion.div
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "linear",
          }}
          className="mt-3 mr-1.5 flex items-center justify-center"
        >
          <Image
            src="/coin-glob.png"
            alt="Coin Global Logo"
            width={60}
            height={60}
            priority
            className="animate-scale"
          />
        </motion.div>

        {/* Loading Text */}
        <p className="text-sm text-(--color-50) tracking-wide">
          Loading...
        </p>
      </motion.div>
    </div>
  );
};
