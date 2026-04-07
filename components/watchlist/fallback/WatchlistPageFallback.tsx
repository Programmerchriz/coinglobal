import WatchlistStatsFallback from './WatchlistStatsFallback';
import WatchlistTableFallback from './WatchlistTableFallback';

export default function WatchlistPageFallback() {
  return (
    <div className="w-full min-h-screen bg-(--bg-app) pb-8 px-0 sm:px-4 md:px-8 overflow-x-hidden animate-pulse">
      <div className="absolute -top-50 w-100 h-100 bg-(--color-primary)/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 w-100 h-100 bg-(--color-accent)/20 rounded-full blur-3xl" />

      <div className="max-w-full relative z-10 mx-auto">
        <div className="mb-6">
          <div className="skeleton h-10 w-24 rounded-xl" />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-2">
            <div className="skeleton h-8 w-52" />
            <div className="skeleton h-4 w-64" />
          </div>

          <div className="rounded-lg bg-(--bg-elevated) px-4 py-2">
            <div className="skeleton h-5 w-20" />
          </div>
        </div>

        <WatchlistStatsFallback />

        <WatchlistTableFallback />

        <div className="mt-6 p-4 rounded-lg border bg-(--bg-elevated) border-(--border-standard)">
          <div className="skeleton h-4 w-80 max-w-full" />
        </div>
      </div>
    </div>
  );
}
