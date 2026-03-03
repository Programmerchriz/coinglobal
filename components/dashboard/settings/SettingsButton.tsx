
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function SettingsButton({
  children,
  className,
  type = "button",
}: Props) {
  return (
    <Button
      type={type}
      className={cn(
        "h-9 px-4 text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm hover:cursor-pointer",
        className
      )}
    >
      {children}
    </Button>
  );
};
