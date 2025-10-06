/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_NAME = "blog-token";

export function middleware(request: NextRequest) {
  console.log(request.cookies);
  const accessToken = request.cookies.get(ACCESS_TOKEN_NAME)?.value;

  const { pathname } = request.nextUrl;

  const protectesRoutes = ["/blogs/actions/new"];

  if (pathname.startsWith("/auth/register"))
    return NextResponse.redirect(new URL("/auth/login", request.url));

  if (accessToken && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!accessToken) {
    if (
      protectesRoutes.some(route => pathname.startsWith(route)) &&
      !pathname.startsWith("/auth")
    ) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  const payload = jwt.decode(accessToken as string) as any;
  const isAdmin = payload?.role === "ADMIN";

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (accessToken && isAdmin) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (pathname.startsWith("/admin/login") && accessToken && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
