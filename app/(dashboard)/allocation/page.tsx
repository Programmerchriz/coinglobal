import { Suspense } from "react";
import AllocationClient from "./AllocationClient";
import Loading from "../dashboard/loading";

export default async function AllocationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AllocationClient />
    </Suspense>
  );
};
