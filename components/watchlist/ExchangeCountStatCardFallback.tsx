import StatCard from './StatCard';

export default function ExchangeCountStatCardFallback() {
  return (
    <StatCard
      label="Exchanges"
      value={<div className="skeleton h-8 w-12" />}
      footer={<div className="skeleton h-3 w-20" />}
    />
  );
};
