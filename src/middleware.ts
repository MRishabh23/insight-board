import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const publicPaths = ["/signin", "/signup", "/demo", "/forgot"];
	const isPublic = publicPaths.includes(path);
	const token = request.cookies.has("token");

	if (token && (path === "/" || isPublic)) {
		return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
	}

	if (!token && !isPublic) {
		return NextResponse.redirect(new URL("/signin", request.nextUrl));
	}
}

export const config = {
	matcher: ["/", "/demo", "/dashboard/:path*", "/signin", "/signup", "/forgot"],
};
