import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

const ACCESS_TOKEN_NAME = "blog-token";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_NAME);

  const { pathname } = request.nextUrl;

  if (accessToken && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!accessToken && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/((?!api|_next|.*\\..*).*)"]
};
