
"use client";

import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import OnboardingFooter from "@/components/public/OnboardingFooter";

const FEATURES = [
  { label: "Dashboard", available: true },
  { label: "Portfolio", available: false },
  { label: "Market", available: false },
  { label: "AI Trading Assistant", available: false },
  { label: "Staking", available: false },
  { label: "Orders", available: false },
  { label: "P2P Orders", available: false },
  { label: "Reports", available: false },
];

export default function OnboardingClient() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <main className="text-(--text-primary)">
      {/* Hero Section */}
      <section className="min-h-screen flex pt-50 md:pt-0 items-start md:items-center justify-center px-6 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 max-w-3xl"
        >
          <h1 className="text-4xl lg:text-6xl font-bold">
            Build Your Crypto World with Coin Global
          </h1>
          <p className="text-lg text-[color:var(--color-70)]">
            A powerful crypto dashboard with advanced features — coming soon to revolutionize your trading experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="btn-primary text-white px-6 py-3 font-medium transition"
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              className="btn-outline px-6 py-3 font-medium transition"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 text-center" style={{ backgroundColor: "var(--bg-sidebar)" }}>
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold"
          >
            Total Transactions
          </motion.h2>

          <motion.div
            ref={ref}
            className="text-5xl lg:text-7xl font-bold text-[color:var(--color-primary)]"
          >
            {inView ? (
              <CountUp end={12345678} duration={2.8} separator="," prefix="$" />
            ) : (
              "$0"
            )}
          </motion.div>

          <p className="text-[color:var(--color-50)]">
            And growing — every second
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:px-24 px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center mb-10"
        >
          Features
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="onboarding-features card p-6 flex flex-col justify-between"
            >
              <div className="text-xl font-medium">
                {f.label}
              </div>
              {!f.available ? (
                <span className="mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-[color:var(--border-input)] text-[color:var(--color-warning)]">
                  Coming Soon
                </span>
              ) : (
                <span className="mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-[color:var(--color-success)] text-(--text-primary)">
                  Live
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center" style={{ backgroundColor: "var(--bg-sidebar)" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Get Started?
          </h2>
          <Link
            href="/sign-up"
            className="btn-primary px-8 py-4 font-medium transition"
          >
            Create an Account Today
          </Link>
        </motion.div>
      </section>

      <OnboardingFooter />
    </main>
  );
};
