
"use client";

import BackButton from "@/components/ui/BackButton";
import { Settings, Trash2 } from "lucide-react";
import Link from "next/link";

export default function NotificationsClient() {
  return (
    <div className=" min-h-screen bg-(--bg-app) text-(--text-primary)">
      {/* Glow */}
      <div className="absolute -top-50 -left-50 w-100 h-100 bg-(--bg-indigo-10) rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <BackButton />

          <div className="flex items-center gap-4">
            {/* Clear Notifications */}
            <button className="p-2 bg-(--bg-surface) border border-(--color-5) rounded-xl hover:bg-(--color-5) hover:cursor-pointer transition">
              <Trash2 />
            </button>

            {/* Settings */}
            <Link
              href="/notifications/settings"
              className="p-2 bg-(--bg-surface) border border-(--color-5) rounded-xl hover:bg-(--color-5) transition"
            >
              <Settings />
            </Link>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold">
          Notifications
        </h1>

        {/* Tabs */}
        <div className="overflow-x-auto custom-scrollbar">
          <div className="flex gap-6 border-b border-(--color-5) pb-3">
            {[
              "All",
              "System Notifications",
              "Latest Events",
              "Announcements",
              "Rewards",
              "Trading Alerts",
              "News",
              "Strategy",
              "Signal",
              "Changes to Account"
            ].map((tab, i) => (
              <button
                key={i}
                className="text-sm whitespace-nowrap text-(--color-70) hover:text-(--text-primary) transition relative"
              >
                {tab}
                {i === 0 && (
                  <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-(--color-primary) rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl p-5 hover:border-(--color-primary)/40 transition">
            <div className="flex justify-between items-center gap-4">
              <div>
                <h3 className="font-medium">
                  Login Attempt From New IP
                </h3>

                <p className="text-(--color-50) text-sm mt-1">
                  We detected a login attempt from a new device.
                </p>

                <p className="text-(--color-30) text-xs mt-2">
                  Today • 05:13
                </p>
              </div>

              <button className="text-(--color-primary) hover:text-(--color-primary-hover) text-sm transition">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
