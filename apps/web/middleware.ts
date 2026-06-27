import { NextRequest, NextResponse } from "next/server"


export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("better-auth.session_token") ??
    req.cookies.get("__Secure-better-auth.session_token")

  if(!sessionCookie?.value){
    const loginUrl = new URL("/auth", req.url)
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"]
}