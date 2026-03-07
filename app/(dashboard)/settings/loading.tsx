
"use client";

export default function Loading () {
  return (
    <div className="animate-pulse space-y-10 pb-16">

      {/* Header */}
      <div className="space-y-2">
        <div className="h-7 w-40 bg-(--color-10) rounded" />
        <div className="h-4 w-72 bg-(--color-10) rounded" />
      </div>

      {[1, 2, 3, 4].map((section) => (
        <div
          key={section}
          className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-6 space-y-6"
        >
          <div className="h-5 w-40 bg-(--color-10) rounded" />

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between"
            >
              <div className="space-y-2">
                <div className="h-4 w-48 bg-(--color-10) rounded" />
                <div className="h-3 w-64 bg-(--color-10) rounded" />
              </div>

              <div className="h-8 w-20 bg-(--color-10) rounded-xl" />
            </div>
          ))}
        </div>
      ))}

    </div>
  );
};
