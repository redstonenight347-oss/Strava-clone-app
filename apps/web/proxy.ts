import { NextRequest, NextResponse } from "next/server"

export function proxy(req: NextRequest) {
  const sessionCookie = req.cookies.get("better-auth.session_token") ??
    req.cookies.get("__Secure-better-auth.session_token")

  const protectedRoutes = ["/dashboard", "/upload", "/maps"]
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !sessionCookie?.value) {
    const loginUrl = new URL("/auth", req.url)
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/maps/:path*", "/upload/:path*"]
}