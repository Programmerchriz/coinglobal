'use client';

export default function PortfolioLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-(--color-10) rounded-lg" />
        <div className="h-10 w-24 bg-(--color-10) rounded-lg" />
      </div>

      {/* Top Summary Card */}
      <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-6">
        {/* Portfolio Value and Change */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="h-4 w-32 bg-(--color-10) rounded mb-2" />
            <div className="h-8 w-48 bg-(--color-10) rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-12 bg-(--color-10) rounded" />
            <div className="h-6 w-16 bg-(--color-10) rounded" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-(--color-10) rounded" />
              <div className="h-5 w-24 bg-(--color-10) rounded" />
              <div className="h-3 w-16 bg-(--color-10) rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex gap-2">
        <div className="h-10 w-32 bg-(--color-10) rounded-lg" />
        <div className="h-10 w-32 bg-(--color-10) rounded-lg" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Portfolio Chart */}
        <div className="xl:col-span-2 bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="h-5 w-40 bg-(--color-10) rounded" />
          </div>
          <div className="h-64 bg-(--color-10) rounded-xl" />
        </div>

        {/* Market Chart */}
        <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6">
          <div className="h-5 w-32 bg-(--color-10) rounded mb-4" />
          <div className="h-64 bg-(--color-10) rounded-xl" />
        </div>
      </div>

      {/* Holdings */}
      <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-4">
        <div className="h-5 w-32 bg-(--color-10) rounded" />

        {/* Holdings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-(--bg-app) border border-(--color-5) rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-(--color-10) rounded-full" />
                <div className="flex-1">
                  <div className="h-4 w-20 bg-(--color-10) rounded mb-1" />
                  <div className="h-3 w-16 bg-(--color-10) rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-(--color-10) rounded" />
                <div className="h-3 w-20 bg-(--color-10) rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
