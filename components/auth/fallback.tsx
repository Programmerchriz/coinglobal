
'use client';

export default function Fallback() {
  return (
    <div className="min-h-screen py-16 bg-(--bg-app) flex justify-center px-2 relative overflow-hidden">

      {/* Glow background */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-(--bg-glass-indigo) rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-(--bg-glass-purple) rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">

        <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-2xl p-8 space-y-6">

          {/* Title */}
          <div className="space-y-3 text-center">
            <div className="h-6 w-40 mx-auto rounded bg-(--color-10) animate-pulse"></div>
            <div className="h-4 w-52 mx-auto rounded bg-(--color-10) animate-pulse"></div>
          </div>

          {/* Google Button */}
          <div className="h-11 rounded-xl bg-(--color-10) animate-pulse"></div>

          {/* Divider */}
          <div className="h-px bg-(--color-10)"></div>

          {/* Email input */}
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-(--color-10) animate-pulse"></div>
            <div className="h-10 rounded-lg bg-(--color-10) animate-pulse"></div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-(--color-10) animate-pulse"></div>
            <div className="h-10 rounded-lg bg-(--color-10) animate-pulse"></div>
          </div>

          {/* Sign in button */}
          <div className="h-11 rounded-xl bg-(--color-10) animate-pulse"></div>

          {/* Footer */}
          <div className="h-4 w-48 mx-auto rounded bg-(--color-10) animate-pulse"></div>

        </div>

      </div>
    </div>
  );
}
