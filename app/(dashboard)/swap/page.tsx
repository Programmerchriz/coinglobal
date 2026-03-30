import { Suspense } from "react";
import SwapClient from "./SwapClient";
import Loading from "../dashboard/loading";

export default async function SwapPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SwapClient />
    </Suspense>
  );
};
