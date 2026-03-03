
import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  value?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function SettingsItem({
  title,
  description,
  value,
  icon,
  action,
}: Props) {
  return (
    <div className="group flex items-center justify-between border border-white/5 rounded-xl px-5 py-4 bg-[#111827] hover:bg-[#151c2b] transition-all duration-200">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="shrink-0">
            {icon}
          </div>
        )}

        <div className="space-y-1">
          <p className="text-white font-medium tracking-tight">
            {title}
          </p>

          {description && (
            <p className="text-xs text-white/50 leading-relaxed max-w-md">
              {description}
            </p>
          )}

          {value && !description && (
            <p className="text-sm text-white/60">
              {value}
            </p>
          )}
        </div>
      </div>

      {action && (
        <div className="flex items-center gap-4">
          {action}
        </div>
      )}
    </div>
  );
}
