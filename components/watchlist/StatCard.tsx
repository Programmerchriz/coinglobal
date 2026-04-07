import type { ReactNode } from 'react';

type StatCardProps = {
  label: string;
  value: ReactNode;
  valueClassName?: string;
  footer?: ReactNode;
};

export default function StatCard({
  label,
  value,
  valueClassName = 'text-(--text-primary)',
  footer,
}: StatCardProps) {
  return (
    <div className="rounded-xl border p-4 bg-(--bg-surface) border-(--border-standard)">
      <p className="text-(--color-60) text-sm mb-2">{label}</p>
      <div className={`text-2xl font-bold ${valueClassName}`}>
        {value}
      </div>
      {footer ? <div className="mt-2 text-xs">{footer}</div> : null}
    </div>
  );
};
