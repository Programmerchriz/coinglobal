import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { auth } from "./lib/auth";
import { protectedRoutes } from './lib/generated/routes';

export default async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route => pathname === route || pathname.startsWith(route + "/"));

  if (isProtectedRoute && !session) {
    const signInUrl = new URL('/signin', request.url);

    if (!(pathname.startsWith("/signin") || pathname.startsWith("/signup"))) {
      signInUrl.searchParams.set(
        "redirect",
        pathname + request.nextUrl.search
      );
    };

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
  matcher: [
    "/((?!api|_next|favicon.ico).*)",
  ],
};
