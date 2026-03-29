import { Suspense } from "react";
import TradeClient from "./TradeClient";

function Loading() {
  return (
    <div className="p-6">
      <div className="h-125 skeleton rounded-xl"></div>
    </div>
  );
}

export default async function TradePage() {
  return (
    <Suspense fallback={<Loading />}>
      <TradeClient />
    </Suspense>
  );
}