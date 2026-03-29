
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Wallet,
  LayoutDashboard,
  BarChart3,
  Layers,
  Repeat,
  FileText,
  ScrollText,
  X,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  user: UserProps;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isDesktop: boolean;
  onSignOut: () => void;
  isDisabled: boolean;
};

export default function DashboardSidebar({
  user,
  isOpen,
  setIsOpen,
  isDesktop,
  onSignOut,
  isDisabled,
}: Props) {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", available: true },
    { icon: BarChart3, label: "Portfolio", available: false },
    { icon: Layers, label: "Markets", available: false },
    { icon: Repeat, label: "Staking", available: false },
    { icon: ScrollText, label: "Orders", available: false },
    { icon: Wallet, label: "P2P Orders", available: false },
    { icon: FileText, label: "Reports", available: false },
  ];

  return (
    <AnimatePresence>
      <motion.aside
        initial={false}
        animate={{
          x: isDesktop ? 0 : isOpen ? 0 : -300,
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-16 h-[calc(100vh-4rem)] z-50 w-64 bg-(--bg-sidebar) border-r border-(--border-standard) p-4 pb-6 flex flex-col"
      >
        {/* TOP SECTION */}
        <div className="mb-8">
          <div className="flex flex-col gap-3 justify-between">

            <div className="flex items-center justify-between space-x-3">

              <div className="flex items-center justify-between gap-4 overflow-x-auto">
                <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden flex items-center justify-center">
                  {
                    user.image ? (
                      <Image
                        src={`${user.image}`}
                        alt=""
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Avatar>
                        <AvatarFallback className="bg-(--color-primary) text-white">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                  )}
                </div>

                <div className="text-sm overflow-x-auto custom-scrollbar">
                  <p className="text-(--text-primary) font-medium">
                    {user.name}
                  </p>

                  <p className="text-(--color-50) text-xs">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                className="lg:hidden hover:cursor-pointer text-(--color-60)"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>

            </div>

            <div className="flex justify-between items-center">

              <button
                onClick={onSignOut}
                disabled={isDisabled}
                className="text-xs px-3 py-1.5 rounded-lg border border-(--border-input) text-(--color-70) hover:bg-(--color-5) hover:text-(--text-primary) hover:cursor-pointer transition-colors"
              >
                Sign Out
              </button>

              <Link
                href="/settings"
                className="p-2 bg-(--bg-surface) border border-(--border-standard) rounded-xl hover:bg-(--color-5) transition"
              >
                <Settings />
              </Link>

            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">

          {navItems.map((item, i) => (
            <button
              key={i}
              disabled={!item.available}
              className={`relative flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition
                ${
                  item.available
                    ? "hover:bg-(--color-5) hover:cursor-pointer text-(--text-primary)"
                    : "opacity-50 cursor-not-allowed text-(--color-60)"
                }
              `}
            >
              <item.icon size={18} className="text-(--color-60)" />

              {item.label}

              {!item.available && (
                <span className="absolute -top-1 right-8 text-[8px] px-2 py-0.5 rounded-full bg-(--color-primary)/20 text-(--color-primary) border border-(--color-primary)/30">
                  Coming Soon
                </span>
              )}

            </button>
          ))}

        </nav>

        {/* BOTTOM */}
        <div className="pt-6">

          <Card className="bg-linear-to-br from-(--color-primary) to-(--color-accent) border-none text-white rounded-2xl">

            <CardContent className="p-4">

              <p className="text-sm font-medium mb-2">
                AI Trading Assistant
              </p>

              <p className="text-xs text-(--color-90) mb-4">
                Unlock powerful trading insights and strategies.
              </p>

              <Button className="w-full bg-(--text-primary) text-(--text-secondary) hover:bg-(--color-90) hover:cursor-not-allowed rounded-xl opacity-50">
                Coming Soon
              </Button>

            </CardContent>
          </Card>

        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
