'use client';

export default function SwapLoading() {
  return (
    <div className="animate-pulse max-w-xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-(--color-10) rounded-lg" />
      </div>

      {/* Swap Card */}
      <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-6">
        {/* From Token Section */}
        <div className="space-y-3">
          <div className="h-4 w-20 bg-(--color-10) rounded" />
          <div className="bg-(--bg-app) border border-(--color-5) rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-(--color-10) rounded-lg" />
                <div className="h-5 w-20 bg-(--color-10) rounded" />
              </div>
              <div className="h-8 w-24 bg-(--color-10) rounded-lg" />
            </div>
            <div className="h-10 w-full bg-(--color-10) rounded-lg" />
          </div>
        </div>

        {/* Swap Icon */}
        <div className="flex justify-center">
          <div className="h-10 w-10 bg-(--color-10) rounded-full" />
        </div>

        {/* To Token Section */}
        <div className="space-y-3">
          <div className="h-4 w-20 bg-(--color-10) rounded" />
          <div className="bg-(--bg-app) border border-(--color-5) rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-(--color-10) rounded-lg" />
                <div className="h-5 w-20 bg-(--color-10) rounded" />
              </div>
              <div className="h-8 w-24 bg-(--color-10) rounded-lg" />
            </div>
            <div className="h-10 w-full bg-(--color-10) rounded-lg" />
          </div>
        </div>

        {/* Rate Info */}
        <div className="bg-(--bg-app) border border-(--color-5) rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-(--color-10) rounded" />
            <div className="h-4 w-28 bg-(--color-10) rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-(--color-10) rounded" />
            <div className="h-4 w-20 bg-(--color-10) rounded" />
          </div>
        </div>

        {/* Swap Button */}
        <div className="h-12 w-full bg-(--color-10) rounded-lg" />
      </div>
    </div>
  );
}
