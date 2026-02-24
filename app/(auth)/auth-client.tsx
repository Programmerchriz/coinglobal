
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { motion } from "framer-motion";

import { signIn, signInSocial, signUp } from "@/lib/actions/auth-actions";

import { toast } from "sonner";
import Loading from "./loading";

export default function AuthClientPage({
  defaultMode,
}: AuthClientPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isSignIn, setIsSignIn] = useState(
    defaultMode === "sign-in"
  );

  useEffect(() => {
    setIsSignIn(defaultMode === "sign-in");
  }, [defaultMode]);

  const handleSocialAuth = async (provider: "google") => {
    setIsLoading(true);
    setError("");
    
    await signInSocial(provider);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignIn) {
        const response = await signIn(email, password);

        if (!response.user) {
          setError("Invalid email or password");
          return;
        }

        toast.success(
          "Successfully signed in 🎉",
          {
            description: "Welcome back to Coin Global",
          }
        );

        router.push(searchParams.get("callbackUrl") || "/dashboard");
      } else {
        const response = await signUp(email, password, name);

        if (!response.user) {
          setError("Failed to create account");
          return;
        }

        toast.success(
          "Account created 🚀",
          {
            description: "Welcome to Coin Global.",
          }
        );

        router.push("/dashboard");
      }
    } catch (err) {
      setError(
        `Authentication error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // await toast.promise(signIn(email, password), {
  //   loading: "Signing you in...",
  //   success: "Welcome back 🎉",
  //   error: "Invalid credentials",
  // });

  return (
    (isLoading)
      ?
    (<Loading />)
      :
    (
    <div className="min-h-screen pt-16 bg-[#0B0F19] text-white flex justify-center px-4 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#111827] border border-white/5 rounded-2xl shadow-2xl p-8 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">
              {isSignIn ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-white/50 mt-2">
              {isSignIn
                ? "Sign in to access your crypto dashboard"
                : "Join Coin Global and start trading"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Social Auth */}
          <button
            onClick={() => handleSocialAuth("google")}
            disabled={isLoading}
            className="relative w-full flex items-center justify-center gap-3 bg-[#0F1623] border border-white/10 rounded-xl py-3 text-sm hover:cursor-pointer"
          >
            {/* Coming Soon badge */}
            {/* <span className="absolute top-0.5 sm:top-2 left-1 sm:left-3 text-[10px] px-2 py-0.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-full leading-none">
              Coming Soon
            </span> */}

            {/* Google Logo */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>

            {/* Button Text */}
            <span className="whitespace-nowrap">
              Continue with Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative text-center text-xs text-white/40 bg-[#111827] px-3 w-fit mx-auto">
              Or continue with email
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isSignIn && (
              <div>
                <label className="block text-xs text-white/50 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-[#0F1623] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-white/50 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#0F1623] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#0F1623] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 hover:cursor-pointer rounded-xl py-3 text-sm font-medium transition flex items-center justify-center"
            >
              {isLoading
                ? isSignIn
                  ? "Signing in..."
                  : "Creating account..."
                : isSignIn
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError("");
                setName("");
              }}
              className="text-sm text-indigo-400 hover:text-indigo-300 transition hover:cursor-pointer"
            >
              {isSignIn
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
    )
  );

};
