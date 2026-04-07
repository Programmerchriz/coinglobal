import StatCard from '../StatCard';

interface StatCardFallbackProps {
  label?: string;
}

export default function StatCardFallback({
  label = 'Loading',
}: StatCardFallbackProps) {
  return (
    <StatCard
      label={label}
      value={<div className="skeleton h-8 w-24" />}
      footer={<div className="skeleton h-3 w-20" />}
    />
  );
};
