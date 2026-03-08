
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
        "h-9 px-4 text-sm font-medium bg-(color-5) hover:bg-(color-10) text-(text-primary) border border-(color-10) hover:border-(color-20) rounded-xl transition-all duration-200 backdrop-blur-sm hover:cursor-pointer",
        className
      )}
    >
      {children}
    </Button>
  );
};
