
import { Suspense } from "react";
import NotificationsClient from "./NotificationsClient";
import Loading from "./loading";

export default async function Notifications() {
  return (
    <Suspense fallback={<Loading />}>
      <NotificationsClient />
    </Suspense>
  );
};
