import WatchlistClient from './WatchlistClient';

export default function WatchlistPage() {
  return (
    <div className="min-h-screen py-8 px-4 md:px-8" style={{ backgroundColor: 'var(--bg-app)' }}>
      <div className="max-w-7xl mx-auto">
        <WatchlistClient />
      </div>
    </div>
  );
}
