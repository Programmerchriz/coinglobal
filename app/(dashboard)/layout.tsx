
import { requireSession } from "@/lib/require-session";
import LayoutClient from "./LayoutClient";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  return (
    <LayoutClient session={session}>
      {children}
    </LayoutClient>
  );
};
