'use client';

export default function AllocationLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-(--color-10) rounded-lg" />
        <div className="h-10 w-24 bg-(--color-10) rounded-lg" />
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-5 space-y-3"
          >
            <div className="h-4 w-24 bg-(--color-10) rounded" />
            <div className="h-6 w-32 bg-(--color-10) rounded" />
            <div className="h-3 w-20 bg-(--color-10) rounded" />
          </div>
        ))}
      </div>

      {/* Charts and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Allocation Chart */}
        <div className="lg:col-span-1 bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-4">
          <div className="h-5 w-40 bg-(--color-10) rounded" />
          <div className="flex justify-center items-center h-64">
            <div className="w-40 h-40 rounded-full bg-(--color-10)" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-3 w-20 bg-(--color-10) rounded" />
                <div className="h-3 w-16 bg-(--color-10) rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Asset Table */}
        <div className="lg:col-span-2 bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-4">
          <div className="h-5 w-32 bg-(--color-10) rounded" />

          {/* Table Header */}
          <div className="flex justify-between gap-4 pb-4 border-b border-(--color-5)">
            <div className="h-4 w-24 bg-(--color-10) rounded" />
            <div className="h-4 w-20 bg-(--color-10) rounded" />
            <div className="h-4 w-20 bg-(--color-10) rounded" />
            <div className="h-4 w-20 bg-(--color-10) rounded" />
          </div>

          {/* Table Rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between gap-4 py-3 border-b border-(--color-5) last:border-b-0"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="h-8 w-8 bg-(--color-10) rounded-lg" />
                <div className="h-4 w-24 bg-(--color-10) rounded" />
              </div>
              <div className="h-4 w-20 bg-(--color-10) rounded" />
              <div className="h-4 w-20 bg-(--color-10) rounded" />
              <div className="h-4 w-20 bg-(--color-10) rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
