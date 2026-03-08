
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
    <div className="group flex items-center justify-between border border-(--border-standard) rounded-xl px-5 py-4 bg-(--bg-surface) hover:bg-(--bg-elevated) transition-all duration-200">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="shrink-0">
            {icon}
          </div>
        )}

        <div className="space-y-1">
          <p className="text-(--text-primary) font-medium tracking-tight">
            {title}
          </p>

          {description && (
            <p className="text-xs text-(--color-50) leading-relaxed max-w-md">
              {description}
            </p>
          )}

          {value && !description && (
            <p className="text-sm text-(--color-60)">
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
