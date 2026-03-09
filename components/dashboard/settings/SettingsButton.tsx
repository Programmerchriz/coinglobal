
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import ProfileSettingsModal from "@/components/settings/ProfileSettingsModal";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function SettingsButton({
  children,
  className,
  onClick,
  type = "button",
}: Props) {
  // const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type={type}
        onClick={onClick}
        className={cn(
          "h-9 px-4 text-sm font-medium bg-(color-5) hover:bg-(color-10) text-(text-primary) border border-(color-10) hover:border-(color-20) rounded-xl transition-all duration-200 backdrop-blur-sm hover:cursor-pointer",
          className
        )}
      >
        {children}
      </Button>

      {/* <ProfileSettingsModal
        open={open}
        onClose={() => setOpen(false)}
      /> */}
    </>
  );
};
