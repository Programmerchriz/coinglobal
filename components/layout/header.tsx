
import { getServerSession } from '@/lib/session';
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const session = await getServerSession();

  return (
    <HeaderClient session={session} />
  );
};
