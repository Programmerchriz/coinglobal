
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  label?: string;
  className?: string;
  variant?: "default" | "ghost";
};

export default function BackButton({
  label = "Back",
  className,
  variant = "default",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:cursor-pointer",

        variant === "default" &&
          "bg-(--bg-surface) border border-(--border-standard) text-(--text-primary) hover:bg-(--color-5) hover:border-(--border-input)",

        variant === "ghost" &&
          "text-(--color-70) hover:text-(--text-primary) hover:bg-(--color-5)",

        "active:scale-95",
        className
      )}
    >
      <ArrowLeft size={16} className="opacity-80" />
      <span>{label}</span>
    </button>
  );
};
