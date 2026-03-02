
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getServerSession } from "./lib/session";
import { publicRoutes, protectedRoutes } from "./lib/generated/routes";

export default async function proxy(request: NextRequest) {
  const session = await getServerSession();

  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isPublicRoute && !session) {
    const signInUrl = new URL("/sign-in", request.url);

    signInUrl.searchParams.set("redirect", pathname);
    
    return NextResponse.redirect(signInUrl);
  }

  if (session
    &&
    (request.nextUrl.pathname.startsWith("/sign-in")
    ||
    request.nextUrl.pathname.startsWith("/sign-up"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};
