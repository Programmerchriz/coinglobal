
import Link from "next/link";

export default function OnboardingFooter() {
  return (
    <footer className="bg-[#0B0F19] border-t border-white/5 py-12 px-6 lg:px-24 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Coin Global
          </h3>
          <p className="text-white/60 text-sm">
            A powerful crypto dashboard built for modern traders.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2 text-sm">
          <p className="text-white/50 uppercase text-xs tracking-wider">
            Company
          </p>
          <Link href="#" className="block hover:text-indigo-400 transition">
            About
          </Link>
          <Link href="#" className="block hover:text-indigo-400 transition">
            Features
          </Link>
          <Link href="#" className="block hover:text-indigo-400 transition">
            Roadmap
          </Link>
        </div>

        {/* CTA */}
        {/* <div>
          <p className="text-white/50 uppercase text-xs tracking-wider mb-3">
            Get Started
          </p>
          <Link
            href="/sign-up"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-xl font-medium transition"
          >
            Create Account
          </Link>
        </div> */}
      </div>

      <div className="border-t border-white/5 mt-12 pt-6 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} Coin Global. All rights reserved.
      </div>
    </footer>
  );
};
