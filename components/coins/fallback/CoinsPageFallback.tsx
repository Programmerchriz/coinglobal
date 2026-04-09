import CoinsTableFallback from './CoinsTableFallback';

export default function CoinsPageFallback() {
  return (
    <div className="relative min-h-screen bg-(--bg-base) text-(--color-100) px-2 py-8 animate-pulse">
      <div className="absolute -top-50 -left-50 w-100 h-100 bg-(--bg-glass-indigo) rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        <div className='px-2'>
          <div className="skeleton h-10 w-24 rounded-xl" />
        </div>

        <div className="space-y-2">
          <div className="skeleton h-8 w-40" />
          <div className="skeleton h-4 w-72 max-w-full" />
        </div>

        <CoinsTableFallback />
      </div>
    </div>
  );
}
