import { Suspense } from 'react';
import TradeClient from './TradeClient';

type TradePageProps = {
  params: {
    id: string;
  };
};

function Loading() {
  return (
    <div className="p-6">
      <div className="h-125 skeleton rounded-xl"></div>
    </div>
  );
}

export default async function TradePage({ params }: TradePageProps) {
  const { id } = await params;
  if (!id) throw new Error('Coin id not found');

  return (
    <Suspense fallback={<Loading />}>
      <TradeClient />
    </Suspense>
  );
}
