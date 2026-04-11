export default function TrendingCoinsLoading() {
  return (
    <div className="min-h-screen bg-(--bg-app) text-primary px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button Skeleton */}
        <div className="w-20 h-10 skeleton rounded-lg" />

        {/* Title Skeleton */}
        <div className="w-48 h-8 skeleton rounded-lg" />

        {/* Table Card Skeleton */}
        <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-xl p-4">
          <div className="space-y-3">
            {/* Table Header Skeleton */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-(--color-5)">
              <div className="w-32 h-5 skeleton rounded" />
              <div className="w-24 h-5 skeleton rounded" />
              <div className="w-28 h-5 skeleton rounded" />
              <div className="w-24 h-5 skeleton rounded" />
            </div>

            {/* Table Rows Skeleton */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3">
                {/* Coin Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 skeleton rounded-full" />
                  <div className="flex-1">
                    <div className="w-24 h-4 skeleton rounded mb-2" />
                    <div className="w-16 h-3 skeleton rounded" />
                  </div>
                </div>

                {/* Price */}
                <div className="w-28 h-4 skeleton rounded" />

                {/* Change % */}
                <div className="w-20 h-4 skeleton rounded" />

                {/* Market Cap */}
                <div className="w-24 h-4 skeleton rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-10 h-10 skeleton rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
