import { NextResponse } from 'next/server'

export function GET() {
  const content = `User-agent: *\nDisallow: /admin/`
  return new NextResponse(content, { headers: { 'Content-Type': 'text/plain' } })
}
