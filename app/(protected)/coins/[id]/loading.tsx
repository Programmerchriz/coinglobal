
export default function Loading() {
  return (
    <section className="min-h-screen text-white px-4 py-6 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-4">

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1f2933]" />
              <div className="h-6 w-32 bg-[#1f2933] rounded" />
              <div className="h-5 w-16 bg-[#1f2933] rounded" />
            </div>

            {/* Price */}
            <div className="h-10 w-48 bg-[#1f2933] rounded" />

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-lg p-4 space-y-2 bg-[#161b22]"
                >
                  <div className="h-4 w-20 bg-[#1f2933] rounded" />
                  <div className="h-5 w-16 bg-[#1f2933] rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Converter */}
          <div className="bg-[#161b22] rounded-xl p-5 space-y-4">
            <div className="h-5 w-24 bg-[#1f2933] rounded" />
            <div className="h-12 w-full bg-[#0f1419] rounded-lg" />
            <div className="flex justify-center">
              <div className="h-5 w-5 bg-[#1f2933] rounded-full" />
            </div>
            <div className="h-12 w-full bg-[#0f1419] rounded-lg" />
          </div>
        </div>

        {/* Chart + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Chart */}
          <div className="lg:col-span-2 bg-[#161b22] rounded-xl p-4">
            <div className="h-5 w-32 bg-[#1f2933] rounded mb-4" />
            <div className="h-72 w-full bg-[#0f1419] rounded-lg" />
          </div>

          {/* Coin Details */}
          <div className="space-y-4">
            <div className="h-5 w-32 bg-[#1f2933] rounded" />
            <div className="bg-[#161b22] rounded-xl p-4 space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-24 bg-[#1f2933] rounded" />
                  <div className="h-4 w-16 bg-[#1f2933] rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
