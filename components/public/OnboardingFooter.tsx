
import Link from "next/link";

export default function OnboardingFooter() {
  return (
    <footer className="onboarding-footer py-12 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold mb-3">
            Coin Global
          </h3>
          <p className="text-sm text-[color:var(--color-60)]">
            A powerful crypto dashboard built for modern traders.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2 text-sm">
          <p className="uppercase text-xs tracking-wider text-[color:var(--color-50)]">
            Company
          </p>
          <Link
            href="#"
            className="block transition hover:text-[color:var(--color-primary-hover)]"
          >
            About
          </Link>
          <Link
            href="#"
            className="block transition hover:text-[color:var(--color-primary-hover)]"
          >
            Features
          </Link>
          <Link
            href="#"
            className="block transition hover:text-[color:var(--color-primary-hover)]"
          >
            Roadmap
          </Link>
        </div>

        {/* CTA (still commented out as requested) */}
        {/* <div>
          <p className="uppercase text-xs tracking-wider mb-3 text-[color:var(--color-50)]">
            Get Started
          </p>
          <Link
            href="/sign-up"
            className="inline-block btn-primary px-5 py-3 font-medium transition"
          >
            Create Account
          </Link>
        </div> */}
      </div>

      <div className="mt-12 pt-6 text-center text-sm border-t border-[color:var(--color-5)] text-[color:var(--color-40)]">
        © {new Date().getFullYear()} Coin Global. All rights reserved.
      </div>
    </footer>
  );
  };
