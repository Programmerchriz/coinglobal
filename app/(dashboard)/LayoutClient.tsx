
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { toast } from "sonner";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Loading from "@/components/auth/SignOutLoading";

const LOADING_DELAY = 1500;
const REPLACE_DELAY = 500;

export default function LayoutClient({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const welcome = params.get("welcome");

  useEffect(() => {
    if (welcome == "signin") {
      setTimeout(() => {
        toast.success("Welcome back 👋", {
          description: "You've successfully signed in.",
        });
      }, 100);

    }

    if (welcome == "signup") {
      setTimeout(() => {
        toast.success("Account created 🎉", {
          description: "Your account has been set up successfully.",
        });
      }, 100);

    }

    if (welcome) {
      setTimeout(() => router.replace(window.location.pathname));
    };
  }, [welcome, router]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
      setIsOpen(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleSignOut = async () => {
    setIsDisabled(true);
    setIsLoading(true);
    router.push("/signout");

    setTimeout(() => setIsLoading(false), LOADING_DELAY);
  };

  return (
    isLoading
      ?
        <Loading />
      :
        <div className="min-h-screen bg-(--bg-app) text-(--text-primary) flex relative">
          {/* Mobile Overlay */}
          <AnimatePresence>
            {isOpen && !isDesktop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-(--color-opp-50) z-40"
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
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsOpen(true)}
                className="hover:cursor-pointer"
              >
                <Menu size={22} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </main>
        </div>
  );
};
