import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // get path
  const path = request.nextUrl.pathname;

  // public paths
  let isPublic = false;
  if(path === "/signin" || path === "/signup" || path === "/demo"){
    isPublic = true;
  }
  // get token
  const token = request.cookies.get("token")?.value || "";

  //conditions
  if(path === "/" && token){
    return NextResponse.redirect(new URL("/erpa", request.nextUrl));
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/erpa", request.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/demo", "/erpa:path*", "/signin", "/signup"],
};
