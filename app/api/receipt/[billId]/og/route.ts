import { NextResponse } from 'next/server'

export function GET(req: Request) {
  const url = new URL('/placeholder.jpg', req.url)
  return NextResponse.redirect(url)
}
