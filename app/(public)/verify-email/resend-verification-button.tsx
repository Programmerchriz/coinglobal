
"use client";

import { useState, useEffect } from "react";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/auth/LoadingButton";

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
          className="text-sm text-(--color-success) bg-(--color-success-10) border border-(--color-success-20) rounded-xl p-3"
        >
          {success}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="text-sm text-(--color-error) bg-(--color-error-10) border border-(--color-error-20) rounded-xl p-3"
        >
          {error}
        </div>
      )}

      {cooldown > 0 && (
        <div className="text-xs text-(--color-50) text-center">
          You can resend again in {cooldown}s
        </div>
      )}

      <LoadingButton
        onClick={resendVerificationEmail}
        loading={isLoading}
        disabled={isDisabled}
        className={cn(
          "w-full rounded-xl py-3 text-sm font-medium transition hover:cursor-pointer",
          isDisabled
            ? "bg-(--color-primary)/50 cursor-not-allowed text-(--text-primary)"
            : "bg-(--color-primary) hover:bg-(--color-primary-hover) text-(--text-primary)"
        )}
      >
        Resend verification email
      </LoadingButton>

    </div>
  );
};
