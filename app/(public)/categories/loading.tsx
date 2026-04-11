export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-(--bg-app) text-(--text-primary) px-2 py-8">
      <div className="absolute -top-50 w-100 h-100 bg-(--color-primary)/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 w-100 h-100 bg-(--color-accent)/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Back Button Skeleton */}
        <div>
          <div className="w-20 h-10 skeleton rounded-lg" />
        </div>

        {/* Title and Description Skeleton */}
        <div className="px-4">
          <div className="w-56 h-8 skeleton rounded-lg mb-3" />
          <div className="w-full max-w-2xl h-5 skeleton rounded-lg" />
        </div>

        {/* Table Card Skeleton */}
        <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-xl animate-fade-in-up transition-all duration-500 hover:shadow-2xl">
          <div id="categories" className="custom-scrollbar p-4 md:p-6">
            <div className="space-y-3">
              {/* Table Header Skeleton */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-(--color-5)">
                <div className="w-32 h-5 skeleton rounded" />
                <div className="w-24 h-5 skeleton rounded" />
                <div className="w-28 h-5 skeleton rounded" />
                <div className="w-24 h-5 skeleton rounded" />
              </div>

              {/* Table Rows Skeleton */}
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 py-4 border-b border-(--color-5) last:border-b-0"
                >
                  {/* Category Name */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 skeleton rounded-lg" />
                    <div className="flex-1">
                      <div className="w-32 h-4 skeleton rounded mb-2" />
                      <div className="w-24 h-3 skeleton rounded" />
                    </div>
                  </div>

                  {/* Market Cap */}
                  <div className="w-28 h-4 skeleton rounded" />

                  {/* Volume */}
                  <div className="w-24 h-4 skeleton rounded" />

                  {/* Change % */}
                  <div className="w-20 h-4 skeleton rounded" />
                </div>
              ))}
            </div>
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
