import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // get path
  const path = request.nextUrl.pathname;

  // public paths
  let isPublic = false;
  if(path === "/signin" || path === "/signup" || path === "/demo" || path === "/forgot") {
    isPublic = true;
  }
  // get token
  //const token = request.cookies.get("token")?.value || "";
  const token = request.cookies.has("token");

  //conditions
  if(token && path === "/"){
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/demo", "/dashboard/:path*", "/signin", "/signup", "/forgot"],
};
