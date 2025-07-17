import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || ''
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    ua
  )
  if (isMobile && request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/mobile-home'
    return NextResponse.redirect(url, 302)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/' as const,
}
