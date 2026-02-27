
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getServerSession } from "./lib/session";
import { publicRoutes, protectedRoutes } from "./lib/generated/routes";

export default async function proxy(request: NextRequest) {
  const session = await getServerSession();

  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/coins");

  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
};
