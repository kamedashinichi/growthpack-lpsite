import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const industryPaths: Record<string, string> = {
  "/apparel": "apparel",
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const industry = industryPaths[pathname]
  if (industry) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    url.searchParams.set("industry", industry)
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/apparel"],
}
