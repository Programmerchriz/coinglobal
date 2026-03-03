
"use client";

"use client";

import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { signOut } from "@/lib/actions/auth-actions";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null | undefined>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const s = await getServerSession();
      if (!s) redirect("/sign-in");
      setSession(s);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
      setIsOpen(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  if (!session) return null;

  const handleSignOut = async () => {
    setIsDisabled(true);
    await signOut();
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex relative">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <DashboardSidebar
        user={session.user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isDesktop={isDesktop}
        onSignOut={handleSignOut}
        isDisabled={isDisabled}
      />

      <main className="flex-1 w-full lg:ml-64 p-4 sm:p-6">
        
        {/* MOBILE MENU BUTTON */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsOpen(true)}
            className="hover:cursor-pointer"
          >
            <Menu size={22} />
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}
