
"use client";

import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-start lg:items-center justify-center px-4 py-16 lg:py-0">
      <div className="bg-[#161b22] text-white rounded-xl p-8 max-w-md w-full text-center space-y-4 border border-[#1f2933]">

        <h2 className="text-xl font-semibold">
          Failed to load coin data
        </h2>

        <p className="text-gray-400 text-sm">
          Something went wrong while fetching this coin’s information.
          Please try again later.
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-green-700 hover:bg-green-700 hover:cursor-pointer transition-colors px-4 py-2 rounded-lg text-sm font-medium"
        >
          Home
        </button>

      </div>
    </section>
  );
}
