
"use client";

export default function Loading () {
  return (
    <div className="animate-pulse space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-48 bg-(--color-10) rounded" />
        <div className="h-6 w-6 bg-(--color-10) rounded-full" />
      </div>

      {/* Net Worth */}
      <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6">
        <div className="h-4 w-32 bg-(--color-10) rounded mb-3" />
        <div className="h-8 w-48 bg-(--color-10) rounded mb-2" />
        <div className="h-3 w-20 bg-(--color-10) rounded" />
      </div>

      {/* Profit & Loss */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-4">
          <div className="flex justify-between">
            <div className="h-5 w-32 bg-(--color-10) rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-8 bg-(--color-10) rounded" />
              <div className="h-6 w-8 bg-(--color-10) rounded" />
              <div className="h-6 w-8 bg-(--color-10) rounded" />
              <div className="h-6 w-8 bg-(--color-10) rounded" />
            </div>
          </div>

          <div className="h-40 sm:h-56 bg-(--color-10) rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
          <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-3">
            <div className="h-4 w-32 bg-(--color-10) rounded" />
            <div className="h-6 w-24 bg-(--color-10) rounded" />
            <div className="h-4 w-16 bg-(--color-10) rounded" />
          </div>

          <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-3">
            <div className="h-4 w-32 bg-(--color-10) rounded" />
            <div className="h-6 w-24 bg-(--color-10) rounded" />
            <div className="h-4 w-16 bg-(--color-10) rounded" />
          </div>
        </div>
      </div>

      {/* Watchlist */}
      <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-4">
        <div className="flex justify-between">
          <div className="h-5 w-32 bg-(--color-10) rounded" />
          <div className="h-8 w-64 bg-(--color-10) rounded-xl" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex justify-between p-3 bg-(--color-5) rounded-xl"
            >
              <div className="h-4 w-32 bg-(--color-10) rounded" />
              <div className="h-4 w-16 bg-(--color-10) rounded" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
