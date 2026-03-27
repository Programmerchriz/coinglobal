import WatchlistClient from './WatchlistClient';

export default function WatchlistPage() {
  return (
    <div
      className="w-full min-h-screen bg-(--bg-app) pb-8 px-0 sm:px-4 md:px-8 overflow-x-hidden"
    >
      <div className="absolute -top-50 w-100 h-100 bg-(--color-primary)/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 w-100 h-100 bg-(--color-accent)/20 rounded-full blur-3xl" />

      <div className="max-w-full relative z-10 mx-auto">
        <WatchlistClient />
      </div>
    </div>
  );
}
