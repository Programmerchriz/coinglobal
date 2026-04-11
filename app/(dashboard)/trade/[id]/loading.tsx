'use client';

export default function TradeLoading() {
  return (
    <div className="animate-pulse w-full h-full px-2 py-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-(--color-10) rounded-lg" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Markets List */}
        <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-3">
          <div className="h-5 w-32 bg-(--color-10) rounded mb-4" />

          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-(--bg-app) border border-(--color-5) rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between">
                <div className="h-5 w-24 bg-(--color-10) rounded" />
                <div className="h-5 w-20 bg-(--color-10) rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-(--color-10) rounded" />
                <div className="h-4 w-16 bg-(--color-10) rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Trading Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart */}
          <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6">
            <div className="h-5 w-32 bg-(--color-10) rounded mb-4" />
            <div className="h-60 bg-(--color-10) rounded-xl" />
          </div>

          {/* Trading Card */}
          <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-4">
            {/* Buy/Sell Tabs */}
            <div className="flex gap-4 mb-4">
              <div className="h-10 w-20 bg-(--color-10) rounded-lg" />
              <div className="h-10 w-20 bg-(--color-10) rounded-lg" />
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <div className="h-4 w-20 bg-(--color-10) rounded" />
              <div className="h-12 w-full bg-(--color-10) rounded-lg" />
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <div className="h-4 w-20 bg-(--color-10) rounded" />
              <div className="h-12 w-full bg-(--color-10) rounded-lg" />
            </div>

            {/* Total */}
            <div className="bg-(--bg-app) border border-(--color-5) rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-(--color-10) rounded" />
                <div className="h-4 w-24 bg-(--color-10) rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-5 w-20 bg-(--color-10) rounded" />
                <div className="h-5 w-28 bg-(--color-10) rounded" />
              </div>
            </div>

            {/* Trade Button */}
            <div className="h-12 w-full bg-(--color-10) rounded-lg mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
