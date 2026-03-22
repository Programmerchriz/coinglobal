import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getServerSession } from './lib/session';
import { auth } from "./lib/auth";
import { publicRoutes, protectedRoutes } from './lib/generated/routes';

export default async function proxy(request: NextRequest) {
  console.log("Middleware running:", request.nextUrl.pathname);

  const session = await auth.api.getSession({
    headers: request.headers,
  });
  
  const { pathname } = request.nextUrl;
  console.log("Pathname:", pathname);

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !session) {
    console.log("Pathname:", pathname);
    const signInUrl = new URL('/signin', request.url);
    console.log("Pathname:", pathname);

    if (!(pathname.startsWith("/signin") || pathname.startsWith("/signup"))) {
      signInUrl.searchParams.set(
        "redirect",
        pathname + request.nextUrl.search
      );
    };
    
    console.log("Redirecting to:", signInUrl.toString());

    return NextResponse.redirect(signInUrl);
  }

  if (
    session &&
    (request.nextUrl.pathname.startsWith('/signin') ||
      request.nextUrl.pathname.startsWith('/signup'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
