
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export function PasswordInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative group">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn(
          "pr-11 bg-(--bg-elevated) border border-(--color-10) text-(--color-100) placeholder:text-(--color-40) rounded-xl transition-all duration-200",
          "focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)",
          "hover:border-(--color-20)",
          "[&::-ms-reveal]:hidden",
          className
        )}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        title={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-40) hover:text-(--color-primary) transition-colors duration-200"
      >
        {showPassword ? (
          <EyeOffIcon className="w-5 h-5 hover:cursor-pointer" />
        ) : (
          <EyeIcon className="w-5 h-5 hover:cursor-pointer" />
        )}
      </button>

      <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 group-focus-within:ring-2 group-focus-within:ring-(--color-primary) transition-all duration-200" />
    </div>
  );
};
