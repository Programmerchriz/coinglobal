
"use client";

import { useState, useEffect } from "react";

import { authClient } from "@/lib/auth-client";
import { LoadingButton } from "@/components/all/LoadingButton";

interface ResendVerificationButtonProps {
  email: string;
}

export function ResendVerificationButton({
  email,
}: ResendVerificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [cooldown, setCooldown] = useState(0);

  // Countdown effect
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  async function resendVerificationEmail() {
    if (cooldown > 0) return;

    setSuccess(null);
    setError(null);
    setIsLoading(true);

    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/email-verified",
    });

    setIsLoading(false);

    if (error) {
      setError(error.message || "Something went wrong");
    } else {
      setSuccess("Verification email sent successfully");
      setCooldown(60); // Start 60 second cooldown
    }
  }

  const isDisabled = isLoading || cooldown > 0;

  return (
    <div className="space-y-4">
      {success && (
        <div
          role="status"
          className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3"
        >
          {success}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3"
        >
          {error}
        </div>
      )}

      {cooldown > 0 && (
        <div className="text-xs text-white/40 text-center">
          You can resend again in {cooldown}s
        </div>
      )}

      <LoadingButton
        onClick={resendVerificationEmail}
        loading={isLoading}
        disabled={isDisabled}
        className={`w-full rounded-xl py-3 text-sm font-medium transition hover:cursor-pointer ${
          isDisabled
            ? "bg-indigo-600/50 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-500 text-white"
        }`}
      >
        Resend verification email
      </LoadingButton>
    </div>
  );
};
