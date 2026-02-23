
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";

import { auth } from "@/lib/auth";
import { signOut } from "@/lib/actions/auth-actions";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TrendingUp,
  TrendingDown,
  Bell,
  Wallet,
  LayoutDashboard,
  BarChart3,
  Layers,
  Repeat,
  FileText,
  ScrollText,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardClientPage({ session }: { session: Session }) {
  const user = session.user;
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", available: true },
    { icon: BarChart3, label: "Portfolio", available: false },
    { icon: Layers, label: "Market", available: false },
    { icon: Repeat, label: "Staking", available: false },
    { icon: ScrollText, label: "Orders", available: false },
    { icon: Wallet, label: "P2P Orders", available: false },
    { icon: FileText, label: "Reports", available: false },
  ];

  const handleSignOut = async () => {
    setIsDisabled(true);
    await signOut();
    router.push("/sign-in");
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
      setIsOpen(mediaQuery.matches); // open by default on desktop
    };

    handleChange(); // run on mount
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex relative">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={false}
          animate={{
            x: isDesktop ? 0: isOpen ? 0 : -300,
          }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 h-[calc(100vh-4rem)] z-50 w-64 bg-[#0F1623] border-r border-white/5 p-4 pb-6 flex flex-col"
        >
          {/* TOP SECTION */}
          <div className="mb-8">
            <div className="flex flex-col gap-3 justify-between">
              <div className="flex items-center justify-between space-x-3">
                <div className="flex items-center justify-between gap-4">
                  {(user.image) ?
                   <Image
                      src={`${user.image}`}
                      alt="User Image"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                  />
                  :
                  <Avatar>
                    <AvatarFallback className="bg-indigo-600">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  }
                  
                  <div className="text-sm">
                    <p className="text-white font-medium">
                      {user.name}
                    </p>
                    <p className="text-white/50 text-xs">
                      {user.email}
                    </p>
                  </div>
                </div>

                 <div>
                  <button
                    className="lg:hidden hover:cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                      <X size={20} />
                    </button>
                </div>
              </div>

              <div>
                <button
                  onClick={handleSignOut}
                  disabled={isDisabled}
                  className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/70 hover:bg-white/5 hover:text-white hover:cursor-pointer transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* SCROLLABLE NAV AREA */}
          <nav className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            {navItems.map((item, i) => (
              <button
                key={i}
                disabled={!item.available}
                className={`relative flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition
                  ${
                    item.available
                      ? "hover:bg-white/5 hover:cursor-pointer text-white"
                      : "opacity-50 cursor-not-allowed text-white/60"
                  }
                `}
              >
                <item.icon size={18} className="text-white/60" />
                {item.label}

                {!item.available && (
                  <span className="absolute -top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                    Coming Soon
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* BOTTOM FIXED SECTION */}
          <div className="pt-6">
            <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 border-none text-white rounded-2xl">
              <CardContent className="p-4">
                <p className="text-sm font-medium mb-2">
                  AI Trading Assistant
                </p>
                <p className="text-xs text-white/80 mb-4">
                  Unlock powerful trading insights and strategies.
                </p>
                <Button className="w-full bg-white text-black hover:bg-white/90 hover:cursor-not-allowed rounded-xl opacity-50">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full lg:ml-64 p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden hover:cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={22} />
            </button>
            <h1 className="text-xl sm:text-2xl font-semibold">
              Dashboard Overview
            </h1>
          </div>

          <div className="">
            <Link
              href="/notifications"
            >
              <Bell className="text-white/60" />
            </Link>
            {/* <Button className="bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm sm:text-base">
              Connect Wallet
            </Button> */}
          </div>
        </div>

        {/* Net Worth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-[#111827] border-white/5 rounded-2xl shadow-xl">
            <CardContent className="p-6">
              <p className="text-sm text-white/50">Total Net Worth</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                $782,041.30
              </h2>
              <p className="text-xs text-white/50 mt-1">
                ≈ 13.2752 BTC
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profit & Loss Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2 bg-[#111827] border-white/5 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h3 className="font-semibold text-lg">
                  Profit & Loss
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["D", "M", "Y", "All"].map((item) => (
                    <Button
                      key={item}
                      variant="outline"
                      className="border-white/10 text-white/70 hover:bg-white/10 rounded-lg"
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="h-40 sm:h-56 bg-gradient-to-r from-indigo-600/20 to-transparent rounded-xl" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
            <Card className="bg-[#111827] border-white/5 rounded-2xl">
              <CardContent className="p-6">
                <p className="text-sm text-white/50">
                  Last Month Profit
                </p>
                <h4 className="text-lg sm:text-xl font-semibold mt-1">
                  $2,041.30
                </h4>
                <div className="flex items-center gap-1 text-green-500 text-sm mt-1">
                  <TrendingUp size={16} /> +12%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-white/5 rounded-2xl">
              <CardContent className="p-6">
                <p className="text-sm text-white/50">
                  Last Month Loss
                </p>
                <h4 className="text-lg sm:text-xl font-semibold mt-1">
                  $420.30
                </h4>
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                  <TrendingDown size={16} /> -4%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Watchlist */}
        <Card className="bg-[#111827] border-white/5 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3 className="font-semibold text-lg">Watchlist</h3>
              <Input
                placeholder="Search by name or symbol"
                className="w-full sm:w-64 bg-[#0F1623] border-white/10 text-white rounded-xl"
              />
            </div>

            <div className="space-y-3">
              {["Bitcoin", "Ethereum", "Solana"].map((coin, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-[#0F1623] rounded-xl hover:bg-white/5 transition"
                >
                  <span>{coin}</span>
                  <span className="text-white/60">$--</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
