import { NextResponse } from "next/server";

// Launch Date: June 19, 2026 at 12:35 PM (UTC+5:30)
const LAUNCH_DATE = new Date("2026-06-19T12:35:00+05:30");

export function proxy(request) {
  const now = new Date();
  const { pathname } = request.nextUrl;

  // Exclude static resources and APIs from redirection
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Redirect to coming-soon if it's before the launch date
  if (now < LAUNCH_DATE) {
    if (pathname !== "/coming-soon") {
      return NextResponse.redirect(new URL("/coming-soon", request.url));
    }
  } else {
    // If we've already launched, redirect anyone visiting /coming-soon back to home
    if (pathname === "/coming-soon") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except those starting with api, _next, or specific files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
