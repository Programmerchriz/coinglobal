import { Suspense } from "react";
import PortfolioClient from "./PortfolioClient";
import Loading from "../dashboard/loading";

export default async function PortfolioPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PortfolioClient />
    </Suspense>
  );
};
