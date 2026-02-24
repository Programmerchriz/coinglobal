
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0F19] overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl" />

      {/* Center Loader Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 bg-[#111827] border border-white/5 rounded-2xl px-10 py-8 shadow-2xl flex flex-col items-center gap-4"
      >
        {/* Logo */}
        <motion.div
          animate={{ rotate: 360 }}
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
          />
        </motion.div>

        {/* Loading Text */}
        <p className="text-sm text-white/50 tracking-wide">
          Loading...
        </p>
      </motion.div>
    </div>
  );
};
